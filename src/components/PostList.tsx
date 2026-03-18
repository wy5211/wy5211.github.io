"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PostMeta } from "@/lib/posts";

interface PostListProps {
  posts: PostMeta[];
}

export default function PostList({ posts }: PostListProps) {
  const [selectedCategory, setSelectedCategory] = useState("全部");

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = ["全部", ...new Set(posts.map((post) => post.category))];
    return cats;
  }, [posts]);

  // 根据选中的分类过滤文章
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "全部") {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="z-10 max-w-5xl w-full font-mono text-sm">
        {/* 吸顶分类按钮栏 */}
        <div className="sticky top-0 z-50 mb-8 bg-white dark:bg-neutral-900 py-4 border-b dark:border-neutral-800 shadow-sm">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/30"
            >
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title}
                </h2>
              </Link>
              <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <time>{post.date}</time>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                  {post.category}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-neutral-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{post.summary}</p>
            </article>
          ))}

          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 py-8">该分类暂无文章</p>
          )}
        </div>
      </div>
    </main>
  );
}
