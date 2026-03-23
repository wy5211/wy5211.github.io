/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY || "";
const repositoryName = repository.split("/")[1] || "";
const isUserPageRepository = repositoryName.endsWith(".github.io");
const basePath =
  isGithubActions && repositoryName && !isUserPageRepository
    ? `/${repositoryName}`
    : "";

const nextConfig = {
  // 只在生产构建时使用静态导出
  ...(process.env.NODE_ENV === "production" ? { output: "export" } : {}),
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
