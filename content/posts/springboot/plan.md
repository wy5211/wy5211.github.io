# Spring Boot 实战：从 Express 到 Spring Boot

## 背景

本系列面向 **有 Node.js/Express 经验的开发者**，通过框架层面对比的方式掌握 Spring Boot 企业级开发。每篇文章回答"在 Express/NestJS 里你怎么做，Spring Boot 里怎么做"。

**技术栈**：Spring Boot 3.x | Java 17 | Maven | MySQL 8.0 | Redis 7 | JWT

## 写作规范

- 从具体问题/场景开头，禁止"本文将介绍..."
- 代码占比 < 40%，每段代码有引导语和解读
- 结尾是 trade-off 分析，不是复选框总结
- 每篇有 Node.js vs Spring Boot 对比表
- 贯穿案例从第 1 篇就开始（TechBlog CMS 项目搭建）

## 贯穿案例：TechBlog CMS REST API

把 Java 系列中用纯 Java 实现的 CMS 核心逻辑，做成完整的 REST API：

```
User:    id, username, email, passwordHash, role, avatar, createdAt
Post:    id, title, slug, content, status(DRAFT/PUBLISHED), authorId, viewCount
Tag:     id, name, slug, color
Comment: id, content, postId, authorId, parentId, createdAt
```

## 文章目录

### 第一阶段：入门（01-03）

| 篇号 | 标题                   | 核心问题                                                       | Node.js 对比                           | CMS 进度      |
| ---- | ---------------------- | -------------------------------------------------------------- | -------------------------------------- | ------------- |
| 01   | 为什么需要 Spring Boot | "Express 一个文件就能起服务，Spring Boot 为什么要搞这么复杂？" | Express vs Spring Boot；约定优于配置   | 项目初始化    |
| 02   | 第一个 API：文章 CRUD  | "Spring Boot 的 Controller 和 Express 的 Router 有什么区别？"  | @RestController vs router；DTO         | 文章 REST API |
| 03   | 依赖注入与自动配置     | "Node.js 的 require 和 Spring 的 DI 有本质区别"                | DI 容器 vs 手动 require；Bean 生命周期 | Service 层    |

### 第二阶段：核心功能（04-08）

| 篇号 | 标题                 | 核心问题                                                 | Node.js 对比                     | CMS 进度           |
| ---- | -------------------- | -------------------------------------------------------- | -------------------------------- | ------------------ |
| 04   | RESTful API 设计规范 | "Spring Boot 怎么处理路径参数、查询参数？"               | @PathVariable vs req.params      | 完整文章 API       |
| 05   | Spring Data JPA      | "TypeORM 的 Active Record 和 JPA 的 Repository 哪个好？" | Repository vs Repository         | Post/Tag/User 映射 |
| 06   | 参数校验             | "Joi/zod 和 Spring Validation 有什么异同？"              | @Valid vs zod schema             | 文章创建校验       |
| 07   | 全局异常处理         | "Express error middleware 和 @ControllerAdvice"          | 中间件 vs AOP                    | API 异常处理       |
| 08   | 拦截器与 AOP         | "Express middleware 和 Spring Interceptor 有什么区别？"  | middleware vs Interceptor vs AOP | 阅读量统计         |

### 第三阶段：安全（09-10）

| 篇号 | 标题                 | 核心问题                                            | Node.js 对比              | CMS 进度       |
| ---- | -------------------- | --------------------------------------------------- | ------------------------- | -------------- |
| 09   | Spring Security 基础 | "passport.js 和 Spring Security 哪个更灵活？"       | 过滤器链 vs middleware 链 | 用户认证       |
| 10   | JWT 认证实战         | "Express JWT 中间件和 Spring Security JWT 怎么选？" | jjwt vs jsonwebtoken      | 登录注册+Token |

### 第四阶段：进阶（11-15）

| 篇号 | 标题               | 核心问题                               | Node.js 对比             | CMS 进度     |
| ---- | ------------------ | -------------------------------------- | ------------------------ | ------------ |
| 11   | Redis 缓存         | "ioredis 和 Spring Cache 有什么不同？" | @Cacheable vs 手动缓存   | 文章列表缓存 |
| 12   | 异步任务与定时任务 | "setImmediate 和 @Async 有什么区别？"  | @Async vs Worker Threads | 异步通知     |
| 13   | WebSocket 实时通信 | "Socket.io 和 Spring WebSocket 的差异" | Socket.io vs STOMP       | 评论实时推送 |
| 14   | 日志系统           | "winston/pino 和 Logback 有什么区别？" | SLF4J vs console/winston | 请求日志     |
| 15   | 测试策略           | "Jest 和 Spring Boot Test 的差异"      | @WebMvcTest vs supertest | API 集成测试 |

### 第五阶段：部署（16-18）

| 篇号 | 标题        | 核心问题                                    | Node.js 对比             | CMS 进度     |
| ---- | ----------- | ------------------------------------------- | ------------------------ | ------------ |
| 16   | Docker 部署 | "Node.js Dockerfile 和 Java 的有什么不同？" | JVM 镜像 vs Node 镜像    | 容器化部署   |
| 17   | 性能优化    | "Java 性能瓶颈和 Node.js 有什么不同？"      | N+1 问题；JVM 调优       | SQL 优化     |
| 18   | 微服务入门  | "Node.js 微服务和 Java 微服务有什么不同？"  | Spring Cloud vs 自己组装 | 评论服务拆分 |

## 预期效果

完成本系列后，你将能够：

1. 理解 Spring Boot 的设计哲学和 IoC 容器
2. 构建完整的 RESTful API（CRUD + 认证 + 校验）
3. 使用 JPA、Redis、WebSocket 等企业级组件
4. 用 Docker 容器化部署 Spring Boot 应用
5. 具备 Java 后端开发的生产级能力

## 番外篇计划（2026-09-03 补充）

### 背景

作者本人正在系统学习 Spring Boot（前端转全栈），发现包管理是盲区。复查 18 篇正篇后确认两个缺口：依赖管理没有专篇（01 只有一张 package.json ↔ pom.xml 对照表），事务没有专篇（05 篇 JPA 只顺手用了 `@Transactional`，没展开）。补 2 篇番外，seriesOrder 接在 18 之后。

### 与已有内容的关系（重叠检查）

| 已有内容                                             | 番外篇处理                                          |
| ---------------------------------------------------- | --------------------------------------------------- |
| 01 篇 package.json ↔ pom.xml 对照表、Initializr 流程 | 19 篇不重复对照表和安装流程，直接讲机制深水区       |
| 05 篇 JPA 中顺手使用 `@Transactional`                | 20 篇展开原理：传播行为、回滚规则、失效场景         |
| 08 篇拦截器与 AOP                                    | 20 篇点明"事务就是 AOP 的最大应用"，不重复 AOP 概念 |
| 16 篇 Docker 依赖缓存（`dependency:go-offline`）     | 19 篇补完其原理（本地仓库），不重复 Docker 内容     |
| java / redis / docker / devops2 / backend-map 系列   | 无重叠，互不引用                                    |

### 番外 19：Maven 依赖管理：从 package.json 到 pom.xml

- **学习目标**：搞懂"为什么引入依赖不用写版本号"；遇到依赖冲突能自己用 `dependency:tree` 排查
- **核心问题**："pnpm 有 lockfile 锁版本，Maven 靠什么保证两次构建拿到同一批 jar？"+ "NoClassDefFoundError 一屏，从哪查起？"
- **主线场景**：CMS 想接入一个新的 Redis starter，结果启动报 Jackson 版本冲突——随排查过程展开全部知识点
- **内容要点**：
  - 心智模型迁移：node_modules 扁平化 vs `~/.m2` 本地仓库 + 坐标系统（groupId:artifactId:version）
  - starter 的本质：打包好的依赖清单；BOM（`spring-boot-dependencies`）的 `dependencyManagement` 如何统一版本号——这就是"不用写版本号"的答案
  - 依赖仲裁：最短路径优先 → 路径同长先声明者赢；与 npm 版本树策略的差异；Maven 默认没有 lockfile 意味着什么（CI 与本地不一致的风险）
  - 实战：`mvn dependency:tree` 定位冲突、`<exclusions>`、`<dependencyManagement>` 强制版本
  - 多模块/父子 POM 一瞥：什么规模才值得拆
  - Gradle 一段话带过：为什么两派并存，新手选哪个
- **与前篇关联**：01 篇对照表的机制深入篇；16 篇依赖缓存的原理补完

### 番外 20：事务：一个注解背后的数据一致性

- **学习目标**：说清事务解决什么问题；掌握传播行为常用两档；知道注解失效的三大场景
- **核心问题**："注册成功但发券失败，为什么用户还是创建了？"——前端世界没有事务对应物，这是转全栈最大的认知补丁之一
- **主线场景**：CMS 两条业务线——"用户注册送优惠券"、"文章发布 + 标签关联保存"
- **内容要点**：
  - 为什么需要事务：半成功状态没人收拾；Express + TypeORM 手动 begin/commit 对照，Spring 用 AOP 代劳了
  - `@Transactional` 基础：加在 Service 层；默认只回滚 RuntimeException——checked exception 不回滚这个反直觉点
  - 传播行为只讲常用两档：REQUIRED vs REQUIRES_NEW（操作日志永远要落库的场景）
  - 失效三坑：自调用（`this` 不走代理）、private 方法、try-catch 吞异常——每个配一个"看似正确却失效"的代码片段
  - 什么时候不用事务：纯读操作、跨服务的部分（指向 backend-map 归档系列的分布式事务思路，仅文字提及）
- **与前篇关联**：05 篇 JPA 的 saveAll/关联保存；08 篇 AOP 的最大实际应用

### 番外篇写作规范

沿用正篇规范：Node.js vs Spring Boot 对比表每篇保留；贯穿案例继续用 TechBlog CMS；写作日期 2026-09-03。

_番外计划创建日期：2026-09-03_
_计划创建日期：2026-03-30_
