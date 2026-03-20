# Hono 渐进式学习计划

## 背景

本计划旨在通过一系列结构化的博客文章，帮助读者从零开始掌握 Hono 轻量级 Web 框架开发。文章采用渐进式设计，从基础概念到生产级应用，每篇文章都包含丰富的代码示例和实战演练。

**为什么选择 Hono？**

- ⚡ **超轻量**：核心包仅 13KB (gzip)
- 🚀 **极快速度**：基于 Web Standards，性能优异
- 🌐 **边缘优先**：完美支持 Cloudflare Workers、Deno、Bun
- 🔥 **TypeScript 原生**：100% TypeScript 编写
- 🎯 **简单直观**：类似 Express 的 API，学习成本低
- 🔌 **中间件丰富**：内置常用中间件，生态完善

---

## 核心技术栈

**框架**：

- **Hono** 4.x（最新稳定版）
- **TypeScript** 5.x
- **运行时**：Node.js 20+ / Deno / Bun / Cloudflare Workers

**数据库与 ORM**：

- **数据库**：PostgreSQL 16 / SQLite（开发）/ Turso（边缘）
- **ORM**：Drizzle ORM（边缘友好）/ Prisma 5.x

**认证与验证**：

- **验证**：Zod（TypeScript-first 验证库）
- **认证**：JWT / Session

**工具链**：

- **测试**：Vitest / Bun Test
- **部署**：Cloudflare Pages / Deno Deploy / Fly.io
- **开发工具**：Hono Dev (官方 CLI)

---

## 博客目录结构

```
content/posts/hono/
├── plan.md                          # 本计划文件
├── 01-getting-started.mdx           # 环境搭建与第一个 Hono 应用
├── 02-routing-params.mdx            # 路由系统详解
├── 03-middleware-system.mdx         # 中间件机制深入
├── 04-request-response.mdx          # 请求与响应处理
├── 05-validation-zod.mdx            # 数据验证与 Zod
├── 06-error-handling.mdx            # 错误处理与异常过滤器
├── 07-sqlite-drizzle.mdx            # 数据库与 ORM
├── 08-crud-blog-api.mdx             # CRUD 实战：博客 API
├── 09-authentication-jwt.mdx        # JWT 认证实现
├── 10-file-upload.mdx               # 文件上传处理
├── 11-websocket.mdx                 # WebSocket 实时通信
├── 12-rate-limiting-security.mdx    # 安全与限流
├── 13-caching-edges.mdx             # 边缘缓存策略
├── 14-testing.mdx                   # 测试策略
├── 15-deploy-cloudflare.mdx         # Cloudflare Workers 部署
├── 16-deploy-deno.mdx               # Deno Deploy 部署
├── 17-performance-optimization.mdx  # 性能优化
├── 18-real-world-project.mdx        # 完整实战项目
└── README.mdx                        # 系列索引
```

---

## 第一阶段：快速入门（2-3篇）

### 01. 环境搭建与第一个 Hono 应用

**目标**：了解 Hono 特点，搭建开发环境，创建第一个应用

**内容要点**：

- Hono 是什么（与 Express、Fastify、NestJS 对比）
- 为什么选择 Hono（轻量、快速、边缘就绪）
- 支持 JavaScript 运行时：Node.js、Deno、Bun、Cloudflare Workers
- 使用 npm/pnpm/bun 创建项目
- 项目结构详解
- 第一个应用：Hello World
- Hono Dev 热重载开发体验
- 不同运行时的启动方式

**实战示例**：

```typescript
// app.ts
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello Hono!"));
app.get("/hello/:name", (c) => {
  return c.json({ message: `Hello, ${c.req.param("name")}!` });
});

export default app;
```

**多运行时示例**：

```typescript
// Node.js
import { serve } from "@hono/node-server";
import app from "./app";

serve({ fetch: app.fetch, port: 3000 });

// Cloudflare Workers
export default app;

// Deno
export default app;
```

---

### 02. 路由系统详解

**目标**：掌握 Hono 强大的路由系统

**内容要点**：

- 基础路由（GET、POST、PUT、DELETE、PATCH）
- 路径参数（`:id`、`*` 通配符）
- 路由分组（`app.route()`）
- 路由前缀与版本控制
- 命名路由
- 路由中间件（特定路由的中间件）
- 路由顺序与优先级
- RESTful API 设计最佳实践

**实战示例**：

```typescript
// 路由分组示例
import { Hono } from "hono";

const api = new Hono();

// 用户路由组
const users = new Hono();
users.get("/", listUsers);
users.get("/:id", getUser);
users.post("/", createUser);
users.put("/:id", updateUser);
users.delete("/:id", deleteUser);

// 文章路由组
const posts = new Hono();
posts.get("/", listPosts);
posts.get("/:id", getPost);

// 挂载路由组
api.route("/users", users);
api.route("/posts", posts);

// API 版本控制
const v1 = new Hono();
v1.route("/users", users);
v1.route("/posts", posts);

const app = new Hono();
app.route("/api/v1", v1);
```

**高级路由技巧**：

```typescript
// 路由中间件
const authMiddleware = async (c, next) => {
  const token = c.req.header("Authorization");
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
};

app.use("/api/protected/*", authMiddleware);

// 通配符路由
app.get("/files/*", serveStaticFiles);

// 路由参数验证
app.get("/users/:id{[0-9]+}", (c) => {
  const id = c.req.param("id");
  // id 保证是数字
});
```

---

## 第二阶段：核心功能（3-4篇）

### 03. 中间件机制深入

**目标**：理解 Hono 的中间件系统

**内容要点**：

- 中间件的工作原理（洋葱模型）
- 应用级中间件 vs 路由级中间件
- 中间件执行顺序
- 内置中间件详解
  - `cors`：跨域处理
  - `logger`：请求日志
  - `poweredBy`：X-Powered-By 头
  - `prettyJSON`：美化 JSON 输出
- 自定义中间件开发
- 中间件配置与选项
- 异步中间件处理
- 中间件最佳实践

**实战示例**：

```typescript
import { cors } from "hono/cors";
import { logger } from "hono/logger";

// 应用 CORS
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// 应用日志
app.use("*", logger());

// 自定义：请求计时中间件
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  c.header("X-Response-Time", `${duration}ms`);
});

// 自定义：认证中间件
const auth = (options = {}) => {
  return async (c, next) => {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return c.json({ error: "Token required" }, 401);
    }

    try {
      const user = await verifyToken(token);
      c.set("user", user); // 存储到 context
      await next();
    } catch (error) {
      return c.json({ error: "Invalid token" }, 401);
    }
  };
};

app.use("/api/protected/*", auth());
```

**内置中间件示例**：

```typescript
// prettyJSON：美化输出
import { prettyJSON } from "hono/pretty-json";
app.use("*", prettyJSON());

// etag：缓存标签
import { etag } from "hono/etag";
app.use("*", etag());

// basicAuth：基础认证
import { basicAuth } from "hono/basic-auth";
app.use(
  "/admin/*",
  basicAuth({
    username: "admin",
    password: "secret",
  })
);
```

---

### 04. 请求与响应处理

**目标**：熟练处理各种请求和响应场景

**内容要点**：

- Context 对象详解
- 读取请求头（`c.req.header()`）
- 读取查询参数（`c.req.query()`）
- 读取路径参数（`c.req.param()`）
- 解析请求体（JSON、FormData、文本）
- Cookie 读写（`getCookie`、`setCookie`）
- 响应类型（JSON、Text、HTML、XML）
- 设置响应头
- 状态码设置
- 流式响应
- 文件下载

**实战示例**：

```typescript
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

// 查询参数
app.get("/search", (c) => {
  const keyword = c.req.query("keyword") || "";
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "10");

  return c.json({ keyword, page, limit });
});

// 请求体解析
app.post("/users", async (c) => {
  const body = await c.req.json();
  // 或 c.req.formData()
  // 或 c.req.text()

  const { name, email } = body;
  // 创建用户...

  return c.json({ message: "User created", id: userId }, 201);
});

// Cookie 操作
app.get("/login", (c) => {
  setCookie(c, "token", "xxx", {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 3600,
  });
  return c.text("Login successful");
});

app.get("/logout", (c) => {
  deleteCookie(c, "token");
  return c.text("Logout successful");
});

// 文件下载
app.get("/download/:filename", async (c) => {
  const filename = c.req.param("filename");
  const file = await fs.readFile(`./uploads/${filename}`);

  return c.body(file, 200, {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename="${filename}"`,
  });
});

// 流式响应
app.get("/stream", async (c) => {
  return c.streamText(async (stream) => {
    for (let i = 0; i < 10; i++) {
      await stream.write(`Line ${i}\n`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  });
});

// HTML 响应（用于 SSR）
app.get("/", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head><title>My App</title></head>
      <body><h1>Hello Hono!</h1></body>
    </html>
  `);
});
```

---

### 05. 数据验证与 Zod

**目标**：使用 Zod 实现强大的数据验证

**内容要点**：

- 为什么需要数据验证
- Zod 简介（TypeScript-first 验证）
- 基础类型验证
- 对象验证与嵌套
- 数组验证
- 自定义验证规则
- 错误处理与友好提示
- 中间件集成
- 请求体验证
- 响应数据验证

**实战示例**：

```typescript
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// 定义 Schema
const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(120).optional(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/),
  role: z.enum(["user", "admin"]).default("user"),
});

// 使用 zValidator 中间件
app.post("/users", zValidator("json", userSchema), async (c) => {
  const userData = c.req.valid("json"); // 类型已推断
  // userData: { name: string; email: string; age?: number; password: string; role: string }

  // 创建用户...
  return c.json({ message: "User created" }, 201);
});

// 查询参数验证
const querySchema = z.object({
  keyword: z.string().optional(),
  page: z.string().transform(Number).default("1"),
  limit: z.string().transform(Number).default("10"),
});

app.get("/users", zValidator("query", querySchema), (c) => {
  const { keyword, page, limit } = c.req.valid("query");
  // keyword?: string; page: number; limit: number
});

// 参数验证
const paramsSchema = z.object({
  id: z.string().uuid(),
});

app.get("/users/:id", zValidator("param", paramsSchema), (c) => {
  const { id } = c.req.valid("param");
  // id: string (uuid format)
});

// 自定义错误处理
app.post(
  "/users",
  zValidator("json", userSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          success: false,
          errors: result.error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        400
      );
    }
  }),
  async (c) => {
    // ...
  }
);

// 高级：嵌套对象验证
const postSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  tags: z.array(z.string()).min(1).max(5),
  author: z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
});

// 高级：条件验证
const registrationSchema = z
  .object({
    accountType: z.enum(["individual", "company"]),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    companyName: z.string().optional(),
    taxId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.accountType === "individual") {
        return data.firstName && data.lastName;
      }
      return true;
    },
    { message: "Individual accounts require first and last name" }
  );
```

---

### 06. 错误处理与异常过滤器

**目标**：统一优雅的错误处理机制

**内容要点**：

- Hono 默认错误处理
- HTTPException 内置异常
- 自定义业务异常
- 全局错误处理器
- 错误日志记录
- 友好的错误响应格式
- 错误码设计
- 环境差异（开发 vs 生产）

**实战示例**：

```typescript
import { HTTPException } from "hono/http-exception";

// 内置 HTTPException
app.get("/users/:id", async (c) => {
  const user = await db.findUser(c.req.param("id"));

  if (!user) {
    throw new HTTPException(404, {
      message: "User not found",
    });
  }

  return c.json(user);
});

// 自定义业务异常
class BusinessException extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = "BusinessException";
  }
}

// 全局错误处理器
app.onError((err, c) => {
  // 生产环境：隐藏详细错误信息
  if (c.env?.ENV === "production") {
    if (!(err instanceof HTTPException)) {
      console.error(err); // 记录到日志服务
      return c.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        500
      );
    }
  }

  // 业务异常
  if (err instanceof BusinessException) {
    return c.json(
      {
        success: false,
        code: err.code,
        message: err.message,
      },
      err.statusCode
    );
  }

  // HTTPException
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        message: err.message,
      },
      err.status
    );
  }

  // 未知错误
  console.error("Unhandled error:", err);
  return c.json(
    {
      success: false,
      message:
        c.env?.ENV === "production" ? "Internal Server Error" : err.message,
    },
    500
  );
});

// 404 处理
app.notFound((c) => {
  return c.json(
    {
      success: false,
      message: "Route not found",
    },
    404
  );
});

// 使用示例
app.post("/users", async (c) => {
  const { email } = await c.req.json();

  const existingUser = await db.findUserByEmail(email);
  if (existingUser) {
    throw new BusinessException(
      "EMAIL_ALREADY_EXISTS",
      "Email already registered",
      409
    );
  }

  // ...
});
```

---

## 第三阶段：数据持久化（2篇）

### 07. SQLite + Drizzle ORM

**目标**：掌握数据库设计和 ORM 使用

**内容要点**：

- 为什么选择 Drizzle ORM
  - TypeScript-first
  - 边缘友好
  - SQL-like API
  - 零运行时开销
- SQLite vs PostgreSQL vs Turso
- Drizzle Schema 定义
- Migration 管理
- CRUD 操作
- 关系查询（一对一、一对多、多对多）
- 事务处理
- 连接池管理

**实战示例**：

```typescript
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

// 初始化数据库
const sqlite = new Database("dev.db");
const db = drizzle(sqlite, { schema });

// schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// CRUD 操作
app.post("/users", async (c) => {
  const { email, password, name } = await c.req.json();

  const hashedPassword = await hash(password);

  const user = await db
    .insert(schema.users)
    .values({
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return c.json(user[0], 201);
});

app.get("/users", async (c) => {
  const users = await db.query.users.findMany({
    limit: 10,
    offset: (page - 1) * limit,
  });

  return c.json(users);
});

app.get("/users/:id", async (c) => {
  const user = await db.query.users.findFirst({
    where: eq(schema.users.id, c.req.param("id")),
    with: {
      posts: true, // 关联查询
    },
  });

  if (!user) {
    throw new HTTPException(404, { message: "User not found" });
  }

  return c.json(user);
});

app.put("/users/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const user = await db
    .update(schema.users)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(schema.users.id, id))
    .returning();

  return c.json(user[0]);
});

app.delete("/users/:id", async (c) => {
  await db.delete(schema.users).where(eq(schema.users.id, c.req.param("id")));

  return c.json({ message: "User deleted" });
});

// 事务处理
app.post("/transfer", async (c) => {
  const { fromId, toId, amount } = await c.req.json();

  await db.transaction(async (tx) => {
    await tx
      .update(accounts)
      .set({ balance: sql`${accounts.balance} - ${amount}` })
      .where(eq(accounts.id, fromId));

    await tx
      .update(accounts)
      .set({ balance: sql`${accounts.balance} + ${amount}` })
      .where(eq(accounts.id, toId));
  });

  return c.json({ message: "Transfer completed" });
});
```

---

### 08. CRUD 实战：博客文章 API

**目标**：整合前面知识，构建完整的博客 API

**内容要点**：

- 项目结构组织
- 路由设计
- 数据模型设计
- 完整 CRUD 实现
- 分页与过滤
- 搜索功能
- 软删除设计
- 数据库事务
- 关联数据处理

**实战示例**：

```typescript
// 项目结构
// src/
//   routes/
//     posts.ts
//   services/
//     post.service.ts
//   db/
//     schema.ts
//     index.ts

// routes/posts.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import * as schema from "../db/schema";
import { eq, and, desc, like } from "drizzle-orm";

const posts = new Hono();

// DTO
const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  published: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
});

const updatePostSchema = createPostSchema.partial();

const querySchema = z.object({
  page: z.string().transform(Number).default("1"),
  limit: z.string().transform(Number).default("10"),
  keyword: z.string().optional(),
  published: z.enum(["true", "false"]).optional(),
});

// GET /posts - 列表（分页、搜索、过滤）
posts.get("/", zValidator("query", querySchema), async (c) => {
  const { page, limit, keyword, published } = c.req.valid("query");
  const db = c.get("db");

  const conditions = [];

  if (keyword) {
    conditions.push(like(schema.posts.title, `%${keyword}%`));
  }

  if (published !== undefined) {
    conditions.push(eq(schema.posts.published, published === "true"));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [postsList, total] = await Promise.all([
    db.query.posts.findMany({
      where,
      limit,
      offset: (page - 1) * limit,
      orderBy: [desc(schema.posts.createdAt)],
      with: {
        author: {
          columns: { id: true, name: true, email: true },
        },
      },
    }),
    db
      .select({ count: sql<number>`count(*)` })
      .from(schema.posts)
      .where(where),
  ]);

  return c.json({
    data: postsList,
    meta: {
      page,
      limit,
      total: total[0].count,
      totalPages: Math.ceil(total[0].count / limit),
    },
  });
});

// GET /posts/:id - 详情
posts.get(
  "/:id",
  zValidator("param", z.object({ id: z.string().uuid() })),
  async (c) => {
    const { id } = c.req.valid("param");
    const db = c.get("db");

    const post = await db.query.posts.findFirst({
      where: eq(schema.posts.id, id),
      with: {
        author: true,
        comments: true,
        tags: true,
      },
    });

    if (!post) {
      throw new HTTPException(404, { message: "Post not found" });
    }

    return c.json(post);
  }
);

// POST /posts - 创建
posts.post("/", zValidator("json", createPostSchema), async (c) => {
  const data = c.req.valid("json");
  const db = c.get("db");
  const currentUser = c.get("user");

  const post = await db
    .insert(schema.posts)
    .values({
      id: crypto.randomUUID(),
      ...data,
      authorId: currentUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return c.json(post[0], 201);
});

// PATCH /posts/:id - 更新
posts.patch(
  "/:id",
  zValidator("param", z.object({ id: z.string().uuid() })),
  zValidator("json", updatePostSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");
    const db = c.get("db");
    const currentUser = c.get("user");

    // 检查权限
    const post = await db.query.posts.findFirst({
      where: eq(schema.posts.id, id),
    });

    if (!post) {
      throw new HTTPException(404, { message: "Post not found" });
    }

    if (post.authorId !== currentUser.id) {
      throw new HTTPException(403, { message: "Forbidden" });
    }

    const updated = await db
      .update(schema.posts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.posts.id, id))
      .returning();

    return c.json(updated[0]);
  }
);

// DELETE /posts/:id - 删除（软删除）
posts.delete(
  "/:id",
  zValidator("param", z.object({ id: z.string().uuid() })),
  async (c) => {
    const { id } = c.req.valid("param");
    const db = c.get("db");
    const currentUser = c.get("user");

    const post = await db.query.posts.findFirst({
      where: eq(schema.posts.id, id),
    });

    if (!post || post.authorId !== currentUser.id) {
      throw new HTTPException(403, { message: "Forbidden" });
    }

    await db
      .update(schema.posts)
      .set({ deletedAt: new Date() })
      .where(eq(schema.posts.id, id));

    return c.json({ message: "Post deleted" });
  }
);

export default posts;
```

---

## 第四阶段：进阶功能（3-4篇）

### 09. JWT 认证实现

**目标**：实现完整的用户认证系统

**内容要点**：

- JWT 原理与结构
- Access Token vs Refresh Token
- JWT 签名与验证
- Token 存储策略
- 密码哈希
- 注册、登录、登出流程
- Token 刷新机制
- 保护路由

**实战示例**：

```typescript
import { sign, verify } from "hono/jwt";
import { hash, compare } from "bcrypt";

// 配置
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const REFRESH_TOKEN_EXPIRY = "7d";
const ACCESS_TOKEN_EXPIRY = "15m";

// 注册
app.post("/auth/register", async (c) => {
  const { email, password, name } = await c.req.json();

  // 检查用户是否存在
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return c.json({ error: "Email already registered" }, 409);
  }

  // 哈希密码
  const hashedPassword = await hash(password, 10);

  // 创建用户
  const user = await db
    .insert(users)
    .values({
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      name,
    })
    .returning();

  return c.json(
    {
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
    },
    201
  );
});

// 登录
app.post("/auth/login", async (c) => {
  const { email, password } = await c.req.json();

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  // 生成 tokens
  const accessToken = await sign(
    {
      sub: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 15, // 15分钟
    },
    JWT_SECRET
  );

  const refreshToken = await sign(
    {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7天
    },
    JWT_REFRESH_SECRET
  );

  // 存储 refresh token（可选：存入数据库）
  await db.insert(refreshTokens).values({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return c.json({
    accessToken,
    refreshToken,
  });
});

// 刷新 Token
app.post("/auth/refresh", async (c) => {
  const { refreshToken } = await c.req.json();

  try {
    const payload = await verify(refreshToken, JWT_REFRESH_SECRET);

    // 检查 refresh token 是否有效
    const storedToken = await db.query.refreshTokens.findFirst({
      where: eq(refreshTokens.token, refreshToken),
    });

    if (!storedToken) {
      return c.json({ error: "Invalid refresh token" }, 401);
    }

    // 生成新的 access token
    const accessToken = await sign(
      {
        sub: payload.sub,
        exp: Math.floor(Date.now() / 1000) + 60 * 15,
      },
      JWT_SECRET
    );

    return c.json({ accessToken });
  } catch (error) {
    return c.json({ error: "Invalid refresh token" }, 401);
  }
});

// 登出
app.post("/auth/logout", async (c) => {
  const { refreshToken } = await c.req.json();

  await db.delete(refreshTokens).where(eq(refreshTokens.token, refreshToken));

  return c.json({ message: "Logged out" });
});

// 认证中间件
const authMiddleware = async (c, next) => {
  const authorization = c.req.header("Authorization");

  if (!authorization) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = await verify(token, JWT_SECRET);

    // 获取用户信息
    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.sub),
    });

    if (!user) {
      return c.json({ error: "User not found" }, 401);
    }

    c.set("user", user);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};

// 受保护路由
app.use("/api/protected/*", authMiddleware);

app.get("/api/protected/me", (c) => {
  const user = c.get("user");
  return c.json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
});
```

---

### 10. 文件上传处理

**目标**：实现文件上传功能

**内容要点**：

- 文件上传原理
- multipart/form-data 处理
- 文件类型验证
- 文件大小限制
- 存储策略（本地、OSS、R2）
- 图片处理（压缩、裁剪）
- 安全考虑

**实战示例**：

```typescript
import { multipart } from "@hono/node-server";

app.post(
  "/upload/avatar",
  multipart(async (c) => {
    const body = await c.req.parseBody();

    const file = body.avatar as File;

    if (!file) {
      return c.json({ error: "No file uploaded" }, 400);
    }

    // 验证文件类型
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: "Invalid file type" }, 400);
    }

    // 验证文件大小（5MB）
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return c.json({ error: "File too large" }, 400);
    }

    // 生成文件名
    const ext = file.name.split(".").pop();
    const filename = `${crypto.randomUUID()}.${ext}`;

    // 保存到本地
    const buffer = await file.arrayBuffer();
    await fs.writeFile(`./uploads/avatars/${filename}`, Buffer.from(buffer));

    // 返回 URL
    const url = `/uploads/avatars/${filename}`;

    return c.json({ url });
  })
);

// 多文件上传
app.post(
  "/upload/gallery",
  multipart(async (c) => {
    const body = await c.req.parseBody();

    const files = [];
    let index = 0;

    while (true) {
      const file = body[`files[${index}]`] as File;

      if (!file) break;

      // 处理文件...
      files.push({ name: file.name, size: file.size });
      index++;
    }

    return c.json({ files });
  })
);

// 使用 Cloudflare R2
app.post("/upload/r2", async (c) => {
  const file = await c.req.parseBody();

  const r2 = c.env.R2; // Cloudflare R2 binding

  const key = `uploads/${crypto.randomUUID()}`;
  await r2.put(key, file.image);

  const url = `${c.env.R2_PUBLIC_URL}/${key}`;

  return c.json({ url });
});
```

---

### 11. WebSocket 实时通信

**目标**：实现实时功能

**内容要点**：

- WebSocket 原理
- Hono WebSocket 升级
- 广播与定向推送
- 房间机制
- 心跳检测
- 重连策略

**实战示例**：

```typescript
import { createWebSocketStream } from "@hono/node-server/websocket";

app.get("/ws", async (c) => {
  if (c.req.header("upgrade") !== "websocket") {
    return c.text("Expected websocket", 400);
  }

  return c.streamText(async (stream) => {
    const wsStream = createWebSocketStream(c);

    wsStream.readable.pipeTo(
      new WritableStream({
        async write(chunk) {
          const message = JSON.parse(chunk.toString());

          // 处理消息
          switch (message.type) {
            case "ping":
              wsStream.writable.write(JSON.stringify({ type: "pong" }));
              break;

            case "chat":
              // 广播给其他客户端
              broadcast(message);
              break;
          }
        },
      })
    );
  });
});

// 使用 hono/ws
import { websocket } from "hono/websocket";

app.get(
  "/ws",
  websocket((c) => {
    return c.newResponse(async (stream) => {
      const reader = stream.readable.getReader();
      const writer = stream.writable.getWriter();

      // 发送欢迎消息
      await writer.write(
        JSON.stringify({
          type: "connected",
          message: "Connected to server",
        })
      );

      // 监听消息
      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        const message = JSON.parse(new TextDecoder().decode(value));

        // 回显消息
        await writer.write(
          JSON.stringify({
            type: "echo",
            data: message,
          })
        );
      }
    });
  })
);
```

---

### 12. 安全与限流

**目标**：增强应用安全性

**内容要点**：

- Rate Limiting 限流
- CORS 跨域配置
- Helmet 安全头
- XSS 防护
- SQL 注入防护
- CSRF 防护
- 请求体大小限制

**实战示例**：

```typescript
import { cors } from "hono/cors";
import { helmet } from "hono/helmet";
import { rateLimiter } from "hono/rate-limiter";

// CORS
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    maxAge: 86400,
  })
);

// Helmet
app.use("*", helmet());

// Rate Limiter（内存存储）
app.use(
  "*",
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 每个窗口最多 100 个请求
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// 严格的 API 限流
const apiLimiter = rateLimiter({
  windowMs: 60 * 1000,
  max: 20,
  message: "Too many requests from this IP",
});

app.use("/api/*", apiLimiter);

// 登录限流（防止暴力破解）
const loginLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5, // 15 分钟内最多 5 次
  skipFailedRequests: false,
});

app.use("/auth/login", loginLimiter);

// 请求体大小限制
app.use("*", async (c, next) => {
  const contentLength = c.req.header("content-length");

  if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
    return c.json({ error: "Request body too large" }, 413);
  }

  await next();
});
```

---

## 第五阶段：部署与优化（3-4篇）

### 13. 边缘缓存策略

**目标**：利用边缘网络提升性能

**内容要点**：

- 缓存头（Cache-Control）
- ETag 与 Last-Modified
- CDN 缓存策略
- 边缘函数缓存
- 缓存失效策略

**实战示例**：

```typescript
// 静态资源长期缓存
app.get("/static/*", async (c) => {
  c.header("Cache-Control", "public, max-age=31536000, immutable");
  // serve file...
});

// API 响应短期缓存
app.get("/posts", async (c) => {
  const posts = await getPosts();

  c.header("Cache-Control", "public, max-age=60, s-maxage=300");
  // max-age: 浏览器缓存 60 秒
  // s-maxage: CDN 缓存 300 秒

  return c.json(posts);
});

// ETag 实现
app.get("/posts/:id", async (c) => {
  const post = await getPost(c.req.param("id"));

  const etag = generateETag(post);

  const ifNoneMatch = c.req.header("if-none-match");

  if (ifNoneMatch === etag) {
    return c.body(null, 304);
  }

  c.header("ETag", etag);
  c.header("Cache-Control", "public, max-age=3600");

  return c.json(post);
});

// Cloudflare Workers KV 缓存
app.get("/api/users/:id", async (c) => {
  const { id } = c.req.param();
  const cache = c.env.CACHE; // KV binding

  // 尝试从缓存读取
  const cached = await cache.get(`user:${id}`);
  if (cached) {
    return c.json(JSON.parse(cached));
  }

  // 缓存未命中，查询数据库
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  // 写入缓存（TTL 1 小时）
  await cache.put(`user:${id}`, JSON.stringify(user), {
    expirationTtl: 3600,
  });

  return c.json(user);
});
```

---

### 14. 测试策略

**目标**：编写可靠的测试

**内容要点**：

- 单元测试
- 集成测试
- Vitest 配置
- 请求测试
- 中间件测试
  Mock 策略

**实战示例**：

```typescript
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Hono } from "hono";

describe("Users API", () => {
  const app = new Hono();

  app.get("/users", (c) => c.json([{ id: "1", name: "John" }]));
  app.post("/users", async (c) => {
    const body = await c.req.json();
    return c.json({ id: "2", ...body }, 201);
  });

  it("GET /users should return users list", async () => {
    const res = await app.request("/users");
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual([{ id: "1", name: "John" }]);
  });

  it("POST /users should create user", async () => {
    const res = await app.request("/users", {
      method: "POST",
      body: JSON.stringify({ name: "Jane" }),
    });

    expect(res.status).toBe(201);

    const json = await res.json();
    expect(json.name).toBe("Jane");
  });
});
```

---

### 15. Cloudflare Workers 部署

**目标**：部署到边缘网络

**内容要点**：

- Cloudflare Workers 介绍
- wrangler CLI 配置
- 环境变量管理
- KV / D1 / R2 使用
- 部署流程
- 域名绑定

**实战示例**：

```toml
# wrangler.toml
name = "my-hono-app"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# KV 命名空间
[[kv_namespaces]]
binding = "CACHE"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# D1 数据库
[[d1_databases]]
binding = "DB"
database_name = "my-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# R2 存储
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "my-bucket"

# 环境变量
[env.production]
vars = { ENV = "production" }

# 部署配置
[env.production.routes]
pattern = "api.example.com/*"
zone_name = "example.com"
```

```typescript
// src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  CACHE: KVNamespace;
  DB: D1Database;
  STORAGE: R2Bucket;
  ENV: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors());

app.get("/", (c) => {
  return c.text(`Running on ${c.env.ENV}`);
});

app.get("/cache/:key", async (c) => {
  const { key } = c.req.param();
  const value = await c.env.CACHE.get(key);

  return c.json({ value });
});

export default app;
```

```bash
# 部署命令
wrangler deploy
```

---

### 16. Deno Deploy 部署

**目标**：部署到 Deno 运行时

**内容要点**：

- Deno Deploy 介绍
- 部署配置
- 环境变量
- Deno KV 使用
- CI/CD 集成

**实战示例**：

```typescript
// deno.json
{
  "tasks": {
    "dev": "deno run --watch --allow-net --allow-env src/main.ts",
    "start": "deno run --allow-net --allow-env src/main.ts"
  },
  "imports": {
    "hono": "npm:hono",
    "hono/": "npm:hono/"
  }
}
```

```typescript
// src/main.ts
import { Hono } from "hono";
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const app = new Hono();

app.get("/", (c) => c.text("Hello from Deno Deploy!"));

// Deno KV
app.get("/kv/:key", async (c) => {
  const kv = await Deno.openKv();
  const { key } = c.req.param();

  const value = await kv.get(["cache", key]);

  return c.json({ value: value.value.value });
});

await serve(app.fetch, { port: 8000 });
```

---

### 17. 性能优化

**目标**：提升应用性能

**内容要点**：

- 性能分析工具
- 减少冷启动
- 优化数据库查询
- 使用流式响应
- CDN 加速
- 压缩响应
- 连接池配置

**实战示例**：

```typescript
// 响应压缩
import { compress } from "hono/compress";
app.use("*", compress());

// 流式 JSON
app.get("/large-data", async (c) => {
  return c.stream(async (stream) => {
    const data = await fetchLargeData();

    stream.write("[");

    for (let i = 0; i < data.length; i++) {
      if (i > 0) stream.write(",");

      stream.write(JSON.stringify(data[i]));
    }

    stream.write("]");
  });
});

// 查询优化
app.get("/users/:id/posts", async (c) => {
  const { id } = c.req.param();

  // 使用 select 只查询需要的字段
  const posts = await db
    .select({
      id: posts.id,
      title: posts.title,
      createdAt: posts.createdAt,
      // 不查询 content 字段（可能很大）
    })
    .from(posts)
    .where(eq(posts.authorId, id));

  return c.json(posts);
});
```

---

### 18. 完整实战项目

**目标**：构建一个完整的生产级应用

**项目**：个人博客 API

**功能清单**：

- ✅ 用户认证（JWT）
- ✅ 文章 CRUD
- ✅ 评论系统
- ✅ 标签分类
- ✅ 文件上传
- ✅ 搜索功能
- ✅ 分页过滤
- ✅ Rate Limiting
- ✅ 缓存策略
- ✅ 错误处理
- ✅ 日志记录
- ✅ 测试覆盖
- ✅ API 文档
- ✅ Docker 部署
- ✅ Cloudflare Workers 部署

**完整项目结构**：

```
project/
├── src/
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── posts.ts
│   │   ├── comments.ts
│   │   └── tags.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── error.ts
│   │   └── logger.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── post.service.ts
│   │   └── cache.service.ts
│   ├── db/
│   │   ├── schema.ts
│   │   └── index.ts
│   ├── validators/
│   │   └── schemas.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── tests/
│   ├── auth.test.ts
│   ├── posts.test.ts
│   └── comments.test.ts
├── Dockerfile
├── docker-compose.yml
├── wrangler.toml
└── package.json
```

---

## 附录

### A. 开发工具推荐

- **IDE**：VSCode + TypeScript extension
- **API 测试**：Postman / Thunder Client
- **数据库管理**：DB Browser for SQLite / Prisma Studio
- **KV 查看**：Cloudflare Dashboard / wrangler kv
- **监控**：Cloudflare Analytics

### B. 常见问题与解决方案

1. **冷启动慢**：使用 Cloudflare Workers 的 Smart Placement
2. **内存限制**：边缘环境内存有限，避免大对象缓存
3. **数据库连接**：使用 HTTP-based 数据库（D1、Turso）
4. **文件上传**：推荐使用 R2 或 S3，而非本地存储

### C. 进阶主题

- Hono 中间件开发
- Server-Sent Events (SSE)
- gRPC-Web 集成
- GraphQL Yoga 集成
- tRPC 集成
- Microservices 架构
- Event Sourcing
- CI/CD 配置

---

## 写作规范

### 每篇文章结构

````markdown
---
title: "文章标题"
date: "YYYY-MM-DD"
summary: "一句话总结（100字以内）"
tags: ["Hono", "相关标签"]
category: "hono"
cover: ""
draft: false
series: "Hono 渐进式学习"
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

所有文章围绕一个统一的实战项目展开：**个人博客系统 API**

**功能模块**：
- 用户管理（注册、登录、资料）
- 文章管理（CRUD、发布、草稿）
- 评论系统
- 标签分类
- 文件上传
- 搜索功能

---

## 学习路径图

```

┌─────────────────────────────────────────────────────────────┐
│ Hono 学习路径 │
├─────────────────────────────────────────────────────────────┤
│ │
│ 第一阶段：快速入门 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 01. 环境搭建 │ ───► │ 02. 路由系统 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │
│ ▼ ▼ │
│ 第二阶段：核心功能 │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────┐ │
│ │ 03. 中间件 │ ───► │ 04. 请求响应 │ ──► │ 05. 验证 │ │
│ └──────────────────┘ └──────────────────┘ └──────────┘ │
│ │ │ │ │
│ ▼ ▼ ▼ │
│ 第三阶段：数据持久化 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 07. SQLite │ ───► │ 08. CRUD 实战 │ │
│ │ + Drizzle │ │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │
│ ▼ ▼ │
│ 第四阶段：进阶功能 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 09. JWT认证 │ 10. 文件上传 │ 11. WebSocket │ │
│ ├─────────────────────────────────────────────┤ │
│ │ 12. 安全限流 │ │
│ └─────────────────────────────────────────────┘ │
│ │ │
│ ▼ ▼ │
│ 第五阶段：部署与优化 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 13. 边缘缓存 │ 14. 测试 │ 15. CF Workers │ │
│ ├─────────────────────────────────────────────┤ │
│ │ 16. Deno Deploy │ 17. 性能优化 │ 18. 实战 │ │
│ └─────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘

```

---

## 预期效果

完成本系列学习后，读者将能够：

1. ✅ 独立搭建 Hono 项目
2. ✅ 设计 RESTful API
3. ✅ 实现完整的认证系统
4. ✅ 熟练使用 Drizzle ORM
5. ✅ 处理文件上传、WebSocket 等常见需求
6. ✅ 编写可靠的测试
7. ✅ 部署到 Cloudflare Workers / Deno Deploy
8. ✅ 理解边缘计算架构
9. ✅ 构建高性能 API

---

## 版本信息

- **Hono**：4.x
- **Node.js**：20.x LTS / Deno / Bun
- **TypeScript**：5.x
- **Drizzle ORM**：latest
- **Vitest**：latest

*计划创建日期：2026-03-20*
*预计完成时间：2-3个月（每周 1-2 篇）*
```
