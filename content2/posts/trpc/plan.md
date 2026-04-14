# tRPC 渐进式学习计划

## 背景

你做过全栈开发，后端定义了一个 User 接口，前端又得定义一遍。产品说加个字段，你得改两遍。忘了改一处，线上就报错。

tRPC 就是为了解决这个问题：前后端共享类型定义，后端改了类型，前端自动知道。不再需要手动同步接口定义，不再需要写 API 文档。

### 技术栈

| 技术                     | 用途               |
| ------------------------ | ------------------ |
| tRPC                     | 端到端类型安全 RPC |
| TypeScript               | 类型定义           |
| Zod                      | 运行时验证         |
| Next.js/Nuxt/NestJS/Hono | 框架集成           |

---

## 主线案例：协作任务管理平台

整个系列围绕一个**协作任务管理平台**展开，类似 Trello/Linear。

**案例场景**：

- 用户管理（注册、登录、权限）
- 项目和任务（CRUD、分配、状态流转）
- 实时协作（任务更新通知、在线用户）
- 文件上传

---

## 系列节奏

```
基础篇（01-05）：核心概念
  → tRPC 是什么、Router/Procedure、类型推断、中间件、Prisma 集成

框架篇（06-09）：框架集成
  → Next.js、Nuxt、NestJS、Hono

高级篇（10-13）：高级特性
  → 订阅、元数据优化、Monorepo、测试

实战篇（14-15）：完整项目
  → 实时代码编辑器、全栈电商
```

---

## 博客目录结构

```
content/posts/trpc/
├── plan.md                             # 本计划文件
├── 01-introduction-trpc.mdx            # tRPC 是什么
├── 02-routers-procedures.mdx            # Router 和 Procedure
├── 03-type-inference-autocompletion.mdx # 类型推断与自动补全
├── 04-middlewares-error-handling.mdx    # 中间件与错误处理
├── 05-prisma-integration.mdx            # Prisma 集成
├── 06-nextjs-integration.mdx            # Next.js 集成
├── 07-nuxt-integration.mdx              # Nuxt 集成
├── 08-nestjs-integration.mdx            # NestJS 集成
├── 09-hono-integration.mdx              # Hono 集成
├── 10-subscriptions.mdx                 # 实时订阅
├── 11-metadata-optimization.mdx         # 元数据与负载优化
├── 12-monorepo.mdx                      # Monorepo 架构
├── 13-testing.mdx                       # 测试
├── 14-realtime-code-editor.mdx          # 实战：协作代码编辑器
└── 15-fullstack-ecommerce.mdx          # 实战：全栈电商
```

---

## 基础篇：核心概念（01-05）

### 01. tRPC 是什么

**核心问题**：传统 API 开发为什么有类型重复问题？tRPC 怎么解决？

**主线案例**：对比 REST API 和 tRPC，展示类型安全的差异。

**内容要点**：

- 传统 API 的痛点：类型重复、文档维护
- tRPC 的核心价值：端到端类型安全
- 快速开始：第一个 tRPC 项目
- tRPC vs REST vs GraphQL

### 02. Router 和 Procedure

**核心问题**：Router 和 Procedure 是什么？Query、Mutation 有什么区别？

**主线案例**：设计任务管理平台的基础 API。

**内容要点**：

- Router 的组织方式
- Query：读取数据
- Mutation：修改数据
- 输入验证：zod schema
- 嵌套路由

### 03. 类型推断与自动补全

**核心问题**：类型是怎么从后端传到前端的？怎么获得完整类型提示？

**主线案例**：演示自动补全和类型检查。

**内容要点**：

- 类型推断机制
- AppRouter 类型导出
- React Hooks：useQuery、useMutation
- 类型安全的调用方式

### 04. 中间件与错误处理

**核心问题**：怎么做认证？怎么统一处理错误？

**主线案例**：实现认证中间件和权限控制。

**内容要点**：

- 中间件的概念
- 创建自定义中间件
- 认证中间件（JWT）
- TRPCError 和错误处理

### 05. Prisma 集成

**核心问题**：tRPC 和 Prisma 怎么配合？类型怎么自动传递？

**主线案例**：实现完整的 CRUD API。

**内容要点**：

- Prisma 配置
- 类型安全的数据访问
- CRUD 操作实现
- 关联数据加载

---

## 框架篇（06-09）

### 06. Next.js 集成

**核心问题**：Next.js App Router 怎么集成 tRPC？

**主线案例**：在 Next.js 中构建全栈应用。

**内容要点**：

- 项目配置
- App Router 集成
- 服务端/客户端组件中调用
- NextAuth.js 集成

### 07. Nuxt 集成

**核心问题**：Vue/Nuxt 生态怎么用 tRPC？

**主线案例**：在 Nuxt 中集成 tRPC。

**内容要点**：

- Nuxt Plugin 配置
- Composition API 集成
- 服务端渲染
- 与 Next.js 对比

### 08. NestJS 集成

**核心问题**：企业级 NestJS 后端怎么用 tRPC？

**主线案例**：在 NestJS 中构建微服务。

**内容要点**：

- 官方集成包
- Providers 和 Guards
- 微服务架构
- 服务间通信

### 09. Hono 集成

**核心问题**：怎么部署到 Cloudflare Workers？

**主线案例**：构建边缘 API。

**内容要点**：

- Hono tRPC 适配器
- Cloudflare Workers 部署
- 边缘缓存优化
- 冷启动优化

---

## 高级篇（10-13）

### 10. 实时订阅

**核心问题**：怎么实现实时数据推送？

**主线案例**：任务更新实时通知。

**内容要点**：

- Subscription 概念
- WebSocket 传输
- useSubscription Hook
- 实时聊天应用

### 11. 元数据与优化

**核心问题**：怎么减少数据传输？怎么做缓存？

**主线案例**：优化查询性能。

**内容要点**：

- 元数据系统
- 延迟加载
- 缓存策略
- 性能监控

### 12. Monorepo 架构

**核心问题**：Monorepo 中怎么组织 tRPC 项目？

**主线案例**：用 Turborepo 构建多应用项目。

**内容要点**：

- 项目结构
- Turborepo 集成
- 代码复用
- 独立部署策略

### 13. 测试

**核心问题**：怎么测试 tRPC 应用？

**主线案例**：编写单元测试和集成测试。

**内容要点**：

- tRPC 测试客户端
- Mock 数据
- 单元测试
- 集成测试

---

## 实战篇（14-15）

### 14. 实战：协作代码编辑器

**核心问题**：怎么实现实时协作编辑？

**主线案例**：类似 Google Docs 的代码编辑器。

**内容要点**：

- tRPC Subscription 实时同步
- CRDT 算法
- 冲突解决
- 性能优化

### 15. 实战：全栈电商

**核心问题**：完整电商系统怎么设计？

**主线案例**：商品、购物车、订单、支付。

**内容要点**：

- 系统架构
- 复杂业务建模
- 分布式事务
- 高并发优化
- 系列回顾

---

## 预期效果

完成本系列后，你将能够：

- 理解 tRPC 的核心价值
- 掌握 Router 和 Procedure 的使用
- 在主流框架中集成 tRPC
- 实现中间件和错误处理
- 与 Prisma 深度集成
- 构建实时订阅功能
- 在 Monorepo 中组织项目
- 编写测试
- 构建生产级应用
