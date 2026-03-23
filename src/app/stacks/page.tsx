import { getAllTechStacks } from "@/lib/tech-stacks";
import { getPostsByTechStack } from "@/lib/posts";
import TechStackGrid from "@/components/stacks/TechStackGrid";

export const metadata = {
  title: "技术栈专题 - 技术学习路径",
  description:
    "探索完整的技术栈学习路径，从编程语言基础到全栈开发，系统化学习技术知识体系",
};

export default function StacksPage() {
  const techStacks = getAllTechStacks();

  // 为每个技术栈计算文章数量
  const techStacksWithCounts = techStacks.map((stack) => ({
    ...stack,
    postCount: getPostsByTechStack(stack.slug).length,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* 页面头部 */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          技术栈专题
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          探索完整的技术栈学习路径，从编程语言基础到全栈开发，系统化学习技术知识体系
        </p>
      </div>

      {/* 技术栈网格 */}
      <TechStackGrid techStacks={techStacksWithCounts} />
    </div>
  );
}
