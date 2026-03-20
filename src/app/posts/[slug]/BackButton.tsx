"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface BackButtonProps {
  variant?: "text" | "primary";
}

export default function BackButton({ variant = "text" }: BackButtonProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const href = category ? `/?category=${encodeURIComponent(category)}` : "/";

  if (variant === "primary") {
    return (
      <Link
        href={href}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        返回首页
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 group"
    >
      <svg
        className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      返回首页
    </Link>
  );
}
