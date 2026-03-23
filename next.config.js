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
  // 在 GitHub Actions 或生产环境时使用静态导出
  ...(isGithubActions || process.env.NODE_ENV === "production"
    ? { output: "export" }
    : {}),
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
