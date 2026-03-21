# Prisma 渐进式学习计划

## 背景

本计划旨在通过一系列结构化的博客文章，帮助读者从零开始掌握 Prisma 现代化 ORM。文章采用渐进式设计，从基础概念到生产级应用，每篇文章都包含丰富的代码示例和实战演练。

**为什么选择 Prisma？**

- 🔥 **TypeScript 原生**：自动生成类型，开发体验极佳
- 🎯 **类型安全**：端到端类型安全，减少运行时错误
- 📊 **直观的 Schema**：声明式数据模型，易于理解
- 🚀 **性能优异**：查询优化、连接池、批量操作
- 🔌 **数据库兼容**：支持 PostgreSQL、MySQL、SQLite、SQL Server、MongoDB
- 🛠️ **强大工具链**：Migration、Studio、Seed 等
- 📈 **生产就绪**：被 Vercel、GitHub 等大厂广泛使用

---

## 核心技术栈

**ORM 与数据库**：

- **Prisma** 5.x（最新稳定版）
- **TypeScript** 5.x
- **数据库**：PostgreSQL 16 / MySQL 8 / SQLite / MongoDB

**运行时与框架**：

- **Node.js** 20+ / Deno / Bun
- **框架集成**：Next.js / Hono / Express / Fastify

**开发工具**：

- **Prisma Studio**：可视化数据库管理
- **Prisma CLI**：迁移、生成、种子数据
- **测试**：Vitest / Jest

**部署平台**：

- **Vercel**（推荐）
- **Supabase** / **PlanetScale** / **Neon** / **Turso**

---

## 博客目录结构

```
content/posts/prisma/
├── plan.md                          # 本计划文件
├── 01-getting-started.mdx           # 环境搭建与第一个 Prisma 项目
├── 02-schema-basics.mdx             # Prisma Schema 详解
├── 03-relations-design.mdx          # 数据模型与关系设计
├── 04-crud-operations.mdx           # 基础 CRUD 操作
├── 05-advanced-queries.mdx          # 高级查询与筛选
├── 06-relations-loading.mdx         # 关系查询与数据加载
├── 07-migrations.mdx                # 数据迁移与版本管理
├── 08-transactions.mdx              # 事务与并发控制
├── 09-validation-types.mdx          # 数据验证与类型安全
├── 10-middleware.mdx                # Prisma Middleware 使用
├── 11-performance.mdx               # 性能优化技巧
├── 12-multi-database.mdx            # 多数据库支持与部署
├── 13-testing.mdx                   # 测试策略
├── 14-nextjs-integration.mdx        # 与 Next.js 集成
├── 15-hono-integration.mdx          # 与 Hono 集成
├── 16-troubleshooting.mdx           # 常见问题与调试
├── 17-real-world-project.mdx        # 完整实战项目
└── README.mdx                        # 系列索引
```

---

## 第一阶段：快速入门（2-3篇）

### 01. 环境搭建与第一个 Prisma 项目

**目标**：了解 Prisma 特点，搭建开发环境，创建第一个项目

**内容要点**：

- Prisma 是什么（与 Drizzle、TypeORM、Sequelize 对比）
- 为什么选择 Prisma（类型安全、开发体验、性能）
- Prisma 三大核心：Prisma Client、Prisma Schema、Prisma Migrate
- 支持 JavaScript 运行时：Node.js、Deno、Bun、Edge
- 使用 npm/pnpm/bun 创建项目
- 项目结构详解
- 第一个应用：Todo List
- Prisma Studio 可视化管理
- 数据库连接配置

**实战示例**：

```typescript
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  id        String   @id @default(uuid())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// script.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 创建 Todo
  const todo = await prisma.todo.create({
    data: {
      title: '学习 Prisma',
    },
  })

  console.log('创建成功:', todo)

  // 查询所有 Todos
  const todos = await prisma.todo.findMany()
  console.log('所有 Todos:', todos)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

### 02. Prisma Schema 详解

**目标**：掌握 Prisma Schema 的核心概念和语法

**内容要点**：

- Schema 文件结构
- Model 定义
- Field 类型（String、Int、Boolean、DateTime、Json 等）
- ID 与默认值
- 必填与可选字段
- 唯一约束
- 索引定义
- 枚举类型
- 时间戳自动管理
- 属性（@id、@default、@unique、@relation）
- 数据源配置
- 生成器配置

**实战示例**：

```prisma
// schema.prisma

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [pg_trgm(prefix: "")]
}

// 枚举类型
enum UserRole {
  USER
  ADMIN
  MODERATOR
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

// 用户模型
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  password  String
  role      UserRole @default(USER)
  avatar    String?
  bio       String?

  // 时间戳
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime? // 软删除

  // 关系
  posts     Post[]
  comments  Comment[]
  likes     Like[]

  // 索引
  @@index([email])
  @@index([createdAt])
  @@map("users")
}

// 文章模型
model Post {
  id        String      @id @default(uuid())
  title     String
  slug      String      @unique
  content   String      @db.Text
  excerpt   String?
  cover     String?
  status    PostStatus  @default(DRAFT)

  // 关系
  authorId  String
  author    User        @relation(fields: [authorId], references: [id], onDelete: Cascade)
  comments  Comment[]
  likes     Like[]
  tags      PostTag[]

  // 时间戳
  publishedAt DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  // 索引
  @@index([authorId])
  @@index([status])
  @@index([publishedAt])
  @@map("posts")
}

// 评论模型
model Comment {
  id        String   @id @default(uuid())
  content   String

  // 关系
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)

  // 时间戳
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([postId])
  @@index([authorId])
  @@map("comments")
}
```

---

## 第二阶段：核心功能（3-4篇）

### 03. 数据模型与关系设计

**目标**：掌握数据库关系设计和建模

**内容要点**：

- 一对一关系（One-to-One）
- 一对多关系（One-to-Many）
- 多对多关系（Many-to-Many）
- 关系字段定义
- 外键约束
- 级联删除与更新
- 自引用关系
- 关系命名约定
- 隐式与显式关系
- 关系设计最佳实践

**实战示例**：

```prisma
// 一对一：用户与个人资料
model User {
  id       String      @id @default(uuid())
  profile  Profile?
}

model Profile {
  id     String @id @default(uuid())
  userId String @unique
  user   User   @relation(fields: [userId], references: [id])
}

// 一对多：作者与文章
model Author {
  id    String @id @default(uuid())
  name  String
  posts Post[]
}

model Post {
  id        String  @id @default(uuid())
  title     String
  authorId  String
  author    Author  @relation(fields: [authorId], references: [id])
}

// 多对多：文章与标签（隐式）
model Post {
  id    String   @id @default(uuid())
  title String
  tags  Tag[]
}

model Tag {
  id    String  @id @default(uuid())
  name  String  @unique
  posts Post[]
}

// 多对多：文章与分类（显式，带额外字段）
model Post {
  id          String          @id @default(uuid())
  title       String
  categories  PostCategory[]
}

model Category {
  id    String          @id @default(uuid())
  name  String          @unique
  posts PostCategory[]
}

model PostCategory {
  postId     String
  categoryId String
  order      Int // 额外字段：排序

  post     Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([postId, categoryId])
}

// 自引用：评论的嵌套回复
model Comment {
  id         String   @id @default(uuid())
  content    String
  parentId   String?
  parent     Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  replies    Comment[] @relation("CommentReplies")
}

// 多态关系：图片可以被多种模型引用
model Image {
  id         String   @id @default(uuid())
  url        String
  imageableId String
  imageableType String // "Post" | "User" | "Comment"
}
```

---

### 04. 基础 CRUD 操作

**目标**：熟练掌握数据的基本操作

**内容要点**：

- Create：创建数据
  - create
  - createMany
- Read：读取数据
  - findUnique
  - findFirst
  - findMany
  - findFirstOrThrow
  - findUniqueOrThrow
- Update：更新数据
  - update
  - updateMany
  - upsert
- Delete：删除数据
  - delete
  - deleteMany
- 数据选择与排除
- 批量操作
- 计数查询

**实战示例**：

```typescript
// 创建单条记录
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    username: "john",
    password: "hashed_password",
    role: "USER",
  },
});

// 创建带关系
const post = await prisma.post.create({
  data: {
    title: "我的第一篇文章",
    slug: "my-first-post",
    content: "文章内容...",
    status: "PUBLISHED",
    author: {
      connect: { id: userId },
    },
    tags: {
      create: [{ name: "JavaScript" }, { name: "Prisma" }],
    },
  },
});

// 批量创建
await prisma.post.createMany({
  data: [
    { title: "文章 1", slug: "post-1", content: "...", authorId: userId },
    { title: "文章 2", slug: "post-2", content: "...", authorId: userId },
  ],
  skipDuplicates: true,
});

// 查询唯一
const user = await prisma.user.findUnique({
  where: { id: userId },
});

// 查询第一条
const post = await prisma.post.findFirst({
  where: { status: "PUBLISHED" },
  orderBy: { createdAt: "desc" },
});

// 查询多条
const posts = await prisma.post.findMany({
  where: {
    status: "PUBLISHED",
    author: {
      email: "author@example.com",
    },
  },
  orderBy: { createdAt: "desc" },
  take: 10,
  skip: 0,
});

// 选择字段
const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    slug: true,
    author: {
      select: {
        id: true,
        username: true,
      },
    },
  },
});

// 排除字段
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    password: false, // 排除敏感字段
  },
});

// 更新单条
const post = await prisma.post.update({
  where: { id: postId },
  data: {
    title: "新标题",
    updatedAt: new Date(),
  },
});

// 更新关系
const post = await prisma.post.update({
  where: { id: postId },
  data: {
    tags: {
      connect: { id: tagId },
      disconnect: { id: oldTagId },
      set: [{ id: tag1Id }, { id: tag2Id }],
    },
  },
});

// 批量更新
const result = await prisma.post.updateMany({
  where: { status: "DRAFT" },
  data: { status: "ARCHIVED" },
});

// Upsert（存在则更新，不存在则创建）
const user = await prisma.user.upsert({
  where: { email: "user@example.com" },
  create: {
    email: "user@example.com",
    username: "john",
  },
  update: {
    username: "john_updated",
  },
});

// 删除单条
await prisma.post.delete({
  where: { id: postId },
});

// 批量删除
const result = await prisma.post.deleteMany({
  where: { status: "ARCHIVED" },
});

// 计数
const count = await prisma.post.count();
const publishedCount = await prisma.post.count({
  where: { status: "PUBLISHED" },
});

// 聚合查询
const stats = await prisma.post.aggregate({
  _count: { id: true },
  _avg: { views: true },
  _sum: { likes: true },
  _min: { createdAt: true },
  _max: { createdAt: true },
});
```

---

### 05. 高级查询与筛选

**目标**：掌握复杂查询和筛选技巧

**内容要点**：

- Where 筛选条件
  - 字段比较
  - 逻辑运算符（AND、OR、NOT）
  - 字符串搜索
  - 数组操作
  - 空值检查
- 排序（orderBy）
- 分页（take、skip、cursor）
- 关系筛选
- 全文搜索
- 事务性查询
- 原始 SQL

**实战示例**：

```typescript
// 字段比较
const posts = await prisma.post.findMany({
  where: {
    status: "PUBLISHED",
    publishedAt: {
      gte: new Date("2024-01-01"),
      lt: new Date("2025-01-01"),
    },
    views: {
      gt: 1000,
    },
  },
});

// 字符串搜索
const users = await prisma.user.findMany({
  where: {
    username: {
      contains: "john",
      mode: "insensitive",
    },
    email: {
      endsWith: "@example.com",
    },
  },
});

// 数组操作
const posts = await prisma.post.findMany({
  where: {
    id: {
      in: ["1", "2", "3"],
    },
    tags: {
      some: {
        name: "JavaScript",
      },
    },
  },
});

// 逻辑运算符
const posts = await prisma.post.findMany({
  where: {
    AND: [{ status: "PUBLISHED" }, { publishedAt: { lte: new Date() } }],
    OR: [
      { title: { contains: "Prisma" } },
      { content: { contains: "Prisma" } },
    ],
    NOT: {
      status: "ARCHIVED",
    },
  },
});

// 关系筛选
const posts = await prisma.post.findMany({
  where: {
    author: {
      email: "author@example.com",
      role: "ADMIN",
    },
    comments: {
      some: {
        content: { contains: "great" },
      },
    },
  },
});

// 排序
const posts = await prisma.post.findMany({
  orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
});

// 分页（偏移分页）
const posts = await prisma.post.findMany({
  skip: 20,
  take: 10,
  orderBy: { createdAt: "desc" },
});

// 游标分页（推荐）
const posts = await prisma.post.findMany({
  take: 10,
  skip: 1, // 跳过游标
  cursor: { id: lastPostId },
  orderBy: { createdAt: "desc" },
});

// 全文搜索（PostgreSQL）
const posts = await prisma.post.findMany({
  where: {
    OR: [
      { title: { search: "Prisma ORM" } },
      { content: { search: "Prisma ORM" } },
    ],
  },
});

// 原始 SQL
const result = await prisma.$queryRaw`
  SELECT * FROM posts
  WHERE status = ${"PUBLISHED"}
  ORDER BY created_at DESC
  LIMIT 10
`;

// 原始查询映射
const posts = await prisma.$queryRaw<Array<{ id: string; title: string }>>`
  SELECT id, title FROM posts
`;
```

---

### 06. 关系查询与数据加载

**目标**：掌握关系数据的加载策略

**内容要点**：

- 关系查询类型
  - 自动加载
  - 显式加载
  - 延迟加载
- Select 与 Include
- 嵌套关系
- 关系筛选与排序
- Flatten 输出
- 性能考虑（N+1 问题）
- 关系计数

**实战示例**：

```typescript
// Include：加载关系
const posts = await prisma.post.findMany({
  include: {
    author: true,
    tags: true,
    comments: {
      where: { parentId: null }, // 只查询顶级评论
      orderBy: { createdAt: "desc" },
      take: 10,
    },
  },
});

// Select：精确控制
const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    author: {
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    },
    tags: {
      select: {
        id: true,
        name: true,
      },
    },
    _count: {
      select: {
        comments: true,
        likes: true,
      },
    },
  },
});

// 嵌套关系
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    posts: {
      where: { status: "PUBLISHED" },
      include: {
        tags: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    },
  },
});

// 关系计数
const posts = await prisma.post.findMany({
  include: {
    _count: {
      select: {
        comments: true,
        likes: true,
      },
    },
  },
});

// 分离查询（避免 N+1）
const posts = await prisma.post.findMany();
const authors = await prisma.user.findMany({
  where: {
    id: {
      in: posts.map((p) => p.authorId),
    },
  },
});

// 使用 connect 建立关系
const post = await prisma.post.update({
  where: { id: postId },
  data: {
    author: {
      connect: { id: authorId },
    },
    tags: {
      connect: [{ id: tag1Id }, { id: tag2Id }],
    },
  },
});

// 使用 create 嵌套创建
const post = await prisma.post.create({
  data: {
    title: "新文章",
    author: {
      create: {
        email: "new@author.com",
        username: "newauthor",
        password: "hash",
      },
    },
    tags: {
      create: [{ name: "JavaScript" }, { name: "Tutorial" }],
    },
  },
});
```

---

## 第三阶段：进阶功能（3-4篇）

### 07. 数据迁移与版本管理

**目标**：掌握数据库迁移工作流

**内容要点**：

- Migration 工作原理
- 创建迁移
- 应用迁移
- 回滚迁移
- 迁移状态管理
- 重置数据库
- 种子数据
- 生产环境迁移
- 迁移最佳实践

**实战示例**：

```bash
# 创建迁移
npx prisma migrate dev --name init

# 应用迁移
npx prisma migrate deploy

# 查看迁移状态
npx prisma migrate status

# 重置数据库
npx prisma migrate reset

# 解析迁移（不应用）
npx prisma migrate dev --create-only --name add_user_role

# 解决迁移冲突
npx prisma migrate resolve --applied "20240101000000_init"
```

```typescript
// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // 创建管理员用户
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    create: {
      email: "admin@example.com",
      username: "admin",
      password: hashedPassword,
      role: "ADMIN",
    },
    update: {},
  });

  // 创建示例标签
  const tags = ["JavaScript", "TypeScript", "Prisma", "Next.js"];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { name: tag },
      create: { name: tag },
      update: {},
    });
  }

  console.log("种子数据已创建");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

```json
// package.json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

---

### 08. 事务与并发控制

**目标**：掌握事务处理和并发控制

**内容要点**：

- 事务基础
- 事务 API
  - $transaction -嵌套写入
- 并发问题
  - 脏读
  - 不可重复读
  - 幻读
- 乐观锁
- 悲观锁
- 隔离级别
- 事务最佳实践

**实战示例**：

```typescript
// 事务 API
const transfer = await prisma.$transaction(async (tx) => {
  // 扣除发送者余额
  const sender = await tx.user.update({
    where: { id: senderId },
    data: {
      balance: {
        decrement: amount,
      },
    },
  })

  // 检查余额
  if (sender.balance < 0) {
    throw new Error('余额不足')
  }

  // 增加接收者余额
  const receiver = await tx.user.update({
    where: { id: receiverId },
    data: {
      balance: {
        increment: amount,
      },
    },
  })

  // 创建交易记录
  const transaction = await tx.transaction.create({
    data: {
      senderId,
      receiverId,
      amount,
      status: 'COMPLETED',
    },
  })

  return transaction
})

// 批量事务
const operations = [
  prisma.user.update({
    where: { id: '1' },
    data: { balance: { decrement: 100 } },
  }),
  prisma.user.update({
    where: { id: '2' },
    data: { balance: { increment: 100 } },
  }),
]

await prisma.$transaction(operations)

// 嵌套写入（自动事务）
const userWithPosts = await prisma.user.create({
  data: {
    email: 'user@example.com',
    username: 'john',
    posts: {
      create: [
        { title: '文章 1', content: '...' },
        { title: '文章 2', content: '...' },
      ],
    },
  },
})

// 乐观锁
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  version   Int      @default(1)
  updatedAt DateTime @updatedAt
}

const post = await prisma.post.findUnique({ where: { id: 1 } })

try {
  await prisma.post.update({
    where: {
      id: 1,
      version: post.version, // 乐观锁
    },
    data: {
      title: '新标题',
      version: { increment: 1 },
    },
  })
} catch (error) {
  // 版本冲突，处理并发
}

// 设置隔离级别
await prisma.$transaction(
  async (tx) => {
    // 事务操作
  },
  {
    maxWait: 5000, // 最大等待时间
    timeout: 10000, // 超时时间
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  }
)
```

---

### 09. 数据验证与类型安全

**目标**：利用 Prisma 的类型系统

**内容要点**：

- 类型生成机制
- 类型导出与使用
- Zod 集成
- 自定义验证
- 输入验证中间件
- 类型安全查询
- 泛型类型
- 类型推断技巧

**实战示例**：

```typescript
// 导出类型
import { Prisma } from "@prisma/client";

type User = Prisma.UserDelegate;
type UserCreateInput = Prisma.UserCreateInput;
type UserWithPosts = Prisma.UserGetPayload<{
  include: { posts: true };
}>;

// 类型安全查询
async function createUser(data: UserCreateInput) {
  return await prisma.user.create({ data });
}

// Zod 集成
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(8),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

// 验证中间件
import { zValidator } from "@hono/zod-validator";

app.post("/users", zValidator("json", UserSchema), async (c) => {
  const data = c.req.valid("json");

  // data 已经是类型安全的
  const user = await prisma.user.create({ data });

  return c.json(user);
});

// 自定义验证
const usernameExists = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  return !user; // 如果不存在返回 true
};

const RegisterSchema = z.object({
  username: z
    .string()
    .refine(async (username) => await usernameExists(username), {
      message: "用户名已存在",
    }),
});

// 原始类型保护
async function getUser(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

const user = await getUser(userId);

if (user) {
  // TypeScript 知道 user 不为 null
  console.log(user.email);
}

// 类型转换
type PostWithAuthor = Prisma.PostGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        username: true;
      };
    };
  };
}>;

// 动态查询类型
function findUser<T extends Prisma.UserFindManyArgs>(
  args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
) {
  return prisma.user.findMany(args);
}

const users = await findUser({
  where: { role: "ADMIN" },
  select: { id: true, email: true },
});
```

---

### 10. Prisma Middleware 使用

**目标**：掌握中间件的开发和应用

**内容要点**：

- Middleware 原理
- 生命周期钩子
- 常见用例
  - 日志记录
  - 查询缓存
  - 软删除
  - 数据加密
  - 性能监控
- 中间件链
- 条件中间件

**实战示例**：

```typescript
// 查询日志中间件
prisma.$use(async (params, next) => {
  const before = Date.now();

  const result = await next(params);

  const after = Date.now();
  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );

  return result;
});

// 软删除中间件
prisma.$use(async (params, next) => {
  // 查询时自动过滤已删除
  if (params.action === "findMany" || params.action === "findFirst") {
    params.args.where = params.args.where || {};

    if (params.model === "User") {
      params.args.where.deletedAt = null;
    }
  }

  // 删除时改为软删除
  if (params.action === "delete") {
    params.action = "update";
    params.args.data = { deletedAt: new Date() };
  }

  return next(params);
});

// 数据加密中间件
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const ALGORITHM = "aes-256-gcm";

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

function decrypt(encrypted: string): string {
  const [ivHex, authTagHex, encryptedText] = encrypted.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

prisma.$use(async (params, next) => {
  // 加密敏感字段
  if (params.action === "create" || params.action === "update") {
    if (params.model === "User") {
      if (params.args.data.email) {
        params.args.data.email = encrypt(params.args.data.email);
      }
    }
  }

  const result = await next(params);

  // 解密查询结果
  if (
    params.action === "findUnique" ||
    params.action === "findFirst" ||
    params.action === "findMany"
  ) {
    if (params.model === "User" && result) {
      if (Array.isArray(result)) {
        result.forEach((user) => {
          if (user.email) user.email = decrypt(user.email);
        });
      } else if (result.email) {
        result.email = decrypt(result.email);
      }
    }
  }

  return result;
});

// 性能监控中间件
prisma.$use(async (params, next) => {
  const start = performance.now();

  const result = await next(params);

  const duration = performance.now() - start;

  // 记录慢查询
  if (duration > 1000) {
    console.warn(
      `Slow query detected: ${params.model}.${params.action} took ${duration}ms`
    );
  }

  // 发送到监控服务
  await logToMonitoringService({
    model: params.model,
    action: params.action,
    duration,
  });

  return result;
});

// 缓存中间件
const cache = new Map<string, any>();

prisma.$use(async (params, next) => {
  // 只缓存查询操作
  if (params.action !== "findUnique" && params.action !== "findFirst") {
    return next(params);
  }

  const cacheKey = JSON.stringify(params);

  // 检查缓存
  if (cache.has(cacheKey)) {
    console.log("Cache hit:", cacheKey);
    return cache.get(cacheKey);
  }

  const result = await next(params);

  // 写入缓存（1分钟）
  cache.set(cacheKey, result);

  setTimeout(() => {
    cache.delete(cacheKey);
  }, 60000);

  return result;
});
```

---

## 第四阶段：生产实践（3-4篇）

### 11. 性能优化技巧

**目标**：优化 Prisma 应用性能

**内容要点**：

- 查询优化
  - 选择必要字段
  - 避免 N+1
  - 使用索引
- 连接池配置
- 批量操作
- 查询延迟
- 数据库优化
  - 索引策略
  - 查询计划
  - 分区表
- 监控与分析
- 常见性能陷阱

**实战示例**：

```typescript
// 连接池配置
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
})

// DATABASE_URL
// postgresql://user:password@host:5432/db?connection_limit=10&pool_timeout=20

// 批量操作（比循环快得多）
await prisma.post.createMany({
  data: posts.map(post => ({
    title: post.title,
    content: post.content,
    authorId: post.authorId,
  })),
  skipDuplicates: true,
})

// 使用索引
// schema.prisma
model Post {
  id      String @id
  title   String
  authorId String

  @@index([authorId, createdAt]) // 复合索引
  @@index([authorId])
  @@index([status, publishedAt])
}

// 查询延迟
const lazyPosts = prisma.post.findMany({
  where: { status: 'PUBLISHED' },
})

// 在真正需要时才执行
console.log('开始查询...')
const posts = await lazyPosts

// 只查询需要的字段
const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    // 不查询 content（可能很大）
  },
})

// 使用事务减少往返
const [user, posts, comments] = await prisma.$transaction([
  prisma.user.findUnique({ where: { id: userId } }),
  prisma.post.findMany({ where: { authorId: userId } }),
  prisma.comment.findMany({ where: { authorId: userId } }),
])

// 使用原始 SQL 优化复杂查询
const result = await prisma.$queryRaw<Array<{ id: string; count: bigint }>>`
  SELECT p.id, COUNT(c.id) as comment_count
  FROM posts p
  LEFT JOIN comments c ON c.post_id = p.id
  GROUP BY p.id
  HAVING COUNT(c.id) > 10
`

// 查询计划分析
import { Prisma } from '@prisma/client'

const result = await prisma.$queryRaw`
  EXPLAIN ANALYZE SELECT * FROM posts WHERE status = 'PUBLISHED'
`
```

---

### 12. 多数据库支持与部署

**目标**：配置不同数据库和部署环境

**内容要点**：

- 支持 PostgreSQL / MySQL / SQLite / MongoDB
- 开发环境配置
- 测试环境配置
- 生产环境配置
- 环境变量管理
- 连接字符串配置
- 云数据库配置
  - Supabase
  - PlanetScale
  - Neon
  - Turso
- 数据库迁移部署

**实战示例**：

```bash
# .env.development
DATABASE_URL="postgresql://localhost:5432/mydb_dev"

# .env.test
DATABASE_URL="file:./test.db"

# .env.production
DATABASE_URL="postgresql://user:pass@host:5432/mydb_prod?sslmode=require"
```

```typescript
// Prisma 单例模式（防止连接泄漏）
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Supabase 配置
// DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

// PlanetScale 配置
// DATABASE_URL="mysql://[YOUR-USERNAME]:[YOUR-PASSWORD]@aws.connect.psdb.cloud/[YOUR-DATABASE]?sslaccept=strict"

// Neon 配置
// DATABASE_URL="postgresql://[user]:[password]@[neon-host]/[dbname]?sslmode=require"

// Turso 配置
// DATABASE_URL="file:./dev.db"
```

```bash
# 生产环境部署迁移
npx prisma migrate deploy

# 生成 Prisma Client
npx prisma generate
```

---

### 13. 测试策略

**目标**：编写可靠的测试

**内容要点**：

- 单元测试
- 集成测试
- 测试数据库配置
- 数据库重置策略
- Mock Prisma Client
- 测试工厂
- 事务回滚测试
- 测试最佳实践

**实战示例**：

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});

// tests/setup.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeEach(async () => {
  // 清理数据库
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

// tests/user.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "../src/lib/prisma";

describe("User", () => {
  it("should create a user", async () => {
    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        username: "testuser",
        password: "hashed",
      },
    });

    expect(user).toHaveProperty("id");
    expect(user.email).toBe("test@example.com");
  });

  it("should not create duplicate email", async () => {
    await prisma.user.create({
      data: {
        email: "test@example.com",
        username: "user1",
        password: "hashed",
      },
    });

    await expect(
      prisma.user.create({
        data: {
          email: "test@example.com",
          username: "user2",
          password: "hashed",
        },
      })
    ).rejects.toThrow();
  });
});

// 测试工厂
// tests/factories.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export const createUser = async (
  prisma: PrismaClient,
  data: Partial<any> = {}
) => {
  const hashedPassword = await bcrypt.hash(data.password || "password123", 10);

  return prisma.user.create({
    data: {
      email: data.email || "user@example.com",
      username: data.username || "user",
      password: hashedPassword,
      role: data.role || "USER",
    },
  });
};

export const createPost = async (
  prisma: PrismaClient,
  authorId: string,
  data: Partial<any> = {}
) => {
  return prisma.post.create({
    data: {
      title: data.title || "Test Post",
      slug: data.slug || "test-post",
      content: data.content || "Test content",
      status: data.status || "PUBLISHED",
      authorId,
    },
  });
};

// 使用工厂
it("should get user posts", async () => {
  const user = await createUser(prisma);
  await createPost(prisma, user.id);
  await createPost(prisma, user.id);

  const posts = await prisma.post.findMany({
    where: { authorId: user.id },
  });

  expect(posts).toHaveLength(2);
});

// Mock Prisma Client
// tests/__mocks__/@prisma/client.ts
import { PrismaClient } from "@prisma/client";

export const prismaMock = {
  user: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
} as unknown as PrismaClient;

// 测试中使用 Mock
vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn().mockImplementation(() => prismaMock),
}));
```

---

## 第五阶段：框架集成（2-3篇）

### 14. 与 Next.js 集成

**目标**：在 Next.js 中使用 Prisma

**内容要点**：

- App Router 集成
- Server Actions
- Route Handlers
- 客户端组件模式
- 数据获取模式
- 缓存策略
- 实时更新
- 部署配置

**实战示例**：

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// app/posts/page.tsx
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(post => (
        <article key={post.id}>
          <Link href={`/posts/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>作者: {post.author.username}</p>
        </article>
      ))}
    </div>
  )
}

// app/posts/[slug]/page.tsx
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      author: true,
      comments: {
        where: { parentId: null },
        include: {
          author: true,
          replies: {
            include: { author: true },
          },
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>作者: {post.author.username}</p>
      <div>{post.content}</div>
    </article>
  )
}

// Server Actions
// app/actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const authorId = formData.get('authorId') as string

  await prisma.post.create({
    data: {
      title,
      content,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      authorId,
    },
  })

  revalidatePath('/posts')
  redirect('/posts')
}

// app/api/posts/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.post.count(),
  ])

  return NextResponse.json({
    data: posts,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
}

export async function POST(request: Request) {
  const body = await request.json()

  const post = await prisma.post.create({
    data: body,
  })

  return NextResponse.json(post, { status: 201 })
}

// 缓存与重新验证
export const revalidate = 60 // 60 秒

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    cacheStrategy: {
      ttl: 60,
      swr: 120,
    },
  })

  // ...
}
```

---

### 15. 与 Hono 集成

**目标**：在 Hono 中使用 Prisma

**内容要点**：

- Prisma 中间件
- Context 注入
- 路由集成
- 错误处理
- 事务管理
- 边缘运行时支持

**实战示例**：

```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };

// middleware/db.ts
import { prisma } from "../lib/db";

export const dbMiddleware = async (c, next) => {
  c.set("db", prisma);
  await next();
};

// routes/posts.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "../lib/db";

const posts = new Hono();

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  authorId: z.string().uuid(),
});

// GET /posts
posts.get("/", async (c) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "10");

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    }),
    prisma.post.count(),
  ]);

  return c.json({
    data: posts,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// GET /posts/:id
posts.get("/:id", async (c) => {
  const id = c.req.param("id");

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comments: true,
    },
  });

  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json(post);
});

// POST /posts
posts.post("/", zValidator("json", createPostSchema), async (c) => {
  const data = c.req.valid("json");

  const post = await prisma.post.create({
    data: {
      ...data,
      slug: data.title.toLowerCase().replace(/\s+/g, "-"),
    },
  });

  return c.json(post, 201);
});

// 使用事务
posts.post("/transfer", async (c) => {
  const { fromId, toId, amount } = await c.req.json();

  await prisma.$transaction(async (tx) => {
    await tx.account.update({
      where: { id: fromId },
      data: { balance: { decrement: amount } },
    });

    await tx.account.update({
      where: { id: toId },
      data: { balance: { increment: amount } },
    });

    await tx.transaction.create({
      data: { fromId, toId, amount },
    });
  });

  return c.json({ message: "Transfer completed" });
});

export default posts;

// app.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { dbMiddleware } from "./middleware/db";
import posts from "./routes/posts";

const app = new Hono();

app.use("*", cors());
app.use("*", dbMiddleware);

app.route("/posts", posts);

export default app;
```

---

### 16. 常见问题与调试

**目标**：解决开发中的常见问题

**内容要点**：

- 常见错误
  - 连接问题
  - 迁移冲突
  - 类型错误
- 调试技巧
  - 查询日志
  - Prisma Studio
  - EXPLAIN
- 性能问题
  - 慢查询
  - N+1
  - 连接池耗尽
- 部署问题
  - 迁移失败
  - 环境变量
  - 数据库连接

**实战示例**：

```typescript
// 启用查询日志
const prisma = new PrismaClient({
  log: [
    { level: "query", emit: "event" },
    { level: "error", emit: "stdout" },
    { level: "warn", emit: "stdout" },
  ],
});

prisma.$on("query" as any, (e: any) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

// 使用 Prisma Studio
// npx prisma studio

// 查看迁移历史
// npx prisma migrate status

// 重置数据库（开发环境）
// npx prisma migrate reset

// 格式化 Schema
// npx prisma format

// 检查 Schema 问题
// npx prisma validate

// 调试慢查询
const posts = await prisma.post.findMany({
  where: { status: "PUBLISHED" },
});

// 查看 PostgreSQL 查询计划
const result = await prisma.$queryRaw`
  EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM posts WHERE status = 'PUBLISHED'
`;

// 连接池问题
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// 在 DATABASE_URL 中配置连接池
// postgresql://user:password@host:5432/db?connection_limit=10&pool_timeout=20

// 事务超时
await prisma.$transaction(
  async (tx) => {
    // 长时间运行的操作
  },
  {
    maxWait: 5000,
    timeout: 10000,
  }
);

// 清理连接
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
```

---

### 17. 完整实战项目

**目标**：构建一个完整的生产级应用

**项目**：博客系统 API

**功能清单**：

- ✅ 用户认证（JWT）
- ✅ 文章 CRUD
- ✅ 评论系统
- ✅ 标签分类
- ✅ 搜索功能
- ✅ 分页过滤
- ✅ 软删除
- ✅ 数据验证
- ✅ 错误处理
- ✅ 事务管理
- ✅ 测试覆盖
- ✅ 性能优化
- ✅ 部署配置

**完整项目结构**：

```
project/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── src/
│   ├── lib/
│   │   └── prisma.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── posts.ts
│   │   └── comments.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── error.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── post.service.ts
│   └── index.ts
├── tests/
│   ├── auth.test.ts
│   ├── posts.test.ts
│   └── factories.ts
├── .env.example
├── docker-compose.yml
└── package.json
```

**完整 Schema**：

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum UserRole {
  USER
  ADMIN
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  password  String
  role      UserRole @default(USER)
  avatar    String?
  bio       String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?

  posts     Post[]
  comments  Comment[]
  likes     Like[]

  @@index([email])
  @@index([createdAt])
  @@map("users")
}

model Post {
  id         String     @id @default(uuid())
  title      String
  slug       String     @unique
  content    String     @db.Text
  excerpt    String?
  cover      String?
  status     PostStatus @default(DRAFT)
  views      Int        @default(0)

  authorId   String
  author     User       @relation(fields: [authorId], references: [id], onDelete: Cascade)
  comments   Comment[]
  likes      Like[]
  tags       PostTag[]

  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  deletedAt   DateTime?

  @@index([authorId])
  @@index([status, publishedAt])
  @@index([slug])
  @@map("posts")
}

model Comment {
  id        String   @id @default(uuid())
  content   String

  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  parentId  String?
  parent    Comment? @relation("CommentReplies", fields: [parentId], references: [id])
  replies   Comment[] @relation("CommentReplies")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([postId])
  @@index([authorId])
  @@map("comments")
}

model Like {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, postId])
  @@index([postId])
  @@map("likes")
}

model Tag {
  id    String     @id @default(uuid())
  name  String     @unique
  slug  String     @unique
  posts PostTag[]

  createdAt DateTime @default(now())

  @@index([slug])
  @@map("tags")
}

model PostTag {
  postId   String
  tagId    String

  post     Post @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag      Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([postId, tagId])
  @@map("post_tags")
}
```

---

## 附录

### A. 开发工具推荐

- **IDE**：VSCode + Prisma extension
- **GUI**：Prisma Studio / TablePlus / DBeaver
- **测试**：Vitest / Jest
- **监控**：Prisma Pulse / Datadog
- **部署**：Vercel / Supabase / Railway

### B. 常见问题与解决方案

1. **迁移失败**：使用 `--create-only` 预览迁移
2. **类型错误**：运行 `prisma generate` 重新生成类型
3. **连接泄漏**：确保使用 Prisma 单例模式
4. **慢查询**：使用 EXPLAIN 分析查询计划
5. **N+1 问题**：使用 include 或 select 预加载关系

### C. 进阶主题

- Prisma Pulse（实时数据同步）
- Prisma Accelerate（数据缓存）
- Data Proxy（边缘友好）
- Pulse Webhooks
- 自定义生成器
- 分片策略
- 多租户架构

---

## 写作规范

### 每篇文章结构

````markdown
---
title: "文章标题"
date: "YYYY-MM-DD"
summary: "一句话总结（100字以内）"
tags: ["Prisma", "相关标签"]
category: "prisma"
cover: ""
draft: false
series: "Prisma 渐进式学习"
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
- 评论系统（嵌套回复）
- 标签分类（多对多）
- 点赞功能
- 搜索功能
- 分页过滤

---

## 学习路径图

```

┌─────────────────────────────────────────────────────────────┐
│ Prisma 学习路径 │
├─────────────────────────────────────────────────────────────┤
│ │
│ 第一阶段：快速入门 │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │
│ │ 01. 环境搭建 │ ───► │ 02. Schema 详解 │ ───► │ 03. 关系设计 │ │
│ └──────────────────┘ └──────────────────┘ └──────────────┘ │
│ │ │ │
│ ▼ ▼ ▼ │
│ 第二阶段：核心功能 │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │
│ │ 04. CRUD │ ───► │ 05. 高级查询 │ ───► │ 06. 关系加载 │ │
│ └──────────────────┘ └──────────────────┘ └──────────────┘ │
│ │ │ │ │
│ ▼ ▼ ▼ │
│ 第三阶段：进阶功能 │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐ │
│ │ 07. Migrations │ ───► │ 08. 事务 │ ───► │ 09. 类型安全 │ │
│ └──────────────────┘ └──────────────────┘ └──────────────┘ │
│ │ │ │ │
│ ▼ ▼ ▼ │
│ 第四阶段：生产实践 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 10. Middleware │ 11. 性能优化 │ 12. 多数据库 │ │
│ ├─────────────────────────────────────────────┤ │
│ │ 13. 测试 │ │
│ └─────────────────────────────────────────────┘ │
│ │ │
│ ▼ ▼ │
│ 第五阶段：框架集成 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 14. Next.js │ 15. Hono │ 16. 调试 │ │
│ ├─────────────────────────────────────────────┤ │
│ │ 17. 完整实战 │ │
│ └─────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘

```

---

## 预期效果

完成本系列学习后，读者将能够：

1. ✅ 独立设计数据库 Schema
2. ✅ 熟练使用 Prisma Client
3. ✅ 掌握关系查询和事务
4. ✅ 编写类型安全的数据库操作
5. ✅ 优化查询性能
6. ✅ 处理数据迁移
7. ✅ 在 Next.js/Hono 中集成 Prisma
8. ✅ 编写可靠的测试
9. ✅ 部署到生产环境
10. ✅ 构建生产级应用

---

## 版本信息

- **Prisma**：5.x
- **Node.js**：20.x LTS / Deno / Bun
- **TypeScript**：5.x
- **数据库**：PostgreSQL 16 / MySQL 8 / SQLite 3
- **测试框架**：Vitest

*计划创建日期：2026-03-21*
*预计完成时间：2-3个月（每周 1-2 篇）*
```
