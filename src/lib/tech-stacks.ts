// 技术栈配置文件
// 将相关技术整合到一起，提供技术栈全貌视图和学习路径

export interface LearningPathStep {
  order: number;
  title: string;
  category: string;
  description: string;
  estimatedTime: string;
}

export interface TechStack {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string; // Tailwind 渐变色类名
  categories: string[]; // 关联的分类
  learningPath: LearningPathStep[];
  relatedStacks: string[]; // 相关技术栈的 ID
}

// 技术栈配置
export const techStacks: TechStack[] = [
  {
    id: "programming-languages",
    slug: "programming-languages",
    name: "编程语言基础",
    description: "掌握现代编程语言的核心语法和特性，为后续学习打下坚实基础",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    categories: ["java", "golang", "typescript"],
    learningPath: [
      {
        order: 1,
        title: "Java 核心语法",
        category: "java",
        description: "面向对象编程、集合框架、异常处理、IO流",
        estimatedTime: "3周",
      },
      {
        order: 2,
        title: "Go 语言实战",
        category: "golang",
        description: "并发编程、goroutine、channel、标准库",
        estimatedTime: "2周",
      },
      {
        order: 3,
        title: "TypeScript 进阶",
        category: "typescript",
        description: "类型系统、泛型、装饰器、工程化实践",
        estimatedTime: "2周",
      },
    ],
    relatedStacks: ["java-fullstack", "nodejs-backend", "frontend-tooling"],
  },
  {
    id: "backend-core",
    slug: "backend-core",
    name: "后端核心技术",
    description:
      "掌握后端开发的核心技术，包括鉴权、API设计、安全、消息队列等通用技能",
    icon: "🔐",
    color: "from-amber-500 to-orange-500",
    categories: ["后端"],
    learningPath: [
      {
        order: 1,
        title: "用户认证与鉴权",
        category: "后端",
        description: "JWT、Session、OAuth2.0、SSO单点登录",
        estimatedTime: "2周",
      },
      {
        order: 2,
        title: "API 设计与安全",
        category: "后端",
        description: "RESTful API、GraphQL、API网关、限流熔断",
        estimatedTime: "2周",
      },
      {
        order: 3,
        title: "消息队列与缓存",
        category: "后端",
        description: "RabbitMQ、Redis缓存策略",
        estimatedTime: "2周",
      },
      {
        order: 4,
        title: "微服务架构",
        category: "后端",
        description: "服务拆分、服务发现、负载均衡、分布式事务",
        estimatedTime: "3周",
      },
    ],
    relatedStacks: [
      "programming-languages",
      "java-fullstack",
      "nodejs-backend",
      "database-tech",
      "devops-tools",
    ],
  },
  {
    id: "java-fullstack",
    slug: "java-fullstack",
    name: "Java 全栈开发",
    description:
      "使用 Java 生态构建企业级后端应用，涵盖 Spring Boot 和 MyBatis",
    icon: "☕",
    color: "from-orange-500 to-red-500",
    categories: ["springboot", "mybatis"],
    learningPath: [
      {
        order: 1,
        title: "Spring Boot 快速入门",
        category: "springboot",
        description: "自动配置、Starter 依赖、RESTful API 开发",
        estimatedTime: "2周",
      },
      {
        order: 2,
        title: "MyBatis 持久层框架",
        category: "mybatis",
        description: "SQL 映射、动态 SQL、缓存机制",
        estimatedTime: "2周",
      },
    ],
    relatedStacks: [
      "programming-languages",
      "backend-core",
      "database-tech",
      "devops-tools",
    ],
  },
  {
    id: "nodejs-backend",
    slug: "nodejs-backend",
    name: "Node.js 后端开发",
    description:
      "使用 Node.js 生态构建高性能后端服务，涵盖 NestJS、Hono 和 Prisma",
    icon: "🟢",
    color: "from-green-500 to-emerald-500",
    categories: ["nestjs", "hono", "prisma", "trpc"],
    learningPath: [
      {
        order: 1,
        title: "NestJS 企业级框架",
        category: "nestjs",
        description: "模块化架构、依赖注入、装饰器、中间件",
        estimatedTime: "3周",
      },
      {
        order: 2,
        title: "Hono 轻量级框架",
        category: "hono",
        description: "类型安全、边缘计算、高性能路由",
        estimatedTime: "1周",
      },
      {
        order: 3,
        title: "Prisma ORM",
        category: "prisma",
        description: "数据建模、迁移、类型安全的数据库访问",
        estimatedTime: "2周",
      },
    ],
    relatedStacks: ["programming-languages", "backend-core", "database-tech"],
  },
  {
    id: "frontend-tooling",
    slug: "frontend-tooling",
    name: "前端工程化",
    description: "掌握现代前端工程化工具，提升开发效率和构建性能",
    icon: "⚡",
    color: "from-purple-500 to-pink-500",
    categories: ["vite", "nextjs"],
    learningPath: [
      {
        order: 1,
        title: "Vite 构建工具",
        category: "vite",
        description: "快速开发服务器、HMR、插件系统、生产优化",
        estimatedTime: "2周",
      },
      {
        order: 2,
        title: "Next.js 全栈框架",
        category: "nextjs",
        description: "SSR/SSG、App Router、服务端组件、路由",
        estimatedTime: "3周",
      },
    ],
    relatedStacks: ["programming-languages", "nodejs-backend"],
  },
  {
    id: "database-tech",
    slug: "database-tech",
    name: "数据库技术",
    description: "掌握关系型和非关系型数据库的核心原理和实践",
    icon: "🗄️",
    color: "from-indigo-500 to-blue-500",
    categories: ["mysql", "redis", "mongoose"],
    learningPath: [
      {
        order: 1,
        title: "MySQL 关系型数据库",
        category: "mysql",
        description: "SQL 基础、索引优化、事务、锁机制",
        estimatedTime: "3周",
      },
      {
        order: 2,
        title: "Redis 缓存数据库",
        category: "redis",
        description: "数据结构、持久化、集群、缓存策略",
        estimatedTime: "2周",
      },
      {
        order: 3,
        title: "Mongoose MongoDB",
        category: "mongoose",
        description: "Schema 设计、查询构建、中间件、聚合",
        estimatedTime: "2周",
      },
    ],
    relatedStacks: ["java-fullstack", "nodejs-backend", "devops-tools"],
  },
  {
    id: "devops-tools",
    slug: "devops-tools",
    name: "DevOps 工具",
    description: "容器化部署和运维自动化，提升开发效率和系统稳定性",
    icon: "🐳",
    color: "from-teal-500 to-green-500",
    categories: ["docker", "运维"],
    learningPath: [
      {
        order: 1,
        title: "Docker 容器技术",
        category: "docker",
        description: "镜像构建、容器编排、Docker Compose、网络",
        estimatedTime: "2周",
      },
      {
        order: 2,
        title: "Linux 运维实战",
        category: "运维",
        description: "Shell 脚本、系统监控、日志管理、性能优化",
        estimatedTime: "3周",
      },
    ],
    relatedStacks: ["java-fullstack", "nodejs-backend", "database-tech"],
  },
  {
    id: "productivity-tools",
    slug: "productivity-tools",
    name: "开发效率工具",
    description: "使用 AI 辅助编程工具，大幅提升开发效率和代码质量",
    icon: "🤖",
    color: "from-violet-500 to-purple-500",
    categories: ["claude-code"],
    learningPath: [
      {
        order: 1,
        title: "Claude Code 实战",
        category: "claude-code",
        description: "AI 辅助编程、自动化重构、测试生成、代码审查",
        estimatedTime: "持续学习",
      },
    ],
    relatedStacks: [
      "programming-languages",
      "java-fullstack",
      "nodejs-backend",
    ],
  },
];

// 根据 slug 获取技术栈
export function getTechStackBySlug(slug: string): TechStack | undefined {
  return techStacks.find((stack) => stack.slug === slug);
}

// 根据 id 获取技术栈
export function getTechStackById(id: string): TechStack | undefined {
  return techStacks.find((stack) => stack.id === id);
}

// 获取所有技术栈
export function getAllTechStacks(): TechStack[] {
  return techStacks;
}

// 获取相关技术栈
export function getRelatedStacks(stackId: string): TechStack[] {
  const stack = getTechStackById(stackId);
  if (!stack || !stack.relatedStacks) {
    return [];
  }
  return stack.relatedStacks
    .map((id) => getTechStackById(id))
    .filter((s): s is TechStack => s !== undefined);
}
