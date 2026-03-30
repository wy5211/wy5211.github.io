# JS 开发者学习 Java + Python 个人路径规划

## 背景

- **已有基础**：熟练 JavaScript（Node.js、前端）
- **学习目标**：求职/就业，达到生产级水平
- **学习策略**：Java 优先（后端岗位需求大），Python 追赶（AI/脚本方向）
- **时间投入**：每天 1-2 小时，兼职学习
- **总周期**：约 22-28 周（5-7 个月）
- **已有资源**：博客上 Java 20 篇 + Python 22 篇学习计划

---

## 学习路径总览

```
Phase 1: Java 语言基础（8-10 周）
├── 语法适应（1-2 周）   01-04 篇
├── OOP 核心（3-5 周）   05-09 篇
├── 集合 + 泛型（2 周）  10-14 篇
└── 现代特性（2-3 周）   15-20 篇

Phase 2: Java 进阶 + Spring Boot 实战（6-8 周）
├── Spring Boot + 数据库（2 周）
├── Security + JWT（2 周）
├── Redis + 完善项目（2 周）
└── Docker 部署（1-2 周）

Phase 3: Python 学习（8-10 周）
├── 语法速通（3 周）      01-05 篇
├── 工程化（3 周）        06-10 篇
└── FastAPI 实战（4-5 周）11-22 篇
```

---

## Phase 1：Java 语言基础（8-10 周）

### JS → Java 核心差异

| JS 概念               | Java 对应                          | 关键差异                                         |
| --------------------- | ---------------------------------- | ------------------------------------------------ |
| `let`/`const`         | 强类型声明 `int`/`String`          | Java 一切皆有类型，编译期检查                    |
| `===` / `==`          | `.equals()` / `==`                 | Java `==` 比较引用，`.equals()` 比较值（大坑！） |
| `null` / `undefined`  | `null`                             | 统一为 `null`，有 NPE 风险                       |
| 动态类型              | 静态类型 + 泛型                    | 类似 TypeScript 但更严格                         |
| `class` / `prototype` | `class` / `interface` / `abstract` | Java OOP 更规范，强制封装                        |
| `Promise` / `async`   | `CompletableFuture` / 线程池       | Java 并发模型完全不同                            |
| 函数是一等公民        | 函数不是一等公民（Lambda 补充）    | Java 8+ Lambda 但本质不同                        |
| npm / ESM             | Maven / Gradle / `package`         | 包管理、依赖管理完全不同                         |

### JS 开发者必须重点学习

- **强类型系统**：8 种基本类型 + 引用类型 + 类型转换
- **访问控制符**：public/private/protected/default（JS 没有这个概念）
- **接口 vs 抽象类**：JS 没有，Java 设计模式的基础
- **泛型**：类似 TypeScript 泛型但更复杂，有类型擦除
- **集合框架**：ArrayList/HashMap/HashSet，Java 开发的核心工具
- **多线程与并发**：JS 单线程，Java 多线程是后端开发必备
- **checked vs unchecked 异常**：Java 独有，必须学会处理

### JS 开发者可以快速迁移

- 基本控制流（if/else、for/while）→ 几乎一样
- 方法重载 → 类似 TypeScript 的函数签名重载
- Lambda 表达式 → 类似 JS 箭头函数，但目标类型不同
- Stream API → 类似 JS 数组的 map/filter/reduce

### 学习节奏

**第 1-2 周**（01-04 篇）：环境搭建 + 语法基础 + 数组

- 重点适应：强类型、编译运行流程、JDK/JRE/JVM 概念
- 参考：`content/posts/java/01-getting-started.mdx` ~ `04-arrays.mdx`

**第 3-5 周**（05-09 篇）：OOP 核心阶段（最重要）

- 重点学习：封装、继承、多态、接口、抽象类
- 这部分决定你对 Java 的理解深度
- 参考：`content/posts/java/05-classes-objects.mdx` ~ `09-inner-classes.mdx`

**第 6-7 周**（10-14 篇）：异常处理 + 集合框架 + 泛型

- 集合框架是 Java 开发的日常，必须熟练
- 参考：`content/posts/java/10-exception-handling.mdx` ~ `14-generics.mdx`

**第 8-10 周**（15-20 篇）：Stream API + IO + 多线程 + Lambda

- Stream 类似 JS 数组方法，快速上手
- 多线程是 Java 后端开发必备技能
- 参考：`content/posts/java/15-stream-api.mdx` ~ `20-functional-interfaces.mdx`

---

## Phase 2：Java 进阶 + Spring Boot 实战（6-8 周）

### 简历项目：博客系统后端

```
博客系统后端
├── Spring Boot 3 + MyBatis-Plus / Spring Data JPA
├── MySQL 数据库设计（用户、文章、评论、标签）
├── Spring Security + JWT 认证授权
├── RESTful API 设计 + 统一响应格式
├── 全局异常处理 + 参数校验
├── Redis 缓存（热点数据、验证码）
├── 分页查询 + 条件筛选
├── 文件上传（OSS）
├── 定时任务
└── Docker 部署
```

### JS/Node.js → Spring Boot 迁移对照

| JS/Node.js 经验          | Spring Boot 对应               |
| ------------------------ | ------------------------------ |
| Express/NestJS           | Spring Boot（约定大于配置）    |
| Prisma/TypeORM/Drizzle   | MyBatis-Plus / Spring Data JPA |
| class-validator (NestJS) | `@Valid` + Hibernate Validator |
| jsonwebtoken             | Spring Security + jjwt         |
| bcrypt                   | Spring Security BCrypt         |
| Jest/Vitest              | JUnit 5 + Mockito              |

### 学习节奏

**第 11-12 周**：Spring Boot 入门 + MyBatis/JPA + 数据库设计

- 参考：`content/posts/springboot/` 系列文章

**第 13-14 周**：Spring Security + JWT + RESTful API 完整实现

**第 15-16 周**：Redis 缓存 + 全局异常处理 + 参数校验

**第 17-18 周**：项目完善 + Docker 部署 + 代码优化

### 求职加分项

- 使用 **Spring Boot 3 + MyBatis-Plus + MySQL** 构建博客系统
- 实现了 **Spring Security + JWT** 认证授权
- 使用 **Redis** 实现缓存优化
- **Docker** 容器化部署
- 完整的 **JUnit 5** 测试套件

---

## Phase 3：Python 学习（8-10 周）

### Java → Python 迁移对照

| Java 概念                      | Python 对应                 | 差异                            |
| ------------------------------ | --------------------------- | ------------------------------- |
| 强类型 + 泛型                  | 动态类型 + 类型注解（可选） | Python 更灵活，推荐用类型注解   |
| `public`/`private`/`protected` | `_` / `__` 命名约定         | Python 没有强制访问控制，靠约定 |
| interface                      | `Protocol` / `ABC`          | Python 的鸭子类型更灵活         |
| `implements`                   | 继承 + 协议                 | Python 多重继承 + MRO           |
| checked 异常                   | 无 checked 异常             | Python 异常处理更自由           |
| Maven/Gradle                   | pip / uv / poetry           | Python 包管理更简单             |
| Spring Boot                    | FastAPI                     | 更轻量，自动文档                |

### JS 开发者可以快速浏览的内容

- 变量声明、基本数据类型（int/float/str/bool）
- if/else、for/while 循环
- 函数定义、参数传递
- 基本的异常处理

### 必须重点学习的内容

- **装饰器**（JS 没有原生装饰器语法）
- **生成器与 yield**（JS 有但用法不同）
- **上下文管理器**（with 语句，JS 完全没有）
- **类型注解与 Pydantic**（类似 TypeScript 类型系统但不同）
- **包管理与虚拟环境**（JS 用 npm，Python 生态完全不同）
- **pytest**（fixture 概念独特）

### 学习节奏

**第 19-21 周**（01-05 篇）：Python 语法速通（3 周）

- 有 Java 基础后 3 周足够
- 重点学：装饰器、生成器、上下文管理器（Java 没有的）
- 参考：`content/posts/python/01-getting-started.mdx` ~ `05-advanced-features.mdx`

**第 22-24 周**（06-10 篇）：工程化 + 类型注解 + pytest（3 周）

- 有 Maven 经验后，包管理很快上手
- 参考：`content/posts/python/06-project-structure.mdx` ~ `10-stdlib-essentials.mdx`

**第 25-28 周**（11-22 篇）：FastAPI 实战（4-5 周）

- 有 Spring Boot 经验后，概念几乎一一对应
- 主要是语法转换
- 参考：`content/posts/python/11-fastapi-getting-started.mdx` ~ `22-docker-deployment.mdx`

### Python 的定位

- **快速掌握基础**（3-4 周），能写脚本、做自动化
- **FastAPI 做一个项目**作为补充技能
- **后续根据 AI 岗位需求**，再深入 AI/ML 方向（pandas、PyTorch 等）

---

## 里程碑节点

| 时间     | 里程碑               | 简历收获                 |
| -------- | -------------------- | ------------------------ |
| 第 10 周 | Java 语法掌握        | 能写 Java 代码，理解 OOP |
| 第 18 周 | Spring Boot 项目完成 | **简历核心项目**         |
| 第 24 周 | Python 工程化        | 能写 Python 工具脚本     |
| 第 28 周 | FastAPI 项目完成     | 第二个简历项目           |

---

## 学习建议

1. **每天 1-2 小时，保持节奏**：比偶尔学一整天更有效
2. **边学边写代码**：不要只看博客文章，每个示例都要自己敲一遍
3. **做项目驱动**：Phase 2 和 Phase 3 以项目为主，教程为辅
4. **写博客巩固**：学完后可以用自己的话写博客，加深理解
5. **刷算法题**：Java 学完后可以开始刷 LeetCode，用 Java 实现，同时准备面试
6. **不要追求完美**：先跑通，再优化

_创建日期：2026-03-30_
