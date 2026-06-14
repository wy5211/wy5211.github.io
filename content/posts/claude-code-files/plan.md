# Claude Code 目录文件说明系列 计划

## 背景

### 为什么写这个主题

用了很久 Claude Code，但你大概率从没认真打开过 `~/.claude/` 这个目录。里面密密麻麻一堆文件和文件夹——`settings.json`、`CLAUDE.md`、`commands/`、`agents/`、`skills/`、`hooks/`——每个名字都见过，却说不清它们各自干嘛、什么时候被读取、彼此怎么协作。

这个系列的目的是**做一次"目录考古"**：以文件系统为线索，把 Claude Code 的目录结构、高频配置文件的作用、加载与合并机制、扩展体系（commands / skills / agents）、MCP、hooks，一次性讲透。

### 选材原则：只讲高频，砍掉冷门

本系列**只覆盖日常高频使用的功能**，刻意忽略冷门小众机制：

- ✅ **重点细讲**（天天用）：CLAUDE.md、settings 权限、commands、skills、agents、MCP、hooks
- ⚡ **必懂原理**：配置加载与合并机制
- ❌ **忽略不写**：worktrees 深入机制、session 转录持久化细节、statsig、shell-snapshots、keybindings、statusline、plugins 内部结构、企业策略文件

理由：worktrees / 转录 / statsig 这些是内部实现，普通用户几乎不碰；而 CLAUDE.md / 权限 / hooks / skills / agents / MCP 是每次会话都在跑的核心，必须讲细。

### 与现有 `claude-code-tips` 系列的区别

现有系列是**功能导向**（"CLAUDE.md 怎么写""hooks 怎么用"）。

本系列是**文件 + 原理导向**（"`.claude/` 里有什么""配置何时加载、如何合并""每个高频功能对应的文件结构是什么"）。两者互补，不重复。

### 文章类型

类型 A（技术类），读者是有一定 Claude Code 使用经验、想搞懂底层机制的人。

---

## 博客目录结构

```
content/posts/claude-code-files/
├── plan.md
├── 01-directory-overview.mdx            # 两个家：全局与项目目录全景
├── 02-config-loading.mdx                # 配置加载机制：合并、覆盖、优先级
├── 03-claude-md-memory.mdx              # CLAUDE.md：分层记忆系统
├── 04-settings-permissions.mdx          # settings.json：权限系统原理
├── 05-slash-commands.mdx                # commands：斜杠命令的文件结构
├── 06-skills-system.mdx                 # skills：技能体系与自动激活
├── 07-subagents.mdx                     # agents：子代理的隔离与编排
├── 08-mcp-external-world.mdx            # MCP：连接外部世界的配置
├── 09-hooks-event-loop.mdx              # hooks：事件循环与会话生命周期
└── 10-context-session.mdx               # 上下文管理与会话（收尾）
```

---

## 阶段划分

### 阶段一：建立地图（入门篇，2 篇）

先给读者一张完整的目录地图，建立"两个家"和"加载机制"的直觉。这是理解后续所有篇章的基础。

### 阶段二：核心配置（核心篇，2 篇）

深入两个最高频的配置——`CLAUDE.md`（记忆，软规则）和 `settings.json`（权限，硬规则）。

### 阶段三：扩展三件套（进阶篇，3 篇）

commands / skills / agents 各自单独成篇细讲。这是用户扩展 Claude Code 能力的三种主要方式，都是高频功能。

### 阶段四：连接与自动化（实践篇，2 篇）

MCP（连接外部世界）和 hooks（事件自动化），两个高频且必须细讲的主题。

### 阶段五：收尾（1 篇）

上下文管理与会话，把整个文件系统串成一个活的系统。

---

## 每篇文章大纲

### 第 1 篇：两个家——全局与项目目录全景

- **学习目标**：建立 Claude Code 文件系统的整体地图，理解"全局"和"项目"两层的职责分工
- **核心问题**：为什么 Claude Code 要分两个目录？它们各自装什么？
- **主线场景**：你第一次 `ls ~/.claude/`，被一堆文件夹吓到，决定逐个搞清楚
- **内容要点**：
  - `~/.claude/` 全局目录逐项介绍，**按频率分档**：
    - 🔥 高频：settings.json、CLAUDE.md、commands/、agents/、skills/
    - ⚡ 中频：projects/（会话历史）、memory/
    - ❄ 冷门（一笔带过）：shell-snapshots/、statsig/、plugins/、keybindings.json
  - `<project>/.claude/` 项目目录逐项介绍：
    - settings.json（团队共享）、settings.local.json（本地不入库）
    - CLAUDE.md、commands/、agents/、skills/、hooks/
  - 两层目录的职责对比表：哪些跨项目共享、哪些项目专属、哪些绝不能提交（.gitignore）
- **与系列衔接**：抛出问题"这些文件谁先加载？谁覆盖谁？"——引出第 2 篇

### 第 2 篇：配置加载机制——合并、覆盖、优先级

- **学习目标**：搞清楚改一个配置到底生效在哪一层，理解加载与合并规则
- **核心问题**：全局和项目都有 `settings.json` 和 `CLAUDE.md`，到底谁说了算？
- **主线场景**：你在项目里加了权限配置却没生效，排查发现是被全局配置覆盖了
- **内容要点**：
  - 配置加载的层级：全局 → 项目 → 项目本地（settings.local.json）
  - 合并语义：数组是追加还是替换？对象是深合并还是浅合并？（以 permissions.allow 为例实测）
  - settings.json 三层优先级实战：同一规则写在不同层的效果差异
  - 实操排查：如何确认当前生效的配置
  - 踩坑：本地配置覆盖团队配置导致协作事故；把团队配置误写进 local 文件
- **与系列衔接**：加载机制搞懂了，下一篇进入最高频的 CLAUDE.md

### 第 3 篇：CLAUDE.md——分层记忆系统

- **学习目标**：理解多层级 CLAUDE.md 的加载、合并、写法，知道指令该写在哪一层、怎么写才有效
- **核心问题**：为什么 CLAUDE.md 里写了规则，Claude 有时遵守有时不遵守？
- **主线场景**：你给项目写了规范（"用函数组件""TypeScript 严格模式"），但 Claude 偶尔还是写出不符合规范的代码
- **内容要点**：
  - CLAUDE.md 的多个层级：用户级（`~/.claude/CLAUDE.md`）、项目级（`./CLAUDE.md`）、子目录级（`./src/CLAUDE.md`）
  - 加载时机：会话启动时读哪些、如何注入上下文、token 占用
  - `@import` 语法：引用其他文件和目录，拆分大型 CLAUDE.md
  - 写法原则：指令要具体可执行、避免矛盾、控制长度防上下文稀释
  - 记忆 vs 设置的本质区别：CLAUDE.md 是"提示词层"（建议），settings 是"规则层"（强制）
  - 高频写法模板：项目约定、代码风格、常用命令、避坑清单
  - 踩坑：写太长导致核心指令被稀释、指令互相矛盾、放错层级
- **与系列衔接**：CLAUDE.md 是"软规则"，下一篇讲"硬规则"——settings 权限

### 第 4 篇：settings.json——权限系统原理

- **学习目标**：理解 permissions 的 allow / deny / ask 三态机制，能设计合理的权限策略
- **核心问题**：为什么同样是跑命令，有的直接执行、有的要确认、有的被拒？
- **主线场景**：团队里新人用 Claude Code 误删了文件 / 跑了危险命令，你想用权限系统防住
- **内容要点**：
  - 权限三态：allow（自动放行）/ deny（直接拒绝）/ ask（每次确认）的语义与触发流程
  - 权限规则语法详解：
    - `Bash(npm run test:*)` —— 命令前缀匹配
    - `Read(./secrets/*)` —— 路径通配
    - `Edit(src/**)` —— glob 匹配
  - 规则匹配优先级：deny > ask > allow，更具体的规则优先
  - 工具粒度：哪些工具有权限配置（Bash/Read/Write/Edit/WebFetch...），为什么有的不能配
  - settings.json vs settings.local.json 实战：哪些权限放团队共享、哪些放本地
  - 原理：一条工具调用如何经过权限检查这道闸门（匹配 → 决策 → 执行/阻断/询问）
  - 推荐的权限配置策略（只读项目、受限沙箱、全开模式各自的适用场景）
- **与系列衔接**：权限讲完，下一篇看扩展能力——从 commands 开始

### 第 5 篇：commands——斜杠命令的文件结构

- **学习目标**：掌握自定义斜杠命令的文件结构、frontmatter、参数传递
- **核心问题**：每次都要重复输入一长串指令，能不能封装成一个 `/xxx` 命令？
- **主线场景**：你每天都要做"审查当前 diff + 跑测试 + 提交"，想封装成 `/ship` 一键完成
- **内容要点**：
  - 命令文件结构：`commands/xxx.md`，文件名即命令名
  - frontmatter 字段：description、argument-hint、allowed-tools 等
  - 命令模板：支持 `$ARGUMENTS`、`!命令`（shell 注入）、`@文件`（文件注入）
  - 全局命令（`~/.claude/commands/`）vs 项目命令（`./.claude/commands/`）
  - 命令 vs CLAUDE.md：命令是"主动触发的模板"，CLAUDE.md 是"被动加载的上下文"
  - 实战：写 3 个高频命令（代码审查、提交规范化、环境检查）
- **与系列衔接**：命令是"一次触发"，下一篇看"按需自动激活"的 skills

### 第 6 篇：skills——技能体系与自动激活

- **学习目标**：理解 skills 的文件结构、自动激活机制、渐进式披露原理
- **核心问题**：skill 和 command 有什么区别？为什么 skill 能"自动判断要不要用"？
- **主线场景**：你想让 Claude 在遇到 React 项目时自动用上正确的组件写法，不用每次提醒
- **内容要点**：
  - skill 文件结构：`SKILL.md` + 资源文件（脚本、模板、参考文档）
  - SKILL.md frontmatter：name、description（决定激活的关键字段）
  - 核心机制：**渐进式披露**（progressive disclosure）——
    - 第一层：description 进入上下文（始终在）
    - 第二层：匹配触发时，加载 SKILL.md 正文
    - 第三层：按需读取 skill 内的资源文件
  - description 怎么写才能被正确激活（触发词、场景描述）
  - 全局 skill（`~/.claude/skills/`）vs 项目 skill（`./.claude/skills/`）
  - skill vs command vs agent 对比：自动激活 / 主动触发 / 独立上下文
  - 实战：写一个项目专属 skill（如"本项目的部署流程"）
- **与系列衔接**：skill 是"共享主上下文的能力"，下一篇看"独立上下文"的 agents

### 第 7 篇：agents——子代理的隔离与编排

- **学习目标**：理解子代理的上下文隔离、工具隔离、自定义 agent 的设计
- **核心问题**：子代理和主对话有什么区别？为什么要把任务交给子代理？
- **主线场景**：你让 Claude 审查一个超大代码库，主对话上下文爆了，改用子代理分块审查
- **内容要点**：
  - agent 文件结构：`agents/xxx.md`，frontmatter（name、description、tools、model）
  - 上下文隔离原理：子代理有独立上下文窗口，**只把结论返回主对话**（不污染主上下文）
  - 工具隔离：通过 `tools` 字段白名单限制子代理可用工具（最小权限原则）
  - 自定义 agent 的系统提示词设计：明确角色、边界、输出格式
  - 内置 agent 类型 vs 自定义 agent
  - 何时用子代理（大任务分块、专业分工、保护主上下文）vs 何时不用（简单任务的开销不值）
  - 编排模式：并行 fan-out、串行 pipeline、主从回顾
  - 实战：定义一个"代码审查专家"agent，限制它只读不写
- **与系列衔接**：agents 是"Claude 内部的能力扩展"，下一篇看"连接外部"的 MCP

### 第 8 篇：MCP——连接外部世界的配置

- **学习目标**：理解 MCP 的配置结构、作用域、服务器管理
- **核心问题**：怎么让 Claude Code 能查数据库、调内部 API、读 Notion？
- **主线场景**：你想让 Claude 能直接查公司的 PostgreSQL、读 Linear 上的需求
- **内容要点**：
  - MCP 是什么：Model Context Protocol，让 Claude 连接外部工具/数据源的协议
  - 配置文件：项目级 `.mcp.json` vs 用户级（`~/.claude.json` 或 claude mcp add）
  - 三个作用域：local（仅当前项目，私有）/ project（团队共享，进 git）/ user（全局）
  - `.mcp.json` 结构详解：command、args、env
  - 常见 MCP 服务器：filesystem、postgres、github、puppeteer 等
  - MCP 工具如何进入 Claude 的工具列表（自动发现 vs 手动启用）
  - 安全考量：MCP 服务器有完整能力，配置前要审查（命令注入、env 泄露）
  - 实战：配置一个 MCP 服务器并验证可用
- **与系列衔接**：MCP 是"被动提供能力"，下一篇看"主动拦截事件"的 hooks

### 第 9 篇：hooks——事件循环与会话生命周期

- **学习目标**：理解 hooks 的生命周期、执行流程、JSON 协议、配置方式
- **核心问题**：hooks 到底在什么时候触发？它怎么拦截或修改工具调用？
- **主线场景**：你想在每次写文件后自动跑 prettier、每次提交前自动跑 lint
- **内容要点**：
  - 会话生命周期事件全览：
    - `SessionStart`（会话开始）
    - `UserPromptSubmit`（用户提交输入）
    - `PreToolUse`（工具执行前，可拦截）
    - `PostToolUse`（工具执行后）
    - `Stop` / `SubagentStop`（响应结束）
    - `SessionEnd`（会话结束）
  - 触发流程：事件 → 匹配 hook（按 event + matcher）→ 执行脚本 → 解析输出
  - hook 输出如何影响行为：exit code 决定放行/阻断、JSON 输出决定反馈内容
  - hook 的 JSON 输入协议（stdin 收到什么字段）
  - settings.json 中 hooks 的配置结构（event → matcher → hooks → command）
  - 全局 hooks vs 项目 hooks
  - 高频实战：PostToolUse 自动格式化、PreToolUse 拦截危险命令、Stop 自动跑测试
  - 踩坑：脚本超时、输出到 stderr 而非 stdout、退出码用错导致静默失败
- **与系列衔接**：hooks 是"运行时事件"，最后一篇讲这些事件背后——上下文和会话本身

### 第 10 篇：上下文管理与会话（收尾）

- **学习目标**：理解上下文如何累积与压缩、会话如何恢复，把整个系列串起来
- **核心问题**：聊了几百轮后 Claude 开始"忘事"是怎么回事？怎么管理上下文？
- **主线场景**：你的会话越跑越长，Claude 开始忘记早期的约定，你想搞清楚发生了什么、怎么治
- **内容要点**：
  - 上下文窗口：CLAUDE.md + 技能 description + 对话历史 + 工具结果，都在抢同一个窗口
  - 上下文压缩（compaction）机制：何时触发、如何摘要、保留了什么、丢了什么（高频实用）
  - memory 文件系统：跨会话的持久记忆（`~/.claude/memory/`），手动 vs 自动写入
  - 会话恢复：`--resume` / `--continue` 如何找回之前的会话
  - 管理上下文的实用技巧：什么时候该开新会话、什么时候该 /clear、CLAUDE.md 该多精简
  - **系列收尾**：从第 1 篇的"目录地图"到现在的"活的系统"——
    把 10 篇串成一条数据流：启动加载配置 → CLAUDE.md/技能注入 → 工具调用经权限 → hooks 拦截 → 子代理隔离 → MCP 扩展 → 上下文压缩 → 会话持久化
- **结尾 trade-off**：日常使用中，什么时候信任自动压缩、什么时候主动开新会话、什么时候精简 CLAUDE.md

---

## 系列节奏规划

```
入门篇（第 1-2 篇）：目录地图 + 加载机制
  → 读完知道"有哪些文件""谁覆盖谁"

核心篇（第 3-4 篇）：CLAUDE.md 记忆 + settings 权限
  → 读完知道"软规则（记忆）"和"硬规则（权限）"怎么配、怎么生效

扩展三件套（第 5-7 篇）：commands + skills + agents
  → 读完知道"三种扩展各自的文件结构、触发方式、适用场景"

连接与自动化（第 8-9 篇）：MCP + hooks
  → 读完知道"怎么连外部世界""怎么让事件自动触发"

收尾篇（第 10 篇）：上下文与会话
  → 读完把整个文件系统串成一条数据流
```

整体递进路径：**地图 → 加载 → 记忆 → 权限 → 命令 → 技能 → 代理 → MCP → hooks → 上下文**。

高频功能（CLAUDE.md / 权限 / commands / skills / agents / MCP / hooks）**每个都单独成篇细讲**；冷门机制（worktrees 细节、session 转录、statsig 等）不写或一笔带过。

---

## 写作风格约定

- **主线场景**：贯穿全系列的"目录考古"——你打开 `~/.claude/` 目录，逐层揭秘每个文件
- **每篇开头**：用 2-3 句回顾上篇，自然承接（不机械复述）
- **代码/配置占比**：控制在 40% 以内，每段配置前有引导、后有解读
- **真实数据**：配置示例用真实路径（如 `~/.claude/settings.json`）、真实工具名（`Bash`、`Read`、`Edit`）、真实命令（`npm run test`）
- **每篇都含"实战"小节**：给一个可照做的具体例子，读者看完能立刻用
- **结尾**：trade-off 总结（适用 / 不适用场景、对比、实践建议），不复读章节标题
