# Spring Boot 启动分析

## 启动流程

以下是 Spring Boot 应用启动的简要流程,

- 入口类:`main `方法
- 创建`** SpringApplication **`对象
- 执行 run 方法
- ·准备环境
- 打印 Banner
- 创建 `ApplicationContext`
- 初始化 `ApplicationContext`
- 刷新` ApplicationContext`
- 启动 Web 服务器(如果是 Web 应用)
- 回调` ApplicationRunner` 和`CommandLineRunner`
- 启动完成:应用程序开始运行并监听请求
- 关闭流程: 在应用终止时执行清理

## 启动图案

Spring Boot 启动图案为 `Banner `接口:

```java
@FunctionalInterface
public interface Banner {
 /**
 * Print the banner to the specified print stream.
 * @param environment the spring environment
 * @param sourceClass the source class for the application
 * @param out the output print stream
 */
 void printBanner(Environment environment, Class<?> sourceClass, PrintS
tream out);
 /**
 * An enumeration of possible values for configuring the Banner.
 */
 enum Mode {
 /**
 * Disable printing of the banner.
 */
 OFF,
 /**
 * Print the banner to System.out.
 */
 CONSOLE,
 /**
 * Print the banner to the log file.
 */
 LOG
 } }
```

从 `Banner.Mode` 接口枚举可以看到支持的输出模式:

- OFF: 关闭图案
- CONSOLE(默认): 输出到 System.out
- LOG: 输出到日志文件

所以，如果想关闭启动图案，或者将启动图案输出到日志文件，只需要在启动类上设置即可，比如关闭启动图案:

```java
public static void main(String[] args) {
 SpringApplication springApplication = new SpringApplication(Application
.class);
 // 关闭图案
 springApplication.setBannerMode(Banner.Mode.OFF);
 springApplication.run(args); }
```

也可以通过以下参数设置:

```yaml
spring:
	main:
	  banner-mode: OFF
```

Spring Boot 3 只能支持纯文本形式的启动图案,如果需要改变应用默认图案，可以直接在应用资源根目录下创建一个 `banner.txt` 图案文件,以下网站可以生成自定义的 banner。

> [https://www.bootschool.net/ascii](https://www.bootschool.net/ascii)
>
> [http://www.degraeve.com/img2txt.php](http://www.degraeve.com/img2txt.php)

也可以通过` spring.banner.location` 参数指定图案文件位置，如果不是 UTF-8 图案方案，需要用` spring.banner.charset` 指定具体编码。另外在` banner.txt` 图案文件中，也可以使用环境占位符。

示例：![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141245355.png)

## 关闭启动日志

`Spring Boot 3`在应用程序启动日志中不再记录主机名，这可以防止没有必要的网络查找，有助于减少应用程序的启动时间。

如果不想输出详细的启动日志，可以通过以下参数关闭:

```yaml
spring:
  main:
    log-startup-info: false
```

或者在启动方法上禁用:

```java
public static void main(String[] args) {
	SpringApplication springApplication = new SpringApplication(Application.class);
	springApplication.setLogStartupInfo(false);
	springApplication.run(args); }
```
