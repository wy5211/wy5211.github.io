import { getAllPosts, getPostBySlug, getNextPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "./BackButton";
import { categoryToDirMap } from "@/lib/category-map";

// 从文件路径中提取目录名的辅助函数
function getCategoryDirFromPath(category: string): string {
  return categoryToDirMap[category] || category;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const params = posts.map((post) => ({
    category: getCategoryDirFromPath(post.category), // 使用目录名
    slug: post.slug,
  }));

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.summary,
  };
}

// 获取分类对应的颜色
function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    前端: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    后端: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    nestjs: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    全栈: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    测试: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    运维: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    大模型: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    数据库: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  };
  return (
    colors[category] ||
    "bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-gray-400"
  );
}

export default async function Post({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);
  const nextPost = getNextPost(category, slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* 返回首页按钮 */}
      <BackButton />

      {/* 文章头部 */}
      <header className="glass rounded-2xl p-8 mb-8 border border-gray-200 dark:border-neutral-700">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}
          >
            {post.category}
          </span>
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {post.date}
          </time>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          {post.title}
        </h1>

        {post.summary && (
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {post.summary}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
              标签:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 文章内容 */}
      <div className="glass rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-neutral-700">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content}
        </div>
      </div>

      {/* 文章底部 */}
      <footer className="mt-8 space-y-4">
        {/* 下一篇链接 */}
        {nextPost && (
          <Link
            href={`/posts/${getCategoryDirFromPath(nextPost.category)}/${nextPost.slug}`}
            className="glass block w-full rounded-xl p-6 border border-gray-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <svg
                    className="w-4 h-4"
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
                  <span>下一篇</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {nextPost.title}
                </h3>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
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
            </div>
          </Link>
        )}

        {/* 返回按钮 */}
        <div className="text-center">
          <BackButton variant="primary" />
        </div>
      </footer>
    </article>
  );
}
