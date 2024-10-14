# HTML:搭建页面的结构

HTML 是伴随浏览器一起出现的超文本标记语言。HTML 由一系列的元素组成，在浏览器上可以看到的所有消息(如文字、图片和视频等)都是基于 HTML 元素搭建的。HTML 元素就像积木一样，可以任意嵌套和排列组合，由此搭建出各种各样的页面。

HTML 的基本结构如下:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello World</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

HTML 结构中最基本的 3 个元素：

- `<html>`元素: 应用的根元素，用来包裹所有元素;

- `<head>`元素: 该元素的内容对用户不可见，主要包含文档的配置信息;

- `<body>`元素: 所有可见元素的父元素，包含期望让用户在访问页面时可以看到的所有文档内容。

### 核心 DOM 体系

HTML 是由元素组成的，下面介绍**元素的结构**：
HTML 是由元素组成的，下面介绍**元素的结构**：

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141206827.png)

以`<p>`元素为例，左边是开始标签(Start Tag)(`<p>`)，右边是结束标签(End Tag)(`</p>`)，中间是元素的内容。**一对标签再加上中间的内容，经过浏览器渲染，就变成一个元素(Element)**

除了包含标签和内容，元素还可以指定属性`(Attribute)`。属性的作用是为元素添加额外的信息。例如，常用的 id 和 class 就是元素的属性，可以依据属性在 CSS 中修饰样式，也可以在`JavaScript`中获取元素。

当元素被渲染后，JavaScript 中会有一套 Web API 来访问这些元素，这套 API 被称为 DOM(Document Object Model，文档对象模型)。DOM 会将 HTML 文档的每个元素解析为节点和对象，最终将其组合成一棵 DOM 树，这棵 DOM 树的结构与 HTML 文档的结构一一映射。

DOM 不仅是一套接口，更是一套规范。DOM 作为 W3C 规范的一部分，约束了浏览器中的 JavaScrip 与 HTML 之间的交互方式，因此程序员才有机会用同一套 API 操作 HTML，而不必关心浏览器底层差异。

#### DOM 树的解析

DOM 以树的形态存在，树中的最小单位是节点(Node)。在 DOM 中的一切都是节点，文本是节点，属性是节点，注释也是节点。上面提到的元素自然也是节点。

DOM 中主要有 4 种类型的节点:

- Document: 整个 DOM 树;
- Element: 单个元素;
- Text: 元素内的纯文本;
- Attribute: 元素的属性。

一份 HTML 文档会被浏览器解析成各种节点，这些节点组成 DOM 树。

前面介绍的 HTML 的基本结构可以解析成如图所示的 DOM 树:
![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141207660.png)
可以看出，DOM 树的节点之间或是平级关系或是嵌套关系，可以把 DOM 树中节点之间的关系分为两大类：

- 父子节点: 节点之间是嵌套关系;
- 兄弟节点: 节点之间是平级关系;

这两种关系与后面要介绍的组件之间的关系基本上一致的。节点之间的关系如同所示。

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141207923.png)

下面介绍使用 DOM API 操作节点的方法。假设要获取页面上的`<div>`元素，那么可以按照如下形式操作:

```
var div = document.getElementById("div");
var div = document.querySelector("#div");
var div = document.getElementByTagName("div")[0];
```

上述 3 个方法都通过 DOM API 获取了一个 `<div>`元素。在获取 `<div>`元素后，可以直接对其修改或删除，具体如下:

```javascript
// 修改属性
div.style.width = "300px";
// 修改元素内容
div.innerHTML = "我的 div 的内容";
// 带标签的元素内容
div.innerHTML = "<span>我的 div 的内容</span>";
// 删除元素
div.remove();
```

除了获取已经存在的元素进行操作，还可以创建一个新元素，具体如下:

```javascript
// 获取⽗节点
var parent = document.getElementById("parent");
// 创建新节点
var span = document.createElement("span");
// 设置 span 节点的内容
span.innerHTML = "hello world";
// 把新创建的元素加⼊⽗节点
parent.appendChild(span);
```

<font style="color:#7E45E8;">提示:</font>目前，大多数程序员基本上都在使用 Vue.js 框架或是 React 框架，很少直接执行 DOM 操作。但是页面更新的本质就是元素发生变化，只不过是框架做了修改 DOM 的事情,DOM 操作是前端基本功，必须要掌握。

#### `<head>`元素的解析

`<head>`元素规定了文档相关的配置信息(元数据)，包括文档的标题、引用的文档样式和脚本等，要求至少包含一个`<title>`元素来指定文档的标题。

`<head>` 元素通常包含以下 4 个子元素:

- `<title>`元素: 用于设置文档标题;
- `<link>`元素: 用于引入外部资源，通常引入的是 CSS 和图标;
- `<script>`元素: 用于引入 JavaScript 或执行 JavaScript 脚本;
- `<meta>`元素: 用于配置元数据。

其中，比较重要的是 `<link>`元素和 `<meta>`元素：
(1)`<link>`元素通过 ref 属性来指定加载什么类型的资源，通过 href 属性指定加载的资源的地址，具体如下:

```html
// 加载⽹⻚的 icon 图标 <link rel="icon" href=""xxx.ico"/> // 加载 CSS ⽂件
<link rel="stylesheet" href="xxx.css" />
// 加载 iOS 的 icon 图标
<link rel="apple-touch-icon" href="xxx.png" />
// 应⽤被安装到桌⾯时加载的配置⽂件
<link rel="manifest" href="xxx.json" />
```

`manifest`的作用是当前网页变成 PWA 渐进式应用时，加载和读取指定的配置文件。

在做前端响应式布局时，通常会在 CSS 中编写媒体查询，即满足某个条件后使用某个样式。例如，正常网页的背景色是灰色的，如果要在打印时变成白色，一般的做法就是在 CSS 中添加每次查询代码，具体如下:

```css
@media print {
  body {
    background: #fff;
  }
}
```

其实，`<link>`元素也提供了这样的功能，即通过提供 media 属性来指定媒体类型，只有媒体类型匹配时才会加载资源。上面在 CSS 中编写的打印样式与下面使用`<link>`元素实现的效果是一样的:

```css
<link rel="stylesheet" media="print" href="./print.css"/>
// print.css
body {
  background: #fff;
}
```

(2)因为 `<meta>`元素用于配置元数据，所以在 HTML 的基本结构中就有一个简单的`<meta>`元素:

```html
<!--指定网页的字符编码是 UTF8  -->
<meta charset="utf-8" />
```

<meta>元素可以表示的内容非常丰富，大多是通过 name 属性和 content 属性来指定的。例如，为网站进行SEO 会添加下面的关键字和描述信息:

```html
<!-- 为了更好地进⾏ SEO -->
<meta name="author" content="mqxu" />
<meta name="keywords" content="HTML，CSS，JavaScript，AJAX" />
<meta name="description" content="前端学习教程" />
```

对移动端而言至关重要的属性是 viewport(视口)，使用该属性可以控制页面的大小等。视口又分为布局视口(Layout Viewport)和视觉视口(Visual Viewport)，差别如图所示:

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141207927.png)

布局视口(Layout Viewport)

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141207202.png)

视觉视口(Visual Viewport)

### 语义化元素

所有用户在网页上可见的元素，都需要作为子元素添加在`<body>`元素中。`<body>`元素可以包含任意内容(如标题、段落、图片、视频和表格等)，不同的内容实用不同的元素来表示。

假设需要添加一段文字和一张图片，可以使用如下代码:

```html
<p>前端开发实战</p>
<img src="xxx.png" />
```

#### 元素的分类

可以将 元素中的子元素分为以下两类：

- 内容元素:如文字、图片等用于展现内容的元素；
- 布局元素:不直接展示内容，而是将内容元素更好地排列布局 。

内容元素包括内容展示元素和内容操作元素，示例如下：

```html
<!-- 标题 -->
<h1>⼀级标题</h1>
<h2>⼆级标题</h2>
<!-- 段落和⽂本 -->
<p>这⾥是⼀段很⻓的⽂本，还嵌套<span>span</span>等元素</p>
<!-- 图⽚和链接 -->
<img src="images/logo.png" />
<a href="http://www.xxx.com">链接</a>
<!-- 按钮 -->
<button>按钮</button>
<!-- ⽂本框 -->
<input type="text" value="可编辑的内容" />
<textarea value="可编辑的⼤段内容" />
```

从上述代码可以看出，内容元素一般就是行内元素和表单，是网页的最小单元。

最经典的布局元素就是`<div>`元素，该元素可以装载万物。例如，将上述内容元素放到`<div>`元素中，并指定不同的类名和样式，就能把想要的网页布局搭建出来。

早期的前端网页基本上都采用 DI+CSS 的布局方式，不同的布局区域全靠类名进行区分。虽然能实现目的，但是并不推荐采用这种方式，主要原因如下:

- 如果全部使用 DIV 布局，代码结构看上去就会很混乱，可读性比较差;
- 开发者难以区分代码结构，浏览器自然也无法区分，这就会导致 SEO 的效果很糟糕。

#### 使用语义化的布局元素

下面引入一个全部使用 `<div>`元素布局页面的示例，代码如下:

```html
<div class="head">
  <span>我是标题</span>
</div>

<div class="nav">
  <a href="html.html">HTML</a> | <a href="css.html">CSS</a> |
</div>

<div class="box">
  <div class="menu">
    <span>侧边栏</span>
  </div>
  <div class="content">
    <span>主体内容区域</span>
    <div class="text-area">
      <p>具体的⽂章内容</p>
      <img src="xxx.png" />
    </div>
  </div>
</div>

<div class="foot">
  <p>这是尾部</p>
</div>
```

上述代码的类名比较规范，虽然能通过类名进行简单区分，但是无法解决根本问题。还有更好的方案，就是使用更符合语义化的布局元素。

**语义化就是用不同含义的元素代替清一色的 `<div> `元素**，能立刻看懂，例如，网页的头部可以用`<div>`元素，但是用`<header>`元素更直观，将上述 `<div>`元素布局改造成符合语义化的布局结构，如下:

```html
<header>
  <h1>我是标题</h1>
</header>

<nav><a href="html.html">HTML</a> | <a href="css.html">CSS</a> |</nav>

<section>
  <aside>
    <span>侧边栏</span>
  </aside>
  <main>
    <h2>主体内容区域</h2>
    <article>
      <p>具体的⽂章内容</p>
      <img src="xxx.png" />
    </article>
  </main>
</section>

<footer>
  <p>这是尾部</p>
</footer>
```

这样就非常直观，一目了然，代码中的语义化元素是 HTML 5 新增的，其具体含义如下:

- `<header>`元素: 网页的头部区域;
- `<nav>`元素: 导航区域，用于展示页面切换导航;
- `<section>`元素: 页面中的一块子区域
- `<aside>`元素: 侧边栏，一般是侧边菜单;
- `<main>`元素: 页面内容区域，不包括导航、菜单、侧边栏、头部和尾部等部分;
- `<article>`元素: 文章区域，一般在`<main>`元素中;
- `<footer>`元素: 网页的尾部区域。

`<header>`元素、`<nav>`元素、`<aside>`元素、`<main>`元素和 `<footer>` 元素建议每个页面只出现一次，因为多次出现是不符合语义的。在浏览器解析到这些元素时，重点从`<header>`元素和 `<nav>`元素和 中抓取关键字。如果都是`<div>`元素，浏览器就无法判断哪部分是关键区域，这也是语义化能实现更好的 SEO 的原因。

### 了解 HTML 5

HTML5 作为下一代 HTML 标准，有许多新特性，前面用到的语义化元素就是其中的一部分。 HTML5 的新特性主要包括以下几点：

- 增加了音频元素 `<audio>`和视频元素 `<video>`;
- 增加了绘画元素`<canvas>`和 `<svg>`;
- 增强了对表单的支持;
- 引入了本地存储机制;
- 支持地理定位和拖放;
- 支持 WebWorkers;
- 支持 WebSocket。

#### 认识音/视频元素

音/视频元素是 HTML 多媒体能力的极大突破，以前需要使用 Flash 才能播放视频，现在使用一个 `<video>`元素就可以。

音/视频元素主要有 3 个:`<audio>`是音频元素;`<video>`是视频元素;`<source>`元素包裹在 `<audio>`元素或 `<video>`元素中，主要从来指定音/视频类型和资源地址。
引入一个简单的音频播放器的代码如下:

```
<audio controls>
	<source src="test.mp3" type="audio/mpeg" />
	<span>您的浏览器不⽀持 audio 标签</span>
</audio>
```

引入一个基本的视频播放器的代码如下:

```
<video id="video1" controls>
	<source src="test.mp4" type="video/mp4"/>
	<span>您的浏览器不⽀持 video 标签</span>
</video>
```

`<video>`元素中有多个**属性**可以配置如何播放视频，常用的如下:

- poster: 视频封面，视频没有播放时显示的图片;
- autoplay: 自动播放;
- loop: 循环播放;
- controls: 显示视频控制条;
- muted: 是否禁音。

#### 使用 JavaScript 操作视频

除了使用 controls 属性显示视频控制条，还可以通过 DOM API 来操作视频，示例代码如下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>使⽤ JavaScript 操作视频</title>
  </head>
  <body>
    <div style="width: 800px; height: 600px">
      <video
        id="video1"
        style="width: 100%; height: 100%; object-fit: fill"
        controls
      >
        <source src="test.mp4" type="video/mp4" />
        <span>您的浏览器不⽀持 video 标签</span>
      </video>
    </div>
    <button onclick="toPlay()">暂停/播放</button>
    <button onclick="setVolume()">设置⾳量</button>
    <button onclick="forward()">快进 15 秒</button>
    <script>
      const video = document.getElementById("video1");
      // 播放/暂停
      const toPlay = () => {
        if (video.paused) {
          video.play(); // 播放
        } else {
          video.pause(); // 暂停
        }
      };
      // 设置⾳量，⾳量范围为 0~1
      const setVolume = () => {
        video.volume = 0.3; // 30%
        // video.volume = 0 // 静⾳
      };
      // 快进 15 秒
      const forward = () => {
        // video.duration 表示视频总时⻓，单位为秒
        // video.currentTime 表示视频已播放时⻓，单位为秒
        let long = 15;
        if (video.duration > video.currentTime + long) {
          // 快进 15 秒还没到总时⻓，就加 15 秒
          video.currentTime = video.currentTime + long;
        } else {
          video.currentTime = video.duration; // 直接到末尾
        }
      };
    </script>
  </body>
</html>
```

在网页中，常见的场景是，在 Banner 图下面放一段循环播放的小视频作为背景。这个功能的实现很简单，具体如下:

```
<video id="video2" loop muted autoplay>
	<source src="test.mp4" type="video/mp4" />
</video>
```

除了正常的视频播放，音/视频元素还可以用于直播。关于直播，可以用**哔哩哔哩网站开源的 flv.js **实现。

### 实现表单与验证

HTML 5 在原有表单元素的基础上进行了丰富的扩展，主要表现为添加了许多新的属性，使之前需要用 JavaScript 才能实现的功能，现在用原生标签就可以轻松实现。

#### `<input>` 元素的新功能

表单元素中最具有代表性的是 `<input>`元素，增加了许多新的 type 属性，具体如下:

```
<!-- 选择⽇期 -->
<input type="date" />
<!-- 选择时间 -->
<input type="time" />
<!-- 选择⽇期时间 -->
<input type="datetime-local" />
<!-- 选择⽉份 -->
<input type="month" />
<!-- 选择颜⾊ -->
<input type="color" />
<!-- 数字⽂本框 -->
<input type="number" min="1" max="10" />
<!-- 邮箱⽂本框 -->
<input type="email" />
<!-- 滑动条 -->
<input type="range" min="1" max="10" />
```

上面这些是最常用的，并且都是 Chrome 浏览器支持的 type 值。

除了带来新功能的 type 属性，`<input>`元素还增加了非常多且有用的其他属性。这些属性护展了 `<input>`元素的能力，使表单提交越来越满足多样化的需求。新增加的其他常用属性如下:

- autofucus: 自动聚焦;
- autocomplete: 自动填充:
- max/min: 最大/最小值;
- maxlength: 最大字符长度;
- disabled: 禁用元素;
- readonly: 元素只读;
- form: 指定所属表单;
- required: 必填;
- pattern: 自定义验证规则;
- novalidate: 提交表单时不验证。

<font style="color:#7E45E8;">提示:</font>required、pattern 和 form 属于表单项的属性，不仅适用于 `<input>`元素，还适用于其他能作为表单项的元素，如`<select>`元素和`<button>`元素。

#### 为表单提交添加验证

接下来实现添加验证的基本表单功能，代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form id="form1">
      <input
        type="text"
        name="name"
        placeholder="输⼊姓名"
        maxlength="5"
        required
      />
      <input
        type="number"
        name="age"
        placeholder="输⼊年龄"
        min="15"
        max="65"
        required
        style="width: 100px"
      />
      <input
        type="text"
        name="gender"
        value="男"
        placeholder="输⼊性别"
        required
        disabled
      />
      <input type="submit" value="提交" />
      <input form="form1" name="other" placeholder="输⼊额外信息" required / >
    </form>
  </body>
</html>
```

直接点击“提交”按钮时，第一个 `<input>`元素的验证会被触发，如图所示:

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141208116.png)

`<form>`元素的验证逻辑是按照子元素的顺序验证，在第一个表单项验证通过后才会验证下一个。maxlength 属性不需要单击“提交”按钮就会直接限制输入的字符，超过 5 个字符就无效。下面验证数值文本框。当单击“提交”按钮时，触发最大/最小值验证，如图所示:
![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141208162.png)

性别输入验证比较特殊，既要求 required，又规定 disabled。试验结果表示，当元素被设置为 disabled 时，表单的验证失效，将 disabled 换为 readonly 后，效果是一样的。这说明，只有当表单项可编辑时，才会有表单验证，否则表单验证无效。这也是符合实际情况的。

虽然 disabled 属性和 readonly 属性非常类似，但二者也存在区别，具体如下:

- disabled 属性对所有表单类元素有用，readonly 属性只对文本和密码文本框有用;
- 设置 disabled 属性后，JavaScript 获取不到目标元素，设置 readonly 属性则可以;
- 设置 disabled 属性后，表单数据不会传输，设置 readonly 属性则依然可以传输;
- disabled 属性和 readonly 属性都会使表单验证失效。

所以，在元素被设置了 disabled 属性或 readonly 属性后，相当于同时设置了 novalidate 属性。额外信息输入框不在 `<form>`元素的包裹之内。然而在前面的元素验证通过后，该元素的验证也会被触发，如图所示:
![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141208580.png)

在一些复杂的页面场景中，有时文本框可能不会包裹在`<form>`元素之内，这时可以用 form 属性为文本框绑定表单，这与将其放到`<form>`元素中的效果是一样的。

在所有验证通过后，表单的逻辑是将数据提交到某个地址，此时会刷新页面，这不是我们想要的。在前后端分离的开发模式下，通常希望只获取验证后的输入值，不刷新页面，获取值后自行处理，实现其实很简单，在`<form>`元素中添加一个 onsubmit 事件:

```
<form id="form1" onsubmit="onSubmit(this);return false;">
 ...
</form>
```
