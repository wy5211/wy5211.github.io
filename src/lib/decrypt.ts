// 客户端解密原语（浏览器 Web Crypto，与 src/lib/encrypt.ts 使用完全相同的算法）。

import {
  PBKDF2_ITERATIONS,
  KEY_LENGTH,
  type EncryptedPayload,
} from "./crypto-config";

const subtle = globalThis.crypto.subtle;

function base64ToBuf(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const buf = new ArrayBuffer(binary.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buf;
}

function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/** 用密码 + salt 派生 AES-GCM 密钥（首次输入密码时调用，派生结果可导出存 sessionStorage） */
export function deriveKeyFromPassword(
  password: string,
  saltB64: string
): Promise<CryptoKey> {
  return subtle
    .importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
      "deriveKey",
    ])
    .then((keyMaterial) =>
      subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: base64ToBuf(saltB64),
          iterations: PBKDF2_ITERATIONS,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: KEY_LENGTH },
        true,
        ["encrypt", "decrypt"]
      )
    );
}

/** 从 sessionStorage 中的 raw key（base64）重建 CryptoKey（刷新页面后免重输密码） */
export function importKeyFromRaw(rawB64: string): Promise<CryptoKey> {
  return subtle.importKey(
    "raw",
    base64ToBuf(rawB64),
    { name: "AES-GCM", length: KEY_LENGTH },
    false,
    ["decrypt"]
  );
}

/** 导出 CryptoKey 为 base64 raw key，用于存入 sessionStorage */
export async function exportKeyToRaw(key: CryptoKey): Promise<string> {
  const raw = await subtle.exportKey("raw", key);
  return bufToBase64(raw);
}

/** 解密单个加密块，返回明文字符串 */
export async function decryptPayload(
  payload: EncryptedPayload,
  key: CryptoKey
): Promise<string> {
  const iv = base64ToBuf(payload.iv);
  const ciphertext = base64ToBuf(payload.ciphertext);
  const plainBuf = await subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(plainBuf);
}
