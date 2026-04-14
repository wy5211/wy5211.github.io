# Next.js 渐进式全栈开发

## 背景

你用 React 写过几个项目，要么是 Create React App 脚手架出来的 SPA，要么是 Vite 搭配 React Router。项目做出来了，但总有些别扭的地方：首屏白屏时间长、SEO 基本靠 helmet、部署后用户反馈加载慢。你听说 Next.js 能解决这些问题，打开官网一看，App Router、Server Components、Server Actions、Streaming、Partial Prerendering……概念一堆，反而不知道从哪下手了。

这个系列就是为你准备的。我们不会把 Next.js 的 API 翻译一遍，而是从"你用 React 做项目时遇到的痛点"出发，带你逐步构建一个 **团队任务管理平台**。每解决一个真实问题，你就自然掌握了一个 Next.js 特性。

### 技术栈选择

| 技术         | 版本   | 为什么选它                                         |
| ------------ | ------ | -------------------------------------------------- |
| Next.js      | 15.x   | React 全栈框架，App Router 是目前最成熟的 RSC 方案 |
| React        | 19.x   | 当前稳定版，与 Next.js 15 深度集成                 |
| TypeScript   | 5.x    | 类型安全，Next.js 原生支持                         |
| Tailwind CSS | 4.x    | 原子化 CSS，与 Next.js 开发体验配合最好            |
| Prisma       | 6.x    | 类型安全的 ORM，和 Next.js Server 端天然配合       |
| PostgreSQL   | 16     | 功能最全的开源关系型数据库                         |
| Node.js      | 22 LTS | 当前 LTS 版本                                      |

> 本系列专注于 Next.js 本身。如果你对数据库层感兴趣，可以参考 [TypeORM 系列](/posts/typeorm/01-getting-started)、[Prisma 系列](/posts/prisma/01-getting-started) 或 [Drizzle 系列](/posts/drizzle/01-introduction-drizzle)。如果你对后端框架感兴趣，可以参考 [NestJS 系列](/posts/nestjs/01-getting-started)。

---

## 主线案例：团队任务管理平台

整个系列围绕一个 **团队任务管理平台**（类似 Linear / Trello）展开，从路由设计到生产部署。

**案例场景**：一个支持多团队协作的任务管理工具，每个团队有独立的工作空间，下面包含多个项目，项目下有任务、标签、评论和活动日志。从第四篇开始，所有文章都在构建同一个项目。

**案例数据示例**（贯穿全系列使用）：

```
工作空间：字节前端团队 (ws_fe_8x9k2m)

项目：官网重构 v2.0
  └── 任务：修复导航栏在移动端的布局错位
        ├── 指派给：zhang_wei (usr_a1x9k2m)
        ├── 标签：[bug, P0, mobile]
        ├── 状态：进行中
        ├── 优先级：紧急
        ├── 评论：「在 iPhone 15 Pro 上复现了，是 flex-wrap 导致的」
        └── 活动日志：zhang_wei 将状态从 "待处理" 改为 "进行中"
```

---

## 系列节奏

```
基础篇（01-03）：独立小案例，快速上手 Next.js
  → 每篇一个独立场景，降低入门门槛

核心篇（04-07）：引入任务管理平台案例，深入核心能力
  → 路由布局、Server Actions、数据获取与 API、缓存策略

进阶篇（08-10）：案例持续演进
  → 身份验证、文件处理、性能优化

实战篇（11-12）：测试与部署
  → 给应用写测试、部署上线
```

---

## 博客目录结构

```
content/posts/nextjs/
├── plan.md                        # 本计划文件
├── 01-getting-started.mdx         # Next.js 快速入门：为什么不用 Create React App 了
├── 02-routing-layouts.mdx         # 路由与布局：用文件系统组织你的页面
├── 03-server-client-components.mdx # Server Components 与 Client Components
├── 04-server-actions-forms.mdx    # Server Actions：告别手写 API
├── 05-data-fetching-api.mdx       # 数据获取与 API 设计
├── 06-caching.mdx                 # 缓存策略：让你的页面飞起来
├── 07-validation-type-safety.mdx  # 数据验证与类型安全
├── 08-authentication.mdx          # 身份验证：从登录到权限控制
├── 09-file-handling.mdx           # 文件上传与媒体管理
├── 10-performance.mdx             # 性能优化实战
├── 11-testing.mdx                 # 测试策略
└── 12-deployment.mdx              # 部署与上线
```

---

## 基础篇：独立小案例（01-03）

目标：用 3 篇文章帮你建立对 Next.js 的直觉，每篇一个独立场景，解决一个真实的 React 痛点。

---

### 01. Next.js 快速入门：为什么不用 Create React App 了

**核心问题**：你用 Create React App 或 Vite + React 搭建过 SPA，但上线后发现首屏加载要 3 秒，SEO 得靠预渲染方案补救，路由切换时还要自己加 loading 状态。Next.js 声称能解决这些问题——但它到底是什么？

**主线案例**：把一个现有的 React 个人博客从 Vite SPA 迁移到 Next.js，直观对比两种方案在首屏加载、SEO 和开发体验上的差异。

**内容要点**：

- SPA 的固有痛点：首屏白屏、SEO 差、JS bundle 大
- Next.js 的核心价值：不是多了一个框架，而是多了一种渲染选择
- 三种渲染模式：SSR、SSG、CSR 分别解决什么问题，什么时候用哪个
- 环境搭建：create-next-app 的关键选项
- App Router 的目录约定：page.tsx、layout.tsx、loading.tsx 的作用
- 开发体验：热更新、内置 TypeScript、自动代码分割
- 什么时候不该用 Next.js（不是所有项目都需要服务端渲染）

**与前篇关联**：系列第一篇，无前篇。

---

### 02. 路由与布局：用文件系统组织你的页面

**核心问题**：你的 React Router 配置文件已经 200 行了，嵌套路由、路由守卫、公共布局……每次加新页面都要改好几个地方。Next.js 的文件系统路由能帮你把这些变成"新建文件夹"这么简单。

**主线案例**：为一个在线课程平台设计路由结构——首页、课程列表、课程详情、章节内容、用户中心，涉及嵌套布局、动态路由、路由组等。

**内容要点**：

- 文件系统路由：文件夹即路由，page.tsx 即页面
- 动态路由：[slug] 和 [...slug]——什么时候用哪个
- 布局系统：layout.tsx——为什么布局不会重新渲染
- 路由组：(marketing) 和 (dashboard)——共享布局但不影响 URL
- 并行路由：@dashboard 和 @analytics——同一个页面展示多个独立模块
- 拦截路由：(.) 和 (..)——弹窗场景的优雅解法
- loading.tsx 和 error.tsx：内置的加载和错误处理
- 路由 vs React Router：什么时候该用文件系统路由，什么时候需要 React Router

**与前篇关联**：上一篇用 create-next-app 搭了项目，这一篇深入理解它的路由系统——这是 Next.js 和传统 SPA 最核心的差异之一。

---

### 03. Server Components 与 Client Components

**核心问题**：你的 React 项目有个商品列表页，每次打开都要先显示 loading，然后 fetch 数据，再渲染。明明是静态内容占多数的页面，为什么要在客户端做这些？如果数据在服务端就能拿到，直接返回渲染好的 HTML 不好吗？

**主线案例**：为一个电商首页做组件拆分——导航栏（需要用户状态，Client）、商品轮播（静态数据，Server）、购物车按钮（需要交互，Client）、商品列表（服务端获取，Server），搞清楚每个组件该放哪边。

**内容要点**：

- React Server Components 解决了什么问题：减少客户端 JS、直接访问后端资源
- 默认即 Server Component：不需要任何标记
- 'use client' 的含义：不是"这个组件只在客户端运行"，而是"从这里开始是客户端边界"
- Client Component 的限制：不能用服务端功能（async、cookies、headers 等）
- 组合模式：Server Component 里可以嵌套 Client Component，反过来不行
- 什么时候必须用 Client Component：onClick、useState、useEffect、浏览器 API
- 常见误区：把 'use client' 加在 layout.tsx 上、把所有组件都标记为 client
- Server Components 的真实收益：JS bundle 能减少多少，首屏能快多少

**与前篇关联**：上一篇搭建了路由结构，这一篇理解路由中每个组件的运行环境——Server 还是 Client，这是写好 Next.js 的基础。

---

## 核心篇：任务管理平台起步（04-07）

目标：引入团队任务管理平台作为贯穿案例，从第四篇开始，所有文章都在构建同一个项目。

---

### 04. Server Actions：告别手写 API

**核心问题**：在传统 Next.js 项目里，提交一个表单要写三样东西：API Route、前端 fetch 调用、错误处理逻辑。代码散落在不同文件里，改个字段要同步改好几个地方。Server Actions 能不能简化这个过程？

**主线案例**：为任务管理平台实现任务的创建和状态更新——用 Server Actions 处理表单提交，用 useFormState 管理表单状态，用 useFormStatus 显示提交进度。

**内容要点**：

- 传统表单处理的痛点：API Route + fetch + loading + error
- Server Actions 的本质：服务端函数，直接从表单调用
- 基本用法：'use server'、表单 action 属性
- useFormState：管理服务端返回的状态（成功消息、验证错误）
- useFormStatus：显示提交中的 loading 状态
- 乐观更新：先更新 UI，再等服务端确认
- Server Actions 的安全性：输入验证、CSRF 防护
- 什么时候该用 API Route 而不是 Server Action（预告下一篇）

**与前篇关联**：上一篇搞清楚了 Server 和 Client Component 的边界，这一篇学习 Server Component 里怎么安全地修改数据——通过 Server Actions。

---

### 05. 数据获取与 API 设计

**核心问题**：你的任务管理平台需要展示任务列表、项目详情、团队成员信息。这些数据该怎么获取？用 fetch？用 Prisma？用 Server Actions？另外，你需要给第三方系统提供一个 Webhook 接口来同步任务状态——这种场景 Server Actions 处理不了。

**主线案例**：为任务管理平台实现数据获取层——项目列表（带缓存）、任务详情（实时数据）、成员列表（跨请求数据）；同时实现一个 Webhook 接口供第三方系统调用。

**内容要点**：

- Server Component 中的数据获取：async/await 直接在组件里用
- fetch 的缓存选项：cache、next.revalidate、no-store
- 并行数据获取：Promise.all 在 Server Components 中的运用
- Route Handlers（API Routes）：什么时候需要传统 API
- Route Handlers vs Server Actions：清晰的选型标准
- Webhook 接口：用 Route Handler 处理第三方回调
- 数据获取的模式选择：Server Component 直接获取 vs Client Component 通过 API 获取
- Prisma 与 Next.js 的配合：在 Server Component 中使用 ORM

**与前篇关联**：上一篇用 Server Actions 处理了数据修改，这一篇处理数据的获取和展示——读和写是数据层的两面。同时引入 API Route，补全 Server Actions 无法覆盖的场景。

---

### 06. 缓存策略：让你的页面飞起来

**核心问题**：任务管理平台的首页，每个人看到的都是一样的项目列表，但每次访问都要查数据库。工作空间设置页更是几乎不会变，却每次都重新渲染。Next.js 的缓存系统能帮你把这些请求省下来。

**主线案例**：为任务管理平台设计缓存策略——项目列表（全站共享，长缓存）、任务详情（按工作空间缓存，中等缓存）、实时通知（不缓存），并处理缓存失效问题。

**内容要点**：

- 为什么需要缓存：数据库查询的开销、用户体验的提升
- Request Memoization：同一个请求中重复调用 fetch 只执行一次
- Data Cache：跨请求的持久缓存，缓存时间怎么设
- Full Route Cache：构建时预渲染的页面
- Router Cache：客户端的路由缓存
- revalidateTag 和 revalidatePath：手动清除缓存
- 缓存策略选择：什么数据该缓存、什么不该缓存
- 缓存的坑：缓存雪崩、缓存穿透、Stale-while-revalidate

**与前篇关联**：上一篇实现了数据获取，这一篇让获取到的数据"记住"——避免重复查询，提升响应速度。

---

### 07. 数据验证与类型安全

**核心问题**：任务管理平台的创建任务接口，用户可以传任何数据过来。标题为空？优先级是 "super urgent" 这种非预期值？截止日期是 2020 年？你需要在前端和后端同时验证数据，并且保持类型一致。

**主线案例**：为任务管理平台实现完整的数据验证——创建任务（标题、描述、优先级、截止日期）、更新状态（状态机校验）、搜索过滤（查询参数验证），前端后端共享同一套验证规则。

**内容要点**：

- 为什么数据验证不能只靠前端：绕过表单直接调接口
- Zod 基础：定义 schema、解析和校验
- 与 Server Actions 集成：在服务端验证输入
- 与 Route Handlers 集成：在 API 层验证输入
- 前端表单验证：共享 schema，避免重复定义
- 类型推导：z.infer<typeof schema>——一份 schema 生成前后端类型
- 错误消息设计：给用户有用的错误提示
- 验证的性能考量：验证逻辑的执行时机

**与前篇关联**：上一篇的 Server Actions 和 Route Handlers 都直接信任了输入数据。这一篇给它们加上安全网。

---

## 进阶篇：案例持续演进（08-10）

目标：在任务管理平台的基础上，加入身份验证、文件处理和性能优化。

---

### 08. 身份验证：从登录到权限控制

**核心问题**：任务管理平台目前是裸奔的——任何人都能看到所有任务。你需要加登录功能，还要区分普通成员和管理员。NextAuth.js 听说很好用，但它和 Next.js 的 Server Components 怎么配合？

**主线案例**：为任务管理平台实现完整的认证系统——GitHub OAuth 登录、邮箱密码登录、基于角色的权限控制（管理员可以删除项目、普通成员只能创建任务）、会话管理。

**内容要点**：

- 为什么需要认证：不是所有页面都该公开
- NextAuth.js / Auth.js 基础：Provider 配置、Session 管理
- GitHub OAuth：接入第三方登录的完整流程
- 凭证登录：邮箱密码认证
- Server Components 中获取 Session：auth() 函数
- Client Components 中获取 Session：useSession hook
- 中间件（middleware.ts）：路由级别的权限控制
- 基于角色的访问控制：RBAC 在 Next.js 中的实现
- Token 管理与安全：JWT vs Session、HttpOnly Cookie

**与前篇关联**：上一篇加了数据验证，这一篇加认证——验证数据"是什么"，认证确认"你是谁"。有了认证，平台才算一个完整的应用。

---

### 09. 文件上传与媒体管理

**核心问题**：任务管理平台的用户想在任务描述里贴截图、在评论里上传附件。你需要处理文件上传、图片压缩、存储到云端。这些在 Next.js 里怎么做？

**主线案例**：为任务管理平台实现文件上传功能——任务截图上传（自动压缩）、评论附件（PDF/文档）、用户头像上传，使用 S3 兼容存储。

**内容要点**：

- 文件上传的挑战：大文件、并发、安全
- Server Actions 处理文件上传：FormData 的使用
- 图片优化：Next.js Image 组件、sharp 库压缩
- 云存储集成：S3 兼容存储的上传和访问
- 文件类型和大小限制：安全校验
- 上传进度：大文件上传的用户体验
- CDN 加速：静态资源的分发
- 清理策略：过期附件的自动清理

**与前篇关联**：上一篇加了认证，用户可以登录了。这一篇让登录后的用户能上传文件——丰富任务管理平台的功能。

---

### 10. 性能优化实战

**核心问题**：任务管理平台上线了，用户反馈项目列表页加载慢，Dashboard 的图表数据渲染卡顿，移动端体验差。Core Web Vitals 的分数也不好看。怎么系统性地优化？

**主线案例**：诊断和优化任务管理平台的性能——项目列表的渲染优化、Dashboard 的数据聚合、图片懒加载、代码分割、Bundle 分析。

**内容要点**：

- Core Web Vitals：LCP、FID、CLS——用户体验的量化指标
- Bundle 分析：next/bundle-analyzer——找出臃肿的依赖
- 代码分割：dynamic import 和 React.lazy
- 图片优化：Next.js Image 组件的高级用法
- 字体优化：next/font——消除 FOUT 和 CLS
- 渲染优化：React.memo、useMemo、useCallback 在 Next.js 中的使用
- 流式渲染：Suspense + loading.tsx 的配合
- 性能监控：Vercel Analytics、自定义性能指标上报
- 优化的优先级：先优化什么，后优化什么

**与前篇关联**：前面 9 篇完成了功能开发，这一篇让它在真实场景下跑得快、体验好。

---

## 实战篇：测试与部署（11-12）

目标：给应用写测试，部署上线，让项目安全落地。

---

### 11. 测试策略

**核心问题**：任务管理平台改了一个 Server Action 的逻辑，怎么确定不会破坏已有的功能？靠手动测试？每次改完都过一遍所有操作？你需要自动化的测试来兜底。

**主线案例**：为任务管理平台写测试——Server Actions 的单元测试（Mock 数据库）、页面组件的集成测试（Testing Library）、创建任务流程的 E2E 测试（Playwright）。

**内容要点**：

- Next.js 应用的测试分层：单元测试、集成测试、E2E 测试
- 测试环境配置：Vitest + Next.js
- Server Actions 测试：Mock 数据库、测试验证逻辑
- 组件测试：Testing Library + Server Component 的测试策略
- E2E 测试：Playwright 模拟真实用户操作
- 测试数据管理：工厂模式、数据库清理
- 什么值得测、什么不值得测：投入产出比
- CI 集成：在 GitHub Actions 中自动运行测试

**与前篇关联**：上一篇优化了性能，这一篇确保优化不会引入回归问题，为后续部署做准备。

---

### 12. 部署与上线

**核心问题**：任务管理平台在本地跑得好好的，部署到线上就出问题——环境变量没配对、数据库连接超时、图片上传失败。怎么顺利地把项目推到生产环境？

**主线案例**：将任务管理平台部署到 Vercel——环境变量配置、数据库连接、域名绑定、CI/CD 流水线、监控和告警。

**内容要点**：

- Vercel 部署：为什么选 Vercel，基本的部署流程
- 环境变量管理：开发/测试/生产环境的变量隔离
- 数据库部署：Supabase / Neon / 自建 PostgreSQL 的连接配置
- 自托管选项：Docker 部署到自己的服务器
- CI/CD：GitHub Actions 自动构建和部署
- 健康检查和监控：错误追踪（Sentry）、性能监控（Vercel Analytics）
- 域名和 HTTPS：自定义域名配置
- 系列回顾：Next.js 全栈开发的完整知识图谱

**与前篇关联**：前面 11 篇完成了功能开发、性能优化和测试覆盖，最后一步是把项目安全地部署到生产环境。

---

## 学习路径图

```
基础篇 ──────────────────────────────────────────────
  01 快速入门 ──► 02 路由布局 ──► 03 Server/Client Components
                                                    │
核心篇 ──────────────────────────────────────────────
          04 Server Actions
                │
          05 数据获取与 API
                │
          06 缓存策略
                │
          07 数据验证与类型安全
                          │
进阶篇 ──────────────────────────────────────────────
       08 身份验证 ──► 09 文件处理 ──► 10 性能优化
                                            │
实战篇 ──────────────────────────────────────────────
       11 测试策略 ──► 12 部署上线
```

---

## 预期效果

完成本系列后，你将能够：

- 理解 Next.js 和传统 React SPA 的本质区别，知道什么时候该用 Next.js
- 用文件系统路由组织复杂的页面结构
- 正确区分 Server Components 和 Client Components，写出高效的组件
- 用 Server Actions 简化表单处理，用 Route Handlers 构建 API
- 设计合理的缓存策略，平衡性能和数据实时性
- 用 Zod 实现前后端共享的数据验证
- 在 Next.js 中实现完整的认证和授权系统
- 处理文件上传和图片优化
- 系统性地优化应用性能
- 给 Next.js 应用写测试
- 将应用部署到 Vercel 或自托管环境

---

## 版本信息

- **Next.js**：15.x
- **React**：19.x
- **TypeScript**：5.x
- **Node.js**：22 LTS
- **Tailwind CSS**：4.x
- **Prisma**：6.x
- **PostgreSQL**：16
