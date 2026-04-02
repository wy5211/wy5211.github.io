# Claude Code 实战指南

## 背景

Claude Code 不是"会写代码的聊天机器人"，而是能理解项目、规划任务、自动执行的开发环境。但很多开发者只用它写函数、修 bug，没有发挥它的核心能力——Plan Mode（先规划再执行）、Agent System（自动探索代码）、Skills（封装团队规范）。

这个系列的目标是：**用一个真实项目从接手到交付，展示 Claude Code 的完整工作流**。

### 技术栈

- Claude Code（Latest）
- Node.js 22 LTS

### 主线案例：接手一个遗留 API 项目

你刚加入团队，接手了一个运行 6 个月的 NestJS API 项目——在线教育平台的 `edu-platform-api`。项目有这些问题：

- 86 个文件，没有文档
- 测试覆盖率 18%
- 课程列表接口响应超过 3 秒
- 用户注册没有邮箱校验
- OrderService 大量重复代码

你用 Claude Code 快速理解项目、修复问题、重构代码、补齐测试。

---

## 博客目录结构

```
content/posts/claude-code/
├── plan.md
├── 01-getting-started.mdx
├── 02-effective-prompting.mdx
├── 03-plan-mode.mdx
├── 04-agent-skills.mdx
├── 05-refactor-testing.mdx
└── 06-workflow.mdx
```

---

## 每篇文章大纲

### 01. 快速入门：Claude Code vs 其他 AI 工具

**文件名**：`01-getting-started.mdx`

**核心问题**：GitHub Copilot 能自动补全，Cursor 能对话写代码，为什么还需要 Claude Code？

**主线案例**：用 Claude Code 搭建一个 Express API——体验从零到运行的完整流程

**内容要点**：

1. Claude Code 的独特价值：200K 上下文、Plan Mode、Skills 生态
2. 安装与配置：API Key、权限模式、CLAUDE.md
3. 第一个项目：用 Claude Code 搭建 Express API
4. 什么时候用 Claude Code，什么时候 IDE 插件就够了

**与前篇关联**：无（系列第一篇）

---

### 02. 高效对话：怎么和 Claude Code 说话

**核心问题**：有人一句话让它干对，有人来回十轮还是没对。问题在哪？

**主线案例**：对比"好 Prompt"和"差 Prompt"在实现分页接口上的差异

**内容要点**：

1. 有效 Prompt 的结构：目标 + 约束 + 上下文 + 示例
2. @ 引用文件：精确提供上下文
3. 什么时候该分步指令、什么时候一步到位
4. 常见沟通陷阱

**与前篇关联**：上篇会用了，这篇优化沟通方式

---

### 03. Plan Mode：复杂任务先规划

**核心问题**：让它"重构认证模块"，它改了 30 个文件方向全错了。复杂任务不能直接动手。

**主线案例**：用 Plan Mode 规划"课程列表缓存"功能——探索、设计、评估风险再执行

**内容要点**：

1. Plan Mode 的本质：先想方案，你确认后再执行
2. 什么时候该用、什么时候不该用
3. Plan Mode 工作流程：探索 → 设计 → 评审 → 执行

**与前篇关联**：上篇学会沟通，这篇让它先规划

---

### 04. Agent System 与 Skills

**核心问题**：86 个文件的项目，想快速搞清架构。手动看？太慢。

**主线案例**：用 Explore Agent 分析代码库，创建代码审查 Skill

**内容要点**：

1. Agent System：Explore Agent 快速搜索
2. Skills：封装重复性工作流
3. 自定义 Skill：从零创建代码审查 Skill
4. 什么时候该用 Agent/Skill

**与前篇关联**：上篇规划了任务，这篇用 Agent 执行

---

### 05. 代码重构与测试驱动

**核心问题**：OrderService 大量重复，测试覆盖率 18%。怎么安全地改？

**主线案例**：重构 OrderService——小步重构、同步补测试

**内容要点**：

1. 安全重构：先理解再动手、小步提交
2. 测试驱动：让 Claude Code 生成测试
3. 重构节奏：一次改多少合适
4. 什么时候不该让 AI 重构

**与前篇关联**：上篇用 Agent/Skill 自动化，这篇处理代码质量

---

### 06. Git 工作流与最佳实践

**核心问题**：个人用得很爽，但团队协作时——commit message 写不好、PR review 漏问题。

**主线案例**：为团队搭建 Claude Code 协作规范

**内容要点**：

1. Git 集成：生成 commit message、创建 PR、review 代码
2. CLAUDE.md 团队规范
3. Hooks 集成：pre-commit 检查
4. 能力边界：Claude Code 擅长什么、不擅长什么

**与前篇关联**：前 5 篇个人技巧，这篇扩展到团队

---

## 学习路径

```
01 快速入门 ──► 02 高效对话 ──► 03 Plan Mode
                                       │
                          04 Agent + Skills
                                       │
                          05 重构与测试
                                       │
                          06 Git 与团队
```

---

## 预期效果

学完后将具备：

- 理解 Claude Code 的独特价值
- 写出高质量 Prompt
- 用 Plan Mode 安全处理复杂任务
- 用 Agent/Skills 自动化工作流
- 安全地重构和测试
- 在团队中推广 Claude Code
