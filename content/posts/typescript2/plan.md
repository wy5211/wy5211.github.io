# TypeScript 类型系统进阶

## 背景

你用 TypeScript 写了一年多，泛型会用了，联合类型也懂了，interface 和 type 随便切换。但一看到开源库里 `T extends infer U ? ... : never` 这种代码就头大。自己想写一个类型安全的工具函数，类型怎么都推导不出来。

这个系列从"这个类型能帮我解决什么问题"出发，带你逐步构建一个**类型安全的 HTTP API 客户端**。每解决一个真实的类型问题，你就自然掌握了一个 TypeScript 类型特性。

### 技术栈

| 技术       | 版本   | 说明                                                       |
| ---------- | ------ | ---------------------------------------------------------- |
| TypeScript | 5.9+   | 最新稳定版，覆盖 satisfies、const 类型参数、方差注解等特性 |
| Node.js    | 22 LTS | 运行示例代码                                               |

> 如果你刚入门 TypeScript，建议先打好基础再来看本系列。本系列不覆盖 interface、泛型基础、类型断言等入门内容，直接攻克类型系统的进阶难点。

---

## 主线案例：类型安全的 HTTP API 客户端

整个系列围绕构建一个**类型安全的 HTTP API 客户端**展开。你定义一个 API 路由表，客户端自动推导出每个接口的请求参数类型和响应类型。调用时参数传错或响应类型用错，编译器直接报错。

**案例场景**：为团队封装统一的 API 调用层。后端有 30+ 个接口，前端之前用 any 到处传，出了 bug 难排查。现在要做成类型安全的。

**贯穿全系列的数据**：

```typescript
// API 路由定义——这就是我们最终要实现的类型系统
const api = {
  'GET /users': { response: User[] },
  'GET /users/:id': { params: { id: string }; response: User },
  'POST /users': { body: CreateUserDTO; response: User },
  'POST /users/:id/avatar': { params: { id: string }; body: FormData; response: { url: string } },
  'GET /users/:userId/orders/:orderId': { params: { userId: string; orderId: string }; response: Order },
}

// 使用——编译期检查参数和响应类型
const users = await client.get('/users')                              // 返回 User[]
const user = await client.get('/users/:id', { id: 'usr_a1x9k2m' })   // 返回 User
const newUser = await client.post('/users', { name: 'zhang_wei', email: 'zw@example.com' })
```

**业务数据示例**：

```typescript
// 真实场景中的数据
interface User {
  userId: string; // "usr_a1x9k2m"
  username: string; // "zhang_wei"
  email: string; // "zw@example.com"
  plan: "free" | "pro" | "enterprise";
  createdAt: string; // "2025-11-20T08:30:00Z"
}

interface Order {
  orderId: string; // "ord_7n3j5k"
  userId: string; // "usr_a1x9k2m"
  items: OrderItem[];
  totalAmount: number; // 单位：分，如 12900 = ¥129.00
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
}
```

---

## 系列节奏

```
基础篇（01-03）：独立小案例，建立类型系统直觉
  → 每篇一个独立场景，降低入门门槛

核心篇（04-06）：引入 API 客户端案例，深入类型设计
  → 品牌类型防止数据混淆、工具类型实现、映射类型变换

进阶篇（07-09）：深入类型系统底层
  → 函数签名设计、装饰器元数据、协变逆变与方差注解

实战篇（10）：性能优化与综合回顾
  → 类型性能、isolatedDeclarations、综合实战
```

---

## 博客目录结构

```
content/posts/typescript/
├── plan.md                              # 本计划文件
├── 01-conditional-types-inference.mdx   # 条件类型与 infer
├── 02-template-literal-types.mdx        # 模板字面量类型
├── 03-advanced-generics.mdx             # 泛型高级应用
├── 04-branding-type-guards.mdx          # 品牌类型与类型守卫
├── 05-utility-types-implementation.mdx  # 工具类型实现原理
├── 06-mapped-types-remapping.mdx        # 映射类型与 Key Remapping
├── 07-function-overloading.mdx          # 函数重载与签名设计
├── 08-decorators-metadata.mdx           # 装饰器与元数据
├── 09-covariance-contravariance.mdx     # 协变、逆变与方差注解
└── 10-type-performance.mdx              # 类型性能优化与综合实战
```

---

## 基础篇：独立小案例（01-03）

目标：用 3 篇文章帮你建立对 TypeScript 类型系统的直觉。

---

### 01. 条件类型与 infer：TypeScript 的 if-else

**核心问题**：你在写工具函数，想根据传入的泛型自动推导类型——传 User 就返回 User，传 Promise\<User\> 就返回 User。怎么做？

**主线案例**：实现一组实用的类型工具——提取 Promise 内部类型、提取函数返回值类型、递归展开嵌套 Promise。用 Fetch API 的响应处理作为驱动场景。

**内容要点**：

- 条件类型语法：T extends U ? X : Y
- 分布式条件类型：联合类型的自动展开
- infer 关键字：在条件类型中"捕获"类型
- 多个 infer：同时提取多个位置的类型
- 递归条件类型：处理嵌套结构
- NoInfer 工具类型（TS 5.4）：阻止不想要的类型推断

**与前篇关联**：系列第一篇，无前篇。

---

### 02. 模板字面量类型：字符串也能做类型检查

**核心问题**：项目有几十个事件名，格式都是 "module:action"。你想让 emit 和 on 的事件名和参数类型一一对应，手写太累。

**主线案例**：实现类型安全的事件系统和路由参数提取——事件名与参数自动关联，URL 路径中的参数自动提取为对象类型。

**内容要点**：

- 模板字面量类型语法：`${A}-${B}`
- 内置字符串工具类型：Uppercase、Lowercase、Capitalize、Uncapitalize
- 字符串模式匹配：从字符串字面量中提取部分
- 路由参数提取：/users/:userId/posts/:postId → { userId: string; postId: string }
- 类型安全的事件系统实战

**与前篇关联**：上一篇学了条件类型的判断能力，这一篇把条件类型用在字符串上。

---

### 03. 泛型高级应用：让函数通用又安全

**核心问题**：你写了一个深度合并对象的函数，想支持任意嵌套层级的对象。泛型写到第三层就开始头大了。

**主线案例**：实现类型安全的路径访问工具（类似 lodash.get 但有完整类型推导）、深度 Readonly、类型安全的配置合并。

**内容要点**：

- 多个泛型参数的协作
- 泛型约束 extends
- 默认泛型参数
- 递归泛型：处理任意深度的嵌套结构
- const 类型参数（TS 5.0）：保留字面量类型
- satisfies 操作符（TS 4.9）：验证类型不丢失字面量信息
- 什么时候该用泛型，什么时候该用联合类型

**与前篇关联**：前两篇学了条件类型和模板字面量，这一篇用泛型把它们串联起来。

---

## 核心篇：API 客户端案例（04-06）

目标：引入类型安全的 API 客户端作为贯穿案例，深入品牌类型、工具类型和映射类型。

---

### 04. 品牌类型与类型守卫：防止数据混淆

**核心问题**：API 客户端里 userId 和 orderId 都是 string，传混了编译器不报错。string 太宽泛了。

**主线案例**：为 API 客户端设计类型安全的 ID 系统——UserId 和 OrderId 传错编译器报错；实现运行时类型验证。

**内容要点**：

- TypeScript 的结构化类型系统：为什么 string 和 string 是"一样的"
- 品牌类型（Branded Types）：给 string 加"身份标识"
- 品牌类型的运行时验证
- 类型谓词（arg is Type）：自定义类型守卫
- 断言函数（asserts）：验证失败直接抛错
- 可辨识联合（Discriminated Unions）
- TS 5.5 自动 .filter() 收窄

**与前篇关联**：前几篇返回的都是基础类型，这一篇让类型更精确。

---

### 05. 工具类型实现原理：读懂内置工具类型

**核心问题**：你每天都在用 Partial、Pick、Omit、Record，但不知道它们怎么实现的。理解原理才能自己写。

**主线案例**：从零实现核心内置工具类型，并构建 API 客户端需要的自定义工具类型——DeepPartial、DeepOmit。

**内容要点**：

- 映射类型基础：[P in keyof T]
- Partial / Required / Readonly 实现
- Record / Pick / Omit / Exclude / Extract 实现
- 深度工具类型：DeepReadonly、DeepPartial、DeepOmit
- 工具类型的组合

**与前篇关联**：上一篇精确化了单个值的类型，这一篇批量变换对象类型。

---

### 06. 映射类型与 Key Remapping：批量变换对象类型

**核心问题**：后端返回 snake_case 字段名，前端要用 camelCase。手动一个个转换太痛苦。

**主线案例**：为 API 客户端实现自动化的类型变换——snake_case 到 camelCase 的字段名转换、提取可选字段。

**内容要点**：

- Key Remapping（as 子句）：在映射类型中重命名属性
- 模板字面量在映射中的应用：批量转换属性名
- 条件过滤：用 as never 过滤属性
- 为对象生成 getter/setter 类型
- 映射类型的实际应用：API 响应类型转换

**与前篇关联**：上一篇实现了基础工具类型，这一篇用 Key Remapping 做更高级的变换。

---

## 进阶篇：深入类型系统（07-09）

目标：深入函数签名设计、装饰器元数据、类型系统底层的协变逆变。

---

### 07. 函数重载与签名设计：设计优雅的 API

**核心问题**：API 客户端的 get 方法有时候传 string，有时候传对象。一个函数签名搞不定。

**主线案例**：为 API 客户端设计类型精确的函数签名——不同参数对应不同返回类型的重载、链式调用的类型推导。

**内容要点**：

- 函数重载语法与顺序
- 联合类型 vs 重载：什么时候该用哪个
- 泛型函数重载
- this 类型：链式调用
- 设计模式中的重载：工厂函数、策略模式

**与前篇关联**：前几篇构建了类型工具，这一篇用它们设计函数 API。

---

### 08. 装饰器与元数据：运行时的类型信息

**核心问题**：TypeScript 的类型编译后就没了。但 API 客户端需要在运行时知道参数类型来做序列化。

**主线案例**：用装饰器标注字段的序列化规则，用 reflect-metadata 存储和读取元数据。

**内容要点**：

- 类型擦除：为什么运行时没有类型
- 装饰器基础：类、方法、属性、参数装饰器
- 装饰器工厂：带参数的装饰器
- reflect-metadata API
- TS 5.0+ 装饰器新语法
- 实际应用：验证框架、ORM 字段映射

**与前篇关联**：前面所有类型操作都在编译期，这一篇桥接编译期和运行时。

---

### 09. 协变、逆变与方差注解：理解类型系统的方向性

**核心问题**：面试官问"函数参数是协变还是逆变"你答不上来。实际开发中也遇到过——类型看着没问题，编译器却报错。

**主线案例**：理解类型兼容性在 API 客户端中的影响——回调函数的类型安全、事件监听器的类型推导。
**内容要点**：

- 赋值兼容性：子类型可以赋值给父类型
- 函数参数的逆变
- 函数返回值的协变
- 方差注解（TS 5.x）：in / out 关键字
- 数组协变的风险
- 什么时候需要关心，什么时候不用管

**与前篇关联**：前几篇一直在创建类型，这一篇理解类型之间的关系。

---

## 实战篇（10）

目标：优化类型性能，综合运用全系列知识完成 API 客户端。

---

### 10. 类型性能优化与综合实战

**核心问题**：类型工具写好了，但项目编译时间从 10 秒涨到了 2 分钟。复杂条件类型和递归泛型是性能杀手。

**主线案例**：优化 API 客户端的类型性能，综合运用全系列知识完成最终版。

**内容要点**：

- TypeScript 编译器性能瓶颈
- 避免过度复杂的条件类型
- 递归类型的深度限制
- isolatedDeclarations（TS 5.5）：优化声明文件生成
- erasableSyntaxOnly（TS 5.8）：配合 Node.js 原生 TS 执行
- 诊断类型性能：--extendedDiagnostics
- 综合实战：回顾 API 客户端的完整类型设计

**与前篇关联**：前 9 篇掌握了类型系统各方面，这一篇解决性能问题并综合回顾。

---

## 学习路径图

```
基础篇 ─────────────────────────────────────────────
  01 条件类型 ──► 02 模板字面量 ──► 03 高级泛型
                                          │
核心篇 ─────────────────────────────────────────────
          04 品牌类型与类型守卫
                │
          05 工具类型实现
                │
          06 映射类型
                          │
进阶篇 ─────────────────────────────────────────────
       07 函数重载 ──► 08 装饰器 ──► 09 协变逆变
                                           │
实战篇 ─────────────────────────────────────────────
       10 类型性能优化与综合实战
```

---

## 预期效果

完成本系列后，你将能够：

- 读懂开源库中的复杂类型定义
- 灵活运用条件类型、模板字面量类型、递归泛型
- 设计类型安全的 API 和工具函数
- 用品牌类型防止类型混淆
- 自己实现需要的工具类型
- 理解协变逆变和方差注解
- 用装饰器桥接编译期和运行时
- 优化复杂类型的编译性能

---

## 版本信息

- **TypeScript**：5.9+
- **Node.js**：22 LTS
