// 加密算法的共享常量与类型（server / client 通用，无副作用）
// 注意：修改这些常量会导致已加密内容无法用旧密码解密，谨慎调整。

/** PBKDF2 迭代次数 —— 越大越抗暴力破解，但派生越慢。构建时只派生一次，对文章数无影响。 */
export const PBKDF2_ITERATIONS = 150000;

/** salt 字节数（构建时随机生成一次，全站共享） */
export const SALT_LENGTH = 16;

/** AES-GCM IV 字节数（每个加密块独立随机 IV） */
export const IV_LENGTH = 12;

/** AES-GCM 密钥位长 */
export const KEY_LENGTH = 256;

/** 验证密码用的固定明文 —— 构建时加密成「验证密文」，前端解密成功即代表密码正确 */
export const VERIFY_PLAINTEXT = "BLOG_ACCESS_OK";

/** 单块加密结果（值均为 base64 字符串，便于序列化进静态 HTML） */
export type EncryptedPayload = {
  ciphertext: string;
  iv: string;
};

/** 需要传递到前端的站点级公开加密配置（不含密钥、不含密码） */
export type SiteCryptoPublic = {
  /** 全局 salt（base64） */
  salt: string;
  /** 验证密文 —— 前端用它校验密码 */
  verifyToken: EncryptedPayload;
};
