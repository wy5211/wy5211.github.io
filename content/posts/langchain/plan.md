# LangChain.js 实战：从 API 调用到 AI 应用

## 背景

你已经会用 fetch 调 OpenAI 的 API 了——拼一段 prompt，拿到回复，完事。但当你想做一个真正的 AI 应用时，问题来了：

- 用户发来的问题需要先查数据库，再拼 prompt，怎么优雅地串联这些步骤？
- 多轮对话需要记住上下文，每次手动管理对话历史？
- 想让 AI 基于你的产品文档回答问题，文档加载、切分、向量化、检索……每个环节都有坑
- 希望让 AI 自己决定调什么工具、查什么数据，而不是你写死流程

LangChain 就是解决这些问题的框架。它不是替代 LLM API，而是在 API 之上提供了一层**组合抽象**——像搭积木一样组装 AI 应用的各个组件。

### 技术栈选择

| 技术                        | 版本                 | 为什么选它                                                            |
| --------------------------- | -------------------- | --------------------------------------------------------------------- |
| LangChain.js                | 0.3.x                | JavaScript/TypeScript 生态的 LangChain，和你的 Node.js 技术栈无缝衔接 |
| TypeScript                  | 5.x                  | 类型安全，LangChain.js 原生支持                                       |
| OpenAI API                  | gpt-4o / gpt-4o-mini | 本系列的默认模型，但代码中会展示如何切换到其他模型                    |
| Chroma / Memory VectorStore | -                    | 向量数据库，本系列从内存向量库入门，进阶到 Chroma                     |
| Zod                         | 3.x                  | 结构化输出验证，LangChain.js 深度集成                                 |

> 为什么选 LangChain.js 而不是 Python 版？因为你的技术栈是 TypeScript 全栈（Next.js/NestJS/Hono），LangChain.js 可以直接集成到现有项目中，不需要维护一个单独的 Python 服务。

---

## 主线案例：SaaS 产品智能客服助手

整个系列围绕一个**SaaS 产品的智能客服助手**展开，从最简单的问答开始，逐步演进为一个能查文档、搜订单、回答问题的完整 AI 客服。

**案例场景**：一个项目管理 SaaS 产品（类似 Linear/Asana），需要一个智能客服助手，能回答产品使用问题、查询用户订单状态、搜索帮助文档、处理退款等。

**案例数据示例**（贯穿全系列使用）：

```
用户：liu_ming (usr_km92x1)，专业版会员，2025年6月注册
提问："我升级到企业版之后，之前的项目数据还在吗？"
文档片段："升级套餐不会影响已有项目数据。所有项目、任务、成员权限保持不变，仅新增企业版专属功能..."
订单：ORD-20250608-3847，企业版年度套餐，￥12,800/年，状态：待确认
```

---

## 系列节奏

```
基础篇（01-02）：独立小案例，快速上手 LangChain.js
  → 每篇一个独立场景，对比原生 API 调用体会 LangChain 的价值

核心篇（03-04）：引入客服助手案例，掌握核心抽象
  → LCEL 链式调用、对话记忆，建立项目骨架

RAG 篇（05-06）：案例演进，接入知识库
  → 文档加载切分 → 向量化检索 → 问答系统

进阶篇（07-08）：Agent 与生产实战
  → 工具调用 → 完整客服系统 → 流式输出与生产优化
```

---

## 博客目录结构

```
content/posts/langchain/
├── plan.md                                    # 本计划文件
├── 01-why-langchain.mdx                       # 为什么需要 LangChain：原生 API 调用的痛点
├── 02-models-prompts-parsers.mdx              # 模型抽象、提示词模板与输出解析
├── 03-lcel-chains.mdx                         # LCEL 与链式调用：像管道一样组装 AI 逻辑
├── 04-memory-conversation.mdx                 # 记忆机制：让 AI 记住你说过的话
├── 05-rag-document-loading.mdx                # RAG 基础：文档加载与智能切分
├── 06-rag-retrieval-generation.mdx            # RAG 进阶：向量化存储与精准检索
├── 07-tools-agents.mdx                        # 工具调用与 Agent：让 AI 主动干活
├── 08-production-smart-assistant.mdx          # 生产实战：完整的智能客服助手
```

---

## 基础篇：独立小案例（01-02）

目标：用 2 篇文章建立对 LangChain 的直觉，对比原生 API 调用感受框架的价值。

---

### 01. 为什么需要 LangChain：原生 API 调用的痛点

**核心问题**：你用 fetch 调 OpenAI API，拼个 prompt，拿到 JSON，解析 reply。看起来够用了。但当需求从"调一次 API"变成"构建一个 AI 应用"，你会发现到处都是重复的胶水代码。

**主线案例**：实现一个简单的"产品评论分类器"——输入用户评论，输出情感（正面/负面/中性）+ 关键问题。先用原生 fetch 实现，再用 LangChain 重写，对比代码量和可维护性。

**内容要点**：

- 原生 API 调用的三大痛点：prompt 管理、输出解析、组件组合
- LangChain 的定位：不是替代 API，是 API 之上的组合层
- LangChain.js 项目初始化和环境配置
- 第一次使用：ChatOpenAI 模型封装 vs 原生 fetch
- 什么时候该用 LangChain，什么时候不该（简单调用不需要框架）
- LangChain.js 的模块结构：@langchain/core、@langchain/openai、@langchain/community

**与前篇关联**：系列第一篇，无前篇。

---

### 02. 模型抽象、提示词模板与输出解析

**核心问题**：你写了一段 500 字的 prompt，里面硬编码了产品名称、用户信息、输出格式。换一个产品就要改代码。prompt 变成了一团面条。

**主线案例**：构建一个"用户反馈分析器"——输入用户反馈文本，自动提取情感、关键问题、紧急程度、建议操作，输出结构化 JSON。

**内容要点**：

- ChatOpenAI / ChatAnthropic 模型抽象：换模型只改一行配置
- PromptTemplate / ChatPromptTemplate：参数化 prompt，告别硬编码
- MessagesPlaceholder：动态插入对话历史
- Output Parsers + Zod：让 LLM 输出严格符合你定义的 TypeScript 类型
- StructuredOutputParser：从字符串解析到类型安全对象
- 踩坑：LLM 输出不稳定怎么办（重试策略、格式约束）

**与前篇关联**：上一篇搭好了项目环境，这一篇深入 LangChain 的三个核心抽象（模型、提示词、输出），它们是后续所有功能的基础。

---

## 核心篇：客服助手起步（03-04）

目标：引入客服助手案例，掌握 LCEL 链式调用和对话记忆，建立项目骨架。

---

### 03. LCEL 与链式调用：像管道一样组装 AI 逻辑

**核心问题**：一个完整的 AI 应用通常需要多个步骤：获取上下文 → 拼 prompt → 调模型 → 解析输出。手动串联这些步骤代码又臭又长，怎么优雅地组合它们？

**主线案例**：为客服助手构建一个"意图识别 + 路由"链——用户输入 → 识别意图（咨询/投诉/查询）→ 路由到不同的处理链 → 返回对应响应。

**内容要点**：

- LCEL（LangChain Expression Language）的设计理念：Unix 管道思维
- RunnableSequence：用 pipe（`|`）串联步骤
- RunnableParallel：并行执行多个分支
- RunnableBranch：条件路由
- 从 PromptTemplate → Model → Parser 的完整链
- 为什么 LCEL 比 Legacy Chain 更好（类型安全、流式支持、批处理）
- 调试技巧：如何在链的每个步骤打印中间结果

**与前篇关联**：上一篇掌握了模型、提示词、解析器三个组件，这一篇用 LCEL 把它们串联成完整的工作流。

---

### 04. 记忆机制：让 AI 记住你说过的话

**核心问题**：用户和你的客服助手聊了 5 分钟，问"刚才说的那个方案还能用吗？"，AI 完全不记得之前说了什么。因为 LLM 本身是无状态的，每次调用都是全新的。

**主线案例**：为客服助手实现多轮对话——用户连续咨询多个问题，助手能记住之前的对话上下文，给出连贯的回答。

**内容要点**：

- 为什么 LLM 是无状态的，以及这带来的问题
- ConversationChain：最简单的带记忆对话
- BufferMemory：完整记忆 vs 窗口记忆（保留最近 N 轮）
- SummaryMemory：当对话太长时，自动摘要压缩
- 如何把 Memory 和 LCEL 链结合
- 踩坑：对话历史太长导致 token 超限怎么办
- 生产环境的记忆方案：Redis / 数据库持久化对话历史

**与前篇关联**：上一篇用 LCEL 搭好了链式调用，这一篇在链中加入记忆组件，让对话有上下文。

---

## RAG 篇：接入知识库（05-06）

目标：让客服助手基于产品文档回答问题，掌握 RAG 的核心技术。

---

### 05. RAG 基础：文档加载与智能切分

**核心问题**：你想让 AI 基于产品帮助文档回答用户问题。但文档有 PDF、Markdown、网页三种格式，总共 200 页。直接塞进 prompt？token 费用爆炸。怎么把文档变成 LLM 能消化的片段？

**主线案例**：加载产品帮助中心的三类文档（Markdown 格式的 API 文档、PDF 格式的用户手册、网页格式的 FAQ），智能切分为语义完整的片段。

**内容要点**：

- RAG 是什么：Retrieval-Augmented Generation，检索增强生成
- 为什么不能把所有文档塞进 prompt（token 限制、成本、噪声）
- Document Loaders：加载不同格式的文档
  - TextLoader / MarkdownLoader / PDFLoader / CheerioWebBaseLoader
- Text Splitters：切分策略决定检索质量
  - RecursiveCharacterTextSplitter（推荐默认选择）
  - TokenTextSplitter
  - MarkdownTextSplitter（按标题切分）
- 切分的 trade-off：太大检索不准，太小丢失上下文
- chunkSize 和 chunkOverlap 怎么调
- 元数据保留：切分后不要丢失文档来源信息

**与前篇关联**：前几篇的客服助手只能靠模型自身知识回答。这一篇开始构建知识库，为下一篇的检索做准备。

---

### 06. RAG 进阶：向量化存储与精准检索

**核心问题**：文档已经切好了，但用户问"升级套餐后数据还在吗"，你怎么从几千个片段中找到最相关的那几段？关键词搜索？太粗糙了。

**主线案例**：为产品文档构建向量检索系统——用户提问 → 语义匹配最相关的文档片段 → 拼接到 prompt → LLM 基于检索结果回答。

**内容要点**：

- Embedding：把文本变成向量，为什么语义搜索比关键词搜索好
- OpenAIEmbeddings 的使用
- VectorStore：向量存储
  - MemoryVectorStore（开发调试用）
  - Chroma（生产环境推荐）
- Retriever：检索接口抽象
- 检索质量优化
  - 相似度阈值过滤
  - MMR（最大边际相关性）：兼顾相关性和多样性
  - 检索结果重排序
- 从 retriever 到完整 RAG 链：retriever | prompt | model | parser
- 踩坑：为什么检索结果经常不准（chunk 粒度、query 改写）

**与前篇关联**：上一篇完成了文档的加载和切分，这一篇把切好的片段向量化并实现语义检索，组装完整的 RAG 问答链。

---

## 进阶篇：Agent 与生产实战（07-08）

目标：让客服助手不仅能回答问题，还能执行操作（查订单、处理退款），最后完成一个生产级的完整系统。

---

### 07. 工具调用与 Agent：让 AI 主动干活

**核心问题**：客服助手回答问题还行，但用户说"帮我查一下订单 ORD-20250608-3847 的状态"，它只能说"我无法访问数据库"。能不能让 AI 自己决定什么时候查数据库、什么时候搜文档？

**主线案例**：为客服助手配备三个工具——查订单状态、搜索帮助文档、查询用户套餐信息，让 Agent 根据用户问题自主选择调用哪个工具。

**内容要点**：

- Tool 的定义：用 Zod schema 描述工具输入
- DynamicStructuredTool：创建自定义工具
- Agent 的本质：LLM 充当路由器，决定调用什么工具
- createReactAgent：ReAct 模式的 Agent（推理-行动循环）
- ToolNode + StateGraph：LangGraph 风格的 Agent
- 工具调用的流程：用户输入 → Agent 推理 → 选择工具 → 执行 → 观察结果 → 继续推理或返回
- 踩坑：Agent 进入死循环怎么办（最大步数限制）
- Function Calling Agent vs ReAct Agent 的区别

**与前篇关联**：前两篇构建了 RAG 检索链，这一篇把检索封装成一个工具，和其他工具（查订单等）一起交给 Agent 自由调度。

---

### 08. 生产实战：完整的智能客服助手

**核心问题**：功能都做完了，但用户体验很差——回答要等 10 秒、偶尔报错直接崩、API 费用蹭蹭涨。怎么从 demo 变成能上线的系统？

**主线案例**：将前面 7 篇的所有组件整合为一个完整的智能客服助手——支持 RAG 问答、工具调用、多轮对话、流式输出，加上错误处理和成本控制。

**内容要点**：

- 完整架构：Memory + RAG Retriever + Tools + Agent 的组合
- 流式输出：用户不用等 10 秒看到完整回复，逐字流式返回
  - LCEL 的 `.stream()` 方法
  - 如何区分内容 token 和工具调用 token
- 错误处理与降级策略
  - LLM 调用失败：重试 + 降级到更便宜的模型
  - 工具执行失败：让 Agent 知道出错了并调整策略
  - 检索无结果：给用户兜底回复而不是编造答案
- 成本控制
  - 缓存高频问题的回答
  - 用 gpt-4o-mini 处理简单问题，gpt-4o 处理复杂问题
  - token 用量监控
- 和 Web 框架集成：在 Next.js API Route 中使用 LangChain
- 总结：LangChain 的适用场景和局限性

**与前篇关联**：这是系列的收官之作，把前面 7 篇的所有组件组装成一个完整系统。

---

## 学习路径图

```
基础篇 ──────────────────────────────────────────────
  01 为什么需要 LangChain ──► 02 模型、提示词与输出解析
                                      │
核心篇 ──────────────────────────────────────────────
           03 LCEL 链式调用 ──► 04 记忆与多轮对话
                                           │
RAG 篇 ──────────────────────────────────────────────
          05 文档加载与切分 ──► 06 向量化存储与检索
                                           │
进阶篇 ──────────────────────────────────────────────
          07 工具调用与 Agent ──► 08 生产实战：智能客服
```

---

## 预期效果

完成本系列后，你将能够：

- 理解 LangChain 的核心抽象（模型、提示词、输出解析、链、记忆、检索、Agent）
- 用 LCEL 组装复杂的 AI 工作流
- 从零构建一个 RAG 问答系统（文档加载 → 切分 → 向量化 → 检索 → 生成）
- 让 AI 使用工具（查数据库、调 API）并自主决策
- 在 Node.js/TypeScript 项目中集成 LangChain.js
- 处理流式输出、错误降级、成本控制等生产级问题

---

## 版本信息

- **LangChain.js**：0.3.x（@langchain/core, @langchain/openai）
- **Node.js**：20.x LTS
- **TypeScript**：5.x
- **Zod**：3.x
- **OpenAI API**：gpt-4o / gpt-4o-mini
