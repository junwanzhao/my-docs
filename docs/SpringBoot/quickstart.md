# Spring Boot 接口快速开发

下面用 Spring Boot 框架开发一个最简洁的 Hello World 接口应用。

## 生成项目

Spring 提供了一站式生成 Spring 应用的网站:

[https://start.spring.io/](https://start.spring.io/)

首先在该网站上面指定要生成的项目环境信息，也可以添加相关的依赖或者后续再导入，这里生成的应用环境如下:

- Maven
- Java
- Spring Boot 3.3.3
- JDK 17

点击 `GENERATE` 按钮就能自动生成并下载该项目，然后打开 IDE 开发工具，通过 Maven 的方式导入该项目即可。

生成的 demo 项目结构如下：

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141242214.png)

这是一个典型的 Spring Boot 应用结构：

```
.
├── HELP.md
├── mvnw
├── mvnw.cmd
├── pom.xml
└── src
     ├── main
     │ 		├── java
     │ 		│ 		└── com
     │ 		│ 		└── example
     │ 		│ 		└── demo
     │ 		│ 		└── DemoApplication.java
     │ 		└── resources
     │ 		└── application.properties
     └── test
         └── java
               └── com
                   └── example
                       └── demo
                            └── DemoApplicationTests.java
```

打开 pom.xml 配置文件，这种方式默认使用的是继承集成的方式，并且会添加默认的依赖`spring-boot-starter`、`spring-boot-starter-test`

并且也会添加一个插件:`spring-boot-maven-plugin`，另外还会生成一个启动类，该启动类是 Spring Boot 应用的入口类。

`@SpringBootApplication`注解则用来标识 Spring Boot 应用的入口类。

## 导入依赖

编写 Spring Boot 接口，如果在生成项目时没有选择 spring-boot-starter-web 依赖，则需要手动导入:

```xml
<dependencies>
   <dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
</dependencies>
```

导入一个这样的启动器依赖就能拥有 Spring Web 开发的能力。

## 编写接口

编写接口和 Spring Boot 框架本身没有关系，使用 Spring MVC 框架的相关注解即可。

```java
@SpringBootApplication
@RestController
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class);
    }
    @RequestMapping("/hello")
    public String helloWorld() {
        return "hello world.";
    } }
```

## 启动应用

在 IDE 中启动 Spring Boot 应用有两种方法:

### 1.使用 Java 中的 main 方法启动

Spring Boot 应用可以直接运行应用启动类的 main 方法，Spring Boot 启动类一般位于根包下面，比如 demo 项目中的 `DemoApplication` 类。

### 2.使用应用构建插件运行

如应用集成了 Maven 插件 `spring-boot-maven-plugin` ，就可以使用 Maven 命令启动:

```
mvn spring-boot:run
```

Maven 应用建议使用这种启动方式，因为使用 Maven 命令启动可以使用到 Maven 的各种插件，如资源插件配置文件占位符替换处理，如果使用第一种方法直接运行 main 方法，就会因为无法替换占位符而启动报错。

默认的绑定端口是 8080

## 测试接口

在浏览器中直接访问刚才编写的 /hello 接口:
`<a href="http://localhost:8080/hello" target="_blank" rel="noreferrer">http://localhost:8080/hello</a>`

或者使用插件 Restful Tool2
