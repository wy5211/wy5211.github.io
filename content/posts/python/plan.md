# Python 实战：Java 开发者的 Python 快速通道

## 背景

本系列面向 **已完成 Java 和 Spring Boot 学习的开发者**，通过 Java 对比的方式快速掌握 Python。每篇文章回答"在 Java 里你怎么做，Python 里怎么做"，跨系列引用 Java/Spring Boot 篇目。

**技术栈**：Python 3.12+ | FastAPI 0.110+ | SQLAlchemy 2.0 | Pydantic v2 | PostgreSQL 16 | Redis 7 | pytest

## 写作规范

- 从具体问题/场景开头，禁止"本文将介绍..."
- 代码占比 < 40%，每段代码有引导语和解读
- 结尾是 trade-off 分析，不是复选框总结
- 每篇有 Java vs Python 对比表（不是 JS 对比！）
- 跨系列引用："在 Java 系列第 X 篇中我们用 Y 做了 Z，Python 里怎么做？"
- 01-10 用独立小案例，11-22 用 TechBlog CMS 贯穿案例

## 贯穿案例：TechBlog CMS（Python/FastAPI 版）

用 FastAPI 重做 Java/Spring Boot 系列中的同一个 CMS 系统：

```
User:    id, username, email, password_hash, role, avatar, created_at
Post:    id, title, slug, content, status, author_id, view_count
Tag:     id, name, slug, color
Comment: id, content, post_id, author_id, parent_id, created_at
```

跨系列对照：

- Python 13 (CRUD) ↔ Spring Boot 04-05 (REST API + JPA)
- Python 14 (JWT) ↔ Spring Boot 09-10 (Security + JWT)
- Python 19 (WebSocket) ↔ Spring Boot 13 (WebSocket)
- Python 20 (Redis) ↔ Spring Boot 11 (Redis 缓存)
- Python 22 (Docker) ↔ Spring Boot 16 (Docker 部署)

## 文章目录

### 第一阶段：Python 语言基础（01-05，独立小案例）

| 篇号 | 标题                                       | 核心问题                                        | Java 对比重点                                                    |
| ---- | ------------------------------------------ | ----------------------------------------------- | ---------------------------------------------------------------- |
| 01   | 环境搭建：完全不同的工具链                 | "Java 有 Maven，Python 有什么？"                | pyenv vs SDKMAN；venv vs 无；pip vs Maven                        |
| 02   | 核心语法：用 Java 的视角看 Python          | "Python 的缩进真的没有大括号吗？"               | 动态 vs 静态类型；缩进 vs 花括号                                 |
| 03   | 数据结构：list/dict/set 和 Java 集合的对比 | "Python 的 list 是 ArrayList 还是 LinkedList？" | list vs ArrayList；dict vs HashMap；推导式 vs Stream             |
| 04   | OOP：Python 的类和 Java 有什么不同         | "Python 竟然没有 private？"                     | \_\_private vs private；MRO vs 单继承；dataclass vs Lombok       |
| 05   | 高级特性：装饰器、生成器、上下文管理器     | "Python 的装饰器和 Java 的注解是一回事吗？"     | 装饰器 vs 注解+AOP；生成器 vs Stream；with vs try-with-resources |

### 第二阶段：工程化（06-10）

| 篇号 | 标题                | 核心问题                                                 | Java 对比重点                                  |
| ---- | ------------------- | -------------------------------------------------------- | ---------------------------------------------- |
| 06   | 项目工程化          | "Java 有 Maven 标准目录，Python 呢？"                    | pyproject.toml vs pom.xml；ruff vs Checkstyle  |
| 07   | 类型注解与 Pydantic | "Python 的类型注解和 Java 的泛型有什么区别？"            | Type Hint vs 泛型；Pydantic vs Bean Validation |
| 08   | 错误处理            | "Java 的 checked exception 和 Python 的异常有什么不同？" | 没有 checked exception；自定义异常             |
| 09   | 测试                | "JUnit 和 pytest 有什么区别？"                           | pytest vs JUnit；fixture vs @BeforeEach        |
| 10   | 标准库精选          | "Java 标准库和 Python 标准库哪个更强？"                  | pathlib vs Path；logging vs SLF4J              |

### 第三阶段：FastAPI Web 开发（11-15，CMS 贯穿案例开始）

| 篇号 | 标题                  | 核心问题                                     | Java 对比重点         | CMS 对照   |
| ---- | --------------------- | -------------------------------------------- | --------------------- | ---------- |
| 11   | FastAPI 入门          | "FastAPI 和 Spring Boot 有多像？"            | 路由定义；自动文档    | ↔ SB 01-02 |
| 12   | SQLAlchemy 2.0        | "SQLAlchemy 和 Spring Data JPA 有什么不同？" | ORM 风格；会话管理    | ↔ SB 05    |
| 13   | CRUD 实战             | "用 Python 重做 CMS 的文章 API"              | 分层架构；Schema 设计 | ↔ SB 04-05 |
| 14   | JWT 认证              | "Python 的 JWT 和 Java 的有什么不同？"       | 依赖注入方式          | ↔ SB 09-10 |
| 15   | Pydantic 数据验证进阶 | "Pydantic v2 和 Bean Validation 的对比"      | 验证器 vs 校验注解    | ↔ SB 06    |

### 第四阶段：进阶实战（16-22）

| 篇号 | 标题             | 核心问题                                                    | Java 对比重点               | CMS 对照 |
| ---- | ---------------- | ----------------------------------------------------------- | --------------------------- | -------- |
| 16   | 异步编程         | "Python async/await 和 Java CompletableFuture 有什么区别？" | asyncio vs 线程池           |          |
| 17   | 中间件与依赖注入 | "FastAPI Depends 和 Spring @Autowired"                      | 依赖注入模型                | ↔ SB 08  |
| 18   | 文件上传         | "Python 处理文件上传和 Spring Boot 有什么不同？"            | UploadFile vs MultipartFile |          |
| 19   | WebSocket        | "Python WebSocket 和 Spring 的有什么不同？"                 | 实现方式对比                | ↔ SB 13  |
| 20   | Redis 缓存       | "Python Redis 客户端和 Spring Cache 有什么不同？"           | 手动缓存 vs 注解缓存        | ↔ SB 11  |
| 21   | 后台任务         | "Celery 和 Spring @Async 有什么区别？"                      | 消息队列模型                | ↔ SB 12  |
| 22   | Docker 部署      | "Python Docker 化和 Java 有什么不同？"                      | 镜像大小差异                | ↔ SB 16  |

## 预期效果

完成本系列后，你将能够：

1. 快速掌握 Python 核心语法和高级特性
2. 理解 Python 与 Java 的设计哲学差异
3. 使用 FastAPI 构建高性能 RESTful API
4. 对比三种技术栈（Java/Spring Boot/Python/FastAPI）的优劣
5. 具备 Python 后端开发和 AI 方向的基础

_计划创建日期：2026-03-30_
