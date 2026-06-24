"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PostMeta } from "@/lib/posts";
import { getCategoryColor } from "@/lib/category-colors";

interface PostListProps {
  posts: PostMeta[];
}

export default function PostList({ posts }: PostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const selectedCategory = categoryParam || "";
  const [categoryExpanded, setCategoryExpanded] = useState(false);

  // 将 URL 参数中的分类名直接使用（目录名即分类名）
  const normalizedCategory = selectedCategory;

  // 目录名即分类名，直接使用
  const getUrlCategory = (category: string) => category;

  // 更新 URL 参数的函数
  const updateCategory = (category: string) => {
    router.push(`/?category=${encodeURIComponent(category)}`);
  };

  const categories = useMemo(() => {
    // 自动从文章中提取所有分类，按字母排序
    const postCategories = new Set(posts.map((post) => post.category));
    return [...postCategories].sort();
  }, [posts]);

  // 根据选中的分类过滤文章
  const filteredPosts = useMemo(() => {
    if (!normalizedCategory) {
      return posts;
    }
    return posts.filter((post) => post.category === normalizedCategory);
  }, [posts, normalizedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* 分类按钮栏 - 统一折叠版（桌面端+移动端） */}
      <div className="sticky top-16 z-40 mb-8 glass rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden transition-all duration-300">
        <button
          onClick={() => setCategoryExpanded(!categoryExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          <span>
            {normalizedCategory || "全部分类"}
            <span className="ml-2 text-gray-400 dark:text-gray-500 font-normal">
              · {categories.length} 个分类
            </span>
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              categoryExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out ${
            categoryExpanded ? "max-h-[60vh] py-3 px-4" : "max-h-0"
          } overflow-y-auto`}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  updateCategory(getUrlCategory(category));
                  setCategoryExpanded(false);
                }}
                className={`px-4 py-1.5 rounded-lg font-medium text-sm transition-all ${
                  normalizedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md scale-105"
                    : "bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 hover:scale-[1.02] active:bg-gray-200 dark:active:bg-neutral-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 文章数量统计 */}
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {selectedCategory || "全部"} · 共{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {filteredPosts.length}
          </span>{" "}
          篇文章
        </p>
      </div>

      {/* 文章列表 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <article
            key={`${post.category}-${post.slug}`}
            className="group glass rounded-xl p-6 border border-gray-200 dark:border-neutral-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Link href={`/posts/${getUrlCategory(post.category)}/${post.slug}`}>
              <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h2>
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor()}`}
              >
                {post.category}
              </span>
              <time className="px-2.5 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-neutral-800">
                {post.date}
              </time>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
              {post.summary}
            </p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 rounded text-xs hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="px-2 py-0.5 text-gray-400 dark:text-gray-500 rounded text-xs">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
              <Link
                href={`/posts/${getUrlCategory(post.category)}/${post.slug}`}
                className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group/link"
              >
                阅读更多
                <svg
                  className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 dark:text-gray-400">该分类暂无文章</p>
          </div>
        )}
      </div>
    </div>
  );
}
