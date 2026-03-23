// 中文分类名到实际目录名的映射（目录名可能是中文或英文）
// key 是文章 frontmatter 中的 category 值
// value 是实际的目录名
export const categoryToDirMap: Record<string, string> = {
  后端: "后端",
  nestjs: "nestjs",
  运维: "运维",
  数据库: "database",
  "claude-code": "claude-code",
  java: "java",
  hono: "hono",
  prisma: "prisma",
  mysql: "mysql",
  docker: "docker",
  nextjs: "nextjs",
  golang: "golang",
  mongoose: "mongoose",
  typescript: "typescript",
  redis: "redis",
  mybatis: "mybatis",
  trpc: "trpc",
};

// 目录名到中文分类名的反向映射
export const dirToCategoryMap: Record<string, string> = {
  后端: "后端",
  nestjs: "nestjs",
  运维: "运维",
  database: "数据库",
  "claude-code": "claude-code",
  java: "java",
  hono: "hono",
  prisma: "prisma",
  mysql: "mysql",
  docker: "docker",
  nextjs: "nextjs",
  golang: "golang",
  mongoose: "mongoose",
  typescript: "typescript",
  redis: "redis",
  mybatis: "mybatis",
  trpc: "trpc",
};
