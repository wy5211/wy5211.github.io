export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 左侧版权信息 */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} Wangyang. 用{" "}
              <span className="text-red-500">❤</span> 和 Next.js 构建
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
