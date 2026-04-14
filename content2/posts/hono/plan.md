# Hono 渐进式学习计划

## 背景

你用过 Express，但它太重了。你想试试边缘计算，Cloudflare Workers 的环境限制很多。你想要一个轻量、快速、能在边缘运行的框架。

Hono 就是为这个场景而生的。核心包只有 13KB，性能比 Express 快 3 倍，支持 Cloudflare Workers、Deno、Bun、Node.js。

### 技术栈

| 技术           | 用途            |
| -------------- | --------------- |
| Hono           | 轻量级 Web 框架 |
| TypeScript     | 类型安全        |
| Zod            | 数据验证        |
| Drizzle/Prisma | ORM             |
| Vitest         | 测试            |

---

## 主线案例：博客 API

整个系列围绕一个**博客 API**展开，逐步构建完整的后端服务。

**案例场景**：类似 Medium/Dev.to 的博客后端，支持文章 CRUD、用户认证、评论、标签分类。

---

## 系列节奏

```
基础篇（01-06）：核心能力
  → 入门、路由、中间件、请求响应、验证、错误处理

数据篇（07-08）：数据库集成
  → SQLite + Drizzle、CRUD 实战

功能篇（09-13）：生产特性
  → JWT 认证、文件上传、WebSocket、安全限流、边缘缓存

实战篇（14-18）：部署与优化
  → 测试、CF Workers 部署、Deno 部署、性能优化、完整项目
```

---

## 博客目录结构

```
content/posts/hono/
├── plan.md                          # 本计划文件
├── 01-getting-started.mdx           # Hono 快速入门
├── 02-routing-params.mdx            # 路由与参数
├── 03-middleware-system.mdx         # 中间件系统
├── 04-request-response.mdx          # 请求与响应
├── 05-validation-zod.mdx            # 数据验证
├── 06-error-handling.mdx            # 错误处理
├── 07-sqlite-drizzle.mdx            # 数据库集成
├── 08-crud-blog-api.mdx             # CRUD 实战
├── 09-authentication-jwt.mdx        # JWT 认证
├── 10-file-upload.mdx               # 文件上传
├── 11-websocket.mdx                 # WebSocket
├── 12-rate-limiting-security.mdx    # 安全与限流
├── 13-caching-edges.mdx             # 边缘缓存
├── 14-testing.mdx                   # 测试
├── 15-deploy-cloudflare.mdx         # Cloudflare Workers
├── 16-deploy-deno.mdx               # Deno Deploy
├── 17-performance-optimization.mdx  # 性能优化
└── 18-real-world-project.mdx        # 完整实战项目
```

---

## 基础篇：核心能力（01-06）

### 01. Hono 快速入门

**核心问题**：为什么选 Hono 而不是 Express？Hono 有什么优势？

**主线案例**：搭建第一个 Hono 应用，对比 Express。

### 02. 路由与参数

**核心问题**：怎么定义路由？怎么获取路径参数和查询参数？

**主线案例**：设计博客 API 的路由结构。

### 03. 中间件系统

**核心问题**：中间件是什么？怎么写自定义中间件？

**主线案例**：实现日志、CORS、认证中间件。

### 04. 请求与响应

**核心问题**：怎么处理请求体？怎么返回 JSON？怎么设置响应头？

**主线案例**：实现标准的 API 响应格式。

### 05. 数据验证

**核心问题**：怎么验证请求参数？Zod 怎么用？

**主线案例**：实现文章创建、更新时的参数验证。

### 06. 错误处理

**核心问题**：怎么统一处理错误？怎么返回友好的错误信息？

**主线案例**：实现全局错误处理器。

---

## 数据篇（07-08）

### 07. 数据库集成

**核心问题**：Hono 怎么连接数据库？Drizzle ORM 怎么集成？

**主线案例**：配置 SQLite + Drizzle。

### 08. CRUD 实战

**核心问题**：怎么实现完整的 CRUD API？

**主线案例**：实现博客文章、用户、评论的 CRUD。

---

## 功能篇（09-13）

### 09. JWT 认证

**核心问题**：怎么做 JWT 认证？怎么保护路由？

**主线案例**：实现用户注册、登录、Token 刷新。

### 10. 文件上传

**核心问题**：怎么处理文件上传？怎么限制大小和类型？

**主线案例**：实现文章封面图上传。

### 11. WebSocket

**核心问题**：Hono 怎么支持 WebSocket？怎么实现实时通知？

**主线案例**：实现实时评论更新。

### 12. 安全与限流

**核心问题**：怎么做限流？怎么防止 XSS、SQL 注入？

**主线案例**：实现速率限制和输入过滤。

### 13. 边缘缓存

**核心问题**：边缘环境怎么缓存数据？怎么用 KV 存储？

**主线案例**：实现 API 响应缓存。

---

## 实战篇（14-18）

### 14. 测试

**核心问题**：怎么测试 Hono 应用？

**主线案例**：用 Vitest 写单元测试和集成测试。

### 15. Cloudflare Workers

**核心问题**：怎么部署到 Cloudflare Workers？有什么限制？

**主线案例**：部署博客 API 到 CF Workers。

### 16. Deno Deploy

**核心问题**：怎么部署到 Deno Deploy？

**主线案例**：部署到 Deno Deploy。

### 17. 性能优化

**核心问题**：怎么优化 Hono 应用性能？

**主线案例**：分析瓶颈、优化查询、缓存策略。

### 18. 完整实战项目

**核心问题**：把所有知识整合起来，构建完整项目。

**主线案例**：完整的博客 API + 认证 + 缓存 + 部署。

---

## 预期效果

完成本系列后，你将能够：

- 理解 Hono 的核心优势和使用场景
- 掌握路由、中间件、验证等核心能力
- 集成数据库和 ORM
- 实现 JWT 认证和文件上传
- 部署到 Cloudflare Workers 和 Deno
- 优化应用性能
- 构建生产级 API
