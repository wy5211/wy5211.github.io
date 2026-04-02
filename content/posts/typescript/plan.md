# TypeScript 类型系统进阶

## 背景

你用 TypeScript 写了一年多，泛型会用了，联合类型也懂了，interface 和 type 随便切换。但一看到开源库里 `T extends infer U ? ... : never` 这种代码就头大。自己想写一个类型安全的工具函数，发现类型怎么都推导不出来。面试官问"什么是协变和逆变"，你只能尴尬地笑笑。

这个系列不会把类型体操题刷一遍，而是从"这个类型能帮我解决什么问题"出发，带你逐步构建一个**类型安全的 HTTP API 客户端**。每解决一个真实的类型问题，你就自然掌握了一个 TypeScript 类型特性。

### 技术栈

- **TypeScript 5.x**
- **Node.js 22 LTS**

> 如果你刚入门 TypeScript，建议先打好基础再来看本系列。本系列不覆盖 interface、泛型基础、类型断言等入门内容，直接攻克类型系统的进阶难点。

---

## 主线案例：类型安全的 HTTP API 客户端

整个系列围绕构建一个类型安全的 HTTP API 客户端展开。你定义一个 API 路由表，客户端自动推导出每个接口的请求参数类型和响应类型。调用时参数传错或响应类型用错，编译器直接报错。

**案例场景**：为团队封装统一的 API 调用层。后端有 30+ 个接口，前端之前用 any 到处传，出了 bug 难排查。现在要做成类型安全的。

**案例数据**（贯穿全系列）：

```typescript
const apiRoutes = {
  'GET /users': { response: User[] },
  'GET /users/:id': { params: { id: string }; response: User },
  'POST /users': { body: CreateUserDTO; response: User },
  'POST /users/:id/avatar': { params: { id: string }; body: FormData; response: { url: string } },
  'GET /users/:userId/orders/:orderId': { params: { userId: string; orderId: string }; response: Order },
} as const;

// 使用 —— 编译期检查参数和响应类型
const users = await client.get('/users')           // 返回 User[]
const user = await client.get('/users/:id', { id: 'usr_a1x9k2m' })  // 返回 User
```

---

## 博客目录结构

```
content/posts/typescript/
├── plan.md
├── 01-conditional-types-inference.mdx
├── 02-template-literal-types.mdx
├── 03-advanced-generics.mdx
├── 04-type-safety-patterns.mdx
├── 05-function-signatures.mdx
└── 06-type-system-internals.mdx
```

---

## 每篇文章大纲

### 01. 条件类型与 infer：TypeScript 的 if-else

**核心问题**：用 Fetch API 写请求时，想根据传入的泛型自动推导响应类型——传 User 就返回 User，传 Promise\<User\> 就返回 User。怎么做？

**主线案例**：实现 API 响应类型提取工具——从 Promise 中解包类型、从函数签名中提取参数和返回值

**内容要点**：

1. 条件类型语法：T extends U ? X : Y
2. 分布式条件类型：为什么联合类型会自动展开
3. infer 关键字：在条件类型中"捕获"类型
4. 多个 infer：同时提取多个位置的类型
5. 递归条件类型：处理嵌套 Promise
6. 实战：提取 API 响应中的 data 字段类型

**与前篇关联**：系列第一篇，无前篇

---

### 02. 模板字面量类型：让字符串参与类型检查

**核心问题**：API 路由是 `GET /users/:id` 这样的字符串，怎么从中自动提取出 `{ id: string }` 这样的参数类型？

**主线案例**：为 API 客户端实现路由参数自动提取——从路由字符串推导出参数对象类型

**内容要点**：

1. 模板字面量类型语法：`${A}-${B}`
2. 内置字符串工具类型：Uppercase、Lowercase、Capitalize、Uncapitalize
3. 字符串模式匹配：用模板字面量匹配和提取字符串
4. 从路由中提取路径参数：`/users/:id` → `{ id: string }`
5. 实战：生成 API 路由的完整类型定义

**与前篇关联**：上篇学了条件类型的判断能力，这篇把条件类型用在字符串上

---

### 03. 泛型高级应用：构建灵活的类型工具

**核心问题**：API 响应经常是深层嵌套的——`{ code: number, data: { user: { posts: [...] } } }`。怎么做一个"深度 Partial"只让叶子节点变可选？

**主线案例**：实现泛型工具——深度 Readonly/Partial、类型安全的路径访问、API 响应类型变换

**内容要点**：

1. 多个泛型参数的协作
2. 泛型约束 extends
3. 默认泛型参数
4. 递归泛型：处理任意深度的嵌套结构
5. 泛型 + 条件类型 + 模板字面量的组合
6. 实战：类型安全的 lodash.get、API 响应字段提取

**与前篇关联**：前两篇学了条件类型和模板字面量，这篇用泛型把它们串联起来

---

### 04. 类型安全模式：品牌类型与工具类型

**核心问题**：API 客户端里 userId 和 orderId 都是 string，传混了编译器不会报错——直到线上出 bug。怎么让编译器区分"语义不同但底层类型相同"的值？

**主线案例**：为 API 客户端设计类型安全层——品牌类型防止 ID 混淆、工具类型批量变换 API 响应、映射类型处理字段名转换

**内容要点**：

1. 品牌类型（Branded Types）：给 string 加上"身份标识"
2. 类型谓词和断言函数：运行时验证 + 编译时类型收窄
3. 工具类型实现原理：Partial/Pick/Omit 是怎么工作的
4. 映射类型与 Key Remapping：snake_case → camelCase 自动转换
5. 实战：API 响应的类型安全包装

**与前篇关联**：前几篇的类型工具返回基础类型，这篇让类型更精确、更安全

---

### 05. 函数签名设计：重载与装饰器

**核心问题**：API 客户端的 get 方法有时传 string（路径），有时传对象（路径+查询参数）。一个函数签名搞不定，用联合类型又丢失类型推导精度。

**主线案例**：为 API 客户端设计类型精确的函数签名，用装饰器实现请求拦截和响应转换

**内容要点**：

1. 函数重载：多个签名 + 一个实现
2. 联合类型 vs 重载的选择
3. 泛型函数重载
4. 装饰器：桥接编译期类型和运行时行为
5. 实战：API 客户端的类型安全调用接口

**与前篇关联**：前几篇构建了类型工具，这篇用它们设计出类型精确的函数 API

---

### 06. 类型系统深入：协变逆变与性能

**核心问题**：明明类型看着没问题，编译器却报错。TypeScript 的类型兼容规则到底是什么？复杂类型写多了，编译时间从 10 秒涨到 2 分钟怎么办？

**主线案例**：理解类型兼容性对 API 客户端的影响——回调函数类型安全、事件监听器、编译性能优化

**内容要点**：

1. 协变：子类型赋值给父类型
2. 逆变：函数参数的类型方向
3. 什么时候需要关心协变逆变
4. 类型性能瓶颈：什么操作最慢
5. 简化策略和诊断工具
6. 系列回顾：API 客户端的完整类型设计

**与前篇关联**：前 5 篇一直在创建类型，这篇理解类型之间的关系和性能

---

## 学习路径

```
01 条件类型 ──► 02 模板字面量 ──► 03 高级泛型
                                    │
                          04 类型安全模式
                                    │
                          05 函数签名设计
                                    │
                          06 类型系统深入
```

---

## 预期效果

学完后将具备：

- 读懂开源库中的复杂类型定义
- 灵活运用条件类型、模板字面量类型、递归泛型
- 设计类型安全的 API 和工具函数
- 用品牌类型防止类型混淆的错误
- 自己实现需要的工具类型
- 理解协变逆变，写出类型兼容的代码
- 优化复杂类型的编译性能
