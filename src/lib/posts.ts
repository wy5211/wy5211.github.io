import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { ReactElement } from "react";

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

// 仅用于获取元数据（列表页用）
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
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

// 获取单篇文章详情（包含编译后的内容）
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

  if (!fs.existsSync(fullPath)) {
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
    options: { parseFrontmatter: true },
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
