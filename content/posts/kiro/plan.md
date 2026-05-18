# Kiro 编辑器使用教程

## 背景

AI 编程工具已经从"自动补全"进化到"智能体开发"。GitHub Copilot 帮你写函数，Cursor 让你对话改代码，Windsurf 给你连续工作流。但这些工具都有一个共同的问题：**缺少工程严谨性**。AI 生成代码很快，但你不知道它为什么这么做，改了哪些文件，会不会引入新问题。

Kiro 是 AWS 推出的 AI IDE，核心差异化在于 **Spec-driven development（规格驱动开发）**——把 AI 编码从"聊天生成代码"提升到"需求→设计→任务"的结构化工程流程。它还有 Steering 引导系统、Hooks 自动化钩子、Powers 能力包等独特功能。

这个系列的目标是：**用一个真实的全栈项目从零搭建到部署，展示 Kiro 的完整工作流**。

### 技术栈

- Kiro IDE（Latest）
- Node.js 22 LTS
- Hono + React（主线项目）

### 主线案例：从零搭建一个习惯追踪 App

你决定做一个习惯追踪 App——`HabitFlow`。功能不复杂但涉及前后端全栈：

- 用户注册/登录
- 创建习惯、每日打卡
- 连续天数统计和可视化
- 数据持久化（SQLite）

你用 Kiro 从需求分析开始，经历规格设计、代码生成、调试、部署的全流程。

---

## 博客目录结构

```
content/posts/kiro/
├── plan.md
├── 01-what-is-kiro.mdx
├── 02-setup-and-first-project.mdx
├── 03-spec-driven-development.mdx
├── 04-steering-and-hooks.mdx
├── 05-chat-and-agents.mdx
├── 06-powers-skills-mcp.mdx
├── 07-advanced-workflow.mdx
```

---

## 阶段划分

### 入门篇（2篇）

- 01 什么是 Kiro、为什么值得关注
- 02 安装配置、第一个项目跑起来

### 核心篇（3篇）

- 03 Spec 驱动开发（核心差异化功能）
- 04 Steering 引导系统 + Hooks 自动化
- 05 Chat 智能对话 + Agent 工作流

### 进阶篇（2篇）

- 06 Powers 能力包 + Skills 技能 + MCP 扩展
- 07 高级工作流：调试、团队协作、最佳实践

---

## 每篇文章大纲

### 01. Kiro 是什么？为什么需要又一个 AI IDE

**文件名**：`01-what-is-kiro.mdx`

**核心问题**：GitHub Copilot 补全代码，Cursor 对话改代码，Windsurf 连续工作流——为什么还需要 Kiro？

**主线案例**：对比用 Cursor 和 Kiro 分别实现同一个功能（用户注册 API），体验差异

**内容要点**：

1. AI IDE 的进化：从补全到对话到智能体
2. Kiro 的核心定位：Spec-driven development（规格驱动开发）
3. 与 Cursor / Windsurf / Copilot 的对比
4. Kiro 的独特功能概览：Specs、Steering、Hooks、Powers
5. 适合谁用、什么时候该切换到 Kiro

**与前篇关联**：无（系列第一篇）

---

### 02. 安装配置与第一个项目

**核心问题**：装完 Kiro 打开项目，一堆按钮不知道从哪开始？

**主线案例**：安装 Kiro，创建 HabitFlow 项目，用 Kiro 生成第一个 API 接口

**内容要点**：

1. 安装 Kiro（macOS/Windows/Linux）
2. 从 VS Code 迁移：导入设置和扩展
3. 界面导览：Spec 面板、Chat 面板、Steering 文件
4. 模型选择：Auto / Sonnet / Opus / DeepSeek 怎么选
5. 第一个 Spec：用 Quick Plan 快速生成注册 API
6. Autopilot vs Supervised 模式：什么时候用哪个

**与前篇关联**：上篇了解了 Kiro 是什么，这篇动手装起来

---

### 03. Spec 驱动开发：从想法到代码

**核心问题**：让 AI 直接写代码，出来的东西和想要的不一样。怎么让 AI 先想清楚再动手？

**主线案例**：用 Feature Spec 为 HabitFlow 设计"习惯打卡"功能——经历需求→设计→任务三阶段

**内容要点**：

1. Spec 的本质：让 AI 先写"文档"再写代码
2. 三阶段工作流：requirements.md → design.md → tasks.md
3. 实战：创建一个 Feature Spec
4. 并行任务执行：Kiro 怎么自动分析依赖关系
5. Bugfix Spec：用 Spec 思路修 bug
6. Spec 的最佳实践和常见陷阱

**与前篇关联**：上篇体验了 Quick Plan，这篇深入完整的 Spec 流程

---

### 04. Steering 引导系统与 Hooks 自动化

**核心问题**：每次新对话都要重复告诉 AI "用 TypeScript、用 Hono 框架、错误处理用 XXX 模式"——能不能让它记住？

**主线案例**：为 HabitFlow 配置 Steering 文件和 Hooks，让 Kiro 自动遵循项目规范

**内容要点**：

1. Steering 是什么：给 AI 的"项目记忆"
2. 三个基础文件：product.md / tech.md / structure.md
3. 自定义 Steering 文件：编码规范、API 设计约定
4. 作用域：工作区 vs 全局 vs 团队
5. Hooks 自动化钩子：文件保存时自动 lint、提交前检查
6. 实战：配置一套完整的 Steering + Hooks 规范

**与前篇关联**：上篇 Spec 搞定了功能开发，这篇让 AI 自动遵循项目规范

---

### 05. Chat 智能对话与 Agent 工作流

**核心问题**：Kiro 的 Chat 和 Cursor 的 Chat 有什么不同？什么时候用 Chat，什么时候用 Spec？

**主线案例**：为 HabitFlow 添加"连续打卡统计"功能——对比 Vibe Session 和 Spec Session 的使用场景

**内容要点**：

1. 两种会话模式：Vibe Session vs Spec Session
2. Vibe 模式：快速问答、探索式编程
3. Spec 模式：结构化的复杂任务
4. Subagents 子代理：并行处理多个任务
5. Checkpoints 检查点：安全回退
6. Dev Servers：开发服务器集成
7. Diagnostics 诊断工具

**与前篇关联**：前几篇用 Spec 做结构化开发，这篇补充 Chat 的灵活用法

---

### 06. Powers、Skills 与 MCP 扩展

**核心问题**：Kiro 的基础功能用熟了，怎么扩展它的能力？接数据库、调 API、连 Figma——都怎么做？

**主线案例**：为 HabitFlow 接入 Supabase 数据库（通过 Power）和自定义 Agent Skill

**内容要点**：

1. Powers 能力包：一键安装，动态加载
2. 常用 Powers：Supabase、AWS、Postman、Figma
3. Agent Skills：遵循 agentskills.io 标准
4. 创建自定义 Skill：把重复工作流封装起来
5. MCP（Model Context Protocol）：连接外部工具
6. 生态对比：Kiro vs Cursor 的扩展机制

**与前篇关联**：上篇掌握了对话和 Agent，这篇扩展 Kiro 的能力边界

---

### 07. 高级工作流与最佳实践

**核心问题**：个人项目用得很好，但真实项目中——调试复杂 bug、团队协作、性能优化，Kiro 能帮到什么程度？

**主线案例**：HabitFlow 遇到并发打卡导致数据不一致的 bug，用 Kiro 全流程调试修复

**内容要点**：

1. 调试工作流：让 Kiro 帮你定位和修复 bug
2. 性能优化：用 Kiro 分析和优化慢查询
3. 团队协作：Steering 文件共享、Hooks 团队标准化
4. 企业版功能：IAM、合规、监控
5. Kiro 的能力边界：擅长什么、不擅长什么
6. 完整实践指南：从个人到团队的使用建议

**与前篇关联**：前 6 篇覆盖了所有功能，这篇整合成完整工作流

---

## 学习路径

```
01 Kiro 是什么 ──► 02 安装与第一个项目
                            │
               03 Spec 驱动开发
                            │
               04 Steering + Hooks
                            │
               05 Chat 与 Agent
                            │
               06 Powers + Skills + MCP
                            │
               07 高级工作流与最佳实践
```

---

## 预期效果

学完后将具备：

- 理解 Kiro 的定位和核心差异化价值
- 熟练使用 Spec 驱动开发流程
- 配置 Steering 和 Hooks 建立项目规范
- 灵活使用 Chat 的各种模式
- 通过 Powers/Skills/MCP 扩展 Kiro 能力
- 在真实项目中高效使用 Kiro
