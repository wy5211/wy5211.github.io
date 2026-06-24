# A 股财务数据获取方法

## 背景

写投资类博客（如红利低波系列）或做股票分析时，需要批量获取 A 股财务指标（ROE、毛利率、净利润增长率、经营现金流等）。直连 HTTP API 会被代理 TUN 模式拦截（fake-ip DNS 返回 198.18.x.x），需要走浏览器。

## 东方财富 datacenter API（推荐）

**核心发现**：`datacenter-web.eastmoney.com` 的 API 可以通过 `browser_navigate` 直接访问（返回 JSON 页面），再用 `browser_console` 解析。`push2.eastmoney.com` 端点则不可达。

### 业绩报表 API

```
https://datacenter-web.eastmoney.com/api/data/v1/get?
  sortColumns=WEIGHTAVG_ROE&sortTypes=-1&
  pageSize=2000&pageNumber=1&
  reportName=RPT_LICO_FN_CPD&
  columns=SECURITY_CODE,SECURITY_NAME_ABBR,WEIGHTAVG_ROE,XSMLL,YSTZ,SJLTZ,MGJYXJJE,TRADE_MARKET&
  filter=(ISNEW="1")(TRADE_MARKET="上交所主板")(WEIGHTAVG_ROE>0)(XSMLL>15)(MGJYXJJE>0)
```

### 字段映射

| API 字段           | 含义                                                 |
| ------------------ | ---------------------------------------------------- |
| SECURITY_CODE      | 股票代码                                             |
| SECURITY_NAME_ABBR | 简称                                                 |
| WEIGHTAVG_ROE      | 加权 ROE（%）                                        |
| XSMLL              | 销售毛利率（%）                                      |
| YSTZ               | 营收同比增长率（%）                                  |
| SJLTZ              | 净利润同比增长率（%）                                |
| MGJYXJJE           | 每股经营现金流（元）                                 |
| ZXGXL              | 最新股息率（%）                                      |
| TRADE_MARKET       | 交易市场（上交所主板/深交所主板/创业板等）           |
| TRADE_MARKET_CODE  | 市场代码（069001001001=沪主板, 069001001002=深主板） |

### 关键注意事项

1. **按市场分别拉取**：用 `TRADE_MARKET="上交所主板"` 或 `TRADE_MARKET="深交所主板"` 过滤，否则结果被新三板股票淹没。**不能同时传两个市场过滤**（API 是 AND 逻辑，返回空），必须分两次查询再合并。
2. **filter 用中文值**：`TRADE_MARKET` 的值是中文（需 URL 编码），不能用 `TRADE_MARKET_CODE` 做等值过滤（返回空）。
3. **排除 ST/B 股**：在结果中过滤掉名称含 "ST"/"退" 的股票，代码以 "900"/"200" 开头的 B 股。
4. **分页**：单页最大 pageSize=2000，一般够用。

### 数据新鲜度与报告期（重要）

`ISNEW="1"` 取每只股票**最新一期已披露财报**，但不同公司的最新报告期可能不同。**务必在 columns 里加 `REPORTDATE` 字段**，并在输出结果中注明。

- A 股披露节奏：Q1 报 4/30 前，中报 8/31 前，Q3 报 10/31 前，年报 4/30 前
- 6 月查询时，`ISNEW="1"` 通常取到的是**当年 Q1 季报**（截至 3/31）
- **Q1 季报的 ROE 是单季度值，不是年化值**。展示时需说明，或粗略 ×4 年化（不精确但有参考意义）
- 增长率指标（YSTZ/SJLTZ）是同比（YoY），不受单季度问题影响

### 低基数陷阱（分析注意事项）

展示净利润增长率时，注意识别**低基数效应**：当去年同期利润接近零或为负，当期恢复到正常水平时，增长率会出现 1000%+ 的极端数字（如某黄金股 +6136%）。这**不代表高成长**，只是统计假象。展示结果时应对此类数据标注 ⚠️ 或单独说明。

### 提取模式

```javascript
// browser_console 提取数据的标准模式
(() => {
  const data = JSON.parse(document.body.innerText);
  if (!data.result || !data.result.data) return JSON.stringify(data).substring(0, 300);
  const rows = data.result.data.filter(r => /* 过滤条件 */);
  return JSON.stringify(rows.map(r => ({
    code: r.SECURITY_CODE, name: r.SECURITY_NAME_ABBR,
    roe: r.WEIGHTAVG_ROE, /* ... */
  })));
})()
```

## ETF/基金详情 API

### 基金基本信息

```
https://fundf10.eastmoney.com/jbgk_{基金代码}.html
```

用正则提取 `<th>字段</th><td>值</td>` 对。关键字段：基金简称、成立日期、净资产规模、跟踪标的、管理费率、托管费率。

### ETF 行情 K 线

新浪财经 API（不受代理影响，可用 Python urllib 直连）：

```
https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol={市场}{代码}&scale=240&datalen={天数}
```

- 市场：`sh`（沪）/ `sz`（深）
- scale=240：日线
- 返回 JSON 数组，字段：day, open, high, low, close, volume

**注意**：新浪 K 线是**不复权**数据，红利类 ETF 因频繁分红导致价格失真。需用东方财富后复权数据（`push2his.eastmoney.com` + `fqt=2`），但该端点常被代理拦截。

## 多因子评分模型

对 A 股做综合质量评分时的权重建议：

| 因子          | 权重 | 评分区间               |
| ------------- | ---- | ---------------------- |
| ROE           | 30%  | 0-15 映射到 0-100      |
| 毛利率        | 20%  | 15-65 映射到 0-100     |
| 经营现金流/股 | 20%  | 0-3 映射到 0-100       |
| 净利润增长率  | 15%  | -10 到 40 映射到 0-100 |
| 营收增长率    | 15%  | -5 到 30 映射到 0-100  |

**注意**：评分只反映"质量"不反映"估值"。使用时需额外叠加 PE/PB 分位数、资产负债率等维度。
