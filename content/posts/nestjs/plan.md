# NestJS 渐进式博客系统学习计划

## 背景

本计划旨在通过一系列结构化的博客文章，帮助读者从零开始掌握 NestJS 后端开发。文章采用渐进式设计，从基础概念到生产级应用，每篇文章都包含丰富的代码示例和实战演练。

**技术栈选择标准**：

- ✅ 市场热门、社区活跃
- ✅ 长期维护、文档完善
- ✅ 企业级应用首选
- ✅ 与 NestJS 生态完美集成

**核心栈**：

- **框架**：NestJS 10.x
- **语言**：TypeScript 5.x
- **数据库**：PostgreSQL 16
- **ORM**：Prisma 5.x
- **验证**：class-validator + class-transformer
- **测试**：Jest
- **文档**：Swagger/OpenAPI
- **容器化**：Docker + Docker Compose
- **缓存**：Redis 7
- **消息队列**：BullMQ
- **部署**：Docker + Nginx

---

## 博客目录结构

```
content/nestjs/
├── plan.md                          # 本计划文件
├── 01-getting-started.mdx           # 环境搭建与第一个项目
├── 02-modules-dependency-injection.mdx  # 模块与依赖注入
├── 03-controllers-routing.mdx       # 控制器与路由
├── 04-providers-services.mdx        # 提供者与服务
├── 05-postgresql-prisma-setup.mdx   # 数据库与 ORM
├── 06-crud-operations.mdx           # CRUD 实战
├── 07-validation-pipes.mdx          # 数据验证与管道
├── 08-authentication-jwt.mdx        # JWT 认证
├── 09-authorization-guards.mdx      # 授权与守卫
├── 10-interceptors-logging.mdx      # 拦截器与日志
├── 11-exception-filters.mdx         # 异常处理
├── 12-file-upload.mdx               # 文件上传
├── 13-email-queue-bullmq.mdx        # 异步任务队列
├── 14-caching-redis.mdx             # 缓存策略
├── 15-websocket-gateway.mdx         # WebSocket 实时通信
├── 16-testing-unit-e2e.mdx          # 测试策略
├── 17-swagger-documentation.mdx     # API 文档
├── 18-docker-deployment.mdx         # Docker 部署
└── README.mdx                       # 系列索引
```

---

## 第一阶段：基础入门（2-3篇）

### 01. 环境搭建与第一个项目

**目标**：搭建开发环境，创建第一个 NestJS 项目，理解基本架构

**内容要点**：

- 为什么选择 NestJS（与 Express、Fastify 对比）
- NestJS 核心概念概述（模块、控制器、服务）
- 使用 Nest CLI 创建项目
- 项目结构详解
- 第一个 API：Hello World
- 热重载与开发体验优化

**实战示例**：

```typescript
// 创建简单的 REST API
// GET /hello
// GET /hello/:name
// POST /hello
```

---

### 02. 模块与依赖注入

**目标**：理解 NestJS 的模块化架构和依赖注入机制

**内容要点**：

- 模块（Module）的作用与组织方式
- @Module 装饰器详解（imports、providers、exports、controllers）
- 依赖注入（DI）原理
- 单例模式与请求作用域
- 循环依赖问题与解决
- 最佳实践：如何组织大型项目模块

**实战示例**：

```typescript
// 创建 UsersModule、AuthModule
// 模块间依赖与共享服务
// 使用 forwardRef 解决循环依赖
```

---

## 第二阶段：核心功能（3-4篇）

### 03. 控制器与路由

**目标**：掌握控制器创建和路由设计

**内容要点**：

- @Controller 装饰器
- 路由参数（@Param、@Query、@Body）
- 请求方法（GET、POST、PUT、PATCH、DELETE）
- 请求头与 Cookie（@Headers、@Ip）
- 响应状态码与响应头
- 路由通配符与参数验证
- 路由前缀与版本控制

**实战示例**：

```typescript
// 设计 RESTful API：/api/v1/users
// GET /users
// GET /users/:id
// POST /users
// PUT /users/:id
// DELETE /users/:id
```

---

### 04. 提供者与服务

**目标**：理解服务层设计，分离业务逻辑

**内容要点**：

- @Injectable 装饰器
- 服务（Service）的作用
- Provider 类型（服务、仓库、工厂等）
- 自定义 Provider（useClass、useValue、useFactory、useExisting）
- 可选注入（@Optional）
- 基于属性的注入

**实战示例**：

```typescript
// 创建 UserService、AuthService
// 实现用户注册、登录逻辑
// 使用 useFactory 配置数据库连接
```

---

## 第三阶段：数据持久化（2篇）

### 05. PostgreSQL + Prisma 完整指南

**目标**：掌握数据库设计和 ORM 使用

**内容要点**：

- 为什么选择 PostgreSQL（特性对比）
- 为什么选择 Prisma（vs TypeORM、Sequelize）
- Prisma Schema 设计
- 数据模型关系（一对一、一对多、多对多）
- Migration 管理
- Seeding 数据填充
- Prisma Client 使用
- 事务处理

**实战示例**：

```prisma
// schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
}
```

**Docker Compose 配置**：

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: nestjs
      POSTGRES_PASSWORD: nestjs
      POSTGRES_DB: nestjs_blog
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

### 06. CRUD 实战：构建博客文章 API

**目标**：将前面知识整合，实现完整的 CRUD 功能

**内容要点**：

- 完整的 CRUD 操作实现
- Prisma 查询进阶（where、include、select、orderBy、pagination）
- 软删除设计
- 数据转换与序列化
- 错误处理策略

**实战示例**：

```typescript
// 完整的 PostsController + PostsService
// GET /posts - 分页查询
// GET /posts/:id - 详情（包含作者信息）
// POST /posts - 创建
// PATCH /posts/:id - 更新
// DELETE /posts/:id - 删除（软删除）
```

---

## 第四阶段：进阶特性（4-5篇）

### 07. 数据验证与管道

**目标**：掌握数据验证机制

**内容要点**：

- 为什么需要验证
- ValidationPipe 内置管道
- DTO（Data Transfer Object）设计
- class-validator 装饰器详解
- class-transformer 类型转换
- 自定义验证规则
- 自定义管道
- 全局 vs 局部管道配置

**实战示例**：

```typescript
class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
}
```

---

### 08. JWT 认证完整实现

**目标**：实现用户认证系统

**内容要点**：

- 认证 vs 授权
- JWT 原理与结构
- Passport 策略
- @UseGuards 装饰器
- JWT 策略实现
- 自定义装饰器（@CurrentUser、@Public）
- Refresh Token 机制
- Token 黑名单（Redis）

**实战示例**：

```typescript
// POST /auth/register
// POST /auth/login
// POST /auth/refresh
// POST /auth/logout
// GET /auth/me

// 实现完整的认证流程
```

---

### 09. 授权与守卫

**目标**：实现基于角色的访问控制

**内容要点**：

- 守卫（Guard）的作用
- RolesGuard 实现
- @Roles 装饰器
- 基于资源的权限控制（PBAC）
- ACL（访问控制列表）
- Casbin 集成（可选）
- 权限缓存优化

**实战示例**：

```typescript
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete('/users/:id')
remove(@Param('id') id: string) {
  return this.usersService.remove(id)
}
```

---

### 10. 拦截器与日志

**目标**：掌握 AOP 编程思想

**内容要点**：

- 拦截器（Interceptor）的作用
- NestInterceptor 接口
- 日志拦截器实现
- 响应数据转换
- 请求超时处理
- 缓存拦截器
- 执行时间统计

**实战示例**：

```typescript
// LoggingInterceptor：记录所有请求
// TransformInterceptor：统一响应格式
// TimeoutInterceptor：超时处理
// CacheInterceptor：自动缓存
```

---

### 11. 异常处理

**目标**：统一错误处理机制

**内容要点**：

- HTTP 异常内置类
- ExceptionFilter 接口
- 全局异常过滤器
- 自定义业务异常
- 错误码设计
- 错误日志记录
- 友好的错误响应

**实战示例**：

```typescript
// BusinessException
// 全局 HttpExceptionFilter
// 统一响应格式：
// { success: false, code: 'USER_NOT_FOUND', message: '用户不存在' }
```

---

## 第五阶段：实战功能（3-4篇）

### 12. 文件上传

**目标**：实现文件上传功能

**内容要点**：

- FileInterceptor 单文件上传
- FilesInterceptor 多文件上传
- FileFieldsInterceptor 字段上传
- 文件类型验证
- 文件大小限制
- 存储策略（本地、OSS、S3）
- 图片处理（Sharp）

**实战示例**：

```typescript
// POST /upload/avatar
// POST /upload/gallery
// 实现用户头像上传、图片压缩
```

---

### 13. 异步任务队列（BullMQ）

**目标**：处理耗时任务

**内容要点**：

- 为什么需要消息队列
- Bull vs BullMQ
- Queue、Worker、Processor
- 任务优先级与延迟
- 任务重试策略
- 失败处理与死信队列
- 进度追踪
- UI 面板集成

**实战示例**：

```typescript
// 邮件发送队列
// 图片处理队列
// 数据导出任务
// 实现邮件发送异步化
```

---

### 14. 缓存策略（Redis）

**目标**：提升应用性能

**内容要点**：

- 缓存的应用场景
- @Cacheable 装饰器
- @CacheEvict 清除缓存
- 手动缓存管理
- 缓存过期策略
- 缓存穿透、击穿、雪崩
- 分布式缓存
- 缓存序列化

**实战示例**：

```typescript
// 用户信息缓存
// 文章列表缓存
// 热点数据缓存预热
```

---

### 15. WebSocket 实时通信

**目标**：实现实时功能

**内容要点**：

- WebSocket 原理
- @WebSocketGateway
- @SubscribeMessage
- @MessageBody
- Connected/Disconnected 生命周期
- 广播与定向推送
- 房间（Room）机制
- Socket.io 集成

**实战示例**：

```typescript
// 实时聊天室
// 在线用户列表
// 实时通知
// 实现简单聊天应用
```

---

## 第六阶段：生产部署（2-3篇）

### 16. 测试策略

**目标**：编写可靠的测试

**内容要点**：

- 单元测试 vs 集成测试 vs E2E 测试
- Jest 配置
- 测试工具链（supertest）
- Controller 测试
- Service 测试
- Repository 测试
- 测试覆盖率
- Mock 策略

**实战示例**：

```typescript
// UserService 单元测试
// UsersController 集成测试
// Auth E2E 测试
```

---

### 17. API 文档（Swagger）

**目标**：自动生成 API 文档

**内容要点**：

- Swagger/OpenAPI 规范
- @nestjs/swagger 配置
- @ApiProperty 装饰器
- DTO 文档化
- API 分组
- 认证配置
- 响应示例
- 文档部署

**实战示例**：

```typescript
// 完整的 Swagger 文档配置
// 访问 /api-docs 查看文档
```

---

### 18. Docker 部署与生产优化

**目标**：容器化部署

**内容要点**：

- Dockerfile 最佳实践
- 多阶段构建
- Docker Compose 完整配置
- 环境变量管理
- Nginx 反向代理配置
- 健康检查
- 日志管理
- 安全配置

**实战示例**：

```dockerfile
# 多阶段 Dockerfile
# Docker Compose（App + PostgreSQL + Redis）
# Nginx 配置
```

**生产优化**：

- PM2 部署（替代方案）
- 环境变量验证
- 安全头部配置
- Rate Limiting
- CORS 配置
- Helmet 安全
- 压缩中间件

---

## 附录

### A. 开发工具推荐

- **IDE**：VSCode + NestJS Helper Extension
- **API 测试**：Postman / Insomnia / Thunder Client
- **数据库管理**：TablePlus / DBeaver / Prisma Studio
- **Redis 客户端**：RedisInsight
- **监控**：NestJS DevTools

### B. 常见问题与解决方案

1. **循环依赖**：使用 forwardRef() 解决
2. **启动慢**：使用动态模块懒加载
3. **内存泄漏**：注意定时器和连接管理
4. **并发问题**：使用数据库事务和锁

### C. 进阶主题（可选扩展）

- GraphQL 集成
- 微服务架构（NestJS Microservices）
- gRPC 通信
- Event Sourcing + CQRS
- MongoDB 替代方案
- CI/CD 配置
- 监控与告警（Prometheus + Grafana）

---

## 写作规范

### 每篇文章结构

````markdown
---
title: "文章标题"
date: "YYYY-MM-DD"
summary: "一句话总结（100字以内）"
tags: ["NestJS", "相关标签"]
category: "nestjs"
cover: ""
draft: false
series: "NestJS 渐进式博客系统"
seriesOrder: N
---

## 前言/背景

解释为什么需要学习这个主题，它解决了什么问题。

## 核心概念

用通俗易懂的语言解释核心概念，配合图示。

## 实战演练

### 示例 1：标题

```typescript
// 完整可运行的代码
```
````

**代码解释**：

- 详细说明每行代码的作用
- 为什么要这样写

### 示例 2：标题

...

## 最佳实践

总结 3-5 个关键要点

## 常见问题

Q&A 格式

## 总结

用 3-5 个要点回顾本文核心内容

## 下一步

预告下一篇文章的内容

```

### 代码示例要求

1. **完整性**：每个示例都是可独立运行的代码
2. **渐进式**：从简单到复杂，逐步深入
3. **注释**：关键代码添加中文注释
4. **错误处理**：展示正确的错误处理方式
5. **TypeScript**：充分利用类型系统

### 实战项目贯穿

所有文章围绕一个统一的实战项目展开：**博客系统 API**

**功能模块**：
- 用户管理（注册、登录、资料）
- 文章管理（CRUD、发布、草稿）
- 评论系统
- 标签分类
- 文件上传
- 邮件通知
- 实时聊天

这样读者可以在学习过程中逐步构建出一个完整的应用。

---

## 学习路径图

```

┌─────────────────────────────────────────────────────────────┐
│ NestJS 学习路径 │
├─────────────────────────────────────────────────────────────┤
│ │
│ 第一阶段：基础入门 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 01. 环境搭建 │ ───► │ 02. 模块与DI │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ 第二阶段：核心功能 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 03. 控制器路由 │ ───► │ 04. 提供者服务 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ 第三阶段：数据持久化 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 05. PostgreSQL │ ───► │ 06. CRUD 实战 │ │
│ │ + Prisma │ └──────────────────┘ │
│ └──────────────────┘ │ │
│ │ │ │
│ ▼ ▼ │
│ 第四阶段：进阶特性 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 07. 验证管道 │ 08. JWT认证 │ 09. 授权守卫 │ │
│ ├─────────────────────────────────────────────┤ │
│ │ 10. 拦截器 │ 11. 异常处理 │ │
│ └─────────────────────────────────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ 第五阶段：实战功能 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 12. 文件上传 │ 13. 消息队列 │ 14. 缓存 │ │
│ ├─────────────────────────────────────────────┤ │
│ │ 15. WebSocket │ │
│ └─────────────────────────────────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ 第六阶段：生产部署 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 16. 测试 │ ───► │ 17. API文档 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────────────────────────────────┐ │
│ │ 18. Docker 部署与生产优化 │ │
│ └──────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘

```

---

## 预期效果

完成本系列学习后，读者将能够：

1. ✅ 独立搭建 NestJS 项目
2. ✅ 设计 RESTful API
3. ✅ 实现完整的认证授权系统
4. ✅ 熟练使用 Prisma 操作数据库
5. ✅ 处理文件上传、异步任务等常见需求
6. ✅ 编写单元测试和 E2E 测试
7. ✅ 使用 Docker 容器化部署
8. ✅ 具备企业级后端开发能力

---

## 版本信息

- **NestJS**：10.x（LTS）
- **Node.js**：20.x LTS
- **TypeScript**：5.x
- **Prisma**：5.x
- **PostgreSQL**：16
- **Redis**：7.x
- **BullMQ**：5.x

*计划创建日期：2026-03-19*
*预计完成时间：3-4个月（每周 1-2 篇）*
```
