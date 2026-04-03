# AI 全栈实战：从前端到 AI 应用开发

## 背景

你是一个有经验的全栈开发者，前端出身，后端技术栈覆盖 NestJS、Hono、Go、Rust、Python，数据库用过 PostgreSQL、MySQL、Redis，部署也折腾过 Docker 和 Nginx。但你从来没过程序化地调用过 LLM API——AI 对你来说还只是 ChatGPT 聊天窗口里那个能回答问题的助手。

这个系列的目标是：**从零开始，用 TypeScript 技术栈构建真正的 AI 应用**。不搞 Python，不搞模型训练，专注在应用层——调用 LLM API、设计 Prompt、接入工具、构建 RAG、开发 Agent。

### 技术栈选择

| 技术                   | 版本         | 为什么选它                                                                |
| ---------------------- | ------------ | ------------------------------------------------------------------------- |
| Vercel AI SDK          | 4.x          | TypeScript 原生 AI SDK，统一了多家 LLM 提供商的调用方式，流式输出开箱即用 |
| Anthropic Claude       | Claude 3.5/4 | API 质量高，工具调用能力强，200K 上下文窗口                               |
| Next.js                | 15.x         | App Router + Server Actions 天然适合 AI 应用的流式场景                    |
| Drizzle ORM + pgvector | latest       | 已有 Drizzle 使用经验，pgvector 扩展支持向量存储                          |
| MCP SDK                | latest       | Model Context Protocol 是 AI 工具生态的新标准                             |

### 主线案例：AI 技术助手

整个系列围绕一个**AI 技术助手**应用逐步演进：

- 第 1 篇：一个能流式对话的聊天界面
- 第 2 篇：给它加上专业的 Prompt，变成代码审查助手
- 第 3 篇：让它能调用外部工具（查文档、搜索代码）
- 第 4 篇：用 MCP 协议接入更多工具
- 第 5 篇：让它基于你的博客知识库回答问题
- 第 6 篇：整合所有能力，变成一个全能 AI Agent

---

## 系列节奏

```
基础篇（01-02）：建立直觉，从 API 调用到 Prompt 设计
  → 独立小案例，快速上手

工具篇（03-04）：让 AI 拥有"手"，能调用外部工具
  → 引入 Function Calling 和 MCP，案例开始连贯

记忆篇（05）：让 AI 拥有"记忆"，基于知识库回答
  → 案例演进到 RAG 系统

Agent 篇（06）：整合所有能力，构建完整 Agent
  → 综合实战，展示如何综合运用
```

---

## 博客目录结构

```
content/posts/ai-fullstack/
├── plan.md
├── 01-llm-api-streaming.mdx
├── 02-prompt-engineering.mdx
├── 03-function-calling.mdx
├── 04-mcp-protocol.mdx
├── 05-rag-retrieval-augmented-generation.mdx
└── 06-ai-agent.mdx
```

---

## 每篇文章大纲

### 01. LLM API 与流式对话

**核心问题**：你在浏览器里用 ChatGPT，输入问题后文字一个一个蹦出来。这种"打字机效果"看起来简单，但背后涉及 API 调用、流式传输、上下文管理。一个前端开发者怎么实现它？

**主线案例**：用 Next.js + Vercel AI SDK 搭建一个流式 AI 聊天界面——不是玩具 demo，而是一个有上下文管理、错误处理、加载状态的可用应用。

**内容要点**：

1. LLM 是什么：从"大语言模型"到"API 即服务"——为什么前端开发者需要理解 LLM 的工作方式
2. Token、上下文窗口、Temperature——影响 API 调用的核心参数
3. Anthropic Messages API 的调用方式（用 `@ai-sdk/anthropic`）
4. 流式响应的实现：SSE vs WebSocket，为什么 Vercel AI SDK 选了 SSE
5. 多轮对话的上下文管理：messages 数组的设计
6. 用 `useChat` Hook 搭建聊天界面的完整流程

**与前篇关联**：系列第一篇，无前篇。

---

### 02. Prompt Engineering 实战

**核心问题**：同样的 API，有人让它翻译文档翻译得一塌糊涂，有人能让它写出生产级代码。区别不在 API 调用方式，而在你怎么和它"说话"。Prompt Engineering 不是玄学，是一套可复用的工程方法。

**主线案例**：把上一篇的通用聊天助手改造成一个**代码审查助手**——给它专业的 System Prompt、Few-shot 示例、结构化输出，让它能分析代码并给出有价值的审查意见。

**内容要点**：

1. System Prompt 的设计：角色定义、输出格式约束、行为边界
2. Few-shot Learning：为什么"给它看例子"比"告诉它规则"更有效
3. Chain-of-Thought：让模型"想清楚再回答"
4. 结构化输出：用 zod schema 约束输出格式，拿到可解析的 JSON
5. Prompt 模板管理：不要把 Prompt 写死在代码里

**与前篇关联**：上一篇搭好了聊天界面，这一篇优化"对话质量"。同一个界面，换一个 Prompt 就变成了完全不同的应用。

---

### 03. Function Calling 与工具使用

**核心问题**：LLM 只是一个文本生成器。它不知道今天的天气、查不了数据库、发不了邮件。但如果你告诉它"你有这些工具可以用"，它就能自己决定什么时候调用哪个工具、传什么参数。这就是 Function Calling。

**主线案例**：给代码审查助手加上工具能力——它能搜索 NPM 包文档、查询 GitHub 仓库信息、检查代码中的安全漏洞。

**内容要点**：

1. Function Calling 的工作原理：模型不执行函数，只输出"调用建议"
2. 用 Vercel AI SDK 定义和注册工具函数
3. 工具调用的完整流程：用户提问 → 模型决定调用 → 执行工具 → 结果返回模型 → 生成回答
4. 错误处理：工具调用失败怎么办
5. 并行工具调用：一次调用多个工具
6. 工具描述的写法：怎么写 tool description 让模型正确使用

**与前篇关联**：上一篇的代码审查助手只能基于用户提供的代码片段审查。这一篇加上工具，它能主动获取上下文信息。

---

### 04. MCP 协议与 AI 生态

**核心问题**：你给 AI 加了 3 个工具（查天气、搜文档、查数据库）。后来又加了 5 个、10 个……工具越来越多，每个 AI 应用都要重新实现一遍。能不能有一个标准协议，让工具"即插即用"？这就是 MCP（Model Context Protocol）。

**主线案例**：开发一个**博客内容查询 MCP Server**——让任何 MCP 兼容的 AI 客户端都能查询你博客的文章内容、标签分类、搜索相关文章。

**内容要点**：

1. MCP 协议解决了什么问题：从"每个应用自己接工具"到"工具生态标准化"
2. MCP 的架构：Host、Client、Server 三层
3. 用 `@modelcontextprotocol/sdk` 开发一个 MCP Server
4. 定义 Resources（数据源）和 Tools（操作能力）
5. 在 Next.js 应用中集成 MCP Client
6. MCP 的实际应用场景和局限性

**与前篇关联**：上一篇用 Function Calling 手动定义了工具。这一篇用 MCP 把工具标准化，可以跨应用复用。

---

### 05. RAG 检索增强生成

**核心问题**：你问 ChatGPT "我的博客里有没有关于 NestJS 依赖注入的文章"，它不知道。因为它的训练数据里没有你的博客内容。RAG（Retrieval-Augmented Generation）的思路是：先把你的内容存成向量，提问时先检索相关内容，再让 LLM 基于检索结果回答。

**主线案例**：为你的博客构建一个 AI 问答系统——把 340+ 篇文章向量化存储，用户提问时自动检索相关文章片段，让 AI 基于真实内容回答。

**内容要点**：

1. Embedding 是什么：把文本变成数字，让"语义相似"变成"距离相近"
2. 向量数据库：pgvector 扩展 + Drizzle ORM
3. 文档分块策略：怎么切分长文章才不会丢失上下文
4. 完整的 RAG 流程：文档入库 → 用户提问 → 向量检索 → Prompt 组装 → LLM 生成
5. RAG 的局限性：检索不准怎么办、信息冲突怎么处理

**与前篇关联**：前几篇的 AI 助手只能基于通用知识回答。这一篇加上 RAG，它能基于你的博客内容给出精准回答。

---

### 06. AI Agent 实战

**核心问题**：前 5 篇你学会了调用 API、设计 Prompt、使用工具、接入知识库。但这些能力是分散的。一个真正的 AI Agent 应该能自主决策：什么时候需要搜索、什么时候需要查知识库、什么时候直接回答。这就是 Agent 的核心——"感知 → 推理 → 行动"的循环。

**主线案例**：构建一个**全能 AI 技术助手**——整合前 5 篇的所有能力，它能对话、审查代码、调用工具、搜索知识库，根据用户的问题自主选择合适的策略。

**内容要点**：

1. Agent 的核心概念：从 Chatbot 到 Agent 的跨越
2. ReAct 模式：推理（Reasoning）+ 行动（Acting）的循环
3. 多 Agent 协作：复杂任务拆分给不同的专业 Agent
4. Agent 的安全边界：防止它做不该做的事
5. Agent 的评估：怎么知道你的 Agent 表现好不好

**与前篇关联**：整合前 5 篇所有能力，是整个系列的收官之作。

---

## 学习路径图

```
基础篇 ─────────────────────────────────
  01 LLM API 与流式对话 ──► 02 Prompt Engineering
                                             │
工具篇 ─────────────────────────────────
           03 Function Calling
                  │
           04 MCP 协议
                  │
记忆篇 ─────────────────────────────────
           05 RAG 检索增强生成
                  │
Agent 篇 ────────────────────────────────
           06 AI Agent 实战
```

---

## 预期效果

完成本系列后，你将能够：

- 理解 LLM API 的工作原理，能独立调用和集成
- 设计高质量的 Prompt，控制 AI 的输出质量
- 实现 Function Calling，让 AI 调用外部工具
- 开发 MCP Server，参与 AI 工具生态
- 构建 RAG 系统，让 AI 基于私有数据回答
- 开发完整的 AI Agent 应用

---

## 版本信息

- **Vercel AI SDK**：4.x
- **@ai-sdk/anthropic**：latest
- **Next.js**：15.x
- **Node.js**：22.x LTS
- **TypeScript**：5.x
- **Drizzle ORM**：latest
- **pgvector**：latest
