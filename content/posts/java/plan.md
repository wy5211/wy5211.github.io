# Java 渐进式实战：JS 开发者的 Java 入门

## 背景

本系列面向 **有 JavaScript/TypeScript 经验的开发者**，通过对比迁移的方式系统掌握 Java 核心知识。每篇文章都会回答"Java 和 JS 在这点上有什么不同"，帮助你利用已有的编程经验快速上手 Java。

**核心版本**：Java 17 (LTS) | Maven | IntelliJ IDEA

## 写作规范

- 从具体问题/场景开头，禁止"本文将介绍..."
- 代码占比 < 40%，每段代码有引导语和解读
- 结尾是 trade-off 分析，不是复选框总结
- 每篇有 JS vs Java 对比表
- 01-04 用独立小案例，05-20 用 TechBlog CMS 贯穿案例

## 贯穿案例：TechBlog CMS

从第 5 篇开始，围绕一个技术博客的内容管理系统展开：

```
Post:    id, title, slug, content(markdown), status(DRAFT/PUBLISHED),
         authorId→User, viewCount, createdAt, publishedAt
Tag:     id, name, slug, color
User:    id, username, email, role(ADMIN/AUTHOR/READER)
Comment: id, content, postId→Post, authorId→User, parentId→Comment
```

案例演进：

- 05-06: 定义 Post/Tag 类，封装字段
- 07: Post 继承 Content 基类
- 08: Taggable 接口、Comparable 接口
- 09: PostStatus 枚举
- 10: 文章发布流程异常处理
- 11-13: List 管理文章、Set 去重标签、Map 缓存
- 14: 泛型文章仓库
- 15: Stream 过滤统计文章
- 16: Markdown 文件 IO
- 17-18: 多线程处理文章
- 19-20: Lambda 处理标签匹配

## 文章目录

### 第一阶段：语法适应（01-04，独立小案例）

| 篇号 | 标题                        | 核心问题                                   | JS 对比重点                               |
| ---- | --------------------------- | ------------------------------------------ | ----------------------------------------- |
| 01   | 为什么学 Java？环境搭建     | "Java 不是过时了吗？2026 年为什么还要学？" | 编译型 vs 解释型；JVM vs V8；Maven vs npm |
| 02   | 类型系统：Java 怎么管数据的 | "JS 里 `1 + '1' === '11'`，Java 里呢？"    | 动态 vs 静态类型；隐式转换；8 种基本类型  |
| 03   | 控制流：不只是 if 和 for    | "Java 的 switch 竟然比 JS 好用？"          | switch 表达式；增强 for；字符串 switch    |
| 04   | 数组与字符串                | "Java 的 String 怎么这么多坑？"            | 字符串不可变；StringBuilder vs 模板字符串 |

### 第二阶段：OOP 核心（05-09，CMS 贯穿案例开始）

| 篇号 | 标题                    | 核心问题                                            | JS 对比重点                        | CMS 案例          |
| ---- | ----------------------- | --------------------------------------------------- | ---------------------------------- | ----------------- |
| 05   | 类与对象：Java 的世界观 | "JS 的 class 只是语法糖，Java 的 class 是真家伙"    | class 本质差异；构造器；访问控制   | 定义 Post/Tag 类  |
| 06   | 封装与包                | "为什么 Java 要搞这么多访问修饰符？"                | private vs #；package vs ES Module | Post 封装         |
| 07   | 继承与多态              | "Java 的继承比 JS 的 prototype 链更严格"            | extends vs prototype；方法重写     | Content 基类→Post |
| 08   | 接口与抽象类            | "TS 的 interface 和 Java 的 interface 是一回事吗？" | interface 差异；default method     | Taggable 接口     |
| 09   | 内部类与枚举            | "Java 的 enum 比 JS 的对象常量强在哪？"             | enum vs union type                 | PostStatus 枚举   |

### 第三阶段：核心特性（10-14）

| 篇号 | 标题       | 核心问题                                        | JS 对比重点                          | CMS 案例               |
| ---- | ---------- | ----------------------------------------------- | ------------------------------------ | ---------------------- |
| 10   | 异常处理   | "Java 的 checked exception 到底是好是坏？"      | try-catch 差异；checked vs unchecked | 文章发布异常           |
| 11   | 集合框架   | "Java 的 ArrayList 和 JS 的 Array 有什么区别？" | List vs Array；Map vs Object         | List 管理文章          |
| 12   | List 深入  | "什么场景该用 LinkedList？"                     | 数组 vs 链表；随机访问               | 文章排序分页           |
| 13   | Set 与 Map | "标签去重和文章缓存怎么做？"                    | Set vs Set；HashMap vs Map           | Set 去重标签、Map 缓存 |
| 14   | 泛型       | "Java 的泛型为什么叫'类型擦除'？"               | 泛型 vs TS 泛型；类型擦除            | 泛型文章仓库           |

### 第四阶段：现代特性（15-20）

| 篇号 | 标题                | 核心问题                                  | JS 对比重点                         | CMS 案例       |
| ---- | ------------------- | ----------------------------------------- | ----------------------------------- | -------------- |
| 15   | Stream API          | "Java 的 Stream 和 JS 的数组方法有多像？" | Stream vs Array.prototype；惰性求值 | 文章过滤统计   |
| 16   | IO 操作             | "Java 的 IO 怎么这么多类？"               | 同步 IO vs fs；Reader/Writer        | Markdown 读写  |
| 17   | 多线程基础          | "JS 是单线程的，Java 呢？"                | 事件循环 vs 线程；Thread vs Worker  | 批量生成摘要   |
| 18   | 同步与并发安全      | "多线程下计数器怎么不丢数？"              | 竞态条件；synchronized vs Atomics   | 评论计数器     |
| 19   | Lambda 与函数式接口 | "Java 的 Lambda 和箭头函数有什么区别？"   | Lambda 限制；函数式接口 vs 高阶函数 | 标签匹配       |
| 20   | 综合实战            | "没有框架的 Java 也能做出完整应用"        | 回顾全系列对比点                    | CMS 控制台应用 |

## 预期效果

完成本系列后，你将能够：

1. 理解 Java 与 JS 的核心差异，快速迁移
2. 熟练运用 Java OOP 设计类层次结构
3. 使用集合框架和 Stream 处理数据
4. 理解多线程和并发编程基础
5. 具备进一步学习 Spring Boot 的基础

_计划创建日期：2026-03-30_
