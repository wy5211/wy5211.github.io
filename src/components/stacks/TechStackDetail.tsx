import Link from "next/link";
import { TechStack, LearningPathStep } from "@/lib/tech-stacks";
import { PostMeta } from "@/lib/posts";

interface TechStackDetailProps {
  stack: TechStack;
  posts: PostMeta[];
  postsByLearningPath: Array<{
    step: LearningPathStep;
    posts: PostMeta[];
  }>;
  relatedStacks: Array<TechStack & { postCount: number }>;
}

export default function TechStackDetail({
  stack,
  posts,
  postsByLearningPath,
  relatedStacks,
}: TechStackDetailProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* 返回按钮 */}
      <Link
        href="/stacks"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        返回技术栈列表
      </Link>

      {/* 技术栈头部 */}
      <div className="glass rounded-3xl p-8 mb-12 animate-fade-in-up">
        <div className="flex items-start gap-6">
          <div
            className={`text-7xl bg-gradient-to-br ${stack.color} bg-clip-text text-transparent`}
          >
            {stack.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{stack.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {stack.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                <svg
                  className="w-5 h-5"
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
                <span>{posts.length} 篇文章</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                <svg
                  className="w-5 h-5"
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
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                <span>{stack.categories.length} 个技术分类</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 学习路径 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <svg
            className="w-8 h-8 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          学习路径
        </h2>
        <div className="space-y-6">
          {postsByLearningPath.map(({ step, posts: stepPosts }, index) => (
            <div
              key={step.order}
              className="glass rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                {/* 步骤编号 */}
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${stack.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {step.order}
                </div>

                {/* 步骤内容 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {step.estimatedTime}
                    </div>
                  </div>

                  {/* 相关文章 */}
                  {stepPosts.length > 0 ? (
                    <div className="mt-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        相关文章 ({stepPosts.length})
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {stepPosts.map((post) => (
                          <Link
                            key={post.slug}
                            href={`/posts/${encodeURIComponent(post.category)}/${post.slug}`}
                            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                {post.title}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {post.date}
                              </div>
                            </div>
                            <svg
                              className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1"
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
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                      暂无相关文章
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 相关技术栈 */}
      {relatedStacks.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <svg
              className="w-8 h-8 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            相关技术栈
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedStacks.map((relatedStack, index) => (
              <Link
                key={relatedStack.id}
                href={`/stacks/${relatedStack.slug}`}
                className="group glass rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`text-4xl bg-gradient-to-br ${relatedStack.color} bg-clip-text text-transparent`}
                  >
                    {relatedStack.icon}
                  </div>
                  <h3 className="text-xl font-bold group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {relatedStack.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                  {relatedStack.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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
                    <span>{relatedStack.postCount} 篇</span>
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
                    <span>{relatedStack.learningPath.length} 步</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
