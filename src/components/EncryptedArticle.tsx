"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import BackButton from "@/app/posts/[category]/[slug]/BackButton";
import { getCategoryColor } from "@/lib/category-colors";
import { useGate } from "./PasswordGate";
import { decryptPayload } from "@/lib/decrypt";
import type { EncryptedPayload } from "@/lib/crypto-config";
import type { ArticleData } from "@/lib/posts";

interface EncryptedArticleProps {
  encrypted: EncryptedPayload;
}

export default function EncryptedArticle({ encrypted }: EncryptedArticleProps) {
  const { cryptoKey } = useGate();
  const [data, setData] = useState<ArticleData | null>(null);

  useEffect(() => {
    // cryptoKey 仅会从 null → key（解锁后保持），不会反向，故 null 时无需清空 data
    if (!cryptoKey) return;
    let cancelled = false;
    decryptPayload(encrypted, cryptoKey)
      .then((json) => {
        // 数据源为构建时加密的自有内容，AES-GCM 完整性已保证结构正确，可直接断言类型
        if (!cancelled) setData(JSON.parse(json) as ArticleData);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [cryptoKey, encrypted]);

  // 解锁后用文章真实标题更新浏览器标签页（generateMetadata 为防泄露只返回占位）
  useEffect(() => {
    if (data?.title) {
      document.title = data.title;
    }
  }, [data]);

  // 未解锁 / 解密中：返回 null，由 PasswordGate 的全屏 overlay 覆盖
  if (!data) return null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <BackButton />

      {/* 文章头部 */}
      <header className="glass rounded-2xl p-8 mb-8 border border-gray-200 dark:border-neutral-700">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor()}`}
          >
            {data.category}
          </span>
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {data.date}
          </time>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          {data.title}
        </h1>

        {data.summary && (
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {data.summary}
          </p>
        )}

        {data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
              标签:
            </span>
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* 文章正文（解密后的 Markdown） */}
      <div className="glass rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-neutral-700">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/*
            rehypeRaw 渲染原始 HTML：内容为构建时加密的自有 MDX（可信源），非用户输入，
            无 XSS 风险。若未来引入外部内容，需在此前加 sanitize。
          */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {data.body}
          </ReactMarkdown>
        </div>
      </div>

      {/* 文章底部 */}
      <footer className="mt-8 space-y-4">
        {data.nextPost && (
          <Link
            href={`/posts/${data.nextPost.category}/${data.nextPost.slug}`}
            className="glass block w-full rounded-xl p-6 border border-gray-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <span>下一篇</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {data.nextPost.title}
                </h3>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        )}

        <div className="text-center">
          <BackButton variant="primary" />
        </div>
      </footer>
    </article>
  );
}
