import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { ReactElement } from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  category: string;
  cover?: string;
  draft: boolean;
};

export type Post = PostMeta & {
  content: ReactElement;
};

// 递归读取目录下的所有 .mdx 文件
function getAllMdxFiles(dir: string, basePath: string = ""): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = basePath
      ? path.join(basePath, entry.name)
      : entry.name;

    if (entry.isDirectory()) {
      // 递归读取子目录
      files.push(...getAllMdxFiles(fullPath, relativePath));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(relativePath);
    }
  }

  return files;
}

// 仅用于获取元数据（列表页用）
export function getAllPosts(): PostMeta[] {
  const fileNames = getAllMdxFiles(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // 从完整路径中提取文件名，去掉序号前缀和 .mdx 扩展名，生成干净的 slug
    const baseName = path.basename(fileName, ".mdx"); // 获取文件名（不含扩展名）
    const slug = baseName.replace(/^\d+-/, ""); // 去掉序号前缀，如 "01-"

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
      tags: data.tags || [],
      category: data.category,
      cover: data.cover,
      draft: data.draft || false,
    };
  });

  // 过滤掉 draft 并按日期排序
  return allPostsData
    .filter((post) => !post.draft)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
}

// 按类别分组获取文章
export function getPostsByCategory(): Record<string, PostMeta[]> {
  const posts = getAllPosts();
  const grouped: Record<string, PostMeta[]> = {};

  posts.forEach((post) => {
    const category = post.category || "未分类";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(post);
  });

  // 创建有序的分组对象
  const orderedGrouped: Record<string, PostMeta[]> = {};

  // 定义分类顺序
  const categoryOrder = [
    "前端",
    "后端",
    "nestjs",
    "全栈",
    "测试",
    "运维",
    "大模型/AI",
    "提效工具",
  ];

  // 按指定顺序添加分类
  categoryOrder.forEach((category) => {
    if (grouped[category]) {
      orderedGrouped[category] = grouped[category];
    }
  });

  // 添加其他未在顺序列表中的分类
  Object.keys(grouped).forEach((category) => {
    if (!categoryOrder.includes(category)) {
      orderedGrouped[category] = grouped[category];
    }
  });

  return orderedGrouped;
}

// 在目录中查找匹配 slug 的文件
function findFileBySlug(dir: string, slug: string): string | null {
  if (!fs.existsSync(dir)) {
    return null;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 递归查找子目录
      const found = findFileBySlug(fullPath, slug);
      if (found) {
        return found;
      }
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      // 检查文件名是否匹配 slug（去掉序号前缀和扩展名后）
      const fileSlug = entry.name.replace(/\.mdx$/, "").replace(/^\d+-/, ""); // 去掉序号前缀

      if (fileSlug === slug) {
        return fullPath;
      }
    }
  }

  return null;
}

// 获取单篇文章详情（包含编译后的内容）
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = findFileBySlug(postsDirectory, realSlug);

  if (!fullPath) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { content, frontmatter } = await compileMDX<{
    title: string;
    date: string;
    summary: string;
    tags: string[];
    category: string;
    cover?: string;
    draft: boolean;
  }>({
    source: fileContents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeRaw],
      },
    },
  });

  return {
    slug: realSlug,
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary,
    tags: frontmatter.tags || [],
    category: frontmatter.category,
    cover: frontmatter.cover,
    draft: frontmatter.draft || false,
    content,
  };
}
