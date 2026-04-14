# Go 语言渐进式学习计划

## 背景

你学过 Java 或 Python，但想学一门更现代的语言。你听说 Go 性能好、并发强、部署简单，Docker 和 Kubernetes 都是用它写的。

Go 确实是个好选择。它比 Java 简洁，比 Python 快，原生支持并发。但它的语法和你熟悉的语言不太一样：没有 `try-catch`、没有 `class`、没有泛型那套复杂的东西。

### 技术栈

| 技术      | 用途     |
| --------- | -------- |
| Go        | 1.22+    |
| Module    | 依赖管理 |
| goroutine | 并发     |
| channel   | 通信     |

---

## 主线案例：任务队列 API

整个系列围绕一个**任务队列 API**展开，类似后台任务处理服务。

**案例场景**：

- 创建任务、分配给 Worker
- Worker 并发处理任务
- 实时进度查询
- 任务结果存储

---

## 系列节奏

```
基础篇（01-07）：语言基础
  → 入门、语法、运算符、数据类型、控制流、函数

核心篇（08-12）：类型系统
  → 结构体、接口、错误处理

并发篇（13-15）：Go 的特色
  → goroutine、channel、并发模式

工程篇（16-20）：生产实践
  → 文件操作、HTTP、数据库、测试、反射、context、RESTful API
```

---

## 博客目录结构

```
content/posts/golang/
├── plan.md                     # 本计划文件
├── 01-getting-started.mdx      # Go 快速入门
├── 02-basic-syntax.mdx         # 基础语法
├── 03-operators.mdx            # 运算符
├── 04-data-types.mdx            # 数据类型
├── 05-control-flow.mdx         # 控制流
├── 06-functions.mdx            # 函数
├── 07-struct-method.mdx        # 结构体和方法
├── 08-interfaces.mdx           # 接口
├── 09-error-handling.mdx        # 错误处理
├── 10-goroutine.mdx            # goroutine
├── 11-channels.mdx             # channel
├── 12-concurrency-patterns.mdx  # 并发模式
├── 13-packages.mdx             # 包管理
├── 14-file-operations.mdx      # 文件操作
├── 15-http-programming.mdx     # HTTP 编程
├── 16-database.mdx             # 数据库
├── 17-testing.mdx              # 测试
├── 18-reflection.mdx           # 反射
├── 19-context.mdx               # Context
└── 20-restful-api.mdx           # RESTful API 实战
```

---

## 基础篇：语言基础（01-07）

### 01. Go 快速入门

**核心问题**：Go 和其他语言有什么不同？为什么要学 Go？

**内容要点**：

- Go 的设计哲学
- 环境搭建
- 第一个 Go 程序
- go mod 基础

### 02. 基础语法

**核心问题**：Go 的变量声明、常量、基本语法是什么样的？

**内容要点**：

- 变量声明（var、:=）
- 常量（const）
- 基本数据类型
- fmt 格式化输出

### 03. 运算符

**核心问题**：Go 的运算符和其他语言有什么不同？

**内容要点**：

- 算术运算符
- 比较运算符
- 逻辑运算符
- 位运算符

### 04. 数据类型

**核心问题**：Go 有哪些数据类型？和别的语言有什么区别？

**内容要点**：

- 基本类型
- 数组和切片
- map
- 指针

### 05. 控制流

**核心问题**：Go 的 if、for、switch 有什么特别之处？

**内容要点**：

- if 语句
- for 循环（只有一种）
- switch 语句
- defer

### 06. 函数

**核心问题**：Go 的函数和方法的定义是什么样的？

**内容要点**：

- 函数定义
- 多返回值
- 可变参数
- 匿名函数

### 07. 结构体和方法

**核心问题**：Go 没有 class，怎么实现面向对象？

**内容要点**：

- 结构体定义
- 方法
- 值接收者 vs 指针接收者

---

## 核心篇：类型系统（08-09）

### 08. 接口

**核心问题**：Go 的接口是什么？和 Java 的 interface 有什么区别？

**内容要点**：

- 接口定义
- 隐式实现
- 空接口
- 接口组合

### 09. 错误处理

**核心问题**：Go 没有 try-catch，怎么处理错误？

**内容要点**：

- error 类型
- if err != nil 模式
- panic 和 recover
- 自定义错误

---

## 并发篇（10-12）

### 10. goroutine

**核心问题**：goroutine 是什么？怎么启动并发？

**内容要点**：

- go 关键字
- goroutine 调度
- WaitGroup
- 最佳实践

### 11. channel

**核心问题**：channel 是什么？怎么用于通信？

**内容要点**：

- channel 创建
- 发送和接收
- 缓冲 channel
- select 语句
- 超时控制

### 12. 并发模式

**核心问题**：怎么用 goroutine 和 channel 实现常见的并发模式？

**内容要点**：

- Worker Pool
- Pipeline
- Fan-out/Fan-in
- 生产者消费者

---

## 工程篇（13-20）

### 13. 包管理

**核心问题**：Go 的模块系统是怎么工作的？

**内容要点**：

- go mod
- 包导入路径
- 内部包
- 第三方依赖

### 14. 文件操作

**核心问题**：Go 怎么读写文件？

**内容要点**：

- os 和 io 包
- bufio 缓冲
- 文件路径处理
- 目录操作

### 15. HTTP 编程

**核心问题**：怎么写 HTTP 服务器和客户端？

**内容要点**：

- net/http 包
- 服务器实现
- 客户端请求
- JSON 处理

### 16. 数据库

**核心问题**：Go 怎么连接数据库？

**内容要点**：

- database/sql 包
- 连接池
- 事务处理
- ORM 介绍

### 17. 测试

**核心问题**：Go 怎么写测试？

**内容要点**：

- testing 包
- 表驱动测试
- Testify
- 测试覆盖率

### 18. 反射

**核心问题**：怎么在运行时检查类型？

**内容要点**：

- reflect 包
- Type 和 Value
- 动态调用
- 性能考虑

### 19. Context

**核心问题**：怎么实现请求取消和超时控制？

**内容要点**：

- Context 类型
- 取消信号
- 超时控制
- 最佳实践

### 20. RESTful API 实战

**核心问题**：把所有知识整合起来，构建完整的 API？

**内容要点**：

- 项目结构
- 路由设计
- 中间件
- 数据库集成
- 系列回顾

---

## 预期效果

完成本系列后，你将能够：

- 理解 Go 的设计哲学和核心特性
- 掌握 Go 的基础语法和类型系统
- 熟练使用 goroutine 和 channel 编写并发程序
- 理解接口和错误处理机制
- 进行文件操作和 HTTP 编程
- 编写测试和部署 Go 应用
- 构建生产级的 RESTful API
