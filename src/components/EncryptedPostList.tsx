"use client";

import { useEffect, useState } from "react";
import PostList from "./PostList";
import { useGate } from "./PasswordGate";
import { decryptPayload } from "@/lib/decrypt";
import type { EncryptedPayload } from "@/lib/crypto-config";
import type { PostMeta } from "@/lib/posts";

interface EncryptedPostListProps {
  encryptedList: EncryptedPayload;
}

export default function EncryptedPostList({
  encryptedList,
}: EncryptedPostListProps) {
  const { cryptoKey } = useGate();
  const [posts, setPosts] = useState<PostMeta[] | null>(null);

  useEffect(() => {
    // cryptoKey 仅会从 null → key（解锁后保持），不会反向，故 null 时无需清空 posts
    if (!cryptoKey) return;
    let cancelled = false;
    decryptPayload(encryptedList, cryptoKey)
      .then((json) => {
        if (!cancelled) setPosts(JSON.parse(json) as PostMeta[]);
      })
      .catch(() => {
        if (!cancelled) setPosts(null);
      });
    return () => {
      cancelled = true;
    };
  }, [cryptoKey, encryptedList]);

  // 未解锁 / 解密中：返回 null，由 PasswordGate 的全屏 overlay 覆盖
  if (!posts) return null;
  return <PostList posts={posts} />;
}
