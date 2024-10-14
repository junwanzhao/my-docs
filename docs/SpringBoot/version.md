# Spring Boot 版本选择

## 版本周期

Spring Boot 项目同时维护了几条版本线，其中又包括不同意义的版本，比如`CURRENT`、`GA`、`PRE`、SNAPSHOT 等等代号，它们都代表着不同生命周期的版本

如下图所示:

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141232298.png)

#### 1.GA(正式版本)

GA 全称:general availability，表示一般可用的版本，即已经向大众公开发行的正式版本，一旦发布，日后就不会修改该发行版本的任何内容，如果发现 BUG 会在下一个版本中修复。2.4.x 之前的版本是有带 RELEASE 标识的，比如 2.3.12.RELEASE。

在生产项目中必须要使用 GA 版本，我们从 Maven 中央仓库中获取到的依赖也都是 GA 版本。

#### 2.CURRENT(最新正式版本)

CURRENT 表示最新的 GA 版本，如上图所示，Spring Boot 3.3.3 正式发布的时候，其右侧显示了 CURRENT 标识，说明它就是目前最新的可用发行版本。

#### 3.SNAPSHOT(快照版本)

SNAPSHOT 即快照版本，一般每晚进行构建以包含最新的变更。一般每个版本只有一个，比如：`<font style="color:rgb(38,38,38);">3.4.0-SNAPSHOT </font>`如果发现 BUG，也会在当前快照版本中修复。

快照版本是最新测试版本，可能包含大量的 BUG，开发者可以拿来学习研究使用，强烈不建议用于生产项目。

#### 4.PRE(预览版本)

PRE 表示` pre release` 版本，即预览版本，预览版本又有两个不同的阶段:

- **里程碑版本**: 比如:`3.3.0-M1` ，这里的`M` 指是 `milestone` ，即里程碑版本，里程碑版本的版本号从 M1 开始递增;
- **候选发行版本**: 比如:`3.3.0-RC1 `，这里的 `RC` 指的是 `Release Candidate`，即候选发行版本，正式发行前的候选版本，和里程碑版本一样，从 1 开始递增；

**预览版本发布后也是不会改变的，比如在**`**M1**`** 发现 BUG 时会在 SNAPSHOT 快照版本中修复并发布 **`**M2**`** ，以此类推，当里程碑版本逐渐稳定之后就会发布候选发行版本，候选发行版本逐渐稳定之后就会发布正式版本。**

PRE 预览版本同样也是测试版本，同样不建议使用在生产项目，它可能还会包含少量 BUG,开发者可以提前拿来学习研究即将发布的 Spring Boot 最新正式版本的特性，如上图所示的:3.4.0-M1 PRE。

SNAPSHOT 快照版本和 PRE 预览版本没有发布到 Maven 中央仓库，仅发布在 Spring 仓库中，如果要使用这两个版本，需要在 Maven 配置文件中配置 Spring 仓库:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w
  3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.ap
  ache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  ...
  <repositories>
    <repository>
      <id>spring-snapshots</id>
      <url>https://repo.spring.io/snapshot</url>
      <snapshots><enabled>true</enabled></snapshots>
    </repository>
    <repository>
      <id>spring-milestones</id>
      <url>https://repo.spring.io/milestone</url>
    </repository>
  </repositories>
  <pluginRepositories>
    <pluginRepository>
      <id>spring-snapshots</id>
      <url>https://repo.spring.io/snapshot</url>
    </pluginRepository>
    <pluginRepository>
      <id>spring-milestones</id>
      <url>https://repo.spring.io/milestone</url>
    </pluginRepository>
  </pluginRepositories>
</project>
```

**版本的发布流程:**

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141232959.png)

从 SNAPSHOT 快照版本开始，再到多个 PRE 预览版本，再到正式版本。一旦正式版本发布，就不再维护相同版本的 SNAPSHOT 快照版本和 PRE 预览版本了，然后下一个版本就会继续从 SNAPSHOT 快照版本开始，如此往复，从 Spring Boot 版本图中可以看到所有的 GA 版本是没有 SNAPSHOT 快照版本和 PRE 预览版本的，只有还未正式发布的版本才会有这两个版本。

Spring Boot 官方源代码仓库的发布记录:[spring-projects/spring-boot: Spring Boot (github.com)](https://github.com/spring-projects/spring-boot)

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141232426.png)

## 支持版本

Spring Boot 版本线如下图所示：

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141232956.png)

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141233462.png)

以上数据和图表来源 Spring Boot 官方文档

[https://spring.io/projects/spring-boot#support](https://spring.io/projects/spring-boot#support)

随着 Spring Boot 3.1.0 的发布，免费受支持的版本就只有 Spring Boot 2.7+ 了，受商业支持的版本线为 Spring Boot 2.5+，其他的低版本不建议使用了。

如果只是学习或者测试使用，使用哪个版本都没有问题，如果是公司实际生产环境项目，建议最好不要最新的版本，避免踩坑，也不要使用已经停止维护的版本，避免带来潜在的漏洞和重大 bug。如果只是公司内部系统，不会暴露到外网，在不存在重大 bug 的情况下选用哪个版本理论上都是没问题的。
