# Docker 从入门到实战

## 背景

你是一个有 1-2 年开发经验的后端工程师，项目部署靠手动 SSH 到服务器上操作。最近听说 Docker 能解决"在我机器上能跑"的问题，也看到招聘 JD 里频繁出现容器化要求，但你还不清楚 Docker 到底是什么、为什么要用它、怎么在实际项目中用起来。

这个系列不是 Docker 文档的中文翻译。我们从"遇到了什么问题"出发，带你把一个**电商订单 API**从本地开发一步步容器化到生产部署。每解决一个真实问题，你就自然掌握了 Docker 的一个核心概念。

### 技术栈选择

| 技术           | 版本 | 为什么选它                                   |
| -------------- | ---- | -------------------------------------------- |
| Docker Engine  | 27.x | 当前稳定版本，支持 BuildKit 等新特性         |
| Docker Compose | 2.x  | 多容器编排的标准工具，V2 已内置于 Docker CLI |
| Node.js        | 20   | 主线案例使用，大多数读者熟悉                 |
| PostgreSQL     | 16   | 案例中的数据库，主流关系型数据库             |
| Redis          | 7.x  | 案例中的缓存层                               |
| Nginx          | 1.25 | 反向代理和静态文件服务                       |
| Alpine Linux   | 3.19 | 基础镜像首选，体积小、攻击面窄               |

> Docker 27+ 移除了已废弃的 `docker buildx` 独立命令（合并为 `docker build`），本系列基于最新版本编写。如果你使用的是 Docker 24-26，大部分内容仍然适用，个别命令可能需要加 `buildx` 前缀。

---

## 主线案例：电商订单 API

整个系列围绕一个**电商订单管理 API** 的容器化过程展开。

**案例场景**：一个中小型电商平台的订单服务，需要处理商品查询、下单、支付回调、订单状态流转。技术栈是 Node.js + PostgreSQL + Redis，前端用 Nginx 代理。

**案例数据示例**（贯穿全系列使用）：

```
订单：ORD-20250315-8x9k2m，用户 zhang_wei，iPhone 15 Pro x1，¥8999
商品：SKU_iphone15pro_256black，库存 42，价格 ¥8999
用户：zhang_wei (usr_a1x9k2m)，注册时间 2025-01-15
支付状态：已支付（微信支付），支付时间 2025-03-15T14:32:08+08:00
```

**案例演进路线**：

```
第1篇：了解 Docker 是什么（概念层面，还没动手）
第2篇：本地用 Docker 跑一个 PostgreSQL（第一次实操）
第3篇：把订单 API 打包成镜像（编写 Dockerfile）
第4篇：数据不能丢——给数据库加 Volume（数据持久化）
第5篇：API 怎么连上数据库（容器网络）
第6篇：一条命令启动所有服务（Docker Compose）
第7篇：加上 Redis 缓存层（Compose 进阶）
第8篇：镜像从 1.2GB 瘦身到 80MB（镜像优化 + 多阶段构建）
第9篇：安全加固与资源管控（安全与监控）
第10篇：GitHub Actions 自动构建部署（CI/CD）
第11篇：生产环境出问题了怎么办（故障排查）
第12篇：单机 Docker 不够用了（Docker vs Kubernetes）
```

---

## 系列节奏

```
基础篇（01-02）：建立直觉，知道 Docker 是什么、能干什么
  → 独立小案例，不要求有完整项目

核心篇（03-06）：容器化订单 API，建立容器化思维
  → Dockerfile → 数据持久化 → 网络 → Compose
  → 案例从"本地跑起来"到"多服务协同工作"

进阶篇（07-09）：案例持续演进，接近生产环境
  → Compose 进阶 → 镜像优化 → 安全监控

实战篇（10-12）：从开发到生产，再到下一步
  → CI/CD → 故障排查 → 容器编排方向
```

---

## 博客目录结构

```
content/posts/docker/
├── plan.md                              # 本计划文件
├── 01-why-docker.mdx                    # 为什么需要 Docker
├── 02-first-container.mdx               # 你的第一个容器
├── 03-dockerfile.mdx                    # 把应用装进容器：Dockerfile
├── 04-volumes-data.mdx                  # 数据持久化：容器里的数据去哪了
├── 05-networking.mdx                    # 容器网络：服务之间怎么通信
├── 06-compose.mdx                       # Docker Compose：一条命令启动一切
├── 07-compose-production.mdx            # Compose 进阶：走向生产环境
├── 08-image-optimization.mdx            # 镜像优化：从 1.2GB 到 80MB
├── 09-security-monitoring.mdx           # 安全与监控：加固你的容器
├── 10-ci-cd.mdx                         # CI/CD：自动构建与部署
├── 11-troubleshooting.mdx               # 故障排查：真实生产环境的排坑指南
└── 12-docker-vs-kubernetes.mdx          # 从 Docker 到 Kubernetes
```

---

## 基础篇（01-02）

### 01. 为什么需要 Docker

**核心问题**："在我机器上能跑"到底是怎么回事？Docker 真的能解决吗？

**主线案例**：一个真实的部署翻车故事——本地开发好的 Node.js 服务，部署到测试环境就报错，因为 Node.js 版本差了一个小版本。

**内容要点**：

- 从一个真实的部署翻车场景切入
- "环境一致"到底意味着什么（运行时版本、系统库、配置文件）
- 容器 vs 虚拟机：不是替代关系，而是不同粒度的隔离
- Docker 的本质：不是虚拟机，是进程 + 隔离 + 打包
- 镜像、容器、仓库这三个概念用"集装箱运输"类比讲清楚
- UnionFS 分层：为什么改一行代码不用重新下载整个系统
- 什么时候不需要 Docker（单体脚本、纯前端静态站等）

**与前篇关联**：系列第一篇，无前篇。

**结尾过渡**：现在你知道 Docker 是什么了，下一篇我们动手跑起来。

---

### 02. 你的第一个容器

**核心问题**：Docker 装好了，然后呢？怎么用它来跑一个数据库？

**主线案例**：用 Docker 在本地启动一个 PostgreSQL 数据库，再也不用在本机安装 PostgreSQL 了。

**内容要点**：

- Docker 安装（macOS / Linux / Windows 各用一段话带过，不花篇幅）
- `docker run` 的核心参数拆解（`-d`、`-p`、`-e`、`--name`、`-v`）
- 用 Docker 跑 PostgreSQL：端口映射、环境变量、数据卷（先感性认识，不深入讲原理）
- 容器的生命周期：created → running → stopped → removed
- `docker ps`、`docker logs`、`docker exec`、`docker stop` 的实际使用场景
- 镜像标签：`postgres:16` vs `postgres:16-alpine` vs `postgres:latest`，选哪个
- Docker Hub 上怎么找靠谱的镜像（官方镜像 vs 社区镜像）
- `docker rm -f` 的危险性和容器清理习惯

**与前篇关联**：承接上一篇的"环境一致"问题，用实际操作展示 Docker 如何消除本地环境差异。

**结尾过渡**：现在你会用别人的镜像了，但怎么把自己的应用也做成镜像？下一篇来写 Dockerfile。

---

## 核心篇（03-06）

### 03. 把应用装进容器：Dockerfile

**核心问题**：本地跑得好好的 Node.js 服务，怎么变成一个可以在任何机器上运行的 Docker 镜像？

**主线案例**：把电商订单 API 项目打包成 Docker 镜像，从最原始的做法开始，逐步优化。

**内容要点**：

- 先试一个"暴力"Dockerfile：`FROM ubuntu` + `apt install node` + `COPY`，看看有多大
- 再用官方 Node 镜像：体积直接从 800MB 降到 350MB，理解基础镜像的选择
- Dockerfile 常用指令：`FROM`、`WORKDIR`、`COPY`、`RUN`、`EXPOSE`、`CMD`
- `COPY package.json` 先于 `COPY .`：缓存友好的写法，为什么顺序很重要
- `CMD` vs `ENTRYPOINT`：什么时候用哪个，用一个 Nginx 配置的例子讲清楚
- `.dockerignore`：不把 `node_modules` 和 `.git` 打进镜像
- `docker build` 和 `docker run` 的完整流程走一遍
- 构建出错了怎么办：看懂 Docker 的错误日志，常见报错和原因

**与前篇关联**：上一篇用 `docker run` 跑了别人的 PostgreSQL，这一篇学会自己构建镜像。

**结尾过渡**：订单 API 的镜像能跑了，但你很快会发现一个致命问题——容器删了，数据库数据也没了。下一篇解决这个问题。

---

### 04. 数据持久化：容器里的数据去哪了

**核心问题**：容器删了数据就没了，数据库数据怎么办？

**主线案例**：电商订单 API 重启 PostgreSQL 容器后，之前创建的订单数据全不见了。用 Volume 解决这个问题。

**内容要点**：

- 先复现问题：创建几个订单 → 停掉容器 → 重新启动 → 数据没了
- 容器文件系统的真相：可写层是临时的，容器删除就消失
- 三种数据存储方式：容器层（临时）、Bind Mount（绑定宿主机目录）、Volume（Docker 管理）
- Volume 的基本操作：`create`、`inspect`、`rm`、`ls`
- 给 PostgreSQL 加 Volume：一行 `-v` 参数解决数据丢失问题
- Volume vs Bind Mount：什么时候用哪个（开发时用 Bind Mount 方便改代码，生产用 Volume 更安全）
- 备份与恢复：怎么把 Volume 里的数据导出来、怎么恢复
- Volume 的实际存储位置：在 macOS 和 Linux 上分别存在哪

**与前篇关联**：上一篇构建了订单 API 镜像，这一篇解决数据持久化问题。

**结尾过渡**：数据不会丢了，但 API 容器怎么连接到 PostgreSQL 容器？它们可是两个独立的容器。下一篇讲网络。

---

### 05. 容器网络：服务之间怎么通信

**核心问题**：API 容器和数据库容器是两个独立的进程，它们怎么互相找到对方？

**主线案例**：订单 API 启动时连不上 PostgreSQL，因为它们在不同的"网络空间"里。

**内容要点**：

- 先复现问题：两个容器分别 `docker run`，用 `localhost:5432` 连接失败
- Docker 的默认网络：每个容器有自己的 IP，但 IP 会变
- 自定义 Bridge 网络：`docker network create`，容器之间用名字通信
- DNS 解析：在自定义网络中，容器名就是主机名
- 端口映射的本质：`-p 3000:3000` 到底做了什么（宿主机端口 → 容器端口）
- `host` 网络模式：什么时候需要（调试），什么时候不该用（生产）
- 用 `docker exec` + `ping` / `curl` 排查网络连通性
- 实战：创建网络 → 启动 PostgreSQL → 启动 API → 验证连接

**与前篇关联**：上一篇解决了数据持久化，这一篇让 API 能连上数据库。

**结尾过渡**：现在两个容器能通信了，但每次都要手动创建网络、启动容器、挂载 Volume……参数又长又容易出错。下一篇的 Docker Compose 就是来终结这个痛苦的。

---

### 06. Docker Compose：一条命令启动一切

**核心问题**：手动 `docker run` 一长串参数太痛苦了，有没有更优雅的方式管理多个容器？

**主线案例**：用一个 `docker-compose.yml` 文件定义订单 API 的完整技术栈（API + PostgreSQL + Nginx），一条 `docker compose up` 全部启动。

**内容要点**：

- 从手动操作到声明式配置：对比之前手动 `docker run` 和 Compose 的写法
- `docker-compose.yml` 的核心结构：`services`、`volumes`、`networks`
- 服务定义：image、build、ports、environment、depends_on、volumes
- `depends_on` 的局限：它只保证启动顺序，不保证服务就绪
- `docker compose up / down / ps / logs` 的实际使用
- Compose 文件的变量替换：用 `.env` 文件管理配置
- 开发体验优化：Bind Mount 挂载源代码，改代码自动重启
- 项目命名：`-p` 参数和 `COMPOSE_PROJECT_NAME` 的作用

**与前篇关联**：前几篇手动操作网络、Volume、容器启动，这一篇用 Compose 把一切自动化。

**结尾过渡**：开发环境搞定了，但生产环境还需要健康检查、资源限制、日志配置。下一篇把 Compose 配置推向生产级。

---

## 进阶篇（07-09）

### 07. Compose 进阶：走向生产环境

**核心问题**：开发环境 `docker compose up` 就够了，但生产环境需要健康检查、资源限制、日志管理，怎么做？

**主线案例**：给订单 API 的 Compose 配置加上 Redis 缓存层，同时补上生产环境必备的健康检查和资源限制。

**内容要点**：

- 加入 Redis 服务：为什么订单查询需要缓存（热点商品数据）
- 健康检查：`healthcheck` 配置，`depends_on` 的 `condition: service_healthy`
- 资源限制：`deploy.resources.limits`，防止一个服务吃掉所有内存
- 日志配置：`logging` 驱动，`max-size` 和 `max-file` 防止磁盘爆满
- 多环境配置：`docker-compose.override.yml` 的使用模式
- 服务扩展：`docker compose up --scale api=3`，Nginx 负载均衡配置
- 重启策略：`restart: unless-stopped` 的含义和选择
- 完整的生产级 `docker-compose.yml`：包含所有上述配置的最终版本

**与前篇关联**：上一篇用 Compose 搭建了基本的多服务架构，这一篇加入 Redis 并完善生产配置。

**结尾过渡**：功能完善了，但看看 `docker images`，你的 API 镜像有 1.2GB——这也太大了。下一篇来瘦身。

---

### 08. 镜像优化：从 1.2GB 到 80MB

**核心问题**：一个简单的 Node.js API 镜像为什么有 1.2GB？能不能小一点？

**主线案例**：对订单 API 的 Dockerfile 一步步优化，每次优化后对比镜像大小和构建时间。

**内容要点**：

- 先看现状：`docker images` 看到当前镜像大小，用 `docker history` 分析每一层
- 第一步：换基础镜像，`ubuntu` → `node:20-slim`（700MB → 350MB）
- 第二步：用 Alpine，`node:20-slim` → `node:20-alpine`（350MB → 180MB）
- 第三步：多阶段构建，编译依赖留在构建阶段（180MB → 120MB）
- 第四步：`.dockerignore` 精简，不把测试文件和文档打进去（120MB → 95MB）
- 第五步：`npm ci --omit=dev`，不装开发依赖（95MB → 80MB）
- Alpine 的坑：`glibc` vs `musl libc`，某些 npm 包在 Alpine 上编译失败怎么办
- distroless 镜像：极致安全的选择，但没有 shell，调试困难
- 用 `docker build --progress=plain` 看构建细节，用 `dive` 工具分析镜像层
- 镜像体积不是唯一指标：安全性和可调试性也需要权衡

**与前篇关联**：上一篇加入了完整的生产配置，这一篇优化镜像大小。

**结尾过渡**：镜像又小又快了，但安全呢？容器里跑的是 root 用户，万一被攻破了呢？下一篇讲安全加固。

---

### 09. 安全与监控：加固你的容器

**核心问题**：容器里的进程默认以 root 运行，镜像里可能有已知漏洞，服务挂了你不知道——怎么让容器更安全、更可观测？

**主线案例**：给订单 API 的镜像做安全扫描，修复漏洞，加上资源监控和告警。

**内容要点**：

- 非 root 运行：`USER` 指令，创建专用用户，为什么这很重要
- 镜像漏洞扫描：`docker scout` 和 `trivy` 的使用，怎么处理扫描结果
- 最小权限：不装 `curl`、`vim` 等调试工具到生产镜像
- 敏感信息管理：不要把密码写在 Dockerfile 或 docker-compose.yml 里
  - 环境变量文件 `.env`
  - Docker Secrets
- 资源监控：`docker stats` 的实时查看，理解 CPU、内存、网络 I/O 指标
- Prometheus + Grafana 监控栈：用 Compose 跑一个轻量监控（不展开讲 K8s 的方案）
- 容器日志：`docker compose logs` 的过滤和查看技巧
- 安全不是一次性的事：定期更新基础镜像、CI 中自动扫描

**与前篇关联**：上一篇优化了镜像大小，这一篇关注安全性和可观测性。

**结尾过渡**：开发环境已经足够好了，但每次发布还要手动 `docker build`、`docker push`。下一篇让 CI/CD 自动完成这些。

---

## 实战篇（10-12）

### 10. CI/CD：自动构建与部署

**核心问题**：每次发版都要手动 SSH 到服务器 `docker pull`、`docker compose up`，能不能自动化？

**主线案例**：用 GitHub Actions 实现推送代码后自动构建镜像、推送到 Docker Hub、部署到服务器。

**内容要点**：

- 手动部署的痛点：SSH、拉镜像、重启、等健康检查……容易出错
- GitHub Actions 基础：workflow 文件结构、触发条件、jobs 和 steps
- 构建步骤：checkout 代码 → 登录 Docker Hub → `docker build` → `docker push`
- 镜像标签策略：`git sha`、`latest`、语义化版本，怎么选
- 多阶段构建在 CI 中的缓存：`cache-from` 和 `cache-to`，加速构建
- 自动部署：SSH 到服务器 → `docker compose pull` → `docker compose up -d`
- 部署后验证：健康检查 + 自动回滚
- 完整的 workflow 文件：包含构建、推送、部署、验证

**与前篇关联**：前几篇做好了容器化和安全加固，这一篇实现自动化部署。

**结尾过渡**：自动化搞定了，但生产环境终究会出问题。最后一篇实战内容：故障排查。

---

### 11. 故障排查：真实生产环境的排坑指南

**核心问题**：容器起不来、服务连不上、内存爆了——生产环境出了问题怎么快速定位？

**主线案例**：订单 API 在生产环境中遇到的一系列真实问题：容器启动失败、数据库连接超时、内存泄漏导致 OOM。

**内容要点**：

- 排查思路：先看日志 → 再看状态 → 最后深入容器内部
- 容器启动失败：`docker compose logs` 看报错，常见的几种原因
  - 端口被占用
  - 环境变量缺失
  - 依赖服务没就绪
- 数据库连接超时：`depends_on` 的陷阱，健康检查的重要性
- 容器不断重启：`docker inspect` 看退出码，`restart: on-failure` 的重启循环
- OOM Killed：怎么看 `docker stats`，怎么设置合理的内存限制
- 磁写满：日志轮转没配、Volume 数据无限增长
- 进入容器调试：`docker exec` 的几种用法，`--entrypoint /bin/sh` 临时覆盖
- `docker system df` 和 `docker system prune`：清理无用资源
- 网络问题排查：`docker network inspect`、DNS 解析测试

**与前篇关联**：上一篇实现了自动化部署，这一篇教你怎么处理部署后可能出现的问题。

**结尾过渡**：你现在已经能独立用 Docker 完成从开发到部署的全流程了。但如果你的服务需要跑在多台机器上、需要自动扩缩容呢？最后一篇聊聊 Docker 的边界和 Kubernetes。

---

### 12. 从 Docker 到 Kubernetes

**核心问题**：单机 Docker Compose 够用了，但服务要上多台机器、要自动扩缩容——Docker 的能力边界在哪？

**主线案例**：订单 API 的流量越来越大，单台服务器扛不住了，需要多机部署。

**内容要点**：

- Docker Compose 的边界：单机、手动扩缩容、没有自愈能力
- 什么时候需要 Kubernetes：多机部署、自动扩缩容、滚动更新、服务发现
- K8s 核心概念用 Docker 类比：Pod ≈ 容器 + 共享网络，Service ≈ 内部负载均衡，Deployment ≈ 带健康检查的 Compose 服务
- Docker Swarm：Docker 自带的编排工具，为什么没能成为主流
- 什么时候不需要 K8s：中小项目、内部工具、单机部署
- 从 Docker 到 K8s 的学习路径建议
- 云平台的托管 K8s：EKS、GKE、ACK 的选择

**与前篇关联**：系列收尾篇，总结全系列学到的内容，展望下一步。

**结尾**：Docker 不是终点，而是起点。掌握了容器化的思维方式，无论是用 Compose 还是 K8s，你都能快速上手。

---

## 学习路径图

```
┌─────────────────────────────────────────────┐
│         Docker 学习路径                      │
└─────────────────────────────────────────────┘

基础篇（01-02）：建立直觉
├── 为什么需要 Docker ──→ 理解容器化的价值
└── 第一个容器 ─────────→ 会用 Docker 跑服务

核心篇（03-06）：容器化思维
├── Dockerfile ─────────→ 把应用打包成镜像
├── 数据持久化 ─────────→ 解决数据丢失问题
├── 容器网络 ───────────→ 服务间通信
└── Docker Compose ─────→ 多服务一键编排

进阶篇（07-09）：生产就绪
├── Compose 进阶 ───────→ 生产级配置
├── 镜像优化 ───────────→ 体积与构建速度
└── 安全与监控 ─────────→ 加固与可观测性

实战篇（10-12）：从开发到生产
├── CI/CD ──────────────→ 自动化部署
├── 故障排查 ───────────→ 真实问题定位
└── Docker → K8s ───────→ 展望下一步
```

---

## 预期学习效果

完成本系列后，你将具备：

- **理解容器化思维**：知道什么时候该用 Docker、什么时候不需要
- **容器化自己的应用**：能从零编写 Dockerfile，构建出优化的镜像
- **多服务编排**：用 Docker Compose 管理包含数据库、缓存、API 的完整技术栈
- **生产环境部署**：健康检查、资源限制、日志管理、安全加固
- **自动化 CI/CD**：代码推送后自动构建、推送、部署
- **故障排查能力**：能独立定位容器相关的常见问题
- **技术选型判断**：知道 Docker Compose 和 Kubernetes 各自的适用场景

---

## 版本信息

- Docker Engine 27.x+
- Docker Compose V2（内置于 Docker CLI）
- 所有命令和配置基于 2025 年最新稳定版本
