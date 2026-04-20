# DevOps 实战指南

## 背景

你写了一个 Web 应用（API 服务），在本地跑得好好的。但部署到生产环境时，问题接踵而至：

- 买了一台云服务器，不知道怎么配置才安全
- 应用跑在 3000 端口，用户不可能访问 3000 端口
- 每次部署都要 SSH 上去手动操作，容易出错
- 一台服务器扛不住了，要水平扩展
- 上线了但不知道系统运行状况，出了问题全靠用户反馈
- 手动创建服务器、配置网络，换个人就搭不出一样的环境

这些问题不是孤立的——它们是一条链路：从一台服务器开始，逐步搭建出完整的 DevOps 体系。

Docker 的知识已经在 [Docker 系列](/posts/docker/01-docker-introduction) 中覆盖了，本系列不再重复。本系列从 Docker 之后的环节开始：**你已经有 Docker 镜像了，接下来怎么把它安全、可靠、高效地部署到生产环境？**

### 技术栈

| 技术                 | 说明                      |
| -------------------- | ------------------------- |
| Linux (Ubuntu 22.04) | 服务器操作系统            |
| Nginx                | 反向代理、负载均衡、HTTPS |
| GitHub Actions       | CI/CD 流水线              |
| Kubernetes           | 容器编排                  |
| ArgoCD               | GitOps 持续部署           |
| Prometheus + Grafana | 监控告警                  |
| Terraform            | 基础设施即代码            |

> 本系列面向有 Linux 基础（会命令行操作）和 Docker 基础（会 build 和 run 镜像）的开发者。如果你没用过 Docker，建议先看 [Docker 系列](/posts/docker/01-docker-introduction)。

---

## 主线案例：部署 FlowAPI 到生产环境

整个系列围绕一个真实的部署旅程展开：你有一个叫 **FlowAPI** 的 REST API 服务（Node.js + TypeScript），已经容器化了。现在要把它从本地开发环境部署到生产环境，逐步搭建出完整的 DevOps 体系。

**FlowAPI 的特点**：

- REST API 服务，监听 3000 端口
- Docker 镜像已构建好（`flowapi:latest`）
- 有单元测试和集成测试
- 需要 PostgreSQL 数据库
- 日志输出到 stdout

**部署旅程**：

```
第 1 篇：租了一台空服务器 → Linux 基础配置
第 2 篇：应用能跑了，但端口不安全 → Nginx 反向代理 + HTTPS
第 3 篇：每次部署都手动操作 → GitHub Actions CI/CD
第 4 篇：一台服务器扛不住了 → Kubernetes 容器编排
第 5 篇：K8s 跑起来了但配置默认的 → 生产级 K8s 配置
第 6 篇：kubectl apply 太手动 → GitOps + ArgoCD
第 7 篇：上线了但不知道运行状况 → Prometheus + Grafana 监控
第 8 篇：手动创建资源太慢 → Terraform IaC
第 9 篇：安全不是某一个环节的事 → 全链路安全加固
第 10 篇：综合回顾 → 生产运维的日常
```

每篇文章解决一个真实痛点，下一篇基于上一篇的结果继续。

---

## 系列节奏

```
基础篇（01-03）：从一台服务器到自动化部署
  → Linux 基础、Nginx 反向代理、CI/CD 流水线

编排篇（04-06）：从单机到集群
  → Kubernetes 入门、生产配置、GitOps

可观测与自动化（07-08）：从黑盒到可见
  → 监控告警、基础设施即代码

安全与综合（09-10）：从能用到的安全
  → 全链路安全、生产运维实战
```

---

## 博客目录结构

```
content/posts/devops/
├── plan.md
├── 01-linux-server-setup.mdx         # 从一台空服务器开始
├── 02-nginx-reverse-proxy.mdx        # Nginx：应用的前门
├── 03-github-actions-cicd.mdx        # 自动化部署：CI/CD 流水线
├── 04-kubernetes-essentials.mdx      # 容器编排：Kubernetes 入门
├── 05-kubernetes-production.mdx      # Kubernetes 生产就绪
├── 06-gitops-argocd.mdx              # 声明式部署：GitOps 与 ArgoCD
├── 07-prometheus-grafana.mdx         # 可观测性：监控与告警
├── 08-terraform-iac.mdx              # 基础设施即代码：Terraform
├── 09-security-hardening.mdx         # 全链路安全加固
├── 10-production-operations.mdx      # 生产运维实战与综合回顾
```

---

## 基础篇：从一台服务器到自动化部署（01-03）

---

### 01. 从一台空服务器开始：Linux 基础配置

**核心问题**：你买了一台云服务器（Ubuntu 22.04），拿到 IP 和密码。怎么把它变成能跑应用的生产环境？默认配置有哪些安全风险？

**主线案例**：初始化 FlowAPI 的生产服务器——SSH 加固、创建应用用户、配置防火墙、安装 Docker、部署第一个容器。

**内容要点**：

- SSH 安全加固：禁用密码登录、改端口、密钥认证
- 用户管理：创建应用用户、sudo 权限控制
- 防火墙：ufw 配置，只开放必要端口（22、80、443）
- 系统更新和安全补丁
- 安装 Docker：在服务器上拉起 FlowAPI 容器
- 基础监控：systemd 服务管理、日志查看
- 为什么不要用 root 运行应用

**与前篇关联**：系列第一篇，无前篇。但假设读者已有 Docker 基础。

---

### 02. Nginx：应用的前门

**核心问题**：FlowAPI 跑在 3000 端口，用户不会访问 `example.com:3000`。你需要反向代理、HTTPS 证书、静态文件缓存。

**主线案例**：给 FlowAPI 配置 Nginx——反向代理到 3000 端口、申请 Let's Encrypt 证书、配置 HTTPS。

**内容要点**：

- 为什么需要反向代理（不是直接暴露应用端口）
- Nginx 安装和基本配置
- 反向代理配置：proxy_pass、proxy_set_header
- HTTPS：Let's Encrypt + Certbot 自动续签
- 安全头：CSP、HSTS、X-Frame-Options
- Gzip 压缩和静态资源缓存
- 日志配置和基础调优
- 多应用部署：不同域名路由到不同服务

**与前篇关联**：上一篇服务器能跑了，FlowAPI 容器在 3000 端口监听。这篇让用户能通过 HTTPS 域名访问。

---

### 03. 自动化部署：GitHub Actions CI/CD

**核心问题**：每次部署都要 SSH 到服务器、拉镜像、重启容器。手动操作容易出错，而且团队里每个人都要能部署。

**主线案例**：为 FlowAPI 搭建 CI/CD 流水线——push 到 main 分支自动构建测试、通过后部署到服务器。

**内容要点**：

- CI/CD 的核心概念：持续集成 vs 持续部署
- GitHub Actions 基础：workflow、job、step
- FlowAPI 的 CI 流水线：lint、test、build Docker image
- CD 流水线：SSH 部署到服务器
- 环境变量和密钥管理：GitHub Secrets
- 部署策略：蓝绿部署的基本思路
- 流水线安全：最小权限原则、pin action 版本
- 构建产物缓存加速

**与前篇关联**：上一篇手动部署成功了，这篇把部署过程自动化。

---

## 编排篇：从单机到集群（04-06）

---

### 04. 容器编排：Kubernetes 入门

**核心问题**：一台服务器扛不住了——FlowAPI 的流量增长，需要多台服务器、自动扩缩容。手动管理多台服务器上的容器太痛苦。

**主线案例**：用 minikube 搭建本地 K8s 环境，把 FlowAPI 部署到 K8s——Deployment、Service、ConfigMap。

**内容要点**：

- 为什么需要 K8s（而不是多台服务器 + Nginx 负载均衡）
- K8s 核心概念：Pod、Deployment、Service、Namespace
- 用 minikube 搭建本地环境
- 编写 FlowAPI 的 Deployment YAML
- Service 类型：ClusterIP、NodePort、LoadBalancer
- ConfigMap 和 Secret：配置和密钥管理
- kubectl 常用命令
- 和 Docker Compose 的区别

**与前篇关联**：前 3 篇是单机部署。流量增长后单机不够用，引入 K8s 做容器编排。

---

### 05. Kubernetes 生产就绪

**核心问题**：K8s 跑起来了，但 Pod 没有资源限制、Secret 是明文的、网络没有隔离。这样的集群不能上生产。

**主线案例**：把 FlowAPI 的 K8s 配置从"能跑"升级到"生产就绪"——资源限制、健康检查、安全配置。

**内容要点**：

- 资源请求和限制：requests 和 limits，防止一个 Pod 吃掉所有资源
- 健康检查：livenessProbe 和 readinessProbe
- Pod 安全：SecurityContext、非 root 运行
- Secret 管理：不用明文、external-secrets
- 网络策略：NetworkPolicy 基础
- RBAC 基础：ServiceAccount、Role
- 滚动更新策略：maxSurge、maxUnavailable
- 多环境管理：dev、staging、production Namespace

**与前篇关联**：上一篇 FlowAPI 跑在 K8s 上了，但配置是开发模式。这篇升级为生产配置。

---

### 06. 声明式部署：GitOps 与 ArgoCD

**核心问题**：K8s 的配置用 YAML 文件管理，但 `kubectl apply` 是手动的。多人协作时，服务器上的配置和 Git 仓库里的不一致——配置漂移。

**主线案例**：用 ArgoCD 实现 GitOps——把 K8s 配置存在 Git 仓库里，ArgoCD 自动同步到集群。

**内容要点**：

- GitOps 理念：Git 作为单一事实来源
- ArgoCD 安装和配置
- Application CRD：连接 Git 仓库和 K8s 集群
- 自动同步和自愈：配置漂移时自动修正
- 多环境管理：dev/staging/production 的 Application
- Rollback：Git 回滚 = K8s 回滚
- ArgoCD vs Flux：简要对比
- 和 CI/CD 流水线的配合

**与前篇关联**：前两篇用 kubectl 手动管理 K8s。这篇引入 GitOps，实现声明式、自动化的部署。

---

## 可观测与自动化（07-08）

---

### 07. 可观测性：Prometheus + Grafana

**核心问题**：FlowAPI 上线了，但不知道 QPS、错误率、响应时间、CPU 使用率。出了问题全靠用户反馈。

**主线案例**：为 FlowAPI 搭建监控系统——Prometheus 采集指标、Grafana 可视化、AlertManager 告警。

**内容要点**：

- 可观测性三支柱：指标、日志、链路追踪
- Prometheus 架构：pull 模式、scrape 配置、存储
- 应用指标：Node.js 如何暴露 Prometheus 指标
- Grafana Dashboard：QPS、延迟分布、错误率
- 告警规则：PromQL、AlertManager、通知渠道
- K8s 监控：kube-state-metrics、node-exporter
- 黑盒监控：探针、DNS 检查
- 监控的成本：存储规划、采样率

**与前篇关联**：前 6 篇把 FlowAPI 部署好了。这篇加上监控，让你知道系统运行状况。

---

### 08. 基础设施即代码：Terraform

**核心问题**：云服务器、K8s 集群、网络配置都是手动创建的。换一个人搭不出一样的环境，换一个云厂商要重新来一遍。

**主线案例**：用 Terraform 在云平台上创建 FlowAPI 需要的所有基础设施——VPC、服务器、K8s 集群。

**内容要点**：

- IaC 的理念：为什么用代码管理基础设施
- Terraform 基础：provider、resource、variable、output
- 创建云服务器（EC2/阿里云 ECS）
- 创建 K8s 集群
- 状态管理：remote state、state lock
- 变量和模块化：DRY 原则
- 计划和执行：plan、apply、destroy
- Terraform vs Pulumi：简要对比

**与前篇关联**：前 7 篇假设基础设施已经存在。这篇回到最底层——用代码创建基础设施。

---

## 安全与综合（09-10）

---

### 09. 全链路安全加固

**核心问题**：安全不是某一个环节的事。SSH 加固了但 CI/CD 里硬编码了密钥、K8s 配了 RBAC 但镜像没有扫描。

**主线案例**：审查 FlowAPI 整条部署链路的安全——从代码仓库到服务器到 K8s 集群。

**内容要点**：

- 安全审计：逐层检查部署链路
- CI/CD 供应链安全：依赖扫描、镜像签名、pin action 版本
- 容器安全：镜像扫描（Trivy）、非 root 运行、只读文件系统
- K8s 安全：RBAC、NetworkPolicy、Pod Security Standards
- 密钥管理：不把密钥提交到 Git、Secret rotation
- 网络安全：TLS everywhere、mTLS（简述）
- 日志审计：谁在什么时候做了什么操作
- 安全不是一次性的事：持续审计和自动化检查

**与前篇关联**：前 8 篇每篇都提到了安全，但这篇把安全作为一个整体来看待。

---

### 10. 生产运维实战与综合回顾

**核心问题**：所有组件都就位了。日常运维要做什么？出了故障怎么排查？

**主线案例**：FlowAPI 上线后的第一天——日常巡检、处理一个真实故障、回顾整个部署旅程。

**内容要点**：

- 日常运维：健康检查、日志查看、证书续期
- 故障排查思路：从监控告警到定位根因
- 扩缩容策略：HPA（水平 Pod 自动扩缩）
- 备份与恢复：数据库备份、K8s 资源备份
- 成本优化：资源使用率分析、Spot 实例
- 运维自动化：告警自愈、自动回滚
- 系列回顾：10 篇文章的知识脉络

**与前篇关联**：前 9 篇搭建了完整的 DevOps 体系。这篇从"建设者"视角切换到"维护者"视角。

---

## 预期效果

完成本系列后，你将能够：

- 从零配置一台安全的 Linux 服务器
- 用 Nginx 配置反向代理和 HTTPS
- 搭建 CI/CD 流水线实现自动化部署
- 用 Kubernetes 编排容器化应用
- 用 ArgoCD 实现声明式部署
- 搭建 Prometheus + Grafana 监控告警系统
- 用 Terraform 管理基础设施
- 具备全链路安全审计的能力

---

## 版本信息

- **Linux**：Ubuntu 22.04 LTS
- **Nginx**：1.24+
- **Kubernetes**：1.29+
- **GitHub Actions**：最新版
- **ArgoCD**：2.10+
- **Prometheus**：2.50+
- **Grafana**：10.x
- **Terraform**：1.7+
