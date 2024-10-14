# IDEA 环境下的热加载

有一种方式能够快速自动地帮我们将修改代码自动更新，避免手动重启，从而提高开发效率：使用 devtools 实现热加载。

## 引入 devtools 的 Maven 依赖

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-devtools</artifactId>
	<optional>true</optional>
</dependency>
```

spring-boot-devtools 从名称就可以看出来，它是一个开发者工具包，其主要的功能就是实现热加载

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141246922.png)

其实现原理就是两个 ClassLoader，一个负责加载那些不会经常改变的文件，比如:第三方 jar 包，一旦引入项目之后这部分代码在调试过程中就处于不变的状态;一个负责加载可能经常改变的类，比如我们自己在项目中写的代码，被称为 restart ClassLoader。当有代码发生改变的时候，重建一个 restart ClassLoader，原有的 restart ClassLoader 被丢掉。由于每次重新加载的内容少，所以速度比手动重启更快一些。

## 设置 IDEA

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141246422.png)

其次，选中打勾“Build project automatically”这是一种重新自动化的编译整体项目的方法。

一般不这么做，因为 IDEA 的文件是自动保存的，如果你想修改一个字符串，有可能只修改了第一个字符它就重新编译了，就会重新加载启动。所以，**可以在代码修改完成之后用 Ctrl +F9 快捷键对修改类重新编译，而不是做项目的自动化编译。**

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141246010.png)
