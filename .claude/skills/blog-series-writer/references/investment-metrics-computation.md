# 投资类文章数据预取：多 ETF 指标计算

写 Type D（投资/理财）文章时，经常需要对比多个 ETF/指数的收益、波动率、最大回撤、夏普比率等指标。这个文件记录了从 Sina API 拉取数据到计算指标的可复用流程。

## 适用场景

- 资产配置系列：对比多个标的的波动率和回撤，论证分散效果
- ETF 对比文章：横向对比同类产品的收益/风险指标
- 估值系列：拉取历史数据用于计算分位数
- 任何需要"用真实数据说话"的投资类文章

## 数据预取流程

### 第一步：批量拉取 K 线数据

用 Sina API（详见 [china-etf-fund-data-apis.md](china-etf-fund-data-apis.md)），对每只 ETF 拉取日线数据写入文件。

**关键：URL 必须带 `&ma=no` 参数。** 不带 `ma=no` 时，API 返回的数据会内嵌多余的 MA 字段，其中包含控制字符导致 JSON 解析失败。**不要用 `tr -d` 管道来过滤控制字符**——在 f-string + shell 上下文中，`tr -d '\000-\037'` 的反斜杠转义会被错误解释，连冒号也被一起删掉，导致 JSON 完全损坏。正确做法是加 `&ma=no` 从源头避免多余字段。

```python
from hermes_tools import terminal
import json

etfs = {
    "sh513100": "纳指100ETF",
    "sh563020": "红利低波100ETF",
    "sh588000": "科创50ETF",
}

for code, name in etfs.items():
    # ✓ 正确：用 &ma=no 从源头避免控制字符，不需要 tr 过滤
    cmd = f'''curl -s "https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol={code}&scale=240&ma=no&datalen=500" > /tmp/kline_{code}.json'''
    terminal(cmd, timeout=10)

    # ✗ 错误（旧方法）：tr -d '\000-\037' 在 shell 中会删掉冒号，破坏 JSON
    # cmd = f'''curl -s "...symbol={code}&scale=240&datalen=500" | tr -d '\\\\000-\\\\037' > /tmp/kline_{code}.json'''
```

### 第二步：计算关键指标

对每只 ETF 计算：总收益、年化收益、年化波动率、最大回撤、夏普比率、近1年/2年收益。

```python
import math

def compute_metrics(filepath, risk_free_rate=2.0):
    """从 K 线 JSON 文件计算投资指标"""
    with open(filepath) as f:
        data = json.loads(f.read(), strict=False)

    if not isinstance(data, list) or len(data) < 10:
        return None

    prices = [float(d["close"]) for d in data]
    end_price = prices[-1]
    start_price = prices[0]

    # --- 收益率 ---
    total_return = (end_price / start_price - 1) * 100
    years = len(data) / 240  # 约 240 个交易日/年
    ann_return = ((end_price / start_price) ** (1 / years) - 1) * 100 if years > 0 else 0

    # 区间收益（1年/2年）
    idx_1y = max(0, len(data) - 240)
    ret_1y = (end_price / prices[idx_1y] - 1) * 100 if idx_1y > 0 else None
    idx_2y = max(0, len(data) - 480)
    ret_2y = (end_price / prices[idx_2y] - 1) * 100 if idx_2y > 0 else None

    # --- 最大回撤 ---
    peak = start_price
    max_dd = 0
    for p in prices:
        if p > peak:
            peak = p
        dd = (p / peak - 1) * 100
        if dd < max_dd:
            max_dd = dd

    # --- 年化波动率（从日对数收益） ---
    log_returns = []
    for i in range(1, len(prices)):
        if prices[i - 1] > 0:
            log_returns.append(math.log(prices[i] / prices[i - 1]))
    mean_r = sum(log_returns) / len(log_returns)
    var_r = sum((r - mean_r) ** 2 for r in log_returns) / (len(log_returns) - 1)
    ann_volatility = math.sqrt(var_r) * math.sqrt(240) * 100

    # --- 夏普比率 ---
    sharpe = (ann_return - risk_free_rate) / ann_volatility * 100 if ann_volatility > 0 else 0

    # --- Sortino 比率（只惩罚下行波动）---
    downside = [min(0, r) for r in log_returns]
    ds_var = sum(d ** 2 for d in downside) / len(downside) if downside else 0
    ann_downside_vol = math.sqrt(ds_var) * math.sqrt(240) * 100 if ds_var > 0 else 0
    sortino = (ann_return - risk_free_rate) / ann_downside_vol * 100 if ann_downside_vol > 0 else 0

    # --- Calmar 比率（年化收益 / 最大回撤绝对值）---
    calmar = ann_return / abs(max_dd) * 100 if max_dd != 0 else 0

    return {
        "date_range": f"{data[0]['day'][:10]} → {data[-1]['day'][:10]}",
        "trading_days": len(data),
        "total_return": total_return,
        "ann_return": ann_return,
        "ann_volatility": ann_volatility,
        "max_drawdown": max_dd,
        "sharpe": sharpe,
        "sortino": sortino,
        "calmar": calmar,
        "ret_1y": ret_1y,
        "ret_2y": ret_2y,
    }
```

### 第三步：输出对比表格

```python
for code, name in etfs.items():
    m = compute_metrics(f"/tmp/kline_{code}.json")
    if m:
        print(f"{name} ({code})")
        print(f"  {m['date_range']} | {m['trading_days']}交易日")
        print(f"  总收益: {m['total_return']:+.1f}% | 年化: {m['ann_return']:+.1f}% | 波动: {m['ann_volatility']:.1f}% | 夏普: {m['sharpe']:.2f}")
        print(f"  最大回撤: {m['max_drawdown']:.1f}%")
        if m['ret_1y'] is not None:
            print(f"  近1年: {m['ret_1y']:+.1f}%")
        if m['ret_2y'] is not None:
            print(f"  近2年: {m['ret_2y']:+.1f}%")
```

## 实测数据参考（2024-06 至 2026-06，2年日线）

这些数据在 2026年6月的资产配置/美股系列文章中使用过。写新文章时**需要重新拉取最新数据**，不要直接复用——市场数据会变化。

| ETF         | 代码   | 近2年收益 | 年化波动 | 最大回撤 |
| ----------- | ------ | --------- | -------- | -------- |
| 纳指100     | 513100 | +49.8%    | 24.6%    | -24.0%   |
| 标普500     | 513500 | +27.8%    | 20.0%    | -24.9%   |
| 中概互联    | 513050 | -3.9%     | 29.5%    | -44.6%   |
| 红利低波100 | 563020 | -7.0%     | 14.5%    | -15.3%   |
| 科创50      | 588000 | +197.5%   | 37.5%    | -19.3%   |

## 注意事项

- **波动率年化**：日波动率 × √240（不是 √252，中国交易日约 240 天/年）
- **夏普比率无风险利率**：中国用 2% 左右（货基/国债收益率近似），美国用 4-5%
- **前复权 vs 全收益**：Sina 返回前复权数据，高分红 ETF（红利低波）的价格收益会低于全收益。对比长期表现时需手动加回年均股息率（红利低波约 5.5%，沪深300 约 2%，纳指约 1%）
- **跨境 ETF 的汇率因素**：513100 等跨境 ETF 的价格已包含汇率变动（人民币计价），但指数本身是美元计价的——两者有偏差
- **数据时效性**：市场数据随时变化，文章中引用的具体数字在写作当天是准确的，但读者看到时可能已过时。在文章里标注数据截止日期
