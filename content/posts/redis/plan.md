# Redis 渐进式学习计划

## 背景

Redis 是目前最流行的内存数据库之一，以其高性能、丰富的数据结构和简洁的 API 著称。在现代 Web 应用中，Redis 被广泛应用于缓存、会话存储、消息队列、排行榜、实时统计等场景。

**为什么学习 Redis？**

- 🚀 **极致性能**：基于内存操作，支持 10万+ QPS
- 📚 **丰富数据结构**：String、Hash、List、Set、Sorted Set 等
- 🔧 **功能强大**：持久化、发布订阅、事务、集群等
- 💼 **广泛应用**：缓存、消息队列、排行榜、计数器、分布式锁等
- 🎯 **易于上手**：简洁的 API 设计，快速上手

## 技术栈

- **Redis 7.x**：最新稳定版本
- **Node.js + TypeScript**：示例代码主要技术栈
- **ioredis**：Redis Node.js 客户端
- **Docker**：本地开发环境
- **Redis Insight**：可视化管理工具

## 学习路径

```
基础入门 → 数据结构 → 缓存策略 → 高级特性 → 集群高可用 → 实战项目
```

## 博客目录结构

### 基础入门篇 (1-5)

1. **01-getting-started.mdx** - Redis 快速入门
   - Redis 简介、安装配置、基本命令
   - 了解 Redis 的应用场景和核心优势

2. **02-cli-commands.mdx** - Redis 命令行操作详解
   - redis-cli 使用、常用命令、键操作
   - 掌握 Redis 命令行工具的核心用法

3. **03-data-types-overview.mdx** - Redis 五大数据类型概览
   - String、Hash、List、Set、Sorted Set 基础
   - 理解每种数据类型的特点和适用场景

4. **04-key-design-best-practices.mdx** - Redis 键命名与设计规范
   - 键命名规范、过期策略、内存优化
   - 学会设计高效的 Redis 键结构

5. **05-persistence-mechanisms.mdx** - Redis 持久化机制
   - RDB、AOF、混合持久化
   - 理解 Redis 的数据持久化方案

### 数据结构篇 (6-10)

6. **06-string-advanced.mdx** - String 类型深度应用
   - 计数器、分布式锁、限流
   - 掌握 String 类型的高级用法

7. **07-hash-applications.mdx** - Hash 类型实战应用
   - 对象存储、购物车、Session
   - 学习使用 Hash 存储对象数据

8. **08-list-queue-implementation.mdx** - List 实现消息队列
   - 队列、栈、阻塞队列
   - 基于 List 实现消息队列系统

9. **09-set-intersection-operations.mdx** - Set 集合运算与社交应用
   - 关注、粉丝、共同好友、标签系统
   - 使用 Set 实现社交网络功能

10. **10-sorted-set-leaderboard.mdx** - Sorted Set 排行榜系统
    - 排行榜、延时队列、范围查询
    - 基于 Sorted Set 构建排行榜

### 缓存策略篇 (11-13)

11. **11-cache-aside-pattern.mdx** - Cache-Aside 缓存模式
    - 缓存模式对比、最佳实践
    - 理解并实现常见的缓存模式

12. **12-cache-problems-solutions.mdx** - 缓存三大问题解决方案
    - 缓存穿透、击穿、雪崩及解决方案
    - 掌握缓存常见问题的解决方案

13. **13-cache-distributed-lock.mdx** - 分布式锁实现
    - Redis 分布式锁、Redlock 算法
    - 实现可靠的分布式锁

### 高级特性篇 (14-15)

14. **14-pub-sub-mechanism.mdx** - 发布订阅机制
    - Pub/Sub 模式、消息广播
    - 使用 Redis 实现实时消息推送

15. **15-transaction-pipeline.mdx** - 事务与 Pipeline
    - 事务、Pipeline、Lua 脚本
    - 提升 Redis 操作性能和保证原子性

### 集群高可用篇 (16-17)

16. **16-replication-sentinel.mdx** - 主从复制与哨兵模式
    - 主从复制、Sentinel 高可用
    - 构建 Redis 高可用架构

17. **17-cluster-architecture.mdx** - Redis Cluster 集群架构
    - Cluster 原理、分片、扩容
    - 理解并使用 Redis Cluster

### 实战项目篇 (18)

18. **18-real-time-analytics-project.mdx** - 实时统计系统实战
    - UV/PV 统计、在线用户、实时排行榜
    - 综合运用所学知识构建完整项目

## 每篇文章结构

```markdown
---
title: "序号. 文章标题"
date: "2026-03-23"
summary: "文章简介"
tags: ["Redis", "标签"]
category: "redis"
cover: ""
draft: false
series: "Redis 渐进式学习路线"
seriesOrder: N
---

## 前言

引入主题，说明为什么要学这个

## 核心概念

解释核心概念和原理

## 实战演练

完整可运行的代码示例

## 最佳实践

3-5 个关键要点

## 常见问题

Q&A 格式

## 总结

回顾核心内容

## 下一步

引入下一篇文章
```

## 写作规范

### 代码示例要求

1. **完整性**：每个示例都是可独立运行的代码
2. **TypeScript 优先**：使用 TypeScript + Node.js (ioredis)
3. **注释清晰**：关键代码添加中文注释
4. **错误处理**：展示正确的错误处理方式
5. **渐进式**：从简单到复杂，逐步深入

### 内容要求

- 通俗易懂，避免过多术语堆砌
- 结合实际应用场景
- 提供完整可运行的示例
- 总结最佳实践和常见坑点

### 格式要求

- 使用 MDX 格式
- 代码块指定语言（`typescript`、`bash` 等）
- 适当使用表格、列表、引用
- 添加适当的分隔线和空行

## 实战项目设计

### 最终综合项目：实时统计系统

**功能模块**：

1. **PV/UV 统计**
   - 使用 HyperLogLog 统计 UV
   - 使用 String 统计 PV
   - 实时统计和定时聚合

2. **在线用户**
   - 使用 Set 存储在线用户
   - 心跳机制更新在线状态
   - 实时在线人数统计

3. **实时排行榜**
   - 使用 Sorted Set 实现排行榜
   - 支持实时更新
   - 支持分页查询

## 学习路径图

```
┌─────────────────────────────────────────────────────────────┐
│                    Redis 渐进式学习路线                       │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  基础入门篇   │───▶│  数据结构篇   │───▶│  缓存策略篇   │
│   (1-5)      │    │   (6-10)     │    │   (11-13)    │
└──────────────┘    └──────────────┘    └──────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
  Redis 简介          String 应用         Cache-Aside
  安装配置            Hash 购物车         缓存问题解决
  五大类型            List 消息队列       分布式锁
  键设计规范          Set 社交功能
  持久化机制          Sorted Set 排行榜

┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  高级特性篇   │───▶│ 集群高可用篇  │───▶│  实战项目篇   │
│   (14-15)    │    │   (16-17)    │    │    (18)      │
└──────────────┘    └──────────────┘    └──────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
  发布订阅            主从复制            实时统计系统
  事务 Pipeline       Sentinel 集群      UV/PV 统计
  Lua 脚本           Redis Cluster      在线用户
                                         实时排行榜
```

## 预期效果

学完本系列后，你将具备：

✅ **扎实的 Redis 基础**：理解 Redis 的核心概念和数据结构
✅ **丰富的实战经验**：掌握 Redis 在各种场景下的应用
✅ **性能优化能力**：能够设计高效的 Redis 缓存方案
✅ **问题解决能力**：能够处理 Redis 常见问题和性能瓶颈
✅ **高可用架构**：能够构建 Redis 高可用和集群方案
✅ **完整项目经验**：具备开发基于 Redis 的实时统计系统的能力

## 参考资料

- [Redis 官方文档](https://redis.io/docs/)
- [Redis 命令参考](https://redis.io/commands/)
- [ioredis 文档](https://github.com/luin/ioredis)
- Redis 设计与实现（书籍）
