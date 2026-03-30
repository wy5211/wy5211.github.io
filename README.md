# 个人博客项目说明

这是一个基于 Next.js 16 + TypeScript + Tailwind CSS 的静态博客项目，内容来源于本地 Markdown/MDX 文件，适合部署到 GitHub Pages。

## 项目目录结构

```txt
blog/
├─ content/
│  └─ posts/
│     └─ <category>/
│        └─ NN-slug.mdx
├─ docs/
│  └─ 开发文档.md
├─ src/
│  ├─ app/
│  │  ├─ posts/
│  │  │  └─ [category]/
│  │  │     └─ [slug]/
│  │  │        └─ page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ Header.tsx
│  │  │  └─ Footer.tsx
│  │  └─ PostList.tsx
│  └─ lib/
│     ├─ posts.ts
│     ├─ category-map.ts
│     └─ category-colors.ts
├─ next.config.js
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ tailwind.config.ts
└─ tsconfig.json
```

## 目录与文件职责

- `content/posts/`
  - 存放博客文章源文件（`.mdx`），按分类目录组织。
  - 每篇文章通过 Frontmatter 管理标题、日期、标签、摘要等元数据。

- `docs/开发文档.md`
  - 渐进式开发文档，记录项目目标、技术路线与阶段计划。

- `src/app/page.tsx`
  - 首页，负责读取文章列表并展示卡片。

- `src/app/posts/[category]/[slug]/page.tsx`
  - 文章详情页，基于动态路由按分类和 slug 渲染对应文章。

- `src/app/layout.tsx`
  - 全局布局文件，定义站点级元数据与基础页面骨架。

- `src/components/PostList.tsx`
  - 文章列表组件，支持分类筛选和搜索。

- `src/components/layout/Header.tsx` / `Footer.tsx`
  - 页头和页脚布局组件。

- `src/lib/posts.ts`
  - 内容读取与解析逻辑：读取 `content/posts` 下的文章文件，解析 Frontmatter。

- `src/lib/category-map.ts`
  - 分类名与目录名的双向映射。

- `src/lib/category-colors.ts`
  - 分类标签颜色映射。

- `next.config.js`
  - Next.js 配置，已设置静态导出（`output: 'export'`），适配 GitHub Pages。

## 运行与构建

安装依赖：

```bash
pnpm install
```

本地开发：

```bash
pnpm dev
```

生产构建：

```bash
pnpm build
```

## 当前已实现能力

- 基于 MDX 的文章管理（文件即内容）。
- 首页文章列表展示，支持分类筛选。
- 文章详情页渲染，支持下一篇导航。
- 静态导出构建（SSG）。
- 深色模式支持。
