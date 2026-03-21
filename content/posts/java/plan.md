# Java 渐进式语法学习计划

## 背景

本计划旨在通过一系列结构化的博客文章，帮助读者从零开始系统掌握 Java 核心语法知识。文章采用渐进式设计，从基础语法到高级特性，每篇文章都包含清晰的代码示例、原理解释和实践练习。

**技术栈选择标准**：

- ✅ 市场需求大、就业前景好
- ✅ 语法严谨、适合学习编程基础
- ✅ 跨平台、应用领域广泛
- ✅ 企业级开发首选语言

**核心版本**：

- **Java 版本**：Java 17 (LTS)
- **构建工具**：Maven/Gradle
- **IDE**：IntelliJ IDEA / VSCode
- **JDK**：OpenJDK 17 / Oracle JDK 17

---

## 博客目录结构

```
content/posts/java/
├── plan.md                              # 本计划文件
├── 01-getting-started.mdx               # 环境搭建与第一个程序
├── 02-basic-syntax.mdx                  # 基础语法与数据类型
├── 03-operators-control-flow.mdx        # 运算符与控制流
├── 04-arrays.mdx                        # 数组详解
├── 05-classes-objects.mdx               # 类与对象基础
├── 06-encapsulation.mdx                 # 封装与访问控制
├── 07-inheritance.mdx                   # 继承与多态
├── 08-abstract-interfaces.mdx           # 抽象类与接口
├── 09-inner-classes.mdx                 # 内部类与枚举
├── 10-exception-handling.mdx            # 异常处理机制
├── 11-collections-framework.mdx         # 集合框架概览
├── 12-list-implementation.mdx           # List 接口与实现
├── 13-set-map-implementation.mdx        # Set 与 Map 实现
├── 14-generics.mdx                      # 泛型深入理解
├── 15-stream-api.mdx                    # Stream 流式 API
├── 16-file-io.mdx                       # 文件 IO 操作
├── 17-multi-threading-basics.mdx        # 多线程基础
├── 18-synchronization.mdx               # 同步与并发工具
├── 19-lambda-expressions.mdx            # Lambda 表达式
├── 20-functional-interfaces.mdx         # 函数式接口
└── README.mdx                           # 系列索引
```

---

## 第一阶段：基础入门（4篇）

### 01. 环境搭建与第一个程序

**目标**：搭建 Java 开发环境，编写第一个 Java 程序

**内容要点**：

- Java 语言特点与历史
- JDK、JRE、JVM 的关系
- 安装 JDK 17
- 配置环境变量（JAVA_HOME、PATH）
- 选择 IDE（IntelliJ IDEA / VSCode）
- 编写第一个 Hello World 程序
- 编译与运行过程解析
- Java 程序的基本结构
- package 与 import 语句
- public static void main(String[] args) 解析

**实战示例**：

```java
// Hello World 程序
// 命令行参数接收与处理
```

---

### 02. 基础语法与数据类型

**目标**：掌握 Java 基本语法和八种数据类型

**内容要点**：

- 变量的声明与初始化
- 标识符命名规则
- 八种基本数据类型
  - 整型：byte、short、int、long
  - 浮点型：float、double
  - 字符型：char
  - 布尔型：boolean
- 数据类型转换
  - 自动类型提升
  - 强制类型转换
- 常量与 final 关键字
- 运算符优先级
- 字符串（String）基础
- 转义字符

**实战示例**：

```java
// 数据类型演示
// 类型转换示例
// 温度转换程序
```

---

### 03. 运算符与控制流

**目标**：掌握运算符和程序控制结构

**内容要点**：

- 算术运算符（+、-、\*、/、%）
- 关系运算符（==、!=、>、<、>=、<=）
- 逻辑运算符（&&、||、!）
- 位运算符（&、|、^、~、<<、>>、>>>）
- 赋值运算符（=、+=、-=、\*=、/=、%=）
- 三元运算符（? :）
- if-else 条件语句
- switch-case 多分支语句
  - Java 14+ 的新 switch 语法
- for 循环
- while 和 do-while 循环
- break 和 continue
- 嵌套循环

**实战示例**：

```java
// 成绩等级判断
// 打印九九乘法表
// 猜数字游戏
```

---

### 04. 数组详解

**目标**：理解数组的概念与使用

**内容要点**：

- 数组的概念与特点
- 一维数组的声明与初始化
- 数组元素的访问与遍历
- 数组的默认值
- 数组长度（length 属性）
- 数组越界异常
- 数组的复制（System.arraycopy、Arrays.copyOf）
- 数组排序（Arrays.sort）
- 二分查找（Arrays.binarySearch）
- 多维数组
  - 二维数组的声明与初始化
  - 二维数组的遍历
  - 不规则二维数组
- 增强型 for 循环（for-each）

**实战示例**：

```java
// 数组的最值查找
// 数组反转
// 矩阵运算
// 杨辉三角打印
```

---

## 第二阶段：面向对象基础（5篇）

### 05. 类与对象基础

**目标**：理解面向对象思想，掌握类与对象的创建

**内容要点**：

- 面向对象编程（OOP）概述
  - 封装、继承、多态
- 类的概念
- 对象的创建与使用
- 成员变量与局部变量
- 方法
  - 方法定义
  - 参数传递（值传递）
  - 方法重载（Overload）
  - 可变参数
- 构造方法
  - 默认构造方法
  - 自定义构造方法
  - 构造方法重载
- 对象的初始化过程
- this 关键字
- 对象数组

**实战示例**：

```java
// 定义 Student 类
// 定义 Rectangle 类（计算面积和周长）
// 定义 BankAccount 类（存取款）
```

---

### 06. 封装与访问控制

**目标**：理解封装原则，掌握访问控制符

**内容要点**：

- 封装的概念与意义
- 访问控制符
  - private
  - default（包访问权限）
  - protected
  - public
- getter 和 setter 方法
- JavaBean 规范
- 包（package）的作用
- import 语句的使用
- static 关键字
  - 静态变量
  - 静态方法
  - 静态代码块
- 单例模式（饿汉式、懒汉式）

**实战示例**：

```java
// 封装的 Student 类
// 工具类设计（MathUtils）
// 单例模式实现
```

---

### 07. 继承与多态

**目标**：掌握继承机制和多态特性

**内容要点**：

- 继承的概念与意义
- extends 关键字
- 方法重写（Override）
  - @Override 注解
  - 重写规则
- super 关键字
  - 调用父类构造方法
  - 调用父类方法
- 多态的概念
  - 向上转型
  - 向下转型
  - instanceof 操作符
- 动态绑定
- 多态的应用场景
- final 关键字
  - final 类
  - final 方法
  - final 变量

**实战示例**：

```java
// Animal -> Dog/Cat 继承体系
// 图形类层次结构（Shape -> Rectangle/Circle）
// 员工工资计算系统
```

---

### 08. 抽象类与接口

**目标**：理解抽象类和接口的区别与应用

**内容要点**：

- 抽象类的概念
- abstract 关键字
  - 抽象方法
  - 抽象类
- 抽象类的特点
- 接口的概念
- interface 关键字
- 接口的特点
  - 接口的多重实现
- 接口的默认方法（default）
- 接口的静态方法（static）
- 接口的私有方法（Java 9+）
- 函数式接口
- 抽象类 vs 接口的区别
- 面向接口编程

**实战示例**：

```java
// 抽象类 Shape
// 接口 Flyable、Swimmable
// USB 设备接口设计
```

---

### 09. 内部类与枚举

**目标**：掌握内部类和枚举类型的使用

**内容要点**：

- 内部类的分类
  - 成员内部类
  - 静态内部类
  - 局部内部类
  - 匿名内部类
- 内部类的特点与应用场景
- Lambda 表达式与匿名内部类
- 枚举类型（enum）
  - 枚举的定义
  - 枚举的属性和方法
  - 枚举的构造方法
  - 枚举实现接口
- 枚举的常用方法（values、valueOf）
- 枚举与 switch

**实战示例**：

```java
// 成员内部类实现迭代器
// 匿名内部类实现事件监听
// 枚举：星期、季节、方向
```

---

## 第三阶段：核心特性（5篇）

### 10. 异常处理机制

**目标**：掌握 Java 异常处理体系

**内容要点**：

- 异常的概念与层次结构
  - Throwable
  - Error
  - Exception
    - Checked 异常
    - Unchecked 异常（RuntimeException）
- try-catch-finally 语句
  - 多个 catch 块
  - try-with-resources（Java 7+）
- throw 和 throws
- 自定义异常类
- 异常链
- 异常处理最佳实践
- 常见异常类型
  - NullPointerException
  - ArrayIndexOutOfBoundsException
  - ArithmeticException
  - NumberFormatException

**实战示例**：

```java
// 文件读取异常处理
- 自定义业务异常
// 用户输入验证
```

---

### 11. 集合框架概览

**目标**：了解 Java 集合框架体系

**内容要点**：

- 集合的概念与意义
- 集合框架体系
  - Collection 接口
    - List 接口
    - Set 接口
    - Queue 接口
  - Map 接口
- Collection 接口常用方法
- Iterator 迭代器
- ListIterator 列表迭代器
- 增强 for 循环遍历集合
- 集合的选择策略
- 泛型与集合
- Collections 工具类

**实战示例**：

```java
// 集合的基本操作
// 集合的遍历方式
// 集合的工具类使用
```

---

### 12. List 接口与实现

**目标**：掌握 List 的各种实现类

**内容要点**：

- List 接口的特点
- ArrayList
  - 内部实现原理（动态数组）
  - 常用方法
  - 扩容机制
- LinkedList
  - 内部实现原理（双向链表）
  - 常用方法
  - 栈和队列操作
- Vector（已过时）
- ArrayList vs LinkedList 性能对比
- List 的线程安全问题
- Arrays.asList() 的使用
- List 排序（Comparable、Comparator）

**实战示例**：

```java
// ArrayList 基本操作
// LinkedList 实现栈和队列
// 学生成绩排序
// List 去重
```

---

### 13. Set 与 Map 实现

**目标**：掌握 Set 和 Map 的使用

**内容要点**：

- HashSet
  - 内部实现原理（HashMap）
  - 哈希表原理
  - equals() 和 hashCode()
- LinkedHashSet
  - 有序性
- TreeSet
  - 内部实现原理（红黑树）
  - 自然排序与定制排序
- HashMap
  - 内部实现原理
  - 存储结构（数组+链表+红黑树）
  - 常用方法
- LinkedHashMap
  - 有序性
  - LRU 缓存实现
- TreeMap
  - 排序性
- Hashtable（已过时）
- ConcurrentHashMap（线程安全）
- Set vs Map 的关系

**实战示例**：

```java
// HashSet 去重
// TreeMap 排序
// HashMap 统计词频
// 缓存实现（LRU）
```

---

### 14. 泛型深入理解

**目标**：理解泛型的概念与应用

**内容要点**：

- 泛型的引入背景
- 泛型类
- 泛型接口
- 泛型方法
- 类型参数命名规范（E、T、K、V、N、S）
- 有界类型参数
  - 上界（extends）
  - 下界（super）
- 类型擦除
- 通配符（?）
  - 无界通配符
  - 上界通配符（? extends）
  - 下界通配符（? super）
- PECS 原则（Producer Extends, Consumer Super）
- 泛型与数组
- 泛型的局限性

**实战示例**：

```java
// 泛型工具类
// 泛型方法实现
- 泛型集合操作
// 类型安全的比较器
```

---

## 第四阶段：现代特性（6篇）

### 15. Stream 流式 API

**目标**：掌握 Stream 函数式编程

**内容要点**：

- Stream 的概念
- Stream 的特点
  - 不存储数据
  - 不改变数据源
  - 惰性求值
- Stream 的创建
  - 集合创建
  - 数组创建
  - 值创建
  - 流生成
- 中间操作
  - filter（过滤）
  - map（映射）
  - flatMap（扁平化）
  - distinct（去重）
  - sorted（排序）
  - limit（限制）
  - skip（跳过）
- 终端操作
  - forEach（遍历）
  - collect（收集）
  - reduce（归约）
  - count（计数）
  - anyMatch、allMatch、noneMatch（匹配）
  - findFirst、findAny（查找）
- Collectors 工具类
- 并行流（Parallel Stream）
- Stream vs 传统集合操作

**实战示例**：

```java
// 集合过滤与转换
// 数据分组与分区
- 数值计算（求和、平均、最大、最小）
// 复杂数据处理
```

---

### 16. 文件 IO 操作

**目标**：掌握 Java IO 流的使用

**内容要点**：

- IO 流的分类
  - 输入流与输出流
  - 字节流与字符流
  - 节点流与处理流
- File 类
  - 文件与目录操作
  - 路径处理
- 字节流
  - InputStream
  - OutputStream
  - FileInputStream
  - FileOutputStream
- 字符流
  - Reader
  - Writer
  - FileReader
  - FileWriter
  - BufferedReader
  - BufferedWriter
- 缓冲流
  - BufferedInputStream
  - BufferedOutputStream
  - BufferedReader
  - BufferedWriter
- 转换流（InputStreamReader、OutputStreamWriter）
- 对象序列化（Serializable）
- try-with-resources 语法
- NIO 简介（Path、Files）

**实战示例**：

```java
// 文本文件读写
// 文件复制
- 配置文件读取
// 对象序列化与反序列化
```

---

### 17. 多线程基础

**目标**：理解多线程概念，掌握基本使用

**内容要点**：

- 进程与线程
- 多线程的优势与挑战
- 线程的创建方式
  - 继承 Thread 类
  - 实现 Runnable 接口
  - 实现 Callable 接口
  - 线程池（ExecutorService）
- Thread 类常用方法
  - run()、start()
  - sleep()、yield()
  - join()
  - interrupt()
  - getName()、setName()
- 线程的生命周期
  - 新建（NEW）
  - 就绪（RUNNABLE）
  - 运行（RUNNING）
  - 阻塞（BLOCKED）
  - 等待（WAITING）
  - 终止（TERMINATED）
- 线程调度
- 线程优先级
- 守护线程（Daemon）

**实战示例**：

```java
// 多窗口卖票
// 定时打印
// 线程间数据共享
```

---

### 18. 同步与并发工具

**目标**：掌握线程同步机制

**内容要点**：

- 线程安全问题
- synchronized 关键字
  - 同步代码块
  - 同步方法
  - 对象锁与类锁
- 死锁
- Lock 接口
  - ReentrantLock
  - lock()、unlock()
  - tryLock()
- Condition 条件对象
- volatile 关键字
- 线程安全的类
  - StringBuffer
  - Vector
  - Hashtable
  - ConcurrentHashMap
  - AtomicInteger 等
- 并发工具类
  - CountDownLatch（倒计时门闩）
  - CyclicBarrier（循环栅栏）
  - Semaphore（信号量）

**实战示例**：

```java
// 银行账户转账（同步）
- 生产者消费者模型
// 读写锁实现缓存
```

---

### 19. Lambda 表达式

**目标**：掌握 Lambda 表达式语法

**内容要点**：

- Lambda 表达式的引入背景
- Lambda 语法
  - 参数列表
  - 箭头符号
  - 方法体
- Lambda 表达式的简化
  - 参数类型省略
  - 单参数省略括号
  - 单条语句省略大括号和 return
- Lambda 表达式的目标类型
- Lambda 表达式与匿名内部类
- Lambda 表达式访问外部变量
- Lambda 表达式的优缺点
- 方法引用
  - 对象::实例方法
  - 类::静态方法
  - 类::实例方法
  - 类::new（构造器引用）
  - 数组::new（数组构造器引用）

**实战示例**：

```java
// Lambda 表达式基础
// 集合排序（Lambda）
// 事件监听器（Lambda）
// Stream + Lambda 组合使用
```

---

### 20. 函数式接口

**目标**：理解函数式编程思想

**内容要点**：

- 函数式接口的定义
- @FunctionalInterface 注解
- Java 内置函数式接口
  - Consumer（消费者）
  - Supplier（供应者）
  - Function（函数）
  - Predicate（谓词）
  - UnaryOperator（一元运算）
  - BinaryOperator（二元运算）
- 基本类型函数式接口
  - IntConsumer、IntSupplier 等
- 函数式接口的组合
  - andThen
  - compose
- 函数式编程范式
- 函数式接口的应用场景

**实战示例**：

```java
// 自定义函数式接口
// Consumer 使用示例
- Function 方法组合
// Predicate 条件过滤
```

---

## 附录

### A. 开发工具推荐

- **JDK**：OpenJDK 17 / Oracle JDK 17
- **IDE**：
  - IntelliJ IDEA（推荐）
  - Eclipse
  - VSCode + Java Extension Pack
- **构建工具**：
  - Maven
  - Gradle
- **API 文档**：Oracle Java API Documentation
- **学习资源**：
  - The Java™ Tutorials (Oracle)
  - Java 语言规范

### B. 代码风格规范

- **命名规范**：
  - 类名：大驼峰（PascalCase）
  - 方法名和变量名：小驼峰（camelCase）
  - 常量名：全大写下划线分隔（UPPER_SNAKE_CASE）
  - 包名：全小写点分隔
- **缩进**：4 个空格（不使用 Tab）
- **大括号**：K&R 风格
- **注释**：
  - 类注释：说明类的功能
  - 方法注释：说明参数、返回值、异常
  - 复杂逻辑注释

### C. 学习建议

1. **动手实践**：每篇文章的示例代码都要亲自敲一遍
2. **理解原理**：不只记住语法，要理解背后的设计思想
3. **循序渐进**：按顺序学习，不要跳跃
4. **总结笔记**：记录重点和易错点
5. **做练习题**：巩固所学知识
6. **阅读源码**：学习优秀的代码实现

### D. 常见问题与解决方案

1. **中文乱码**：设置文件编码为 UTF-8
2. **找不到类**：检查 package 和 import
3. **空指针异常**：使用前检查 null
4. **内存泄漏**：及时释放资源
5. **线程安全**：注意共享资源的访问

### E. 进阶主题（后续扩展）

- 反射机制
- 注解（Annotation）
- JVM 原理
- 设计模式
- 数据库编程（JDBC）
- 网络编程
- Spring 框架
- 微服务架构

---

## 学习路径图

```
┌─────────────────────────────────────────────────────────────┐
│                        Java 学习路径                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ 第一阶段：基础入门                                            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│ │ 01.环境搭建   │→│ 02.基础语法   │→│ 03.运算符控制 │           │
│ └──────────────┘ └──────────────┘ └──────────────┘           │
│                                         ↓                     │
│                                ┌──────────────┐              │
│                                │ 04.数组      │              │
│                                └──────────────┘              │
│                                                               │
│ 第二阶段：面向对象基础                                        │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│ │ 05.类与对象   │→│ 06.封装      │→│ 07.继承多态   │           │
│ └──────────────┘ └──────────────┘ └──────────────┘           │
│                                         ↓                     │
│                                ┌──────────────┐              │
│                                │08.抽象接口   │              │
│                                └──────────────┘              │
│                                         ↓                     │
│                                ┌──────────────┐              │
│                                │09.内部类枚举 │              │
│                                └──────────────┘              │
│                                                               │
│ 第三阶段：核心特性                                            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│ │10.异常处理   │→│11.集合框架   │→│12.List实现   │           │
│ └──────────────┘ └──────────────┘ └──────────────┘           │
│                                         ↓                     │
│                                ┌──────────────┐              │
│                                │13.Set Map    │              │
│                                └──────────────┘              │
│                                         ↓                     │
│                                ┌──────────────┐              │
│                                │14.泛型       │              │
│                                └──────────────┘              │
│                                                               │
│ 第四阶段：现代特性                                            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│ │15.Stream API │→│16.文件IO     │→│17.多线程基础 │           │
│ └──────────────┘ └──────────────┘ └──────────────┘           │
│                                         ↓                     │
│                                ┌──────────────┐              │
│                                │18.同步并发   │              │
│                                └──────────────┘              │
│                                         ↓                     │
│                                ┌──────────────┐              │
│                                │19.Lambda     │              │
│                                └──────────────┘              │
│                                         ↓                     │
│                                ┌──────────────┐              │
│                                │20.函数式接口 │              │
│                                └──────────────┘              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 预期效果

完成本系列学习后，读者将能够：

1. ✅ 熟练掌握 Java 基础语法
2. ✅ 深刻理解面向对象编程思想
3. ✅ 能够独立设计类和对象
4. ✅ 熟练使用集合框架处理数据
5. ✅ 理解泛型并能正确使用
6. ✅ 掌握 Stream 流式编程
7. ✅ 能够处理文件 IO 操作
8. ✅ 理解多线程并编写并发程序
9. ✅ 掌握 Lambda 表达式和函数式编程
10. ✅ 具备进一步学习 Java 框架的基础

---

## 版本信息

- **Java 版本**：Java 17 (LTS)
- **学习周期**：建议 6-8 周（每周 2-3 篇）
- **难度级别**：零基础 → 进阶
- **实践要求**：每篇文章代码必练

_计划创建日期：2026-03-21_
_预计完成时间：循序渐进，按个人节奏学习_
