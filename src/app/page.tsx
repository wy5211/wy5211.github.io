import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-12 text-center">My Blog</h1>

        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="p-6 border rounded-lg hover:shadow-lg transition-shadow dark:border-neutral-700 bg-white/50 dark:bg-neutral-800/30"
            >
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title}
                </h2>
              </Link>
              <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <time>{post.date}</time>
                <span>{post.category}</span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-neutral-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{post.summary}</p>
            </article>
          ))}

          {posts.length === 0 && (
            <p className="text-center text-gray-500">
              No posts found. Add some markdown files to content/posts!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
