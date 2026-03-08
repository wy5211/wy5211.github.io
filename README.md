# 个人博客项目说明

这是一个基于 Next.js 16 + TypeScript + Tailwind CSS 的静态博客项目，内容来源于本地 Markdown/MDX 文件，适合部署到 GitHub Pages。

## 项目目录结构

```txt
blog/
├─ content/
│  └─ posts/
│     └─ hello-world.mdx
├─ docs/
│  └─ 开发文档.md
├─ src/
│  ├─ app/
│  │  ├─ posts/
│  │  │  └─ [slug]/
│  │  │     └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  └─ lib/
│     └─ posts.ts
├─ next-env.d.ts
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ tailwind.config.ts
└─ tsconfig.json
```

## 目录与文件职责

- `content/posts/`
  - 存放博客文章源文件（`.mdx`）。
  - 每篇文章通过 Frontmatter 管理标题、日期、标签、摘要等元数据。

- `docs/开发文档.md`
  - 渐进式开发文档，记录项目目标、技术路线与阶段计划。

- `src/app/page.tsx`
  - 首页，负责读取文章列表并展示卡片。

- `src/app/posts/[slug]/page.tsx`
  - 文章详情页，基于动态路由按 slug 渲染对应文章。

- `src/app/layout.tsx`
  - 全局布局文件，定义站点级元数据与基础页面骨架。

- `src/app/globals.css`
  - 全局样式入口，包含 Tailwind 指令与基础样式变量。

- `src/lib/posts.ts`
  - 内容读取与解析逻辑：
  - 读取 `content/posts` 下的文章文件。
  - 解析 Frontmatter。
  - 提供文章列表与详情数据给页面使用。

- `next.config.js`
  - Next.js 配置，已设置静态导出（`output: 'export'`），适配 GitHub Pages。

- `tailwind.config.ts` + `postcss.config.js`
  - Tailwind 与 PostCSS 配置文件，负责样式构建流程。

- `package.json`
  - 项目依赖与脚本入口（`dev`、`build`、`start`、`lint`）。

- `tsconfig.json`
  - TypeScript 编译配置与路径别名（`@/* -> src/*`）。

## 运行与构建

安装依赖：

```bash
npm install
```

本地开发：

```bash
npm run dev
```

生产构建：

```bash
npm run build
```

## 当前已实现能力

- 基于 MDX 的文章管理（文件即内容）。
- 首页文章列表展示。
- 文章详情页渲染。
- 静态导出构建（SSG）。
