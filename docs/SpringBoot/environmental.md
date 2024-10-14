# Spring Boot 环境要求

**对 Java 开发环境的要求对比表:**

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141242163.png)

Spring Boot 3 最低要求 JDK 17，并向上兼容支持 JDK 19。

Spring Boot 3 最低支持的 Spring 框架也变成了 Spring 6.0.2+，在 Spring Boot 3.0.0 发布之前的 Spring 6.0 也有不少的底层升级。

**对 Servlet 容器的要求对比表:**

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141242892.png)

Spring Boot 3 最低支持 Servlet 5.0，并已将所有底层依赖项从 Java EE 迁移到了 Jakarta EE API,基于 Jakarta EE 9 并尽可能地兼容 Jakarta EE 10。因为早在几年前 Java EE 已经正式更名为 Jakarta，所以，所有相关的名称都变了，包括包名，所以要升级 Spring Boot 要考虑这点兼容性。
