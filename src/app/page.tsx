import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";

export default function Home() {
  const allPosts = getAllPosts();

  return <PostList posts={allPosts} />;
}
