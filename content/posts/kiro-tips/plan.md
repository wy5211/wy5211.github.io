# Kiro 实战技巧系列计划

## 背景

- **为什么写这个系列**：Kiro（Amazon 的 AI IDE）2026 年 3 月正式 GA 后，越来越多的团队开始用它。它的 Spec-Driven Development（规格驱动开发）和 Claude Code 的"直接上手干"是完全不同的哲学。本系列对照 [Claude Code 实战技巧](/posts/claude-code-tips/01-claude-md-project-context) 来写，帮已经用了一段时间 Kiro 的开发者深入掌握它。
- **目标读者**：已经在用 Kiro 的开发者，不需要再解释"什么是 Kiro"或"怎么安装"。了解 Claude Code 会帮助理解对比，但不是必须的。
- **文章类型**：A（技术类）

## 与 Claude Code 系列的关系

- 每篇文章都会对照 Claude Code 的对应功能来写
- 不是"踩一捧一"，而是帮读者理解两个工具各自擅长的场景
- 最后一篇是完整的选择指南：什么时候用 Kiro，什么时候用 Claude Code，什么时候两者配合

## 系列定位

Claude Code 系列是"你已经用了一段时间，现在告诉我怎么用得更好"。Kiro 系列更进一步——"你已经知道 Claude Code 怎么用了，现在看看 Kiro 有什么不一样的玩法，以及什么时候该用哪个"。

## 博客目录结构

```
content/posts/kiro-tips/
├── plan.md
├── 01-steering-files.mdx                  # Steering Files：比 CLAUDE.md 更体系化的项目配置
├── 02-spec-driven-development.mdx         # Spec-Driven Development：先写规格再写代码
├── 03-spec-writing-mastery.mdx            # Spec 编写实战：EARS 记法和 GIVEN-WHEN-THEN
├── 04-hooks-automation.mdx                # Hooks 自动化：对照 Claude Code 的 Hook 系统
├── 05-powers-subagents-skills.mdx         # Powers、Subagents 与 Skills：Kiro 的能力扩展体系
├── 06-aws-integration.mdx                 # AWS 原生集成：Kiro 的主场优势
├── 07-multi-agent-architecture.mdx        # 多 Agent 架构：对照 Claude Code 的 Workflow
├── 08-kiro-vs-claude-code.mdx             # Kiro vs Claude Code：选择指南与配合策略
```

## 阶段划分

### 第一阶段：理解 Kiro 的哲学（01-03）

Kiro 和 Claude Code 最大的区别不是功能，而是哲学——Kiro 要求你先想清楚再动手。这三篇建立这个认知。

- **01 Steering Files：比 CLAUDE.md 更体系化的项目配置**
  - 对照 Claude Code 的 CLAUDE.md，理解 Kiro 的多文件配置体系
  - product.md / structure.md / tech.md 各自写什么
  - Steering Files 的层级策略

- **02 Spec-Driven Development：先写规格再写代码**
  - 对照 Claude Code 的 Plan 模式，理解 Kiro 的 SDD 方法论
  - 什么任务适合 SDD，什么不适合
  - SDD 的完整工作流：Requirements → Design → Tasks

- **03 Spec 编写实战：EARS 记法和 GIVEN-WHEN-THEN**
  - 怎么写出"好的"Spec（不多不少）
  - EARS 记法详解
  - GIVEN-WHEN-THEN 验收标准
  - Spec 的粒度控制

### 第二阶段：自动化与扩展（04-05）

- **04 Hooks 自动化：对照 Claude Code 的 Hook 系统**
  - Kiro Hooks vs Claude Code Hooks：事件模型对比
  - Kiro 的 YAML 配置方式
  - Hook Chain：串起来做多步自动化

- **05 Powers、Subagents 与 Skills：Kiro 的能力扩展体系**
  - 对照 Claude Code 的 Skills 生态
  - Kiro 的分层架构：Powers → Subagents → Skills
  - 自己创建 Skill

### 第三阶段：深入与实战（06-07）

- **06 AWS 原生集成：Kiro 的主场优势**
  - 对照 Claude Code 的 MCP 生态
  - Kiro 的 AWS 原生能力：Bedrock、CDK、Lambda
  - 非 AWS 项目的集成方案

- **07 多 Agent 架构：对照 Claude Code 的 Workflow**
  - Kiro 的多 Agent 模型 vs Claude Code 的 Workflow
  - Subagent 的分工策略
  - Agent Monitor Dashboard

### 第四阶段：选择与配合（08）

- **08 Kiro vs Claude Code：选择指南与配合策略**
  - 不同场景的选择建议
  - 两者配合使用的最佳实践
  - 各自的能力边界

## 每篇文章大纲

### 01 Steering Files：比 CLAUDE.md 更体系化的项目配置

**核心问题**：如果你用过 Claude Code，可能已经习惯了 CLAUDE.md——一个文件搞定项目上下文。Kiro 不一样，它用了一整个目录的"Steering Files"。为什么要这么复杂？多文件配置比单文件好在哪？

**学习目标**：

- 理解 Steering Files 的设计哲学——分关注点、分层管理
- 掌握每个 Steering File 该写什么
- 学会在单文件和多文件之间做选择

**主线场景**：把一个现有的 CLAUDE.md 拆解成 Kiro 的 Steering Files，体验两种方式的差异。

**内容要点**：

- Steering Files 和 CLAUDE.md 的核心区别
- product.md：产品愿景和用户故事
- structure.md：目录结构和命名约定
- tech.md：技术栈和编码规范
- 自定义 Steering File（如 ui-ux.md）
- 什么时候 Steering Files 比 CLAUDE.md 更好（团队协作、大型项目）
- 什么时候 CLAUDE.md 够用（个人项目、小项目）

**与前篇关联**：系列首篇，但会引用 Claude Code 系列第 1 篇的内容

---

### 02 Spec-Driven Development：先写规格再写代码

**核心问题**：Claude Code 的 Plan 模式是"先想再干"，Kiro 的 SDD 更进一步——不仅要想，还要把想法写成结构化的规格文档，然后让 Agent 按规格实现。这是 Kiro 和 Claude Code 最大的哲学差异。

**学习目标**：

- 理解 SDD 的三层控制循环
- 判断什么任务适合 SDD，什么不适合
- 对比 SDD 和 Claude Code Plan 模式的适用场景

**主线场景**：用同一个任务分别走 SDD 和 Claude Code Plan 模式，对比结果。

**内容要点**：

- SDD 的三层循环：Spec 层（WHAT）→ Steering 层（HOW）→ Hook 层（WHEN）
- Requirements → Design → Tasks 的完整流程
- SDD 的价值：减少返工、提升团队一致性
- SDD 的代价：小任务过度规格化是浪费时间
- 和 Claude Code Plan 模式的对比
- 什么时候用 SDD，什么时候用 Claude Code 的迭代模式

**与前篇关联**：Steering Files（01 篇）是 SDD 的 Steering 层，这篇展开 Spec 层

---

### 03 Spec 编写实战：EARS 记法和 GIVEN-WHEN-THEN

**核心问题**：知道要写 Spec 和写出"好的" Spec 是两回事。Spec 写太细变成伪代码，写太泛等于没写。怎么把握粒度？

**学习目标**：

- 掌握 EARS 记法写 Requirements
- 掌握 GIVEN-WHEN-THEN 写 Acceptance Criteria
- 学会控制 Spec 的粒度

**主线场景**：从一个模糊的需求出发，逐步打磨成一份完整的 Spec。

**内容要点**：

- EARS 记法：Event → Condition → Action → Response
- GIVEN-WHEN-THEN 验收标准
- Spec 的三层结构：Requirements（WHAT）→ Design（HOW）→ Tasks（IMPLEMENTATION）
- 边界情况的覆盖策略
- Spec 写太细 vs 写太泛的典型错误
- 对照 Claude Code 的 Plan 文件，看两种格式各自适合什么场景

**与前篇关联**：接续 02 篇的 SDD 方法论，这篇是实战技巧

---

### 04 Hooks 自动化：对照 Claude Code 的 Hook 系统

**核心问题**：Claude Code 和 Kiro 都有 Hooks 系统，但设计思路不同——Claude Code 用 JSON 配 Shell 命令，Kiro 用 YAML 声明式配置。哪种更好？

**学习目标**：

- 理解 Kiro Hooks 的事件模型
- 掌握 YAML Hook 配置
- 了解 Hook Chain（串起来做多步自动化）
- 对比两种 Hook 系统的优劣

**主线场景**：实现同样的自动化任务，分别用 Claude Code Hooks 和 Kiro Hooks，对比体验。

**内容要点**：

- Kiro Hooks 的事件：onSave / onCreate / onDelete / preCommit / postCommit / prePush / onTestComplete
- YAML 配置详解
- 最实用的 Hook 配置案例
- Hook Chain：多步骤串联自动化
- 对比 Claude Code Hooks（JSON + Shell vs YAML 声明式）
- 各自适合什么场景

**与前篇关联**：前几篇讲了项目配置和开发流程，这篇讲过程中的自动化

---

### 05 Powers、Subagents 与 Skills：Kiro 的能力扩展体系

**核心问题**：Claude Code 的扩展体系是 Skills + MCP。Kiro 的扩展体系是 Powers → Subagents → Skills，分层更细。为什么要分三层？

**学习目标**：

- 理解 Kiro 的三层能力架构
- 掌握 Subagent 的使用和配置
- 学会创建自定义 Skill
- 对比 Claude Code 的 Skills + MCP 生态

**主线场景**：从一个需求出发，分别用 Claude Code Skills 和 Kiro 的 Powers/Subagents/Skills 来实现。

**内容要点**：

- Powers：顶层能力（代码生成、重构、调试、测试、文档）
- Subagents：专业化 Agent（前端、后端、DevOps、安全、测试）
- Skills：可复用的操作模板
- 三层架构 vs Claude Code 的 Skills + MCP
- 创建自定义 Skill
- 社区生态对比（Claude Code 有 claudeskills.info 658+ Skills，Kiro 生态还在成长中）

**与前篇关联**：Hooks 是被动自动化，Powers/Subagents/Skills 是主动能力扩展

---

### 06 AWS 原生集成：Kiro 的主场优势

**核心问题**：Claude Code 通过 MCP 服务器连接外部服务——GitHub、数据库、Figma 都要单独装。Kiro 不需要这些，它原生就集成了 AWS 全家桶。如果你用 AWS，这是 Kiro 最大的优势。

**学习目标**：

- 理解 Kiro 的 AWS 原生集成能力
- 掌握常用 AWS 服务的集成配置
- 对比 Kiro AWS 集成 vs Claude Code MCP 方案

**主线场景**：搭建一个 AWS 原生的开发工作流，对比用 Claude Code + MCP 搭建同样的工作流。

**内容要点**：

- Amazon Bedrock：模型选择和切换
- AWS CDK：基础设施即代码
- AWS Lambda：Hook 的 serverless 执行
- Amazon S3：代码存储和版本管理
- Strands Agents Framework：AWS 的 Agent 框架
- 非 AWS 项目的集成方案
- 对比 Claude Code MCP：灵活 vs 原生

**与前篇关联**：前面讲的都是本地能力，这篇打开外部世界的连接

---

### 07 多 Agent 架构：对照 Claude Code 的 Workflow

**核心问题**：Claude Code 用 Workflow 编排多个 Agent——Pipeline、Parallel、Loop-until-dry。Kiro 用 Subagent 架构——专业化分工、实时监控。两种多 Agent 模型有什么区别？

**学习目标**：

- 理解 Kiro 的多 Agent 模型
- 掌握 Subagent 的分工策略
- 使用 Agent Monitor Dashboard
- 对比两种多 Agent 方案

**主线场景**：一次多维度代码审查，分别用 Claude Code Workflow 和 Kiro Subagent 来做。

**内容要点**：

- Kiro 的 Subagent 分工模型
- Agent Monitor Dashboard：实时监控 Agent 活动
- Checkpoint 系统：随时回滚
- 对比 Claude Code Workflow 的 Pipeline/Parallel/Loop
- 各自适合什么场景
- 成本对比

**与前篇关联**：把前面的 Steering、Spec、Hooks、Powers 都组合起来，看多 Agent 协作

---

### 08 Kiro vs Claude Code：选择指南与配合策略

**核心问题**：到底用 Kiro 还是 Claude Code？还是两个都用？什么时候用哪个？

**学习目标**：

- 建立自己的工具选择框架
- 学会两者配合使用的最佳实践
- 了解各自的能力边界

**主线场景**：还原不同类型的开发任务，看每个任务该用哪个工具。

**内容要点**：

- Kiro 擅长的场景：大型项目、团队协作、AWS 技术栈、需要规格化的需求
- Claude Code 擅长的场景：个人开发、快速原型、调试分析、非 AWS 技术栈
- 配合使用的最佳实践
- 定价对比（Kiro $20/月 vs Claude Code 用量计费）
- 社区生态对比
- 各自的能力边界总结

**与前篇关联**：系列收尾——综合所有对比，给出实用的选择建议

## 系列节奏规划

```
第一阶段·理解哲学（01-03）
  → Kiro 和 Claude Code 最大的区别在于哲学，先理解再动手
  → 节奏：建立认知框架，用对比加深理解

第二阶段·自动化与扩展（04-05）
  → 掌握 Kiro 的自动化和扩展能力
  → 节奏：实战为主，每个功能都有 Claude Code 对比

第三阶段·深入与实战（06-07）
  → 从本地到云端，从单 Agent 到多 Agent
  → 节奏：展示 Kiro 的差异化优势

第四阶段·选择与配合（08）
  → 综合对比，建立选择框架
  → 节奏：总结收尾，给出行动指南
```

## 主线案例演进

整个系列有一条隐含的主线：**一个同时使用 Kiro 和 Claude Code 的开发者，在不同任务中选择不同工具的过程**。

- 01 篇：把 CLAUDE.md 拆解成 Steering Files，理解两种配置方式
- 02 篇：用 SDD 方法论规划功能，对照 Claude Code Plan 模式
- 03 篇：打磨 Spec 编写技巧，写出高质量的规格文档
- 04 篇：配置 Hooks 自动化，对比两种 Hook 系统
- 05 篇：探索 Kiro 的 Powers/Subagents/Skills，对照 Claude Code Skills
- 06 篇：利用 AWS 原生集成，这是 Kiro 的主场
- 07 篇：用多 Agent 架构处理复杂任务，对照 Workflow
- 08 篇：形成自己的工具选择框架，知道什么时候用哪个
