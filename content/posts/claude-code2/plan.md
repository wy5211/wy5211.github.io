# Claude Code 实战指南

## 背景

Claude Code 不只是一个"会写代码的终端"。它能理解整个项目结构、自动规划复杂任务、通过 Agent 分工协作、用 Hooks 自动化工作流、通过 MCP 接入外部工具。但大多数开发者只把它当成一个稍微聪明点的代码补全工具——让它"帮我写个函数"、"帮我改个 bug"，然后抱怨"AI 写的代码质量不行"。

问题不在工具，在于用法。这个系列的目标不是罗列功能，而是帮你建立一套**稳定的工作流**——让你知道什么场景用什么策略，什么任务该让 AI 做、什么任务该自己把关。

### 技术栈

| 技术        | 版本          | 说明               |
| ----------- | ------------- | ------------------ |
| Claude Code | Latest (v2.x) | Anthropic 官方 CLI |
| Node.js     | 22 LTS        | Claude Code 运行时 |

> 本系列面向已经在用 Claude Code 但感觉"用不深"的开发者。如果你还没装过，先看[官方文档](https://docs.anthropic.com/en/docs/claude-code)跑通第一个示例。

---

## 主线案例：TaskFlow 团队任务管理平台

从核心篇（04）开始，整个系列围绕一个真实场景展开：你加入了一个 5 人团队，负责维护 **TaskFlow**——一个类似 Linear 的团队任务管理平台。项目运行了一年多，代码库有 100+ 文件，技术债不少。

**项目背景**：

```
项目：TaskFlow（TypeScript + NestJS + PostgreSQL）
定位：团队任务管理平台（类似 Linear / Jira）
核心功能：工作区管理、项目看板、任务 CRUD、标签系统、
         通知推送、权限管理、Webhook 集成
文件数：127 个 TypeScript 文件
测试覆盖率：22%
已知问题：
  - 任务列表查询在标签筛选时走全表扫描，响应超过 2 秒
  - NotificationService 有 400 行，混合了 5 种通知渠道的逻辑
  - Webhook 投递没有重试机制，偶尔丢失
  - 权限检查散落在各个 Controller 里，没有统一中间件
```

**贯穿系列使用的数据示例**：

```typescript
// 一条真实的任务数据
{
  taskId: "tsk_7k2m9x",
  title: "修复订单导出 CSV 格式错误",
  description: "当订单包含多行商品时，CSV 的行数不对...",
  status: "in_progress",
  priority: "high",
  assignee: "usr_3n8j5k",
  project: "proj_billing",
  labels: ["bug", "export", "p1"],
  createdAt: "2026-03-28T14:20:00Z",
  updatedAt: "2026-04-02T09:15:00Z",
  dueDate: "2026-04-10T00:00:00Z"
}
```

---

## 系列节奏

```
基础篇（01-03）：独立小案例，建立 Claude Code 使用直觉
  → 每篇一个独立场景，快速掌握核心交互方式

核心篇（04-06）：引入 TaskFlow 案例，深入进阶功能
  → Agent System、Skills 与 Hooks、Memory 与上下文

进阶篇（07-09）：案例持续演进，工作流集成
  → MCP 扩展、代码质量、Git 与团队协作

实战篇（10）：综合运用，最佳实践
```

---

## 博客目录结构

```
content/posts/claude-code/
├── plan.md                          # 本计划文件
├── 01-getting-started.mdx           # 快速入门：从安装到第一次高效使用
├── 02-effective-prompting.mdx       # 高效对话：让它第一次就做对
├── 03-plan-mode.mdx                 # Plan Mode：复杂任务先想清楚
├── 04-agent-system.mdx              # Agent System：自动探索与分工协作
├── 05-skills-hooks.mdx              # Skills 与 Hooks：自动化你的工作流
├── 06-context-memory.mdx            # 上下文与 Memory：长时间对话不迷路
├── 07-mcp-servers.mdx               # MCP Servers：给 Claude Code 接上外部工具
├── 08-code-quality.mdx              # 代码质量：重构、测试与调试
├── 09-git-teamwork.mdx              # Git 工作流与团队协作
└── 10-best-practices.mdx            # 综合实战与最佳实践
```

---

## 基础篇：建立直觉（01-03）

目标：用 3 篇文章帮你掌握 Claude Code 的核心交互方式，理解它和其他 AI 工具的本质区别。

---

### 01. 快速入门：从安装到第一次高效使用

**核心问题**：你装了 Claude Code，能跑通基本命令。但和 GitHub Copilot、Cursor 比有什么区别？CLAUDE.md 到底写什么？权限怎么配？

**主线案例**：用 Claude Code 在空目录里搭建一个 Express API 项目——从初始化到第一个可用的接口，体验 Claude Code 的完整工作流。

**内容要点**：

- Claude Code vs GitHub Copilot vs Cursor：定位差异，什么时候用哪个
- 安装与认证：npm 安装、API Key、Max 订阅
- 第一次启动：`claude` 命令、基本交互、权限确认
- CLAUDE.md：为什么它是你最重要的配置文件、写什么不写什么
- 权限模型：6 种权限模式的区别与选择
- 基本工作流体验：给它需求 → 它读代码 → 它写代码 → 它跑命令

**与前篇关联**：系列第一篇，无前篇。

---

### 02. 高效对话：让它第一次就做对

**核心问题**：同样用 Claude Code，有人一句话就搞定，有人来回十轮还是不对。差距在哪？

**主线案例**：对比"好的 Prompt"和"差的 Prompt"在同一个任务（给任务列表接口加筛选和排序）上的效果差异。

**内容要点**：

- Claude Code 的上下文来源：CLAUDE.md、Memory、对话历史、@引用、工具读取
- 有效 Prompt 的核心：目标明确 + 约束清晰 + 上下文到位
- @ 引用：精确提供上下文 vs 让它自己找
- 分步指令 vs 一步到位：什么时候该拆、什么时候不该拆
- 沟通陷阱：太模糊、太冗长、自相矛盾、当搜索引擎用
- 让它"问你"而不是"猜你"：AskUserQuestion 的妙用

**与前篇关联**：上一篇搭好了项目、配好了 CLAUDE.md，这一篇优化你和 Claude Code 的沟通方式。

---

### 03. Plan Mode：复杂任务先想清楚

**核心问题**：你让它"重构通知模块"，它二话不说就改了 30 个文件，方向完全错了。复杂任务不能上来就动手。

**主线案例**：用 Plan Mode 规划"给任务列表加全文搜索"功能——先探索现有代码、设计搜索方案、列出改动清单、评估影响范围，确认后再执行。

**内容要点**：

- Plan Mode 的本质：只读探索 + 方案设计，确认后才写代码
- 什么时候用 Plan Mode：多文件改动、架构变更、不确定方案时
- 什么时候不用：单文件修改、明确的小需求（用了反而慢）
- Plan Mode 的工作节奏：探索 → 设计 → 反馈 → 确认 → 执行
- 怎么给有效反馈：指出问题、补充约束、调整方向
- /ultraplan：云端规划与协作评审（Beta）

**与前篇关联**：上一篇学会了怎么和它说话，这一篇学会让它先想清楚再动手。

---

## 核心篇：TaskFlow 案例（04-06）

目标：引入"接手 TaskFlow 项目"作为贯穿案例，用 Agent、Skills、Hooks、Memory 提升开发效率。

---

### 04. Agent System：自动探索与分工协作

**核心问题**：TaskFlow 有 127 个文件，你想快速搞清楚整体架构。手动一个个看？太慢。Claude Code 的 Agent System 可以自动探索代码库、并行处理任务。

**主线案例**：用 Agent System 分析 TaskFlow 项目——Explore Agent 摸清架构和依赖关系，General Purpose Agent 修复已知 bug，理解不同 Agent 的适用场景。

**内容要点**：

- Agent System 是什么：独立的子任务执行者，有自己的上下文窗口和工具集
- 三种内置 Agent：Explore（快速搜索探索）、Plan（只读规划）、General Purpose（通用执行）
- 自定义 Agent：Markdown 文件定义，支持独立权限和工具配置
- worktree 隔离：Agent 在独立分支工作，不污染你的代码
- 后台执行：多 Agent 并行，不阻塞主对话
- 什么时候用 Agent、什么时候直接对话：别过度使用

**与前篇关联**：上一篇用 Plan Mode 规划了任务，这一篇用 Agent System 执行多步骤的探索和修改。

---

### 05. Skills 与 Hooks：自动化你的工作流

**核心问题**：每次提交都要想 commit message，每次 code review 都要检查同样的几个点，每次部署前都要跑同样的检查……这些重复性工作能不能自动化？

**主线案例**：为 TaskFlow 团队创建自动化工作流——代码审查 Skill、commit 规范 Hook、部署前检查 Hook，减少重复劳动。

**内容要点**：

- Skills：预定义的指令模板，用 `/skill-name` 一键触发
- 自定义 Skill 开发：Markdown 格式、触发条件、参数传递
- Hooks：在特定生命周期事件自动执行 shell 命令
- Hook 事件类型：PreToolUse、PostToolUse、SessionStart 等 25+ 种
- Hook 的条件匹配：glob/regex 过滤、条件执行、异步执行
- 实战：从零创建一个代码审查 Skill + 对应的 Hook 自动触发
- 什么时候该自动化、什么时候不该：避免过度工程化

**与前篇关联**：上一篇用 Agent 处理了一次性任务，这一篇把重复性工作封装成自动化的 Skill 和 Hook。

---

### 06. 上下文与 Memory：长时间对话不迷路

**核心问题**：对话到第 30 轮，Claude Code 开始"忘记"前面的内容。127 个文件的项目，它经常找不到正确的代码。怎么办？

**主线案例**：在 TaskFlow 项目中优化上下文使用——合理分层 CLAUDE.md、利用 Memory 跨会话记忆、精准 @ 引用避免上下文膨胀。

**内容要点**：

- 上下文窗口的运作方式：200K tokens 看似多，代码文件很占空间
- CLAUDE.md 分层设计：managed policy → user → project → local，优先级与覆盖
- `.claude/rules/` 目录：路径匹配的规则文件，只在相关目录生效
- Memory 系统：Claude 自己写的持久化笔记，跨会话保留
- Memory 的类型：user（用户画像）、feedback（偏好反馈）、project（项目上下文）、reference（外部资源）
- @ 引用策略：引用具体文件 vs 引用目录 vs Grep 结果
- /clear 的时机：对话跑偏、上下文过大、切换任务

**与前篇关联**：前几篇在单次对话中完成任务，这一篇解决长时间、大项目的上下文管理问题。

---

## 进阶篇：工作流集成（07-09）

目标：把 Claude Code 深度集成到开发工作流中——外部工具扩展、代码质量保障、团队协作。

---

### 07. MCP Servers：给 Claude Code 接上外部工具

**核心问题**：Claude Code 能读写文件、跑命令，但它不知道你的数据库里有什么、不知道 Jira 上有哪些 ticket、不知道 Grafana 上的监控数据。MCP（Model Context Protocol）就是解决这个问题的。

**主线案例**：为 TaskFlow 配置 MCP Server——连接 PostgreSQL 查询任务数据、连接 Jira 同步 issue 状态、连接内部 API 文档。

**内容要点**：

- MCP 是什么：让 Claude Code 调用外部工具和数据的标准化协议
- MCP Server 类型：stdio、HTTP、SSE、WebSocket
- 内置 MCP Server：VS Code 的 `ide` server（诊断、Jupyter 执行）
- 配置 MCP Server：`claude mcp add`、settings.json、per-agent 配置
- 工具命名规则：`mcp__<server>__<tool>`
- 实战：配置一个 PostgreSQL MCP Server，让 Claude Code 直接查询任务数据
- MCP 的安全考量：权限控制、敏感操作确认

**与前篇关联**：上一篇管理好了内部上下文，这一篇通过 MCP 扩展 Claude Code 的外部信息源。

---

### 08. 代码质量：重构、测试与调试

**核心问题**：TaskFlow 的 NotificationService 有 400 行混合逻辑，测试覆盖率只有 22%。你想重构但怕改出 bug，想补测试但不知道从哪下手。

**主线案例**：用 Claude Code 重构 NotificationService——先用 Plan Mode 分析和设计方案，再小步重构、同步补测试，确保功能不变。

**内容要点**：

- 用 Claude Code 做安全重构：先理解影响范围、再小步修改、每步验证
- 重构策略：提取公共逻辑、拆分大函数、统一错误处理
- 测试生成：让 Claude Code 先理解业务逻辑，再生成有意义的测试
- 调试问题排查：怎么描述问题让它给出有用的诊断
- 重构的节奏：一次改多少、怎么分批提交、什么时候该停下来让人把关
- AI 生成的代码必须 review 和测试，不能盲目信任

**与前篇关联**：上一篇通过 MCP 扩展了能力，这一篇聚焦代码层面的质量提升。

---

### 09. Git 工作流与团队协作

**核心问题**：你用 Claude Code 写代码很舒服，但一到 Git 操作就头疼——commit message 写不好、PR review 漏掉问题、多人协作时规范不统一。

**主线案例**：为 TaskFlow 团队搭建 Claude Code 协作规范——统一的 CLAUDE.md、规范的 Git 工作流、自动化的 PR 审查。

**内容要点**：

- /commit：自动分析 diff、匹配提交风格、生成规范的 commit message
- /review-pr：分析变更、创建 PR、格式化描述
- PR 审查：让 Claude Code 做第一轮 code review，人工复核关键决策
- CLAUDE.md 团队规范：写什么、不写什么、怎么随项目演进
- 多人协作：settings.json 分层（user → project → local）、权限共享
- 团队推广的常见阻力：安全顾虑、质量担忧、习惯改变——怎么应对

**与前篇关联**：前几篇是个人使用技巧，这一篇扩展到团队协作场景。

---

## 实战篇：综合运用（10）

目标：综合运用全系列知识，形成稳定的日常工作流。

---

### 10. 综合实战与最佳实践

**核心问题**：学了一堆技巧，但日常开发中到底该怎么组合使用？哪些功能该天天用、哪些偶尔用、哪些不需要学？

**主线案例**：模拟一个完整的开发日——早上 review PR，上午修 bug，下午重构模块，下班前提交。全部用 Claude Code 辅助，展示真实的工作节奏。

**内容要点**：

- 日常工作流：不同类型任务（修 bug、新功能、重构、review）的策略选择
- Claude Code 的能力边界：擅长什么（代码生成、分析、文档）、不擅长什么（架构决策、业务设计、跨系统调试）
- 三个最危险的误区：不验证就提交、Prompt 写太细变成"人工编译器"、过度依赖失去独立思考
- 效率的真实差距：不在某个炫酷功能，在微习惯的积累
- 持续学习：Claude Code 更新快，怎么跟上
- 系列回顾：从入门到实战的完整知识地图

**与前篇关联**：前 9 篇掌握了各个功能模块，这一篇综合运用，形成完整的工作流。

---

## 学习路径图

```
基础篇 ─────────────────────────────────────────
  01 快速入门 ──► 02 高效对话 ──► 03 Plan Mode
                                        │
核心篇 ─────────────────────────────────────────
          04 Agent System
                │
          05 Skills 与 Hooks
                │
          06 上下文与 Memory
                          │
进阶篇 ─────────────────────────────────────────
       07 MCP Servers ──► 08 代码质量
                                │
                          09 Git 与团队协作
                                   │
实战篇 ─────────────────────────────────────────
       10 综合实战与最佳实践
```

---

## 预期效果

完成本系列后，你将能够：

- 理解 Claude Code 和其他 AI 编程工具的本质区别，知道什么时候该用它
- 写出高质量的 Prompt，让它第一次就给出好结果
- 用 Plan Mode 安全地处理复杂任务
- 用 Agent System 自动化代码探索和并行任务
- 用 Skills 和 Hooks 建立自动化的团队工作流
- 管理大项目的上下文，长时间对话不迷路
- 通过 MCP 扩展 Claude Code 的能力边界
- 安全地重构代码、补齐测试
- 在团队中推广 Claude Code 的最佳实践
- 清楚地知道 Claude Code 能做什么、不能做什么
