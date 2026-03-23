# Drizzle ORM 实战系列文章计划

## 系列概述

**系列名称**：Drizzle ORM 类型安全的数据库访问实战
**文章数量**：10篇
**总字数**：约 70,000-80,000 字
**难度级别**：中级 - 高级
**预计学习时间**：4-5周
**技术栈**：Drizzle ORM + TypeScript + PostgreSQL + tRPC + Next.js + Cloudflare Workers

## 系列定位

### 目标读者

- 有 TypeScript 基础的开发者
- 使用过 Prisma 或其他 ORM 的开发者
- 需要 Edge Computing 的全栈开发者
- 追求性能和类型安全的生产级应用开发者

### 核心价值

- 🚀 **极致性能**：零运行时开销，比 Prisma 快 10x+
- 📦 **极小体积**：~50KB vs Prisma ~2MB
- 🔒 **类型安全**：100% TypeScript 类型覆盖，无需代码生成
- ⚡ **Edge 完美**：Cloudflare Workers、Deno、Bun 完美支持
- 💪 **SQL 控制力**：类 SQL 语法，精细控制查询

---

## 文章规划（10篇）

### 第1篇：Drizzle ORM 简介 - 为什么选择 Drizzle

**文件名**：`01-introduction-drizzle.mdx`
**预计字数**：7,000字

#### 核心内容

- 什么是 Drizzle ORM
- Drizzle vs Prisma vs TypeORM 深度对比
- 核心设计理念
- 适用场景分析
- 第一个 Drizzle 应用

#### 技术要点

```typescript
// 最小示例
import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "./schema";

const db = drizzle(postgresClient);
const result = await db.select().from(users);
```

#### 学习目标

- 理解 Drizzle 的核心优势
- 掌握基本安装和配置
- 完成第一个查询

#### 对比表格

- 性能测试数据
- Bundle 大小对比
- 类型安全对比
- Edge 运行时支持对比

---

### 第2篇：Schema 定义和数据建模

**文件名**：`02-schema-modeling.mdx`
**预计字数**：8,000字

#### 核心内容

- Drizzle Schema 核心 API
- PostgreSQL 数据类型映射
- 表关系定义（一对一、一对多、多对多）
- 索引和约束
- 枚举类型
- 自动生成时间戳

#### 技术要点

```typescript
// 基础表定义
import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 关系定义
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  authorId: integer("author_id").references(() => users.id),
});

// 索引
export const usersIndex = index("email_idx").on(users.email);
```

#### 实战示例

- 博客系统数据模型
- 电商系统数据模型
- 社交网络数据模型

---

### 第3篇：CRUD 操作和查询构建器

**文件名**：`03-crud-queries.mdx`
**预计字数**：8,500字

#### 核心内容

- Create（插入数据）
- Read（查询数据）
- Update（更新数据）
- Delete（删除数据）
- 查询构建器 API
- where 条件、orderBy、limit/offset
- 类型安全的查询构建

#### 技术要点

```typescript
import { eq, and, or, sql, desc } from "drizzle-orm";

// Create
await db
  .insert(users)
  .values({ email: "test@example.com", name: "Test" })
  .returning();

// Read - 基础查询
await db.select().from(users).where(eq(users.email, "test@example.com"));

// Read - 复杂条件
await db
  .select()
  .from(users)
  .where(
    or(eq(users.email, "test@example.com"), sql`${users.name} LIKE ${`%Test%`}`)
  )
  .orderBy(desc(users.createdAt))
  .limit(10);

// Update
await db.update(users).set({ name: "Updated" }).where(eq(users.id, 1));

// Delete
await db.delete(users).where(eq(users.id, 1));
```

#### 实战示例

- 博客文章 CRUD
- 用户管理 CRUD
- 分页、搜索、排序

---

### 第4篇：关系查询和联表操作

**文件名**：`04-relations-joins.mdx`
**预计字数**：8,000字

#### 核心内容

- 一对一关系
- 一对多关系
- 多对多关系
- INNER JOIN
- LEFT JOIN
- RIGHT JOIN
- FULL JOIN
- 关系加载优化（N+1 问题）

#### 技术要点

```typescript
// 一对多关系查询
const result = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId))
  .where(eq(users.id, 1));

// 多对多关系
const userPosts = await db
  .select()
  .from(users)
  .innerJoin(postToTags, eq(users.id, postToTags.postId))
  .innerJoin(tags, eq(postToTags.tagId, tags.id))
  .where(eq(users.id, 1));

// 聚合查询
const usersWithPostCount = await db
  .select({
    id: users.id,
    name: users.name,
    postCount: sql<number>`count(${posts.id})`.as("post_count"),
  })
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId))
  .groupBy(users.id);
```

#### 实战示例

- 博客文章和评论
- 商品和分类
- 用户和角色（多对多）

---

### 第5篇：事务、迁移和数据完整性

**文件名**：`05-transactions-migrations.mdx`
**预计字数**：8,500字

#### 核心内容

- 事务基础
- 嵌套事务
- 保存点（Savepoints）
- 数据库迁移
- 迁移生成和管理
- 数据种子（Seeding）
- 数据回滚

#### 技术要点

```typescript
// 事务
await db.transaction(async (tx) => {
  await tx.insert(users).values({ email: "test@example.com" });
  await tx.insert(posts).values({
    title: "Hello",
    authorId: sql`currval('users_id_seq')`,
  });
});

// 迁移
import { migrate } from "drizzle-orm/node-postgres/migrator";

await migrate(db, { migrationsFolder: "drizzle" });

// 自定义迁移
import { sql } from "drizzle-orm";

await db.execute(sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
  )
`);
```

#### 实战示例

- 订单创建（扣库存 + 创建订单）
- 账户转账（原子操作）
- 数据库版本管理

---

### 第6篇：Drizzle + tRPC 完美结合

**文件名**：`06-trpc-integration.mdx`
**预计字数**：8,000字

#### 核心内容

- 为什么 Drizzle + tRPC 是绝配
- 类型安全的端到端流程
- 共享 Schema 定义
- tRPC Router 集成
- 错误处理
- 输入验证（Zod）

#### 技术要点

```typescript
// 共享 Schema
// packages/database/src/schema.ts
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

// tRPC Router
// packages/api/src/routers/users.router.ts
import { users } from "@my-monorepo/database";
import { eq } from "drizzle-orm";

export const usersRouter = t.router({
  list: t.procedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(users);
  }),

  byId: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const [user] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.id, input.id));

      return user;
    }),

  create: t.procedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [user] = await ctx.db.insert(users).values(input).returning();

      return user;
    }),
});
```

#### 实战示例

- 全栈博客应用
- 用户认证系统
- 实时聊天应用

---

### 第7篇：与 Next.js/Nuxt 深度集成

**文件名**：`07-framework-integration.mdx`
**预计字数**：8,500字

#### 核心内容

- Next.js 14 App Router 集成
- Server Components 中的 Drizzle
- Client Components 中的 Drizzle
- 连接池管理
- Nuxt 3 集成
- Remix 集成
- 环境变量配置

#### 技术要点

```typescript
// Next.js - Server Components
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export default async function UserPage({
  params
}: {
  params: { id: string }
}) {
  const [user] = await db.select()
    .from(users)
    .where(eq(users.id, parseInt(params.id)));

  return <div>{user?.name}</div>;
}

// Next.js - Server Actions
'use server';

import { db } from '@/lib/db';
import { users } from '@/lib/schema';

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string;

  await db.insert(users).values({ email });
}

// Nuxt 3 - Server Routes
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  const users = await db.select().from(usersTable);
  return users;
});
```

#### 实战示例

- Next.js 博客系统
- Nuxt 3 电商应用
- Remix Dashboard

---

### 第8篇：Edge Computing 实战（Cloudflare Workers）

**文件名**：`08-edge-computing.mdx`
**预计字数**：9,000字

#### 核心内容

- 为什么选择 Edge Computing
- Cloudflare Workers + Drizzle
- Cloudflare D1 数据库（SQLite at Edge）
- Cloudflare R2 存储
- Cloudflare KV 键值存储
- Deno Deploy + Drizzle
- Bun + Drizzle
- 边缘性能优化

#### 技术要点

```typescript
// Cloudflare Workers + D1
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.DB, { schema });

    const users = await db.select().from(schema.users);

    return Response.json(users);
  },
};

// Cloudflare KV Cache
import { drizzle } from "drizzle-orm/d1";

export default {
  async fetch(request: Request, env: Env) {
    // 尝试从 KV 读取
    const cached = await env.CACHE.get("users");
    if (cached) {
      return Response.json(JSON.parse(cached));
    }

    // 从数据库查询
    const db = drizzle(env.DB);
    const users = await db.select().from(schema.users);

    // 写入 KV（缓存 60 秒）
    await env.CACHE.put("users", JSON.stringify(users), {
      expirationTtl: 60,
    });

    return Response.json(users);
  },
};

// Deno Deploy
import { drizzle } from "https://esm.sh/drizzle-orm/postgres-js";
import postgres from "https://esm.sh/postgres";

const query = postgres({ url: Deno.env.get("DATABASE_URL") });
const db = drizzle(query);

Deno.serve(async (req) => {
  const users = await db.select().from(usersTable);
  return Response.json(users);
});
```

#### 实战示例

- 边缘 API 服务
- 全球分布式博客
- 边缘 CDN 缓存系统
- 实时协作应用

---

### 第9篇：性能优化和最佳实践

**文件名**：`09-performance-best-practices.mdx`
**预计字数**：8,000字

#### 核心内容

- 查询性能优化
- 索引优化策略
- 连接池配置
- 预编译语句
- 批量操作优化
- 缓存策略（Redis、Upstash）
- 慢查询日志
- 性能监控

#### 技术要点

```typescript
// 1. 索引优化
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }),
  },
  (table) => ({
    emailIdx: index("email_idx").on(table.email),
    compositeIdx: index("composite_idx").on(table.email, table.createdAt),
  })
);

// 2. 只查询需要的字段
const users = await db
  .select({
    id: users.id,
    name: users.name,
  })
  .from(users)
  .where(eq(users.active, true));

// 3. 批量插入
await db.insert(users).values([
  { email: "user1@example.com" },
  { email: "user2@example.com" },
  // ... 1000条
]);

// 4. 事务批量操作
await db.transaction(async (tx) => {
  for (const user of users) {
    await tx.insert(users).values(user);
  }
});

// 5. Prepared Statements
const stmt = db
  .select()
  .from(users)
  .where(eq(users.email, sql.placeholder("email")))
  .prepare();

await stmt.execute({ email: "test@example.com" });

// 6. Redis 缓存
import Redis from "ioredis";

const redis = new Redis();

export async function getCachedUser(id: number) {
  // 尝试从缓存读取
  const cached = await redis.get(`user:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // 从数据库查询
  const [user] = await db.select().from(users).where(eq(users.id, id));

  // 写入缓存（5分钟）
  await redis.setex(`user:${id}`, 300, JSON.stringify(user));

  return user;
}
```

#### 性能测试

- Prisma vs Drizzle 性能对比
- 1000 条记录查询时间
- 10000 条记录批量插入
- 并发连接测试

#### 最佳实践清单

- ✅ 连接池配置
- ✅ 索引策略
- ✅ 查询优化
- ✅ 缓存策略
- ✅ 错误处理
- ✅ 日志记录
- ✅ 监控告警

---

### 第10篇：实战项目 - 全球博客系统

**文件名**：`10-project-global-blog.mdx`
**预计字数**：10,000字

#### 项目概述

构建一个**全球分布式博客系统**，展示 Drizzle ORM 的全部能力：

- Cloudflare Workers 部署
- D1 数据库（全球分布式）
- KV 缓存
- R2 图片存储
- tRPC 类型安全 API
- Next.js 14 前端

#### 技术栈

```
前端：Next.js 14 + TailwindCSS
后端：Cloudflare Workers + Drizzle ORM
数据库：Cloudflare D1（SQLite at Edge）
缓存：Cloudflare KV
存储：Cloudflare R2
API：tRPC
```

#### 核心功能

1. **文章管理**
   - CRUD 操作
   - Markdown 支持
   - 标签和分类
   - SEO 优化

2. **用户系统**
   - 注册/登录
   - 个人资料
   - 权限管理

3. **评论系统**
   - 实时评论
   - 审核机制
   - 回复功能

4. **图片上传**
   - R2 存储
   - 图片优化
   - CDN 加速

5. **搜索功能**
   - 全文搜索
   - 标签筛选
   - 分页加载

#### 项目结构

```
global-blog/
├── apps/
│   ├── web/                   # Next.js 前端
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
│   └── worker/                # Cloudflare Workers
│       ├── src/
│       │   ├── db/
│       │   │   ├── schema/
│       │   │   └── migrations/
│       │   ├── routers/
│       │   └── index.ts
│       └── wrangler.toml
├── packages/
│   ├── database/              # 共享数据库 Schema
│   ├── trpc/                  # tRPC 定义
│   └── ui/                    # 共享 UI 组件
└── package.json
```

#### 核心代码示例

**数据库 Schema**

```typescript
// packages/database/src/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  authorId: integer("author_id").references(() => users.id),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  postId: integer("post_id").references(() => posts.id),
  authorId: integer("author_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
```

**tRPC Router**

```typescript
// apps/worker/src/routers/posts.router.ts
import { eq, desc } from "drizzle-orm";
import { posts } from "@my-monorepo/database";
import { z } from "zod";

export const postsRouter = t.router({
  list: t.procedure
    .input(
      z.object({
        page: z.number().default(1),
        limit: z.number().default(10),
        published: z.boolean().default(true),
      })
    )
    .query(async ({ input, ctx }) => {
      const where = input.published
        ? sql`${posts.publishedAt} is not null`
        : undefined;

      const items = await ctx.db
        .select()
        .from(posts)
        .where(where)
        .orderBy(desc(posts.publishedAt))
        .limit(input.limit)
        .offset((input.page - 1) * input.limit);

      return items;
    }),

  bySlug: t.procedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const [post] = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.slug, input.slug));

      return post;
    }),

  create: t.procedure
    .input(
      z.object({
        title: z.string().min(1),
        slug: z.string(),
        content: z.string(),
        excerpt: z.string().optional(),
        coverImage: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [post] = await ctx.db
        .insert(posts)
        .values({
          ...input,
          authorId: ctx.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return post;
    }),
});
```

**Next.js Server Component**

```typescript
// apps/web/src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { serverClient } from '@/lib/trpc/server';
import { Markdown } from '@/components/Markdown';

export default async function BlogPostPage({
  params
}: {
  params: { slug: string }
}) {
  const post = await serverClient.posts.bySlug.query({
    slug: params.slug
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      <Markdown content={post.content} />
    </article>
  );
}
```

**部署配置**

```toml
# apps/worker/wrangler.toml
name = "global-blog-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "global-blog"
database_id = "your-database-id"

[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-id"

[[r2_buckets]]
binding = "STORAGE"
bucket_name = "global-blog-images"
```

#### 性能指标

- ❄️ 全球延迟：< 50ms（95%）
- 📦 Bundle 大小：~100KB
- ⚡ 冷启动：< 10ms
- 🚀 并发请求：10000+ QPS
- 💰 成本：$5-10/月

#### 部署步骤

1. 创建 Cloudflare 账户
2. 配置 D1 数据库
3. 配置 KV 命名空间
4. 配置 R2 存储
5. 部署 Worker
6. 部署 Next.js 到 Vercel
7. 配置自定义域名

---

## 学习路径

### 预备知识

- ✅ TypeScript 基础
- ✅ SQL 基础（SELECT、INSERT、UPDATE、DELETE）
- ✅ React/Nuxt 基础
- ✅ Node.js 基础

### 学习顺序

**第1周：基础入门**

- 第1篇：Drizzle ORM 简介
- 第2篇：Schema 定义和数据建模
- 第3篇：CRUD 操作

**第2周：进阶应用**

- 第4篇：关系查询和联表操作
- 第5篇：事务和迁移
- 第6篇：tRPC 集成

**第3周：框架集成**

- 第7篇：Next.js/Nuxt 集成
- 第8篇：Edge Computing 实战

**第4周：优化和实战**

- 第9篇：性能优化和最佳实践
- 第10篇：全球博客系统项目

### 学习目标

**学完本系列，你将能够：**

1. ✅ 熟练使用 Drizzle ORM 构建生产级应用
2. ✅ 理解 Drizzle vs Prisma vs TypeORM 的区别
3. ✅ 掌握类型安全的数据库访问模式
4. ✅ 在 Edge Computing 环境部署数据库应用
5. ✅ 优化数据库查询性能
6. ✅ 与 tRPC、Next.js、Nuxt 等现代框架集成
7. ✅ 构建完整的全栈应用

---

## 文章特色

### 1. 实战导向

每篇文章都包含大量可运行的代码示例，从简单的 CRUD 到复杂的分布式系统。

### 2. 对比教学

与 Prisma、TypeORM 持续对比，帮助理解不同 ORM 的适用场景。

### 3. 性能优先

深入讲解性能优化，包括索引、连接池、缓存、批量操作等。

### 4. Edge Computing

专门讲解 Cloudflare Workers、Deno Deploy 等边缘运行时，这是 Drizzle 的独特优势。

### 5. 类型安全

展示 Drizzle + tRPC + TypeScript 的端到端类型安全。

### 6. 生产级实践

包含迁移、监控、错误处理、日志等生产环境必需的知识。

---

## 配套资源

### 代码仓库

```
github.com/yourname/drizzle-orm-examples
├── 01-introduction/
├── 02-schema-modeling/
├── 03-crud-queries/
├── 04-relations-joins/
├── 05-transactions-migrations/
├── 06-trpc-integration/
├── 07-framework-integration/
├── 08-edge-computing/
├── 09-performance-optimization/
└── 10-project-global-blog/
```

### 在线演示

- 每篇示例的在线演示（Vercel + Cloudflare Workers）
- 实时运行的代码示例

### 练习题

- 每篇文章末尾提供练习题
- 难度分级：⭐ 简单 | ⭐⭐ 中等 | ⭐⭐⭐ 困难

---

## SEO 优化

### 关键词

- Drizzle ORM
- TypeScript ORM
- Edge Computing
- Cloudflare Workers
- D1 Database
- 类型安全
- 数据库性能优化
- tRPC 集成

### 文章元信息

```yaml
title: "Drizzle ORM 实战系列"
description: "深入学习 Drizzle ORM，掌握类型安全、高性能的数据库访问，构建 Edge Computing 应用"
tags:
  [
    "Drizzle ORM",
    "TypeScript",
    "PostgreSQL",
    "Edge Computing",
    "Cloudflare Workers",
  ]
category: "drizzle"
series: "Drizzle ORM 类型安全的数据库访问实战"
```

---

## 与现有系列的协同

### 衔接 Prisma 系列

如果你已经学习过 Prisma，本系列将帮助你：

- 理解不同 ORM 的权衡
- 在 Edge 环境中使用 Drizzle
- 将 Prisma 项目迁移到 Drizzle

### 衔接 tRPC 系列

- Drizzle + tRPC 是完美组合
- 实现真正的端到端类型安全
- 本系列第6篇专门讲解集成

### 衔接 Next.js 系列

- Server Components 中的 Drizzle
- Server Actions 集成
- 数据获取模式

---

## 预期成果

完成本系列学习后，你将：

1. **技术能力**
   - 掌握 Drizzle ORM 全部核心功能
   - 能够独立设计和优化数据库 Schema
   - 能够在 Edge Computing 环境部署应用

2. **实战经验**
   - 完成 10+ 个实战示例
   - 构建 1 个完整的全球分布式系统
   - 掌握性能优化技巧

3. **职业发展**
   - 拥有 Edge Computing 开发能力
   - 理解现代 ORM 设计理念
   - 能够选择最适合项目的 ORM

---

## 总结

Drizzle ORM 是未来 TypeScript 全栈开发的重要方向。它结合了：

- 🚀 **性能**：比 Prisma 快 10x+
- 📦 **体积**：比 Prisma 小 40x
- ⚡ **Edge**：完美支持 Cloudflare Workers
- 🔒 **类型**：100% TypeScript 类型安全

本系列将帮助你从零到一掌握 Drizzle ORM，构建生产级的应用！

**准备好开始了吗？让我们从第1篇开始！🚀**
