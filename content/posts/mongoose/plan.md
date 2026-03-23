# Mongoose 渐进式学习计划

## 背景

本计划旨在通过一系列结构化的博客文章,帮助有 Node.js 基础的开发者系统地掌握 Mongoose ODM。文章采用渐进式设计,从快速入门到生产级应用,每篇文章都包含丰富的代码示例和实战演练。

**为什么选择 Mongoose?**

- 🔥 **Node.js + MongoDB 黄金组合**: 最流行的 NoSQL ODM
- 🎯 **Schema 验证**: 为 MongoDB 提供数据结构和验证
- 📊 **类型安全**: 支持 TypeScript,开发体验优秀
- 🚀 **中间件系统**: Hooks 机制实现业务逻辑
- 🔌 **丰富功能**: 虚拟字段、实例方法、静态方法、插件
- 🛠️ **查询构建**: 链式查询 API,易于使用
- 📈 **生产验证**: 被无数企业级项目广泛使用

---

## 核心技术栈

**数据库与 ODM**:

- **MongoDB** 7.x (最新稳定版)
- **Mongoose** 8.x (最新稳定版)
- **TypeScript** 5.x

**运行时与框架**:

- **Node.js** 20+ LTS
- **Express.js** / **Fastify** / **Hono**
- **Zod** (运行时验证)

**开发工具**:

- **MongoDB Compass** / **Atlas** (数据库管理)
- **ts-node** / **tsx** (TypeScript 执行)
- **Jest** / **Vitest** (测试)

**部署平台**:

- **MongoDB Atlas** (云数据库)
- **Docker** (本地开发)

---

## 博客目录结构

```
content/posts/mongoose/
├── plan.md                          # 本计划文件
├── 01-getting-started.mdx           # 快速入门与环境搭建
├── 02-schema-models.mdx             # Schema 与 Model 详解
├── 03-crud-basics.mdx               # 基础 CRUD 操作
├── 04-query-building.mdx            # 查询构建器与筛选
├── 05-relationships.mdx              # 关系设计与建模
├── 06-advanced-query.mdx             # 高级查询与聚合
├── 07-middleware-hooks.mdx           # 中间件与 Hooks 机制
├── 08-validation-plugins.mdx        # 数据验证与插件
├── 09-performance.mdx                # 性能优化与索引
├── 10-transactions.mdx               # 事务与并发控制
├── 11-testing.mdx                    # 测试策略与实践
├── 12-production-deployment.mdx      # 生产部署与最佳实践
└── README.mdx                        # 系列索引
```

---

## 第一阶段:快速入门(3篇)

### 01. 快速入门与环境搭建

**目标**: 快速搭建开发环境,理解 Mongoose 核心概念

**内容要点**:

- MongoDB vs 关系型数据库对比
- 为什么需要 Mongoose (优势与局限)
- 环境搭建 (Docker / Atlas / 本地安装)
- 连接 MongoDB (URI 配置、连接选项)
- 第一个 Schema 与 Model
- 基础增删改查操作
- 项目结构最佳实践

**实战示例**:

```typescript
// 连接数据库
import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/cms");

// 定义 Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// 创建 Model
const User = mongoose.model("User", userSchema);

// 创建文档
const user = await User.create({ name: "张三", email: "zhang@example.com" });
```

**实战项目**: CMS 内容管理系统项目初始化

---

### 02. Schema 与 Model 详解

**目标**: 掌握 Schema 定义和 Model 使用

**内容要点**:

- Schema 类型系统 (String, Number, Boolean, Date, Buffer, ObjectId, Array)
- Schema 选项 (required, default, unique, index, sparse)
- 嵌套 Schema 与子文档
- Schema 方法 (实例方法、静态方法、查询辅助方法)
- 虚拟字段 (Virtuals)
- Model vs Document 的区别
- TypeScript 类型定义

**实战示例**:

```typescript
// 文章 Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [{ type: String, lowercase: true }],
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  views: { type: Number, default: 0 },
  metadata: {
    seoTitle: String,
    seoDescription: String,
  },
});

// 虚拟字段
postSchema.virtual("excerpt").get(function () {
  return this.content.substring(0, 150) + "...";
});

// 实例方法
postSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

// 静态方法
postSchema.statics.findPublished = function () {
  return this.find({ status: "published" });
};
```

---

### 03. 基础 CRUD 操作

**目标**: 熟练掌握 Mongoose 的 CRUD 操作

**内容要点**:

- Create (save, create, insertMany)
- Read (find, findOne, findById, findByIdAndUpdate)
- Update (updateOne, updateMany, findOneAndUpdate, findByIdAndUpdate)
- Delete (deleteOne, deleteMany, findOneAndDelete)
- 查询结果处理 (lean, select, sort, limit, skip)
- 文档验证时机
- 批量操作优化

**实战示例**:

```typescript
// 创建
const post = await Post.create({
  title: "Mongoose 入门",
  content: "详细内容...",
  author: userId,
});

// 读取 - 分页查询
const posts = await Post.find({ status: "published" })
  .select("title author views")
  .sort({ createdAt: -1 })
  .skip(0)
  .limit(10)
  .populate("author", "name email")
  .lean();

// 更新
const updated = await Post.findByIdAndUpdate(
  postId,
  { $inc: { views: 1 } },
  { new: true, runValidators: true }
);

// 删除 - 软删除
await Post.findByIdAndUpdate(postId, { deletedAt: new Date() });
```

**实战项目**: CMS 文章管理 CRUD 实现

---

## 第二阶段:关系设计与查询(3篇)

### 04. 查询构建器与筛选

**目标**: 掌握 Mongoose 强大的查询 API

**内容要点**:

- 查询构建器链式调用
- 比较运算符 ($eq, $ne, $gt, $gte, $lt, $lte, $in, $nin)
- 逻辑运算符 ($and, $or, $not, $nor)
- 元素运算符 ($exists, $type)
- 数组查询 ($all, $size, $elemMatch)
- 正则表达式查询
- 文本搜索 (Text Search)
- 查询条件组合

**实战示例**:

```typescript
// 复杂查询示例
const posts = await Post.find({
  status: "published",
  createdAt: { $gte: startDate, $lte: endDate },
  tags: { $in: ["mongodb", "nodejs"] },
  views: { $gte: 100 },
})
  .or([{ author: userId }, { collaborators: userId }])
  .and([{ deletedAt: { $exists: false } }])
  .select("title content author")
  .sort({ views: -1, createdAt: -1 })
  .limit(20);

// 文本搜索
await Post.find(
  { $text: { $search: "mongoose tutorial" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
```

---

### 05. 关系设计与建模

**目标**: 理解 NoSQL 数据建模最佳实践

**内容要点**:

- 嵌入式 vs 引用式设计
- 一对一关系 (1:1)
- 一对多关系 (1:N)
- 多对多关系 (N:M)
- Populate 详解 (单层、多层、条件)
- 反向关系设计
- 混合建模策略
- 何时选择嵌入/引用

**实战示例**:

```typescript
// 用户 Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  profile: {
    // 一对一 - 嵌入
    bio: String,
    avatar: String,
    social: {
      twitter: String,
      github: String,
    },
  },
});

// 文章 Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 一对多 - 引用
  comments: [
    {
      // 一对多 - 嵌入(少量评论)
      content: String,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

// 标签 Schema (多对多)
const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

// Populate 使用
const post = await Post.findById(postId)
  .populate("author", "name email avatar")
  .populate("comments.author", "name avatar");

// 动态 Populate
await Post.find().populate({
  path: "author",
  select: "name email",
  match: { status: "active" },
});
```

**实战项目**: CMS 用户、文章、评论、标签关系设计

---

### 06. 高级查询与聚合

**目标**: 掌握复杂查询和聚合管道

**内容要点**:

- Aggregation Pipeline 基础
- 常用 Stage ($match, $project, $lookup, $unwind, $group, $sort, $limit, $skip)
- $lookup 实现关联查询
- $facet 多 facet 聚合
- $addFields 计算字段
- 数据分组与统计
- 图搜索 ($graphLookup)
- 聚合优化技巧

**实战示例**:

```typescript
// 文章统计聚合
const stats = await Post.aggregate([
  { $match: { status: "published", deletedAt: { $exists: false } } },
  { $unwind: "$tags" },
  {
    $group: {
      _id: "$tags",
      count: { $sum: 1 },
      totalViews: { $sum: "$views" },
      avgViews: { $avg: "$views" },
      latestPost: { $last: "$createdAt" },
    },
  },
  { $sort: { count: -1 } },
  { $limit: 20 },
]);

// 作者文章统计 (使用 $lookup)
const authorStats = await Post.aggregate([
  { $match: { status: "published" } },
  {
    $lookup: {
      from: "users",
      localField: "author",
      foreignField: "_id",
      as: "authorInfo",
    },
  },
  { $unwind: "$authorInfo" },
  {
    $group: {
      _id: "$author",
      authorName: { $first: "$authorInfo.name" },
      postCount: { $sum: 1 },
      totalViews: { $sum: "$views" },
      avgViews: { $avg: "$views" },
    },
  },
  { $sort: { postCount: -1 } },
]);

// 复杂聚合: 文章排行榜 + 分页 + 统计
const result = await Post.aggregate([
  { $match: { status: "published" } },
  {
    $facet: {
      posts: [
        { $sort: { views: -1 } },
        { $skip: 0 },
        { $limit: 20 },
        { $project: { title: 1, views: 1, author: 1 } },
      ],
      stats: [
        {
          $group: {
            _id: null,
            totalPosts: { $sum: 1 },
            totalViews: { $sum: "$views" },
            avgViews: { $avg: "$views" },
          },
        },
      ],
    },
  },
]);
```

**实战项目**: CMS 数据统计面板实现

---

## 第三阶段:进阶特性(4篇)

### 07. 中间件与 Hooks 机制

**目标**: 掌握 Mongoose 中间件系统

**内容要点**:

- 中间件类型 (pre、post)
- Document 中间件 (save, validate)
- Query 中间件 (find, findOne, updateOne, deleteOne 等)
- Model 中间件
- 中间件执行顺序
- 异步中间件处理
- 错误处理
- 使用场景 (密码加密、自动更新时间、软删除、日志记录)

**实战示例**:

```typescript
// pre save 钩子 - 密码加密
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// pre save 钩子 - 自动更新 updatedAt
postSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// post save 钩子 - 发送通知
postSchema.post("save", async function (doc) {
  if (doc.status === "published") {
    await Notification.create({
      type: "post_published",
      postId: doc._id,
      authorId: doc.author,
    });
  }
});

// query 中间件 - 软删除过滤
postSchema.pre(/^find/, function (next) {
  this.where({ deletedAt: { $exists: false } });
  next();
});

// pre remove 钩子 - 级联删除
userSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await Post.deleteMany({ author: this._id });
    await Comment.deleteMany({ author: this._id });
  }
);
```

**实战项目**: CMS 自动时间戳、软删除、日志记录

---

### 08. 数据验证与插件

**目标**: 实现健壮的数据验证和可复用插件

**内容要点**:

- 内置验证器 (required, min, max, enum, match, minlength, maxlength)
- 自定义验证器
- 异步验证器
- 验证错误处理
- Schema 插件开发
- 常用插件 (mongoose-autopopulate, mongoose-timestamp, mongoose-unique-validator)
- 插件最佳实践

**实战示例**:

```typescript
// 自定义验证器
userSchema.path("email").validate(function (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}, "无效的邮箱格式");

// 异步验证器
userSchema.path("email").validate(async function (email) {
  const user = await this.constructor.findOne({ email });
  return !user || this._id.equals(user._id);
}, "邮箱已被使用");

// 自定义插件: 软删除
function softDeletePlugin(schema) {
  schema.add({ deletedAt: Date });

  schema.methods.softDelete = function () {
    this.deletedAt = new Date();
    return this.save();
  };

  schema.pre(/^find/, function () {
    this.where({ deletedAt: { $exists: false } });
  });
}

// 自定义插件: 自动填充
function autoPopulatePlugin(schema) {
  const paths = [];
  schema.eachPath((path) => {
    if (schema.path(path).instance === "ObjectID") {
      paths.push(path);
    }
  });

  schema.pre(/^find/, function () {
    paths.forEach((path) => this.populate(path));
  });
}

// 使用插件
postSchema.plugin(softDeletePlugin);
userSchema.plugin(autoPopulatePlugin);
```

---

### 09. 性能优化与索引

**目标**: 提升 Mongoose 查询性能

**内容要点**:

- 索引基础 (单字段、复合、多键、文本、地理空间)
- 索引策略与最佳实践
- ESR 规则 (Equality, Sort, Range)
- 查询计划分析 (explain)
- 慢查询优化
- Projection 优化
- 使用 lean() 提升性能
- 连接池配置
- 批量操作优化
- 内存管理

**实战示例**:

```typescript
// Schema 索引定义
postSchema.index({ author: 1, createdAt: -1 }); // 复合索引
postSchema.index({ title: "text", content: "text" }); // 文本索引
postSchema.index({ tags: 1 }); // 单字段索引
postSchema.index({ "metadata.location": "2dsphere" }); // 地理空间索引

// 查询优化
const posts = await Post.find({ status: "published", author: userId })
  .select("title content views") // 只查询需要的字段
  .lean() // 返回普通 JS 对象
  .maxTimeMS(5000) // 设置超时
  .hint({ author: 1, createdAt: -1 }); // 强制使用索引

// 批量插入优化
const bulkOps = posts.map((post) => ({
  updateOne: {
    filter: { _id: post._id },
    update: { $set: post },
    upsert: true,
  },
}));
await Post.bulkWrite(bulkOps, { ordered: false });

// 连接池优化
mongoose.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 5,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
});

// 分析查询性能
const explanation = await Post.find({ author: userId }).explain();
console.log(explanation.queryPlanner.winningPlan);
```

**实战项目**: CMS 性能优化实战

---

### 10. 事务与并发控制

**目标**: 掌握 MongoDB 事务处理

**内容要点**:

- 事务基础 (ACID、副本集)
- 事务会话 (Session)
- 事务操作 (startSession、withTransaction)
- 错误处理与重试
- 并发控制 (乐观锁、悲观锁)
- 分布式事务
- 事务最佳实践

**实战示例**:

```typescript
// 简单事务
const session = await mongoose.startSession();
session.startTransaction();

try {
  const user = await User.findById(userId).session(session);
  user.balance -= amount;
  await user.save({ session });

  const transaction = await Transaction.create(
    [
      {
        user: userId,
        amount,
        type: "debit",
      },
    ],
    { session }
  );

  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}

// 使用 withTransaction (自动重试)
const session = await mongoose.startSession();
try {
  await session.withTransaction(async () => {
    const post = await Post.findById(postId).session(session);
    post.status = "published";
    await post.save({ session });

    await Notification.create(
      [
        {
          postId,
          type: "post_published",
        },
      ],
      { session }
    );
  });
} finally {
  session.endSession();
}

// 乐观锁
const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  version: { type: Number, default: 0 },
});

productSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.increment();
  }
  next();
});

// 并发安全更新
const product = await Product.findById(productId);
product.stock -= quantity;
await product.save(); // version 不匹配会报错
```

**实战项目**: CMS 订单/支付系统实现

---

## 第四阶段:生产实践(2篇)

### 11. 测试策略与实践

**目标**: 编写可靠的 Mongoose 测试

**内容要点**:

- 测试环境搭建 (内存数据库)
- 单元测试 (Model、Schema 验证)
- 集成测试 (CRUD 操作)
- 测试数据管理 (Fixture、Seed)
- Mock 与 Stub
- 测试最佳实践
- 测试覆盖率

**实战示例**:

```typescript
// 使用 mongodb-memory-server
import { MongoMemoryServer } from "mongodb-memory-server";

describe("User Model", () => {
  let mongod;
  let conn;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    conn = await mongoose.createConnection(uri);
  });

  afterAll(async () => {
    await conn.close();
    await mongod.stop();
  });

  it("should create user with valid data", async () => {
    const User = conn.model("User", userSchema);
    const user = await User.create({
      name: "张三",
      email: "zhang@example.com",
    });

    expect(user.email).toBe("zhang@example.com");
  });

  it("should fail validation for invalid email", async () => {
    const User = conn.model("User", userSchema);
    await expect(
      User.create({ name: "张三", email: "invalid" })
    ).rejects.toThrow();
  });
});
```

---

### 12. 生产部署与最佳实践

**目标**: 生产环境部署和监控

**内容要点**:

- MongoDB Atlas 云部署
- Docker 本地开发环境
- 连接字符串安全
- 环境变量管理
- 日志策略
- 监控与告警 (MongoDB Atlas、App Insights)
- 备份与恢复
- 安全最佳实践
- 常见问题与解决方案

**实战示例**:

```typescript
// 生产环境连接配置
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
  heartbeatFrequencyMS: 10000,
  retryWrites: true,
  retryReads: true
};

await mongoose.connect(process.env.MONGODB_URI, options);

// 连接事件监听
mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

// 优雅关闭
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('MongoDB connection closed');
  process.exit(0);
});

// Docker Compose 配置
services:
  mongodb:
    image: mongo:7
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
```

---

## 实战项目: CMS 内容管理系统

整个系列围绕一个**内容管理系统 (CMS)** 展开,涵盖以下功能模块:

**核心功能**:

- ✅ 用户管理 (注册、登录、资料、权限)
- ✅ 文章管理 (CRUD、草稿、发布、归档)
- ✅ 评论系统 (嵌套评论、点赞)
- ✅ 标签分类 (多对多关系)
- ✅ 媒体管理 (图片上传、存储)
- ✅ 搜索功能 (文本搜索、聚合)
- ✅ 统计面板 (文章统计、作者排行)
- ✅ 通知系统 (邮件、站内信)

**技术亮点**:

- 软删除机制
- 自动时间戳
- 查询优化与索引
- 事务处理
- 中间件业务逻辑
- 数据验证
- 测试覆盖
- 生产部署

---

## 学习路径图

```

┌─────────────────────────────────────────────────────────────┐
│          Mongoose 渐进式学习路径                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  第一阶段:快速入门                                             │
│  ┌──────────────────┐ ┌──────────────────┐                  │
│  │ 01. 快速入门     │ ───► │ 02. Schema/Model│                 │
│  └──────────────────┘      └──────────────────┘                  │
│          │                        │                             │
│          ▼                        ▼                             │
│  ┌──────────────────────────────────────────────────┐          │
│  │              03. 基础 CRUD 操作                   │          │
│  └──────────────────────────────────────────────────┘          │
│                                                              │
│  第二阶段:关系设计与查询                                        │
│  ┌──────────────────┐ ┌──────────────────┐                  │
│  │ 04. 查询构建器    │ ───► │ 05. 关系设计    │                  │
│  └──────────────────┘      └──────────────────┘                  │
│          │                        │                             │
│          ▼                        ▼                             │
│  ┌──────────────────────────────────────────────────┐          │
│  │              06. 高级查询与聚合                    │          │
│  └──────────────────────────────────────────────────┘          │
│                                                              │
│  第三阶段:进阶特性                                              │
│  ┌──────────────────┐ ┌──────────────────┐                  │
│  │ 07. 中间件/Hooks  │ ───► │ 08. 验证/插件   │                  │
│  └──────────────────┘      └──────────────────┘                  │
│          │                        │                             │
│          ▼                        ▼                             │
│  ┌──────────────────┐ ┌──────────────────┐                  │
│  │ 09. 性能优化     │ ───► │ 10. 事务/并发   │                  │
│  └──────────────────┘      └──────────────────┘                  │
│                                                              │
│  第四阶段:生产实践                                              │
│  ┌──────────────────┐ ┌──────────────────┐                  │
│  │ 11. 测试策略     │ ───► │ 12. 生产部署    │                  │
│  └──────────────────┘      └──────────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

```

---

## 预期效果

完成本系列学习后,读者将能够:

1. ✅ 独立搭建 MongoDB + Mongoose 开发环境
2. ✅ 设计符合 NoSQL 特点的数据模型
3. ✅ 熟练使用 Mongoose 进行复杂查询
4. ✅ 实现完整的 CRUD 和关系查询
5. ✅ 掌握中间件、插件等高级特性
6. ✅ 优化查询性能和索引设计
7. ✅ 处理事务和并发控制
8. ✅ 编写可维护的测试代码
9. ✅ 部署到生产环境并监控
10. ✅ 具备企业级 MongoDB 应用开发能力

---

## 版本信息

- **MongoDB**: 7.x (LTS)
- **Mongoose**: 8.x (最新稳定版)
- **Node.js**: 20.x LTS
- **TypeScript**: 5.x
- **Jest**: 29.x
- **mongodb-memory-server**: 9.x

---

## 写作规范

### 每篇文章结构

```markdown
---
title: "序号 文章标题"
date: "YYYY-MM-DD"
summary: "一句话总结(100字以内)"
tags: ["Mongoose", "相关标签"]
category: "mongoose"
draft: false
series: "Mongoose 渐进式学习"
seriesOrder: N
---

## 前言/背景

解释为什么需要学习这个主题,它解决了什么问题

## 核心概念

用通俗易懂的语言解释核心概念,配合图示

## 实战演练

### 示例 1:标题

\`\`\`typescript
// 完整可运行的代码
\`\`\`

**代码解释**:详细说明

## 最佳实践

总结 3-5 个关键要点

## 常见问题

Q&A 格式

## 总结

用 3-5 个要点回顾本文核心内容

## 下一步

---

- **上一篇**:[文章标题](../链接)
- **下一篇**:[文章标题](../链接)
```

### 代码示例要求

1. ✅ **完整性**:每个示例都是可独立运行的代码
2. ✅ **渐进式**:从简单到复杂,逐步深入
3. ✅ **注释**:关键代码添加中文注释
4. ✅ **错误处理**:展示正确的错误处理方式
5. ✅ **TypeScript**:充分利用类型系统

---

_计划创建日期:2026-03-23_
_预计完成时间:2-3个月(每周 1 篇)_
