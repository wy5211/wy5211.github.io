export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* 头部骨架屏 */}
      <div className="mb-12">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3 mb-6 animate-pulse" />
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>

      {/* 学习路径骨架屏 */}
      <div className="mb-12">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4 mb-6 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* 相关技术栈骨架屏 */}
      <div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4 mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
