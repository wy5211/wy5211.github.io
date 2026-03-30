# Node.js 核心概念渐进式学习计划

## 背景

你是一个前端开发者，日常用 React/Vue 写页面，对 Node.js 的了解停留在 `npm install` 和 `node server.js`。最近团队要你帮忙写一个后端服务，或者你想给项目搭一个构建工具，打开 Node.js 文档一看——Buffer、Stream、Event Loop、libuv、Worker Threads……这些概念一个比一个抽象，官方文档又写得像参考手册。

这个系列就是为你准备的。我们从"为什么需要它"出发，带你逐步构建一个**实时日志处理服务**。每解决一个真实问题，你就自然掌握了 Node.js 的一个核心模块。

### 技术栈

| 技术       | 版本   | 说明                                   |
| ---------- | ------ | -------------------------------------- |
| Node.js    | 22 LTS | 当前 LTS 版本，内置 fetch、test runner |
| TypeScript | 5.x    | 类型安全，但不会让代码变得臃肿         |

> 本系列代码同时提供 CommonJS 和 ESM 两种写法的对比，但默认使用 ESM（`"type": "module"`），因为这是 Node.js 的未来方向。需要 CJS 的场景会特别说明。

---

## 主线案例：实时日志处理服务

整个系列围绕一个**实时日志处理服务**展开——想象你在做一个 SaaS 产品，每天产生数 GB 的日志，需要收集、解析、分析、存储，还要对外提供查询 API。

**案例场景**：一个类似 Sentry/Loki 的轻量级日志平台，支持日志采集、实时处理、告警通知、数据查询。

**案例数据示例**（贯穿全系列使用）：

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

**案例演进路线**：

```
第 1-2 篇：理解数据基础（Buffer + Stream）
  → 用 Buffer 解析二进制日志格式，用 Stream 流式处理大日志文件

第 3-4 篇：理解运行模型（Event Loop + 模块系统）
  → 掌握异步执行规律，把日志服务组织成合理的模块结构

第 5-6 篇：存储与网络（文件系统 + HTTP/HTTPS）
  → 日志持久化到文件，暴露 HTTP API 供外部查询

第 7-8 篇：底层网络与进程（TCP/UDP + 子进程）
  → TCP 健康检查协议，调用外部工具处理日志

第 9-10 篇：并发与安全（Worker Threads + Crypto）
  → 多线程日志分析，API 密钥签名与数据加密

第 11-12 篇：健壮性与可观测性（错误处理 + 性能监控）
  → 完善的错误处理体系，生产级性能监控

第 13-15 篇：工程化收尾（调试 + NPM + 部署）
  → 高效调试、打包发布、容器化部署
```

---

## 系列节奏

```
基础篇（01-04）：建立 Node.js 核心心智模型
  → Buffer/Stream 是数据处理基础，Event Loop 是执行模型，模块系统是组织方式

实战篇（05-10）：构建日志处理服务核心功能
  → 文件存储、HTTP API、TCP 协议、子进程、多线程、加密安全

工程篇（11-15）：让服务生产可用
  → 错误处理、性能监控、调试、NPM 包、Docker 部署
```

---

## 博客目录结构

```
content/posts/nodejs-core/
├── plan.md                              # 本计划文件
├── 01-buffer-binary-data.mdx            # Buffer：二进制数据的底层理解
├── 02-stream-pipeline.mdx               # Stream：流式处理实战
├── 03-event-loop-deep-dive.mdx          # Event Loop：事件循环深度剖析
├── 04-module-system-esm-cjs.mdx         # 模块系统：CommonJS 与 ESM
├── 05-filesystem-deep-dive.mdx          # 文件系统：日志存储与读写
├── 06-http-https-core-mechanisms.mdx    # HTTP/HTTPS：构建查询 API
├── 07-tcp-udp-network-programming.mdx   # 网络编程：TCP/UDP 实战
├── 08-process-child-process.mdx         # 进程管理：子进程与进程池
├── 09-worker-threads-cpu-intensive.mdx  # Worker Threads：多线程编程
├── 10-crypto-security.mdx               # 加密与安全：数据保护实战
├── 11-error-handling-async.mdx          # 错误处理：异步世界的异常捕获
├── 12-performance-profiling.mdx         # 性能监控：诊断与优化
├── 13-debugging-source-map.mdx          # 调试：Inspector 与 Source Map
├── 14-npm-ecosystem-publishing.mdx      # NPM 生态：包管理与发布
└── 15-deployment-operations.mdx         # 部署与运维：最佳实践
```

---

## 基础篇：建立 Node.js 核心心智模型（01-04）

目标：理解 Node.js 处理数据、执行异步、组织代码的底层机制。

---

### 01. Buffer：二进制数据的底层理解

**核心问题**：前端很少直接操作二进制数据，最多处理一下 FormData。但 Node.js 中，文件读写、网络通信、加密解密全都是二进制操作。Buffer 到底是什么？它和浏览器的 ArrayBuffer 有什么关系？

**主线案例**：日志服务需要解析一种自定义的二进制日志协议——`[4字节长度头][1字节级别][8字节时间戳][N字节日志体]`。你要用 Buffer 把这段二进制数据解析成可读的 JSON。

**内容要点**：

- 为什么 Node.js 需要 Buffer（V8 的字符串不能存任意二进制）
- Buffer 的内存模型：堆外内存、8KB 池化机制
- `alloc` vs `allocUnsafe`：为什么后者快但可能泄露旧数据
- Buffer vs 浏览器 ArrayBuffer/Uint8Array：差异与互转
- 字符编码：UTF-8 中的多字节字符怎么在 Buffer 中存储
- 大端序 vs 小端序：网络协议中的字节序问题
- 实战：解析自定义二进制日志协议

**与前篇关联**：系列第一篇，无前篇。

---

### 02. Stream：流式处理实战

**核心问题**：日志文件动辄几百 MB 甚至几个 GB。如果用 `fs.readFile` 一次性读入内存，你的 2GB 内存的服务器直接就 OOM 了。Stream 怎么解决这个问题？

**主线案例**：日志服务每天产生一个 500MB 的日志文件。你要用 Stream 实现三个功能：① 流式读取并解析二进制日志 ② 实时过滤 ERROR 级别日志写入单独文件 ③ 压缩归档历史日志。

**内容要点**：

- 为什么需要 Stream（内存限制 vs 数据量的矛盾）
- 四种流类型：Readable、Writable、Duplex、Transform
- `pipe()` vs `pipeline()`：为什么后者才是生产推荐
- 背压机制：快生产者 + 慢消费者会发生什么
- `highWaterMark`：缓冲区大小如何影响吞吐量
- 自定义 Transform 流：实现一个 LogParser 把二进制日志转成 JSON
- `pipeline()` 的错误处理：为什么 `pipe()` 不处理下游错误
- 对比：Stream vs 一次性读取的性能差异（用实际数据说话）

**与前篇关联**：上一篇用 Buffer 解析了单条日志记录，这一篇用 Stream 处理整个日志文件。Buffer 是理解 Stream 的前提。

---

### 03. Event Loop：事件循环深度剖析

**核心问题**：你写了 `fs.readFile` 后面的代码，发现它在文件读完之前就执行了。你知道这是"异步"，但具体是"怎么异步"的？为什么 `setTimeout(fn, 0)` 不是真的立即执行？`Promise.then` 和 `process.nextTick` 哪个先跑？

**主线案例**：日志服务同时在做三件事：读取日志文件（I/O）、定时清理过期日志（Timer）、处理查询请求（网络 I/O）。你需要理解它们的执行顺序，才能避免日志处理阻塞查询请求。

**内容要点**：

- 为什么 Node.js 用单线程 + 事件循环（而不是像 Java 那样每个请求一个线程）
- libuv 的六个阶段：timers → pending callbacks → idle/prepare → poll → check → close
- `setTimeout` vs `setImmediate`：顺序取决于当前处于哪个阶段
- `process.nextTick` vs `Promise.then`：nextTick 优先级更高，为什么这样设计
- 微任务 vs 宏任务：和浏览器事件循环的异同
- 事件循环阻塞检测：`monitorEventLoopDelay` 和自定义延迟监控
- CPU 密集任务如何拆分：用 `setImmediate` 分片避免阻塞事件循环

**与前篇关联**：前两篇的 Stream 和文件操作都是异步的，这一篇解释"异步到底是怎么执行的"。

---

### 04. 模块系统：CommonJS 与 ESM

**核心问题**：你的项目里一半用 `require()`，一半用 `import`。有些 npm 包只支持 CJS，有些只支持 ESM。`__dirname` 在 ESM 里报错。双包地狱（Dual Package Hazard）是什么鬼？

**主线案例**：把日志服务的代码组织成规范的 ESM 模块结构——`src/parser/` 解析模块、`src/storage/` 存储模块、`src/server/` 服务模块。同时处理一个遗留 CJS 依赖的兼容问题。

**内容要点**：

- CJS 的运行时加载：`require()` 的执行流程和缓存机制
- ESM 的编译时静态分析：为什么 `import()` 是动态的而 `import` 不是
- `__dirname` 和 `__filename` 在 ESM 中的替代方案
- `module.exports` vs `exports`：CJS 中一个常见的坑
- ESM 的只读绑定：为什么 import 的值是"活的"
- 顶层 await：ESM 独有的能力
- 双包问题：同一个包同时提供 CJS 和 ESM 版本时的陷阱
- 条件导出：`package.json` 的 `exports` 字段
- 循环依赖：CJS 和 ESM 处理循环依赖的方式完全不同

**与前篇关联**：前三篇的代码都是单文件的，这一篇把代码组织成模块结构，为后续的日志服务项目打好基础。

---

## 实战篇：构建日志处理服务核心功能（05-10）

目标：在基础篇建立的认知上，用 Node.js 核心模块构建日志处理服务的主要功能。

---

### 05. 文件系统：日志存储与读写

**核心问题**：日志服务最基本的功能就是存日志和查日志。但 `fs` 模块有三套 API（同步、回调、Promise），文件描述符、权限、符号链接……光一个 `fs.readFile` 就能踩一排坑。

**主线案例**：实现日志服务的存储层——按日期分目录存储日志文件（`logs/2026-03/15.log`），支持流式追加写入、按时间范围查询、日志轮转（超过 100MB 自动分割并压缩归档）。

**内容要点**：

- 三套 API 风格：`fs.readFileSync` vs `fs.readFile` callback vs `fs/promises`
- 文件描述符：`fs.open` 拿到的 fd 是什么，为什么不关闭会泄露
- 流式写入：用 `fs.createWriteStream` 的 `append` 模式追加日志
- `fs.watch` vs `fs.watchFile`：文件变更监听的区别和坑
- 日志轮转：按大小分割 + 历史压缩归档
- `path` 模块：跨平台路径处理的必要性
- `fs.stat` / `fs.access`：检查文件状态和权限

**与前篇关联**：上一篇用 ESM 组织好了模块结构，这一篇实现存储模块 `src/storage/log-store.js`，用 Stream（第 02 篇）写入日志，用 Buffer（第 01 篇）处理二进制数据。

---

### 06. HTTP/HTTPS：构建查询 API

**核心问题**：日志存好了，怎么让其他服务查询？`http.createServer` 的回调嵌套让你怀疑人生。请求体怎么解析？响应头怎么设置？HTTPS 证书怎么配？

**主线案例**：为日志服务构建 HTTP API——`GET /api/logs?level=ERROR&service=payment-gateway&from=...&to=...` 支持按级别、服务名、时间范围过滤日志，返回 JSON 格式结果，支持分页。

**内容要点**：

- `http.createServer` vs Express/Koa：为什么有时候不用框架更好
- `IncomingMessage` 和 `ServerResponse`：请求和响应对象的完整理解
- 解析请求体：URL 参数、JSON body、查询字符串
- 流式响应：用 `Readable` 作为响应体，处理大量日志数据
- HTTP 状态码的正确使用：不是所有错误都是 500
- HTTPS 配置：证书加载、TLS 版本控制
- Keep-Alive 连接复用：为什么对性能很重要
- `http2.createSecureServer`：HTTP/2 的服务端推送和多路复用

**与前篇关联**：存储层（第 05 篇）做好了，这一篇在上面加 HTTP API 层。查询大量日志时复用 Stream（第 02 篇）做流式响应。

---

### 07. 网络编程：TCP/UDP 实战

**核心问题**：HTTP 太重了。日志采集端只需要往服务器发数据，不需要 HTTP 的请求-响应模型。能不能用更轻量的协议？TCP 和 UDP 分别适合什么场景？

**主线案例**：实现日志采集端的 TCP 接入协议——客户端通过 TCP 长连接推送日志，服务端用自定义的长度前缀协议（第 01 篇设计的二进制格式）解析。同时实现一个 UDP 的服务发现/心跳机制。

**内容要点**：

- TCP vs UDP：可靠传输 vs 低延迟，什么时候选哪个
- `net.createServer`：TCP 服务端的基本模式
- 自定义应用层协议：长度前缀 + 类型 + 数据的帧格式
- TCP 粘包问题：为什么两次 `data` 事件可能收到不完整的数据
- Socket 事件：`close`、`error`、`timeout` 的正确处理
- `dgram.createSocket`：UDP 的发送和接收
- UDP 广播：服务发现中的心跳检测

**与前篇关联**：HTTP API（第 06 篇）适合外部查询，但日志采集端用 TCP（第 07 篇）更高效。二进制协议复用第 01 篇的 Buffer 解析逻辑。

---

### 08. 进程管理：子进程与进程池

**核心问题**：日志服务需要调用外部命令——用 `gzip` 压缩日志、用 `grep` 快速搜索、用 `wc` 统计行数。每次都 `exec()` 启动一个新进程？启动开销太大。能不能复用进程？

**主线案例**：实现日志的压缩归档（调用 `gzip` 压缩旧日志文件）和快速全文搜索（调用 `grep` 在历史日志中搜索关键词），同时设计一个进程池来管理常驻的 `grep` 工作进程。

**内容要点**：

- `spawn` vs `exec` vs `execFile` vs `fork`：四种子进程创建方式的区别
- `spawn` 的流式 I/O：通过 stdin/stdout 管道和子进程交换数据
- `exec` 的 Shell 注入风险：为什么用户输入不能直接拼进命令
- `fork` 的 IPC 通信：父子进程之间的消息传递
- 进程池设计：复用子进程，避免频繁创建销毁的开销
- 信号处理：SIGTERM 优雅退出、SIGPIPE 管道断裂
- 子进程的异常处理：`child.on('error')` 和 `child.on('exit')` 的区别

**与前篇关联**：TCP 日志接入（第 07 篇）做好了，这一篇加上日志的压缩归档和外部工具调用。

---

### 09. Worker Threads：多线程编程

**核心问题**：日志服务要对过去 24 小时的日志做统计分析——按小时聚合错误数量、计算 P99 响应时间。单线程处理 500MB 数据要跑 30 秒，事件循环被完全阻塞。怎么利用多核 CPU？

**主线案例**：用 Worker Threads 实现日志分析引擎——将大日志文件切分后分发给多个 Worker 并行处理，汇总统计结果。同时用 `SharedArrayBuffer` 实现共享的统计计数器。

**内容要点**：

- 为什么 Node.js 单线程还需要 Worker Threads（CPU 密集 vs I/O 密集）
- `worker_threads` 基本用法：`Worker`、`parentPort`、`workerData`
- `SharedArrayBuffer` + `Atomics`：共享内存的读写同步
- `Transferable` 对象：零拷贝数据传输
- 线程池设计：复用 Worker，避免频繁创建销毁
- Worker vs 子进程：什么时候用哪个（内存共享 vs 隔离性）
- `worker_threads` 的限制：不能共享 DOM、不能共享原生模块

**与前篇关联**：子进程（第 08 篇）适合调用外部命令，Worker Threads（第 09 篇）适合 CPU 密集的纯 JavaScript 计算。两者互补。

---

### 10. 加密与安全：数据保护实战

**核心问题**：日志中包含用户手机号、邮箱等敏感信息，不能明文存储。API 接口需要认证，防止未授权访问。日志文件需要完整性校验，防止篡改。Node.js 的 `crypto` 模块能做什么？

**主线案例**：为日志服务实现三层安全——① 敏感字段脱敏存储（AES 加密）② API 接口 HMAC 签名认证 ③ 日志文件的 SHA-256 完整性校验。

**内容要点**：

- 哈希函数：MD5/SHA-1/SHA-256 的区别和选型（MD5 和 SHA-1 为什么不安全了）
- 流式哈希：用 `crypto.createHash` 配合 Stream 计算大文件的哈希
- AES 对称加密：加密模式（CBC/GCM）的选择，为什么推荐 GCM
- HMAC 签名：API 认证中的消息防篡改
- 密钥管理：密钥从哪来、怎么存、怎么轮换
- `crypto.randomBytes`：为什么不要用 `Math.random()` 生成安全相关的随机数
- HTTPS 证书：自签名证书用于开发，Let's Encrypt 用于生产

**与前篇关联**：日志服务已经有 HTTP API（第 06 篇）和文件存储（第 05 篇），这一篇给它们加上安全层。

---

## 工程篇：让服务生产可用（11-15）

目标：完善错误处理、性能监控、调试能力，最终打包部署上线。

---

### 11. 错误处理：异步世界的异常捕获

**核心问题**：你的日志服务跑了几天突然挂了，看日志只看到一行 `Error: ECONNREFUSED`，完全不知道是哪个请求触发的。`try-catch` 抓不住 Promise 里的错误，`unhandledRejection` 又不知道从哪冒出来的。异步世界的错误处理为什么这么难？

**主线案例**：为日志服务建立完整的错误处理体系——自定义错误类（区分业务错误和系统错误）、全局错误捕获、HTTP 接口的错误中间件、结构化错误日志。

**内容要点**：

- 同步 vs 异步错误：为什么 `try-catch` 对 Promise 无效
- `uncaughtException` vs `unhandledRejection`：两者都要处理，但处理方式不同
- 自定义错误类：`AppError` 基类 + `ValidationError` / `NetworkError` 子类
- 错误码设计：比 HTTP 状态码更细粒度的业务错误码
- 错误的上下文信息：为什么只记录 `error.message` 不够
- Express/Koa 的错误中间件模式（如果用框架）
- 什么时候该让进程崩溃重启，什么时候该捕获并恢复

**与前篇关联**：前 10 篇的代码中错误处理都比较简单，这一篇统一升级为生产级的错误处理。

---

### 12. 性能监控：诊断与优化

**核心问题**：线上日志服务的响应时间从 50ms 慢慢涨到了 2s，但你不知道瓶颈在哪。是 CPU 跑满了？内存泄漏了？还是磁盘 I/O 太慢？

**主线案例**：为日志服务接入性能监控——自定义指标收集（请求耗时、队列长度、事件循环延迟）、内存使用追踪、V8 CPU Profiling 分析、内存泄漏排查。

**内容要点**：

- `PerformanceObserver` 和 `perf_hooks`：Node.js 内置的性能测量
- 事件循环延迟监控：`monitorEventLoopDelay` 和自定义 Health Check
- `process.memoryUsage()`：heapUsed、heapTotal、rss 分别是什么意思
- V8 Heap Snapshot：如何生成和分析堆快照
- CPU Profiling：`--prof` 标志和火焰图分析
- GC 日志：`--trace-gc` 和 GC 调优基础
- 内存泄漏的常见模式：闭包、事件监听器、全局缓存
- 自定义性能指标：设计一个轻量级的 `MetricsCollector`

**与前篇关联**：Event Loop（第 03 篇）的知识在这里用于延迟监控，Worker Threads（第 09 篇）的 CPU 密集任务在这里做性能分析。

---

### 13. 调试：Inspector 与 Source Map

**核心问题**：本地开发用 `console.log` 调试，生产环境出 bug 了怎么查？`node --inspect` 和 Chrome DevTools 怎么配合？TypeScript 编译后的代码在调试时怎么看原始源码？

**主线案例**：日志服务在处理某种特殊格式的日志时崩溃了。你用 Chrome DevTools 远程调试生产环境的问题，通过断点和调用栈定位到 Buffer 解析逻辑的边界条件 bug。

**内容要点**：

- `node --inspect`：V8 Inspector 协议的工作原理
- Chrome DevTools 连接：`chrome://inspect` 的使用
- VS Code 调试配置：`launch.json` 的各种场景（本地、远程、Docker）
- 断点调试技巧：条件断点、日志断点、Watch 表达式
- Source Map：为什么需要它、怎么生成、怎么配置
- 生产调试策略：为什么不应该在生产环境开 `--inspect`
- Node.js 的 `--enable-source-maps` 标志

**与前篇关联**：性能监控（第 12 篇）发现了问题，调试（第 13 篇）定位和修复问题。

---

### 14. NPM 生态：包管理与发布

**核心问题**：你的日志解析模块写得不错，其他团队也想用。怎么把它发布成 npm 包？`package.json` 里的 `dependencies` 和 `devDependencies` 到底该装哪里？`package-lock.json` 要不要提交到 Git？

**主线案例**：把日志服务的核心模块（二进制日志解析器）抽取为独立的 npm 包发布，包括完整的 TypeScript 类型声明、单元测试、CI/CD 发布流程。

**内容要点**：

- `package.json` 核心字段详解：`main`、`exports`、`types`、`files`
- `dependencies` vs `devDependencies` vs `peerDependencies`：什么时候装哪里
- `package-lock.json` vs `pnpm-lock.yaml`：锁文件的必要性
- 版本范围：`^`、`~`、精确版本、`x-ranges`
- npm publish 流程：`npm pack` 预览、`.npmignore`、访问控制
- `exports` 条件导出：CJS 和 ESM 双格式支持
- Monorepo：pnpm workspace 的基本用法
- npx：为什么它是"用一次就扔"的工具的最佳方式

**与前篇关联**：日志服务的模块（第 04 篇组织好的结构）可以抽取为独立 npm 包。

---

### 15. 部署与运维：最佳实践

**核心问题**：日志服务在本地跑得好好的，部署到服务器上各种问题——Node 版本不对、环境变量缺失、进程莫名退出。怎么保证开发和生产环境一致？进程挂了怎么自动重启？

**主线案例**：把日志服务容器化部署——Docker 多阶段构建、环境变量管理、PM2 进程管理、健康检查、优雅退出、日志收集。

**内容要点**：

- PM2 进程管理：cluster 模式利用多核、日志管理、进程监控
- Docker 多阶段构建：构建阶段用完整镜像，运行阶段用 Alpine
- 环境变量管理：`.env` 文件、`dotenv` 模块、Docker 环境变量
- 优雅退出：SIGTERM 信号处理、正在处理的请求如何完成再退出
- 健康检查：HTTP 健康检查端点 + Docker HEALTHCHECK
- 日志收集：为什么 `console.log` 在生产环境不够用
- Kubernetes 基础：Deployment + Service + ConfigMap（简要介绍）
- 生产检查清单：部署前必须确认的事项

**与前篇关联**：日志服务的所有功能在前 14 篇中构建完成，这一篇让它在生产环境稳定运行。

---

## 学习路径图

```
基础篇 ──────────────────────────────────────────
  01 Buffer ──► 02 Stream ──► 03 Event Loop
                                   │
                             04 模块系统
                                   │
实战篇 ──────────────────────────────────────────
     05 文件系统 ──► 06 HTTP API
                        │
                   07 TCP/UDP
                        │
                   08 子进程
                        │
                   09 Worker Threads
                        │
                   10 Crypto 安全
                                   │
工程篇 ──────────────────────────────────────────
  11 错误处理 ──► 12 性能监控 ──► 13 调试
                                     │
                               14 NPM 包
                                     │
                               15 部署运维
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
- 将项目打包为 npm 包并用 Docker 部署上线

---

## 版本信息

- **Node.js**：22 LTS
- **TypeScript**：5.x
