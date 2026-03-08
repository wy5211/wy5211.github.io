import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="z-10 max-w-3xl w-full">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex justify-center gap-4 text-gray-500">
            <time>{post.date}</time>
            <span>{post.category}</span>
          </div>
        </header>

        <article className="prose dark:prose-invert max-w-none">
          {post.content}
        </article>
      </div>
    </main>
  );
}
