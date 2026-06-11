# AI Agent 开发指南

## 背景

你用过 ChatGPT，它很擅长回答问题。但如果让它"去 GitHub 上找这个仓库的代码、分析质量、生成报告、发邮件给我"，它做不到。因为它只能对话，不能行动。

AI Agent 就是为了解决这个问题：让 AI 不只能"说"，还能"做"。Agent 可以调用工具、访问 API、执行代码，完成复杂的多步骤任务。

### 技术栈

| 技术         | 用途                         |
| ------------ | ---------------------------- |
| LLM          | 决策大脑（GPT-4、Claude 等） |
| Tool Calling | 调用外部工具                 |
| Vector DB    | 记忆存储                     |
| Framework    | LangChain、AutoGPT 等        |

---

## 主线案例：代码仓库分析 Agent

整个系列围绕一个**代码仓库分析 Agent**展开，逐步构建完整的 Agent 应用。

**案例场景**：给 Agent 一个 GitHub 仓库 URL，它能：

- 获取仓库信息
- 分析代码结构
- 检测代码问题
- 生成可视化报告
- 发送邮件通知

---

## 系列节奏

```
概念篇（01-03）：建立认知
  → Agent 是什么、核心能力、技术栈

实践篇（04-06）：从零构建
  → 简单 Agent → 复杂 Agent → 从零实现

进阶篇（07-08）：高级主题
  → 生产部署、未来趋势
```

---

## 博客目录结构

```
content/posts/agent/
├── plan.md                    # 本计划文件
├── 01-what-is-agent.mdx        # Agent 是什么
├── 02-agent-engineer-role.mdx  # Agent 工程师的角色
├── 03-core-competencies.mdx    # 核心能力
├── 04-tech-stack-overview.mdx  # 技术栈概览
├── 05-frontend-to-agent-basic.mdx    # 从前端到 Agent：入门
├── 06-frontend-to-agent-advanced.mdx  # 从前端到 Agent：进阶
├── 07-build-agent-from-scratch.mdx   # 从零构建 Agent
└── 08-future-and-trends.mdx   # 未来与趋势
```

---

## 概念篇：建立认知（01-03）

### 01. Agent 是什么

**核心问题**：ChatGPT 和 Agent 有什么区别？为什么需要 Agent？

**内容要点**：

- 传统 AI 的局限：只能对话，不能行动
- Agent 的定义：感知、决策、行动
- Agent 的核心特征：自主性、目标导向、工具使用
- 典型应用场景：代码分析、数据分析、自动化任务

### 02. Agent 工程师的角色

**核心问题**：Agent 工程师和传统开发者有什么不同？需要什么技能？

**内容要点**：

- Agent 开发 vs 传统开发
- Prompt Engineering 的重要性
- 工具设计与管理
- 调试与测试 Agent

### 03. 核心能力

**核心问题**：一个完整的 Agent 需要哪些能力？

**内容要点**：

- 规划能力：把大任务分解成小任务
- 记忆能力：短期记忆（上下文）、长期记忆（向量数据库）
- 工具使用：如何调用外部 API
- 自我反思：检查结果、修正错误

---

## 实践篇：从零构建（04-07）

### 04. 技术栈概览

**核心问题**：构建 Agent 需要什么技术栈？

**内容要点**：

- LLM 选择：GPT-4、Claude、开源模型
- Framework：LangChain、Vercel AI SDK
- 工具调用：OpenAI Function Calling、MCP
- 记忆存储：向量数据库（Chroma、Pinecone）

### 05. 从前端到 Agent：入门

**核心问题**：前端开发者如何转型做 Agent 开发？

**内容要点**：

- 用 JavaScript/TypeScript 构建 Agent
- Vercel AI SDK 基础
- 第一个简单 Agent：天气查询

### 06. 从前端到 Agent：进阶

**核心问题**：如何构建复杂的 Agent？

**内容要点**：

- 多步骤任务规划
- 工具链设计
- 错误处理与重试
- 实战：代码分析 Agent

### 07. 从零构建 Agent

**核心问题**：不使用框架，如何手写一个 Agent？

**内容要点**：

- Agent 的核心循环
- 手动实现工具调用
- 手动实现记忆管理
- 从零实现的权衡

---

## 进阶篇（08）

### 08. 未来与趋势

**核心问题**：Agent 技术的未来是什么？

**内容要点**：

- Multi-Agent：多个 Agent 协作
- Agent 市场：Agent 交易 Agent
- 挑战与限制
- 系列回顾

---

## 预期效果

完成本系列后，你将能够：

- 理解 Agent 的核心概念和价值
- 知道 Agent 工程师需要什么技能
- 使用主流框架构建 Agent
- 为 Agent 设计和集成工具
- 理解 Agent 的技术边界
