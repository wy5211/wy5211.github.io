import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import EncryptedArticle from "@/components/EncryptedArticle";

export async function generateStaticParams() {
  const posts = getAllPosts();
  const params = posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));

  return params;
}

// 不返回真实标题/摘要 —— 避免泄露到 <head>（陌生人 view-source 可见）。
// 解锁后页面内的真实标题由 EncryptedArticle 解密渲染。
export const generateMetadata = () => ({
  title: "王阳的博客",
  description: "私密博客，需访问密码",
});

export default async function Post({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  // 整篇文章（标题/摘要/正文/下一篇）已加密成一个密文块
  const encrypted = await getPostBySlug(category, slug);

  if (!encrypted) {
    notFound();
  }

  // key 强制切换文章时重新挂载，避免上一篇解密内容在异步解密完成前短暂残留
  return <EncryptedArticle key={`${category}/${slug}`} encrypted={encrypted} />;
}
