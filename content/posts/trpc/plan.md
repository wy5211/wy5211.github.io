# tRPC 渐进式学习计划

## 背景

tRPC 解决了一个真实的痛点：TypeScript 全栈开发中前后端类型定义的重复。但现有的 tRPC 教程大多停留在"官方文档翻译"层面，缺少一个从真实业务场景出发、逐步演进的实战指南。

这个系列的目标是：**让读者在阅读过程中，像在真实项目中工作一样，逐步构建一个完整的应用。**

### 技术栈

- tRPC v11+（使用最新稳定版）
- TypeScript 5.x
- Zod（输入验证）
- Prisma（数据库）
- Next.js 14+（App Router）
- React 18+

### 主线案例：团队任务协作平台（TaskFlow）

贯穿全系列的真实案例——一个类似 Linear/Notion 的轻量级任务管理工具。案例从一个最简单的"创建任务"接口开始，随着文章深入逐步叠加认证、权限、实时通知、关联查询等复杂度。

选择这个案例的原因：

- 业务场景真实（每个开发团队都需要任务管理）
- 包含丰富的数据关系（用户、项目、任务、评论、标签）
- 自然需要各种 tRPC 特性（认证、分页、实时、关联查询）

## 学习阶段划分

### 基础篇（第 1-2 篇）：快速上手，建立直觉

用独立的小案例降低入门门槛，让读者快速感受到 tRPC 的价值。

### 核心篇（第 3-5 篇）：深入原理，案例开始

引入 TaskFlow 主线案例，深入 tRPC 的核心机制。每篇在案例基础上继续演进。

### 框架篇（第 6 篇）：框架集成

只在 Next.js 上深入（受众最广），其他框架（Nuxt、Hono）在末尾简要对比。

### 进阶篇（第 7 篇）：高级特性

订阅、性能优化、Monorepo 模式，结合 TaskFlow 案例展示真实用法。

### 实战篇（第 8 篇）：完整项目收尾

用一个完整的端到端流程展示 TaskFlow 的核心功能，整合所有知识。

---

## 博客目录结构

```
content/posts/trpc/
├── plan.md
├── 01-why-trpc.mdx
├── 02-core-concepts.mdx
├── 03-type-safety.mdx
├── 04-middleware-auth.mdx
├── 05-prisma-integration.mdx
├── 06-nextjs-integration.mdx
├── 07-advanced-patterns.mdx
└── 08-taskflow-in-production.mdx
```

---

## 每篇文章大纲

### 01. 为什么需要 tRPC

**文件名**：`01-why-trpc.mdx`

**核心问题**：传统 API 开发中类型同步的痛点到底是什么？tRPC 用什么方式解决了它？

**主线案例**：无独立案例，用日常开发场景引入

**内容要点**：

1. **从一个真实的问题开始**
   - 你刚改了后端的 User 接口加了 avatar 字段，前端跑了一整天才发现线上有个页面用了旧接口
   - 引出问题：类型定义在不同端之间的同步，是一个工程问题，不是技术问题

2. **传统方案为什么不够好**
   - 手动同步：靠人肉维护，容易遗漏
   - OpenAPI/Swagger：需要额外维护 Schema，工具链重
   - GraphQL：Schema 即文档不错，但类型生成需要额外步骤
   - 共享 npm 包：可行但构建流程复杂

3. **tRPC 的思路**
   - 不定义 Schema，代码本身就是 Schema
   - 利用 TypeScript 的 `typeof` 实现类型"穿越"
   - 一图胜千言：类型从后端 Router → typeof → 前端 Client 的流程

4. **5 分钟快速体验**
   - 最小的可运行示例（独立文件，不需要框架）
   - 让读者亲手跑起来，感受类型推断的"魔法"

5. **什么时候该用 / 不该用 tRPC**
   - 适合：TypeScript 全栈、中小团队、快速迭代
   - 不适合：公开 API、多语言后端、需要 GraphQL 灵活查询的场景
   - 关键判断标准：你的前端和后端是否共享同一个 TypeScript 项目或 monorepo？

**与前篇的关联**：无（系列第一篇）

---

### 02. 核心概念：Router、Procedure 与输入验证

**文件名**：`02-core-concepts.mdx`

**核心问题**：tRPC 的 API 是怎么组织的？Router、Procedure、输入验证之间的关系是什么？

**主线案例**：TaskFlow 项目初始化——设计第一个"创建项目"接口

**内容要点**：

1. **承接上篇**
   - 上篇我们用 20 行代码跑通了 tRPC，但真实项目的 API 不可能全写在一个文件里。今天来解决 API 的组织问题。

2. **Router：API 的文件夹**
   - 为什么需要 Router（类比文件系统的目录结构）
   - 嵌套 Router 和命名空间
   - mergeRouters 的使用场景
   - TaskFlow 的 Router 设计：projects、tasks、users、comments

3. **Procedure：API 的函数**
   - 三种类型：query（读）、mutation（写）、subscription（实时）
   - 为什么区分读写？不只是语义，还影响客户端缓存策略（React Query 的 query vs mutation）
   - 一个 procedure 从定义到被调用的完整流程

4. **输入验证：Zod 让类型安全更完整**
   - 为什么需要运行时验证（TypeScript 类型在编译后就消失了）
   - Zod schema 定义 → 自动推断 TypeScript 类型 → tRPC 自动验证
   - 实战：TaskFlow 的"创建项目"接口，用 Zod 定义完整的输入规则

5. **输出类型：让 tRPC 帮你推断**
   - 不需要手动标注返回类型，tRPC 会自动推断
   - 但要注意：如果返回值结构复杂或需要精确控制，可以手动标注

**与前篇的关联**：上篇用最简代码体验了 tRPC，本篇解决真实项目中 API 的组织问题

---

### 03. 类型推断：从前端到后端的类型桥梁

**文件名**：`03-type-safety.mdx`

**核心问题**：tRPC 的类型推断到底是怎么工作的？前端如何获得完整的类型提示？

**主线案例**：TaskFlow 前端——在 React 组件中调用后端 API，体验类型安全

**内容要点**：

1. **承接上篇**
   - 上篇我们在后端定义了 TaskFlow 的 API，现在要在前端调用它。问题是：前端怎么知道后端 API 长什么样？

2. **类型传递的核心：typeof appRouter**
   - 为什么 `typeof` 是关键（它提取的是值的类型，不是值的运行时行为）
   - AppRouter 类型包含什么：Router 结构、每个 Procedure 的输入/输出类型
   - 用一个简单的类比解释：AppRouter 就像后端 API 的"目录"，前端拿到目录就知道能调用什么

3. **React Hooks 集成**
   - @trpc/react-query 的 useQuery、useMutation、useInfiniteQuery
   - 每个 Hook 的输入参数和返回值都是自动推断的
   - 实战：TaskFlow 的项目列表页（useQuery）和创建项目表单（useMutation）

4. **inferRouterOutputs / inferRouterInputs**
   - 当你需要在 Procedure 之外使用类型时（如表单类型、状态类型）
   - 实战：从 TaskFlow 的 API 推断出 Project 类型，用于前端状态管理

5. **类型推断的边界和陷阱**
   - Date 序列化问题（JSON 没有日期类型）→ superjson 解决
   - 循环引用（Post 引用 Author，Author 引用 Post）→ 手动标注返回类型
   - 返回 any 的 procedure 会污染整条类型链

**与前篇的关联**：上篇定义了 TaskFlow 的后端 API，本篇让前端"连上"这些 API，体验端到端类型安全

---

### 04. 中间件与认证：谁有权限做什么

**文件名**：`04-middleware-auth.mdx`

**核心问题**：如何在不重复代码的前提下，给不同的 API 加上认证、权限检查等横切逻辑？

**主线案例**：TaskFlow 的认证系统——用户登录后才能创建任务，只有项目成员才能查看任务

**内容要点**：

1. **承接上篇**
   - TaskFlow 的 API 已经能正常工作了，但有个大问题：任何人都能调用任何 API。我们需要区分"谁在调用"。

2. **Context：请求的"行李箱"**
   - Context 是什么：每个请求携带的共享数据（用户信息、数据库连接等）
   - 为什么 Context 比全局变量好（请求隔离、类型安全）
   - TaskFlow 的 Context：从 JWT Token 中提取用户信息

3. **中间件：在 Procedure 前后插入逻辑**
   - 中间件的执行流程（洋葱模型）
   - 创建可复用的 procedure：publicProcedure、protectedProcedure、adminProcedure
   - TaskFlow 实战：只有登录用户才能创建项目

4. **认证实战：JWT + tRPC**
   - 不用 NextAuth，手写一个最简 JWT 认证（让读者理解原理）
   - 登录流程：前端发送邮箱密码 → 后端验证 → 返回 JWT → 前端存储 → 后续请求携带
   - 在 Context 中解析 JWT，将用户信息注入

5. **错误处理**
   - TRPCError 的使用（错误码映射 HTTP 状态码）
   - 全局错误格式化（把 Zod 验证错误翻译成友好提示）
   - 客户端错误处理（React Query 的 error 状态）

**与前篇的关联**：上篇实现了 TaskFlow 的前端调用，本篇给 API 加上认证和权限控制

---

### 05. 数据库集成：Prisma + tRPC

**文件名**：`05-prisma-integration.mdx`

**核心问题**：tRPC + Prisma 如何实现从数据库到前端的完整类型安全链路？

**主线案例**：TaskFlow 的数据持久化——把内存数据迁移到 PostgreSQL

**内容要点**：

1. **承接上篇**
   - TaskFlow 的认证和 API 都就绪了，但数据还在内存里。服务器一重启，所有项目都没了。今天让数据持久化。

2. **为什么选 Prisma**
   - 和 tRPC 一样，Prisma 也是"代码即 Schema"的理念
   - Prisma 自动生成 TypeScript 类型，和 tRPC 的类型推断完美配合
   - 对比 TypeORM/Drizzle：不需要写装饰器/手动定义类型

3. **Schema 设计**
   - TaskFlow 的数据模型：User、Project、Task、Comment、Tag
   - 关系设计：Project 有多个 Task，Task 属于一个 Project
   - 用 Prisma 的关系语法表达，让类型自动生成

4. **CRUD 操作**
   - tRPC procedure + Prisma query 的标准写法
   - TaskFlow 实战：项目的 CRUD、任务的 CRUD
   - 关键技巧：用 select 控制返回字段（不返回密码等敏感信息）

5. **关联查询与分页**
   - include 和 select 的区别和选择
   - 游标分页 vs 偏移分页
   - TaskFlow 实战：获取项目详情时带出任务列表

**与前篇的关联**：上篇实现了认证，本篇让数据持久化到数据库，TaskFlow 开始变成一个"真正的应用"

---

### 06. Next.js 全栈集成

**文件名**：`06-nextjs-integration.mdx`

**核心问题**：在 Next.js App Router 中如何优雅地使用 tRPC？服务端组件和客户端组件分别怎么调用？

**主线案例**：TaskFlow 的 Web 界面——用 Next.js 构建完整的前端

**内容要点**：

1. **承接上篇**
   - TaskFlow 的后端已经完整了（API + 数据库 + 认证），现在需要给它一个 Web 界面。

2. **项目结构**
   - Next.js + tRPC 的推荐目录结构
   - tRPC Router 放在哪、类型怎么导出、API Route 怎么写
   - 为什么不需要 pages/api 目录（App Router 的 Route Handler）

3. **服务端组件中调用 tRPC**
   - Server Caller 的创建和使用
   - 为什么服务端组件中用 Server Caller 而不是 HTTP 调用（直接函数调用，无网络开销）
   - TaskFlow 实战：项目列表页用服务端组件渲染（SEO 友好，首屏快）

4. **客户端组件中调用 tRPC**
   - 需要交互的部分（表单、实时更新）用客户端组件
   - @trpc/react-query 的 Hooks
   - TaskFlow 实战：创建任务表单、任务拖拽排序

5. **认证集成**
   - NextAuth.js + tRPC 的 Context 对接
   - 服务端组件中获取 session 保护页面
   - 中间件保护 API

6. **其他框架简要对比**
   - Nuxt + tRPC：核心差异是 useAsyncData 替代 React Query
   - Hono + tRPC：适合边缘部署场景
   - 如果你的团队用 Vue/Nuxt，思路完全一样，只是 API 调用方式不同

**与前篇的关联**：上篇完成后端，本篇构建前端，TaskFlow 成为完整的全栈应用

---

### 07. 进阶特性：订阅、性能优化与 Monorepo

**文件名**：`07-advanced-patterns.mdx`

**核心问题**：当 TaskFlow 需要实时通知、多人协作时，tRPC 能提供什么？项目变大后怎么组织代码？

**主线案例**：TaskFlow 的实时协作——当有人创建新任务时，其他成员立即看到

**内容要点**：

1. **承接上篇**
   - TaskFlow 已经可以正常使用了，但有个体验问题：Alice 创建了一个任务，Bob 要刷新页面才能看到。在协作场景中，这不可接受。

2. **实时订阅（Subscriptions）**
   - tRPC Subscription 的工作原理（WebSocket）
   - 服务端：用 EventEmitter 或类似机制推送事件
   - 客户端：useSubscription Hook
   - TaskFlow 实战：新任务创建时实时通知项目成员

3. **性能优化**
   - 数据预取（prefetch）减少感知延迟
   - 缓存失效策略（invalidate 的精确控制）
   - HTTP 批处理（batching）减少请求数
   - 避免过度获取（select 控制字段）

4. **Monorepo 模式**
   - 什么时候需要 Monorepo（多个前端应用共享后端）
   - 推荐结构：apps/ + packages/
   - 类型共享：@taskflow/api 包导出 AppRouter 类型
   - 构建优化：Turborepo 缓存

**与前篇的关联**：上篇完成了全栈应用，本篇加入实时特性和工程化优化

---

### 08. 实战：TaskFlow 的生产级部署

**文件名**：`08-taskflow-in-production.mdx`

**核心问题**：一个真实的 tRPC 应用上线前还需要什么？如何保证质量和可维护性？

**主线案例**：TaskFlow 从开发到生产的完整流程

**内容要点**：

1. **承接上篇**
   - TaskFlow 功能完整了，但要把一个项目从"能跑"变成"能上线"，还有不少工作要做。

2. **测试**
   - 测试 tRPC procedure 的正确方式（createCaller 而不是 HTTP 请求）
   - 测试中间件（mock Context）
   - 测试数据库操作（Prisma 的 mock 方案）
   - TaskFlow 实战：测试"创建任务"流程

3. **错误监控与日志**
   - 结构化日志（每个请求的 request ID、耗时、错误信息）
   - 集成 Sentry 等监控工具
   - 慢查询检测

4. **部署**
   - Vercel 部署 Next.js + tRPC 的注意事项
   - 环境变量管理
   - 数据库迁移流程
   - CDN 和缓存策略

5. **系列回顾与路线图**
   - 从 8 篇文章中我们学到了什么
   - tRPC 生态的发展方向
   - 进一步学习的资源

**与前篇的关联**：上篇加入了高级特性，本篇关注工程化实践，完成从 0 到 1 的全过程

---

## 系列节奏规划

```
第 1 篇（基础）：独立小案例，感受 tRPC 的价值
第 2 篇（核心）：TaskFlow 项目初始化，设计 API 结构
第 3 篇（核心）：前端接入，体验端到端类型安全
第 4 篇（核心）：加入认证，API 开始有"身份"
第 5 篇（核心）：数据持久化，应用从"玩具"变"产品"
第 6 篇（框架）：构建 Web 界面，全栈应用成型
第 7 篇（进阶）：实时协作 + 工程化优化
第 8 篇（实战）：测试、监控、部署，走向生产
```

每篇之间 TaskFlow 案例持续演进，读者能感受到自己在"构建一个真实项目"。

## 预期效果

读者学完后将具备：

- 独立使用 tRPC 搭建类型安全的全栈 API
- 在 Next.js 中集成 tRPC，正确使用服务端/客户端组件
- 实现 JWT 认证、角色权限控制
- 用 Prisma + tRPC 实现数据库的端到端类型安全
- 理解 tRPC 的高级特性（订阅、性能优化）
- 具备将 tRPC 应用部署到生产环境的能力
