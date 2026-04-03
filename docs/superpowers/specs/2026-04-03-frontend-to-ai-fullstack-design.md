# 前端转 AI 全栈实战指南 — 学习路线设计

## 背景

- **当前状态**：全栈开发者，前端出身，后端经验丰富（NestJS/Hono/Go/Rust/Python）
- **AI 经验**：零经验（仅使用过 ChatGPT/Claude 等工具）
- **学习目标**：AI 应用开发（LLM API、RAG、Agent 等）
- **技术栈偏好**：TypeScript 为主
- **时间规划**：3-4 个月
- **产出形式**：学习路线 + 博客系列文章（两者结合）

---

## 技术栈选择

| 领域       | 技术选择               | 选择理由                              |
| ---------- | ---------------------- | ------------------------------------- |
| AI SDK     | Vercel AI SDK          | TypeScript 原生，与现有技术栈一致     |
| LLM 提供商 | Anthropic Claude API   | 已有 Claude Code 使用经验，API 质量高 |
| 向量数据库 | Drizzle ORM + pgvector | 已有 Drizzle 和 database 系列文章     |
| Agent 框架 | Vercel AI SDK Agent    | 统一技术栈，避免引入过多框架          |
| 前端       | Next.js                | 已有 Next.js 系列                     |
| 部署       | Vercel                 | 与现有博客部署一致                    |

---

## 学习路线总览

```
阶段 1：基础篇（第 1-4 周）
├── 第 1 篇：LLM API 与流式对话        → API 调用、流式输出、上下文管理
└── 第 2 篇：Prompt Engineering 实战   → Prompt 设计、结构化输出

阶段 2：工具篇（第 5-9 周）
├── 第 3 篇：Function Calling 与工具使用 → 工具定义、调用链、错误处理
└── 第 4 篇：MCP 协议与 AI 生态         → MCP Server 开发、工具生态

阶段 3：记忆篇（第 10-11 周）
└── 第 5 篇：RAG 检索增强生成           → Embedding、向量数据库、文档处理

阶段 4：Agent 篇（第 12-14 周）
└── 第 6 篇：AI Agent 实战              → ReAct 模式、多 Agent、评估安全
```

---

## 各阶段详细内容

### 第 1 篇 — LLM API 与流式对话

**核心知识点：**

- 什么是 LLM、Token、上下文窗口等核心概念
- Anthropic Messages API 基础调用
- 流式响应（Streaming）的实现原理和 SSE
- 多轮对话的上下文管理

**实战项目：** 用 Next.js + Vercel AI SDK 搭建一个流式聊天界面

**技术涉及：** `@ai-sdk/anthropic`、`ai`（Vercel AI SDK）、Next.js App Router、SSE

---

### 第 2 篇 — Prompt Engineering 实战

**核心知识点：**

- System Prompt 的设计原则
- Few-shot、Chain-of-Thought 等常用技巧
- Prompt 模板化管理
- 结构化输出（JSON Mode）

**实战项目：** 用 Prompt Engineering 构建一个代码审查助手

**技术涉及：** `@ai-sdk/anthropic`、structured output、zod schema validation

---

### 第 3 篇 — Function Calling 与工具使用

**核心知识点：**

- Function Calling 的工作原理
- 定义和注册工具函数
- 工具调用链和错误处理
- 并行工具调用

**实战项目：** 构建一个能查天气、搜索信息的 AI 助手

**技术涉及：** Vercel AI SDK tool calling、自定义 tool 定义、错误重试

---

### 第 4 篇 — MCP 协议与 AI 生态

**核心知识点：**

- MCP（Model Context Protocol）协议概述
- MCP Server 的开发
- MCP Client 的集成
- AI 应用的工具生态

**实战项目：** 开发一个自定义 MCP Server（如：博客内容查询工具）

**技术涉及：** `@modelcontextprotocol/sdk`、MCP Server/Client、stdio transport

---

### 第 5 篇 — RAG 检索增强生成

**核心知识点：**

- 向量嵌入（Embedding）原理
- 向量数据库与 pgvector
- 文档分块（Chunking）策略
- 检索 + 生成的完整 RAG 流程

**实战项目：** 为博客构建一个 AI 问答系统（基于已有 340+ 篇文章）

**技术涉及：** Drizzle ORM + pgvector、文档解析、Embedding API、相似度检索

---

### 第 6 篇 — AI Agent 实战

**核心知识点：**

- Agent 的核心概念（感知 → 推理 → 行动）
- ReAct 模式与工具调用循环
- 多 Agent 协作
- Agent 的评估与安全

**实战项目：** 构建一个全能 AI Agent 工作台（整合前 5 篇所有能力）

**技术涉及：** Vercel AI SDK Agent、multi-agent orchestration、guardrails

---

## 时间规划与里程碑

| 周次        | 内容                        | 里程碑                                      |
| ----------- | --------------------------- | ------------------------------------------- |
| 第 1-2 周   | 第 1 篇：LLM API 与流式对话 | 能独立构建流式 AI 聊天应用                  |
| 第 3-4 周   | 第 2 篇：Prompt Engineering | 掌握 Prompt Engineering，能优化 AI 输出质量 |
| 第 5-7 周   | 第 3 篇：Function Calling   | 能让 AI 调用外部工具完成复杂任务            |
| 第 8-9 周   | 第 4 篇：MCP 协议           | 理解 MCP 协议，能开发自定义 MCP Server      |
| 第 10-11 周 | 第 5 篇：RAG                | 能构建 RAG 系统，让 AI 基于知识库回答       |
| 第 12-14 周 | 第 6 篇：AI Agent           | 能构建完整的 AI Agent 应用                  |
| 第 15-16 周 | 复盘与补充（可选）          | 回顾总结，查漏补缺                          |

---

## 博客系列结构

**系列名称：** AI 全栈实战

**目录结构：**

```
content/posts/ai-fullstack/
├── 01-llm-api-streaming.mdx
├── 02-prompt-engineering.mdx
├── 03-function-calling.mdx
├── 04-mcp-protocol.mdx
├── 05-rag-retrieval-augmented-generation.mdx
└── 06-ai-agent.mdx
```

**文章风格（与现有系列一致）：**

- 每篇文章以实战项目为主线
- 包含完整可运行的代码示例
- 理论与实践结合，先讲为什么再讲怎么做
- 6 篇精简但内容密集，每篇都是干货

---

## 与现有博客内容的衔接

本系列可以引用和关联以下已有系列：

- **Next.js 系列**：前端页面搭建基础
- **TypeScript 系列**：类型系统基础
- **database 系列**：数据库知识（pgvector 扩展）
- **Drizzle 系列**：ORM 使用基础
- **Claude Code 系列**：AI 工具使用经验
- **Agent 系列**：已有的 Agent 相关内容

---

_创建日期：2026-04-03_
