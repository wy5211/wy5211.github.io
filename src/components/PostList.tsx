"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PostMeta } from "@/lib/posts";
import { categoryToDirMap, dirToCategoryMap } from "@/lib/category-map";

interface PostListProps {
  posts: PostMeta[];
}

export default function PostList({ posts }: PostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const selectedCategory = categoryParam || "";

  // 将英文目录名转换为中文分类名（用于筛选）
  const normalizedCategory =
    dirToCategoryMap[selectedCategory] || selectedCategory;

  // 获取 URL 中使用的英文目录名
  const getUrlCategory = (category: string) => {
    return categoryToDirMap[category] || category;
  };

  // 更新 URL 参数的函数
  const updateCategory = (category: string) => {
    router.push(`/?category=${encodeURIComponent(category)}`);
  };

  const categories = useMemo(() => {
    // 获取所有分类（按预定义顺序）
    const categoryOrder = [
      "前端",
      "后端",
      "nestjs",
      "全栈",
      "测试",
      "运维",
      "大模型",
      "提效工具",
      "数据库",
    ];

    // 获取文章中实际存在的分类
    const postCategories = new Set(posts.map((post) => post.category));

    // 按预定义顺序过滤存在的分类
    const orderedCategories = categoryOrder.filter((cat) =>
      postCategories.has(cat)
    );

    // 添加其他未在预定义列表中的分类
    const otherCategories = [...postCategories].filter(
      (cat) => !categoryOrder.includes(cat)
    );

    return [...orderedCategories, ...otherCategories];
  }, [posts]);

  // 根据选中的分类过滤文章
  const filteredPosts = useMemo(() => {
    if (!normalizedCategory) {
      return posts;
    }
    return posts.filter((post) => post.category === normalizedCategory);
  }, [posts, normalizedCategory]);

  // 获取分类对应的颜色
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      前端: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      后端: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      nestjs: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
      全栈: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      测试: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      运维: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
      大模型:
        "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
      提效工具:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
      数据库:
        "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
    };
    return (
      colors[category] ||
      "bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-gray-400"
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      {/* 分类按钮栏 */}
      <div className="sticky top-16 z-40 mb-8 glass py-4 rounded-xl border border-gray-200 dark:border-neutral-700">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => updateCategory(getUrlCategory(category))}
              className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
                normalizedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md scale-105"
                  : "bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 hover:scale-102"
              }`}
            >
              {category}
            </button>
          ))}
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
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}
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
