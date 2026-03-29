# TypeORM 实战：NestJS 数据库开发 — 学习计划

## 背景

本计划旨在通过一系列结构化的博客文章，帮助读者从零开始掌握 TypeORM —— NestJS 官方推荐的 ORM 框架。文章采用渐进式设计，从基础概念到生产级应用，每篇文章都包含丰富的代码示例和实战演练。

**为什么选择 TypeORM？**

- 🏆 **NestJS 官方推荐**：与 NestJS 深度集成，开箱即用
- 🎯 **装饰器驱动**：使用 TypeScript 装饰器定义实体，直观优雅
- 📊 **两种模式**：支持 Active Record 和 Data Mapper 两种设计模式
- 🔌 **多数据库支持**：PostgreSQL、MySQL、SQLite、SQL Server、Oracle 等
- 🛠️ **成熟稳定**：经过大量生产验证，社区活跃
- 📈 **功能全面**：关系映射、QueryBuilder、迁移、事务、监听器等一应俱全
- 🔄 **与 Prisma/Drizzle 对比**：更接近传统 ORM，学习曲线平缓

---

## 核心技术栈

**ORM 与数据库**：

- **TypeORM** 0.3.x（最新稳定版）
- **TypeScript** 5.x
- **数据库**：PostgreSQL 16（主要） / MySQL 8 / SQLite

**框架集成**：

- **NestJS** 10.x
- **Passport** + **JWT**（认证授权）
- **class-validator** + **class-transformer**（DTO 验证）

**开发工具**：

- **TypeORM CLI**：迁移、实体生成
- **Docker**：数据库容器化
- **测试**：Jest / Vitest

**部署平台**：

- **Docker Compose**
- **CI/CD**：GitHub Actions

---

## 博客目录结构

```
content/posts/typeorm/
├── plan.md                          # 本计划文件
├── 01-introduction-typeorm.mdx      # TypeORM 快速入门
├── 02-entity-definition.mdx         # 实体定义与数据建模
├── 03-relationships.mdx             # 关系映射
├── 04-repository-crud.mdx           # Repository 模式与 CRUD
├── 05-query-builder.mdx             # QueryBuilder 高级查询
├── 06-migrations.mdx                # 数据库迁移
├── 07-transactions.mdx              # 事务处理
├── 08-nestjs-blog-api.mdx           # NestJS 集成实战：博客 API
├── 09-auth-typeorm.mdx              # JWT 认证与授权
├── 10-performance.mdx               # 性能优化与最佳实践
├── 11-testing.mdx                   # 测试策略
└── 12-production-deployment.mdx     # 生产部署与综合项目
```

---

## 文章详细规划

### 01. TypeORM 快速入门

**目标**：搭建环境，理解核心概念，完成第一个 CRUD

**内容大纲**：

- TypeORM 概述与核心优势
- 与 Prisma、Drizzle 的对比
- Active Record vs Data Mapper 模式
- 环境搭建（Node.js + PostgreSQL + TypeORM）
- 第一个 CRUD 项目（使用 Data Mapper 模式）
- 项目结构说明

**关键代码**：

- DataSource 配置
- Entity 定义
- Repository 基本操作

---

### 02. 实体定义与数据建模

**目标**：掌握所有实体装饰器和数据类型映射

**内容大纲**：

- `@Entity` 和 `@Column` 装饰器详解
- 数据类型映射（TypeScript ↔ SQL）
- 主键策略（`@PrimaryColumn`、`@PrimaryGeneratedColumn`、UUID）
- 索引（`@Index`）
- 约束（唯一、检查、默认值）
- 软删除（`@DeleteDateColumn`）
- 实体监听器（`@BeforeInsert`、`@AfterUpdate` 等）
- 嵌入式实体（`@Embedded`）

---

### 03. 关系映射

**目标**：掌握一对一、一对多、多对多关系

**内容大纲**：

- `@OneToOne` 关系（用户 ↔ 个人资料）
- `@ManyToOne` / `@OneToMany` 关系（文章 ↔ 评论）
- `@ManyToMany` 关系（文章 ↔ 标签）
- 级联操作（cascade）
- Eager 加载 vs 懒加载
- 自引用关系
- 关系最佳实践

---

### 04. Repository 模式与 CRUD

**目标**：掌握 Repository API，实现生产级 CRUD

**内容大纲**：

- 自定义 Repository
- `find` / `findBy` / `findOne` / `findOneBy`
- `save` / `insert` / `update` / `delete`
- `FindOptions` 详解（where、order、relations、select）
- 分页封装
- 条件构建（`FindOperator`：`Like`、`Between`、`In`、`IsNull`）
- 批量操作

---

### 05. QueryBuilder 高级查询

**目标**：掌握 QueryBuilder，实现复杂查询

**内容大纲**：

- QueryBuilder 基础用法
- 联表查询（INNER JOIN / LEFT JOIN）
- 子查询
- 分组聚合（GROUP BY / HAVING）
- 原始 SQL 查询（`Raw`）
- 搜索功能实现（全文搜索）
- 查询结果映射

---

### 06. 数据库迁移

**目标**：掌握迁移工具，实现数据库版本管理

**内容大纲**：

- TypeORM CLI 配置（`data-source.ts`）
- 迁移文件结构
- 生成迁移（`migration:generate`）
- 执行迁移（`migration:run`）
- 回滚迁移（`migration:revert`）
- 生产迁移策略
- 数据种子（seeding）
- 常见迁移场景

---

### 07. 事务处理

**目标**：掌握事务机制，保证数据一致性

**内容大纲**：

- `DataSource.transaction()` 方法
- `QueryRunner` 手动事务管理
- 事务隔离级别
- 乐观锁（`@Version`）
- 悲观锁（Pessimistic Lock）
- 嵌套事务（SAVEPOINT）
- 事务最佳实践

---

### 08. NestJS 集成实战：博客 API

**目标**：在 NestJS 中完整实现博客 API

**内容大纲**：

- `TypeOrmModule` 配置（`forRoot` / `forFeature`）
- Posts 模块完整实现
  - Entity
  - DTO（Create / Update）
  - Service（CRUD + 分页）
  - Controller（REST API）
- DTO 验证（class-validator）
- 统一响应格式（拦截器）
- 异常过滤器
- 完整项目结构

---

### 09. JWT 认证与授权

**目标**：实现完整的认证授权系统

**内容大纲**：

- User 和 RefreshToken 实体设计
- 密码加密（bcrypt）
- Passport + JWT 策略
- 注册 / 登录 / 刷新 Token
- 角色权限（`@Roles` 装饰器 + Guard）
- 资源级访问控制（文章所有者验证）
- Token 黑名单

---

### 10. 性能优化与最佳实践

**目标**：识别和解决 TypeORM 性能问题

**内容大纲**：

- N+1 查询问题及解决方案
- 连接池调优
- 批量操作优化
- 查询缓存
- 索引策略
- 避免常见性能陷阱
- 监控与日志

---

### 11. 测试策略

**目标**：建立完整的测试体系

**内容大纲**：

- 测试环境配置
- 内存数据库（SQLite）测试
- Mock DataSource
- 单元测试（Service 层）
- 集成测试（Repository 层）
- E2E 测试（API 层）
- 测试工厂（Factory Pattern）
- 测试数据清理

---

### 12. 生产部署与综合项目

**目标**：生产环境部署和全系列回顾

**内容大纲**：

- Docker 容器化
  - 多阶段构建
  - Docker Compose 编排
- 迁移 CI/CD
  - GitHub Actions 自动迁移
- 健康检查
  - 数据库连接检查
  - TypeORM 健康指标
- 综合项目回顾
  - 架构总结
  - 技术选型回顾
  - 最佳实践清单
- 进阶学习方向

---

## 学习路径建议

### 入门阶段（第 1-3 周）

1. **快速入门**（01）→ 搭建环境，理解核心概念
2. **实体定义**（02）→ 掌握数据建模
3. **关系映射**（03）→ 理解实体关系

### 进阶阶段（第 4-6 周）

4. **Repository CRUD**（04）→ 掌握基本数据操作
5. **QueryBuilder**（05）→ 复杂查询能力
6. **数据库迁移**（06）→ 数据库版本管理

### 实战阶段（第 7-9 周）

7. **事务处理**（07）→ 数据一致性保证
8. **NestJS 集成**（08）→ 完整项目实战
9. **认证授权**（09）→ 安全机制

### 高级阶段（第 10-12 周）

10. **性能优化**（10）→ 生产级调优
11. **测试策略**（11）→ 质量保障
12. **生产部署**（12）→ 上线运维

---

## 配套资源

- **官方文档**：https://typeorm.io
- **NestJS 文档**：https://docs.nestjs.com/techniques/database
- **示例代码仓库**：（随文章更新）
- **TypeORM GitHub**：https://github.com/typeorm/typeorm

---

## 写作规范

- 所有代码示例使用 TypeScript
- 数据库以 PostgreSQL 为主，必要时提及 MySQL 差异
- 每篇文章包含完整可运行的代码
- 遵循渐进式教学，前后文章有连贯性
- 使用统一的 frontmatter 格式
- 代码注释使用中文
- 文章间使用相对链接互相关联
