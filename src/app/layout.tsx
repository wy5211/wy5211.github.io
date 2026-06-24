import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PasswordGate from "@/components/PasswordGate";
import { getSiteCrypto } from "@/lib/encrypt";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "王阳的博客",
  description: "分享前端、后端、全栈开发技术文章",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 构建时生成站点级加密配置：salt + 验证密文（不包含密钥/密码）
  const { salt, verifyToken } = await getSiteCrypto();

  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <PasswordGate site={{ salt, verifyToken }}>
          <Header />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </PasswordGate>
      </body>
    </html>
  );
}
