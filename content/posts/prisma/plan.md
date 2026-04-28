# Prisma 系列重写计划

## 背景

现有 17 篇（16,424 行），典型的模板化问题：每篇以"## 前言"开头、堆砌 emoji 特性列表、代码堆砌、复选框式总结。与 Drizzle 系列重写前一样的问题。

重写目标：精简到 10 篇，每篇 250-550 行，实战导向，用博客系统作为主线案例。

## 文章类型

类型 A：技术类（ORM / TypeScript / 数据库）

## 新目录结构

删除全部 17 篇旧文件，创建 10 篇新文件：

```
content/posts/prisma/
├── plan.md
├── README.mdx
├── 01-why-prisma.mdx              为什么选 Prisma + 跑通第一个查询
├── 02-schema-design.mdx           Schema 定义与关系建模（五张表）
├── 03-crud-queries.mdx            CRUD 与查询技巧
├── 04-relations-loading.mdx       关联查询 include/select/N+1
├── 05-migrations.mdx              迁移管理与 Schema 演进
├── 06-transactions-middleware.mdx 事务与中间件
├── 07-type-safety-validation.mdx  类型安全与 Zod 验证
├── 08-performance.mdx             性能优化与多数据库
├── 09-framework-integration.mdx   Next.js 与 Hono 集成
└── 10-real-world-project.mdx      实战博客系统 + 测试 + 部署
```

## 阶段划分

**入门篇（01-02）**：建立直觉，跑通第一个查询
**核心篇（03-05）**：日常 80% 的操作
**进阶篇（06-08）**：复杂场景和工程实践
**实践篇（09-10）**：框架集成和完整项目

## 主线案例

博客系统贯穿 10 篇：01 单表 users → 02 五张表定义 → 03 文章 CRUD → 04 关联查询 → 05 Schema 变更 → 06 创建文章+标签事务 → 07 注册接口类型安全 → 08 首页查询优化 → 09 框架集成 → 10 完整项目

## 每篇大纲

### 01. 为什么选 Prisma 而不是手写 SQL

- 核心问题：TypeScript 项目数据库访问层怎么选
- 场景：改了字段名漏了一处 raw SQL 导致生产事故
- 要点：Prisma/TypeORM/raw SQL/Drizzle 同一查询对比、Prisma 架构（Schema→Generate→Client→Query Engine）、环境搭建、users 表跑通 create+findUnique、Prisma Studio
- Trade-off：Prisma 什么时候该用/别碰（Edge、极端性能）

### 02. Schema 设计：五张表撑起一个博客系统

- 核心问题：怎么定义真实项目的数据模型
- 场景：博客系统 users/posts/comments/tags/postsToTags
- 要点：字段类型、enum（DRAFT/PUBLISHED/ARCHIVED）、一对多、多对多（隐式vs显式中间表）、自引用（嵌套回复）、索引、软删除模式
- Trade-off：隐式中间表方便但不能加额外字段

### 03. CRUD 与查询技巧

- 核心问题：日常 80% 的数据库操作怎么做
- 场景：博客文章管理
- 要点：create/createMany/嵌套创建、findUnique/findMany/findFirst、update/updateMany/upsert、delete/deleteMany、where 过滤（AND/OR/NOT/contains/gt/lt）、orderBy+skip/take 分页、select 字段选择
- Trade-off：select 减少传输但类型变复杂

### 04. 关联查询：include、select 与 N+1 问题

- 核心问题：怎么高效查关联数据
- 场景：博客首页（文章+作者名）、详情页（文章+作者+标签+评论）
- 要点：include vs select 区别、嵌套加载、过滤关联数据、\_count 聚合、N+1 陷阱及解决方案
- Trade-off：include 简单但可能返回太多数据

### 05. 迁移管理：Schema 变更的安全之道

- 核心问题：Schema 改了数据库怎么跟着变
- 场景：上线后加封面图字段、评论加审核状态
- 要点：migrate dev vs deploy、迁移文件解读、db push 什么时候用、回滚方案、数据迁移、迁移冲突、种子数据
- Trade-off：migrate 安全可追溯 vs push 快但不可回溯

### 06. 事务与中间件

- 核心问题：多操作怎么保证一致性
- 场景：创建文章同时关联标签、注册用户同时创建默认设置
- 要点：$transaction 批量、$transaction 交互式、隔离级别/超时、Middleware 查询日志、Middleware 软删除、$extends 扩展
- Trade-off：事务有性能开销不要滥用

### 07. 类型安全与 Zod 验证

- 核心问题：从数据库到前端端到端类型安全
- 场景：用户注册接口全程类型安全
- 要点：Prisma 生成类型（User/UserCreateInput/PostWhereInput）、类型推断、Prisma.UserGetPayload 精确类型、Zod Schema、Hono+Zod 验证中间件、前后端共享类型
- Trade-off：类型安全开发成本 vs 维护收益

### 08. 性能优化与多数据库

- 核心问题：Prisma 查询慢了怎么排查优化
- 场景：博客首页从 500ms 优化到 50ms
- 要点：查询日志+慢查询检测、N+1 检测、$queryRaw 绕过 Prisma（全文搜索）、连接池管理、Prisma Accelerate 缓存、批量操作优化、多数据库切换（PostgreSQL/MySQL/SQLite/MongoDB）、读写分离
- Trade-off：$queryRaw 牺牲类型安全换性能

### 09. Next.js 与 Hono 集成

- 核心问题：Prisma 在真实项目架构里怎么用
- 场景：博客系统两种架构——Next.js SSR 全栈 vs Hono API 分离
- 要点：Server Components 直接用 Prisma、Server Actions、连接管理（开发环境泄漏问题）、Hono+Prisma API、Edge 兼容方案、错误码映射 HTTP 状态码
- Trade-off：全栈 vs API 分离怎么选

### 10. 实战项目：从零搭建博客系统

- 核心问题：把前九篇整合成可部署项目
- 场景：Monorepo 博客系统
- 要点：架构设计（pnpm workspace）、完整 Schema 整合、API 实现、前端实现、测试策略（Vitest）、部署方案（Vercel+Supabase / Cloudflare Workers）、上线检查清单、系列回顾、进阶方向
- Trade-off：Prisma 强项和短板总结
