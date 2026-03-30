const categoryColors: Record<string, string> = {
  前端: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  后端: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  nestjs: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  全栈: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  测试: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  运维: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  大模型: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  数据库: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

const fallbackColor =
  "bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-gray-400";

export function getCategoryColor(category: string): string {
  return categoryColors[category] || fallbackColor;
}
