# 数据库渐进式学习路线计划

## 背景

本计划旨在通过一系列结构化的博客文章，帮助开发者从零开始掌握数据库开发技能，应对日常业务开发需求。文章采用渐进式设计，从基础概念到生产级实践，每篇文章都包含丰富的实战示例。

**技术栈选择标准**：

- ✅ 市场主流、社区活跃
- ✅ 开源免费、文档完善
- ✅ 企业级应用首选
- ✅ 现代化开发体验
- ✅ 类型安全（TypeScript 友好）

**核心栈**：

- **关系型数据库**：PostgreSQL 16（功能最强大的开源数据库）
- **NoSQL 数据库**：MongoDB 7（最流行的文档数据库）
- **缓存数据库**：Redis 7（高性能键值存储）
- **搜索引擎**：Elasticsearch 8（全文检索）
- **ORM 工具**：Prisma 5.x（类型安全的现代 ORM）
- **版本控制**：PostgreSQL 版本控制 + Prisma Migrate
- **容器化**：Docker + Docker Compose
- **监控工具**：pgAdmin + MongoDB Compass + RedisInsight

---

## 博客目录结构

```
content/posts/database/
├── plan.md                               # 本计划文件
├── 01-database-fundamentals.mdx          # 数据库核心概念
├── 02-sql-basics.mdx                     # SQL 语言基础
├── 03-postgresql-getting-started.mdx     # PostgreSQL 快速入门
├── 04-table-design.mdx                   # 表设计与数据类型
├── 05-relationships-design.mdx           # 关系设计（外键、关联）
├── 06-normalization-theory.mdx           # 范式理论与反范式
├── 07-index-fundamentals.mdx             # 索引原理与类型
├── 08-query-optimization.mdx             # SQL 查询优化
├── 09-execution-plan-analysis.mdx        # 执行计划分析
├── 10-prisma-getting-started.mdx         # Prisma ORM 入门
├── 11-prisma-advanced-queries.mdx        # Prisma 高级查询
├── 12-prisma-transactions.mdx            # 事务与并发控制
├── 13-mongodb-getting-started.mdx        # MongoDB 文档数据库
├── 14-mongodb-aggregation.mdx            # MongoDB 聚合管道
├── 15-redis-data-structures.mdx          # Redis 数据结构与缓存
├── 16-elasticsearch-search-engine.mdx    # Elasticsearch 全文搜索
├── 17-database-backup-recovery.mdx       # 备份与恢复策略
├── 18-database-monitoring-tuning.mdx     # 监控、调优与分库分表
└── README.mdx                            # 系列索引
```

---

## 第一阶段：基础入门（3篇）

### 01. 数据库核心概念

**目标**：理解数据库的基本概念和分类

**内容要点**：

- 为什么需要数据库（vs 文件系统）
- 数据库发展历史（层次→网状→关系→NoSQL→NewSQL）
- 数据库分类：关系型 vs NoSQL
  - 关系型：PostgreSQL、MySQL、SQLite
  - 文档型：MongoDB、CouchDB
  - 键值型：Redis、Memcached
  - 列族型：Cassandra、HBase
  - 图数据库：Neo4j、ArangoDB
- ACID 特性详解
- CAP 定理与 BASE 理论
- 如何选择合适的数据库

**实战示例**：

```sql
-- 对比文件系统与数据库
-- 演示事务的 ACID 特性
```

**决策树**：如何为项目选择数据库

---

### 02. SQL 语言基础

**目标**：掌握 SQL 基本语法和常用操作

**内容要点**：

- SQL 简介与标准（SQL:2016）
- DDL（数据定义语言）：CREATE、ALTER、DROP
- DML（数据操作语言）：SELECT、INSERT、UPDATE、DELETE
- DQL（数据查询语言）：SELECT 高级用法
- DCL（数据控制语言）：GRANT、REVOKE
- TCL（事务控制语言）：COMMIT、ROLLBACK
- SQL 语句执行顺序
- 注释规范与命名约定

**实战示例**：

```sql
-- 创建示例数据库（电商系统）
CREATE DATABASE ecommerce;

-- 创建用户表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CRUD 操作
INSERT INTO users (email, password_hash, full_name)
VALUES ('user@example.com', 'hash', '张三');

SELECT id, email, full_name FROM users WHERE id = 1;

UPDATE users SET full_name = '李四' WHERE id = 1;

DELETE FROM users WHERE id = 1;
```

---

### 03. PostgreSQL 快速入门

**目标**：搭建 PostgreSQL 环境，掌握基本操作

**内容要点**：

- 为什么选择 PostgreSQL（vs MySQL、MariaDB）
- PostgreSQL 核心特性
  - 完整的 ACID 支持
  - 丰富的数据类型（JSON、数组、UUID）
  - 强大的扩展性（PostGIS、pgcrypto）
  - MVCC 并发控制
  - 高度标准兼容
- 安装方式（Docker、Desktop、包管理器）
- 基本操作（psql 命令、数据库管理）
- 配置文件详解（postgresql.conf、pg_hba.conf）
- 用户权限管理
- 数据库连接池（PgBouncer）

**Docker Compose 配置**：

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: postgres_dev
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev123
      POSTGRES_DB: dev_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4:latest
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

**实战示例**：

```bash
# 连接数据库
psql -h localhost -U dev -d dev_db

# 常用元命令
\l              # 列出所有数据库
\dt             # 列出当前表
\d users        # 查看表结构
\du             # 列出所有用户
\conninfo       # 显示连接信息
\q              # 退出
```

---

## 第二阶段：数据建模（3篇）

### 04. 表设计与数据类型

**目标**：掌握数据库表设计和数据类型选择

**内容要点**：

- 表设计原则
  - 命名规范（蛇形命名法、单数表名）
  - 主键设计（UUID vs 自增 ID）
  - 默认值与约束
- PostgreSQL 数据类型详解
  - 数值型：SMALLINT、INTEGER、BIGINT、NUMERIC、DECIMAL
  - 字符型：VARCHAR、CHAR、TEXT
  - 日期型：TIMESTAMP、DATE、TIME、INTERVAL
  - 布尔型：BOOLEAN
  - JSON 型：JSON、JSONB（推荐）
  - 数组型：INTEGER[]、TEXT[]
  - 特殊型：UUID、BYTEA、CIDR
- 约束类型
  - NOT NULL 非空约束
  - UNIQUE 唯一约束
  - CHECK 检查约束
  - DEFAULT 默认值
  - EXCLUDE 排除约束
- 列排序与压缩（TOAST）

**实战示例**：

```sql
-- 用户表设计
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url TEXT,
  profile JSONB,
  preferences JSONB DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- 订单表设计
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  subtotal NUMERIC(10, 2) NOT NULL,
  tax NUMERIC(10, 2) DEFAULT 0,
  discount NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT status_check CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'cancelled'))
);
```

---

### 05. 关系设计（外键、关联）

**目标**：理解表关系，设计合理的数据关联

**内容要点**：

- 表关系类型
  - 一对一（1:1）
  - 一对多（1:N）
  - 多对多（M:N）
  - 自关联
- 外键约束
  - ON DELETE 级联操作
  - ON UPDATE 级联操作
  - CASCADE、SET NULL、RESTRICT、NO ACTION
- 索引外键
- 关系查询（JOIN）
- 关系设计最佳实践

**实战示例**：

```sql
-- 一对一：用户 <-> 个人资料
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  website VARCHAR(255),
  location VARCHAR(100),
  birth_date DATE,
  gender VARCHAR(20)
);

-- 一对多：用户 <-> 订单
-- 已在上面 orders 表中定义（user_id 外键）

-- 多对多：订单 <-> 商品（通过中间表）
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  category_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10, 2) NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 自关联：评论回复
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  post_id UUID NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- JOIN 查询示例
SELECT
  o.id,
  o.order_number,
  o.total,
  u.email,
  u.full_name
FROM orders o
INNER JOIN users u ON o.user_id = u.id
WHERE o.status = 'paid';

-- LEFT JOIN（包含无订单用户）
SELECT
  u.id,
  u.email,
  COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
```

---

### 06. 范式理论与反范式

**目标**：理解数据库规范化理论，平衡规范与性能

**内容要点**：

- 范式理论
  - 第一范式（1NF）：原子性
  - 第二范式（2NF）：部分依赖
  - 第三范式（3NF）：传递依赖
  - BCNF（Boyce-Codd 范式）
- 范式优缺点
- 反范式设计
  - 何时使用反范式
  - 冗余字段设计
  - 预计算字段
  - 物化视图
- 实际应用场景
- 性能优化权衡

**实战示例**：

```sql
-- 不符合 1NF（重复组）
CREATE TABLE orders_bad (
  id UUID,
  user_id UUID,
  product_ids TEXT[],      -- 数组存储多个产品
  created_at TIMESTAMP
);

-- 符合 3NF 的设计
CREATE TABLE orders_3nf (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE,
  total NUMERIC(10, 2),
  created_at TIMESTAMP
);

-- 反范式优化（添加冗余字段）
CREATE TABLE orders_denormalized (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  user_email VARCHAR(255),           -- 冗余：避免 JOIN
  user_full_name VARCHAR(100),       -- 冗余：避免 JOIN
  order_number VARCHAR(50) UNIQUE,
  status VARCHAR(20),
  item_count INTEGER,                -- 预计算：商品数量
  total NUMERIC(10, 2),
  created_at TIMESTAMP
);

-- 物化视图（定期刷新）
CREATE MATERIALIZED VIEW user_order_stats AS
SELECT
  u.id as user_id,
  u.email,
  COUNT(o.id) as total_orders,
  COALESCE(SUM(o.total), 0) as total_spent,
  MAX(o.created_at) as last_order_at
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email;

-- 刷新物化视图
REFRESH MATERIALIZED VIEW user_order_stats;

-- 使用触发器自动维护冗余字段
CREATE OR REPLACE FUNCTION update_order_user_info()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.user_email = (SELECT email FROM users WHERE id = NEW.user_id);
    NEW.user_full_name = (SELECT full_name FROM users WHERE id = NEW.user_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_order_user_info
  BEFORE INSERT ON orders_denormalized
  FOR EACH ROW
  EXECUTE FUNCTION update_order_user_info();
```

---

## 第三阶段：查询优化（3篇）

### 07. 索引原理与类型

**目标**：理解索引原理，掌握索引设计

**内容要点**：

- 为什么需要索引
- 索引数据结构
  - B-Tree 索引（默认）
  - Hash 索引
  - GIN 索引（JSON、数组）
  - GiST 索引（地理数据）
  - BRIN 索引（大数据表）
- 索引类型
  - 单列索引
  - 复合索引
  - 唯一索引
  - 部分索引（WHERE 条件）
  - 表达式索引
- 索引设计原则
  - 选择性高的列
  - 外键列
  - 频繁查询的列
  - 索引列顺序（复合索引）
- 索引的代价
  - 写入性能影响
  - 存储空间占用
- 索引维护与重建

**实战示例**：

```sql
-- 单列索引
CREATE INDEX idx_users_email ON users(email);

-- 复合索引（注意列顺序）
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_orders_status_created ON orders(status, created_at DESC);

-- 唯一索引
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- 部分索引（仅索引活跃用户）
CREATE INDEX idx_users_active ON users(email) WHERE is_verified = TRUE;

-- 表达式索引
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
CREATE INDEX idx_orders_date ON orders(DATE(created_at));

-- GIN 索引（JSON、数组）
CREATE INDEX idx_users_profile ON users USING GIN (profile);
CREATE INDEX idx_users_tags ON users USING GIN (preferences);

-- 查看表索引
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'users';

-- 分析索引使用情况
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan as index_scans,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE tablename = 'users';

-- 删除索引
DROP INDEX idx_users_email;

-- 重建索引
REINDEX TABLE users;
REINDEX INDEX idx_users_email;

-- 并发重建索引（不锁表）
CREATE INDEX CONCURRENTLY idx_users_email_new ON users(email);
DROP INDEX idx_users_email;
ALTER INDEX idx_users_email_new RENAME TO idx_users_email;
```

---

### 08. SQL 查询优化

**目标**：掌握 SQL 查询优化技巧

**内容要点**：

- 查询性能分析工具
  - EXPLAIN 分析
  - EXPLAIN ANALYZE 实际执行
  - pg_stat_statements 扩展
- 查询优化技巧
  - SELECT 只查询需要的列
  - 避免 SELECT \*
  - 使用 LIMIT 限制结果集
  - 避免在 WHERE 中使用函数
  - 使用 EXISTS 替代 IN
  - 使用 UNION ALL 替代 UNION
  - 批量操作
- JOIN 优化
  - INNER JOIN vs LEFT JOIN
  - 小表驱动大表
  - JOIN 顺序
- 子查询 vs CTE vs 临时表
- 分页优化（keyset pagination）
- 批量插入优化

**实战示例**：

```sql
-- EXPLAIN ANALYZE 分析
EXPLAIN ANALYZE
SELECT u.email, o.order_number, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.is_verified = TRUE
  AND o.status = 'paid'
LIMIT 10;

-- 优化前（慢）
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';
-- 优化后（快）
SELECT * FROM users WHERE email = 'user@example.com';

-- EXISTS vs IN
-- 优化前
SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE is_verified = TRUE);
-- 优化后
SELECT * FROM orders o WHERE EXISTS (SELECT 1 FROM users u WHERE u.id = o.user_id AND u.is_verified = TRUE);

-- UNION ALL vs UNION
-- 优化前（去重排序）
SELECT email FROM users_a
UNION
SELECT email FROM users_b;
-- 优化后（不去重）
SELECT email FROM users_a
UNION ALL
SELECT email FROM users_b;

-- 分页优化（offset 深分页问题）
-- 优化前（深分页慢）
SELECT * FROM orders
ORDER BY created_at DESC
LIMIT 20 OFFSET 10000;

-- 优化后（keyset pagination）
SELECT * FROM orders
WHERE created_at < '2024-01-15 10:00:00'
ORDER BY created_at DESC
LIMIT 20;

-- 批量插入优化
-- 优化前（逐条插入）
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
VALUES ('order-1', 'prod-1', 2, 100, 200);
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
VALUES ('order-1', 'prod-2', 1, 50, 50);

-- 优化后（批量插入）
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
  ('order-1', 'prod-1', 2, 100, 200),
  ('order-1', 'prod-2', 1, 50, 50);

-- 使用 COPY 命令（大数据量导入）
COPY order_items (order_id, product_id, quantity, unit_price, subtotal)
FROM '/path/to/file.csv'
DELIMITER ','
CSV HEADER;

-- CTE 优化复杂查询
WITH user_stats AS (
  SELECT
    user_id,
    COUNT(*) as order_count,
    SUM(total) as total_spent
  FROM orders
  WHERE status = 'paid'
  GROUP BY user_id
)
SELECT
  u.email,
  u.full_name,
  COALESCE(us.order_count, 0) as order_count,
  COALESCE(us.total_spent, 0) as total_spent
FROM users u
LEFT JOIN user_stats us ON u.id = us.user_id
WHERE u.is_verified = TRUE;
```

---

### 09. 执行计划分析

**目标**：深入理解 SQL 执行计划，诊断性能问题

**内容要点**：

- 执行计划解读
  - 扫描方式：Seq Scan、Index Scan、Index Only Scan
  - 连接方式：Nested Loop、Hash Join、Merge Join
  - 聚合方式：Hash Aggregate、GroupAggregate
- 成本估算模型
- 统计信息
  - ANALYZE 收集统计
  - 统计信息准确性
- 执行计划节点类型
- 常见性能问题诊断
  - 全表扫描
  - 缺失索引
  - 统计信息过时
  - 不当的类型转换
  - 锁等待
- 性能调优工具
  - pg_stat_statements
  - pg_stat_activity
  - auto_explain

**实战示例**：

```sql
-- 启用 pg_stat_statements 扩展
CREATE EXTENSION pg_stat_statements;

-- 查看最慢的查询
SELECT
  query,
  calls,
  total_exec_time / 1000 as total_seconds,
  mean_exec_time / 1000 as avg_seconds,
  stddev_exec_time / 1000 as stddev_seconds
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- 查看当前正在执行的查询
SELECT
  pid,
  now() - query_start as duration,
  state,
  query
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY duration DESC;

-- 查看锁等待
SELECT
  pid,
  usename,
  pg_blocking_pids(pid) as blocked_by,
  query as blocked_query
FROM pg_stat_activity
WHERE cardinality(pg_blocking_pids(pid)) > 0;

-- 执行计划详解
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT
  u.email,
  o.order_number,
  o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.is_verified = TRUE
  AND o.created_at >= '2024-01-01'
ORDER BY o.created_at DESC
LIMIT 20;

-- 输出示例解读：
-- Hash Join (cost=.. rows=.. width=..) (actual time=.. rows=.. loops=..)
--   Hash Cond: (o.user_id = u.id)
--   -> Seq Scan on orders o (cost=.. rows=..)
--   -> Hash (cost=.. rows=..)
--     -> Seq Scan on users u (cost=..)

-- 更新统计信息
ANALYZE users;
ANALYZE orders;
ANALYZE;

-- 启用 auto_explain（记录慢查询）
LOAD 'auto_explain';
SET auto_explain.log_min_duration = 1000; -- 记录超过1秒的查询
SET auto_explain.log_analyze = true;

-- 强制使用特定索引（HINT）
SET enable_seqscan = off;  -- 禁用顺序扫描（测试用）

-- 检查索引是否被使用
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
WHERE idx_scan = 0  -- 未使用的索引
ORDER BY schemaname, tablename;
```

---

## 第四阶段：ORM 实践（3篇）

### 10. Prisma ORM 入门

**目标**：掌握 Prisma 基本用法，提升开发效率

**内容要点**：

- 为什么选择 Prisma（vs TypeORM、Sequelize、Drizzle）
- Prisma 核心组件
  - Prisma Schema（数据模型定义）
  - Prisma Client（类型安全查询）
  - Prisma Migrate（迁移管理）
  - Prisma Studio（可视化管理）
- 初始化项目
- Schema 定义
  - 模型定义
  - 字段类型
  - 关系定义
  - 索引定义
- 迁移管理
- CRUD 操作
- 类型安全

**Prisma Schema 示例**：

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}

model User {
  id            String         @id @default(uuid())
  email         String         @unique
  passwordHash  String         @map("password_hash")
  fullName      String?        @map("full_name")
  phone         String?
  avatarUrl     String?        @map("avatar_url")
  profile       Json?
  preferences   Json           @default("{}")
  isVerified    Boolean        @default(false) @map("is_verified")
  lastLoginAt   DateTime?      @map("last_login_at")
  createdAt     DateTime       @default(now()) @map("created_at")
  updatedAt     DateTime       @updatedAt @map("updated_at")

  orders        Order[]
  profile       UserProfile?

  @@index([email])
  @@index([isVerified])
  @@map("users")
}

model UserProfile {
  userId      String   @id @map("user_id")
  bio         String?
  website     String?
  location    String?
  birthDate   DateTime? @map("birth_date")
  gender      String?

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_profiles")
}

model Order {
  id            String      @id @default(uuid())
  userId        String      @map("user_id")
  orderNumber   String      @unique @map("order_number")
  status        OrderStatus @default(PENDING)
  subtotal      Decimal     @db.Decimal(10, 2)
  tax           Decimal     @db.Decimal(10, 2) @default(0)
  discount      Decimal     @db.Decimal(10, 2) @default(0)
  total         Decimal     @db.Decimal(10, 2)
  notes         String?
  metadata      Json?
  createdAt     DateTime    @default(now()) @map("created_at")
  updatedAt     DateTime    @updatedAt @map("updated_at")

  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  items         OrderItem[]

  @@index([userId])
  @@index([status])
  @@index([createdAt])
  @@map("orders")
}

model Product {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  price       Decimal   @db.Decimal(10, 2)
  stock       Int       @default(0)
  categoryId  String?   @map("category_id")
  createdAt   DateTime  @default(now()) @map("created_at")

  items       OrderItem[]

  @@index([slug])
  @@index([categoryId])
  @@map("products")
}

model OrderItem {
  id         String   @id @default(uuid())
  orderId    String   @map("order_id")
  productId  String   @map("product_id")
  quantity   Int
  unitPrice  Decimal  @map("unit_price") @db.Decimal(10, 2)
  subtotal   Decimal  @db.Decimal(10, 2)
  createdAt  DateTime @default(now()) @map("created_at")

  order      Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product    Product  @relation(fields: [productId], references: [id], onDelete: Restrict)

  @@index([orderId])
  @@index([productId])
  @@map("order_items")
}
```

**代码示例**：

```typescript
// 初始化 Prisma Client
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "error", "warn"],
});

// 创建用户
const user = await prisma.user.create({
  data: {
    email: "user@example.com",
    passwordHash: "hashed_password",
    fullName: "张三",
  },
});

// 查询用户（包含关联）
const userWithOrders = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    orders: {
      where: { status: "PAID" },
      orderBy: { createdAt: "desc" },
      take: 10,
    },
    profile: true,
  },
});

// 更新用户
const updatedUser = await prisma.user.update({
  where: { id: userId },
  data: {
    lastLoginAt: new Date(),
    isVerified: true,
  },
});

// 删除用户
await prisma.user.delete({
  where: { id: userId },
});

// 批量操作
const users = await prisma.user.findMany({
  where: {
    isVerified: true,
    email: { endsWith: "@example.com" },
  },
  select: {
    id: true,
    email: true,
    fullName: true,
  },
  orderBy: { createdAt: "desc" },
  take: 20,
});

// 事务操作
await prisma.$transaction(async (tx) => {
  // 创建订单
  const order = await tx.order.create({
    data: {
      userId,
      orderNumber: `ORD-${Date.now()}`,
      total: 100,
      // ...
    },
  });

  // 创建订单项
  await tx.orderItem.create({
    data: {
      orderId: order.id,
      productId,
      quantity: 2,
      unitPrice: 50,
      subtotal: 100,
    },
  });

  // 更新库存
  await tx.product.update({
    where: { id: productId },
    data: { stock: { decrement: 2 } },
  });

  return order;
});

// 优雅关闭
await prisma.$disconnect();
```

---

### 11. Prisma 高级查询

**目标**：掌握 Prisma 高级查询技巧

**内容要点**：

- 关系查询（include、select）
- 过滤与排序
- 分页（cursor-based、offset-based）
- 聚合查询（count、sum、avg、max、min）
- 分组查询（groupBy）
- 原生 SQL
- 事务处理
- 批量操作
- 性能优化
  - select 只查询需要的字段
  - 避免 N+1 查询
  - 使用 include 优化

**实战示例**：

```typescript
// 关系查询（避免 N+1）
const usersWithOrders = await prisma.user.findMany({
  include: {
    orders: {
      select: {
        id: true,
        orderNumber: true,
        total: true,
        createdAt: true,
      },
      where: { status: "PAID" },
      orderBy: { createdAt: "desc" },
      take: 5,
    },
  },
});

// 复杂过滤
const orders = await prisma.order.findMany({
  where: {
    AND: [
      { status: { in: ["PAID", "SHIPPED"] } },
      { createdAt: { gte: startDate } },
      { total: { gte: 100 } },
    ],
    user: {
      isVerified: true,
      email: { contains: "@example.com" },
    },
  },
});

// 全文搜索（PostgreSQL）
const users = await prisma.user.findMany({
  where: {
    OR: [
      { email: { contains: query, mode: "insensitive" } },
      { fullName: { contains: query, mode: "insensitive" } },
    ],
  },
});

// 聚合查询
const stats = await prisma.order.aggregate({
  where: { status: "PAID" },
  _count: { id: true },
  _sum: { total: true },
  _avg: { total: true },
  _min: { total: true },
  _max: { total: true },
});

// 分组查询
const orderStatsByUser = await prisma.order.groupBy({
  by: ["userId"],
  where: { status: "PAID" },
  _count: { id: true },
  _sum: { total: true },
  orderBy: { _sum: { total: "desc" } },
});

// Cursor 分页（适合大数据量）
const firstPage = await prisma.order.findMany({
  orderBy: { createdAt: "desc" },
  take: 20,
});

const lastItem = firstPage[firstPage.length - 1];
const nextPage = await prisma.order.findMany({
  cursor: { id: lastItem.id },
  orderBy: { createdAt: "desc" },
  take: 20,
  skip: 1, // 跳过 cursor
});

// 原生 SQL
const result = await prisma.$queryRaw`
  SELECT
    u.email,
    COUNT(o.id) as order_count,
    COALESCE(SUM(o.total), 0) as total_spent
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  WHERE u.is_verified = true
  GROUP BY u.id, u.email
  ORDER BY total_spent DESC
  LIMIT 10
`;

// 批量创建
const users = await prisma.user.createMany({
  data: [
    { email: "user1@example.com", passwordHash: "hash1" },
    { email: "user2@example.com", passwordHash: "hash2" },
    { email: "user3@example.com", passwordHash: "hash3" },
  ],
  skipDuplicates: true, // 跳过重复记录
});

// 批量更新
await prisma.order.updateMany({
  where: { status: "PENDING", createdAt: { lt: cutoffDate } },
  data: { status: "CANCELLED" },
});

// JSON 字段查询
const users = await prisma.user.findMany({
  where: {
    preferences: {
      path: ["notifications", "email"],
      equals: true,
    },
  },
});

// 原子操作
await prisma.product.update({
  where: { id: productId },
  data: {
    stock: { increment: 1 }, // 增加
    views: { decrement: 1 }, // 减少
    version: { set: 2 }, // 设置
  },
});

// Upsert（存在则更新，不存在则创建）
const user = await prisma.user.upsert({
  where: { email: "user@example.com" },
  create: {
    email: "user@example.com",
    passwordHash: "hash",
  },
  update: {
    lastLoginAt: new Date(),
  },
});
```

---

### 12. 事务与并发控制

**目标**：掌握事务处理和并发控制机制

**内容要点**：

- 事务 ACID 特性
- 事务隔离级别
  - Read Uncommitted
  - Read Committed（PostgreSQL 默认）
  - Repeatable Read
  - Serializable
- 并发问题
  - 脏读
  - 不可重复读
  - 幻读
- 锁机制
  - 行锁（SELECT FOR UPDATE）
  - 表锁
  - 共享锁 vs 排他锁
  - 死锁检测与处理
- 乐观锁 vs 悲观锁
- Prisma 事务
- 分布式事务（简要介绍）

**实战示例**：

```sql
-- 事务基本用法
BEGIN;

UPDATE products SET stock = stock - 2 WHERE id = 'prod-1';
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
VALUES ('order-1', 'prod-1', 2, 100, 200);

COMMIT;
-- 或 ROLLBACK;

-- 隔离级别设置
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- 查看当前隔离级别
SHOW transaction_isolation;

-- 悲观锁（SELECT FOR UPDATE）
BEGIN;

SELECT stock FROM products WHERE id = 'prod-1' FOR UPDATE;
-- 其他事务会等待，直到当前事务提交

UPDATE products SET stock = stock - 2 WHERE id = 'prod-1';

COMMIT;

-- 乐观锁（版本号）
UPDATE products
SET stock = stock - 2, version = version + 1
WHERE id = 'prod-1' AND version = 5;

-- 检查是否更新成功
SELECT ROW_COUNT();

-- 死锁检测
SELECT * FROM pg_stat_activity WHERE wait_event_type = 'Lock';

-- 查看死锁日志
SELECT * FROM pg_stat_database_conflicts;
```

```typescript
// Prisma 事务

// 方式 1：$transaction API
await prisma.$transaction(async (tx) => {
  // 所有操作在同一事务中
  const order = await tx.order.create({
    data: {
      userId,
      orderNumber: `ORD-${Date.now()}`,
      total: 100,
    },
  });

  await tx.orderItem.create({
    data: {
      orderId: order.id,
      productId,
      quantity: 2,
      unitPrice: 50,
      subtotal: 100,
    },
  });

  await tx.product.update({
    where: { id: productId },
    data: { stock: { decrement: 2 } },
  });

  return order;
});

// 方式 2：批量操作（独立事务）
const [user, order] = await prisma.$transaction([
  prisma.user.create({ data: userData }),
  prisma.order.create({ data: orderData }),
]);

// 方式 3：设置隔离级别
await prisma.$transaction(
  async (tx) => {
    // 事务操作
  },
  {
    maxWait: 5000, // 最大等待时间（ms）
    timeout: 10000, // 超时时间（ms）
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  }
);

// 乐观锁实现（版本号）
try {
  const product = await prisma.product.findUnique({ where: { id: productId } });

  const updatedProduct = await prisma.product.updateMany({
    where: {
      id: productId,
      version: product.version, // 版本号必须匹配
    },
    data: {
      stock: product.stock - quantity,
      version: product.version + 1,
    },
  });

  if (updatedProduct.count === 0) {
    throw new Error("并发冲突：数据已被其他事务修改");
  }
} catch (error) {
  // 处理并发冲突
}

// 悲观锁实现（SELECT FOR UPDATE）
await prisma.$transaction(async (tx) => {
  // 使用 queryRaw 执行 SELECT FOR UPDATE
  const product = await tx.$queryRaw<Array<{ stock: number }>>`
    SELECT stock FROM products
    WHERE id = ${productId}
    FOR UPDATE
  `;

  if (product[0].stock < quantity) {
    throw new Error("库存不足");
  }

  await tx.product.update({
    where: { id: productId },
    data: { stock: { decrement: quantity } },
  });
});

// 重试机制（处理并发冲突）
async function executeWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        // 等待一段时间后重试
        await new Promise((resolve) => setTimeout(resolve, 100 * (i + 1)));
      }
    }
  }

  throw lastError;
}

// 使用示例
const result = await executeWithRetry(async () => {
  return await prisma.$transaction(async (tx) => {
    // 事务操作
  });
});
```

---

## 第五阶段：NoSQL 扩展（3篇）

### 13. MongoDB 文档数据库

**目标**：掌握 MongoDB 的基本使用

**内容要点**：

- 为什么选择 MongoDB
  - 文档模型
  - 灵活的 Schema
  - 水平扩展能力
  - 丰富的查询语言
- MongoDB 核心概念
  - Database（数据库）
  - Collection（集合）
  - Document（文档）
  - Field（字段）
  - \_id（主键）
- BSON 数据类型
- CRUD 操作
- 索引
- 聚合管道
- MongoDB vs PostgreSQL（何时选择）

**Docker Compose 配置**：

```yaml
services:
  mongodb:
    image: mongo:7
    container_name: mongodb_dev
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin123
      MONGO_INITDB_DATABASE: dev_db
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  mongoui:
    image: mongo-express:latest
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://admin:admin123@mongodb:27017/
      ME_CONFIG_BASICAUTH_USERNAME: admin
      ME_CONFIG_BASICAUTH_PASSWORD: admin
    ports:
      - "8081:8081"
    depends_on:
      - mongodb

volumes:
  mongodb_data:
```

**实战示例**：

```javascript
// 连接 MongoDB
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
const db = client.db("ecommerce");

// 插入文档
await db.collection("users").insertOne({
  email: "user@example.com",
  fullName: "张三",
  createdAt: new Date(),
});

// 查询文档
const user = await db.collection("users").findOne({
  email: "user@example.com",
});

// 更新文档
await db
  .collection("users")
  .updateOne({ email: "user@example.com" }, { $set: { fullName: "李四" } });

// 删除文档
await db.collection("users").deleteOne({
  email: "user@example.com",
});

// 嵌入文档（推荐）
const order = await db.collection("orders").insertOne({
  orderNumber: "ORD-001",
  userId: "user-123",
  items: [
    { productId: "prod-1", name: "商品A", quantity: 2, price: 100 },
    { productId: "prod-2", name: "商品B", quantity: 1, price: 50 },
  ],
  total: 250,
  status: "paid",
  createdAt: new Date(),
});

// 引用文档（适用场景）
const user = await db.collection("users").insertOne({
  email: "user@example.com",
  fullName: "张三",
  orderIds: ["order-1", "order-2"], // 引用订单 ID
});

// 索引
await db.collection("users").createIndex({ email: 1 }, { unique: true });
await db.collection("orders").createIndex({ userId: 1 });
await db.collection("orders").createIndex({ createdAt: -1 });

// 复杂查询
const orders = await db
  .collection("orders")
  .find({
    status: "paid",
    createdAt: { $gte: new Date("2024-01-01") },
    total: { $gte: 100 },
  })
  .sort({ createdAt: -1 })
  .limit(20)
  .toArray();

// 聚合管道
const stats = await db
  .collection("orders")
  .aggregate([
    { $match: { status: "paid" } },
    {
      $group: {
        _id: "$userId",
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$total" },
        avgOrderValue: { $avg: "$total" },
      },
    },
    { $sort: { totalSpent: -1 } },
    { $limit: 10 },
  ])
  .toArray();
```

---

### 14. MongoDB 聚合管道

**目标**：掌握 MongoDB 聚合管道高级用法

**内容要点**：

- 聚合管道阶段
  - $match：过滤
  - $group：分组
  - $project：投影
  - $sort：排序
  - $limit / $skip：分页
  - $lookup：左连接
  - $unwind：展开数组
  - $addFields：添加字段
  - $facet：多管道并行
  - $redact：数据权限控制
- 聚合操作符
  - $sum、$avg、$min、$max
  - $push、$addToSet
  - $first、$last
  - $cond、$ifNull
- 性能优化
- 与 SQL 对比

**实战示例**：

```javascript
// 示例 1：统计用户订单
const userOrderStats = await db
  .collection("orders")
  .aggregate([
    // 过滤已支付订单
    { $match: { status: "paid" } },

    // 按用户分组
    {
      $group: {
        _id: "$userId",
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$total" },
        avgOrderValue: { $avg: "$total" },
        minOrderValue: { $min: "$total" },
        maxOrderValue: { $max: "$total" },
        lastOrderDate: { $max: "$createdAt" },
      },
    },

    // 排序
    { $sort: { totalSpent: -1 } },

    // 限制结果
    { $limit: 10 },

    // 关联用户信息
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },

    // 展开数组
    { $unwind: "$user" },

    // 投影字段
    {
      $project: {
        _id: 0,
        userId: "$_id",
        email: "$user.email",
        fullName: "$user.fullName",
        totalOrders: 1,
        totalSpent: 1,
        avgOrderValue: { $round: ["$avgOrderValue", 2] },
        lastOrderDate: 1,
      },
    },
  ])
  .toArray();

// 示例 2：商品销售统计
const productSales = await db
  .collection("orders")
  .aggregate([
    // 展开订单项
    { $unwind: "$items" },

    // 过滤
    { $match: { status: "paid" } },

    // 按商品分组
    {
      $group: {
        _id: "$items.productId",
        productName: { $first: "$items.name" },
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: "$items.subtotal" },
        ordersCount: { $sum: 1 },
      },
    },

    // 添加计算字段
    {
      $addFields: {
        avgPrice: { $divide: ["$revenue", "$totalSold"] },
      },
    },

    // 排序
    { $sort: { revenue: -1 } },
  ])
  .toArray();

// 示例 3：时间序列分析
const dailyRevenue = await db
  .collection("orders")
  .aggregate([
    { $match: { status: "paid" } },

    // 格式化日期
    {
      $project: {
        date: {
          dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        total: 1,
      },
    },

    // 按日期分组
    {
      $group: {
        _id: "$date",
        revenue: { $sum: "$total" },
        ordersCount: { $sum: 1 },
      },
    },

    // 排序
    { $sort: { _id: 1 } },
  ])
  .toArray();

// 示例 4：多管道并行（$facet）
const analytics = await db
  .collection("orders")
  .aggregate([
    { $match: { status: "paid" } },

    {
      $facet: {
        // 统计数据
        stats: [
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$total" },
              totalOrders: { $sum: 1 },
              avgOrderValue: { $avg: "$total" },
            },
          },
        ],

        // 按状态分组
        byStatus: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
              revenue: { $sum: "$total" },
            },
          },
        ],

        // 热销商品
        topProducts: [
          { $unwind: "$items" },
          {
            $group: {
              _id: "$items.productId",
              sold: { $sum: "$items.quantity" },
            },
          },
          { $sort: { sold: -1 } },
          { $limit: 10 },
        ],

        // 时间趋势
        timeSeries: [
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m", date: "$createdAt" },
              },
              revenue: { $sum: "$total" },
            },
          },
          { $sort: { _id: 1 } },
        ],
      },
    },
  ])
  .toArray();

// 示例 5：条件表达式
const orders = await db
  .collection("orders")
  .aggregate([
    {
      $project: {
        orderNumber: 1,
        total: 1,
        status: 1,

        // 条件字段
        statusLabel: {
          $switch: {
            branches: [
              { case: { $eq: ["$status", "pending"] }, then: "待支付" },
              { case: { $eq: ["$status", "paid"] }, then: "已支付" },
              { case: { $eq: ["$status", "shipped"] }, then: "已发货" },
              { case: { $eq: ["$status", "delivered"] }, then: "已送达" },
            ],
            default: "其他",
          },
        },

        // 嵌套条件
        discount: {
          $cond: {
            if: { $gte: ["$total", 1000] },
            then: { $multiply: ["$total", 0.1] },
            else: { $multiply: ["$total", 0.05] },
          },
        },
      },
    },
  ])
  .toArray();
```

---

### 15. Redis 数据结构与缓存

**目标**：掌握 Redis 的数据结构和缓存策略

**内容要点**：

- 为什么选择 Redis
  - 高性能（内存存储）
  - 丰富的数据结构
  - 持久化支持
  - 分布式缓存
- Redis 数据类型
  - String（字符串）
  - Hash（哈希）
  - List（列表）
  - Set（集合）
  - Sorted Set（有序集合）
  - Bitmap（位图）
  - HyperLogLog（基数统计）
  - Geospatial（地理位置）
- 缓存策略
  - Cache Aside
  - Read Through
  - Write Through
  - Write Behind
- 缓存问题
  - 缓存穿透
  - 缓存击穿
  - 缓存雪崩
- 过期策略与淘汰策略
- 分布式锁
- 消息发布订阅

**Docker Compose 配置**：

```yaml
services:
  redis:
    image: redis:7-alpine
    container_name: redis_dev
    command: redis-server --appendonly yes
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  redisinsight:
    image: redis/redisinsight:latest
    container_name: redisinsight_dev
    ports:
      - "8001:8001"
    depends_on:
      - redis

volumes:
  redis_data:
```

**实战示例**：

```typescript
import { createClient } from "redis";

const redis = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

await redis.connect();

// String：缓存用户信息
await redis.set("user:123", JSON.stringify({ id: 123, name: "张三" }));
await redis.expire("user:123", 3600); // 1小时过期
const user = JSON.parse(await redis.get("user:123"));

// Hash：用户属性
await redis.hSet("user:123:profile", {
  name: "张三",
  email: "user@example.com",
  age: "25",
});
const name = await redis.hGet("user:123:profile", "name");

// List：最新文章列表
await redis.lPush("articles:latest", "article-1", "article-2", "article-3");
const articles = await redis.lRange("articles:latest", 0, 9); // 前10篇
await redis.lTrim("articles:latest", 0, 99); // 保持列表长度

// Set：用户标签
await redis.sAdd("user:123:tags", "tech", "programming", "database");
const tags = await redis.sMembers("user:123:tags");
await redis.sIsMember("user:123:tags", "tech");

// Sorted Set：排行榜
await redis.zAdd("leaderboard", [
  { score: 100, value: "user-1" },
  { score: 85, value: "user-2" },
  { score: 92, value: "user-3" },
]);
const top10 = await redis.zRangeWithScores("leaderboard", 0, 9, {
  REV: true, // 降序
});

// Bitmap：用户签到
await redis.setBit("attendance:2024-01-15", 123, 1); // 用户123签到
const attended = await redis.getBit("attendance:2024-01-15", 123);

// HyperLogLog：UV 统计
await redis.pfAdd("page:home:uv", "user-1", "user-2", "user-3");
const uv = await redis.pfCount("page:home:uv");

// 缓存穿透防护（布隆过滤器）
const key = "product:999";
const exists = await redis.exists(`filter:${key}`);
if (!exists) {
  return null; // 直接返回，不查数据库
}
const product = await redis.get(key);
if (!product) {
  // 查询数据库
  const dbProduct = await fetchFromDB(key);
  if (dbProduct) {
    await redis.set(key, JSON.stringify(dbProduct), { EX: 3600 });
    await redis.set(`filter:${key}`, "1", { EX: 86400 }); // 布隆过滤器
  }
  return dbProduct;
}
return JSON.parse(product);

// 缓存击穿防护（互斥锁）
async function getWithLock(key: string) {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const lockKey = `lock:${key}`;
  const lock = await redis.set(lockKey, "1", { NX: true, EX: 10 }); // 10秒锁

  if (lock) {
    try {
      const data = await fetchFromDB(key);
      await redis.set(key, JSON.stringify(data), { EX: 3600 });
      return data;
    } finally {
      await redis.del(lockKey);
    }
  } else {
    // 等待后重试
    await new Promise((resolve) => setTimeout(resolve, 100));
    return await getWithLock(key);
  }
}

// 分布式锁
const lockKey = "lock:resource:123";
const lockValue = Date.now().toString();
const lock = await redis.set(lockKey, lockValue, { NX: true, EX: 30 });
if (lock) {
  try {
    // 执行业务逻辑
  } finally {
    // Lua 脚本释放锁（防止误删）
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    await redis.eval(script, { keys: [lockKey], arguments: [lockValue] });
  }
}

// 消息发布订阅
await redis.subscribe("orders", (message) => {
  console.log("收到消息:", message);
});
await redis.publish("orders", "新订单创建");

// 事务
const multi = redis.multi();
await multi.set("key1", "value1");
await multi.set("key2", "value2");
await multi.incr("counter");
const results = await multi.exec();

// Pipeline（批量操作）
const pipeline = redis.pipeline();
for (let i = 0; i < 100; i++) {
  await pipeline.set(`key:${i}`, `value:${i}`);
}
await pipeline.exec();

await redis.disconnect();
```

---

## 第六阶段：生产实践（3篇）

### 16. Elasticsearch 全文搜索

**目标**：掌握 Elasticsearch 的基本使用

**内容要点**：

- 为什么选择 Elasticsearch
  - 全文搜索能力
  - 分布式架构
  - 实时性
  - 可扩展性
- 核心概念
  - Index（索引）
  - Document（文档）
  - Field（字段）
  - Mapping（映射）
  - Analyzer（分析器）
- 查询 DSL
  - Match Query
  - Term Query
  - Range Query
  - Bool Query
  - Aggregation
- 与 PostgreSQL 集成

**Docker Compose 配置**：

```yaml
services:
  elasticsearch:
    image: elasticsearch:8.11.0
    container_name: elasticsearch_dev
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms512m -Xmx512m
    ports:
      - "9200:9200"
    volumes:
      - es_data:/usr/share/elasticsearch/data

  kibana:
    image: kibana:8.11.0
    container_name: kibana_dev
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

volumes:
  es_data:
```

**实战示例**：

```typescript
import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: "http://localhost:9200",
});

// 创建索引
await client.indices.create({
  index: "products",
  body: {
    mappings: {
      properties: {
        name: { type: "text", analyzer: "ik_max_word" },
        description: { type: "text", analyzer: "ik_max_word" },
        price: { type: "double" },
        category: { type: "keyword" },
        tags: { type: "keyword" },
        createdAt: { type: "date" },
      },
    },
  },
});

// 插入文档
await client.index({
  index: "products",
  id: "prod-1",
  body: {
    name: "Apple iPhone 15",
    description: "最新款 iPhone，搭载 A17 芯片",
    price: 7999,
    category: "手机",
    tags: ["Apple", "iPhone", "5G"],
    createdAt: new Date(),
  },
});

// 批量插入
const operations = products.flatMap((product) => [
  { index: { _index: "products", _id: product.id } },
  product,
]);
await client.bulk({ body: operations });

// 全文搜索
const result = await client.search({
  index: "products",
  body: {
    query: {
      multi_match: {
        query: "iPhone",
        fields: ["name^2", "description"], // name 权重更高
        fuzziness: "AUTO", // 模糊匹配
      },
    },
    highlight: {
      fields: {
        name: {},
        description: {},
      },
    },
  },
});

// 布尔查询
const result = await client.search({
  index: "products",
  body: {
    query: {
      bool: {
        must: [{ match: { name: "iPhone" } }],
        should: [{ term: { tags: "Apple" } }, { term: { category: "手机" } }],
        filter: [{ range: { price: { lte: 10000 } } }],
      },
    },
  },
});

// 聚合查询
const result = await client.search({
  index: "products",
  body: {
    size: 0, // 不返回文档
    aggregations: {
      categories: {
        terms: { field: "category" },
      },
      priceRanges: {
        range: {
          field: "price",
          ranges: [{ to: 1000 }, { from: 1000, to: 5000 }, { from: 5000 }],
        },
      },
      stats: {
        stats: { field: "price" },
      },
    },
  },
});

// 与 PostgreSQL 集成（同步数据）
// 方式 1：应用层同步
async function syncProductToES(product: Product) {
  await prisma.product.create({ data: product });
  await client.index({
    index: "products",
    id: product.id,
    body: product,
  });
}

// 方式 2：使用 CDC 工具（Debezium）
```

---

### 17. 备份与恢复策略

**目标**：掌握数据库备份和恢复方法

**内容要点**：

- 备份类型
  - 全量备份
  - 增量备份
  - 差异备份
- PostgreSQL 备份方法
  - pg_dump（逻辑备份）
  - pg_dumpall
  - pg_basebackup（物理备份）
  - 连续归档（WAL）
- MongoDB 备份方法
  - mongodump
  - 文件系统快照
- Redis 备份方法
  - RDB（快照）
  - AOF（追加文件）
- 备份策略设计
- 恢复演练
- 异地备份
- 自动化备份脚本

**实战示例**：

```bash
# PostgreSQL 备份

# 全量备份（自定义格式）
pg_dump -h localhost -U dev -d dev_db -F c -f /backup/dev_db_$(date +%Y%m%d).dump

# 全量备份（SQL 脚本）
pg_dump -h localhost -U dev -d dev_db -f /backup/dev_db_$(date +%Y%m%d).sql

# 仅备份 schema
pg_dump -h localhost -U dev -d dev_db --schema-only -f /backup/schema.sql

# 仅备份特定表
pg_dump -h localhost -U dev -d dev_db -t users -t orders -f /backup/tables.sql

# 并行备份（更快）
pg_dump -h localhost -U dev -d dev_db -j 4 -F d -f /backup/dev_db_dir

# 恢复
pg_restore -h localhost -U dev -d dev_db -c /backup/dev_db_20240115.dump
psql -h localhost -U dev -d dev_db -f /backup/dev_db_20240115.sql

# pg_basebackup（物理备份）
pg_basebackup -h localhost -U dev -D /backup/basebackup -Ft -z -P

# MongoDB 备份

# 全量备份
mongodump --uri="mongodb://localhost:27017/ecommerce" --out=/backup/mongo/$(date +%Y%m%d)

# 备份特定集合
mongodump --uri="mongodb://localhost:27017/ecommerce" --collection=users --out=/backup/mongo

# 压缩备份
mongodump --uri="mongodb://localhost:27017/ecommerce" --gzip --out=/backup/mongo

# 恢复
mongorestore --uri="mongodb://localhost:27017/ecommerce" --drop /backup/mongo/20240115

# Redis 备份

# 触发 RDB 快照
redis-cli BGSAVE

# 复制 RDB 文件
cp /var/lib/redis/dump.rdb /backup/redis/dump_$(date +%Y%m%d).rdb

# AOF 备份
cp /var/lib/redis/appendonly.aof /backup/redis/appendonly_$(date +%Y%m%d).aof

# 自动化备份脚本
```

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)

# PostgreSQL 备份
echo "Backing up PostgreSQL..."
pg_dump -h postgres -U dev -d dev_db -F c -f "$BACKUP_DIR/postgres/dev_db_$DATE.dump"

# MongoDB 备份
echo "Backing up MongoDB..."
mongodump --uri="mongodb://mongodb:27017/ecommerce" --gzip --out="$BACKUP_DIR/mongodb/$DATE"

# Redis 备份
echo "Backing up Redis..."
redis-cli --redis redis SAVE
cp /data/dump.rdb "$BACKUP_DIR/redis/dump_$DATE.rdb"

# 清理 7 天前的备份
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup completed: $DATE"
```

---

### 18. 监控、调优与分库分表

**目标**：掌握数据库监控和性能调优

**内容要点**：

- 监控指标
  - 连接数
  - QPS/TPS
  - 慢查询
  - 缓存命中率
  - 锁等待
  - 复制延迟
  - 磁盘使用
- 监控工具
  - PostgreSQL：pg_stat_statements、pgAdmin、Prometheus
  - MongoDB：MongoDB Atlas、Ops Manager
  - Redis：RedisInsight、Redis Exporter
- 性能调优
  - 配置优化
  - 查询优化
  - 索引优化
  - 连接池优化
- 分库分表
  - 水平分片
  - 垂直分片
  - 分片策略
  - 分布式事务
- 读写分离
- 高可用架构
  - 主从复制
  - 哨兵模式
  - 集群模式

**实战示例**：

```sql
-- PostgreSQL 监控查询

-- 查看当前连接数
SELECT count(*) FROM pg_stat_activity;

-- 查看慢查询（需要 pg_stat_statements 扩展）
SELECT
  query,
  calls,
  total_exec_time / 1000 as total_seconds,
  mean_exec_time / 1000 as avg_seconds
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- 查看表大小
SELECT
  relname AS table_name,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;

-- 查看索引使用情况
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;

-- 缓存命中率
SELECT
  sum(heap_blks_read) as heap_read,
  sum(heap_blks_hit) as heap_hit,
  sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS cache_hit_ratio
FROM pg_statio_user_tables;

-- 配置优化（postgresql.conf）
shared_buffers = 256MB              # 内存的 25%
effective_cache_size = 1GB          # 内存的 50-75%
work_mem = 16MB                     # 每个查询操作的内存
maintenance_work_mem = 128MB        # 维护操作内存
checkpoint_completion_target = 0.9  # 检查点完成目标
wal_buffers = 16MB                  # WAL 缓冲区
default_statistics_target = 100     # 统计信息精度
random_page_cost = 1.1              # SSD 优化
```

```yaml
# 分库分表示例

# 按用户 ID 分片
shards:
  - name: shard_0
    database: shard_0
    id_range: [0, 999999]
  - name: shard_1
    database: shard_1
    id_range: [1000000, 1999999]
  - name: shard_2
    database: shard_2
    id_range: [2000000, 2999999]

# 应用层路由
function getShard(userId: string) {
  const id = parseInt(userId)
  const shardIndex = Math.floor(id / 1000000)
  return shards[shardIndex]
}

// 查询时路由
const shard = getShard(userId)
const user = await prisma.$queryRaw`SELECT * FROM users WHERE id = ${userId}`
```

---

## 附录

### A. 数据库选型决策树

```
开始
  │
  ├─ 数据结构复杂、需要事务？
  │   ├─ 是 → 关系型数据库
  │   │   ├─ 功能优先 → PostgreSQL
  │   │   ├─ 简单易用 → MySQL
  │   │   └─ 嵌入式 → SQLite
  │   │
  │   └─ 否 → NoSQL 数据库
  │       ├─ 文档型、灵活 Schema → MongoDB
  │       ├─ 键值对、高性能 → Redis
  │       ├─ 全文搜索 → Elasticsearch
  │       ├─ 图关系 → Neo4j
  │       └─ 时序数据 → InfluxDB
  │
  └─ 需要多种存储？
      └─ 使用多语言持久架构（Polyglot Persistence）
```

### B. 常见问题与解决方案

1. **慢查询**：使用 EXPLAIN ANALYZE 分析，添加索引
2. **连接泄漏**：使用连接池，及时释放连接
3. **死锁**：设置锁超时，优化事务顺序
4. **内存溢出**：调整 work_mem，使用游标
5. **复制延迟**：优化主库性能，调整复制参数

### C. 性能基准

- PostgreSQL：10000+ TPS（简单查询）
- MongoDB：100000+ OPS（简单查询）
- Redis：100000+ OPS（GET/SET）

### D. 学习资源

- **官方文档**：
  - PostgreSQL：https://www.postgresql.org/docs/
  - MongoDB：https://www.mongodb.com/docs/
  - Redis：https://redis.io/docs/
  - Elasticsearch：https://www.elastic.co/guide/

- **在线工具**：
  - SQL Fiddle：https://sqlfiddle.com/
  - MongoDB Playground：https://www.mongodb.com/try

---

## 写作规范

### 每篇文章结构

````markdown
---
title: "文章标题"
date: "YYYY-MM-DD"
summary: "一句话总结（100字以内）"
tags: ["数据库", "相关标签"]
category: "数据库"
cover: ""
draft: false
series: "数据库渐进式学习路线"
seriesOrder: N
---

## 前言/背景

解释为什么需要学习这个主题，它解决了什么问题。

## 核心概念

用通俗易懂的语言解释核心概念，配合图示。

## 实战演练

### 示例 1：标题

```sql
-- 完整可运行的代码
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

### 实战项目贯穿

所有文章围绕一个统一的实战项目展开：**电商系统数据库设计**

**功能模块**：
- 用户管理（用户、个人资料）
- 商品管理（商品、分类、库存）
- 订单管理（订单、订单项）
- 支付管理（支付记录）
- 搜索功能（Elasticsearch）
- 缓存层（Redis）
- 日志分析（MongoDB）

---

## 学习路径图

```

┌─────────────────────────────────────────────────────────────┐
│ 数据库学习路径 │
├─────────────────────────────────────────────────────────────┤
│ │
│ 第一阶段：基础入门 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 01. 数据库概念 │ ───► │ 02. SQL 基础 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────┐ │
│ │ 03. PostgreSQL │ │
│ └──────────────────┘ │
│ │
│ 第二阶段：数据建模 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 04. 表设计 │ ───► │ 05. 关系设计 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────┐ │
│ │ 06. 范式理论 │ │
│ └──────────────────┘ │
│ │
│ 第三阶段：查询优化 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 07. 索引原理 │ ───► │ 08. 查询优化 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────┐ │
│ │ 09. 执行计划 │ │
│ └──────────────────┘ │
│ │
│ 第四阶段：ORM 实践 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 10. Prisma 入门 │ ───► │ 11. Prisma 高级 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────┐ │
│ │ 12. 事务并发 │ │
│ └──────────────────┘ │
│ │
│ 第五阶段：NoSQL 扩展 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 13. MongoDB │ ───► │ 14. MongoDB 聚合 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────┐ │
│ │ 15. Redis 缓存 │ │
│ └──────────────────┘ │
│ │
│ 第六阶段：生产实践 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 16. Elasticsearch │ ───► │ 17. 备份恢复 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────────────────────────────────┐ │
│ │ 18. 监控调优与分库分表 │ │
│ └──────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘

```

---

## 预期效果

完成本系列学习后，读者将能够：

1. ✅ 理解数据库核心概念和分类
2. ✅ 熟练编写 SQL 查询语句
3. ✅ 设计合理的数据库表结构
4. ✅ 优化慢查询和数据库性能
5. ✅ 使用 Prisma ORM 进行类型安全开发
6. ✅ 掌握事务处理和并发控制
7. ✅ 使用 MongoDB、Redis、Elasticsearch
8. ✅ 进行数据库备份和恢复
9. ✅ 具备生产环境数据库运维能力
10. ✅ 能够应对日常业务开发的数据库需求

---

## 版本信息

- **PostgreSQL**：16（LTS）
- **MongoDB**：7
- **Redis**：7.x
- **Elasticsearch**：8.x
- **Prisma**：5.x
- **Node.js**：20.x LTS

*计划创建日期：2026-03-19*
*预计完成时间：4-5个月（每周 1 篇）*
```
