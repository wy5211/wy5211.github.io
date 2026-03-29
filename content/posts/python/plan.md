# Python 渐进式学习计划

## 背景

本计划面向**有其他编程语言经验**的开发者，帮助你快速掌握 Python 核心特性，并使用 FastAPI 构建生产级 Web 应用。文章采用渐进式设计，从语言特性到工程实践，再到 Web 实战，每篇都包含丰富的代码示例。

**技术栈选择标准**：

- ✅ 市场热门、社区活跃
- ✅ 长期维护、文档完善
- ✅ 企业级应用首选
- ✅ 现代 Python 生态最佳实践

**核心栈**：

- **语言**：Python 3.12+
- **Web 框架**：FastAPI 0.110+
- **ASGI 服务器**：Uvicorn
- **ORM**：SQLAlchemy 2.0 + Alembic
- **数据验证**：Pydantic v2
- **数据库**：PostgreSQL 16
- **缓存**：Redis 7
- **测试**：pytest + httpx
- **类型检查**：mypy
- **包管理**：uv / poetry
- **容器化**：Docker + Docker Compose

---

## 博客目录结构

```
content/posts/python/
├── plan.md                              # 本计划文件
├── 01-getting-started.mdx               # 环境搭建与第一个项目
├── 02-core-syntax.mdx                   # 核心语法速览
├── 03-data-structures.mdx               # 数据结构深入
├── 04-oop-programming.mdx               # 面向对象编程
├── 05-advanced-features.mdx             # 高级特性（装饰器/生成器/上下文管理器）
├── 06-project-structure.mdx             # 包管理与项目工程化
├── 07-type-hints.mdx                    # 类型注解与 Pydantic
├── 08-error-handling-logging.mdx        # 错误处理与日志
├── 09-testing.mdx                       # 测试策略（pytest）
├── 10-stdlib-essentials.mdx             # 标准库精选
├── 11-fastapi-getting-started.mdx       # FastAPI 快速入门
├── 12-database-sqlalchemy.mdx           # 数据库与 SQLAlchemy 2.0
├── 13-crud-operations.mdx               # CRUD 实战：博客 API
├── 14-authentication-jwt.mdx            # JWT 认证与授权
├── 15-data-validation.mdx               # Pydantic 数据验证进阶
├── 16-async-programming.mdx             # 异步编程深入
├── 17-middleware-dependency.mdx         # 中间件与依赖注入
├── 18-file-upload-static.mdx            # 文件上传与静态资源
├── 19-websocket.mdx                     # WebSocket 实时通信
├── 20-caching-redis.mdx                 # 缓存策略
├── 21-background-tasks.mdx              # 后台任务与 Celery
├── 22-docker-deployment.mdx             # Docker 部署与生产优化
└── README.mdx                           # 系列索引
```

---

## 第一阶段：Python 语言基础（5 篇）

### 01. 环境搭建与第一个项目

**目标**：搭建 Python 开发环境，理解包管理，创建第一个项目

**内容要点**：

- Python 版本选择（3.12 LTS）
- 安装方式（系统安装 vs pyenv）
- 虚拟环境（venv / virtualenv）
- 包管理工具（pip / uv / poetry）
- 交互式编程（REPL、IPython、Jupyter）
- 第一个 Python 脚本
- Python 与其他语言的差异速览

**实战示例**：

```python
# 使用 uv 创建项目
# 第一个命令行工具
# 使用 argparse 解析参数
```

---

### 02. 核心语法速览

**目标**：快速掌握 Python 核心语法（面向有经验的开发者）

**内容要点**：

- 变量与动态类型
- 基本数据类型（int、float、str、bool、None）
- 字符串操作（f-string、切片、常用方法）
- 控制流（if/elif/else、match-case）
- 循环（for、while、break/continue、else）
- 函数定义（位置参数、关键字参数、\*args、\*\*kwargs）
- Lambda 与高阶函数
- 列表推导式

**实战示例**：

```python
# 快速排序
# 文件读写
# 使用 match-case 处理复杂分支
```

---

### 03. 数据结构深入

**目标**：深入理解 Python 核心数据结构及其底层实现

**内容要点**：

- 列表（list）：动态数组、常用操作、性能分析
- 元组（tuple）：不可变性、命名元组
- 字典（dict）：哈希表实现、 OrderedDict、defaultdict
- 集合（set）：去重、集合运算
- 推导式进阶（列表/字典/集合推导式、嵌套推导式）
- heapq 堆
- collections 模块（Counter、deque、ChainMap）

**实战示例**：

```python
# 使用 defaultdict 实现词频统计
# 使用 deque 实现滑动窗口
# 使用 Counter 分析数据
```

---

### 04. 面向对象编程

**目标**：掌握 Python OOP 特性，理解与 Java/TS 的差异

**内容要点**：

- 类定义与实例化
- **init** 与 **new**
- 实例属性 vs 类属性
- 继承与 MRO（方法解析顺序）
- 多重继承与 Mixin
- 魔术方法（**str**、**repr**、**eq**、**hash**）
- @property 装饰器
- dataclass 数据类
- Enum 枚举
- 抽象基类（ABC）

**实战示例**：

```python
# 使用 dataclass 定义数据模型
# 实现 Mixin 复用功能
# 使用 __slots__ 优化内存
```

---

### 05. 高级特性

**目标**：掌握 Python 独有的高级特性

**内容要点**：

- 装饰器（函数装饰器、类装饰器、带参数装饰器）
- functools（wraps、lru_cache、partial、singledispatch）
- 生成器（yield、yield from、生成器表达式）
- 迭代器协议（**iter**、**next**）
- 上下文管理器（with 语句、contextlib）
- 描述符（descriptor protocol）
- 协程基础（async def、await）

**实战示例**：

```python
# 实现带过期时间的缓存装饰器
# 使用生成器处理大文件
# 自定义上下文管理器管理数据库连接
```

---

## 第二阶段：Python 工程化（5 篇）

### 06. 包管理与项目工程化

**目标**：掌握现代 Python 项目工程化实践

**内容要点**：

- 项目结构规范（src layout vs flat layout）
- uv / poetry 包管理工具
- pyproject.toml 配置详解
- 依赖管理（生产依赖 vs 开发依赖）
- 开发工具配置（ruff、black、isort）
- pre-commit 钩子
- 环境变量管理（python-dotenv、pydantic-settings）
- **init**.py 的作用

**实战示例**：

```
# 标准项目结构
# pyproject.toml 完整配置
# Makefile / Taskfile 任务自动化
```

---

### 07. 类型注解与 Pydantic

**目标**：掌握 Python 类型系统和 Pydantic 数据验证

**内容要点**：

- 类型注解基础（int、str、List、Dict、Optional、Union）
- TypeAlias 类型别名
- 泛型（TypeVar、Generic）
- Protocol 协议（结构化子类型）
- TypedDict、Literal
- mypy 类型检查
- Pydantic v2 基础（BaseModel、Field）
- Pydantic 数据验证与序列化
- Pydantic Settings 配置管理

**实战示例**：

```python
# 使用 Pydantic 定义 API 请求/响应模型
# 使用 mypy 检查类型
# Pydantic Settings 管理环境配置
```

---

### 08. 错误处理与日志

**目标**：构建健壮的错误处理和日志系统

**内容要点**：

- 异常层次结构
- try/except/else/finally
- 自定义异常类
- 异常链（raise from）
- logging 模块（Logger、Handler、Formatter）
- 日志级别与配置
- 结构化日志（structlog）
- traceback 处理
- 上下文变量（contextvars）

**实战示例**：

```python
# 自定义业务异常体系
# 日志配置最佳实践
# 使用 contextvars 实现请求链路追踪
```

---

### 09. 测试策略

**目标**：掌握 pytest 测试框架，编写可靠的测试

**内容要点**：

- pytest 基础（安装、运行、断言）
- fixture 机制（scope、parametrize）
- 参数化测试
- Mock 与 Patch（unittest.mock）
- 异步测试（pytest-asyncio）
- 覆盖率（pytest-cov）
- 测试目录结构
- conftest.py 配置
- 快照测试

**实战示例**：

```python
# 使用 fixture 管理测试数据
# Mock 外部 API 调用
# 参数化测试多种场景
```

---

### 10. 标准库精选

**目标**：掌握高频使用的标准库模块

**内容要点**：

- pathlib 路径操作
- datetime 日期时间
- json / csv 数据处理
- re 正则表达式
- itertools 迭代工具
- functools 函数工具
- typing 类型工具
- subprocess 进程管理
- httpx / requests 网络请求
- dataclasses 数据类

**实战示例**：

```python
# 使用 pathlib 批量处理文件
# 使用 itertools 处理数据流
# 使用 datetime 处理时区转换
```

---

## 第三阶段：FastAPI Web 开发（5 篇）

### 11. FastAPI 快速入门

**目标**：理解 FastAPI 核心概念，构建第一个 API

**内容要点**：

- 为什么选择 FastAPI（与 Flask、Django 对比）
- 安装与项目创建
- 路由定义（GET、POST、PUT、DELETE）
- 路径参数与查询参数
- 请求体（Pydantic 模型）
- 响应模型（response_model）
- 自动文档（Swagger UI / ReDoc）
- 依赖注入系统概述
- CORS 配置

**实战示例**：

```python
# 构建 Todo API
# GET /todos - 列表查询
# POST /todos - 创建
# PUT /todos/{id} - 更新
# DELETE /todos/{id} - 删除
```

---

### 12. 数据库与 SQLAlchemy 2.0

**目标**：掌握 SQLAlchemy 2.0 新特性，设计数据模型

**内容要点**：

- 为什么选择 SQLAlchemy 2.0
- ORM vs Core 模式
- 声明式映射（Mapped、mapped_column）
- 数据模型关系（一对一、一对多、多对多）
- 会话管理（Session）
- Alembic 数据库迁移
- 查询操作（select、where、join、order_by）
- 分页查询
- 事务处理

**实战示例**：

```python
# 定义 User、Post、Comment 模型
# 使用 Alembic 管理迁移
# 实现复杂的关联查询
```

---

### 13. CRUD 实战：博客 API

**目标**：整合前面知识，构建完整的博客 API

**内容要点**：

- 项目结构设计（分层架构）
- Pydantic Schema 设计（Create/Update/Response）
- 依赖注入管理数据库会话
- CRUD 操作完整实现
- 分页、排序、过滤
- 软删除设计
- 统一响应格式
- 路由组织（APIRouter）

**实战示例**：

```python
# 完整的博客 API
# 用户管理 CRUD
# 文章管理 CRUD（含作者关联）
# 标签管理
# 评论系统
```

---

### 14. JWT 认证与授权

**目标**：实现完整的认证授权系统

**内容要点**：

- 认证 vs 授权
- JWT 原理（Header、Payload、Signature）
- 密码哈希（passlib + bcrypt）
- 登录/注册流程
- JWT Token 生成与验证
- Refresh Token 机制
- 依赖注入实现认证
- 基于角色的权限控制（RBAC）
- OAuth2 集成（可选）

**实战示例**：

```python
# POST /auth/register - 注册
# POST /auth/login - 登录
# POST /auth/refresh - 刷新 Token
# GET /auth/me - 获取当前用户
# 实现依赖注入的权限守卫
```

---

### 15. Pydantic 数据验证进阶

**目标**：深入 Pydantic v2，掌握复杂数据验证场景

**内容要点**：

- Pydantic v1 vs v2 差异
- Field 验证器（ge、le、regex、alias）
- 自定义验证器（field_validator、model_validator）
- 嵌套模型与递归验证
- Generic Models
- model_dump / model_validate 序列化
- 自定义数据类型
- Pydantic 与 SQLAlchemy 模型转换

**实战示例**：

```python
# 复杂的注册表单验证
# 分页参数通用模型
# API 响应统一封装
```

---

## 第四阶段：进阶实战（5 篇）

### 16. 异步编程深入

**目标**：掌握 Python 异步编程模型

**内容要点**：

- 同步 vs 异步
- asyncio 事件循环
- async/await 语法
- asyncio 任务（create_task、gather、wait）
- 异步上下文管理器
- 异步迭代器
- 异步数据库操作（asyncpg、SQLAlchemy async）
- 同步与异步混合使用的注意事项

**实战示例**：

```python
# 并发请求多个 API
# 异步数据库操作
# 使用 asyncio.Semaphore 控制并发数
```

---

### 17. 中间件与依赖注入

**目标**：深入 FastAPI 中间件和依赖注入机制

**内容要点**：

- 中间件原理与执行顺序
- 自定义中间件（请求日志、耗时统计）
- 内置中间件（CORS、GZip、HTTPSRedirect）
- 依赖注入进阶（Depends、yield 依赖）
- 依赖作用域
- 子依赖与多层依赖
- 全局依赖 vs 路由依赖
- 生命周期事件（lifespan）

**实战示例**：

```python
# 请求日志中间件
# 数据库会话依赖注入
# 认证依赖与权限依赖
# 应用启动/关闭生命周期管理
```

---

### 18. 文件上传与静态资源

**目标**：实现文件上传和静态资源服务

**内容要点**：

- UploadFile 文件上传
- 文件类型与大小验证
- 本地文件存储
- 云存储集成（S3 / OSS）
- 图片处理（Pillow）
- 静态文件挂载（StaticFiles）
- 大文件流式上传

**实战示例**：

```python
# POST /upload/avatar - 头像上传
# POST /upload/images - 批量图片上传
# 图片压缩与缩略图生成
# 静态资源服务
```

---

### 19. WebSocket 实时通信

**目标**：实现 WebSocket 实时功能

**内容要点**：

- WebSocket 原理
- FastAPI WebSocket 支持
- 连接管理器设计
- 广播与定向推送
- 房间（Room）机制
- 心跳检测
- 认证与授权
- 实际应用场景

**实战示例**：

```python
# 实时聊天室
# 在线用户列表
# 实时通知推送
```

---

### 20. 缓存策略

**目标**：使用 Redis 实现高效缓存

**内容要点**：

- 缓存的应用场景
- Redis 数据结构速览
- redis-py 使用
- 缓存装饰器
- 缓存穿透、击穿、雪崩
- 缓存过期策略
- 分布式锁
- FastAPI 中集成 Redis

**实战示例**：

```python
# 用户信息缓存
# API 响应缓存
# 分布式锁实现
# 热点数据缓存预热
```

---

### 21. 后台任务与 Celery

**目标**：处理耗时异步任务

**内容要点**：

- FastAPI BackgroundTasks（轻量级）
- 为什么需要 Celery
- Celery 架构（Broker、Worker、Result Backend）
- 任务定义与调用
- 任务状态追踪
- 定时任务（Celery Beat）
- 任务重试与失败处理
- 任务优先级与路由

**实战示例**：

```python
# 邮件发送后台任务
# 数据导出异步任务
# 图片处理队列
```

---

## 第五阶段：生产部署（1 篇）

### 22. Docker 部署与生产优化

**目标**：容器化部署，生产环境最佳实践

**内容要点**：

- Dockerfile 最佳实践（多阶段构建）
- Docker Compose（App + PostgreSQL + Redis + Worker）
- Uvicorn 生产配置（workers、keep-alive）
- Nginx 反向代理
- 环境变量管理
- 健康检查
- 日志管理
- 安全配置（HTTPS、Rate Limiting）
- 性能优化

**实战示例**：

```dockerfile
# 多阶段 Dockerfile
# Docker Compose 完整配置
# Nginx 配置
# Gunicorn + Uvicorn 部署方案
```

---

## 写作规范

### 每篇文章结构

```
---
title: "文章标题"
date: "YYYY-MM-DD"
summary: "一句话总结（100字以内）"
tags: ["Python", "相关标签"]
category: "python"
cover: ""
draft: false
series: "Python 渐进式学习"
seriesOrder: N
---
```

### 代码示例要求

1. **完整性**：每个示例都是可独立运行的代码
2. **渐进式**：从简单到复杂，逐步深入
3. **注释**：关键代码添加中文注释
4. **错误处理**：展示正确的错误处理方式
5. **类型注解**：充分利用 Python 类型系统

### 实战项目贯穿

所有文章围绕一个统一的实战项目展开：**博客系统 API**

**功能模块**：

- 用户管理（注册、登录、资料）
- 文章管理（CRUD、发布、草稿）
- 评论系统
- 标签分类
- 文件上传
- 实时通知
- 缓存优化

---

## 学习路径图

```
┌─────────────────────────────────────────────────────────────┐
│                   Python 学习路径                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  第一阶段：Python 语言基础                                    │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │01.环境搭建  │─►│02.核心语法  │─►│03.数据结构  │               │
│  └────────────┘ └────────────┘ └────────────┘               │
│                                        │                    │
│  ┌────────────┐ ┌────────────┐         │                    │
│  │05.高级特性  │─►│04.OOP编程  │─────────┘                    │
│  └────────────┘ └────────────┘                              │
│       │                                                     │
│  ▼    ▼                                                     │
│  第二阶段：Python 工程化                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │06.项目工程化│─►│07.类型注解  │─►│08.错误处理  │               │
│  └────────────┘ └────────────┘ └────────────┘               │
│                                        │                    │
│  ┌────────────┐ ┌────────────┐         │                    │
│  │10.标准库    │─►│09.测试策略  │─────────┘                    │
│  └────────────┘ └────────────┘                              │
│       │                                                     │
│  ▼    ▼                                                     │
│  第三阶段：FastAPI Web 开发                                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐               │
│  │11.FastAPI   │─►│12.SQLAlchemy│─►│13.CRUD实战 │               │
│  │  入门       │ │  2.0       │ │  博客API   │               │
│  └────────────┘ └────────────┘ └────────────┘               │
│                                        │                    │
│  ┌────────────┐ ┌────────────┐         │                    │
│  │15.数据验证  │─►│14.JWT认证  │─────────┘                    │
│  │  进阶       │ │  授权      │                              │
│  └────────────┘ └────────────┘                              │
│       │                                                     │
│  ▼    ▼                                                     │
│  第四阶段：进阶实战                                           │
│  ┌──────────────────────────────────────────┐               │
│  │ 16.异步编程 │ 17.中间件 │ 18.文件上传     │               │
│  ├──────────────────────────────────────────┤               │
│  │ 19.WebSocket │ 20.缓存 │ 21.后台任务     │               │
│  └──────────────────────────────────────────┘               │
│       │                                                     │
│  ▼    ▼                                                     │
│  第五阶段：生产部署                                           │
│  ┌──────────────────────────────────────────┐               │
│  │     22. Docker 部署与生产优化              │               │
│  └──────────────────────────────────────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 预期效果

完成本系列学习后，读者将能够：

1. 熟练掌握 Python 核心语法和高级特性
2. 理解 Python 与其他语言的差异和最佳实践
3. 使用现代工具链构建规范的 Python 项目
4. 使用 FastAPI 构建高性能 RESTful API
5. 熟练使用 SQLAlchemy 2.0 进行数据库操作
6. 实现完整的认证授权系统
7. 掌握异步编程模型
8. 使用 Docker 容器化部署
9. 具备 Python 后端全栈开发能力

---

## 版本信息

- **Python**：3.12+
- **FastAPI**：0.110+
- **SQLAlchemy**：2.0+
- **Pydantic**：v2
- **PostgreSQL**：16
- **Redis**：7.x
- **uvicorn**：0.27+

_计划创建日期：2026-03-29_
