# MyBatis 实战指南

## 背景

MyBatis 是国内 Java 企业开发中最主流的持久层框架。2026 年，MyBatis 3.5.x 已经非常成熟，MyBatis-Plus 3.5.x 成为标配增强工具，Spring Boot 3.x 的整合方式也趋于稳定。

但很多开发者的 MyBatis 使用水平停留在"能用"的阶段——只会写简单的 CRUD，遇到复杂关联查询就懵，不知道怎么优化 N+1 问题，动态 SQL 写得像意大利面条。这个系列用一个完整的在线书店项目贯穿始终，从基础到生产实战，帮你把 MyBatis 用好。

### 技术栈

| 技术         | 版本  | 说明           |
| ------------ | ----- | -------------- |
| MyBatis      | 3.5.x | 当前最新稳定版 |
| MyBatis-Plus | 3.5.x | 增强工具       |
| Spring Boot  | 3.x   | 应用框架       |
| MySQL        | 8.0+  | 数据库         |
| Java         | 17+   | LTS 版本       |

> 本系列面向有 Java 基础和 Spring Boot 经验的开发者。如果你没用过 Spring Boot，建议先了解基本概念。

---

## 主线案例：在线书店系统

整个系列围绕一个**在线书店系统（BookHive）**展开。这是一个真实的业务场景：用户可以浏览书籍、搜索、下单购买、管理订单。数据模型有足够的复杂度来展示 MyBatis 的各种特性。

**案例数据**：

```
项目：BookHive（在线书店系统）
技术栈：Spring Boot 3 + MyBatis + MySQL 8
核心模块：
  - 用户模块：注册、登录、个人信息
  - 书籍模块：书籍 CRUD、分类管理、多条件搜索
  - 订单模块：创建订单、订单查询、状态流转
  - 评论模块：书籍评论、评分统计
数据特点：
  - 一对一：用户 ↔ 用户详情
  - 一对多：作者 ↔ 书籍、订单 ↔ 订单项
  - 多对多：书籍 ↔ 分类
  - 复杂查询：多条件搜索、分页排序、统计聚合
```

---

## 系列节奏

```
基础篇（01-02）：搭建项目，跑通核心流程
  → Spring Boot + MyBatis 整合，理解核心概念

核心篇（03-05）：MyBatis 的核心能力
  → 动态 SQL、关联映射、注解 vs XML

进阶篇（06-08）：MyBatis-Plus 与性能优化
  → 增强工具、分页查询、缓存与批量操作

实战篇（09-10）：生产环境实践
  → 读写分离、拦截器、常见陷阱
```

---

## 博客目录结构

```
content/posts/mybatis/
├── plan.md
├── 01-getting-started.mdx         # 从 JDBC 到 MyBatis：为什么国内企业都选它
├── 02-mapper-xml.mdx              # Mapper XML 详解：MyBatis 的灵魂
├── 03-dynamic-sql.mdx             # 动态 SQL：应对复杂查询的利器
├── 04-association-mapping.mdx     # 关联映射：一对一、一对多与 N+1 问题
├── 05-annotation-vs-xml.mdx       # 注解开发 vs XML 开发：怎么选
├── 06-spring-boot-deep-dive.mdx   # Spring Boot 深度整合：多数据源与事务
├── 07-mybatis-plus.mdx            # MyBatis-Plus：效率倍增器
├── 08-pagination-performance.mdx  # 分页查询与性能优化
├── 09-caching-batch.mdx           # 缓存策略与批量操作
├── 10-production-practices.mdx    # 生产实践与常见陷阱
```

---

## 基础篇：搭建项目，跑通核心流程（01-02）

---

### 01. 从 JDBC 到 MyBatis：为什么国内企业都选它

**核心问题**：JDBC 写起来太痛苦，JPA 又不够灵活。MyBatis 处于什么位置？

**主线案例**：搭建 BookHive 项目，用 MyBatis 完成用户的注册和查询。

**内容要点**：

- JDBC 的真实痛点：代码堆砌、资源泄漏、SQL 硬编码
- MyBatis 的核心思路：SQL 与代码分离、自动映射
- Spring Boot + MyBatis 快速搭建（不走原生 MyBatis）
- SqlSessionFactory、SqlSession、Mapper 的关系
- #{} vs ${}：SQL 注入防护
- 与 JPA/Hibernate 的选择依据

**与前篇关联**：系列第一篇，无前篇。

---

### 02. Mapper XML 详解：MyBatis 的灵魂

**核心问题**：Mapper XML 是 MyBatis 的核心配置文件。resultMap、参数传递、类型处理器——怎么用好它？

**主线案例**：为 BookHive 的书籍模块编写完整的 Mapper XML。

**内容要点**：

- resultMap 详解：自动映射 vs 手动映射
- 参数传递：@Param 注解、POJO 传参、Map 传参
- 类型别名和类型处理器
- CRUD 标签的完整用法
- insert 的主键回填
- update 的选择性更新

**与前篇关联**：上一篇搭好了项目骨架，这一篇深入 Mapper XML 的配置。

---

## 核心篇：MyBatis 的核心能力（03-05）

---

### 03. 动态 SQL：应对复杂查询的利器

**核心问题**：搜索条件不固定——用户可能按书名搜、按作者搜、按价格范围搜，也可能组合搜索。怎么写一个灵活的查询？

**主线案例**：实现 BookHive 的多条件书籍搜索功能。

**内容要点**：

- if 标签：条件判断
- where 标签：智能处理 AND/OR 前缀
- set 标签：动态更新字段
- choose/when/otherwise：类似 switch-case
- foreach：批量操作（批量插入、IN 查询）
- sql/include：SQL 片段复用
- bind：变量绑定
- 动态 SQL 的可读性和维护性

**与前篇关联**：上一篇的 Mapper XML 只能写固定 SQL，这一篇学会动态 SQL。

---

### 04. 关联映射：一对一、一对多与 N+1 问题

**核心问题**：查询书籍时要带出作者信息，查询订单时要带出订单项。MyBatis 怎么处理关联关系？N+1 查询问题怎么解决？

**主线案例**：BookHive 的作者-书籍关联、订单-订单项关联。

**内容要点**：

- association：一对一映射（用户-用户详情）
- collection：一对多映射（作者-书籍）
- 嵌套查询 vs 嵌套结果：两种方式的区别和选择
- N+1 问题：什么是 N+1、怎么避免
- 延迟加载：按需加载关联数据
- 全局延迟加载配置

**与前篇关联**：前两篇处理单表 CRUD，这一篇处理多表关联。

---

### 05. 注解开发 vs XML 开发：怎么选

**核心问题**：MyBatis 支持注解和 XML 两种方式写 SQL。各有什么优劣？实际项目中怎么搭配使用？

**主线案例**：BookHive 的评论模块用注解开发，搜索模块用 XML 开发。

**内容要点**：

- @Select、@Insert、@Update、@Delete
- @Results、@Result、@One、@Many
- @SelectProvider：注解中的动态 SQL
- 注解 vs XML 的实际对比
- 混合使用策略：简单 SQL 用注解，复杂 SQL 用 XML
- 实际项目中的最佳实践

**与前篇关联**：前四篇用的都是 XML 方式，这一篇引入注解方式并对比。

---

## 进阶篇：MyBatis-Plus 与性能优化（06-08）

---

### 06. Spring Boot 深度整合：多数据源与事务

**核心问题**：项目需要连接多个数据库（比如主库和报表库），MyBatis 怎么配多数据源？事务边界怎么控制？

**主线案例**：BookHive 的读写分离配置——写操作走主库，读操作走从库。

**内容要点**：

- mybatis-spring-boot-starter 自动配置原理
- 多数据源配置（@Qualifier、@ConfigurationProperties）
- 事务管理：@Transactional 的传播行为和隔离级别
- Spring 事务和 MyBatis 事务的配合
- 常见事务问题（自调用失效、只读事务）

**与前篇关联**：前五篇用单数据源，这一篇处理多数据源场景。

---

### 07. MyBatis-Plus：效率倍增器

**核心问题**：每个 Mapper 都要写 CRUD 的 XML？太重复了。MyBatis-Plus 怎么帮你省掉这些样板代码？

**主线案例**：用 MyBatis-Plus 重构 BookHive 的 Mapper 层。

**内容要点**：

- BaseMapper：通用 CRUD 接口
- IService：通用 Service 层
- QueryWrapper / LambdaQueryWrapper：条件构造器
- 自动填充（createTime、updateTime）
- 逻辑删除
- 代码生成器
- MyBatis-Plus 的局限性和注意事项

**与前篇关联**：前六篇都是原生 MyBatis，这一篇引入 MyBatis-Plus 增强。

---

### 08. 分页查询与性能优化

**核心问题**：书籍列表有上万条数据，一次全查出来不行。怎么高效分页？怎么确保查询性能？

**主线案例**：BookHive 的书籍列表分页搜索（多条件 + 排序 + 分页）。

**内容要点**：

- PageHelper 分页插件的原理和使用
- MyBatis-Plus 内置分页
- 深分页问题及解决方案
- 索引友好的查询设计
- EXPLAIN 分析查询计划
- 慢 SQL 的定位和优化

**与前篇关联**：上一篇引入了 MyBatis-Plus，这一篇在 MyBatis-Plus 基础上做分页优化。

---

## 实战篇（09-10）

---

### 09. 缓存策略与批量操作

**核心问题**：热门书籍的信息被频繁查询，每次都查数据库太慢。MyBatis 的缓存机制怎么用？批量导入上万条书籍怎么优化？

**主线案例**：BookHive 的书籍详情缓存、批量导入书籍功能。

**内容要点**：

- 一级缓存（SqlSession 级别）：工作机制和失效场景
- 二级缓存（Mapper 级别）：配置和使用
- 二级缓存的陷阱（脏数据问题）
- 什么时候该用缓存、什么时候不该用
- 批量插入优化：ExecutorType.BATCH
- 批量更新的最佳实践
- 与 Redis 等外部缓存的配合

**与前篇关联**：上一篇优化了查询性能，这一篇通过缓存减少数据库访问。

---

### 10. 生产实践与常见陷阱

**核心问题**：项目要上线了。多租户、数据权限、SQL 审计——这些生产环境的需求怎么实现？日常开发中有哪些常见坑？

**主线案例**：BookHive 的多租户支持（SaaS 版本，每个书店独立数据）。

**内容要点**：

- 自定义拦截器（Interceptor）：SQL 审计、慢查询记录
- 多租户实现：租户 ID 自动注入
- 数据权限控制：行级权限
- 枚举类型的处理
- JSON 字段的映射
- 常见错误排查：BindingException、LazyInitializationException
- 系列回顾与综合建议

**与前篇关联**：前 9 篇覆盖了核心能力，这一篇处理生产环境的高级需求。

---

## 预期效果

完成本系列后，你将能够：

- 理解 MyBatis 的设计理念和核心机制
- 熟练使用 Mapper XML 和动态 SQL
- 处理复杂的多表关联查询
- 合理搭配注解和 XML 开发方式
- 配置多数据源和事务管理
- 使用 MyBatis-Plus 提升开发效率
- 优化查询性能和批量操作
- 应对生产环境的常见问题

---

## 版本信息

- **MyBatis**：3.5.x
- **MyBatis-Plus**：3.5.x
- **Spring Boot**：3.x
- **Java**：17+
- **MySQL**：8.0+
