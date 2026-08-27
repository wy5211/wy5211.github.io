# Vite 实战指南

## 背景

2026 年 3 月，Vite 发布了 8.0——这是 Vite 2 以来最重大的架构变更。Rolldown（Rust 编写的打包器）取代了 esbuild 和 Rollup，生产构建速度提升了 10-30 倍。同时，Oxc 接管了 JSX 转换和代码压缩，Vite 8 形成了完整的 Rust 工具链。

但很多开发者的认知还停留在"Vite 是一个开发服务器快的 Webpack 替代品"上。实际上，Vite 8 已经是一个成熟的、全阶段的构建平台——开发、构建、SSR、库模式、边缘部署，全部覆盖。

这个系列帮你从"为什么用 Vite"开始，逐步深入到配置优化、插件开发、生产部署。不是翻译文档，而是基于真实项目场景的问题驱动式学习。

### 技术栈

| 技术    | 版本   | 说明                            |
| ------- | ------ | ------------------------------- |
| Vite    | 8.x    | 当前最新版，Rolldown 默认打包器 |
| Node.js | 22 LTS | Vite 8 最低要求 20.19+          |
| React   | 19.x   | 案例项目使用 React              |

> 本系列面向有 Webpack 或其他打包工具经验的开发者。如果你没用过任何打包工具，建议先跑通一个 Vite 项目再看本系列。

---

## 主线案例：迁移一个 React 项目到 Vite

整个系列围绕一个真实场景展开：你团队有一个运行了两年的 React SPA——**TaskFlow Dashboard**（任务管理看板）。当前用 Webpack 5 构建，开发服务器启动要 18 秒，HMR 要 3 秒，生产构建要 4 分钟。团队决定迁移到 Vite 8。

这不是一个从零开始的项目，有真实的痛点：历史依赖、自定义 Webpack loader、复杂的代理配置、按需加载的路由。迁移过程会遇到真实的兼容性问题。

**案例数据**：

```
项目：TaskFlow Dashboard（React 19 + TypeScript + Tailwind CSS）
当前构建工具：Webpack 5
代码文件数：340+
node_modules 体积：890 MB
开发服务器启动：18 秒
HMR 速度：2-3 秒
生产构建时间：4 分 12 秒
产物体积：2.3 MB（gzip 后 680 KB）
已知问题：
  - 开发体验差，新同事入职第一天光等环境搭建就要半天
  - Webpack 配置文件有 4 个，没人敢改
  - CSS Modules 和 Tailwind 混用，构建顺序经常冲突
  - 动态 import 拆分了 40+ chunk，加载顺序有问题
```

---

## 系列节奏

```
基础篇（01-03）：理解 Vite，跑通迁移
  → 搞清楚 Vite 8 的架构变化，完成项目迁移

核心篇（04-06）：配置优化与插件
  → 生产构建优化、CSS 处理、插件开发

进阶篇（07-09）：高级场景
  → SSR、环境变量、性能深度优化

实战篇（10）：综合实战
  → 迁移后的完整项目配置和生产部署
```

---

## 博客目录结构

```
content/posts/vite/
├── plan.md
├── 01-why-vite.mdx              # 为什么是 Vite 8：从 Webpack 迁移的决策
├── 02-dev-server.mdx            # 开发服务器：ESM、HMR 与 Rolldown
├── 03-migration.mdx             # 迁移实战：Webpack 到 Vite 8
├── 04-build-optimization.mdx    # 生产构建优化：代码分割与 Tree Shaking
├── 05-css-processing.mdx         # CSS 处理：Modules、Tailwind 与 PostCSS
├── 06-plugin-development.mdx     # 插件开发：Vite 插件 API 与实战
├── 07-ssr.mdx                   # SSR 支持：环境 API 与 React SSR
├── 08-environment-variables.mdx  # 环境变量与多环境配置
├── 09-performance.mdx            # 性能深度优化：分析瓶颈与解决策略
├── 10-production-deployment.mdx  # 综合实战：生产部署与 CI/CD
```

---

## 基础篇：理解 Vite，跑通迁移（01-03）

---

### 01. 为什么是 Vite 8：从 Webpack 迁移的决策

**核心问题**：团队的 Webpack 配置已经没人敢动了。开发体验差，构建慢。但迁移有风险——能解决什么问题？会引入什么新问题？

**主线案例**：分析 TaskFlow Dashboard 的 Webpack 痛点，对比 Vite 8 的解决方案，做迁移的技术决策。

**内容要点**：

- Webpack 的真实痛点：配置复杂、HMR 不稳定、生态碎片化
- Vite 8 的核心变化：Rolldown、Oxc、完整 Rust 工具链
- Vite 8 vs Turbopack vs Rspack：2026 年构建工具格局
- 迁移的风险和收益评估

**与前篇关联**：系列第一篇，无前篇。

---

### 02. 开发服务器：ESM、HMR 与 Rolldown

**核心问题**：Vite 的开发服务器为什么快？ESM 原生导入、依赖预构建、HMR——这些机制分别解决了什么问题？

**主线案例**：对比 Webpack 和 Vite 的开发服务器启动过程和 HMR 行为。

**内容要点**：

- ESM 原生导入：浏览器直接加载源码
- 依赖预构建：Rolldown 把 node_modules 打包成 ESM
- HMR 原理和配置
- 浏览器控制台转发（Vite 8 新特性）
- Full Bundle Mode（实验性）

**与前篇关联**：上一篇决定了迁移，这一篇理解迁移后的开发体验。

---

### 03. 迁移实战：Webpack 到 Vite 8

**核心问题**：340+ 文件的项目，有 4 个 Webpack 配置文件。怎么迁移？哪些地方会踩坑？

**主线案例**：逐步迁移 TaskFlow Dashboard——先跑通最简配置，再逐个解决兼容性问题。

**内容要点**：

- 迁移第一步：最简 vite.config.ts
- 入口文件、路径别名、代理配置适配
- 环境变量迁移
- 常见迁移问题和解决方案
- 渐进式迁移策略

**与前篇关联**：上一篇理解了原理，这一篇动手迁移。

---

## 核心篇：配置优化与插件（04-06）

---

### 04. 生产构建优化：代码分割与 Tree Shaking

**核心问题**：生产构建的产物体积和加载性能怎么样？Vite 的分割策略和 Webpack 有什么不同？

**主线案例**：优化 TaskFlow Dashboard 的生产构建。

**内容要点**：

- Rolldown 构建流程和配置
- 代码分割策略
- Tree Shaking
- 产物分析和可视化
- 与 Webpack 5 的构建产物对比

**与前篇关联**：上一篇完成了基本迁移，这一篇优化生产构建。

---

### 05. CSS 处理：Modules、Tailwind 与 PostCSS

**核心问题**：CSS Modules 和 Tailwind 混用，构建顺序冲突。Vite 的 CSS 处理怎么配？

**主线案例**：配置 CSS Modules + Tailwind CSS 4 + PostCSS。

**内容要点**：

- Vite CSS 管线
- CSS Modules 配置
- Tailwind CSS 4 集成（lightningcss）
- PostCSS 插件
- CSS 产物优化

**与前篇关联**：上一篇优化了 JS 构建，这一篇处理 CSS。

---

### 06. 插件开发：Vite 插件 API 与实战

**核心问题**：团队有自定义 Webpack loader，迁移后需要重写。Vite 插件怎么写？

**主线案例**：开发 SVG 图标自动引入插件。

**内容要点**：

- Vite 插件 API：resolveId、load、transform
- 与 Webpack 插件的区别
- Rolldown 兼容层
- 插件排序和作用域
- 实战：SVG 自动引入插件

**与前篇关联**：前两篇处理了标准构建，这一篇处理自定义需求。

---

## 进阶篇：高级场景（07-09）

---

### 07. SSR 支持：环境 API 与 React SSR

**核心问题**：产品要求支持 SEO，需要加 SSR。Vite 的 SSR 方案怎么搞？

**主线案例**：为 TaskFlow Dashboard 添加 SSR 支持。

**内容要点**：

- Vite SSR 配置
- Environment API
- React SSR 实战
- SSR 性能考量和常见问题

**与前篇关联**：前几篇都是 SPA，这一篇引入 SSR。

---

### 08. 环境变量与多环境配置

**核心问题**：dev、staging、production 三个环境有不同的配置。Vite 的环境变量机制怎么配？

**主线案例**：配置多环境——.env 文件、类型安全、CI/CD 注入。

**内容要点**：

- VITE\_ 前缀和 .env 文件
- TypeScript 类型安全
- 多环境配置策略
- 敏感信息处理

**与前篇关联**：上一篇加了 SSR，不同环境需要不同配置。

---

### 09. 性能深度优化：分析瓶颈与解决策略

**核心问题**：生产环境性能指标不够好。怎么系统性地优化？

**主线案例**：Lighthouse 从 65 提升到 95+。

**内容要点**：

- 性能分析方法
- 首屏优化：关键 CSS 内联、预加载
- 缓存策略：hash、CDN、长缓存
- Vite 8 特有优化手段
- 性能预算和持续监控

**与前篇关联**：上一篇配好多环境，这一篇在 production 做性能优化。

---

## 实战篇（10）

### 10. 综合实战：生产部署与 CI/CD

**核心问题**：所有优化做完了，怎么部署上线？

**主线案例**：配置完整 CI/CD 流水线——Docker、自动化测试、部署到 CDN。

**内容要点**：

- Docker 多阶段构建
- CI/CD 流水线
- 预览部署
- 监控和告警
- 迁移总结

**与前篇关联**：前 9 篇完成所有优化，这一篇部署上线。

---

## 预期效果

完成本系列后，你将能够：

- 理解 Vite 8 的 Rust 工具链架构
- 从 Webpack 平滑迁移到 Vite 8
- 优化生产构建的产物体积和加载性能
- 开发自定义 Vite 插件
- 配置 SSR 和多环境
- 建立完整的 CI/CD 流水线

---

## 版本信息

- **Vite**：8.x
- **Node.js**：22 LTS
