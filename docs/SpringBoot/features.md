# Spring Boot 基本特性

## 独立运行

Spring Boot 框架最大的一个亮点就是内嵌了各种 Servlet 容器，包括 Tomcat、Jetty、Undertow，应用不再需要打成 war 包再部署到 Tomcat 等 Servlet 容器中了，Spring Boot 应用可以打成一个可执行的 jar 包，所有的依赖都在一个 jar 包内，使用 `java -jar`命令就能独立运行。

## 简化配置

Spring Boot 提供了各种开箱即用的"Starter"一站式启动器，只要引入对应技术组件的 Starter 启动器就能简化很多依赖配置，另外，Spring Boot 自动配置包中提供了各种技术的默认底层实现组件、默认的组件配置实例、默认的配置参数等，这些都有默认的实现。

## 自动配置

Spring Boot 提供了自动配置能力，只要引入对应技术组件的 Starter，然后通过 Spring Boot 提供的默认配置参数，或者应用自定义的配置参数，就能自动配置，自动配置后这些技术就能快速集成并开箱使用。

自动配置功能可以推断应用可能需要加载哪些 Spring Bean。对于 Java 常用的主流技术，Spring Boot 官方都提供了自动配置能力以及相关的 Starters，如果是官方不支持的第三方技术，它们一般也都会提供带有自动配置的 Spring Boot Starter 启动器依赖。

如果没有特别复杂的定制需求，Spring Boot 默认自动配置后的组件就能轻松上手使用，如果不符合需求，Spring Boot 完全支持自定义并覆盖默认的自动配置。

## 无代码生成和无需 XML 配置

Spring Boot 配置过程中无代码生成，意思就是 Spring Boot 不是通过生成代码的方式来完成自动配置的，也无需 XML 配置文件，而是通过 Spring & Spring Boot 中的各种条件注解完成的，Spring Boot 应用在运行时根据各种指定的条件、上下文环境参数等完成自动配置。
