# Spring Boot 系列扩展状态（快照 2026-09-08）

> 用前先重新扫描：`search_files(pattern='^category:', path='content/posts')` + 各目录 plan.md。系列会增删和归档，此文件只是快照。

## 博客技术系列现状

- **springboot**（系列名「Spring Boot 实战」）：正篇 18 篇（2026-03-30 一次写成，Express 对照视角，主线案例 TechBlog CMS）+ 番外 19/20（2026-09-03）+ 番外 21 MyBatis/MyBatis-Plus（2026-09-08）
- java 20 篇、redis 18 篇、docker 12 篇、devops2 10 篇
- backend-map 已归档（`content/posts/_archived/backend-map/`，Java 后端名词地图，**勿复活该主题**）
- **mybatis：从未写过**——backend-map 的 plan 里提过但没有成文，是候选方向
- 前端系列：vite、drizzle、trpc（可作对照引用源）

## 番外模式（2026-09-03 建立，用户认可）

- 同主题的缺口**不另开新系列**，编号接在现有 seriesOrder 之后（19、20…），不重排旧文、不动旧 URL
- 沿用正篇规范：每篇 Node.js vs Spring Boot 对照表、TechBlog CMS 主线场景、代码占比 < 40%、trade-off 结尾
- 番外开头承接前一篇结尾的预告，结尾预告下一篇；相邻篇串行写（后篇需衔接前篇措辞）
- 作者本人正在系统学 Spring Boot（前端转全栈），番外主题优先选他学习中的真实盲区，并主动邀请他把实际报错揉进文章

## 已写番外

- 19 Maven 依赖管理：starter/BOM 为什么不用写版本号、依赖仲裁（单版本 vs npm 多版本）、Maven 无 lockfile 的认知差、`dependency:tree -Dverbose` 排查实战
- 20 事务：默认只回滚 RuntimeException（rollbackFor 对策）、传播行为只讲 REQUIRED/REQUIRES_NEW 两档、失效三坑（自调用/private/吞异常）、事务里别做远程调用等慢操作
- 21 MyBatis 与 MyBatis-Plus（2026-09-08）：mapper 接口绑定、预编译占位 vs 字符串拼接（ORDER BY 排序失效引出注入 + 白名单）、动态 SQL where/if 标签、MP 两个坑（SB3 要用 spring-boot3 starter、不在 BOM 要显式版本）、BaseMapper/LambdaQueryWrapper 对照 TypeORM find options（方法引用编译期类型安全）、分页插件不配拦截器查全表、Wrapper 边界回手写 SQL、逻辑删除/乐观锁/自动填充一句带过。**对照源定为 TypeORM**——作者明确说自己熟悉 NestJS/TypeORM（2026-09-08），后续番外 Node.js 对照物优先用 TypeORM 而非 Drizzle/Express 泛指
- 21 篇开头以 20 篇结尾的"番外写完了"打脸承接——20 篇说过全剧终但番外重新开放，后续仍按需追加编号

## 候选后续番外（按学习路径排序，写前与用户确认）

1. **多模块工程实战**：19 篇只"一瞥"，可实战拆 CMS 的 domain 共享模块（父子 POM）
2. **Spring Security 深入**：9-10 篇有基础 + JWT，缺 OAuth2 / RBAC 权限模型 / 方法级鉴权
3. **缓存一致性**：11 篇 @Cacheable 之外，Cache-Aside 双写不一致问题（可轻量互链 redis 系列 11-13 篇）
4. **测试深入**：15 篇是策略概览，缺 Testcontainers 集成测试实战

## MDX 写作提醒（本系列实测过的坑）

- XML 标签（`<dependency>` 等）只能出现在代码块内，正文一律用中文表述
- summary 不含嵌套引号；写完用 check-mdx.py 扫目录（传目录不传单文件）
