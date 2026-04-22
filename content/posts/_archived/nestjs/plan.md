# NestJS 渐进式学习计划

## 背景

你是一个有 Express 或 Spring Boot 经验的后端开发者，最近团队决定新项目用 NestJS。你打开官网看了一圈，发现概念很多——模块、装饰器、依赖注入、管道、守卫、拦截器……一时不知道从哪下手。

这个系列就是为你准备的。我们不会把 NestJS 的每个 API 翻译一遍，而是从"为什么需要它"出发，带你逐步构建一个**技术博客平台**的后端 API。每解决一个真实问题，你就自然掌握了一个 NestJS 特性。

### 技术栈选择

| 技术            | 版本  | 为什么选它                                                   |
| --------------- | ----- | ------------------------------------------------------------ |
| NestJS          | 10.x  | 企业级 Node.js 框架，Angular 风格的架构设计，内置 DI、模块化 |
| TypeORM         | 0.3.x | NestJS 官方推荐 ORM，装饰器语法和 NestJS 一脉相承            |
| PostgreSQL      | 16    | 功能最全的开源关系型数据库，JSON 支持好                      |
| class-validator | 0.14  | NestJS 验证管道的标准搭配                                    |
| Passport + JWT  | -     | NestJS 认证的官方方案                                        |
| BullMQ          | 5.x   | 基于 Redis 的任务队列，替代已停止维护的 Bull                 |
| Redis           | 7.x   | 缓存 + 队列 + 会话存储，一套服务多用                         |
| Docker + Nginx  | -     | 生产部署标准方案                                             |

> Prisma 也是 NestJS 生态中很受欢迎的 ORM 选择，本系列选择 TypeORM 是因为它和 NestJS 的装饰器风格更统一，DI 集成更原生。如果你想了解 Prisma，可以参考我们的 [Prisma 独立系列](/posts/prisma/01-getting-started)。

---

## 主线案例：技术博客平台

整个系列围绕一个**技术博客平台**的后端 API 展开，从零构建到部署上线。

**案例场景**：一个类似掘金/SegmentFault 的技术博客平台，支持用户注册登录、文章发布管理、评论互动、标签分类、邮件通知、实时评论等功能。

**案例数据示例**（贯穿全系列使用）：

```
用户：zhang_wei (usr_a1x9k2m)，前端工程师，2025年3月注册
文章：「从 Express 迁移到 NestJS 的踩坑记录」，浏览量 3842，12 条评论
标签：Node.js、后端架构、NestJS
评论：「同意作者说的 DI 部分，我们项目也遇到了循环依赖问题」
```

---

## 系列节奏

```
基础篇（01-03）：独立小案例，快速上手 NestJS
  → 每篇一个独立场景，降低入门门槛

核心篇（04-08）：引入博客平台案例，建立项目骨架
  → 设计数据模型、实现核心 CRUD、加上验证和错误处理

进阶篇（09-15）：案例持续演进，接近生产环境
  → 认证授权、文件上传、任务队列、缓存、实时通信

部署篇（16-18）：生产化收尾
  → 测试、文档、容器化部署
```

---

## 博客目录结构

```
content/posts/nestjs/
├── plan.md                              # 本计划文件
├── 01-getting-started.mdx               # 从零搭建：为什么选 NestJS
├── 02-modules-dependency-injection.mdx  # 模块与依赖注入：NestJS 的骨架
├── 03-controllers-routing.mdx           # 控制器与路由：设计你的第一个 API
├── 04-providers-services.mdx            # 服务层：把业务逻辑从控制器中抽离
├── 05-postgresql-typeorm-setup.mdx      # 数据库接入：PostgreSQL + TypeORM
├── 06-crud-operations.mdx               # CRUD 实战：博客文章管理 API
├── 07-validation-pipes.mdx              # 别让脏数据进来：数据验证
├── 08-exception-interceptor.mdx         # 统一错误处理与响应格式
├── 09-jwt-authentication.mdx            # 用户认证：注册、登录与 JWT
├── 10-authorization-guards.mdx          # 谁能干什么：基于角色的授权
├── 11-file-upload.mdx                   # 文件上传：封面图与用户头像
├── 12-chunked-upload.mdx                # 大文件上传：切片、秒传与断点续传
├── 13-email-queue-bullmq.mdx            # 别让用户等：异步任务队列
├── 14-caching-redis.mdx                 # 让接口快起来：Redis 缓存策略
├── 15-websocket-realtime.mdx            # 实时评论与在线通知：WebSocket
├── 16-testing.mdx                       # 给核心模块写测试
├── 17-swagger-documentation.mdx         # API 文档自动生成
└── 18-docker-deployment.mdx             # Docker 容器化部署
```

---

## 基础篇：独立小案例（01-03）

目标：用 3 篇文章帮你建立对 NestJS 的直觉，每篇一个独立场景。

---

### 01. 从零搭建：为什么选 NestJS

**核心问题**：团队要选后端框架，Express 太自由、Spring Boot 太重，有没有一个既规范又不臃肿的选择？

**主线案例**：搭建一个简单的 API 健康检查服务（Health Check API），返回服务状态、数据库连接状态、内存使用情况。

**内容要点**：

- Express vs Fastify vs NestJS 的本质区别（NestJS 是架构，不是框架）
- NestJS 的设计哲学：Angular 团队把前端架构思维带到了后端
- 用 Nest CLI 创建项目，理解项目结构（为什么是这样组织的）
- `main.ts` 里到底发生了什么
- 热重载的原理（不是 nodemon 那么简单）
- Health Check API 实现：为什么生产环境必须有一个

**与前篇关联**：系列第一篇，无前篇。

---

### 02. 模块与依赖注入：NestJS 的骨架

**核心问题**：你的 Express 项目写了半年，所有逻辑堆在 `app.js` 里，路由文件互相 require 形成意大利面条。NestJS 怎么解决这个问题？

**主线案例**：把上一篇的健康检查服务拆分为 `HealthModule`、`DatabaseModule`、`ConfigModule`，用依赖注入管理配置和数据库连接。

**内容要点**：

- 为什么需要模块化（从 Express 项目的痛点出发）
- `@Module` 装饰器的四个属性：imports / providers / exports / controllers
- 依赖注入不是黑魔法：NestJS 的 IoC 容器做了什么
- `useFactory` vs `useValue` vs `useClass` 什么时候用哪个
- 循环依赖：为什么会出现、怎么解决（`forwardRef`）、更好的架构如何避免它
- 全局模块（`@Global`）什么时候该用、什么时候不该用

**与前篇关联**：上一篇搭好了项目骨架，这一篇把它拆成合理的模块结构。

---

### 03. 控制器与路由：设计你的第一个 API

**核心问题**：你设计了一个 RESTful API，但参数从哪来、响应怎么控制、版本号怎么管理？NestJS 的装饰器路由和 Express 的 `app.get()` 有什么区别？

**主线案例**：设计一个文章摘要 API——`GET /api/v1/articles/snippets` 返回最新发布的文章摘要列表，支持分页和标签筛选。

**内容要点**：

- `@Controller` 路由前缀 vs Express 的 `app.use('/prefix')`
- 参数提取装饰器：`@Param` / `@Query` / `@Body` / `@Headers`
- `@HttpCode` / `@Header` / `@Redirect` 什么时候用
- 路由参数验证：为什么 `@Param('id')` 拿到的是 string 而不是 number
- API 版本控制的三种方式（URI / Header / Query String），NestJS 怎么实现
- `ParseIntPipe`：NestJS 管道的第一次接触

**与前篇关联**：上一篇搭好了模块结构，这一篇在 `ArticlesModule` 里写第一个真正的控制器。

---

## 核心篇：博客平台起步（04-08）

目标：引入博客平台作为贯穿案例，设计数据模型，实现核心 CRUD，加上验证和错误处理。从这一篇开始，所有文章都在构建同一个项目。

---

### 04. 服务层：把业务逻辑从控制器中抽离

**核心问题**：你的控制器里塞满了数据库查询、数据转换、业务判断。改一个需求要改三个控制器，因为它们复制了同样的逻辑。怎么办？

**主线案例**：为博客平台设计 `ArticleService` 和 `UserService`，把文章列表查询（含分页、排序、筛选）和用户信息获取从控制器抽到服务层。

**内容要点**：

- 为什么需要 Service 层（从控制器的"胖"问题出发）
- `@Injectable` 装饰器和 NestJS 的依赖注入
- Service 之间如何互相调用（ArticleService 需要 UserService 查作者信息）
- 自定义 Provider：`useFactory` 动态配置数据库连接
- 请求作用域 Provider（`scope: Scope.REQUEST`）什么时候需要
- Service 的可测试性：为什么抽离后单元测试变得简单

**与前篇关联**：上一篇在 `ArticlesController` 里写了文章查询逻辑，这一篇把它抽到 `ArticleService`，让控制器只负责"接收请求、返回响应"。

---

### 05. 数据库接入：PostgreSQL + TypeORM

**核心问题**：项目要存数据了。NestJS 生态里有 TypeORM、Prisma、Sequelize、Mongoose……为什么选 TypeORM？它和 NestJS 的关系是什么？

**主线案例**：为博客平台设计完整的数据模型——User、Post、Comment、Tag 四张表及其关联关系，用 TypeORM 装饰器定义 Entity，通过 Migration 管理数据库变更。

**内容要点**：

- TypeORM vs Prisma vs Sequelize：选型的关键考量（不是"哪个更好"，是"哪个更适合"）
- TypeORM 的 `@Entity` / `@Column` / `@PrimaryGeneratedColumn` 装饰器
- 关系映射：`@OneToOne` / `@OneToMany` / `@ManyToOne` / `@ManyToMany`
- 为什么博客平台用 `@ManyToOne` 表示文章和作者的关系，而不是 `@OneToOne`
- Migration 的工作原理和最佳实践（为什么不要用 `synchronize: true`）
- DataSource 配置：NestJS 的 `TypeOrmModule.forRootAsync()` + `useFactory`
- Seeding：用初始数据让开发更顺畅

**与前篇关联**：上一篇的 `ArticleService` 用假数据返回文章列表，这一篇接入 PostgreSQL，让数据持久化。

---

### 06. CRUD 实战：博客文章管理 API

**核心问题**：数据库接好了，但实现一个"像样"的 CRUD 比你想象中复杂——分页怎么做？软删除怎么处理？关联数据怎么一起查？

**主线案例**：实现博客文章的完整 CRUD API——创建草稿、发布文章、分页列表（含作者信息和标签）、文章详情、编辑、软删除。

**内容要点**：

- Repository 模式：`InjectRepository` 和 `Repository<T>` 的用法
- 分页查询：`skip` + `take` vs `findAndCount` 的区别
- 关联查询：`relations` 选项、`eager` 模式、什么时候该用 Join
- 软删除：`@DeleteDateColumn` 的原理和注意事项
- 事务处理：为什么"发布文章 + 创建标签关联"需要事务
- DTO 与 Entity 的转换：为什么不应该直接把 Entity 返回给前端

**与前篇关联**：上一篇定义好了数据模型，这一篇基于模型实现完整的业务接口。

---

### 07. 别让脏数据进来：数据验证

**核心问题**：用户在注册表单里输入邮箱 `hello`、密码 `123`、用户名一个 emoji。你的 API 照单全收，数据库里存了一堆垃圾数据。怎么在入口就把脏数据拦住？

**主线案例**：给博客平台的注册接口和发布文章接口加数据验证——邮箱格式、密码强度（8位+大小写+数字）、标题长度、内容非空。

**内容要点**：

- 为什么在管道层验证，而不是在 Service 里验证（职责分离 + 统一拦截）
- `ValidationPipe` + `class-validator` + `class-transformer` 三件套
- 常用验证装饰器实战：`@IsEmail` / `@MinLength` / `@Matches` / `@IsOptional`
- 自定义验证器：密码强度规则用正则不够用怎么办
- `transform: true` 为什么很重要（`"123"` → `123` 的类型转换）
- 自定义 Pipe vs 内置 Pipe：什么时候该自己写
- 全局管道 vs 局部管道：验证规则不同时怎么处理

**与前篇关联**：上一篇的 CRUD 接口没有任何验证，用户可以提交任意数据。这一篇给所有入口加上校验。

---

### 08. 统一错误处理与响应格式

**核心问题**：你的 API 返回格式五花八门——成功时返回 `{ data: ... }`，失败时返回 `{ error: ... }`，数据库挂了返回一个 HTML 错误页。前端同学已经崩溃了。

**主线案例**：为博客平台实现统一的响应格式 `{ code, message, data }` 和全局异常过滤器，让所有接口返回一致的格式。

**内容要点**：

- 为什么需要统一响应格式（从前后端协作的痛点出发）
- `NestInterceptor` 实现 `TransformInterceptor`：自动包装成功响应
- `ExceptionFilter` 实现 `AllExceptionsFilter`：捕获所有异常并格式化
- 自定义业务异常：`BusinessException` vs 内置 `HttpException`
- 错误码设计：不要只返回 HTTP 状态码，业务错误码更重要
- 日志拦截器：记录每个请求的方法、路径、耗时、状态码
- 三者的执行顺序：Guard → Interceptor（前）→ Pipe → Controller → Interceptor（后）→ Filter

**与前篇关联**：上一篇加了验证，验证失败会抛出错误。这一篇确保所有错误都以统一格式返回给前端。

---

## 进阶篇：案例持续演进（09-15）

目标：在博客平台案例上叠加认证、授权、文件上传、队列、缓存、实时通信，逐步接近生产环境。

---

### 09. 用户认证：注册、登录与 JWT

**核心问题**：博客平台需要用户系统。用户注册后怎么保持登录状态？Session、Cookie、Token、JWT……这么多方案选哪个？JWT 到底安全吗？

**主线案例**：为博客平台实现完整的用户认证流程——注册（密码 bcrypt 加盐哈希）、登录（返回 access token + refresh token）、刷新 token、退出登录、获取当前用户信息。

**内容要点**：

- Session vs JWT vs OAuth2：选型的关键考量
- JWT 的结构（Header.Payload.Signature）和原理
- 为什么需要 refresh token（access token 短期有效 + refresh token 长期有效）
- NestJS + Passport + JWT 的集成方式（策略模式）
- `@UseGuards(AuthGuard('jwt'))` 怎么工作
- 自定义装饰器 `@CurrentUser()`：从请求中提取用户信息
- 密码存储：为什么明文不行、为什么 MD5 不行、bcrypt 怎么工作
- Token 黑名单：用户退出登录后如何让 token 立即失效

**与前篇关联**：上一篇统一了错误处理，这一篇在认证模块里复用统一的错误格式。注册接口复用第 07 篇的数据验证。

---

### 10. 谁能干什么：基于角色的授权

**核心问题**：认证（你是谁）和授权（你能干什么）是两回事。普通用户能发文章，管理员能删文章，作者能编辑自己的文章。怎么用代码表达这些规则？

**主线案例**：为博客平台实现三种角色——普通用户（reader）、作者（author）、管理员（admin），控制不同接口的访问权限。作者只能编辑/删除自己的文章，管理员可以操作所有内容。

**内容要点**：

- 认证 vs 授权：为什么它们是两个独立的问题
- `@UseGuards` + 自定义 `RolesGuard` 实现
- `@Roles()` 自定义装饰器 + `Reflector` 读取元数据
- 资源级别权限：作者只能操作自己的文章（在 Service 层判断，不是 Guard 层）
- RBAC 的局限性：当权限规则复杂时（如"编辑自己或同团队成员的文章"），简单的角色判断不够用
- `@Public()` 装饰器：部分接口不需要认证（如文章列表）

**与前篇关联**：上一篇实现了 JWT 认证，这一篇在认证的基础上叠加权限控制。认证 Guard 和授权 Guard 可以链式组合。

---

### 11. 文件上传：封面图与用户头像

**核心问题**：用户想给文章加封面图、上传头像。直接存本地目录？那服务器挂了图片就没了。用云存储？怎么和 NestJS 集成？

**主线案例**：实现用户头像上传（裁剪 + 压缩）和文章封面图上传（支持多种格式、限制大小），本地存储 + 抽象存储接口方便切换到 S3/OSS。

**内容要点**：

- `@UseInterceptors(FilesInterceptor)` 的工作原理
- 文件类型验证：为什么不信任前端传的 Content-Type
- 文件大小限制：为什么不能只靠前端校验
- 图片处理（Sharp）：裁剪、压缩、格式转换
- 存储策略抽象：定义 `StorageService` 接口，本地/S3/OSS 可切换
- 上传文件的命名规则：为什么不能用用户原始文件名
- 文件路径设计：按日期分目录，避免单目录文件过多

**与前篇关联**：认证完成后，用户才能上传头像和封面图。文件上传接口需要 JWT 认证 Guard。

---

### 12. 大文件上传：切片、秒传与断点续传

**核心问题**：用户想上传一个 500MB 的视频附件作为文章附件。直接上传？浏览器超时了。切片上传？怎么切、怎么合并、网络断了怎么办？

**主线案例**：为博客平台实现大文件上传——前端切片 + 并发上传 + 秒传检测 + 断点续传 + 后端分片存储与合并。

**内容要点**：

- 传统上传 vs 切片上传：为什么大文件必须切片
- 文件哈希计算：SparkMD5 的分片读取原理（为什么不能一次性读整个文件）
- 秒传：通过文件哈希判断服务器是否已有相同文件
- 断点续传：记录已上传的分片序号，恢复时跳过已上传部分
- 后端分片存储：按哈希值建目录，临时分片存放
- 流式合并：为什么不要把所有分片读到内存再合并
- 定时清理：过期未完成的上传任务怎么清理
- Web Worker：为什么哈希计算不能在主线程做

**与前篇关联**：上一篇实现了普通文件上传，这一篇处理大文件场景。两者共用同一个存储服务接口。

---

### 13. 别让用户等：异步任务队列

**核心问题**：用户发布了一篇文章，你的 API 要发三封邮件通知（关注者、管理员、作者自己）、生成文章摘要、更新搜索索引。每个操作 2 秒，用户等了 6 秒才看到"发布成功"。体验极差。

**主线案例**：为博客平台实现异步任务——文章发布后通过 BullMQ 异步发送邮件通知、生成文章摘要，用户发布后立即返回。

**内容要点**：

- 为什么需要消息队列（从同步操作的阻塞问题出发）
- Bull vs BullMQ：为什么要迁移（Bull 依赖 Redis 4.x，BullMQ 支持 Redis 5+）
- Queue / Worker / Processor 的关系
- 任务优先级：邮件通知比摘要生成更紧急
- 重试策略：邮件发送失败怎么办（指数退避）
- 死信队列：重试 3 次还是失败的任务怎么处理
- BullMQ Board：可视化的任务管理面板
- 并发控制：Worker 开多少个并发合适

**与前篇关联**：上一篇处理了文件上传，这一篇处理耗时任务。两者都是"用户不应该等待"的场景。

---

### 14. 让接口快起来：Redis 缓存策略

**核心问题**：博客首页的文章列表接口每次都要查数据库，热门文章的浏览量更新频繁导致缓存频繁失效。怎么设计一个既快又准的缓存方案？

**主线案例**：为博客平台实现缓存——热门文章列表缓存（定时刷新）、文章详情缓存（读写分离策略）、用户信息缓存。

**内容要点**：

- 缓存的本质：用空间换时间，但不是所有数据都该缓存
- NestJS `@nestjs/cache-manager` + Redis 的集成
- `@CacheKey` / `@CacheTTL` 装饰器的使用
- 手动缓存管理：什么时候用装饰器，什么时候手动控制
- 缓存穿透：查询不存在的数据怎么办（布隆过滤器 / 缓存空值）
- 缓存击穿：热点 key 过期瞬间大量请求打到数据库
- 缓存雪崩：大量 key 同时过期怎么办（随机过期时间）
- 什么时候不该用缓存：写频繁的数据、强一致性的数据

**与前篇关联**：上一篇用 BullMQ 处理异步任务，BullMQ 本身就依赖 Redis。这一篇复用同一个 Redis 实例做缓存。

---

### 15. 实时评论与在线通知：WebSocket

**核心问题**：用户在看一篇文章，另一个用户发了一条评论。第一个用户要刷新页面才能看到新评论。能不能做到实时推送？

**主线案例**：为博客平台实现实时功能——文章下的实时评论推送、在线阅读人数统计、新评论通知。

**内容要点**：

- HTTP 轮询 vs Server-Sent Events vs WebSocket：为什么实时场景选 WebSocket
- `@WebSocketGateway` 的工作原理
- `@SubscribeMessage` / `@MessageBody` 处理客户端消息
- Room 机制：每个文章是一个房间，只给看这篇文章的人推送
- 身份认证：WebSocket 连接怎么验证用户身份（从 HTTP 握手传递 token）
- 在线人数统计：`connected` / `disconnected` 生命周期
- Socket.io vs 原生 WebSocket：为什么生产环境通常选 Socket.io（自动重连、房间、命名空间）
- WebSocket 的局限性：不适合做什么（大文件传输、高频率数据流）

**与前篇关联**：上一篇的评论是普通 HTTP 接口，这一篇加上实时推送。评论数据还是走 HTTP 存储，WebSocket 只负责推送。

---

## 部署篇：生产化收尾（16-18）

目标：测试核心模块、生成 API 文档、容器化部署，让博客平台可以真正上线。

---

### 16. 给核心模块写测试

**核心问题**：项目上线前，你怎么确定改了认证逻辑不会搞坏文章管理？靠手动测试？每次部署前都手动过一遍所有接口？这不现实。

**主线案例**：为博客平台的核心模块写测试——UserService 单元测试（Mock 数据库）、AuthModule 集成测试（测试数据库）、文章发布 E2E 测试（完整请求链路）。

**内容要点**：

- 单元测试 vs 集成测试 vs E2E 测试：测什么、不测什么
- Jest 基础配置和 NestJS 的测试工具
- 单元测试 Service：`@nestjs/testing` 的 `Test.createTestingModule()` + Mock Repository
- 集成测试 Controller：用 `supertest` 发送真实 HTTP 请求
- E2E 测试：启动完整应用，测试完整链路（创建用户 → 登录 → 发文章 → 查文章）
- 测试覆盖率：关注覆盖率数字不如关注关键路径是否被覆盖
- 测试的投入产出比：哪些模块值得写测试、哪些可以跳过

**与前篇关联**：前面 15 篇构建了完整功能，这一篇为核心功能加上测试保障。

---

### 17. API 文档自动生成

**核心问题**：前端同学问你"注册接口需要传什么参数"，你翻了半天代码告诉他。每改一个接口，都要手动更新文档。能不能让文档自动跟着代码走？

**主线案例**：为博客平台的所有 API 生成 Swagger 文档，包括认证接口、文章 CRUD、文件上传等，让前端可以直接在 Swagger UI 上调试。

**内容要点**：

- OpenAPI / Swagger 规范简介
- `@nestjs/swagger` 的 `SwaggerModule` 配置
- DTO 文档化：`@ApiProperty` / `@ApiPropertyOptional` / `@ApiHideProperty`
- 响应类型定义：`@ApiResponse` / `@ApiOkResponse` / `@ApiBadRequestResponse`
- 认证配置：在 Swagger UI 中输入 JWT token
- API 分组：按模块组织文档
- 文档和代码同步：为什么自动生成的文档比手写的更可靠
- 什么时候 Swagger 不够用（GraphQL、WebSocket、复杂的权限逻辑）

**与前篇关联**：博客平台有 20+ 个 API 接口，这一篇统一生成文档，方便前后端协作。

---

### 18. Docker 容器化部署

**核心问题**：你的博客平台在本地跑得好好的，部署到服务器上就出问题——Node 版本不对、PostgreSQL 没装、Redis 配置不同。怎么保证开发和生产环境一致？

**主线案例**：为博客平台编写 Dockerfile（多阶段构建）和 Docker Compose（App + PostgreSQL + Redis + Nginx），一键启动完整环境。

**内容要点**：

- 为什么需要容器化（从"在我机器上能跑"的痛点出发）
- 多阶段 Dockerfile：构建阶段用完整 Node 镜像，运行阶段用精简 Alpine 镜像
- Docker Compose 编排：App + PostgreSQL + Redis 三个服务的配置
- Nginx 反向代理：为什么不能直接暴露 Node.js 端口
- 环境变量管理：`.env` 文件 + `ConfigModule` + Docker 环境变量
- 健康检查：`HEALTHCHECK` 指令和 NestJS 的健康检查端点
- 生产安全：CORS、Helmet、Rate Limiting
- 日志管理：为什么 `console.log` 在生产环境不够用

**与前篇关联**：博客平台功能开发完成、测试通过、文档齐全，最后一步是容器化部署上线。

---

## 学习路径图

```
基础篇 ──────────────────────────────────────────
  01 从零搭建 ──► 02 模块与DI ──► 03 控制器与路由
                                              │
核心篇 ──────────────────────────────────────────
           04 服务层 ──► 05 数据库 + TypeORM
                            │
                     06 CRUD 实战
                            │
                     07 数据验证
                            │
                     08 错误处理与响应格式
                                          │
进阶篇 ──────────────────────────────────────────
       09 JWT认证 ──► 10 角色授权 ──► 11 文件上传
                                         │
                                    12 大文件上传
                                         │
                                    13 异步任务队列
                                         │
                                    14 Redis 缓存
                                         │
                                    15 WebSocket 实时
                                                   │
部署篇 ──────────────────────────────────────────
        16 测试 ──► 17 API 文档 ──► 18 Docker 部署
```

---

## 预期效果

完成本系列后，你将能够：

- 理解 NestJS 的设计哲学，知道它解决了 Express 的什么问题
- 独立搭建一个模块化、可测试的 NestJS 项目
- 用 TypeORM 设计数据模型并实现 CRUD
- 实现完整的 JWT 认证和角色授权
- 处理文件上传、大文件切片、异步任务等生产常见需求
- 用 Redis 做缓存，用 WebSocket 做实时推送
- 用 Docker 容器化部署一个包含数据库和缓存的全栈后端

---

## 版本信息

- **NestJS**：10.x
- **Node.js**：20.x LTS
- **TypeScript**：5.x
- **TypeORM**：0.3.x
- **PostgreSQL**：16
- **Redis**：7.x
- **BullMQ**：5.x
