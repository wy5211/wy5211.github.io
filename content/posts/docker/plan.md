# Docker 从入门到实战学习计划

## 背景

本计划旨在通过一系列结构化的博客文章，帮助读者从零开始掌握 Docker 容器技术。文章采用渐进式设计，从核心概念到生产级实践，每篇文章都包含丰富的实战示例和最佳实践。

**为什么选择 Docker**：

- 🐳 **容器化标准**：业界事实上的容器标准
- ⚡ **快速部署**：秒级启动应用
- 🔄 **环境一致**：消除"在我机器上能跑"的问题
- 📦 **微服务架构**：天然支持微服务部署
- 🚀 **DevOps 核心**：CI/CD 流水线的关键组件
- 💡 **学习曲线平缓**：上手简单，深入有深度

**核心知识点**：

- **基础**：容器概念、镜像管理、容器操作
- **网络**：桥接网络、覆盖网络、网络编排
- **存储**：数据卷、绑定挂载、存储驱动
- **编排**：Docker Compose 多容器应用
- **生产**：镜像优化、安全加固、监控日志
- **实战**：全栈应用部署、CI/CD 集成

---

## 博客目录结构

```
content/posts/运维/
├── docker-plan.md                    # 本计划文件
├── 11-docker-introduction.mdx        # Docker 核心概念
├── 12-docker-installation.mdx        # 安装与环境配置
├── 13-docker-image-basics.mdx        # 镜像基础操作
├── 14-docker-container-ops.mdx       # 容器管理实战
├── 15-dockerfile-best-practices.mdx  # Dockerfile 实践
├── 16-docker-registry.mdx            # 镜像仓库管理
├── 17-docker-volumes.mdx             # 数据持久化
├── 18-docker-networks.mdx            # 网络配置详解
├── 19-docker-compose-basics.mdx      # Compose 入门
├── 20-docker-compose-advanced.mdx    # Compose 进阶
├── 21-docker-optimization.mdx        # 镜像优化技巧
├── 22-docker-security.mdx            # 安全最佳实践
├── 23-docker-monitoring.mdx          # 监控与日志
├── 24-docker-multi-stage.mdx         # 多阶段构建
├── 25-docker-production.mdx          # 生产环境部署
├── 26-docker-ci-cd.mdx               # CI/CD 集成
├── 27-docker-troubleshooting.mdx     # 故障排查
└── 28-docker-alternatives.mdx        # Kubernetes 对比
```

> **注意**：使用 11-28 编号，避免与现有文章冲突

---

## 第一阶段：基础入门（3篇）

### 11. Docker 核心概念与架构

**目标**：理解容器技术的本质和 Docker 的核心组件

**内容要点**：

- 容器 vs 虚拟机：架构对比
- Docker 三大核心概念：镜像、容器、仓库
- Docker 架构：客户端、守护进程、容器运行时
- Linux 底层技术：Namespace、Cgroups
- 应用场景：开发、测试、部署

**实战示例**：

```bash
# 运行第一个容器
docker run hello-world

# 理解镜像分层
docker pull nginx
```

### 12. Docker 安装与开发环境配置

**目标**：在不同平台上安装 Docker 并配置开发环境

**内容要点**：

- Linux 安装（Ubuntu/CentOS）
- macOS 安装（Docker Desktop）
- Windows 安装（WSL2 后端）
- 验证安装
- 配置镜像加速器
- Docker 权限管理
- 常用配置选项

**实战示例**：

```bash
# 配置阿里云镜像加速
# 配置资源限制
# 用户权限配置
```

### 13. Docker 镜像基础操作

**目标**：掌握镜像的获取、查看和管理

**内容要点**：

- 镜像是什么：分层文件系统
- 搜索镜像：docker search
- 拉取镜像：docker pull
- 查看镜像：docker images
- 删除镜像：docker rmi
- 镜像标签管理
- 镜像导出与导入

**实战示例**：

```bash
# 搜索 Nginx 镜像
docker search nginx

# 拉取指定版本
docker pull nginx:1.24

# 查看镜像详情
docker inspect nginx:latest
```

---

## 第二阶段：容器操作（2篇）

### 14. Docker 容器管理实战

**目标**：熟练掌握容器的生命周期管理

**内容要点**：

- 创建并运行容器：docker run
- 查看容器：docker ps
- 停止/启动容器：docker stop/start
- 删除容器：docker rm
- 容器日志查看
- 进入容器：docker exec
- 资源限制与统计

**实战示例**：

```bash
# 运行 Nginx 容器
docker run -d --name my-nginx -p 8080:80 nginx

# 查看容器日志
docker logs -f my-nginx

# 进入容器
docker exec -it my-nginx /bin/bash
```

### 15. Dockerfile 最佳实践

**目标**：编写高质量的 Dockerfile

**内容要点**：

- Dockerfile 基本语法
- 常用指令：FROM、RUN、COPY、ADD、CMD、ENTRYPOINT
- 多阶段构建
- 镜像缓存优化
- 安全最佳实践
- 常见错误与陷阱

**实战示例**：

```dockerfile
# Node.js 应用多阶段构建
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["node", "server.js"]
```

---

## 第三阶段：进阶技能（5篇）

### 16. Docker 私有仓库搭建

**目标**：搭建和管理镜像仓库

**内容要点**：

- Docker Hub 公共仓库使用
- 搭建私有 Registry
- Registry 高可用配置
- 镜像安全扫描
- 访问控制与认证
- Harbor 企业级仓库

**实战示例**：

```yaml
# Docker Compose 部署 Registry
services:
  registry:
    image: registry:2
    ports:
      - "5000:5000"
    volumes:
      - ./data:/var/lib/registry
```

### 17. Docker 数据持久化

**目标**：掌握容器数据存储方案

**内容要点**：

- 容器文件系统特性
- 数据卷（Volumes）
- 绑定挂载（Bind Mounts）
- 备份与恢复
- 存储驱动选择
- 性能优化

**实战示例**：

```bash
# 创建数据卷
docker volume create mysql-data

# 挂载数据卷
docker run -d --name mysql \
  -v mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  mysql:8
```

### 18. Docker 网络配置详解

**目标**：理解并配置容器网络

**内容要点**：

- 网络驱动：bridge、host、overlay、macvlan
- 自定义桥接网络
- 容器间通信
- 端口映射
- DNS 配置
- 网络性能优化

**实战示例**：

```bash
# 创建自定义网络
docker network create my-app-network

# 连接容器到网络
docker network connect my-app-network my-container
```

### 19. Docker Compose 快速入门

**目标**：使用 Compose 编排多容器应用

**内容要点**：

- Compose 核心概念
- docker-compose.yml 语法
- 常用指令：up、down、ps、logs
- 环境变量管理
- 服务依赖关系
- 扩展服务

**实战示例**：

```yaml
version: "3.8"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
```

### 20. Docker Compose 进阶实战

**目标**：使用 Compose 部署复杂应用

**内容要点**：

- 多环境配置
- 健康检查
- 资源限制
- 日志配置
- 生产环境最佳实践
- 实战项目：全栈应用部署

**实战示例**：

```yaml
# 全栈应用完整配置
services:
  frontend:
    build: ./frontend
    ports: ["80:80"]
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgres://db:5432/app
  db:
    image: postgres:15
    volumes:
      - db-data:/var/lib/postgresql/data
volumes:
  db-data:
```

---

## 第四阶段：生产实践（5篇）

### 21. Docker 镜像优化技巧

**目标**：构建更小、更快的镜像

**内容要点**：

- 选择合适的基础镜像
- 多阶段构建优化
- 层缓存利用
- .dockerignore 文件
- 镜像扫描工具
- 大小对比实践

**优化前后对比**：

```dockerfile
# 优化前：1.2GB
FROM node:18
# ...应用代码...

# 优化后：150MB
FROM node:18-alpine AS builder
# ...多阶段构建...
```

### 22. Docker 安全最佳实践

**目标**：加固容器的安全性

**内容要点**：

- 镜像安全扫描
- 最小权限原则
- rootless 容器
- AppArmor/Seccomp 配置
- 敏感信息管理
- 安全基线检查

**安全配置示例**：

```dockerfile
FROM node:18-alpine
# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs
```

### 23. Docker 监控与日志

**目标**：建立容器监控体系

**内容要点**：

- 容器日志收集
- 资源监控：CPU、内存、磁盘
- Prometheus + Grafana
- cAdvisor 监控
- 日志驱动配置
- 告警规则

**监控栈配置**：

```yaml
services:
  prometheus:
    image: prom/prometheus
  grafana:
    image: grafana/grafana
  cadvisor:
    image: google/cadvisor
```

### 24. Docker 多阶段构建深入

**目标**：掌握复杂应用的构建流程

**内容要点**：

- 多阶段构建原理
- 构建缓存优化
- 跨平台编译
- 私有依赖处理
- CI/CD 集成
- 实战案例

**复杂构建示例**：

```dockerfile
# 编译阶段
FROM golang:1.21 AS builder
# ...编译代码...

# 运行阶段
FROM alpine:3.19
COPY --from=builder /app/main /app/main
CMD ["/app/main"]
```

### 25. Docker 生产环境部署

**目标**：在生产环境稳定运行容器

**内容要点**：

- 健康检查配置
- 自动重启策略
- 滚动更新
- 回滚策略
- 资源配额管理
- 高可用部署

**生产配置示例**：

```yaml
services:
  app:
    image: myapp:1.0
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
```

---

## 第五阶段：高级话题（3篇）

### 26. Docker CI/CD 集成

**目标**：将 Docker 集成到 CI/CD 流水线

**内容要点**：

- GitHub Actions 配置
- GitLab CI/CD 集成
- 镜像自动构建
- 版本标签策略
- 测试与部署
- 最佳实践

**CI 配置示例**：

```yaml
name: Docker
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build image
        run: docker build . -t myapp:${{ github.sha }}
```

### 27. Docker 故障排查指南

**目标**：快速定位和解决常见问题

**内容要点**：

- 容器启动失败
- 网络连接问题
- 存储性能问题
- 资源泄漏排查
- 日志分析技巧
- 常用调试命令

**排查工具**：

```bash
# 查看容器详情
docker inspect <container>

# 查看资源使用
docker stats

# 导出容器文件系统
docker export <container> | tar -t
```

### 28. Docker vs Kubernetes

**目标**：了解容器编排的演进方向

**内容要点**：

- Docker Compose 局限性
- Kubernetes 核心概念
- K8s vs Docker Swarm
- 迁移策略
- 学习路径建议
- 未来发展趋势

**对比表格**：
| 特性 | Docker Compose | Kubernetes |
|------|----------------|------------|
| 集群管理 | ❌ | ✅ |
| 自动扩缩容 | ❌ | ✅ |
| 服务发现 | ❌ | ✅ |
| 学习曲线 | 低 | 高 |

---

## 学习路径图

```
┌─────────────────────────────────────────────┐
│         Docker 学习路径                      │
└─────────────────────────────────────────────┘

第一阶段：基础入门
├── 核心概念与架构 ──→ 容器本质理解
├── 安装配置 ────────→ 环境准备完成
└── 镜像操作 ────────→ 掌握镜像管理

第二阶段：容器操作
├── 容器管理 ────────→ 生命周期控制
└── Dockerfile ─────→ 自定义镜像

第三阶段：进阶技能
├── 私有仓库 ────────→ 镜像存储
├── 数据持久化 ──────→ 数据管理
├── 网络配置 ────────→ 容器通信
├── Compose 入门 ────→ 多容器编排
└── Compose 进阶 ────→ 复杂应用

第四阶段：生产实践
├── 镜像优化 ────────→ 提升性能
├── 安全加固 ────────→ 安全防护
├── 监控日志 ────────→ 可观测性
├── 多阶段构建 ──────→ 复杂构建
└── 生产部署 ────────→ 上线实战

第五阶段：高级话题
├── CI/CD 集成 ──────→ 自动化
├── 故障排查 ────────→ 问题解决
└── K8s 对比 ─────────→ 下一步
```

---

## 写作规范

### 文章结构模板

```markdown
---
title: "序号 文章标题"
date: "2025-03-23"
summary: "一句话总结（80字以内）"
tags: ["标签1", "标签2", "Docker"]
category: "运维"
cover: ""
draft: false
series: "Docker 从入门到实战"
seriesOrder: N
---

# 主标题

## 前言

用简短的语言说明为什么需要学习这个主题，它解决了什么问题。

## 核心概念

用通俗易懂的语言解释，配合图示和代码示例。

## 实战演练

提供完整可运行的示例，并详细解释每个步骤。

## 最佳实践

总结 3-5 个关键要点，帮助读者避免常见陷阱。

## 常见问题

Q&A 格式，解答学习中的疑惑。

## 总结

回顾核心内容，强调重点。

## 下一步

提示下一篇的学习内容。
```

### 代码示例要求

1. ✅ **可运行**：所有代码都经过测试
2. ✅ **注释清晰**：关键步骤添加中文注释
3. ✅ **版本明确**：注明 Docker 版本要求
4. ✅ **错误处理**：展示常见错误及解决方案
5. ✅ **渐进式**：从简单到复杂

### 格式规范

- 使用 Markdown 格式
- 代码块指定语言（bash、yaml、dockerfile）
- 命令输出使用引用块
- 重要提示使用高亮框
- 适当使用表格对比

---

## 预期学习效果

完成本系列学习后，读者将具备：

- ✅ **理解容器技术**：掌握 Docker 核心原理
- ✅ **独立开发**：能够容器化自己的应用
- ✅ **多容器编排**：使用 Compose 部署复杂应用
- ✅ **生产部署**：掌握生产环境最佳实践
- ✅ **问题排查**：快速定位和解决常见问题
- ✅ **进阶学习**：为学习 Kubernetes 打下基础

---

## 适用人群

- 🎯 **后端开发者**：提升应用部署能力
- 🎯 **运维工程师**：掌握容器化技术
- 🎯 **全栈工程师**：完善技术栈
- 🎯 **DevOps 工程师**：CI/CD 核心技能
- 🎯 **技术爱好者**：学习前沿技术

---

## 学习时间规划

- **每篇文章**：30-45 分钟阅读 + 30 分钟实践
- **总计时长**：约 18-24 小时
- **学习建议**：每天 1-2 篇，2-3 周完成

---

## 配套资源

- **示例代码**：每篇文章提供完整示例
- **Dockerfile 模板**：常用语言的优化模板
- **Compose 配置**：典型应用场景的完整配置
- **检查清单**：生产环境部署清单
