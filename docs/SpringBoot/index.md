# Spring Boot 基本介绍

## 诞生背景

Spring Boot 官网：[Spring | Home](https://spring.io/) 记住：[https://spring.io/](https://spring.io/)

传统的 Spring 框架，不管是 Spring 旗下自己的组件，还是第三方框架，要基于 Spring 集成使用，就必须要用到 XML 配置文件，或者注解式的 Java 代码配置。但无论是使用 XML 或者代码配置方式，都需要对相关组件的配置有足够的了解，然后再编写大冗长的配置代 码，这显然加大了开发者对 Spring 的使用难度。

为了简化使用 Spring 框架的难度，让 Spring 组件能达到开箱即用，让开发者能更快速上手为目的，Spring Boot 框架便诞生了！

Spring 项目最初是由 Pivotal 公司团队进行研发的，于 2014 年发布第⼀个 Spring Boot 公开版本，2019 年 WMware Tanzu 收购了 Pivotal，现在所有 Spring 项⽬都是该公司旗 下的。

## 基本介绍

- Spring Boot 是 Spring 全家桶项目中的一个子项目，也是 Spring 组件应用一站式解决方案，主要是为了简化使用 Spring 框架的难度，简省繁重的配置，所以，Spring Boot 现在也成了后端标准开发框架。
- Spring Boot 提供了各种技术组件的一站式启动器(Starters)，开发者只要定义好对应技术组件的配置参数，Spring Boot 就会自动配置，让开发者能快速搭建基于 Spring 生态的 Java 应用。
- Spring Boot 不但能创建传统的 war 包应用，还能创建独立的、不依赖于任何外部 Servlet 容器的独立应用(内置 Servlet 容器)，使用 java -jar 命令就能启动一个应用。
- Spring Boot 3.0 添加了对 GraalVM 原生镜像的支持，大大提升了 Spring 应用的使用体验。
- <font style="color:rgb(13, 13, 13);">Spring Boot 使创建独立的、生产级别的基于 Spring 的应用程序变得简单，可以“直接运行”这些应用程序。对 Spring 平台和第三方库采用了一种约定优于配置的观点，可以以最小的麻烦开始开发。大多数 Spring Boot 应用程序只需极少的 Spring 配置。</font>

### <font style="color:rgb(13, 13, 13);">特性</font>

- <font style="color:rgb(13, 13, 13);">创建独立的 Spring 应用程序</font>
- <font style="color:rgb(13, 13, 13);">直接嵌入 Tomcat、Jetty 或 Undertow（无需部署 WAR 文件）</font>
- <font style="color:rgb(13, 13, 13);">提供约定优于配置的 “starter” 依赖项，以简化构建配置</font>
- <font style="color:rgb(13, 13, 13);">尽可能自动配置 Spring 和第三方库</font>
- <font style="color:rgb(13, 13, 13);">提供生产就绪的功能，如指标、健康检查和外部化配置</font>
- <font style="color:rgb(13, 13, 13);">绝对没有代码生成，也不需要 XML 配置</font>

## 核心思想

Spring Boot 框架的核心思想是:**约定优(大)于配置(convention over configuration)**，即按约定进行编程，它是一种软件设计范式，旨在减少软件开发人员自主配置的数量，主要体现在以下两个方面:

- 约定并提供一些推荐的默认配置参数
- 开发者只需要定义约定以外的配置参数

这样做的好处就是，如果约定的默认配置符合开发要求，即可不用配置，反之，再进行额外的自定义参数配置，这样就能大大节略开发者的配置量。

application.properties 的配置大于 application.yml 的配置

```
# Server configuration
server.port=8080
server.servlet.context-path=/app
```

```yaml
# Server configuration
server:
  port: 8080
  servlet:
    context-path: /app
```

## 组件关系

Spring Boot、Spring MVC、Spring 三者之间是**互相依存**的关系。

Spring Boot 并不是完全摒弃，也不是用来代替 Spring MVC、Spring 框架，Spring Boot 只是简化了它们的使用而已。

微服务框架 Spring Cloud，其本身也是基于 Spring Boot 框架的基础上进行构建的。

这几个框架的依赖关系如下图所示:

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141241444.png)
