import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          加载中...
        </div>
      }
    >
      {/* 技术栈专题入口 */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <Link
          href="/stacks"
          className="group block glass rounded-2xl p-8 hover:scale-[1.01] transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 animate-fade-in-up"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                🚀
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  技术栈专题
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  探索完整的技术栈学习路径，系统化掌握技术知识体系
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform">
              <span className="font-medium">开始学习</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      <PostList posts={allPosts} />
    </Suspense>
  );
}
