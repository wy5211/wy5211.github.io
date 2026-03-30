import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";
import { Suspense } from "react";

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          加载中...
        </div>
      }
    >
      <PostList posts={allPosts} />
    </Suspense>
  );
}
