// 服务端加密原语（仅在构建时 / server component 中使用，绝不进 client bundle）。
// 密码来自环境变量 BLOG_ACCESS_PASSWORD，不会出现在产物中。

import {
  PBKDF2_ITERATIONS,
  SALT_LENGTH,
  IV_LENGTH,
  KEY_LENGTH,
  VERIFY_PLAINTEXT,
  type EncryptedPayload,
  type SiteCryptoPublic,
} from "./crypto-config";

const subtle = globalThis.crypto.subtle;

function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function randomBytes(length: number): ArrayBuffer {
  const buf = new ArrayBuffer(length);
  globalThis.crypto.getRandomValues(new Uint8Array(buf));
  return buf;
}

/**
 * 从密码确定性派生 salt（取 SHA-256 摘要前 SALT_LENGTH 字节）。
 *
 * 关键：Next.js turbopack 在 build 时为不同路由段（layout / page）独立求值模块，
 * 不保证 layout.tsx 与 page.tsx 共享同一个模块级单例。
 * 若用随机 salt，两段会各自生成不同的 salt → 不同的派生 key →
 * verifyToken（layout 加密）能解、文章列表（page 加密）解不开 → 解锁后主页空白。
 * 改为从密码派生，保证任意调用都得到完全相同的 salt 与 key。
 */
async function deriveSaltFromPassword(password: string): Promise<ArrayBuffer> {
  const digest = await subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  return digest.slice(0, SALT_LENGTH);
}

function deriveKey(password: string, salt: ArrayBuffer): Promise<CryptoKey> {
  return subtle
    .importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
      "deriveKey",
    ])
    .then((keyMaterial) =>
      subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: PBKDF2_ITERATIONS,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: KEY_LENGTH },
        false,
        ["encrypt", "decrypt"]
      )
    );
}

function encrypt(plaintext: string, key: CryptoKey): Promise<EncryptedPayload> {
  const iv = randomBytes(IV_LENGTH);
  return subtle
    .encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext))
    .then((cipherBuf) => ({
      ciphertext: bufToBase64(cipherBuf as ArrayBuffer),
      iv: bufToBase64(iv),
    }));
}

type SiteCrypto = SiteCryptoPublic & { key: CryptoKey };

// 模块级单例：保证同一次构建内 salt / key / 验证密文完全一致
let siteCryptoCache: SiteCrypto | null = null;

/** 生成（并缓存）站点级加密配置：全局 salt、验证密文、派生密钥 */
export async function getSiteCrypto(): Promise<SiteCrypto> {
  if (siteCryptoCache) return siteCryptoCache;

  const password = process.env.BLOG_ACCESS_PASSWORD;
  if (!password) {
    throw new Error(
      "[blog] 缺少环境变量 BLOG_ACCESS_PASSWORD。请在本地 .env.local 或 GitHub Actions Secret 中设置访问密码。"
    );
  }

  const salt = await deriveSaltFromPassword(password);
  const key = await deriveKey(password, salt);
  const verifyToken = await encrypt(VERIFY_PLAINTEXT, key);

  siteCryptoCache = { salt: bufToBase64(salt), verifyToken, key };
  return siteCryptoCache;
}

/** 用站点密钥加密任意明文（供文章正文 / 列表 JSON 使用） */
export async function encryptForSite(
  plaintext: string
): Promise<EncryptedPayload> {
  const { key } = await getSiteCrypto();
  return encrypt(plaintext, key);
}
