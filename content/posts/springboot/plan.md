# SpringBoot 渐进式学习计划

## 背景

本计划旨在通过一系列结构化的博客文章，帮助读者从零开始掌握 SpringBoot 企业级应用开发。文章采用渐进式设计，从基础概念到生产级应用，每篇文章都包含丰富的代码示例和实战演练。

**为什么选择 SpringBoot？**

- ✅ 约定优于配置，简化 Spring 开发
- ✅ 开箱即用，快速构建应用
- ✅ 企业级应用首选框架
- ✅ 生态完善，社区活跃
- ✅ 微服务架构基础

**技术栈选择标准**：

- ✅ 市场主流、企业级应用
- ✅ 官方维护、长期支持
- ✅ 生态完善、文档丰富
- ✅ 与 Spring 生态完美集成

**核心栈**：

- **框架**：SpringBoot 3.x
- **语言**：Java 17+
- **构建工具**：Maven 3.x / Gradle 8.x
- **数据访问**：Spring Data JPA + MySQL 8.0
- **安全认证**：Spring Security + JWT
- **缓存**：Redis 7
- **消息队列**：RabbitMQ
- **测试**：JUnit 5 + Mockito
- **部署**：Docker + Docker Compose
- **监控**：Actuator + Prometheus

---

## 博客目录结构

```
content/posts/springboot/
├── plan.md                                   # 本计划文件
├── 01-introduction-and-setup.mdx            # SpringBoot 简介与环境搭建
├── 02-first-application.mdx                  # 第一个 SpringBoot 应用
├── 03-di-and-autoconfiguration.mdx           # 依赖注入与自动配置
├── 04-restful-api-development.mdx            # RESTful API 开发
├── 05-data-access-with-jpa.mdx               # Spring Data JPA 数据访问
├── 06-validation-and-custom-validators.mdx   # 参数校验
├── 07-exception-handling.mdx                 # 全局异常处理
├── 08-interceptors-and-aop.mdx               # 拦截器与 AOP
├── 09-security-basics.mdx                     # Spring Security 安全基础
├── 10-jwt-authentication.mdx                  # JWT Token 认证
├── 11-redis-caching.mdx                       # Redis 缓存集成
├── 12-async-and-scheduled-tasks.mdx           # 异步任务与定时任务
├── 13-websocket-realtime.mdx                  # WebSocket 实时通信
├── 14-logging-and-monitoring.mdx              # 日志管理与监控
├── 15-testing-strategies.mdx                  # 测试策略
├── 16-docker-deployment.mdx                   # Docker 容器化部署
├── 17-performance-optimization.mdx            # 性能优化
└── 18-microservices-introduction.mdx          # 微服务架构入门
```

---

## 第一阶段：基础入门（3篇）

### 01. SpringBoot 简介与环境搭建

**目标**：了解 SpringBoot 核心特性，搭建开发环境

**内容要点**：

- 什么是 SpringBoot
- SpringBoot vs Spring
- 核心特性（自动配置、起步依赖、Actuator）
- JDK 安装（Java 17）
- Maven/Gradle 配置
- IDE 选择（IntelliJ IDEA 推荐）
- 第一个项目初始化（Spring Initializr）
- 项目结构说明
- 运行第一个应用

**实战示例**：

```bash
# 使用 Spring Initializr 创建项目
curl https://start.spring.io/starter.zip \
  -d dependencies=web \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d baseDir=springboot-demo \
  -o springboot-demo.zip

# 或使用 IDEA：New Project -> Spring Initializr
```

---

### 02. 第一个 SpringBoot 应用

**目标**：创建第一个 REST API，理解基本原理

**内容要点**：

- @SpringBootApplication 注解
- @RestController 控制器
- @GetMapping/@PostMapping 映射
- 请求参数（@RequestParam、@PathVariable、@RequestBody）
- 返回 JSON 数据
- application.properties 配置
- 端口和上下文路径配置
- 热部署（spring-boot-devtools）

**实战示例**：

```java
// 第一个 REST Controller
@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, SpringBoot!";
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return new User(id, "张三");
    }
}
```

---

### 03. 依赖注入与自动配置

**目标**：理解 Spring 的核心 IoC 和 DI，掌握自动配置原理

**内容要点**：

- IoC（控制反转）概念
- DI（依赖注入）方式
- @Autowired 自动装配
- @Component、@Service、@Repository
- @Configuration 配置类
- @Bean 定义 Bean
- 自动配置原理（@EnableAutoConfiguration）
- 条件注解（@ConditionalOnClass 等）
- 配置文件读取（@Value、@ConfigurationProperties）

**实战示例**：

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}

// 配置类
@Configuration
public class AppConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

---

## 第二阶段：核心功能（5篇）

### 04. RESTful API 开发

**目标**：掌握 RESTful API 设计和实现

**内容要点**：

- RESTful 设计原则
- HTTP 方法映射（GET、POST、PUT、DELETE）
- @RestController 和 @ResponseBody
- @RequestParam、@PathVariable、@RequestBody
- 请求头和 Cookie（@RequestHeader、@CookieValue）
- 跨域处理（@CrossOrigin）
- 参数校验（@Valid）
- 统一返回格式

**实战示例**：

```java
// 用户 CRUD API
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<User> list() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping
    public User create(@Valid @RequestBody UserCreateDTO dto) {
        return userService.create(dto);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO dto) {
        return userService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
```

---

### 05. Spring Data JPA 数据访问

**目标**：掌握数据库操作和数据持久化

**内容要点**：

- Spring Data JPA 简介
- Entity 实体类（@Entity、@Table）
- 主键策略（@Id、@GeneratedValue）
- 字段映射（@Column）
- 关系映射（@OneToMany、@ManyToOne、@ManyToMany）
- Repository 接口
- 查询方法命名规则
- @Query 自定义查询
- 分页和排序（Pageable、Page）
- 事务管理（@Transactional）

**实战示例**：

```java
// Entity
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    private String email;

    @CreationTimestamp
    private LocalDateTime createdAt;
}

// Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.email = ?1")
    Optional<User> findByEmail(String email);
}

// Service
@Service
public class UserService {
    @Transactional
    public User create(UserCreateDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        return userRepository.save(user);
    }
}
```

---

### 06. 参数校验

**目标**：掌握数据校验机制

**内容要点**：

- JSR-303/380 校验规范
- Spring Validation
- 常用校验注解（@NotNull、@NotBlank、@Email 等）
- 自定义校验注解
- 分组校验
- 校验异常处理

**实战示例**：

```java
// DTO 校验
public class UserCreateDTO {
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 20, message = "用户名长度3-20")
    private String username;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Min(value = 18, message = "年龄必须大于18")
    private Integer age;
}

// Controller 中启用校验
@PostMapping
public User create(@Valid @RequestBody UserCreateDTO dto) {
    return userService.create(dto);
}
```

---

### 07. 全局异常处理

**目标**：统一处理应用异常，提供友好错误信息

**内容要点**：

- @ControllerAdvice 和 @RestControllerAdvice
- @ExceptionHandler 注解
- 自定义业务异常
- HTTP 状态码设置
- 统一错误响应格式
- 参数校验异常处理

**实战示例**：

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 业务异常
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Result<?>> handleBusinessException(BusinessException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(Result.error(e.getMessage()));
    }

    // 参数校验异常
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Result<?>> handleValidationException(
        MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(Result.error(message));
    }

    // 系统异常
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Result<?>> handleException(Exception e) {
        log.error("系统异常", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Result.error("系统错误，请联系管理员"));
    }
}
```

---

### 08. 拦截器与 AOP

**目标**：掌握 AOP 编程思想，实现横切关注点

**内容要点**：

- AOP（面向切面编程）概念
- @Aspect 切面定义
- @Pointcut 切入点
- @Before、@After、@Around 通知
- 拦截器（HandlerInterceptor）
- 拦截器注册（WebMvcConfigurer）
- 应用场景（日志、权限、事务）

**实战示例**：

```java
// AOP 日志切面
@Aspect
@Component
@Slf4j
public class LogAspect {

    @Around("@annotation(LogExecution)")
    public Object logExecution(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long duration = System.currentTimeMillis() - start;
        log.info("{} 执行耗时: {}ms", joinPoint.getSignature(), duration);
        return result;
    }
}

// 登录拦截器
@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler) {
        String token = request.getHeader("Authorization");
        if (token == null) {
            throw new UnauthorizedException("未登录");
        }
        return true;
    }
}
```

---

## 第三阶段：安全认证（2篇）

### 09. Spring Security 安全基础

**目标**：掌握 Spring Security 基础用法

**内容要点**：

- Spring Security 简介
- 认证 vs 授权
- Security 过滤链
- UserDetailsService
- PasswordEncoder
- 配置 HttpSecurity
- 表单登录
- 基本认证
- 记住我功能

**实战示例**：

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/home")
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login")
            );
        return http.build();
    }
}
```

---

### 10. JWT Token 认证

**目标**：实现基于 JWT 的无状态认证

**内容要点**：

- JWT（JSON Web Token）原理
- JWT 结构（Header、Payload、Signature）
- JWT 生成和解析
- JWT 过期和刷新
- 自定义 JWT Filter
- 无状态认证流程
- Token 存储策略

**实战示例**：

```java
// JWT 工具类
@Component
public class JwtUtil {

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }

    public boolean validateToken(String token) {
        // 验证逻辑
    }
}

// JWT Filter
public class JwtFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) {
        String token = request.getHeader("Authorization");
        if (token != null && jwtUtil.validateToken(token)) {
            UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(
                    jwtUtil.getUsername(token), null, authorities);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }
}
```

---

## 第四阶段：进阶特性（5篇）

### 11. Redis 缓存集成

**目标**：掌握 Spring Cache 抽象，集成 Redis

**内容要点**：

- Spring Cache 抽象
- @Cacheable、@CachePut、@CacheEvict
- @CacheConfig
- Redis 连接配置
- RedisTemplate 使用
- 缓存策略
- 缓存过期时间
- 缓存穿透、击穿、雪崩

**实战示例**：

```java
// Cache 配置
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .serializeKeysWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new StringRedisSerializer()))
            .serializeValuesWith(RedisSerializationContext.SerializationPair
                .fromSerializer(new GenericJackson2JsonRedisSerializer()));

        return RedisCacheManager.builder(factory).cacheDefaults(config).build();
    }
}

// 使用缓存
@Service
public class UserService {

    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @CachePut(value = "users", key = "#user.id")
    public User update(User user) {
        return userRepository.save(user);
    }

    @CacheEvict(value = "users", key = "#id")
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
```

---

### 12. 异步任务与定时任务

**目标**：处理异步任务和定时任务

**内容要点**：

- @EnableAsync 启用异步
- @Async 异步方法
- 自定义线程池
- @EnableScheduling 启用定时
- @Scheduled 定时任务
- Cron 表达式
- 异常处理

**实战示例**：

```java
// 异步配置
@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");
        executor.initialize();
        return executor;
    }
}

// 异步方法
@Service
public class EmailService {

    @Async
    public void sendEmail(String to, String subject, String content) {
        // 发送邮件逻辑
    }
}

// 定时任务
@Component
@EnableScheduling
public class ScheduledTasks {

    @Scheduled(cron = "0 0 2 * * ?") // 每天凌晨2点
    public void cleanupExpiredData() {
        // 清理过期数据
    }
}
```

---

### 13. WebSocket 实时通信

**目标**：实现实时通信功能

**内容要点**：

- WebSocket 协议
- @EnableWebSocket
- WebSocketHandler
- @ServerEndpoint（STOMP）
- 消息代理
- 广播与点对点
- 房间（Topic）机制

**实战示例**：

```java
// WebSocket 配置
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chatHandler(), "/ws/chat")
            .setAllowedOrigins("*");
    }

    @Bean
    public WebSocketHandler chatHandler() {
        return new ChatHandler();
    }
}

// STOMP 配置
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketStompConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }
}
```

---

### 14. 日志管理与监控

**目标**：掌握日志配置和应用监控

**内容要点**：

- SLF4J + Logback
- Logback 配置（logback-spring.xml）
- 日志级别（DEBUG、INFO、WARN、ERROR）
- 日志文件分割
- Spring Boot Actuator
- 健康检查
- 指标监控（Metrics）
- Prometheus 集成

**实战示例**：

```xml
<!-- logback-spring.xml -->
<configuration>
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/app.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/app-%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="INFO">
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

---

### 15. 测试策略

**目标**：编写可靠的单元测试和集成测试

**内容要点**：

- JUnit 5 基础
- Mockito Mock 框架
- @SpringBootTest 集成测试
- @MockBean Mock Bean
  -@WebMvcTest Controller 测试
- @DataJpaTest Repository 测试
- TestContainers 容器化测试
- 测试覆盖率

**实战示例**：

```java
// Service 测试
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void findById_ShouldReturnUser() {
        // Given
        User user = new User(1L, "张三");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // When
        User result = userService.findById(1L);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo("张三");
    }
}

// Controller 测试
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void getById_ShouldReturnUser() throws Exception {
        when(userService.findById(1L)).thenReturn(new User(1L, "张三"));

        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value("张三"));
    }
}
```

---

## 第五阶段：部署与优化（3篇）

### 16. Docker 容器化部署

**目标**：使用 Docker 容器化应用

**内容要点**：

- Docker 基础
- Dockerfile 编写
- 多阶段构建
- Docker Compose 编排
- MySQL + Redis + App
- 环境变量管理
- 数据卷挂载

**实战示例**：

```dockerfile
# Dockerfile
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin-17:21.3.0-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
    depends_on:
      - mysql
      - redis

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: springboot

  redis:
    image: redis:7-alpine
```

---

### 17. 性能优化

**目标**：掌握 SpringBoot 应用性能优化技巧

**内容要点**：

- JVM 参数调优
- 连接池配置（HikariCP）
- 懒加载
- 缓存优化
- 数据库查询优化
- N+1 查询问题
- 异步处理
- 压缩响应

**实战示例**：

```yaml
# application-prod.yml
spring:
  datasource:
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
  jpa:
    open-in-view: false
    show-sql: false

server:
  compression:
    enabled: true
  tomcat:
    threads:
      max: 200
```

---

### 18. 微服务架构入门

**目标**：了解微服务架构，向 Spring Cloud 过渡

**内容要点**：

- 单体应用 vs 微服务
- 服务拆分策略
- 服务间通信（RestTemplate、OpenFeign）
- 服务注册与发现（Nacos、Consul）
- 配置中心（Nacos Config）
- 负载均衡（Ribbon、LoadBalancer）
- 熔断降级（Sentinel、Hystrix）
- Spring Cloud Alibaba 简介

**实战示例**：

```java
// OpenFeign 调用
@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/api/users/{id}")
    UserDTO getUser(@PathVariable Long id);
}

// 使用
@Service
public class OrderService {
    @Autowired
    private UserClient userClient;

    public OrderDTO create(OrderCreateDTO dto) {
        UserDTO user = userClient.getUser(dto.getUserId());
        // 创建订单逻辑
    }
}
```

---

## 实战项目贯穿

本系列将构建一个完整的**博客系统 API**，涵盖：

- 用户模块（注册、登录、个人中心）
- 文章模块（发布、编辑、删除、列表）
- 评论模块（发表评论、回复）
- 分类标签模块
- 点赞收藏模块
- 搜索模块
- 统计分析

## 学习路径图

```

┌─────────────────────────────────────────────────────────────┐
│ SpringBoot 学习路径 │
├─────────────────────────────────────────────────────────────┤
│ │
│ 第一阶段：基础入门 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 01. 环境搭建 │ ───► │ 02. 第一个应用 │ │
│ └──────────────────┘ └──────────────────┘ │
│                          │ │
│                          ▼ │
│                  ┌──────────────────┐ │
│                  │ 03. DI与自动配置 │ │
│                  └──────────────────┘ │
│ │
│ ▼ │
│ 第二阶段：核心功能 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 04. RESTful API │ ───► │ 05. JPA数据访问 │ │
│ └──────────────────┘ └──────────────────┘ │
│                          │ │
│                          ▼ │
│        ┌──────────────────┬──────────────────┐ │
│        │ 06. 参数校验 │ ───► │ 07. 异常处理 │ │
│        └──────────────────┴──────────────────┘ │
│                          │ │
│                          ▼ │
│                  ┌──────────────────┐ │
│                  │ 08. 拦截器AOP │ │
│                  └──────────────────┘ │
│ │
│ ▼ │
│ 第三阶段：安全认证 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 09. Security │ ───► │ 10. JWT认证 │ │
│ └──────────────────┘ └──────────────────┘ │
│ │
│ ▼ │
│ 第四阶段：进阶特性 │
│ ┌─────────────────────────────────────────────┐ │
│ │ 11. Redis缓存 │ 12. 异步定时 │ 13. WebSocket │ │
│ ├─────────────────────────────────────────────┤ │
│ │ 14. 日志监控 │ 15. 测试 │ │
│ └─────────────────────────────────────────────┘ │
│ │
│ ▼ │
│ 第五阶段：部署优化 │
│ ┌──────────────────┐ ┌──────────────────┐ │
│ │ 16. Docker部署 │ ───► │ 17. 性能优化 │ │
│ └──────────────────┘ └──────────────────┘ │
│                          │ │
│                          ▼ │
│                  ┌──────────────────────────────────────────────┐ │
│                  │ 18. 微服务架构入门 │ │
│                  └──────────────────────────────────────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘

```

---

## 预期效果

完成本系列学习后，读者将能够：

1. ✅ 独立搭建 SpringBoot 开发环境
2. ✅ 开发 RESTful API 接口
3. ✅ 集成数据库（JPA + MySQL）
4. ✅ 实现安全认证（JWT）
5. ✅ 使用 Redis 缓存
6. ✅ 处理异步任务和定时任务
7. ✅ 实现 WebSocket 实时通信
8. ✅ 进行单元测试和集成测试
9. ✅ 使用 Docker 容器化部署
10. ✅ 具备企业级应用开发能力
11. ✅ 了解微服务架构

---

## 版本信息

- **SpringBoot**：3.2.x
- **Java**：17 LTS
- **Maven**：3.9.x
- **Gradle**：8.x
- _计划创建日期：2026-03-23_
- _预计完成时间：2-3个月（每周 1-2 篇）_
