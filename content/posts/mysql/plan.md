# MySQL 渐进式学习计划

## 背景

本计划旨在通过一系列结构化的博客文章，帮助读者从零开始掌握 MySQL 数据库的使用。文章采用渐进式设计，从基础概念到高级优化，每篇文章都包含丰富的实战示例和最佳实践。

**技术栈选择标准**：

- ✅ 市场最流行的关系型数据库
- ✅ 开源免费，社区活跃
- ✅ 企业级应用首选
- ✅ 性能优秀，易于学习
- ✅ 生态完善，工具丰富

**核心栈**：

- **数据库**：MySQL 8.x
- **客户端工具**：MySQL Workbench / DBeaver / TablePlus
- **命令行**：MySQL Shell
- **测试数据**：Sakila Sample Database
- **容器化**：Docker + Docker Compose
- **连接驱动**：MySQL Connector (各语言)
- **ORM 参考**：Prisma / TypeORM / Sequelize

---

## 博客目录结构

```
content/posts/mysql/
├── plan.md                              # 本计划文件
├── 01-introduction-and-installation.mdx # MySQL 简介与环境搭建
├── 02-basic-sql-and-database-operations.mdx # SQL 基础与数据库操作
├── 03-table-design-and-data-types.mdx   # 表设计与数据类型
├── 04-crud-operations.mdx               # 增删改查实战
├── 05-advanced-queries-joins.mdx        # 高级查询与连接
├── 06-aggregation-and-grouping.mdx      # 聚合函数与分组
├── 07-subqueries-and-derived-tables.mdx # 子查询与派生表
├── 08-indexing-fundamentals.mdx         # 索引基础
├── 09-index-optimization-strategies.mdx # 索引优化策略
├── 10-query-optimization.mdx            # 查询性能优化
├── 11-transactions-and-locking.mdx      # 事务与锁机制
├── 12-database-design-principles.mdx    # 数据库设计原则
├── 13-views-and-stored-procedures.mdx   # 视图与存储过程
├── 14-triggers-and-events.mdx           # 触发器与事件
├── 15-user-management-and-security.mdx  # 用户管理与安全
├── 16-backup-and-recovery.mdx           # 备份与恢复
├── 17-replication-and-high-availability.mdx # 主从复制与高可用
├── 18-performance-tuning.mdx            # 性能调优实战
└── README.mdx                           # 系列索引
```

---

## 第一阶段：基础入门（3篇）

### 01. MySQL 简介与环境搭建

**目标**：了解 MySQL，搭建开发环境，完成第一个数据库操作

**内容要点**：

- 什么是 MySQL（发展历史、特点、应用场景）
- MySQL vs PostgreSQL vs MongoDB 对比
- 安装方式（Docker、本地安装、云服务）
- MySQL Workbench 安装与配置
- 命令行客户端使用
- 第一个数据库：创建、连接、查询
- Docker Compose 快速启动

**实战示例**：

```yaml
# Docker Compose 配置
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: testdb
    ports:
      - "3306:3306"
```

```sql
-- 第一个 SQL 查询
CREATE DATABASE my_first_db;
USE my_first_db;
CREATE TABLE users (id INT, name VARCHAR(50));
INSERT INTO users VALUES (1, '张三');
SELECT * FROM users;
```

---

### 02. SQL 基础与数据库操作

**目标**：掌握 SQL 基础语法和数据库管理命令

**内容要点**：

- SQL 语言分类（DDL、DML、DQL、DCL）
- 数据库（DATABASE）操作
  - CREATE DATABASE
  - SHOW DATABASES
  - USE DATABASE
  - DROP DATABASE
- 表（TABLE）基础操作
  - CREATE TABLE 基本语法
  - DESCRIBE 表结构
  - SHOW TABLES
  - DROP TABLE
- SQL 注释与命名规范
- MySQL 数据类型概述

**实战示例**：

```sql
-- 创建完整的数据库结构
CREATE DATABASE shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shop;

CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 03. 表设计与数据类型

**目标**：深入理解 MySQL 数据类型，设计合理的表结构

**内容要点**：

- 整数类型（TINYINT、SMALLINT、INT、BIGINT）
- 浮点类型（FLOAT、DOUBLE、DECIMAL）
- 字符串类型（CHAR、VARCHAR、TEXT）
- 日期时间类型（DATE、TIME、DATETIME、TIMESTAMP、YEAR）
- 二进制类型（BINARY、VARBINARY、BLOB）
- JSON 类型（MySQL 8.0+）
- 枚举与集合类型（ENUM、SET）
- NULL 值处理
- 字段属性（NOT NULL、DEFAULT、AUTO_INCREMENT）
- 字符集与排序规则（utf8mb4）

**实战示例**：

```sql
-- 用户表设计（涵盖多种数据类型）
CREATE TABLE users (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash CHAR(64) NOT NULL COMMENT '密码哈希',
  avatar_url VARCHAR(500),
  gender ENUM('male', 'female', 'other') DEFAULT 'other',
  birthday DATE,
  bio TEXT,
  preferences JSON,
  balance DECIMAL(10, 2) DEFAULT 0.00,
  status TINYINT UNSIGNED DEFAULT 1 COMMENT '1:active, 0:inactive',
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 第二阶段：核心操作（3篇）

### 04. 增删改查实战

**目标**：熟练掌握 CRUD 操作

**内容要点**：

- **CREATE（插入）**
  - INSERT INTO 基本语法
  - 批量插入
  - INSERT ... ON DUPLICATE KEY UPDATE
  - INSERT ... SELECT

- **READ（查询）**
  - SELECT 基本语法
  - WHERE 条件过滤
  - 比较运算符（=、!=、>、<、IN、BETWEEN、LIKE）
  - 逻辑运算符（AND、OR、NOT）
  - ORDER BY 排序
  - LIMIT 分页

- **UPDATE（更新）**
  - UPDATE 基本语法
  - 批量更新
  - 更新注意事项（WHERE 子句）

- **DELETE（删除）**
  - DELETE 基本语法
  - TRUNCATE TABLE
  - 删除注意事项

**实战示例**：

```sql
-- 批量插入用户
INSERT INTO users (username, email, password_hash) VALUES
  ('user1', 'user1@example.com', 'hash1'),
  ('user2', 'user2@example.com', 'hash2'),
  ('user3', 'user3@example.com', 'hash3');

-- 复杂查询示例
SELECT
  id,
  username,
  email,
  CASE
    WHEN status = 1 THEN '活跃'
    WHEN status = 0 THEN '禁用'
    ELSE '未知'
  END AS status_text
FROM users
WHERE created_at >= '2024-01-01'
  AND (username LIKE 'user%' OR email LIKE '%@example.com')
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;

-- 更新与删除
UPDATE users SET status = 0 WHERE last_login_at < '2023-01-01';
DELETE FROM users WHERE status = 0 AND created_at < '2022-01-01';
```

---

### 05. 高级查询与连接

**目标**：掌握多表查询和 JOIN 操作

**内容要点**：

- **JOIN 类型**
  - INNER JOIN 内连接
  - LEFT JOIN 左连接
  - RIGHT JOIN 右连接
  - CROSS JOIN 交叉连接
- **表别名**（AS）
- **自连接**（Self JOIN）
- **UNION 与 UNION ALL**
- **NULL 值处理**（COALESCE、IFNULL、NULLIF）
- **CASE 表达式**
- **字符串函数**（CONCAT、SUBSTRING、TRIM 等）
- **日期函数**（DATE_FORMAT、DATEDIFF、NOW 等）

**实战示例**：

```sql
-- 订单与用户关联查询
SELECT
  o.id AS order_id,
  o.total_amount,
  u.username,
  u.email,
  p.name AS product_name,
  oi.quantity,
  oi.price
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE o.status = 'completed'
  AND o.created_at >= '2024-01-01'
ORDER BY o.created_at DESC;

-- 左连接示例（找没有订单的用户）
SELECT u.id, u.username, u.email
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

-- 自连接示例（查找重复）
SELECT
  a.username,
  a.email,
  COUNT(*) as duplicate_count
FROM users a
INNER JOIN users b ON a.email = b.email AND a.id < b.id
GROUP BY a.username, a.email;
```

---

### 06. 聚合函数与分组

**目标**：掌握数据统计和分组查询

**内容要点**：

- **聚合函数**
  - COUNT 计数
  - SUM 求和
  - AVG 平均值
  - MAX/MIN 最大/最小值
- **GROUP BY 分组**
- **HAVING 过滤分组**
- **WITH ROLLUP** 生成超级聚合
- **窗口函数**（MySQL 8.0+）
  - ROW_NUMBER
  - RANK
  - DENSE_RANK
  - LAG/LEAD
- **DISTINCT 去重**

**实战示例**：

```sql
-- 销售统计
SELECT
  DATE(o.created_at) AS order_date,
  COUNT(DISTINCT o.user_id) AS unique_customers,
  COUNT(o.id) AS total_orders,
  SUM(o.total_amount) AS daily_revenue,
  AVG(o.total_amount) AS avg_order_value
FROM orders o
WHERE o.status = 'completed'
  AND o.created_at >= '2024-01-01'
GROUP BY DATE(o.created_at)
ORDER BY order_date DESC;

-- 窗口函数示例：用户订单排名
SELECT
  user_id,
  order_id,
  total_amount,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY total_amount DESC) AS rank_in_user,
  RANK() OVER (ORDER BY total_amount DESC) AS rank_all
FROM orders;
```

---

## 第三阶段：进阶查询（2篇）

### 07. 子查询与派生表

**目标**：掌握复杂查询技巧

**内容要点**：

- **子查询类型**
  - 标量子查询（返回单值）
  - 列子查询（返回单列）
  - 行子查询（返回单行）
  - 表子查询（返回多行多列）
- **子查询位置**
  - WHERE 子句中的子查询
  - FROM 子句中的派生表
  - SELECT 列表中的子查询
- **EXISTS 与 NOT EXISTS**
- **IN 与 NOT IN**
- **ANY、ALL、SOME**
- **相关子查询** vs **非相关子查询**
- **CTE（公用表表达式）**（MySQL 8.0+）
- **递归 CTE**

**实战示例**：

```sql
-- 查找比平均价格高的产品
SELECT id, name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- 派生表示例
SELECT
  u.username,
  u.email,
  order_stats.order_count,
  order_stats.total_spent
FROM users u
INNER JOIN (
  SELECT
    user_id,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_spent
  FROM orders
  WHERE status = 'completed'
  GROUP BY user_id
) order_stats ON u.id = order_stats.user_id
ORDER BY order_stats.total_spent DESC;

-- CTE 示例
WITH user_order_summary AS (
  SELECT
    user_id,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_spent
  FROM orders
  WHERE status = 'completed'
  GROUP BY user_id
)
SELECT
  u.username,
  COALESCE(o.order_count, 0) AS order_count,
  COALESCE(o.total_spent, 0) AS total_spent
FROM users u
LEFT JOIN user_order_summary o ON u.id = o.user_id
ORDER BY total_spent DESC;

-- 递归 CTE：组织架构树
WITH RECURSIVE org_tree AS (
  SELECT id, name, parent_id, 1 AS level
  FROM departments
  WHERE parent_id IS NULL

  UNION ALL

  SELECT d.id, d.name, d.parent_id, ot.level + 1
  FROM departments d
  INNER JOIN org_tree ot ON d.parent_id = ot.id
)
SELECT * FROM org_tree ORDER BY level, name;
```

---

### 08. 索引基础

**目标**：理解索引原理和基本使用

**内容要点**：

- **为什么需要索引**
- **索引类型**
  - 主键索引（PRIMARY KEY）
  - 唯一索引（UNIQUE）
  - 普通索引（INDEX）
  - 全文索引（FULLTEXT）
  - 空间索引（SPATIAL）
- **索引数据结构**
  - B+Tree 索引原理
  - Hash 索引
- **索引管理**
  - CREATE INDEX
  - DROP INDEX
  - SHOW INDEX
- **索引设计原则**
- **索引的优缺点**
- **EXPLAIN 查看执行计划**

**实战示例**：

```sql
-- 创建各种索引
CREATE INDEX idx_email ON users(email);
CREATE UNIQUE INDEX idx_username ON users(username);
CREATE FULLTEXT INDEX idx_content ON articles(title, content);

-- 复合索引
CREATE INDEX idx_status_created ON orders(status, created_at);

-- 查看索引
SHOW INDEX FROM users;

-- 分析查询执行计划
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';
EXPLAIN SELECT * FROM orders WHERE status = 'completed' ORDER BY created_at DESC;
```

---

## 第四阶段：性能优化（3篇）

### 09. 索引优化策略

**目标**：掌握索引优化的高级技巧

**内容要点**：

- **复合索引设计**
  - 最左前缀原则
  - 索引列顺序选择
  - 覆盖索引
- **索引使用场景分析**
  - 何时使用索引
  - 何时不使用索引
- **索引失效情况**
  - 函数运算
  - 类型转换
  - LIKE 模糊查询
  - OR 条件
  - IS NULL
- **索引优化技巧**
  - 前缀索引
  - 降序索引（MySQL 8.0+）
  - 函数索引（MySQL 8.0+）
  - 不可见索引（MySQL 8.0+）
- **索引监控与维护**
  - 慢查询日志
  - 索引使用率分析
  - 索引重建

**实战示例**：

```sql
-- 覆盖索引示例
-- 创建复合索引
CREATE INDEX idx_status_created_total ON orders(status, created_at, total_amount);

-- 这个查询可以直接从索引获取数据，不需要回表
SELECT status, created_at, total_amount
FROM orders
WHERE status = 'completed'
ORDER BY created_at DESC;

-- 前缀索引（适用于长文本字段）
CREATE INDEX idx_bio_prefix ON users(bio(50));

-- 函数索引（MySQL 8.0+）
CREATE INDEX idx_email_lower ON users((LOWER(email)));

-- 降序索引
CREATE INDEX idx_price_desc ON products(price DESC);

-- 分析慢查询
-- 开启慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- 查看慢查询
SELECT * FROM mysql.slow_log ORDER BY query_time DESC LIMIT 10;
```

---

### 10. 查询性能优化

**目标**：掌握各种查询优化技巧

**内容要点**：

- **EXPLAIN 详解**
  - id、select_type、table
  - type（访问类型）
  - possible_keys、key
  - rows、Extra
- **查询优化策略**
  - 避免SELECT \*
  - 合理使用 LIMIT
  - 避免子查询，改用 JOIN
  - 避免过多 JOIN
  - 批量操作
- **分区表**（Partitioning）
- **查询缓存**
- **临时表与派生表优化**
- **排序优化**（filesort）
- **MySQL 配置优化**
  - innodb_buffer_pool_size
  - query_cache_size
  - max_connections

**实战示例**：

```sql
-- 优化前
SELECT * FROM orders WHERE user_id IN (SELECT user_id FROM vip_users);

-- 优化后（使用 JOIN）
SELECT o.* FROM orders o
INNER JOIN vip_users v ON o.user_id = v.user_id;

-- 避免函数计算
-- 不推荐
WHERE DATE(created_at) = '2024-01-01'

-- 推荐
WHERE created_at >= '2024-01-01' AND created_at < '2024-01-02'

-- 批量插入优化
INSERT INTO orders (user_id, total_amount) VALUES
  (1, 100.00),
  (2, 200.00),
  (3, 300.00);

-- 分区表示例
CREATE TABLE orders (
  id BIGINT,
  user_id BIGINT,
  created_at TIMESTAMP
) PARTITION BY RANGE (YEAR(created_at)) (
  PARTITION p2023 VALUES LESS THAN (2024),
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026)
);
```

---

### 11. 事务与锁机制

**目标**：理解事务和锁，保证数据一致性

**内容要点**：

- **事务 ACID 特性**
  - 原子性（Atomicity）
  - 一致性（Consistency）
  - 隔离性（Isolation）
  - 持久性（Durability）
- **事务控制语句**
  - START TRANSACTION / BEGIN
  - COMMIT
  - ROLLBACK
  - SAVEPOINT
- **事务隔离级别**
  - READ UNCOMMITTED
  - READ COMMITTED
  - REPEATABLE READ（MySQL 默认）
  - SERIALIZABLE
- **锁类型**
  - 共享锁（Shared Lock）
  - 排他锁（Exclusive Lock）
  - 意向锁
  - 记录锁、间隙锁、临键锁
- **死锁与预防**
- **乐观锁 vs 悲观锁**

**实战示例**：

```sql
-- 基本事务
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
-- 或 ROLLBACK;

-- 保存点
START TRANSACTION;

INSERT INTO orders VALUES (1, 100.00);
SAVEPOINT order_inserted;

UPDATE inventory SET stock = stock - 1 WHERE product_id = 1;

-- 如果出现问题，可以回滚到保存点
-- ROLLBACK TO order_inserted;

COMMIT;

-- 设置隔离级别
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 查看当前隔离级别
SELECT @@transaction_isolation;

-- 悲观锁示例（SELECT FOR UPDATE）
START TRANSACTION;

SELECT stock FROM products WHERE id = 1 FOR UPDATE;
-- 检查库存并更新
UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock > 0;

COMMIT;

-- 乐观锁示例（版本号）
UPDATE products
SET stock = stock - 1,
    version = version + 1
WHERE id = 1 AND version = 5;
-- 检查 affected_rows，如果为0说明版本冲突
```

---

## 第五阶段：高级特性（4篇）

### 12. 数据库设计原则

**目标**：掌握规范化的数据库设计

**内容要点**：

- **数据库设计三范式**
  - 第一范式（1NF）
  - 第二范式（2NF）
  - 第三范式（3NF）
- **反规范化**（Denormalization）
- **E-R 图设计**
- **表关系设计**
  - 一对一（1:1）
  - 一对多（1:N）
  - 多对多（M:N）
- **外键约束**
- **级联操作**（CASCADE）
- **设计最佳实践**
- **电商数据库设计案例**

**实战示例**：

```sql
-- 完整的电商数据库设计

-- 用户表
CREATE TABLE users (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 分类表
CREATE TABLE categories (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  parent_id BIGINT UNSIGNED,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 商品表
CREATE TABLE products (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  category_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT UNSIGNED DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  INDEX idx_category (category_id),
  INDEX idx_price (price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 订单表
CREATE TABLE orders (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  order_no VARCHAR(50) NOT NULL UNIQUE,
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'paid', 'shipped', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_order_no (order_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 订单明细表
CREATE TABLE order_items (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

### 13. 视图与存储过程

**目标**：掌握高级编程对象

**内容要点**：

- **视图（VIEW）**
  - 创建视图
  - 修改视图
  - 删除视图
  - 视图的作用与限制
- **存储过程（PROCEDURE）**
  - 创建存储过程
  - 参数（IN、OUT、INOUT）
  - 变量与流程控制
  - 错误处理
- **存储函数（FUNCTION）**
- **触发器（TRIGGER）**（预告）
- **事件调度器（EVENT）**（预告）

**实战示例**：

```sql
-- 创建视图：用户订单汇总
CREATE VIEW user_order_summary AS
SELECT
  u.id AS user_id,
  u.username,
  u.email,
  COUNT(o.id) AS order_count,
  COALESCE(SUM(o.total_amount), 0) AS total_spent,
  MAX(o.created_at) AS last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username, u.email;

-- 使用视图
SELECT * FROM user_order_summary WHERE order_count > 5;

-- 创建存储过程：创建订单
DELIMITER //

CREATE PROCEDURE create_order(
  IN p_user_id BIGINT,
  IN p_items JSON,
  OUT p_order_id BIGINT
)
BEGIN
  DECLARE v_total_amount DECIMAL(10, 2) DEFAULT 0;
  DECLARE v_exit_handler BOOLEAN DEFAULT FALSE;

  -- 异常处理
  DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    SET p_order_id = 0;
  END;

  START TRANSACTION;

  -- 计算总金额
  SELECT SUM(price * quantity)
  INTO v_total_amount
  FROM JSON_TABLE(
    p_items,
    '$[*]' COLUMNS(
      product_id BIGINT PATH '$.product_id',
      quantity INT PATH '$.quantity',
      price DECIMAL(10, 2) PATH '$.price'
    )
  ) AS items;

  -- 创建订单
  INSERT INTO orders (user_id, order_no, total_amount, status)
  VALUES (p_user_id, UUID(), v_total_amount, 'pending');

  SET p_order_id = LAST_INSERT_ID();

  -- 插入订单明细
  INSERT INTO order_items (order_id, product_id, quantity, price, subtotal)
  SELECT
    p_order_id,
    product_id,
    quantity,
    price,
    price * quantity AS subtotal
  FROM JSON_TABLE(
    p_items,
    '$[*]' COLUMNS(
      product_id BIGINT PATH '$.product_id',
      quantity INT PATH '$.quantity',
      price DECIMAL(10, 2) PATH '$.price'
    )
  ) AS items;

  -- 更新库存
  UPDATE products p
  INNER JOIN JSON_TABLE(
    p_items,
    '$[*]' COLUMNS(
      product_id BIGINT PATH '$.product_id',
      quantity INT PATH '$.quantity'
    )
  ) AS items ON p.id = items.product_id
  SET p.stock = p.stock - items.quantity;

  COMMIT;
END //

DELIMITER ;

-- 调用存储过程
CALL create_order(1, '[{"product_id": 1, "quantity": 2, "price": 100.00}]', @order_id);
SELECT @order_id;

-- 创建存储函数：计算折扣
DELIMITER //

CREATE FUNCTION calculate_discount(
  p_total_amount DECIMAL(10, 2),
  p_user_level INT
) RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
  DECLARE v_discount_rate DECIMAL(3, 2) DEFAULT 0;

  IF p_total_amount >= 1000 THEN
    SET v_discount_rate = 0.1;
  ELSEIF p_total_amount >= 500 THEN
    SET v_discount_rate = 0.05;
  END IF;

  IF p_user_level >= 3 THEN
    SET v_discount_rate = v_discount_rate + 0.05;
  END IF;

  RETURN p_total_amount * (1 - v_discount_rate);
END //

DELIMITER ;

-- 使用函数
SELECT calculate_discount(600.00, 3);
```

---

### 14. 触发器与事件

**目标**：自动化数据库操作

**内容要点**：

- **触发器（TRIGGER）**
  - 触发时机（BEFORE/AFTER）
  - 触发事件（INSERT/UPDATE/DELETE）
  - 触发器限制
  - OLD 和 NEW 引用
- **事件调度器（EVENT）**
  - 创建事件
  - 事件调度
  - 定时任务
- **触发器使用场景**
- **事件使用场景**

**实战示例**：

```sql
-- 触发器 1：记录用户操作日志
DELIMITER //

CREATE TRIGGER trg_users_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  INSERT INTO user_logs (user_id, action, created_at)
  VALUES (NEW.id, 'user_created', NOW());
END //

CREATE TRIGGER trg_users_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
  IF OLD.status != NEW.status THEN
    INSERT INTO user_logs (user_id, action, old_value, new_value, created_at)
    VALUES (NEW.id, 'status_changed', OLD.status, NEW.status, NOW());
  END IF;
END //

DELIMITER ;

-- 触发器 2：自动更新时间戳
DELIMITER //

CREATE TRIGGER trg_users_before_update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
  SET NEW.updated_at = NOW();
END //

DELIMITER ;

-- 触发器 3：库存预警
DELIMITER //

CREATE TRIGGER trg_products_after_update
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
  IF NEW.stock < 10 AND NEW.stock != OLD.stock THEN
    INSERT INTO alerts (type, message, reference_id, created_at)
    VALUES ('low_stock', CONCAT('Product ', NEW.name, ' stock is low: ', NEW.stock), NEW.id, NOW());
  END IF;
END //

DELIMITER ;

-- 事件 1：每天生成销售报表
DELIMITER //

CREATE EVENT evn_daily_sales_report
ON SCHEDULE EVERY 1 DAY
STARTS '2024-01-01 00:00:00'
DO
BEGIN
  INSERT INTO daily_reports (report_date, total_orders, total_revenue)
  SELECT
    DATE(created_at) AS report_date,
    COUNT(*) AS total_orders,
    SUM(total_amount) AS total_revenue
  FROM orders
  WHERE DATE(created_at) = CURDATE() - INTERVAL 1 DAY
  GROUP BY DATE(created_at);
END //

DELIMITER ;

-- 事件 2：清理过期数据
DELIMITER //

CREATE EVENT evn_cleanup_old_logs
ON SCHEDULE EVERY 1 MONTH
DO
BEGIN
  DELETE FROM user_logs WHERE created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH);
END //

DELIMITER ;

-- 开启事件调度器
SET GLOBAL event_scheduler = ON;

-- 查看所有事件
SHOW EVENTS;
```

---

### 15. 用户管理与安全

**目标**：掌握 MySQL 安全管理

**内容要点**：

- **用户管理**
  - CREATE USER
  - DROP USER
  - ALTER USER
  - RENAME USER
- **权限管理**
  - GRANT 授权
  - REVOKE 撤销权限
  - 权限级别（全局、数据库、表、列）
  - 常用权限列表
- **角色管理**（MySQL 8.0+）
  - CREATE ROLE
  - GRANT ROLE
  - SET ROLE
- **密码管理**
  - 密码策略
  - 密码过期
  - 密码重置
- **连接安全**
  - SSL 连接
  - 限制访问 IP
- **SQL 注入防护**
- **安全最佳实践**

**实战示例**：

```sql
-- 创建用户
CREATE USER 'app_user'@'%' IDENTIFIED BY 'SecurePassword123!';
CREATE USER 'readonly_user'@'192.168.1.%' IDENTIFIED BY 'ReadOnlyPass123!';
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'AdminPass123!';

-- 授予权限
GRANT SELECT, INSERT, UPDATE, DELETE ON shop.* TO 'app_user'@'%';
GRANT SELECT ON shop.* TO 'readonly_user'@'192.168.1.%';
GRANT ALL PRIVILEGES ON *.* TO 'admin_user'@'localhost' WITH GRANT OPTION;

-- 刷新权限
FLUSH PRIVILEGES;

-- 查看权限
SHOW GRANTS FOR 'app_user'@'%';

-- 撤销权限
REVOKE DELETE ON shop.* FROM 'app_user'@'%';

-- 使用角色（MySQL 8.0+）
CREATE ROLE 'app_readwrite';
CREATE ROLE 'app_readonly';

GRANT SELECT, INSERT, UPDATE, DELETE ON shop.* TO 'app_readwrite';
GRANT SELECT ON shop.* TO 'app_readonly';

GRANT 'app_readwrite' TO 'app_user'@'%';
GRANT 'app_readonly' TO 'readonly_user'@'192.168.1.%';

-- 设置默认角色
SET DEFAULT ROLE ALL TO 'app_user'@'%';

-- 修改密码
ALTER USER 'app_user'@'%' IDENTIFIED BY 'NewSecurePassword456!';

-- 密码过期策略
ALTER USER 'app_user'@'%' PASSWORD EXPIRE INTERVAL 90 DAY;

-- 锁定/解锁用户
ALTER USER 'app_user'@'%' ACCOUNT LOCK;
ALTER USER 'app_user'@'%' ACCOUNT UNLOCK;

-- 删除用户
DROP USER 'old_user'@'%';

-- 查看所有用户
SELECT user, host FROM mysql.user;
```

---

## 第六阶段：运维实战（3篇）

### 16. 备份与恢复

**目标**：掌握数据备份与恢复策略

**内容要点**：

- **备份类型**
  - 逻辑备份（mysqldump）
  - 物理备份（MySQL Enterprise Backup / Percona XtraBackup）
  - 完全备份、增量备份、差异备份
- **mysqldump 使用**
  - 基本用法
  - 备份单个数据库
  - 备份所有数据库
  - 备份特定表
  - 恢复数据
- **二进制日志（binlog）**
  - 开启 binlog
  - binlog 格式
  - 使用 binlog 恢复
- **备份策略设计**
  - 全量 + 增量
  - 自动化备份脚本
  - 备份验证
- **云服务备份**
  - AWS RDS 备份
  - 阿里云 RDS 备份

**实战示例**：

```bash
# mysqldump 备份
# 备份单个数据库
mysqldump -u root -p shop > shop_backup_$(date +%Y%m%d).sql

# 备份所有数据库
mysqldump -u root -p --all-databases > all_databases_backup.sql

# 备份特定表
mysqldump -u root -p shop users orders > shop_users_orders.sql

# 压缩备份
mysqldump -u root -p shop | gzip > shop_backup.sql.gz

# 恢复数据
mysql -u root -p shop < shop_backup_20240101.sql

# 从压缩备份恢复
gunzip < shop_backup.sql.gz | mysql -u root -p shop
```

```sql
-- 开启 binlog（my.cnf 配置）
[mysqld]
log-bin=mysql-bin
binlog_format=ROW
expire_logs_days=7

-- 查看当前 binlog 文件
SHOW MASTER STATUS;

-- 查看 binlog 事件
SHOW BINLOG EVENTS IN 'mysql-bin.000001' LIMIT 10;

-- 使用 mysqlbinlog 工具恢复
mysqlbinlog --start-datetime="2024-01-01 00:00:00" \
            --stop-datetime="2024-01-02 00:00:00" \
            mysql-bin.000001 | mysql -u root -p
```

```bash
#!/bin/bash
# 自动化备份脚本

BACKUP_DIR="/backup/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
MYSQL_USER="root"
MYSQL_PASSWORD="your_password"
RETENTION_DAYS=30

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份所有数据库
mysqldump -u $MYSQL_USER -p$MYSQL_PASSWORD \
  --all-databases \
  --single-transaction \
  --routines \
  --triggers \
  --events \
  | gzip > $BACKUP_DIR/all_databases_$DATE.sql.gz

# 删除过期备份
find $BACKUP_DIR -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete

# 记录日志
echo "Backup completed at $(date)" >> $BACKUP_DIR/backup.log
```

---

### 17. 主从复制与高可用

**目标**：理解 MySQL 复制原理，搭建高可用架构

**内容要点**：

- **复制原理**
  - binlog
  - relay log
  - 复制线程（IO、SQL）
- **复制类型**
  - 异步复制
  - 半同步复制
  - 全同步复制（组复制）
- **复制模式**
  - 主从复制（Master-Slave）
  - 主主复制（Master-Master）
  - 级联复制
- **GTID 复制**
- **高可用方案**
  - MySQL Replication
  - MySQL InnoDB Cluster
  - Galera Cluster
  - 第三方方案（ProxySQL、HAProxy）
- **读写分离**
- **故障切换**

**实战示例**：

```sql
-- 主库配置（my.cnf）
[mysqld]
server-id=1
log-bin=mysql-bin
binlog_format=ROW
gtid-mode=ON
enforce-gtid-consistency=ON

-- 从库配置（my.cnf）
[mysqld]
server-id=2
relay-log=relay-bin
read-only=1
gtid-mode=ON
enforce-gtid-consistency=ON

-- 在主库创建复制用户
CREATE USER 'replication_user'@'%' IDENTIFIED BY 'ReplicationPass123!';
GRANT REPLICATION SLAVE ON *.* TO 'replication_user'@'%';

-- 查看主库状态
SHOW MASTER STATUS;

-- 在从库配置复制
CHANGE MASTER TO
  MASTER_HOST='master_host_ip',
  MASTER_USER='replication_user',
  MASTER_PASSWORD='ReplicationPass123!',
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=154;

-- 启动复制
START SLAVE;

-- 查看复制状态
SHOW SLAVE STATUS\G

-- 使用 GTID 配置（推荐）
CHANGE MASTER TO
  MASTER_HOST='master_host_ip',
  MASTER_USER='replication_user',
  MASTER_PASSWORD='ReplicationPass123!',
  MASTER_AUTO_POSITION=1;

-- 停止/启动复制
STOP SLAVE;
START SLAVE;

-- 跳过复制错误（谨慎使用）
SET GLOBAL sql_slave_skip_counter = 1;
START SLAVE;
```

```yaml
# Docker Compose - 主从复制
version: "3"
services:
  mysql-master:
    image: mysql:8.0
    container_name: mysql-master
    environment:
      MYSQL_ROOT_PASSWORD: root123
    ports:
      - "3306:3306"
    volumes:
      - ./master.cnf:/etc/mysql/conf.d/custom.cnf
      - master-data:/var/lib/mysql

  mysql-slave:
    image: mysql:8.0
    container_name: mysql-slave
    environment:
      MYSQL_ROOT_PASSWORD: root123
    ports:
      - "3307:3306"
    volumes:
      - ./slave.cnf:/etc/mysql/conf.d/custom.cnf
      - slave-data:/var/lib/mysql

volumes:
  master-data:
  slave-data:
```

---

### 18. 性能调优实战

**目标**：综合运用所学知识进行性能调优

**内容要点**：

- **性能分析工具**
  - EXPLAIN 执行计划
  - SHOW PROFILE
  - Performance Schema（MySQL 5.7+）
  - Slow Query Log
- **配置参数优化**
  - InnoDB Buffer Pool
  - 连接数（max_connections）
  - 线程缓存（thread_cache_size）
  - 查询缓存（query_cache_size，MySQL 8.0 已移除）
  - 临时表大小（tmp_table_size）
- **表结构优化**
  - 垂直拆分
  - 水平拆分（分表）
  - 选择合适的数据类型
  - 字段顺序优化
- **SQL 优化技巧汇总**
- **监控指标**
  - QPS/TPS
  - 连接数
  - 慢查询数量
  - 缓冲池命中率
- **性能优化案例**

**实战示例**：

```sql
-- Performance Schema 使用
-- 启用 Performance Schema
UPDATE performance_schema.setup_instruments
SET ENABLED = 'YES', TIMED = 'YES'
WHERE NAME LIKE '%statement/%';

-- 查看最慢的 SQL
SELECT
  DIGEST_TEXT,
  COUNT_STAR AS exec_count,
  AVG_TIMER_WAIT/1000000000000 AS avg_sec,
  SUM_TIMER_WAIT/1000000000000 AS total_sec
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC
LIMIT 10;

-- 查看表 IO 统计
SELECT
  object_schema,
  object_name,
  count_read,
  count_write,
  sum_timer_read/1000000000000 AS read_time_sec,
  sum_timer_write/1000000000000 AS write_time_sec
FROM performance_schema.table_io_waits_summary_by_table
ORDER BY sum_timer_wait DESC
LIMIT 10;

-- SHOW PROFILE
SET profiling = 1;

-- 执行你的查询
SELECT * FROM users WHERE email = 'user@example.com';

-- 查看性能分析
SHOW PROFILES;
SHOW PROFILE FOR QUERY 1;

-- 慢查询分析
SELECT
  query_time,
  lock_time,
  rows_sent,
  rows_examined,
  sql_text
FROM mysql.slow_log
ORDER BY query_time DESC
LIMIT 20;

-- 优化配置参数（my.cnf）
[mysqld]
# InnoDB 配置
innodb_buffer_pool_size = 4G
innodb_buffer_pool_instances = 4
innodb_log_file_size = 512M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# 连接配置
max_connections = 500
connect_timeout = 5
wait_timeout = 600
interactive_timeout = 600

# 临时表
tmp_table_size = 256M
max_heap_table_size = 256M

# 二进制日志
max_binlog_size = 1G
binlog_cache_size = 4M
```

```sql
-- 性能优化案例
-- 问题：订单列表查询很慢
EXPLAIN SELECT
  o.*,
  u.username,
  COUNT(oi.id) AS item_count
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.status = 'completed'
GROUP BY o.id
ORDER BY o.created_at DESC
LIMIT 20;

-- 优化方案 1：添加覆盖索引
CREATE INDEX idx_status_created_user ON orders(status, created_at, user_id);

-- 优化方案 2：先分页再关联
SELECT
  o.*,
  u.username,
  (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) AS item_count
FROM (
  SELECT * FROM orders
  WHERE status = 'completed'
  ORDER BY created_at DESC
  LIMIT 20
) o
LEFT JOIN users u ON o.user_id = u.id;

-- 优化方案 3：使用缓存
-- 对于热门查询，可以将结果缓存到 Redis
```

---

## 附录

### A. 开发工具推荐

- **数据库管理**：
  - MySQL Workbench（官方免费）
  - DBeaver（免费开源）
  - TablePlus（付费，体验优秀）
  - Navicat（付费）
- **命令行工具**：
  - MySQL Shell（官方）
  - mycli（自动补全）
- **性能分析**：
  - pt-query-digest（Percona Toolkit）
  - MySQL Enterprise Monitor
  - Percona Monitoring and Management (PMM)
- **测试数据**：
  - Sakila Sample Database
  - Employees Sample Database
- **在线资源**：
  - MySQL 官方文档
  - MySQL Performance Blog

### B. 常见问题与解决方案

1. **中文乱码**：统一使用 utf8mb4 字符集
2. **连接数过多**：优化 max_connections，使用连接池
3. **查询慢**：使用 EXPLAIN 分析，添加索引
4. **死锁**：减少事务大小，统一访问顺序
5. **磁盘满**：清理 binlog，优化数据存储

### C. 进阶主题

- 分库分表（Sharding-JDBC、Vitess）
- 读写分离中间件（ProxySQL、MaxScale）
- 分布式数据库（TiDB、CockroachDB）
- 运维自动化（Ansible、Terraform）
- 监控告警（Prometheus + Grafana）
- CI/CD 集成

---

## 写作规范

### 每篇文章结构

````markdown
---
title: "文章标题"
date: "YYYY-MM-DD"
summary: "一句话总结（100字以内）"
tags: ["MySQL", "相关标签"]
category: "mysql"
cover: ""
draft: false
series: "MySQL 渐进式学习指南"
seriesOrder: N
---

## 前言/背景

解释为什么需要学习这个主题，它解决了什么问题。

## 核心概念

用通俗易懂的语言解释核心概念，配合图示和示例。

## 实战演练

### 示例 1：标题

```sql
-- 完整可运行的 SQL
```
````

**代码解释**：详细说明

### 示例 2：标题

...

## 最佳实践

总结 3-5 个关键要点

## 常见问题

Q&A 格式

## 总结

回顾核心内容

## 下一步

---

- **上一篇**：[文章标题](../文章链接)
- **下一篇**：[文章标题](../文章链接)

```

### 代码示例要求

1. **完整性**：每个示例都是可独立运行的代码
2. **渐进式**：从简单到复杂，逐步深入
3. **注释**：关键 SQL 添加中文注释
4. **最佳实践**：展示推荐的写法
5. **错误示例**：对比不推荐的写法

### 实战项目贯穿

所有文章围绕统一的实战项目展开：**电商系统数据库**

**核心模块**：
- 用户模块（注册、登录、资料）
- 商品模块（分类、库存、价格）
- 订单模块（购物车、订单、支付）
- 营销模块（优惠券、促销）
- 内容模块（商品评价、咨询）

这样读者可以在学习过程中逐步构建一个完整的电商数据库。

---

## 学习路径图

```

┌─────────────────────────────────────────────────────────────┐
│ MySQL 学习路径 │
├─────────────────────────────────────────────────────────────┤
│ │
│ 第一阶段：基础入门 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 01. 环境搭建 │ ───► │ 02. SQL 基础 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────┐ │
│ │ 03. 表设计 │ │
│ └──────────────────┘ │
│ │ │
│ ▼ │
│ 第二阶段：核心操作 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 04. CRUD 实战 │ ───► │ 05. JOIN 查询 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │ │
│ ▼ ▼ │
│ ┌──────────────────┐ │
│ │ 06. 聚合分组 │ │
│ └──────────────────┘ │
│ │ │
│ ▼ │
│ 第三阶段：进阶查询 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 07. 子查询 CTE │ ───► │ 08. 索引基础 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │ │
│ ▼ │
│ 第四阶段：性能优化 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 09. 索引优化 │ 10. 查询优化 │ 11. 事务锁 │ │
│ └─────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ 第五阶段：高级特性 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 12. 数据库设计 │ 13. 视图存储过程 │ │
│ ├─────────────────────────────────────────────┤ │
│ │ 14. 触发器事件 │ 15. 安全管理 │ │
│ └─────────────────────────────────────────────┘ │
│ │ │
│ ▼ │
│ 第六阶段：运维实战 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 16. 备份恢复 │ 17. 主从复制 │ 18. 性能调优 │ │
│ └─────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘

```

---

## 预期效果

完成本系列学习后，读者将能够：

1. ✅ 独立搭建 MySQL 数据库环境
2. ✅ 熟练编写 SQL 查询语句
3. ✅ 设计规范的数据库表结构
4. ✅ 理解索引原理并进行优化
5. ✅ 掌握事务处理和并发控制
6. ✅ 编写存储过程和触发器
7. ✅ 进行数据库备份与恢复
8. ✅ 搭建主从复制架构
9. ✅ 进行性能调优和问题诊断
10. ✅ 具备企业级数据库管理能力

---

## 版本信息

- **MySQL**：8.0.x（LTS）
- **操作系统**：Linux / macOS / Windows
- **Docker**：20.x
- *计划创建日期：2026-03-23*
- *预计完成时间：2-3个月（每周 1-2 篇）*
```
