# Node.js 核心概念渐进式学习计划

## 背景

你是一个前端开发者，日常用 React/Vue 写页面，对 Node.js 的了解停留在 `npm install` 和 `node server.js`。最近团队要你帮忙写一个后端服务，或者你想给项目搭一个构建工具，打开 Node.js 文档一看——Buffer、Stream、Event Loop、libuv、Worker Threads……这些概念一个比一个抽象，官方文档又写得像参考手册。

这个系列就是为你准备的。我们不翻译文档，而是从"为什么需要它"出发，用真实场景驱动学习，带你逐步构建一个**实时日志处理服务**。

### 技术栈选择

| 技术       | 版本   | 说明                                                   |
| ---------- | ------ | ------------------------------------------------------ |
| Node.js    | 22 LTS | 当前 LTS 版本，内置 fetch、test runner、`using` 关键字 |
| TypeScript | 5.x    | 类型安全，但不会让代码变得臃肿                         |

> 本系列默认使用 ESM（`"type": "module"`），因为这是 Node.js 的方向。需要 CommonJS 的场景会特别说明。
>
> 如果你想先了解 Node.js 的模块系统，可以参考本系列第 4 篇。

---

## 主线案例：实时日志处理服务

整个系列围绕一个**实时日志处理服务**展开——想象你在做一个 SaaS 产品，每天产生数 GB 的日志，需要收集、解析、分析、存储，还要对外提供查询 API。

**案例场景**：一个类似 Sentry/Loki 的轻量级日志平台，支持日志采集、实时处理、告警通知、数据查询。

**案例数据示例**（贯穿核心篇之后的所有文章使用）：

```json
{
  "traceId": "trace_a1x9k2m",
  "service": "payment-gateway",
  "level": "ERROR",
  "message": "Connection timeout to database cluster after 30000ms",
  "timestamp": "2026-03-15T08:30:00.123Z",
  "metadata": {
    "host": "gw-prod-03",
    "region": "cn-east-1",
    "retryCount": 3
  }
}
```

---

## 系列节奏

```
基础篇（01-03）：独立小案例，建立 Node.js 核心直觉
  → 每篇一个独立场景，快速理解 Buffer、Stream、Event Loop

核心篇（04-06）：引入主线案例，构建服务骨架
  → 模块系统组织代码，文件系统存日志，HTTP 模块提供查询 API

进阶篇（07-09）：案例持续演进，深入底层能力
  → TCP 日志采集、多线程并发分析、加密安全

实战篇（10-12）：生产可用，完善工程能力
  → 错误处理、性能监控与调试、Docker 部署
```

---

## 博客目录结构

```
content/posts/nodejs-core/
├── plan.md                      # 本计划文件
├── 01-buffer.mdx                # Buffer：二进制数据的底层理解
├── 02-stream.mdx                # Stream：流式处理实战
├── 03-event-loop.mdx            # Event Loop：事件循环深度剖析
├── 04-module-system.mdx         # 模块系统：CommonJS 与 ESM
├── 05-filesystem.mdx            # 文件系统：日志存储与读写
├── 06-http.mdx                  # HTTP/HTTPS：构建查询 API
├── 07-tcp-udp.mdx               # 网络编程：TCP/UDP 实战
├── 08-concurrency.mdx           # 并发编程：子进程与 Worker Threads
├── 09-crypto.mdx                # 加密与安全：数据保护实战
├── 10-error-handling.mdx        # 错误处理：异步世界的异常捕获
├── 11-performance-debugging.mdx # 性能监控与调试
├── 12-deployment.mdx            # 部署与运维：最佳实践
```

---

## 基础篇：独立小案例，建立核心直觉（01-03）

目标：用三个独立场景快速建立对 Node.js 数据处理、流式 I/O、异步执行模型的理解。不涉及复杂的项目结构，每篇都能独立阅读。

---

### 01. Buffer：二进制数据的底层理解

**核心问题**：前端很少直接操作二进制数据，最多处理一下 `FormData`。但 Node.js 中，文件读写、网络通信、加密解密全都是二进制操作。Buffer 到底是什么？它和浏览器的 ArrayBuffer 有什么关系？

**独立案例**：你接手了一个物联网项目，设备上报的数据是自定义的二进制协议——`[4字节长度头][1字节类型][8字节时间戳][N字节负载数据]`。你要用 Buffer 把这段二进制数据解析成可读的 JSON。

**内容要点**：

- 为什么 Node.js 需要 Buffer（V8 的字符串不能存任意二进制）
- Buffer 的内存模型：堆外内存、8KB 池化机制
- `alloc` vs `allocUnsafe`：为什么后者快但可能泄露旧数据
- Buffer vs 浏览器 ArrayBuffer/Uint8Array：差异与互转
- 字符编码：UTF-8 中的多字节字符怎么在 Buffer 中存储
- 大端序 vs 小端序：网络协议中的字节序问题
- 实战：解析自定义二进制协议

**与前篇关联**：系列第一篇，无前篇。

---

### 02. Stream：流式处理实战

**核心问题**：你写了一个脚本处理 CSV 文件，测试时用的 100KB 样本文件一切正常，上了生产遇到 2GB 的文件直接 OOM 崩溃。Stream 怎么解决这个问题？

**独立案例**：一个数据分析脚本需要处理 2GB 的 CSV 导出文件，提取特定列并写入新文件。你用 Stream 实现"读一块、处理一块、写一块"，内存占用始终只有 64KB。

**内容要点**：

- 为什么需要 Stream（内存限制 vs 数据量的矛盾）
- 四种流类型：Readable、Writable、Duplex、Transform
- `pipe()` vs `pipeline()`：为什么后者才是生产推荐
- 背压机制：快生产者 + 慢消费者会发生什么
- `highWaterMark`：缓冲区大小如何影响吞吐量
- 自定义 Transform 流：实现一个 CSV 列提取器
- Stream vs 一次性读取的性能差异

**与前篇关联**：Buffer（第 1 篇）是理解 Stream 的前提——Stream 传输的数据单元就是 Buffer。

---

### 03. Event Loop：事件循环深度剖析

**核心问题**：你写了 `fs.readFile` 后面的代码，发现它在文件读完之前就执行了。你知道这是"异步"，但 `setTimeout(fn, 0)` 不是真的立即执行，`Promise.then` 和 `process.nextTick` 哪个先跑？

**独立案例**：你的 Node.js 脚本同时在做三件事：读取配置文件（I/O）、定时发送心跳（Timer）、处理命令行输入（ stdin）。你需要理解它们的执行顺序，才能避免心跳阻塞配置读取。

**内容要点**：

- 为什么 Node.js 用单线程 + 事件循环（而不是每请求一线程）
- libuv 的六个阶段：timers → pending callbacks → idle/prepare → poll → check → close
- `setTimeout` vs `setImmediate`：顺序取决于当前处于哪个阶段
- `process.nextTick` vs `Promise.then`：nextTick 优先级更高
- 微任务 vs 宏任务：和浏览器事件循环的异同
- 事件循环阻塞检测：`monitorEventLoopDelay`
- CPU 密集任务拆分：用 `setImmediate` 分片

**与前篇关联**：前两篇的 Stream 和文件操作都是异步的，这一篇解释"异步到底是怎么执行的"。

---

## 核心篇：引入主线案例，构建服务骨架（04-06）

目标：在前三篇建立的认知基础上，开始构建日志处理服务。模块系统组织代码，文件系统实现存储，HTTP 模块提供查询 API。

---

### 04. 模块系统：CommonJS 与 ESM

**核心问题**：你的项目里一半用 `require()`，一半用 `import`。有些 npm 包只支持 CJS，有些只支持 ESM。`__dirname` 在 ESM 里报错。双包地狱是什么鬼？

**主线案例**：把日志服务的代码组织成规范的 ESM 模块结构——`src/parser/` 解析模块、`src/storage/` 存储模块、`src/server/` 服务模块。同时处理一个遗留 CJS 依赖的兼容问题。

**内容要点**：

- CJS 的运行时加载：`require()` 的执行流程和缓存机制
- ESM 的编译时静态分析：`import` vs `import()`
- `__dirname` 和 `__filename` 在 ESM 中的替代方案
- `module.exports` vs `exports`：CJS 中一个常见的坑
- ESM 的只读绑定：为什么 import 的值是"活的"
- 顶层 await：ESM 独有的能力
- 双包问题与条件导出：`package.json` 的 `exports` 字段
- 循环依赖：CJS 和 ESM 处理方式的差异

**与前篇关联**：前三篇的代码都是单文件示例，这一篇把代码组织成模块结构，为后续的日志服务项目打好基础。

---

### 05. 文件系统：日志存储与读写

**核心问题**：日志服务最基本的功能就是存日志和查日志。但 `fs` 模块有三套 API，文件描述符要手动关闭，跨平台路径要处理……

**主线案例**：实现日志服务的存储层——按日期分目录存储（`logs/2026-03/15.log`），流式追加写入，超过 100MB 自动轮转压缩归档。

**内容要点**：

- 三套 API 风格：同步、回调、Promise
- 文件描述符：`fs.open` 拿到的 fd 为什么不关闭会泄露
- 流式写入：`createWriteStream` 的 append 模式
- `fs.watch` vs `fs.watchFile`：文件变更监听
- 日志轮转：按大小分割 + 历史压缩归档
- `path` 模块：跨平台路径处理

**与前篇关联**：用 ESM（第 4 篇）组织好的模块结构，实现存储模块。用 Stream（第 2 篇）写入日志，用 Buffer（第 1 篇）处理二进制数据。

---

### 06. HTTP/HTTPS：构建查询 API

**核心问题**：日志存好了，怎么让其他服务查询？`http.createServer` 的回调嵌套让你怀疑人生。请求体怎么解析？响应头怎么设置？

**主线案例**：为日志服务构建 HTTP API——`GET /api/logs?level=ERROR&service=payment-gateway&from=...&to=...` 支持按级别、服务名、时间范围过滤，返回 JSON 结果，支持分页和 gzip 压缩。

**内容要点**：

- `http.createServer` vs Express/Koa：为什么有时候不用框架更好
- `IncomingMessage` 和 `ServerResponse`：请求和响应对象
- 解析请求体：URL 参数、JSON body
- 流式响应：用 Readable 作为响应体处理大量日志
- HTTP 状态码的正确使用
- HTTPS 配置：证书加载、TLS 版本控制
- Keep-Alive 连接复用

**与前篇关联**：存储层（第 5 篇）做好了，这一篇在上面加 HTTP API 层。查询大量日志时复用 Stream（第 2 篇）做流式响应。

---

## 进阶篇：案例持续演进，深入底层能力（07-09）

目标：日志服务的功能继续扩展——TCP 协议接入日志采集端，多线程处理 CPU 密集分析，加密保护敏感数据。

---

### 07. 网络编程：TCP/UDP 实战

**核心问题**：HTTP 太重了。日志采集端只需要往服务器发数据，不需要请求-响应模型。TCP 和 UDP 分别适合什么场景？

**主线案例**：实现日志采集端的 TCP 接入协议——客户端通过 TCP 长连接推送日志，服务端用自定义的二进制帧格式（第 1 篇设计的协议）解析。同时实现基于 UDP 的服务发现心跳机制。

**内容要点**：

- TCP vs UDP：可靠传输 vs 低延迟
- `net.createServer`：TCP 服务端的基本模式
- 自定义应用层协议：长度前缀帧格式
- TCP 粘包问题：为什么两次 `data` 事件可能收到不完整的数据
- Socket 事件：`close`、`error`、`timeout` 的正确处理
- `dgram.createSocket`：UDP 的发送和接收
- TCP Keep-Alive vs 应用层心跳

**与前篇关联**：HTTP API（第 6 篇）适合外部查询，TCP（第 7 篇）适合日志采集。二进制协议复用第 1 篇的 Buffer 解析逻辑。

---

### 08. 并发编程：子进程与 Worker Threads

**核心问题**：日志服务需要调用外部命令压缩日志、在历史日志中搜索关键词，还要对大量日志做统计分析。单线程处理 500MB 数据要跑 30 秒，事件循环被完全阻塞。怎么利用多核 CPU？

**主线案例**：用子进程调用 `gzip` 压缩归档和 `grep` 搜索历史日志（设计可复用的进程池），用 Worker Threads 将日志分析任务切分后并行处理。

**内容要点**：

- `spawn` vs `exec` vs `execFile` vs `fork`：四种子进程创建方式
- `spawn` 的流式 I/O：通过 stdin/stdout 和子进程交换数据
- `exec` 的 Shell 注入风险
- `fork` 的 IPC 通信：父子进程之间的消息传递
- `worker_threads`：Worker、parentPort、workerData
- `SharedArrayBuffer` + `Atomics`：共享内存的读写同步
- Worker vs 子进程：什么时候用哪个
- 进程池设计：复用子进程

**与前篇关联**：子进程适合调用外部命令，Worker Threads 适合纯 JavaScript 计算。两者互补，共同解决日志服务的并发需求。

---

### 09. 加密与安全：数据保护实战

**核心问题**：日志中包含用户手机号、邮箱等敏感信息，不能明文存储。API 接口需要认证，防止未授权访问。日志文件需要完整性校验，防止篡改。

**主线案例**：为日志服务实现三层安全——敏感字段 AES-GCM 加密存储、API 接口 HMAC 签名认证、日志文件 SHA-256 完整性校验。

**内容要点**：

- 哈希函数：MD5/SHA-1/SHA-256 的区别和选型
- 流式哈希：`createHash` 配合 Stream 计算大文件哈希
- AES 对称加密：CBC vs GCM，为什么推荐 GCM
- HMAC 签名：API 认证中的消息防篡改
- 密钥管理：密钥从哪来、怎么存、怎么轮换
- `crypto.randomBytes`：为什么不要用 `Math.random()` 生成安全随机数
- `timingSafeEqual`：防止时序攻击

**与前篇关联**：日志服务已有 HTTP API（第 6 篇）和文件存储（第 5 篇），这一篇给它们加上安全层。

---

## 实战篇：生产可用，完善工程能力（10-12）

目标：完善错误处理、性能监控、调试能力，最终容器化部署上线。

---

### 10. 错误处理：异步世界的异常捕获

**核心问题**：日志服务跑了几天突然挂了，日志里只有一行 `Error: ECONNREFUSED`，完全不知道是哪个请求触发的。`try-catch` 抓不住 Promise 里的错误，`unhandledRejection` 不知道从哪冒出来的。

**主线案例**：为日志服务建立完整的错误处理体系——自定义错误类（区分业务错误和系统错误）、全局错误兜底、HTTP 接口的统一错误响应、结构化错误日志。

**内容要点**：

- 同步 vs 异步错误：为什么 `try-catch` 对 Promise 无效
- `uncaughtException` vs `unhandledRejection`：处理方式不同
- 自定义错误类：`AppError` + `ValidationError` / `StorageError`
- 全局兜底：最后一道防线
- HTTP 接口的统一错误响应
- 结构化错误日志：只记有用的信息
- 什么时候崩溃重启，什么时候捕获恢复
- 指数退避重试

**与前篇关联**：前 9 篇的代码中错误处理都比较简单，这一篇统一升级为生产级。

---

### 11. 性能监控与调试

**核心问题**：线上日志服务的响应时间从 50ms 涨到了 2s，但你不知道瓶颈在哪。是 CPU 跑满了？内存泄漏了？还是磁盘 I/O 太慢？找到瓶颈后，怎么在不修改代码的情况下深入运行中的程序定位 bug？

**主线案例**：为日志服务接入性能监控（自定义指标收集、事件循环延迟监控、内存追踪），同时掌握用 Chrome DevTools 和 VS Code 调试器定位生产问题的方法。

**内容要点**：

- `PerformanceObserver` 和 `perf_hooks`：Node.js 内置的性能测量
- 自定义 Metrics：P50/P95/P99 响应时间统计
- 事件循环延迟监控：`monitorEventLoopDelay`
- `process.memoryUsage()`：heapUsed、heapTotal、rss
- 内存泄漏的常见模式：闭包、事件监听器、全局缓存
- CPU Profiling：`--prof` 和火焰图分析
- `--inspect` 与 Chrome DevTools 调试
- VS Code 调试配置：launch.json
- Source Map 的工作原理与配置
- 生产环境调试策略

**与前篇关联**：Event Loop（第 3 篇）的知识用于延迟监控，Worker Threads（第 8 篇）的 CPU 密集任务在这里做性能分析。

---

### 12. 部署与运维：最佳实践

**核心问题**：日志服务在本地跑得好好的，部署到服务器上各种问题——Node 版本不对、环境变量缺失、进程莫名退出。怎么保证开发和生产环境一致？进程挂了怎么自动重启？

**主线案例**：把日志服务容器化部署——Docker 多阶段构建、环境变量管理、PM2 进程管理、健康检查、优雅退出、日志收集。

**内容要点**：

- Docker 多阶段构建：构建阶段用完整镜像，运行阶段用 Alpine
- 环境变量管理：`.env` 文件、Docker 环境变量
- 优雅退出：SIGTERM 信号处理、正在处理的请求如何完成再退出
- 健康检查：HTTP 端点 + Docker HEALTHCHECK
- PM2 进程管理：cluster 模式、自动重启、内存限制
- 日志收集：为什么 `console.log` 在生产环境不够用
- 部署前检查清单

**与前篇关联**：日志服务的所有功能在前 11 篇中构建完成，这一篇让它在生产环境稳定运行。

---

## 学习路径图

```
基础篇 ────────────────────────────────────
  01 Buffer ──► 02 Stream ──► 03 Event Loop
                                   │
核心篇 ────────────────────────────────────
                             04 模块系统
                                   │
进阶篇 ────────────────────────────────────
     05 文件系统 ──► 06 HTTP API
                        │
                   07 TCP/UDP
                        │
                   08 并发编程
                        │
                   09 Crypto 安全
                                   │
实战篇 ────────────────────────────────────
  10 错误处理 ──► 11 性能与调试
                        │
                   12 部署运维
```

---

## 预期效果

完成本系列后，你将能够：

- 理解 Buffer 和 Stream，不再害怕二进制数据和大文件处理
- 理解 Event Loop 的执行模型，写出真正高效的异步代码
- 掌握 CJS 和 ESM 的差异，正确处理模块兼容问题
- 用 Node.js 原生模块构建 HTTP API、TCP 服务
- 用子进程和 Worker Threads 处理 CPU 密集任务
- 实现完整的错误处理和性能监控体系
- 将项目用 Docker 容器化部署上线

---

## 版本信息

- **Node.js**：22 LTS
- **TypeScript**：5.x
