# Spring Boot 核心模块

Spring Boot 框架也是由许多核心子模块组成的，每个子模块负责不同的功能点，以下是 10 大 Spring Boot 核心模块：

## spring-boot

这是 Spring Boot 框架的主模块，也是支持其他模块的核心模块，主要包含以下几点:

- 提供了一个启动 Spring 应用的主类，并提供了一个相当方便的静态方法，它的主要是作用是负责创建和刷新 Spring 容器的上下文;
- 提供了内嵌式的并可自由选择搭配的 Servlet 应用容器，如:`Tomcat`，`Jetty` , `Undertow `等;
- 提供了一流的配置外部化支持;
- 提供了一个很方便的 Spring 容器上下文初始化器，包括合理记录日志默认参数的支持;

## spring-boot-autoconfigure

这个模块提供了常用的 Java 主流技术的自动配置组件，其提供的 `@EnableAutoConfiguration` 注解就能启用 Spring Boot 的自动配置功能，它能根据类路径下的内容再决定是否自动配置。

## spring-boot-starters

这个模块是所有 Starters 启动器的基础依赖，Starters 主要包括一系列技术组件依赖，它可以一站式开发 Spring 及相关技术应用，而不需要你到处找依赖和示例配置代码，它都帮你做好了。

例如 `spring-boot-starter-web` 这个 Starter 启动器，它引入了 `spring-boot-starters `基础依赖及其相关的其他技术依赖。

[Build Systems :: Spring Boot](https://docs.spring.io/spring-boot/reference/using/build-systems.html#using.build-systems.starters)

## spring-boot-cli

这是 Spring Boot 提供的命令行工具，也是另外一种创建 Spring 应用的方式，支持编译和运行 Groovy 应用程序，所以，它可以十分简单地编写并运行一个应用程序。

## spring-boot-actuator

这是 Spring Boot 提供的监控模块，比如，它提供了健康端点、环境端点、Spring Bean 端点等端点，可以更好地帮助监控应用程序并和应用程序进行交互。

## spring-boot-actuator-autoconfigure

这个模块是为 `spring-boot-actuator` 监控模块提供自动配置的模块。

## spring-boot-test

这个模块是 Spring Boot 的测试模块,为应用程序提供了许多非常有用的单元测试功能，包含了单元测试所需要的核心组件及注解等。

## spring-boot-test-autoconfigure

这个模块是为` spring-boot-test` 测试模块提供自动配置的模块。

## spring-boot-loader

这个模块用于将 Spring Boot 应用程序构建一个单独可执行的 jar 包，使用` java -jar`就能直接运行，一般不会直接使用这个来打包，而是使用 Spring Boot 提供的 Maven 或者 Gradle 插件。

## spring-boot-devtools

这是 Spring Boot 开发者工具模块，主要用于 Spring Boot 应用程序的开发阶段，它提供一些显著提升开发效率的特性，如修改了代码自动重启应用等，以帮助开发者获得更流畅的应用程序开发体验。

这个模块的功能是可选的，只限于本地开发环境，当打成整包运行时这些功能会自动被禁用。
