# Claude Code 实战技巧系列计划

## 背景

- **为什么写这个系列**：用了三个月 Claude Code 后，发现很多强大的功能隐藏在表面之下——CLAUDE.md 写得好不好直接决定体验、Hooks 可以自动化大量重复操作、MCP 让 Claude 连上外部世界、Workflow 可以编排多 Agent 协作。这些不是入门教程会讲的东西，却是每天用 Claude Code 的人最需要的。
- **目标读者**：已经在用 Claude Code CLI 的开发者，不需要再解释"什么是 Claude Code"或"怎么安装"，直接上干货。
- **文章类型**：A（技术类）

## 与已有系列的关系

- `ai-fullstack` 系列（6 篇）讲的是用 Claude API 构建应用（LLM API / Prompt / Function Calling / MCP / RAG / Agent）
- `agent` 系列（8 篇）讲的是 AI Agent 的概念和架构
- **本系列完全不同**——讲的是 **Claude Code 这个工具本身** 的高级用法，不是用 API 开发，而是怎么把 Claude Code CLI 用到极致

## 系列定位

不是从零开始的教程，而是"你已经用了一段时间，现在让我告诉你怎么用得更好"。每篇文章解决一个具体的效率问题。

## 博客目录结构

```
content/posts/claude-code-tips/
├── plan.md
├── 01-claude-md-project-context.mdx      # CLAUDE.md：让 Claude 真正理解你的项目
├── 02-memory-context-management.mdx       # 记忆系统与上下文管理
├── 03-plan-mode-deep-dive.mdx             # Plan 模式：想清楚再动手
├── 04-hooks-automation.mdx                # Hooks：把重复操作自动化
├── 05-skills-extend-capabilities.mdx      # Skills 生态：从社区 Skill 到自制插件
├── 06-mcp-connect-world.mdx               # MCP 生态：热门服务器与实战配置
├── 07-workflow-multi-agent.mdx            # Workflow 与多 Agent 编排
├── 08-power-user-workflow.mdx             # 高效工作流：三个月实战与生态工具总结
```

## 阶段划分

### 第一阶段：打好地基（01-02）

这两篇是后续所有内容的基础——CLAUDE.md 写不好，其他功能再强也白搭；上下文管理不好，长对话就会出问题。

- **01 CLAUDE.md：让 Claude 真正理解你的项目**
  - CLAUDE.md 不是 README，它是 Claude 的"工作手册"
  - 好的 CLAUDE.md vs 差的 CLAUDE.md 对比
  - 项目级 vs 全局级配置策略
  - 实战：为你的博客项目写一份高质量的 CLAUDE.md

- **02 记忆系统与上下文管理**
  - 两种记忆机制：auto-memory vs 手动记忆
  - 什么时候该用记忆，什么时候该写进 CLAUDE.md
  - 上下文窗口的"经济学"——什么值得放进上下文，什么该省掉
  - 长对话中保持 Claude 不"失忆"的技巧

### 第二阶段：深度工作（03-05）

这三篇覆盖 Claude Code 的三个核心高级功能，是日常高效使用的关键。

- **03 Plan 模式：想清楚再动手**
  - Plan 模式解决了什么问题——避免 Claude 一上来就写一堆代码然后推翻重来
  - Plan 模式的正确打开方式：不是所有任务都需要 Plan
  - Plan 中的决策点：利用 AskUserQuestion 和 EnterPlanMode
  - 实战：用 Plan 模式重构一个真实项目模块

- **04 Hooks：把重复操作自动化**
  - Hooks 的生命周期——12 个触发点分别适合做什么
  - 最实用的 5 个 Hook 配置案例：
    - 每次编辑后自动格式化
    - Commit 前自动 lint 和 type check
    - 会话结束时发送通知
    - 新会话开始时自动拉取最新代码
    - 自动生成 commit message
  - Hook 的边界——什么不该自动化

- **05 Skills 生态：从社区 Skill 到自制插件**
  - Skill 和 Hook 的区别——什么时候该用 Skill，什么时候用 Hook
  - 社区热门 Skills 实测推荐（Superpowers、Context7、Task Master 等）
  - Skill 的发现与安装：claudeskills.info、awesome-claude-skills、npx skills add
  - 自己写一个 Skill：从需求分析到完整实现
  - Skill 的组合使用——多个 Skill 配合打造专属工作流

### 第三阶段：连接与协作（06-07）

这两篇把 Claude Code 从单机工具变成连接外部世界、多 Agent 协作的系统。

- **06 MCP 生态：热门服务器与实战配置**
  - MCP 解决了什么问题——Claude Code 默认只能操作本地文件和终端
  - 热门 MCP 服务器实战测评（GitHub、Supabase、Playwright、Figma、Sentry 等）
  - MCP 服务器的发现与选型：mcpmarket.com 排行榜
  - 配置 MCP 服务器的最佳实践与踩坑经验
  - 自己搭建一个 MCP 服务器：连接你的内部 API

- **07 Workflow 与多 Agent 编排**
  - 从单 Agent 到多 Agent——什么时候需要编排，什么时候单 Agent 就够了
  - Workflow 的三种核心模式：pipeline、parallel、loop-until-dry
  - 实战：用 Workflow 做一次完整的代码审查
  - 多 Agent 协作的注意事项——token 消耗、错误处理、结果聚合

### 第四阶段：实战收尾（08）

- **08 高效工作流：三个月实战总结**
  - 一天的 Claude Code 工作流——从早到晚怎么配合
  - 社区周边工具：Claude HUD 状态栏、awesome-claude-skills 目录等
  - 最常见的 10 个"坑"和解决方案
  - 不同场景的最佳实践：新项目启动 vs 日常开发 vs Bug 修复 vs 代码审查
  - 成本控制——怎么用最少的 token 做最多的事
  - 和其他 AI 编程工具的对比——Claude Code 适合做什么，不适合做什么

## 每篇文章大纲

### 01 CLAUDE.md：让 Claude 真正理解你的项目

**核心问题**：为什么同样的任务，有时候 Claude 表现得像专家，有时候像实习生？答案往往在 CLAUDE.md 里。

**学习目标**：

- 理解 CLAUDE.md 的作用机制——它不是静态文档，是 Claude 的动态上下文
- 掌握写好 CLAUDE.md 的核心原则
- 学会针对不同项目类型定制 CLAUDE.md

**主线场景**：从一份"垃圾"CLAUDE.md 开始，逐步改造它，观察 Claude 在每次改动后的表现变化。

**内容要点**：

- CLAUDE.md 的三层结构：项目概览 → 技术栈与架构 → 编码规范与约定
- 常见错误：把 CLAUDE.md 写成 README、写太长（>200 行 Claude 就开始忽略）、写太泛
- 项目级 vs 全局级 CLAUDE.md——什么时候该在 `~/.claude/` 写全局配置
- 好的 CLAUDE.md 实例展示与逐段解读
- 进阶技巧：用 CLAUDE.md 控制输出风格、测试策略、提交规范

**与前篇关联**：系列首篇，无需关联

---

### 02 记忆系统与上下文管理

**核心问题**：你有没有遇到过——聊了很久的对话，Claude 突然"忘了"之前说好的事情？或者每次新对话都要重新解释一遍项目背景？

**学习目标**：

- 理解 Claude Code 的记忆机制——不是真的"记忆"，是上下文注入
- 学会选择合适的记忆策略——CLAUDE.md vs Memory vs 对话上下文
- 掌握长对话中的上下文优化技巧

**主线场景**：一个持续两小时的开发会话中，Claude 逐渐"失忆"的过程，以及如何通过记忆系统避免。

**内容要点**：

- Auto-memory 的工作原理——Claude 自动记住的 vs 它记不住的
- 手动记忆的使用场景——项目偏好、团队规范、个人习惯
- 上下文窗口的"经济学"——每条信息的 token 成本，什么值得放进去
- 实战：为你的项目建立记忆体系
- 与 CLAUDE.md 的协作——记忆存动态信息，CLAUDE.md 存静态信息

**与前篇关联**：接续 01 篇的 CLAUDE.md，记忆系统是 CLAUDE.md 的补充——CLAUDE.md 是"规章制度"，记忆是"工作经验"。

---

### 03 Plan 模式：想清楚再动手

**核心问题**：你是不是经常遇到这种情况——让 Claude 改个功能，它马上开始写代码，写了一半发现方向不对，推翻重来，来回好几轮才搞定？

**学习目标**：

- 理解 Plan 模式的价值——不是慢，是快
- 掌握什么时候该进 Plan 模式，什么时候直接开干
- 学会在 Plan 中引导 Claude 做出更好的架构决策

**主线场景**：对比同一个任务——直接让 Claude 写 vs 先 Plan 再执行——看看结果差异有多大。

**内容要点**：

- Plan 模式的触发时机：新功能开发、架构重构、不确定需求的任务
- 不需要 Plan 的场景：简单 bug 修复、单文件改动、明确的小任务
- Plan 中的交互技巧：用 AskUserQuestion 让 Claude 主动提问
- Plan 文件的结构：现状分析 → 方案对比 → 实施步骤 → 风险点
- 实战：用 Plan 模式设计一个真实功能模块
- 常见错误：Plan 写太细变成伪代码、Plan 写太泛等于没 Plan

**与前篇关联**：好的 Plan 离不开好的项目理解——这正是 01 篇 CLAUDE.md 和 02 篇记忆系统提供的。

---

### 04 Hooks：把重复操作自动化

**核心问题**：每天和 Claude Code 交互几十次，有多少次是在做重复的事情？编辑后手动跑 lint、提交前手动跑测试、每次新会话手动说明背景……

**学习目标**：

- 理解 Hooks 的 12 个生命周期触发点
- 掌握最实用的 Hook 配置模式
- 知道什么该自动化，什么不该

**主线场景**：统计一天中与 Claude Code 的重复操作，逐一用 Hook 自动化。

**内容要点**：

- Hooks 的 12 个触发点概览——不是每个都常用，聚焦最实用的 5 个
- 最实用的 Hook 配置：
  1. `PostEdit` → 自动格式化（Prettier/ESLint）
  2. `PreCommit` → 类型检查 + lint
  3. `Stop` → 桌面通知（任务完成了）
  4. `SessionStart` → 自动 git pull
  5. `PostToolUse` → 自动记录修改文件列表
- Hook 的编写方式：Shell 脚本 vs 内联命令
- Hook 的边界——复杂逻辑该用 Skill 而不是 Hook
- 调试 Hook——当 Hook 出问题时怎么排查

**与前篇关联**：Plan 模式（03 篇）解决了"想清楚再干"的问题，Hooks 解决的是"干了之后自动检查"的问题。

---

### 05 Skills 生态：从社区 Skill 到自制插件

**核心问题**：Claude Code 原生能做很多事，但总有缺的时候——比如自动拉取最新文档、用 TDD 流程开发、生成特定格式的 commit message。每次手写 prompt 很累，而且不稳定。Skills 就是把这些常用操作打包成可复用的"插件"。

**学习目标**：

- 理解 Skill 的本质——预制的 prompt + 工具组合
- 掌握社区热门 Skills 的选型和安装
- 学会自己创建和发布 Skill
- 理解 Skill 和 Hook 的边界

**主线场景**：从一个空白的 Claude Code 环境开始，逐步装上社区 Skill，体验能力提升的过程。然后发现没有完全符合需求的 Skill，自己动手造一个。

**内容要点**：

- Skill 的结构：frontmatter + 指令文件
- Skill vs Hook：Hook 是自动触发的，Skill 是按需调用的
- **社区热门 Skills 实测推荐**：
  - 🔥 **Superpowers**（社区最火）——完整的开发工作流：设计 → Plan → TDD 实现，省去大量 prompt
  - 📚 **Context7** —— 实时拉取最新文档和代码示例，解决 Claude 训练数据过时的问题
  - 📋 **Task Master** —— 任务管理自动化，从 PRD 到任务拆分到逐步实现
  - 🔍 **Deep Research** —— 多步自动研究，适合做技术调研和竞品分析
  - 🛡️ **Code Review** —— 自动 PR 审查，找 bug、安全漏洞、性能问题
  - 其他实用 Skills 速览：文档生成、测试覆盖、部署辅助等
- **一站式工具包：everything-claude-code（ECC）**：
  - 什么是 ECC：Anthropic 黑客松获奖者的配置集合，136+ Skills/Agents/Hooks/MCPs 打包
  - 核心模块：代码审查、安全扫描、测试覆盖、构建错误修复、Sprint 追踪、自动修复、行为验证
  - 适合谁：不想一个个挑 Skill、想快速拥有一套完整配置的开发者
  - 不适合谁：已经有一套自己定制配置、只想要轻量扩展的开发者
  - 安装方式：GitHub Releases 下载，支持 Windows/macOS/Linux
  - 中文版：everything-claude-code-zh（xu-xiang）
- **Skill 的发现与安装**：
  - claudeskills.info：658+ 社区 Skill 目录，按类别浏览和评分
  - awesome-claude-skills（GitHub）：1000+ Skill 精选列表
  - `npx skills add <name>`：一键安装标准
  - 怎么判断一个 Skill 值不值得装？（看更新频率、star 数、实际测试）
- 实战：从零创建一个 Skill——以博客写作为例
  - 分析需求：这个 Skill 要做什么？
  - 编写 Skill 文件：指令、约束、格式要求
  - 测试和迭代：怎么验证 Skill 的效果
  - 优化：让 Skill 更可靠
- Skill 的进阶用法：参数化、组合使用
- 装多少 Skill 合适？——8-12 个精选 Skill 覆盖大部分场景，装太多反而增加上下文噪音

**与前篇关联**：Hook（04 篇）是"被动"自动化，Skill 是"主动"能力扩展。两者配合使用。

---

### 06 MCP 生态：热门服务器与实战配置

**核心问题**：Claude Code 默认只能操作本地文件和终端。如果你需要它查询数据库、调用 API、读取 Figma 设计稿呢？

**学习目标**：

- 理解 MCP 的架构——Claude Code 通过 MCP 服务器连接外部服务
- 掌握热门 MCP 服务器的选型和配置
- 了解如何搭建自己的 MCP 服务器

**主线场景**：从一个"离线"的 Claude Code 开始，逐步接上 GitHub、数据库、浏览器、设计工具，体验 Claude 从"本地助手"变成"全能助手"的过程。

**内容要点**：

- MCP 的核心概念：服务器、工具、资源、传输方式
- 与 ai-fullstack 系列第 4 篇的区别：那里讲的是开发 MCP 服务，这里讲的是使用 MCP 服务
- **热门 MCP 服务器实战测评**：
  - 🔧 **GitHub MCP Server**（最装）—— Issues、PR、代码搜索、仓库管理，51 个工具覆盖完整 GitHub 工作流
  - 🗄️ **Supabase / PostgreSQL MCP** —— 让 Claude 直接查数据库，不用你手动导出 SQL 结果再粘贴
  - 🌐 **Playwright MCP** —— 浏览器自动化，测试页面、截图、执行交互操作
  - 🎨 **Figma MCP** —— 读取设计稿，前端开发再也不用设计师手动标注
  - 🚨 **Sentry MCP** —— 直接查线上错误，Claude 帮你分析堆栈并定位问题
  - 💬 **Slack MCP** —— 读取频道消息，让 Claude 了解团队讨论上下文
  - 其他值得关注：Linear（项目管理）、Notion（知识库）、AWS（云服务）、Apidog（API 管理）
- **MCP 服务器的发现与选型**：
  - mcpmarket.com 排行榜：按 star 数、安装量排序
  - modelcontextprotocol/servers 官方仓库：参考实现
  - 选型标准：活跃度、安全性、功能覆盖度
- MCP 配置文件详解：`settings.json` 中的 `mcpServers` 字段
- 安全注意事项：不要把敏感信息写死在配置里、OAuth vs API Key 的选择
- 自己搭建 MCP 服务器的简要指南（点到为止，深入内容参考 ai-fullstack 系列）
- 踩坑经验：超时处理、重连策略、多 MCP 服务器冲突

**与前篇关联**：MCP 是最强大的扩展机制——前几篇讲的 Skills 和 Hooks 处理本地自动化，MCP 则打开通往外部世界的大门。

---

### 07 Workflow 与多 Agent 编排

**核心问题**：单个 Claude Code 会话能处理的事情有限。如果需要同时审查 10 个文件、并行测试多个方案、或者循环搜索直到找到所有问题呢？

**学习目标**：

- 理解多 Agent 编排的价值和适用场景
- 掌握 Workflow 的三种核心模式
- 学会用 Workflow 编排复杂的开发任务

**主线场景**：一次真实的代码审查——让多个 Agent 并行审查不同维度（安全性、性能、可维护性），然后汇总结果。

**内容要点**：

- 从单 Agent 到多 Agent：什么时候需要编排？
  - 需要：大批量任务、多维度审查、不确定搜索范围
  - 不需要：单文件修改、简单 bug 修复、明确的小任务
- Workflow 的三种核心模式：
  1. `pipeline`——流水线，每个 item 依次通过多个阶段
  2. `parallel`——并行屏障，所有任务同时执行然后汇总
  3. `loop-until-dry`——循环搜索，直到连续 N 轮没有新发现
- 实战：用 Workflow 做一次多维度代码审查
  - 设计审查维度：bug、性能、安全、可维护性
  - 编排 Agent 并行审查
  - 对审查结果做对抗验证（adversarial verify）
  - 汇总最终结果
- 成本控制：多 Agent 的 token 消耗是单 Agent 的 N 倍，怎么控制

**与前篇关联**：这一篇是系列的高潮——把前面学到的所有能力（CLAUDE.md、记忆、Plan、Skills、MCP）组合起来，用 Workflow 编排成复杂的工作流。

---

### 08 高效工作流：三个月实战总结

**核心问题**：零零散散的功能学了不少，但怎么把它们串成一个完整的工作流？每天用 Claude Code 开发，到底什么流程最高效？

**学习目标**：

- 建立自己的 Claude Code 日常工作流
- 了解社区周边工具，打造完整的开发环境
- 避免最常见的坑
- 理解 Claude Code 的能力边界

**主线场景**：还原一个真实的开发日——从早上打开 Claude Code 到晚上收工，完整的工作流。

**内容要点**：

- 一天的 Claude Code 工作流：
  - 早上：新会话 → CLAUDE.md + 记忆自动加载 → git pull → 看昨天进度
  - 开发：Plan 模式设计 → 实现代码 → Hook 自动检查 → 测试
  - 下午：代码审查（用 Workflow）→ 修复问题 → 提交
  - 收工：总结今天改了什么 → 更新记忆 → push
- **社区周边工具推荐**：
  - 🖥️ **Claude HUD** —— 实时状态栏，显示上下文用量、活跃工具、Agent 进度，再也不用盲等
  - 📦 **everything-claude-code（ECC）** —— 一站式配置工具包，136+ Skills/Agents/Hooks/MCPs，适合想快速拥有完整配置的开发者
  - 📖 **awesome-claude-skills / claudeskills.info** —— Skill 发现目录，找插件先来这里
  - 🔌 **MCP Market（mcpmarket.com）** —— MCP 服务器排行榜，按热度选型
  - ⚡ **npx skills add** —— 一键安装 Skill 的社区标准工具
  - 🤖 **Ruflo** —— 多 Agent 群体协调工具，适合复杂任务的自动化编排
  - 其他：Worktree 管理、自动化部署、CI 集成等工具简介
- 最常见的 10 个坑：
  1. CLAUDE.md 写太长
  2. 上下文溢出导致 Claude "失忆"
  3. 不该用 Plan 模式的时候用了
  4. Hook 配置错误导致无限循环
  5. MCP 服务器超时没处理
  6. Workflow 的 token 消耗失控
  7. 在错误的项目层级写记忆
  8. 让 Claude 做它不擅长的事（复杂算术、精确计数）
  9. 不看 Claude 的输出直接信任
  10. 忽略 `.claude/settings.json` 的权限配置
- 不同场景的最佳实践速查表：
  - 新项目启动：CLAUDE.md + 全局配置 + 初始记忆
  - 日常开发：Plan → 实现 → Hook 检查 → 测试
  - Bug 修复：直接对话，给足错误上下文
  - 代码审查：Workflow 编排多 Agent
  - 大规模重构：Plan + Worktree + 多会话
- 成本控制实操：
  - 用 `/compact` 压缩上下文
  - 用 Haiku 模型处理简单任务
  - Workflow 中合理分配模型等级
  - 什么时候该用 Opus，什么时候 Sonnet 就够
- Claude Code 的能力边界：
  - 擅长：代码生成与重构、文件操作、搜索与分析、流程编排
  - 不擅长：精确数值计算、大型项目全局理解、需要 GUI 的操作、实时协作
  - 和 Cursor/Copilot 的对比：各有所长，不是替代关系

**与前篇关联**：系列收尾——把 01-07 篇的所有知识整合成一个完整的实战工作流。每提到一个功能都自然回顾前面讲过的内容。

## 系列节奏规划

```
第一阶段·打好地基（01-02）
  → 这两篇决定后续所有内容的上限
  → 节奏：建立基础认知，不急于动手

第二阶段·深度工作（03-05）
  → 三个核心高级功能，每篇解决一个具体问题
  → 节奏：逐步深入，每篇都有大量实战

第三阶段·连接与协作（06-07）
  → 从单机到联网，从单 Agent 到多 Agent
  → 节奏：视野打开，看到更大的可能性

第四阶段·实战收尾（08）
  → 整合所有知识，形成完整工作流
  → 节奏：总结回顾，回归日常实践
```

## 主线案例演进

整个系列有一条隐含的主线：**一个开发者优化自己 Claude Code 工作流的过程**。

- 01 篇：先把自己的项目配置好（CLAUDE.md）
- 02 篇：建立记忆体系，不再每次从零开始
- 03 篇：学会用 Plan 模式，不再"开盲盒"
- 04 篇：配置 Hooks，让重复操作消失
- 05 篇：装上社区 Skill，并学会自制插件
- 06 篇：接上热门 MCP 服务器，让 Claude 连上外部服务
- 07 篇：编排 Workflow，多 Agent 协作
- 08 篇：把所有能力串成完整工作流，附上社区周边工具推荐

读者跟着这个主线走，就像在一步步搭建自己的 Claude Code 工作站。
