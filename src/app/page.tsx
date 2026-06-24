import { Suspense } from "react";
import { getEncryptedPostsList } from "@/lib/posts";
import EncryptedPostList from "@/components/EncryptedPostList";

export default async function Home() {
  // 全站文章列表已加密为单个密文块，需密码在客户端解密后渲染
  const encryptedList = await getEncryptedPostsList();

  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          加载中...
        </div>
      }
    >
      <EncryptedPostList encryptedList={encryptedList} />
    </Suspense>
  );
}
