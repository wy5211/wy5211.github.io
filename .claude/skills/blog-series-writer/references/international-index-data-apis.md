# International Index Historical Data via Yahoo Finance

When investment blog series need cross-market historical data (Nikkei 225, S&P 500, Shanghai Composite, etc.), use Yahoo Finance chart API. Sina Finance API only covers A-share ETFs/indices.

## Endpoint

```
https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?range=max&interval=1mo
```

- `range`: `1mo`, `3mo`, `6mo`, `1y`, `2y`, `5y`, `10y`, `ytd`, `max`
- `interval`: `1d` (daily), `1wk` (weekly), `1mo` (monthly)

## Common Symbols

| Index              | Symbol    | Currency |
| ------------------ | --------- | -------- |
| Nikkei 225         | ^N225     | JPY      |
| S&P 500            | ^GSPC     | USD      |
| Nasdaq 100         | ^NDX      | USD      |
| Dow Jones          | ^DJI      | USD      |
| Shanghai Composite | 000001.SS | CNY      |
| Shenzhen Component | 399001.SZ | CNY      |
| CSI 300            | 000300.SS | CNY      |
| Hang Seng          | ^HSI      | HKD      |
| FTSE 100           | ^FTSE     | GBP      |
| DAX                | ^GDAXI    | EUR      |
| KOSPI              | ^KS11     | KRW      |

## Response Structure

```json
{
  "chart": {
    "result": [{
      "meta": {
        "symbol": "^N225",
        "regularMarketPrice": 72405.32,
        "currency": "JPY"
      },
      "timestamp": [631152000, ...],
      "indicators": {
        "quote": [{
          "open": [...], "high": [...],
          "low": [...], "close": [...], "volume": [...]
        }]
      }
    }]
  }
}
```

## Python Usage Pattern

```python
import urllib.request, json, ssl
from datetime import datetime

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {"User-Agent": "Mozilla/5.0"}
url = "https://query1.finance.yahoo.com/v8/finance/chart/^N225?range=max&interval=1mo"
req = urllib.request.Request(url, headers=headers)
resp = urllib.request.urlopen(req, context=ctx, timeout=10)
result = json.loads(resp.read())

timestamps = result['chart']['result'][0]['timestamp']
closes = result['chart']['result'][0]['indicators']['quote'][0]['close']
meta = result['chart']['result'][0]['meta']

# Convert timestamp to date
dt = datetime.fromtimestamp(timestamps[0])
```

## Known Limitations

- Monthly interval returns ~167 data points for Nikkei 225 (not full history). For longer history, use `interval=1d` with explicit date range via `period1`/`period2` unix timestamps.
- Some response fields may contain `null` values — always null-check before arithmetic.
- Daily interval for long ranges can return very large payloads; use monthly for multi-decade analysis.
- Requires SSL verification disabled (`ctx.check_hostname = False`) in some environments.
