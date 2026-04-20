# TypeORM 渐进式学习计划

## 背景

你是一个有 Node.js 基础的后端开发者，团队要做一个新项目，技术选型到了数据库这一步。有人推荐 Prisma，有人说 TypeORM 更灵活，还有人提 Drizzle。你打开 TypeORM 文档，看到 Active Record、Data Mapper、Repository、QueryBuilder……一时不知道从哪下手。

这个系列就是为你准备的。我们不会把 TypeORM 的 API 翻译一遍，而是从"为什么需要它"出发，带你逐步构建一个 **SaaS 项目管理平台**的数据层。每解决一个真实的数据问题，你就自然掌握了一个 TypeORM 特性。

### 技术栈选择

| 技术       | 版本   | 为什么选它                                            |
| ---------- | ------ | ----------------------------------------------------- |
| TypeORM    | 0.3.x  | NestJS 官方推荐 ORM，装饰器语法与 TypeScript 深度融合 |
| TypeScript | 5.x    | 类型安全，与 TypeORM 装饰器天然配合                   |
| PostgreSQL | 16     | 功能最全的开源关系型数据库，JSON 支持好               |
| Node.js    | 22 LTS | 当前 LTS 版本                                         |
| NestJS     | 10.x   | 企业级 Node.js 框架，与 TypeORM 集成最自然            |
| Docker     | -      | 开发和生产环境一致性                                  |

> Prisma 和 Drizzle 也是优秀的选择。如果你追求极致的类型安全和 Edge 部署，可以参考 [Drizzle 系列](/posts/drizzle/01-introduction-drizzle)；如果你想要开箱即用的类型生成和直观的 Schema 语法，可以参考 [Prisma 系列](/posts/prisma/01-getting-started)。本系列选择 TypeORM，是因为它在灵活性和开发体验之间取得了最好的平衡，尤其是在 NestJS 生态中。如果你想了解 TypeORM 与 NestJS 的框架级集成，可以参考 [NestJS 系列](/posts/nestjs/05-postgresql-typeorm-setup)。

---

## 主线案例：SaaS 项目管理平台

整个系列围绕一个 **SaaS 项目管理平台**（类似 Linear / Trello）的数据层展开，从数据建模到生产部署。

**案例场景**：一个支持多团队协作的项目管理工具，每个团队有独立的工作空间，下面包含多个项目，项目下有任务、子任务、标签、评论和活动日志。

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
基础篇（01-03）：独立小案例，快速上手 TypeORM
  → 每篇一个独立场景，降低入门门槛

核心篇（04-07）：引入项目管理平台案例，深入核心能力
  → 设计数据模型、实现 CRUD、掌握查询和迁移、处理事务

进阶篇（08-09）：框架集成与生产调优
  → 在 NestJS 中组装完整的数据层、解决性能问题

实战篇（10-11）：测试与部署
  → 给数据层写测试、Docker 容器化部署
```

---

## 博客目录结构

```
content/posts/typeorm/
├── plan.md                          # 本计划文件
├── 01-getting-started.mdx           # TypeORM 快速入门：为什么选它
├── 02-entity-modeling.mdx           # 实体定义与数据建模
├── 03-relationships.mdx             # 关系映射
├── 04-repository-crud.mdx           # Repository 与 CRUD
├── 05-query-builder.mdx             # QueryBuilder 高级查询
├── 06-migrations.mdx                # 数据库迁移
├── 07-transactions.mdx              # 事务处理
├── 08-nestjs-integration.mdx        # NestJS 集成实战
├── 09-performance.mdx               # 性能优化
├── 10-testing.mdx                   # 测试策略
└── 11-production-deployment.mdx     # 生产部署
```

---

## 基础篇：独立小案例（01-03）

目标：用 3 篇文章帮你建立对 TypeORM 的直觉，每篇一个独立场景。

---

### 01. TypeORM 快速入门：为什么选它

**核心问题**：团队要选 ORM，Prisma 的类型生成很炫，Drizzle 的性能很好，TypeORM 能给我什么？Active Record 和 Data Mapper 又是什么鬼？

**主线案例**：搭建一个简单的个人任务追踪工具——创建任务、标记完成、查询待办列表，用最少的代码体验 TypeORM 的核心流程。

**内容要点**：

- ORM 选型：TypeORM vs Prisma vs Drizzle 的本质区别（不是"哪个更好"，是"哪个更适合"）
- Active Record vs Data Mapper：两种设计模式的思想差异，为什么 TypeORM 都支持
- DataSource 配置：连接 PostgreSQL 的最小配置
- 第一个 Entity：用装饰器定义一张表
- Repository 基本操作：save、find、remove
- synchronize: true 为什么只适合开发阶段
- 项目结构：TypeORM 项目该怎么组织

**与前篇关联**：系列第一篇，无前篇。

---

### 02. 实体定义与数据建模：用装饰器描述你的业务

**核心问题**：你用 Prisma 的 schema.prisma 文件定义过数据模型，但 TypeORM 用的是装饰器。装饰器能做的事情更多还是更少？字段类型、默认值、约束、索引……这些在 TypeORM 里怎么表达？

**主线案例**：为一个电商订单系统设计数据模型——Order（订单）、OrderItem（订单明细）、Payment（支付记录），涉及金额、状态枚举、时间戳、JSON 字段等多种数据类型。

**内容要点**：

- @Column 装饰器详解：type、length、nullable、default、unique
- 主键策略：自增 ID vs UUID vs 自定义主键
- 数据类型映射：TypeScript 类型与 PostgreSQL 类型的对应（datetime、json、enum、numeric）
- 索引：@Index 装饰器、复合索引、唯一索引
- 约束：Check 约束、默认值、枚举类型
- 软删除：@DeleteDateColumn 的原理和使用场景
- 实体监听器：@BeforeInsert、@AfterUpdate——为什么需要它们
- 嵌入式实体：@Embedded——把地址、坐标这类"子结构"复用起来

**与前篇关联**：上一篇用了最简单的 Entity，这一篇深入所有装饰器选项，让你能精确控制数据模型。

---

### 03. 关系映射：当数据之间有了联系

**核心问题**：你设计好了表结构，但表和表之间怎么关联？一对多、多对多、自引用……TypeORM 的关系装饰器一大堆，cascade、eager、orphanedRowAction 这些选项又是什么意思？

**主线案例**：为一个社交媒体系统设计关系模型——User 发 Post、Post 有 Comment、Post 有 Tag、User 关注 User（自引用），覆盖所有关系类型。

**内容要点**：

- @OneToOne：用户与用户资料，什么时候该用一对一
- @ManyToOne / @OneToMany：文章与评论，为什么 ManyToOne 是最常用的关系
- @ManyToMany：文章与标签，中间表怎么控制
- cascade：级联操作——保存父实体时自动保存子实体，什么时候该开、什么时候不该开
- Eager 加载 vs 懒加载：为什么懒加载在 Web 应用中基本不推荐
- 自引用关系：评论嵌套回复、用户关注
- 关系方向：owning side 和 inverse side 的区别，为什么 mappedBy 必须写

**与前篇关联**：上一篇定义了单表模型，这一篇把多张表关联起来，让数据之间产生联系。

---

## 核心篇：项目管理平台起步（04-07）

目标：引入项目管理平台作为贯穿案例，设计数据模型，深入 CRUD、查询、迁移和事务。从这一篇开始，所有文章都在构建同一个项目的数据层。

---

### 04. Repository 与 CRUD：不止是 save 和 find

**核心问题**：Repository 的 find 方法你用过，但"查询任务列表，按创建时间倒序，带分页，带标签信息，只返回进行中的"——这种查询怎么写？find 的选项对象比你想象中强大。

**主线案例**：为项目管理平台实现 Task 的完整 CRUD——创建任务（关联标签和指派人）、分页查询（支持状态筛选和关键词搜索）、批量更新状态。

**内容要点**：

- 自定义 Repository：为什么有时候需要扩展 Repository
- find 选项详解：where、order、relations、select、skip、take
- FindOperator：Like、Between、In、IsNull、Not——构建灵活的查询条件
- findAndCount：分页查询的最佳实践
- save vs insert vs update：三者有什么区别，什么时候用哪个
- remove vs delete vs softDelete：删除的三种方式
- DTO 与 Entity 的边界：为什么不应该把 Entity 直接返回给调用方

**与前篇关联**：上一篇掌握了关系映射，这一篇在关系模型的基础上实现完整的 CRUD 操作。

---

### 05. QueryBuilder 高级查询：当 find 不够用的时候

**核心问题**：你需要查"每个项目下未完成任务数大于 10 的项目，按任务数倒序排列"——find 方法写不出来。需要 JOIN、GROUP BY、子查询的时候，QueryBuilder 是你的武器。

**主线案例**：为项目管理平台实现统计 Dashboard——每个工作空间的项目数、任务完成率、各状态的任务数分布；实现高级搜索——按标签筛选、按指派人筛选、按时间范围筛选。

**内容要点**：

- QueryBuilder 基础：select、from、where——和 SQL 的对应关系
- 联表查询：leftJoin、innerJoin——什么时候用左连接、什么时候用内连接
- 子查询：用 QueryBuilder 嵌套查询
- 分组聚合：groupBy、having——统计类查询
- select 的字段映射：用 as 取别名、用 getRawOne / getRawMany
- 原始 SQL：query 方法——什么时候必须手写 SQL
- QueryBuilder vs find：什么时候该用哪个

**与前篇关联**：上一篇的 find 方法能处理大部分查询，这一篇解决 find 搞不定的复杂场景。

---

### 06. 数据库迁移：让数据库变更可追溯

**核心问题**：你的 Entity 改了，数据库表结构也要跟着变。直接用 synchronize: true 改？生产环境这样做等于玩火。你需要一种安全、可追溯的方式来管理数据库变更。

**主线案例**：项目管理平台迭代过程中，需求变更引发的数据模型演进——新增字段、修改列类型、添加索引、拆分表、数据迁移。

**内容要点**：

- 为什么 synchronize: true 不能用于生产
- TypeORM CLI 配置：data-source.ts 文件
- migration:generate：自动检测 Entity 变更并生成迁移文件
- migration:run / migration:revert：执行和回滚迁移
- 迁移文件结构：up 和 down 方法——为什么回滚要自己写
- 数据迁移：不只是改表结构，还要迁移现有数据
- Seeding：用初始数据填充开发环境
- 生产迁移策略：迁移前的备份、大表迁移的注意事项

**与前篇关联**：前面几篇用 synchronize: true 快速开发，这一篇换成正规的迁移流程。

---

### 07. 事务处理：保证数据一致性

**核心问题**：创建任务时要同时创建任务-标签关联记录、写入活动日志、更新项目统计。第一步成功、第二步失败怎么办？你需要事务来保证"要么全成功，要么全失败"。

**主线案例**：项目管理平台中的事务场景——创建任务（任务 + 标签关联 + 活动日志）、移动任务状态（更新状态 + 写活动日志 + 通知指派人）、批量操作。

**内容要点**：

- 事务的本质：为什么需要 ACID
- DataSource.transaction()：声明式事务——最常用的方式
- QueryRunner：手动事务管理——需要更细粒度控制时使用
- 事务隔离级别：Read Committed、Repeatable Read、Serializable——各适合什么场景
- 乐观锁：@VersionColumn——解决并发更新的冲突
- 悲观锁：pessimistic locking——高并发场景下的保护
- 嵌套事务：SAVEPOINT——事务中的事务
- 事务的最佳实践：事务要尽量短、避免在事务中调外部 API

**与前篇关联**：上一篇的 CRUD 操作都是单表操作，这一篇处理涉及多表/多步操作的原子性问题。

---

## 进阶篇：框架集成与性能（08-09）

目标：在 NestJS 中组装完整的数据层，识别和解决性能问题。

---

### 08. NestJS 集成实战：把一切组装起来

**核心问题**：TypeORM 学了一堆，怎么和 NestJS 结合？TypeOrmModule 的 forRoot、forFeature 怎么配？Entity、Repository、Service、Controller 怎么串起来？

**主线案例**：在 NestJS 中实现项目管理平台的 Task 模块——完整的 Entity、自定义 Repository、Service、Controller、DTO 验证，形成可运行的 API。

**内容要点**：

- TypeOrmModule.forRootAsync()：用 useFactory 动态配置数据源
- TypeOrmModule.forFeature()：注册 Entity 和 Repository
- @InjectRepository：在 Service 中注入 Repository
- 自定义 Repository 注册：在 forFeature 中指定
- DTO 验证：class-validator 与 TypeORM Entity 的协作
- Entity 到 DTO 的转换：class-transformer 的使用
- 模块化设计：按业务域拆分 TypeORM 模块

**与前篇关联**：前面 7 篇都是纯 TypeORM 知识，这一篇把所有知识组装进 NestJS 框架。

---

### 09. 性能优化：让查询飞起来

**核心问题**：你的 API 在开发环境跑得飞快，上线后用户一多就变慢。查一个任务列表要 200ms，Dashboard 页面要 3 秒。问题出在哪？多半是 N+1 查询和缺失索引。

**主线案例**：诊断和优化项目管理平台的性能问题——任务列表的 N+1 查询、Dashboard 的聚合查询、标签筛选的慢查询。

**内容要点**：

- N+1 查询问题：什么是 N+1、怎么识别、怎么解决（eager vs join vs QueryBuilder）
- 查询分析：EXPLAIN ANALYZE——看懂数据库的执行计划
- 索引策略：单列索引、复合索引、覆盖索引——什么时候该加索引
- 连接池调优：pool size 怎么设、连接泄漏怎么排查
- select 精确查询：只查需要的字段，避免 SELECT \*
- 批量操作优化：insert 批量插入 vs 逐条插入的性能差异
- 查询缓存：TypeORM 内置缓存 vs Redis 外部缓存
- 监控：慢查询日志、连接池状态监控

**与前篇关联**：上一篇在 NestJS 中跑通了功能，这一篇让它在高并发场景下也能跑得快。

---

## 实战篇：测试与部署（10-11）

目标：给数据层写测试，容器化部署，让项目可以安全上线。

---

### 10. 测试策略：给数据层加上安全网

**核心问题**：你改了 Repository 的查询逻辑，怎么确定不会破坏已有的功能？靠手动测试？每次改完都过一遍所有接口？你需要自动化的测试来兜底。

**主线案例**：为项目管理平台的数据层写测试——Repository 层的集成测试（测试数据库）、Service 层的单元测试（Mock Repository）、Task API 的 E2E 测试。

**内容要点**：

- 测试金字塔：单元测试、集成测试、E2E 测试在数据层的分工
- 测试环境配置：用 SQLite 内存数据库替代 PostgreSQL 做测试
- Repository 集成测试：测试真实的 SQL 查询结果
- Service 单元测试：Mock Repository，只测业务逻辑
- E2E 测试：用 supertest 测试完整的 API 链路
- 测试数据管理：BeforeEach 清理、Factory 模式生成测试数据
- 什么值得测、什么不值得测：测试的投入产出比

**与前篇关联**：上一篇优化了性能，这一篇确保优化不会引入回归问题。

---

### 11. 生产部署：Docker + CI/CD

**核心问题**：项目在本地跑得好好的，部署到服务器就出问题——PostgreSQL 版本不对、迁移执行失败、连接超时。怎么保证开发、测试、生产环境一致？

**主线案例**：为项目管理平台编写 Dockerfile（多阶段构建）和 Docker Compose（App + PostgreSQL），配置 GitHub Actions 自动运行迁移和部署。

**内容要点**：

- 多阶段 Dockerfile：构建阶段用完整 Node 镜像，运行阶段用 Alpine
- Docker Compose 编排：App + PostgreSQL 两个服务的配置
- 环境变量管理：.env 文件 + ConfigService
- 健康检查：数据库连接检查、应用健康端点
- CI/CD 迁移：GitHub Actions 中自动执行 migration:run
- 数据库备份：pg_dump 定时备份策略
- 日志管理：TypeORM 的 logging 选项，生产环境怎么配
- 系列回顾：技术选型总结、最佳实践清单、进阶方向

**与前篇关联**：前面 10 篇完成了功能开发和测试，最后一步是容器化部署上线。

---

## 学习路径图

```
基础篇 ──────────────────────────────────────────────
  01 快速入门 ──► 02 实体定义 ──► 03 关系映射
                                            │
核心篇 ──────────────────────────────────────────────
          04 Repository CRUD
                │
          05 QueryBuilder
                │
          06 数据库迁移
                │
          07 事务处理
                          │
进阶篇 ──────────────────────────────────────────────
       08 NestJS 集成 ──► 09 性能优化
                                  │
实战篇 ──────────────────────────────────────────────
       10 测试策略 ──► 11 生产部署
```

---

## 预期效果

完成本系列后，你将能够：

- 理解 TypeORM 的设计哲学，知道它和 Prisma、Drizzle 的取舍
- 用装饰器设计复杂的数据模型，掌握所有关系类型
- 灵活运用 Repository 和 QueryBuilder 处理各种查询需求
- 用迁移安全地管理数据库变更
- 正确使用事务保证数据一致性
- 在 NestJS 中搭建生产级的数据层
- 识别和解决 N+1 查询、慢查询等性能问题
- 给数据层写测试，用 Docker 容器化部署

---

## 版本信息

- **TypeORM**：0.3.x
- **TypeScript**：5.x
- **Node.js**：22 LTS
- **PostgreSQL**：16
- **NestJS**：10.x
- **Docker**：24.x
