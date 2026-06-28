# 中国 ETF / 基金数据获取方法

写投资类博客（Type D）需要真实市场数据。搜索引擎（Google/百度/Bing）在浏览器中频繁触发 CAPTCHA，**不要依赖搜索来拿行情数据**。以下 API 端点实测稳定可用。

## 1. Sina 行情 API（最稳定，推荐首选）

### 实时报价 + 快速查名

```python
import urllib.request

def get_name(code):
    """通过证券代码快速查基金/股票名称"""
    market = "sh" if code.startswith(("5", "6")) else "sz"
    url = f"https://hq.sinajs.cn/list={market}{code}"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://finance.sina.com.cn/"  # 必须带，否则被拒
    })
    resp = urllib.request.urlopen(req, timeout=8)
    text = resp.read().decode("gbk")  # 注意是 GBK 编码
    name = text.split('"')[1].split(",")[0]
    return name
```

**市场前缀规则**：`sh` = 沪市（代码 5/6 开头），`sz` = 深市（代码 0/1/3 开头）

### K线数据（日线/周线）

```python
def get_daily_kline(code, datalen=2000):
    """获取日K线，datalen 控制返回天数"""
    market = "sh" if code.startswith(("5", "6")) else "sz"
    url = (f"https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/"
           f"CN_MarketData.getKLineData?symbol={market}{code}"
           f"&scale=240&ma=no&datalen={datalen}")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    resp = urllib.request.urlopen(req, timeout=15)
    data = json.loads(resp.read().decode())
    # 每条: {"day": "2024-01-02 00:00:00", "open": "...", "close": "...", ...}
    return data
```

- `scale=240` = 日线，`scale=1680` = 周线，`scale=7200` = 月线
- `datalen` 最大约 3000（约 12 年日线）
- 返回的 close 是**前复权**价格

## 2. Eastmoney 基金详情页（费率/规模/跟踪指数）

### fundf10 页面抓取

ETF/基金的费率、规模、成立日期、跟踪标的等信息在 fundf10 详情页：

```python
def get_fund_detail(code):
    url = f"https://fundf10.eastmoney.com/jbgk_{code}.html"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://fund.eastmoney.com/"
    })
    resp = urllib.request.urlopen(req, timeout=10)
    html = resp.read().decode("utf-8", errors="ignore")

    # 用 th/td 配对提取字段
    pairs = re.findall(r'<th[^>]*>(.*?)</th>\s*<td[^>]*>(.*?)</td>', html, re.S)
    info = {}
    for label, value in pairs:
        cl = re.sub(r'<[^>]+>', '', label).strip()
        cv = re.sub(r'<[^>]+>', '', value).strip()
        cv = re.sub(r'\s+', ' ', cv)
        if cl and cv:
            info[cl] = cv
    return info

# 可用字段：基金简称、基金全称、成立日期、净资产规模（含截止日）、
#           跟踪标的、管理费率、托管费率、业绩比较基准、基金管理人
```

### 基金搜索 API（找代码/确认名称）

```python
import urllib.parse

def search_funds(keyword):
    encoded = urllib.parse.quote(keyword)
    url = (f"https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx"
           f"?callback=j&m=1&key={encoded}")
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://fund.eastmoney.com/"
    })
    resp = urllib.request.urlopen(req, timeout=10)
    text = resp.read().decode()
    json_str = text[text.find("(")+1:text.rfind(")")]  # 去 JSONP 包裹
    return json.loads(json_str).get("Datas", [])
```

## 3. Eastmoney K线 API（Sina 不可用时的备选）

```python
def get_kline_eastmoney(secid, beg="20250101", end="20261231"):
    """secid 格式: '1.510300'(沪) 或 '0.159501'(深)"""
    url = (f"https://push2his.eastmoney.com/api/qt/stock/kline/get?"
           f"secid={secid}&fields1=f1,f2,f3,f4,f5,f6"
           f"&fields2=f51,f52,f53,f54,f55,f56,f57"
           f"&klt=101&fqt=1&beg={beg}&end={end}&lmt=120")
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://quote.eastmoney.com/"
    })
    resp = urllib.request.urlopen(req, timeout=10)
    data = json.loads(resp.read().decode())
    klines = data.get("data", {}).get("klines", [])
    # 每条: "date,open,close,high,low,volume,amount"
```

**注意**：这个端点偶尔 connection reset（`Remote end closed connection without response`），加 retry + sleep 间隔。Sina API 更稳定。

**secid 前缀**：`1`=沪市，`0`=深市

## 常见坑

- **编码**：Sina 返回 GBK，Eastmoney 返回 UTF-8，别搞混
- **Referer header**：Sina API 必须带 `Referer: https://finance.sina.com.cn/`，否则 403
- **搜索引擎不可靠**：Google/百度/Bing 在浏览器自动化中几乎必然触发验证码，直接用上面的 API
- **ETF vs 场外基金**：ETF 代码 5/1 开头可场内交易；场外基金（如 025518）在 fundf10 也能查但无法通过证券行情 API 拿 K线
- **Eastmoney datacenter API 不可用于指数估值**：`datacenter-web.eastmoney.com/api/data/v1/get` 的 `RPT_LICO_FN_CPD` 报告不支持 `VAL_PE` 等估值字段（返回错误"VAL_PE返回字段不存在"），指数 PE/PB 需从其他数据源获取（乌龟量化、中证官网、或自己算）
- **复权**：Sina K线默认前复权；计算长期收益时注意价格收益 ≠ 全收益（ETF 需加回分红）
- **红利/高息ETF 的复权陷阱**：前复权数据会大幅压低高分红 ETF 的长期收益——512890 红利低波ETF 前复权数据看起来 5 年跌 27%，但实际含分红全收益约 +30%。**对比 ETF 长期表现时，务必用后复权数据（近似全收益）或手动加回年均股息率**。Eastmoney K线 API 理论上支持 `fqt=2`（后复权），但 push2his 端点稳定性差（高频调用会被 connection reset），实测大量获取时几乎不可用。可靠方案：用 Sina 前复权 K线算价格收益，再手动加上估算的年均股息率（红利低波~5.5%，沪深300~2%，纳指~1%）作为全收益近似。
- **费率悬崖**：2023 年后成立的新 ETF 普遍 0.20% 总费率，老 ETF 常常 0.50-0.60%，对比时务必展示费率差
- **大 datalen 控制字符陷阱**：Sina K线 API 不带 `&ma=no` 参数时，返回的数据会内嵌多余的 MA 字段（ma_price5/ma_price10/ma_volume5/ma_volume10 等），其中包含控制字符导致 `json.loads()` 报错。**解决：URL 加 `&ma=no` 参数即可**，从源头不返回 MA 字段，不需要任何后处理。**不要用 `tr -d '\000-\037'` 来过滤**——在 shell/f-string 上下文中反斜杠转义会被错误解释，连冒号也一起删掉，彻底破坏 JSON。

## 4. Eastmoney 基金持仓数据（通过浏览器抓取）

获取 ETF/基金的前十大持仓和行业配置。fundf10 的 JSONP API（`FundArchivesDatas.aspx`）解析困难（嵌套转义引号、HTML 混在 JSON 里），**推荐用浏览器直接抓取，比 Python urllib 解析可靠得多**。

### 方法：browser_navigate + browser_console

```text
# 1. 导航到持仓页
browser_navigate(url="https://fundf10.eastmoney.com/ccmx_{code}.html")

# 2. 用 browser_console 执行 DOM 提取（返回干净的表格数据）
```

browser_console 的 expression 参数填：

```javascript
(() => {
  const tables = document.querySelectorAll("table");
  let result = [];
  for (const table of tables) {
    const rows = table.querySelectorAll("tr");
    if (rows.length > 3) {
      const data = [];
      for (const row of rows) {
        const cells = row.querySelectorAll("td, th");
        if (cells.length >= 3) {
          const rowData = Array.from(cells)
            .map((c) => c.textContent.trim())
            .join(" | ");
          if (rowData) data.push(rowData);
        }
      }
      if (data.length > 3) result.push(data.join("\n"));
    }
  }
  return result.join("\n\n---\n\n");
})();
```

返回格式：`序号 | 股票代码 | 股票名称 | 最新价 | 涨跌幅 | ... | 占净值比例 | 持股数 | 持仓市值`

### 相关页面

| 页面     | URL 模式                                   | 数据                            |
| -------- | ------------------------------------------ | ------------------------------- |
| 基金持仓 | `fundf10.eastmoney.com/ccmx_{code}.html`   | 前十大重仓股                    |
| 基本概况 | `fundf10.eastmoney.com/jbgk_{code}.html`   | 费率/规模/跟踪标的              |
| 特色数据 | `fundf10.eastmoney.com/tsdata_{code}.html` | 风险指标(标准差/夏普)、投资风格 |

**注意**：`HYCC_{code}.html`（行业配置页）返回 404，行业数据需要从持仓表手动按行业归类。
