import Link from "next/link";
import { TechStack } from "@/lib/tech-stacks";

interface TechStackCardProps {
  stack: TechStack & { postCount: number };
}

export default function TechStackCard({ stack }: TechStackCardProps) {
  return (
    <Link
      href={`/stacks/${stack.slug}`}
      className="group block glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
    >
      {/* 图标和标题 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`text-4xl bg-gradient-to-br ${stack.color} bg-clip-text text-transparent`}
          >
            {stack.icon}
          </div>
          <h3 className="text-2xl font-bold group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
            {stack.name}
          </h3>
        </div>
      </div>

      {/* 描述 */}
      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
        {stack.description}
      </p>

      {/* 统计信息 */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span>{stack.postCount} 篇文章</span>
        </div>
        <div className="flex items-center gap-1">
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>{stack.learningPath.length} 个学习步骤</span>
        </div>
      </div>

      {/* 学习路径预览 */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          学习路径：
        </div>
        <div className="flex flex-wrap gap-2">
          {stack.learningPath.slice(0, 3).map((step) => (
            <span
              key={step.order}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300"
            >
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center text-[10px] mr-1.5">
                {step.order}
              </span>
              {step.title}
            </span>
          ))}
          {stack.learningPath.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400">
              +{stack.learningPath.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* 悬停指示器 */}
      <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>查看详情</span>
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
  );
}
