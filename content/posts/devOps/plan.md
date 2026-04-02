# DevOps 渐进式学习计划

## 背景

DevOps 不是一个单一技术，而是一套从代码提交到生产运行的方法论。但现有的 DevOps 学习路径往往有两个问题：一是内容分散——Docker 讲 8 篇、K8s 讲 2 篇、Linux 讲 2 篇，读者很难形成完整的认知链条；二是缺少真实项目驱动——每篇文章独立举例，读者不知道这些技术在实际项目中如何配合。

这个系列的目标是：**用一个 SaaS 应用从裸机到生产环境的完整旅程，串联起 DevOps 的核心技能**。

### 技术栈

- Linux (Ubuntu 22.04 LTS)
- Docker & Docker Compose
- Nginx
- GitHub Actions (CI/CD)
- Kubernetes
- Prometheus + Grafana (监控)

### 主线案例：部署 CloudPulse（SaaS 监控平台）

贯穿全系列的真实案例——一个类似 UptimeRobot 的 SaaS 监控平台，技术栈为 Next.js + PostgreSQL + Redis。案例从一台空白的 Linux 服务器开始，随着文章逐步演进：安装 Docker → 容器化应用 → Nginx 反向代理 → CI/CD 自动化 → K8s 编排 → 监控告警。

选择这个案例的原因：

- 涉及多种服务（前端、后端、数据库、缓存），适合展示容器编排
- 有真实的运维需求（HTTPS、负载均衡、自动扩缩、监控告警）
- 从简单到复杂，自然需要 DevOps 各项技术

## 学习阶段划分

### 基础篇（第 1-3 篇）：从裸机到容器化

让一台空白服务器变成能运行容器化应用的基础设施。第 1 篇处理 Linux 服务器本身的安全和配置，第 2-3 篇把应用装进 Docker。

### 网络与自动化篇（第 4-6 篇）：从手动到自动

第 4 篇用 Docker Compose 编排多服务开发环境，第 5 篇配置 Nginx 反向代理和 HTTPS，第 6 篇用 GitHub Actions 实现自动部署。

### 编排与可观测篇（第 7-8 篇）：走向生产

第 7 篇用 Kubernetes 管理容器编排和自动扩缩，第 8 篇搭建 Prometheus + Grafana 监控告警系统。

---

## 博客目录结构

```
content/posts/devops/
├── plan.md
├── 01-linux-server-setup.mdx
├── 02-docker-fundamentals.mdx
├── 03-dockerfile-production.mdx
├── 04-docker-compose.mdx
├── 05-nginx-reverse-proxy.mdx
├── 06-cicd-github-actions.mdx
├── 07-kubernetes-fundamentals.mdx
└── 08-monitoring-prometheus-grafana.mdx
```

---

## 每篇文章大纲

### 01. Linux 服务器基础配置

**文件名**：`01-linux-server-setup.mdx`

**核心问题**：拿到一台全新的 Linux 服务器后，在上任何业务之前，你需要做哪些基础配置？

**主线案例**：初始化 CloudPulse 的生产服务器

**内容要点**：

1. **从一个真实场景开始**：刚买了一台云服务器，SSH 连上去之后该做什么？先装系统更新还是先配防火墙？
2. **SSH 安全加固**：禁用密码登录、配置密钥认证、修改默认端口、限制登录用户
3. **用户与权限**：创建应用专用用户、sudo 配置、文件权限基础
4. **防火墙配置**：UFW 基本用法、只开放必要端口（22、80、443、3000）
5. **系统初始化**：时区设置、自动安全更新、安装基础工具（curl、git、htop）
6. **swap 配置**：小内存服务器的 swap 配置

**与前篇的关联**：无（系列第一篇）

---

### 02. Docker 核心概念：容器化你的第一个应用

**文件名**：`02-docker-fundamentals.mdx`

**核心问题**：Docker 是怎么让"在我机器上能跑"变成"在任何机器上都能跑"的？

**主线案例**：用 Docker 运行 CloudPulse 的 Next.js 前端和后端

**内容要点**：

1. **承接上篇**：服务器安全配置好了，现在要把应用跑起来。但在安装应用之前，先装 Docker
2. **Docker 安装**：Ubuntu 上一键安装、启动 Docker 服务、配置用户权限
3. **核心概念**：镜像（只读模板）、容器（运行实例）、仓库（Docker Hub）——用类比解释
4. **Dockerfile 入门**：为一个 Next.js 应用写最简 Dockerfile，理解每个指令的作用
5. **构建与运行**：docker build、docker run、端口映射、后台运行
6. **镜像操作**：搜索、拉取、查看本地镜像、删除无用镜像
7. **容器操作**：查看日志、进入容器调试、停止和删除
8. **数据持久化**：Volume 的概念，为什么容器删除后数据会丢失

**与前篇的关联**：上篇配好了服务器，本篇装上 Docker 并跑起第一个容器化应用

---

### 03. Dockerfile 生产级镜像

**文件名**：`03-dockerfile-production.mdx`

**核心问题**：开发环境的 Dockerfile 能跑，但镜像 1.2GB、启动要 30 秒——怎么优化？

**主线案例**：优化 CloudPulse 的 Dockerfile，让镜像从 1.2GB 缩到 150MB

**内容要点**：

1. **承接上篇**：应用能跑起来了，但 `docker images` 一看——1.2GB。这个体积在生产环境不可接受
2. **基础镜像选择**：node:20 vs node:20-alpine，差 800MB 的原因（Alpine 用 musl libc）
3. **多阶段构建**：构建阶段装所有依赖，运行阶段只拷贝产物。核心原理和写法
4. **层缓存优化**：Docker 的层缓存机制，为什么 COPY package.json 要在 COPY . . 之前、.dockerignore 的作用
5. **安全加固**：非 root 用户运行、只装生产依赖、不拷贝 .env
6. **镜像瘦身实战**：一步步优化 CloudPulse 的 Dockerfile，每一步展示体积变化
7. **什么时候不用多阶段构建**：简单项目（静态站点）单阶段就够了

**与前篇的关联**：上篇写了最简 Dockerfile 跑通流程，本篇优化到生产级质量

---

### 04. Docker Compose：编排多服务开发环境

**文件名**：`04-docker-compose.mdx`

**核心问题**：CloudPulse 需要 Next.js + PostgreSQL + Redis 三个容器，手动管理太痛苦，怎么一键启动？

**主线案例**：用 Docker Compose 编排 CloudPulse 的完整开发环境

**内容要点**：

1. **承接上篇**：单容器跑通了，但真实项目不止一个服务。手动 `docker run` 三个容器，还要处理网络和依赖顺序，太痛苦
2. **Docker Compose 是什么**：YAML 文件定义多服务应用，一条命令启动/停止全部
3. **编写 docker-compose.yml**：services 定义、depends_on、environment、volumes、networks
4. **CloudPulse 的 Compose 文件**：Next.js + PostgreSQL + Redis 的完整配置
5. **常用命令**：up -d、down、ps、logs、exec
6. **开发环境 vs 生产环境**：dev profile 覆盖配置（热重载、挂载源码）
7. **网络和数据持久化**：容器间通信、数据不会因为 docker down 丢失

**与前篇的关联**：上篇优化了单个镜像，本篇把多个服务编排在一起

---

### 05. Nginx 反向代理与 HTTPS

**文件名**：`05-nginx-reverse-proxy.mdx`

**核心问题**：直接暴露应用端口不安全、没有域名、没有 HTTPS——怎么让 CloudPulse 像一个正式产品？

**主线案例**：为 CloudPulse 配置 Nginx 反向代理和 Let's Encrypt HTTPS

**内容要点**：

1. **承接上篇**：应用能跑了，但访问方式是 `http://你的IP:3000`——这不像一个正式产品
2. **为什么需要反向代理**：端口复用、SSL 终止、静态文件缓存、负载均衡
3. **Nginx 基础配置**：server 块、location 匹配、proxy_pass
4. **CloudPulse 的 Nginx 配置**：反向代理到 Next.js 容器、静态文件缓存、Gzip 压缩
5. **HTTPS 配置**：Certbot + Let's Encrypt 自动签发证书、HTTP 到 HTTPS 重定向
6. **实用技巧**：Nginx 日志查看、配置测试（nginx -t）、常见 502/504 排查
7. **性能优化**：worker_processes、keepalive、缓冲区配置

**与前篇的关联**：上篇用 Compose 编排了服务，本篇加一层 Nginx 让它对外更专业

---

### 06. CI/CD：GitHub Actions 自动化部署

**文件名**：`06-cicd-github-actions.mdx`

**核心问题**：每次部署都要 SSH 登服务器、拉代码、docker build、docker up——怎么自动化？

**主线案例**：为 CloudPulse 搭建 push 到 main 分支即自动部署的流水线

**内容要点**：

1. **承接上篇**：手动部署流程走通了，但每次要 SSH 上去敲一堆命令。发版频率一高，这就成了瓶颈
2. **CI/CD 是什么**：持续集成（自动测试）+ 持续部署（自动发布），为什么需要它
3. **GitHub Actions 基础**：workflow、job、step、action 的概念，YAML 文件位置
4. **CI 流水线**：push 时自动运行 lint、测试、构建 Docker 镜像
5. **CD 流水线**：构建通过后 SSH 到服务器、拉取新镜像、docker compose up -d
6. **Secrets 管理**：服务器密码、部署密钥用 GitHub Secrets 存储，不出现在代码里
7. **环境变量区分**：preview 环境和 production 环境的不同配置
8. **回滚策略**：部署失败时怎么快速回退

**与前篇的关联**：上篇手动部署走通了，本篇把整个流程自动化

---

### 07. Kubernetes 容器编排入门

**文件名**：07-kubernetes-fundamentals.mdx`

**核心问题**：Docker Compose 只能管理单机，当需要多台服务器、自动扩缩、零停机更新时怎么办？

**主线案例**：把 CloudPulse 从 Docker Compose 迁移到 Kubernetes

**内容要点**：

1. **承接上篇**：单机部署 + CI/CD 自动化已经能用了。但当用户量增长到单机扛不住时，需要多台服务器
2. **为什么需要 K8s**：Docker Compose 的局限（单机、无自愈、无自动扩缩）、K8s 解决了什么
3. **核心概念**：Node、Pod、Deployment、Service、Namespace——用类比和图解释关系
4. **部署 CloudPulse 到 K8s**：Deployment YAML、Service YAML、ConfigMap、Secret
5. **滚动更新与回滚**：kubectl rollout、修改镜像版本后的自动滚动更新
6. **Ingress 入口**：用 Nginx Ingress Controller 替代之前的手动 Nginx 配置
7. **什么时候需要 K8s**：小项目用 Compose 就够了，K8s 有运维成本

**与前篇的关联**：上篇实现了 CI/CD 自动化，本篇解决自动扩缩的问题

---

### 08. 监控与告警：Prometheus + Grafana

**文件名**：`08-monitoring-prometheus-grafana.mdx`

**核心问题**：应用跑在生产环境了，但出了问题你不知道——怎么做到"出了问题第一时间知道"？

**主线案例**：为 CloudPulse 搭建完整的服务监控和告警系统

**内容要点**：

1. **承接上篇**：应用已经跑在 K8s 上了，但你怎么知道它是否正常？没有监控就是在盲开
2. **为什么需要监控系统**：日志的局限（事后排查）、指标的价值（趋势预判、自动告警）
3. **Prometheus 核心概念**：指标采集、时间序列数据库、Pull 模式、PromQL 查询语言
4. **Grafana 可视化**：Dashboard 面板、数据源配置、常用图表（折线图、仪表盘、热力图）
5. **CloudPulse 的监控配置**：Node Exporter 采集服务器指标、应用暴露业务指标、自定义 Dashboard
6. **AlertManager 告警**：告警规则配置、通知渠道（邮件、Slack）、告警分组和抑制
7. **从日志到指标**：什么时候用日志、什么时候用指标、什么时候用链路追踪——三者互补

**与前篇的关联**：上篇用 K8s 部署了应用，本篇给它装上"眼睛和耳朵"

---

## 系列节奏规划

```
第 1 篇（基础）：空服务器 → 安全加固 → 可用（基础设施准备）
第 2 篇（基础）：安装 Docker → 写 Dockerfile → 跑起应用（容器化入门）
第 3 篇（核心）：镜像优化 → 多阶段构建 → 安全加固（生产级镜像）
第 4 篇（核心）：多服务编排 → 开发环境 → 数据持久化（Docker Compose）
第 5 篇（网络）：反向代理 → HTTPS → 性能优化（对外服务）
第 6 篇（自动化）：CI 流水线 → 自动部署 → 回滚（CI/CD）
第 7 篇（编排）：多机部署 → 滚动更新 → 自动扩缩（Kubernetes）
第 8 篇（可观测）：指标采集 → 可视化 → 告警（监控系统）
```

每篇文章在 CloudPulse 案例的基础上继续推进，读者能感受到自己在"一步步把一个应用推向生产"。

## 预期效果

读者学完后将具备：

- 独立完成一台 Linux 服务器的安全初始化
- 用 Docker 容器化任何应用，并优化到生产级
- 用 Docker Compose 编排多服务开发环境
- 配置 Nginx 反向代理和 HTTPS
- 用 GitHub Actions 搭建自动部署流水线
- 理解 Kubernetes 的核心概念，能在 K8s 上部署应用
- 搭建 Prometheus + Grafana 监控告警系统
