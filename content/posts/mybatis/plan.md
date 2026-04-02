# MyBatis 渐进式学习计划

## 背景

MyBatis 是国内 Java 企业级开发中最常用的持久层框架，约 80% 的国内公司使用 MyBatis 作为数据访问层。相比 JPA/Hibernate，MyBatis 的核心优势在于 SQL 可控——当你的查询需要 JOIN 五张表、加三个动态条件、还要手动控制查询字段时，MyBatis 让你精确掌控每一条 SQL，而不是和 ORM 的自动生成行为"猜谜"。

这个系列的目标是：**用一个内容管理系统（CMS）从建表到优化，展示 MyBatis 在真实项目中的完整用法**。

### 技术栈

- **MyBatis 3.5+**：持久层框架
- **MyBatis-Plus 3.5+**：MyBatis 增强工具
- **Spring Boot 3.x**：应用框架
- **MySQL 8.0+**：关系型数据库
- **PageHelper 2.x**：分页插件

### 主线案例：技术博客的内容管理系统

你在一个技术团队负责后端开发，产品要求做一个博客 CMS——管理文章、分类、标签、评论。这个系统有这些特点：

- 查询条件复杂（按分类、标签、时间范围、状态筛选文章）
- 表关联多（文章关联作者、标签、评论）
- 数据量大（热门文章列表需要分页和缓存）
- 需要和 Spring Boot 整合（现代项目标准）

你用 MyBatis 从零搭建这套系统，逐步解决真实场景中的每个问题。

---

## 博客目录结构

```
content/posts/mybatis/
├── plan.md
├── 01-quick-start.mdx
├── 02-dynamic-sql.mdx
├── 03-result-mapping.mdx
├── 04-spring-boot-integration.mdx
├── 05-mybatis-plus.mdx
└── 06-performance-optimization.mdx
```

---

## 学习阶段划分

```
基础篇（1-2篇）：快速上手，建立直觉
  → 独立小案例降低入门门槛

核心篇（3-4篇）：深入原理，主线案例开始
  → CMS 系统的数据库设计和查询

进阶篇（5-6篇）：真实场景，案例持续演进
  → MyBatis-Plus 提效 + 性能优化
```

---

## 每篇文章大纲

### 01. 快速入门：告别繁琐的 JDBC

**文件名**：`01-quick-start.mdx`

**核心问题**：JDBC 写一个查询要 30 行代码，还得手动处理连接、异常、映射。有没有更优雅的方式？

**主线案例**：用 MyBatis 实现博客文章的 CRUD——从建表到查询，体验 MyBatis 如何把 30 行代码变成 3 行

**内容要点**：

1. JDBC 的痛点：连接管理、SQL 拼接、结果映射、异常处理——一个查询就要 30 行
2. MyBatis 的解决思路：SQL 与代码分离、自动映射、动态 SQL
3. MyBatis vs Hibernate：什么时候该选 MyBatis（复杂查询、性能可控）什么时候选 JPA（简单 CRUD、快速开发）
4. 环境搭建：Maven 依赖、核心配置文件（mybatis-config.xml）
5. 第一个程序：文章表的 CRUD，从 Mapper 接口到 XML 到调用
6. 核心概念：SqlSessionFactory（全局唯一）和 SqlSession（每次创建）

**与前篇关联**：无（系列第一篇）

---

### 02. 动态 SQL：优雅处理复杂查询条件

**核心问题**：文章搜索页有 5 个筛选条件——分类、标签、关键词、发布时间、状态。用户可能只填 1 个，也可能全填。怎么写一个查询搞定所有组合？

**主线案例**：为 CMS 的文章搜索接口编写动态 SQL——从简单的条件判断到复杂的组合查询

**内容要点**：

1. 为什么需要动态 SQL：硬编码 WHERE 条件的问题——2 个条件 4 种组合，5 个条件 32 种组合
2. if 标签：最基础的条件判断，注意 AND 前缀的问题
3. where 标签：自动处理 AND/OR 前缀，比手写 trim 更直观
4. set 标签：动态更新字段，避免全量 UPDATE
5. foreach 标签：IN 查询和批量插入
6. choose/when/otherwise：多选一场景（类似 switch）
7. sql 片段和 bind：复用 SQL、处理 LIKE 模糊查询
8. 常见坑：`<if test>` 中的 OGNL 表达式、`#{}` vs `${}` 的安全区别

**与前篇关联**：上篇实现了基础 CRUD，这篇解决真实场景中的动态查询需求

---

### 03. 结果映射与关联查询

**核心问题**：文章详情页需要展示文章内容、作者信息、标签列表、评论列表。这些数据分散在不同表中，怎么一次查询组装成完整对象？

**主线案例**：为文章详情页设计关联查询——从简单映射到一对多嵌套，处理 N+1 性能问题

**内容要点**：

1. resultType vs resultMap：什么时候用自动映射、什么时候必须手动映射
2. 驼峰命名转换：`mapUnderscoreToCamelCase` 的作用和注意事项
3. 一对一关联（association）：文章 → 作者详情，嵌套查询 vs 嵌套结果
4. 一对多关联（collection）：文章 → 标签列表、文章 → 评论列表
5. N+1 问题：什么是 N+1、为什么会发生、如何避免（嵌套结果、批量加载）
6. 延迟加载：什么时候该用、什么时候不该用、配置方式
7. 选择建议：什么场景用嵌套查询、什么场景用嵌套结果

**与前篇关联**：上篇解决了动态查询，这篇处理查询结果的关联组装

---

### 04. Spring Boot 整合 MyBatis：现代化开发方式

**核心问题**：前 3 篇用的是原生 MyBatis，但实际项目都是 Spring Boot。怎么把 MyBatis 整合进 Spring Boot？整合后有哪些变化？

**主线案例**：把 CMS 系统迁移到 Spring Boot——用 Starter 自动配置，搭建完整的 Controller → Service → Mapper 三层架构

**内容要点**：

1. mybatis-spring-boot-starter：自动配置做了什么、配置项有哪些
2. @Mapper 注解 vs @MapperScan：两种注册 Mapper 的方式
3. 注解 vs XML：简单 SQL 用注解（@Select/@Insert）、复杂 SQL 用 XML，混合使用
4. application.yml 配置：数据源、Mapper 位置、别名包、全局设置
5. 事务管理：@Transactional 在 Service 层的使用，什么时候需要手动控制事务
6. 多数据源配置：读写分离场景下的配置方式
7. PageHelper 整合：在 Spring Boot 中使用分页插件

**与前篇关联**：前 3 篇用原生 MyBatis 讲原理，这篇把知识迁移到真实项目架构中

---

### 05. MyBatis-Plus：让 CRUD 开发提效

**核心问题**：CMS 有 6 张表，每张表都要写 Mapper 接口、XML、Service、Controller。80% 的代码都是重复的增删改查。能不能只写业务逻辑？

**主线案例**：用 MyBatis-Plus 重构 CMS 的通用 CRUD——把重复代码量减少 70%

**内容要点**：

1. MyBatis-Plus 是什么：不是替代 MyBatis，而是在其基础上的增强
2. BaseMapper：继承即获得 CRUD 方法，不需要写 XML
3. IService 和 ServiceImpl：Service 层也自动生成
4. 条件构造器：LambdaQueryWrapper / LambdaUpdateWrapper，替代动态 SQL 中的简单条件
5. 代码生成器：根据数据库表自动生成 Entity、Mapper、Service、Controller
6. 全局配置：主键策略、逻辑删除、自动填充（create_time / update_time）
7. MyBatis-Plus 的局限：复杂 JOIN 查询还是要写 XML，动态 SQL 复杂场景不适合 Wrapper

**与前篇关联**：上篇用原生 MyBatis + Spring Boot 搭好了架构，这篇用 MP 简化重复代码

---

### 06. 性能优化实战：让你的查询快起来

**核心问题**：CMS 上线后，文章列表接口响应 2 秒，热门文章接口被频繁调用。怎么优化？

**主线案例**：排查和优化 CMS 的性能问题——从慢查询定位到批量操作到缓存策略

**内容要点**：

1. 性能问题的常见来源：N+1 查询、没有索引、查了不需要的字段、频繁查询相同数据
2. 批量操作优化：foreach 批量 INSERT vs BATCH Executor，什么场景用哪种
3. 一级缓存和二级缓存：工作机制、适用场景、为什么二级缓存在生产中要慎用
4. SQL 优化技巧：只查需要的字段、合理使用 JOIN、索引设计
5. 分页深度优化：大 offset 分页的性能问题和解决方案
6. MyBatis 日志和调试：用日志定位慢 SQL、EXPLAIN 分析执行计划
7. 生产建议：什么该做、什么不该做、常见的优化误区

**与前篇关联**：前 5 篇搭好了完整的 CMS 系统，这篇让它跑得快

---

## 学习路径

```
01 快速入门 ──► 02 动态 SQL ──► 03 结果映射
                                    │
                           04 Spring Boot 整合
                                    │
                           05 MyBatis-Plus
                                    │
                           06 性能优化
```

---

## 预期效果

学完后将具备：

- 理解 MyBatis 的设计理念和核心机制
- 熟练使用动态 SQL 处理复杂查询条件
- 掌握关联映射和 N+1 问题的解决方案
- 在 Spring Boot 项目中整合使用 MyBatis
- 用 MyBatis-Plus 简化重复的 CRUD 开发
- 具备生产环境的 MyBatis 性能优化能力
