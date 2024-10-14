# Spring Boot3 新特性

### 基于 Java 17 的支持

- **Java 17 **成为了 Spring Boot 3 的最低版本要求，这意味着 Spring Boot 3 利用了 Java 17 的新特性，如记录类(Records)、文本块(Text Blocks)、模式匹配(Pattern Matching)等，提升了代码的简洁性和性能。
- Java 17 也是一个长期支持(LTS)版本，提供更长的支持周期，这对企业级应用尤为重要。

### 原生(Native)应用支持

- Spring Boot 3 深入集成了 **GraalVM Native lmage**，支持生成原生可执行文件。这使得应用程序可以更快速地启动和更低的内存占用，适合微服务和云原生环境中的快速扩展和缩减需求。
- 原生镜像支持需要一些额外的配置和优化，但 Spring Boot 3 提供了自动化工具和构建插件来简化这个过程。

### 模块化支持增强

- 更好地支持 **Java Platform Module System(JPMS)**。Spring Boot 3 对 Java 模块系统的支持更加完善，允许开发者使用模块化的 Java 应用程序构建 Spring Boot 应用。
- 通过模块化，可以更好地控制应用程序的依赖范围，增强安全性和可维护性。

### Spring AOT(Ahead-of-Time) 编译

- 引入了 **Spring AOT 编译器**，用于提前编译(AOT，Ahead-of-Time Compilation)，优化应用的运行时性能。
- AOT 编译能生成更多的静态代码，减少启动时的动态代理和反射操作，这与 GraalVM 的原生镜像支持紧密结合，使 Spring 应用在原生环境下的表现更佳。

### Spring Framework6 的兼容性

- Spring Boot 3 与 **Spring Framework6** 紧密集成，利用其所有的新特性和改进，如更好的原生支持、反应式(Reactive)编程模型增强、核心容器改进、性能优化等。
- Spring Framework 6 还对 Jakarta EE 9 和 EE 10 进行了全面支持，这意味着迁移到新的 Spring Boot 3 也会自动享受到 Jakarta EE 的最新特性。

### Jakarta EE 9+ 支持

- Spring Boot 3 完全基于 Jakarta EE 9+，这意味着所有的 Java EE API 都迁移到了新的 Jakarta 命名空间(`javax `到 `jakarta`)
- 这种变更虽然涉及到大量的代码修改(包名更改)，但也是为了符合 Jakarta EE 的最新标准，获得更好的兼容性和性能。

### 观测性(Observability)增强

- **Micrometer** 和 **Micrometer Tracing **成为 Spring Boot 3 内建的观测性解决方案，替代了以前的 Spring Boot Actuator 监控方式。
- 这些工具提供了开箱即用的指标、分布式追踪、日志记录等功能，便于集成到 Prometheus、Grafana、Zipkin、Jaeger 等常见的观测性平台中。
- 提供了更灵活和丰富的监控和追踪能力，有助于分析和优化应用程序性能

### 安全性改进

- **Spring Security 6 **的全面支持，带来了增强的安全性特性，包括对 OAuth 2.1、OpenID Connect 1.0、密码编码和加密算法的更新。
- 统一了安全配置，简化了身份验证和授权流程，使得配置更加直观和易于维护。

### 配置和属性改进

- Spring Boot 3 对配置文件和属性处理进行了优化，允许更灵活的配置选项和更好的类型安全性。
- 新的配置属性类型支持(如记录类、`java.time` 对象等)，使得配置管理更加灵活和简化。

### 废弃和删除的特性

- 对于一些过时的技术和特性进行了清理和废弃。
- 官方提供了一份详细的[迁移指南](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide)，帮助开发者从 Spring Boot 2.x 迁移到 3.0。

### 性能优化和现代化改进

- Spring Boot 3 对底层核心组件进行了多处优化，包括更快的启动时间、更低的内存使用以及更好的可伸缩性。
- 提升了与现代化基础设施(如 Kubernetes、Serverless 等)的集成能力，提供更加便捷的部署和运行体验。

[Spring Boot 3 发布说明](https://spring.io/blog/2022/11/24/spring-boot-3-0-goes-ga)。
