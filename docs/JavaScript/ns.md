# Node.js:服务端的 JavaScript

Node.js 诞生于 2009 年，是**基于 ChromeV8 引擎的 JavaScript 运行时**。

提示:所谓运行时，其实是一种运行环境 ，JavaScript 目前有两种运行环境，一种是浏览器环境，另一种是 Node.js 环境。

在浏览器环境中，JavaScript 可以操作 DOM，具有 Document、Window 等浏览器对象。而在 Node.js 环境中，JavaScript 且有系统访问权限(如操作文件、执行 shell 命令)，可以提供后端服务(如操作数据库、运行 Web 服务器)，这些实现起来非常容易。

### 1. Node.js 基础

#### 一、安装 Node.js

可以通过多种方式安装 Node.js，最简单的方式是在官网上下载安装包。

打开 [Node.is 官网](https://nodejs.org/zh-cn)的下载页面，选择长期支持版本，下载对应的平台安装包。Node.js 的版本升级比较快，实际使用中至少需要 Node.js16 及以上的版本，建议升级到最新稳定版。
在安装 Node.js 之后，打开命令行界面，输入“node -v”，控制台会打印出版本号。![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101629202.png)

此时，Node.js 已经安装好。安装完成后 Node.js 会作为系统命令(node)存在，该命令的作用就是创建 Node.is 运行环境。

#### 二、2. node 命令

学习 Node.js 的第一步就是了解 node 命令。使用 node 命令创建 Node.js 环境有以下两种方式：

- 运行脚本文件;
- 使用命令行交互(REPL)。

最常用的是运行脚本文件。创建一个 app.js 文件，编写如下代码：

```javascript
const path = require("path");
console.log(path.resolve(__filename));
```

打开命令行工具，切换到 app.js 文件所在的文件夹下，执行如下命令:

```bash
node app.js
E:\Projects\frontend-study\NodeJS\node命令\app.js  # app.js ⽂件的地址
```

在 node 命令后面跟一个文件名并执行，首先会创建一个 Node.js 运行环境，在这个环境中执行对应的文件。上述 app.js 文件被执行，打印出文件的绝对路径。

能否将创建 Node.js 环境和运行代码这两步分开呢?当然可以，命令行交互(REPL)就是一种先创建 Node.is 环境，再在该环境中编写和执行代码的方式。在终端中直接运行 node 命令,不加任何参数，即可进入 REPL 模式，如下所示:

```bash
node
Welcome to Node.js v20.15.1.
Type ".help" for more information.
>
```

上面的符号“>”表示已经进入 REPL 模式，等待输入内容。此时可以输入任意 Node.js 代输入完成后按 Enter 键，代码会自动执行，与浏览器开发者工具中的控制台基本一致。码

在 REPL 模式下编写一个全局对象 global，结果如下:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101629767.png)

这里会列出全局对象下的所有属性。REPL 模式对于学习和测试 Node.is 代码非常有用，不仅可以快速查看某个对象或执行某个函数，还支持智能提示和 Tab 键自动补全。

#### 三、命令参数

使用 node 命令运行脚本文件还可以传递参数，以及在文件中接收参数，脚手架的很多功能就是基于此特性实现的。

Node.is 中有一个内置的 process 对象表示当前运行的进程，还有一个 argv 属性专门用来接收参数。先将 app.js 文件中的内容修改为如下形式:

```javascript
var argv = process.argv;
console.log("参数：", argv);
```

再通过以下命令执行文件并传递参数:

```bash
node app.js tag=test name=node
# 输出结果如下
参数： [
  '',
  '',
  'tag=test',
  'name=node'
]
```

由打印结果可以看出，process.argv 的值是一个数组。数组的第 1 项是 node 命令的路径，第 2 项是所执行文件的路线，从第 3 项开始才是真正的参数。因此，获取参数的代码可以修改为如下形式:

```javascript
var argv = process.argv.slice(2);
console.log("参数：", argv);
```

再次运行`node app.js tag=test name=node`，结果如下:

```bash
参数： [ 'tag=test', 'name=node' ]
```

#### 四、模块系统

Node.js 自带模块系统，一个文件就是一个单独的模块，通过` CommonJS` 规范可以实现模块之间的导入和导出。

CommonJS 规范使用 require()方法导入模块，使用 module.exports 对象暴露模块中的变量和方法。假设现在有两个文件(a.js 和 b.js)，它们之间的引用方式如下:

```javascript
// a.js
var config = {
  name: "⻄蓝花",
};
module.exports = config;
// b.js
//var config = require("./a.js");
console.log(config); // { name: '⻄蓝花' }
```

先在 a.js 文件中显式地用 module.exports 导出一个对象，再在 b.js 文件中导入模块并获取该对象。如果在 a.js 文件中没有显式地导出，那么当 a.is 文件被引入时，只会执行 a.js 文件中的代码逻辑，如下所示:

```javascript
// a.js
var tag = "a.js";
console.log(tag);
// b.js
var amd = require("./a.js");
console.log("导⼊内容", amd);
```

执行 b.js，查看输出

```bash
node b.js
a.js
导⼊内容：{}
```

由上述代码可知，在被导入的模块没有显式导出内容时，导入的结果是一个空对象，但模块的代码正常执行(打印 a.js 文件)

在模块中，全局作用域下的 this 指向会发生变化。下面对比在控制台(RFPL)和模块中 this 指向的区别，代码如下:

```bash
// REPL 模式
node
> this
<ref *1> Object [global] {
 global: [Circular *1],
 clearImmediate: [Function: clearImmediate],
 setImmediate: [Function: setImmediate] {
 [Symbol(nodejs.util.promisify.custom)]: [Getter]
 },
 clearInterval: [Function: clearInterval],
 clearTimeout: [Function: clearTimeout],
 setInterval: [Function: setInterval],
 setTimeout: [Function: setTimeout] {
 [Symbol(nodejs.util.promisify.custom)]: [Getter]
 },
 queueMicrotask: [Function: queueMicrotask],
 structuredClone: [Function: structuredClone],
 atob: [Getter/Setter],
 btoa: [Getter/Setter],
 performance: [Getter/Setter],
 fetch: [Function: value],
 crypto: [Getter]
}
// app.js
this.name = 'app'
console.log(module.exports)
// 执⾏ app.js
node app.js
// 结果如下 { name: 'app' }
```

可以看出，在控制台(REPL)中 this 指向全局对象 global，而在模块中 this 指向 module.exports 对象。

### 2. Node.js 的内置模块

Node.is 由各种各样的软件包组成，这些软件包统称为模块。Node.is 中的模块分为以下两大
类。

- 内置模块。
- 第三方模块。

内置模块不需要单独安装，直接导入即可使用。Node.is 的系统能力几乎都被封装在一个个的
内置模块中，如前面使用的 path 模块就是一个典型代表。
下面介绍常用的内置模块。

#### 一、path 模块

path 模块用于对路径和文件进行处理。在 macOS、Linux 和 Windows 3 种系统中，路径的
表示方法并不一致。在 **Windows 系统中使用“\”作为分隔符**，而在 **Linux 系统中使用“/”作为分隔符**。
path 模块就是为了屏蔽它们之间的差异，提供统一的路径处理，并支持路径拼接等功能。
path 模块常用的 API 如下：

- path.join():将多条路径连接起来，生成一条规范化的路径
- path.resolve():将一条或多条路径解析成规范化的绝对路径

这里的规范化指的是对于符合当前平台的路径，path 模块会自动识别并处理，示例如下:

```javascript
const path = require("path");
// join输出的是相对路径 ./test.js
console.log(path.join("./", "test.js")); //test.js
//resolve输出的是从当前工作目录解析出的绝对路径
console.log(path.resolve("./", "test.js")); //e:\Projects\frontend-study\test.js
```

在前端工程化项目的配置中，经常使用 path.resolve()方法解析绝对路径。

#### 二、2. fs 模块

fs 模块是文件系统模块，封装了文件操作的能力。使用 fs 模块可以实现文件的创建、修改和

删除。

使用脚手架生成代码的底层原理就是用 fs 模块实现文件夹和文件的创建。下面演示如何读取文

件：

```javascript
const fs = require('fs')
fs.readFile('', 'utf-8', (err, data) => {
	console.log('⽂件内容', data) // data 就是⽂件内容（字符串） })
```

上述代码通过 readFile()方法读取一个文件，第 1 个参数用于表示文件地址，第 2 个参数用于指定文件编码，第 3 个参数用于表示执行结果的回调函数。

文件操作是典型的异步操作，所以需要在回调函数中获取文件数据。其实，fs 模块还提供了对应的同步操作 API，示例如下:

```javascript
const fs = require("fs");
try {
  const data = fs.readFileSync(
    //"E:/Projects/frontend-study/NodeJS/内置模块/test.txt",
    "utf-8"
  );
  console.log("⽂件内容", data);
} catch (err) {
  console.error(err);
}
```

fs 模块的每个异步操作 API 都有对应的同步操作 API，下面统一用同步操作 API 来编写代码示列。fs 模块写入文件的方法如下:

```javascript
const fs = require("fs");
try {
  let content = "我是⽂件内容";
  fs.writeFileSync(
    //"E:/Projects/frontend-study/NodeJS/内置模块/test.txt",
    content
  );
} catch (err) {
  console.error(err);
}
```

在默认情况下，此 API 会替换文件的内容。若文件不存在，则创建新文件。

除了读取文件和写入文件，还有一个常用的操作，即检查文件状态，检查某个文件是否存在获取文件大小都可以通过 fs.statSync()方法来实现，如下所示:

```javascript
const fs = require('fs')
try {
	//let stats = fs.statSync('E:/Projects/frontend-study/NodeJS/内置模块/test.txt')
	console.log(stats.isFile()) // 是否为⽂件
	console.log(stats.isDirectory()) // 是否为⽂件夹
	console.log(stats.size) // ⽂件⼤⼩ } catch (err) {
	console.error(err) }
```

#### 三、http 模块

http 模块提供了极其简单的方式来创建 HTTP Web 服务器，示例如下:

```javascript
const http = require("http");
const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.end("hello world");
});
server.listen(3000, () => {
  //console.log("server address:http://localhost:3000");
});
```

上述代码通过 http.createServer()方法创建了 http 服务器，设置的响应码为 200，响应数据为“hello world”，并且通过监听 3000 端口来访问该服务器。

先把代码放到 index.js 文件中，再把 index.js 文件运行起来:

```bash
node index.js
## server address: http://localhost:3000
```

浏览器输入`http://localhost:3000`，可以看到网页中显示“hello world”

http.createServer()方法的回调函数有 2 个参数，第 1 个参数是请求对象 request，第 2 个参数是响应对象 response，它们是 http 服务器的核心。

请求对象 request 包含详细的请求数据，即前端调用接口传递过来的数据。通过 request 对象可以获取请求头、请求地址和请求方法等，代码如下:

```javascript
const { method, url, headers } = request;
// method: 请求⽅法
// url：请求地址
// headers：请求头
```

响应对象 response 要用于响应相关的设置和操作。响应是指在处理完客户端的请求后，如何给客户端返回结果，主要包括设置响应状态码和响应数据，代码如下:

```javascript
// 设置状态码
response.statusCode = 200;
// 设置响应头
response.setHeader("Content-Type", "text/plain");
// 发送响应数据
response.end("这是服务器的响应数据");
```

为了更好地处理请求和响应，很多成熟的框架基于 http 模块进行改造(如 Express)，由此可以提供更强大的 Web 服务器功能。

### 3. Npm 包管理

Node.js 的第三方模块，即 Npm 软件包。Npm 是全世界最大的包管理器，托管了超过 35 万个第三方软件包。对于 JavaScript 开发者来说，几乎所有需求都有合适的 Npm 包解决方案。

在安装 Node.js 之后，除了可以生成 node 命令，还可以生成 npm 命令。在控制台上检查 npm 版本: `npm -v`

npm 命令用于便捷地管理 Npm 托管的第三方软件包，并且使用不同的参数实现不同的功能 Npm 包的依赖信息记录在 package.json 文件中。

提示:软件包是一些较为独立的代码库。当在项目中使用时，它们也被称为依赖包。项目需要的依赖包定义 在 package.json 文件中，大量的依赖包，以模块的形式存在，允许在项目中导入使用。

因此，在安装一个第三方软件包之前，需要先初始化一个 package.json 文件。初始化文件命令:`npm init`

使用该命令会启动 REPL 模式，提示输入必要的信息，最终会生成 package.json 文件。

#### 一、Npm 包的基础命令

npm 命令主要用于添加、安装和删除模块。假设要在一个 Node.js 项目中安装第三方软件包 axios ，可以执行命令: `npm install axios `

执行上述命令后，在 package.json 文件中会加入以下依赖标识

```json
{
  "dependencies": {
    "axios": "^1.7.7"
  }
}
```

与此同时，在当前目录下还会生成 node_modules 文件夹，这个文件夹中存放的是所有的第三方软件包，安装的 axios 包也在这个目录下。

另一个自动生成的文件是 package-lock.json，这个文件用于依赖包的版本锁定，开发者无须关注。

安装 axios 包后，在项目中导入该模块并使用:

```javascript
const axios = require("axios");
axios.get("...");
```

更新软件包： `npm update axios`

删除软件包： `npm uninstall axios `

上面提到的添加、更新和删除依赖包只针对当前项目，因此属于本地安装。npm 命令还支持全局安装依赖包，安装完成后可以在任意位置使用。全局安装只需要加上一个参数-g 即可。示例：`npm install -g axios`

全局安装的依赖包不会存储在当前目录的 node_modules 文件夹下,可以用 npm 命令来获取全局依赖包的安装位置:

```bash
npm root -g
## D:\Development Tool\nvm\node_global\node_modules
```

更新和删除全局依赖包与上面的原理相同，只需要加上参数 `-g `即可。

其他常见的 npm 命令如下:

- npm update: 更新所有依赖包
- npm list: 查看安装的依赖包
- npm install:安装所有依赖包
- npm install [pkname]:[version]:安装某个固定版本的模块

#### 二、package.json 文件解析

package.json 文件是项目的清单，不仅可以记录第三方软件包的依赖，还包括很多项目的配置信息，以及一些命令的含义。下面介绍几个重要的配置项。

- name: 应用程序/软件包的名称;
- version: 当前版本号;
- description: 应用程序/软件包的描述;
- main: 应用程序的入口点;
- scripts: 定义一组命令;
- dependencies: 第三方依赖列表;
- devDependencies: 第三方开发依赖列表。

通过 npm init 命令初始化生成的 package.json 文件中的内容，具体如下:

```json
{
  "name": "node-demo",
  "version": "1.0.0",
  "description": "Node.js 项⽬⼩样",
  "main": "app.js",
  "scripts": {
    "test": "echo \"this is test command\""
  },
  "author": "hyzhu",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.7.7"
  }
}
```

dependencies 字段和 devDependencies 字段的区别如下:

- dependencies 字段定义的是项目的第三方依赖，是项目本身运行所需要模块;
- devDependencies 字段定义的是开发环境中需要的依赖，一般都是编译构建工具、类型工具(如 Webpack、TypeScript 等)，这些工具不会在生产环境中使用。

安装模块时默认会作为 dependencies 字段安装，如果要安装到 devDependencies 字段中只需要加上参数 -D，具体: `npm install axios -D`

scripts 字段定义了一组命令供 npm 命令调用。例如，上面的代码定义了 test 命令，在控制台中即可按照如下形式使用:

```bash
npm run test
> echo "this is test command"
```

然而大多数脚手架中最常见的用法是将执行命令的逻辑(Node.js 代码)放到一个 JavaScript 文件中。例如，创建一个 dev.js 文件，并编写以下代码:

```javascript
console.log("执⾏打包逻辑");
```

在 scripts 字段中配置一条 dev 命令，具体如下:

```json
"scripts": {
	"dev": "node dev.js"
}
```

然后，在项目目录下打开控制台就可以执行 dev 命令:`npm run dev` // 输出：执行打包逻辑

脚手架中那些耳熟能详的命令(如 npmrun dev 和 npm run build )都是通过这种方式来实现的。

#### 三、npx 命令

npx 是 npm:5.2 之后新增的命令，用于运行 Npm 托管的第三方软件包提供的命令。假设安装了一个 typescript 依赖包:`npm install typescript`

这个包的内部提供了一条 tsc 命令。此时在终端执行 tsc 命令，结果这条命令不存在,

这时 npx 命令就可以派上用场。在项目目录下打开终端，并执行如下命令:

```bash
npx tsc --version
# Version 5.5.4
```

执行 tsc 命令，并打印出 typescript 依赖包的版本

npx 命令是如何找到 tsc 命令并执行的呢?其实，在安装 typescript 依赖包之后，会在 node_modules/.bin 目录下生成一个与命令同名的 tsc 脚本文件，npx 命令找到该命令后执行。因此，以下两条命令的执行效果是一致的:

```bash
npx tsc --version
# 等同于
node_modules/.bin/tsc --version
# Version 5.5.4
```

此时的 node_modules/.bin/tsc 文件其实是 node_modules/typescript/bin/tsc 脚本文的一个软链接(可以理解为引用)，可以用以下命令查看:

```bash
ls -al node_modules/.bin/tsc
```

因此，通过 npx 命令可以便捷地执行 node_modules/.bin 目录下的命令。

### 4. 环境与环境变量

Node.js 中一个非常重要的知识点是环境变量。环境变量表示在 Node.js 进程中存储的，可供运行时全局设置和全局访问的特殊变量。

#### 一、环境是什么

这里的环境不是大自然的秀丽山川，而是指一种应用程序的运行环境。JavaScript 只能在浏器和 Node.js 两种环境下运行。事实上，任何编程语言都必须在某种环境下才能运行--环境就是执行代码的地方。

环境由某种应用程序创建，从本质上来说操作系统是一个巨大的应用程序，因此环境一般分为两大类:

- 系统环境: 在操作系统(如 linux、macOS)启动后创建。
- 应用环境: 在应用程序(如 Node.js )启动后创建。

无论在哪种环境下，都会有一些能在整个环境中访问的值，这些值就是环境变量。因此，环境变量分为系统环境变量和应用环境变量。

在前端工程化项目中，被大量应用的 Node.js 环境变量就属于应用环境变量

Node.js 环境变量存储在 process.env 对象中。最常用的一个环境变量是 NODE ENV，表示当前环境，其判断规则如下：

```bash
process.env.NODE_ENV ='development' // 开发环境
process.env.NODE_ENV=='production' // ⽣产环境
```

应用环境变量可以设置，也可以获取，变量值能在整个应用程序中访问。

#### 二、设置环境变量

当 Node.js 应用程序启动后，就可以自定义当前应用的环境变量，示例如下:

```javascript
//process.env.baseURL = "https://api.xxx.com";
console.log(process.env.baseURL); // 'https://api.xxx.com'
```

之后，环境变量 baseURL 就可以在整个应用程序中访问。

在一些特殊场景下，环境变量需要是动态的，但是源码不可修改。例如，一个打包好的应用程序在运行时才会指定环境变量，这时需要借助系统环境变量。Node.js 可以读取系统环境变量，但不能设置。

系统环境变量定义在当前系统用户的配置文件中，不同的计算机系统(Windows 或 Mac)有不同的设置方式。假设添加了一个名为 BASE URL 的系统环境变量，保存后即可在 Node.js 中通过`process.env.BASEURL `进行

### 5. REPL 模式

REPL 模式是 **Read-Eval-Print Loop** 的缩写，翻译过来就是“读取-执行-输出-循环”。简单来说，REPL 是一种交互式编程环境，允许你一行一行地输入代码，并立即看到执行结果。

具体来说，它的工作流程如下：

1. **Read**（读取）：REPL 等待你输入代码。
2. **Eval**（执行）：输入的代码会被立即执行。
3. **Print**（输出）：执行结果会被马上显示出来。
4. **Loop**（循环）：整个过程会持续，直到你退出。

#### 通俗解释

可以把 REPL 模式想象成跟计算机对话，你问一个问题（输入代码），它立刻告诉你答案（执行并返回结果）。这对学习编程或调试代码非常有帮助，因为你能立刻看到代码的效果，而不需要编译整个程序。

#### 示例

在 JavaScript 环境中，打开浏览器的开发者工具控制台就是一个 REPL。你输入一行 `2 + 2`，它马上会返回结果 `4`。

```javascript
> 2 + 2
4
```

这就是 REPL 模式的简单操作，非常直观和方便。
