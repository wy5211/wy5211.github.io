import { notFound } from "next/navigation";
import {
  getTechStackBySlug,
  getAllTechStacks,
  getRelatedStacks,
} from "@/lib/tech-stacks";
import { getPostsByTechStack, getPostsByLearningPath } from "@/lib/posts";
import TechStackDetail from "@/components/stacks/TechStackDetail";

// 生成所有技术栈的静态路径
export async function generateStaticParams() {
  const techStacks = getAllTechStacks();
  return techStacks.map((stack) => ({
    slug: stack.slug,
  }));
}

// 生成页面的 metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stack = getTechStackBySlug(slug);

  if (!stack) {
    return {
      title: "技术栈未找到",
    };
  }

  return {
    title: `${stack.name} - 技术栈专题`,
    description: stack.description,
  };
}

export default async function TechStackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stack = getTechStackBySlug(slug);

  if (!stack) {
    notFound();
  }

  // 获取技术栈相关的文章
  const posts = getPostsByTechStack(slug);

  // 按学习路径分组获取文章
  const postsByLearningPath = getPostsByLearningPath(slug);

  // 获取相关技术栈
  const relatedStacks = getRelatedStacks(stack.id).map((relatedStack) => ({
    ...relatedStack,
    postCount: getPostsByTechStack(relatedStack.slug).length,
  }));

  return (
    <TechStackDetail
      stack={stack}
      posts={posts}
      postsByLearningPath={postsByLearningPath}
      relatedStacks={relatedStacks}
    />
  );
}
