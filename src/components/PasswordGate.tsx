"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  decryptPayload,
  deriveKeyFromPassword,
  exportKeyToRaw,
  importKeyFromRaw,
} from "@/lib/decrypt";
import { VERIFY_PLAINTEXT, type SiteCryptoPublic } from "@/lib/crypto-config";

const SESSION_RAW_KEY = "blog_access_raw_key";

type GateContextValue = {
  unlocked: boolean;
  cryptoKey: CryptoKey | null;
};

const GateContext = createContext<GateContextValue>({
  unlocked: false,
  cryptoKey: null,
});

/** 子组件用此 hook 读取解锁状态与派生密钥，决定是否解密渲染 */
export function useGate(): GateContextValue {
  return useContext(GateContext);
}

interface PasswordGateProps {
  site: SiteCryptoPublic;
  children: ReactNode;
}

export default function PasswordGate({ site, children }: PasswordGateProps) {
  const [ready, setReady] = useState(false); // 是否已完成 sessionStorage 恢复检查
  const [unlocked, setUnlocked] = useState(false);
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 挂载时尝试从 sessionStorage 恢复 raw key —— 刷新同一标签页免重输密码
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_RAW_KEY);
    if (!stored) {
      setReady(true);
      return;
    }
    importKeyFromRaw(stored)
      .then((key) =>
        decryptPayload(site.verifyToken, key).then((plain) => {
          if (plain === VERIFY_PLAINTEXT) {
            setCryptoKey(key);
            setUnlocked(true);
          }
        })
      )
      .catch(() => {
        sessionStorage.removeItem(SESSION_RAW_KEY);
      })
      .finally(() => setReady(true));
  }, [site.verifyToken]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const key = await deriveKeyFromPassword(password, site.salt);
      const plain = await decryptPayload(site.verifyToken, key);
      if (plain !== VERIFY_PLAINTEXT) {
        throw new Error("incorrect password");
      }
      const raw = await exportKeyToRaw(key);
      sessionStorage.setItem(SESSION_RAW_KEY, raw);
      setCryptoKey(key);
      setUnlocked(true);
      setPassword("");
    } catch {
      setError("密码不正确，请重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <GateContext.Provider value={{ unlocked, cryptoKey }}>
      {/*
        始终渲染 children：加密数据（密文）需要进入静态 HTML，
        解锁后子组件才能从 context 取密钥解密。未解锁时由下方 overlay 全屏遮罩覆盖。
      */}
      {children}
      {!unlocked && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="访问密码"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950"
        >
          <div className="w-full max-w-md glass rounded-2xl p-8 border border-gray-200 dark:border-neutral-700 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
              王阳的博客
            </h1>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              {ready
                ? "这是一个私密博客，请输入访问密码"
                : "正在验证访问状态..."}
            </p>
            {ready && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="访问密码"
                  aria-label="访问密码"
                  autoFocus
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {error && (
                  <p className="text-sm text-red-500 dark:text-red-400 text-center">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting || !password}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? "验证中..." : "进入博客"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </GateContext.Provider>
  );
}
