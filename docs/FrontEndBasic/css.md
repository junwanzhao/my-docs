# CSS:修饰页面的布局和样式

与 HTML 一样，CSS 也不是一种编程语言。CSS 的中文全称是“层叠样式表”，顾名思义是专门用来设置样式的。CSS 的核心价值就是描述 HTML 元素应该如何被浏览器渲染。

到目前为止，CSS 一共经历了 3 次大版本的选代。CSS1 已经被废弃;CSS2 是 W3C 制定的规范，当前仍然是标准;CSS3 能力强大也最好用，官方标准仍在制定中。现代工程化的前端对新特性几乎做到了全面支持，所以可以不用考虑兼容性问题，大胆地在项目中使用。

关于经典的 CSS2 和未来的 CSS3，下面从两个方面来介绍，分别是“布局”和“样式”

### 1. 3 种页面布局方案

早期的前端布局就是表格布局，主要用作表格的思路来描绘前端页面结构。表格布局不需要特别定义样式，使用 table、tr 和 td 基本上就能满足简单的布局需求。对于稍微复杂一些的页面

table 还支持跨行、跨列和合并单元格，所以在没有 CSS 的情况下，table 使用了很久。

CSS 出现后，不使用 table 也可以做布局。一个简单的 div 标签，先按照页面需要的任意结构互相嵌套，再在 CSS 中自定义布局规则，这种方式比使用 table 更灵活。

CSS 中的布局方式也在不断进化中，先后出现了 3 种。

#### 一、浮动布局

在 CSS 早期，最经典的方案叫做浮动布局。如果想实现左侧是菜单，右侧是内容的布局，基

本代码如下:

```html
<div id="app">
  <div class="menu">我是菜单</div>
  <div class="content">我是内容</div>
</div>
<style>
  #app .menu {
    width: 200px;
    height: 400px;
    float: left;
    background: pink;
  }
  #app .content {
    height: 400px;
    background: lightblue;
  }
</style>
```

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101612799.png)

虽然浮动布局出现得很早，并且流行了很久，但是这种方式并不是很好用。例如，元素浮动后会脱离正常的文档流，导致父元素无法被撑开，高度变成 0，而浮动的元素又与其他元素混在一起，看起来非常奇怪且难以理解。

如果要处理这些奇怪的问题，就需要在 CSS 中通过 clear:both 属性清除浮动。从布局角度来看，这样并不优雅。

#### 二、inline-block 布局

比浮动布局稍好一些的是 inline-block 布局。因为在设置 display:inline-block 属性后，元素本身就会自动横向排列，同时还可以设置宽度、高度、内边距和外边距等，实现起来更直观。

下面采用 inline-block 布局实现上面的左右布局，代码如下:

```html
<style>
  #app {
    display: inline-block;
  }
  #app .menu {
    width: 200px;
    height: 400px;
    display: inline-block;
    background: pink;
  }
  #app .content {
    display: inline-block;
    width: 800px;
    height: 400px;
    background: lightblue;
  }
</style>
```

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101612095.png)

从上图中可以发现一个关键问题，如果采用 inline-block 布局，那么元素之间默认有留白导致元素不能紧挨着，可以使用 letter-spacing 属性来处理:

```html
<style>
  #app {
  ...
  /* 负号后⾯的值可以尽量⼤⼀些 */
  letter-spacing: -100px;
  }
  #app .menu {
  ...
  letter-spacing: 0;
  }
  #app .content {
  ...
  letter-spacing: 0;
  }
</style>
```

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101612960.png)

#### 三、Flex 布局

CSS3 带来了布局的终极方案--Flex 布局。因为要考虑兼容性，所以 Flex 布局早期主要用于移动端，后来随着工程化工具的支持，PC 端也开始普及 Flex 布局。

Flex 布局使用起来非常顺手。例如，之前要实现一个简单的居中布局，还要考虑子元素是块级元素还是行内元素。采用 Flex 布局只需要设置父元素即可，可以无视子元素类型：

```css
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Flex 布局有 3 个重要的概念: **容器、主轴、交叉轴**。

容器很简单。只需要将任意元素设置为 display: flex，该元素就是一个使用 Flex 布局的容器了。在这个容器下，子元素会按照主轴的方向按顺序排列。主轴的默认方向为横向，也就是元素从左到右排列。交叉轴与主轴的方向正好相差 90 度，如果主轴为从左到右排列，那么交叉轴位从上到下排列。

容器的主轴方向是可以设置的，并且设置的方式也很简单:

```css
#app {
  display: flex;
  flex-direction: column;
}
```

这里是使用 flex-direction 属性来设置主轴方向，该属性的可选值有以下 4 个:

- row: 横向从左到右(默认);
- row-reverse: 横向从右到左;
- column: 纵向从上到下;
- column-reverse: 纵向从下到上。

使用这 4 个属性值，不仅可以设置方向，还可以设置相同方向的排列方式，是从前到后，还是从后到前。仅适用 flex-direction 属性就可以解决大部分的布局问题，因此该属性的功能很强大，如图所示:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101612368.png)

当主轴的方向改变时，交叉轴的方向也随之改变。当主轴的方向变成纵向时，交叉轴的方向就变成横向。

在确定主轴和交叉轴的方向之后，接下来就可以考虑如何对齐两个轴上的元素。主轴通过 justify-content 属性来设置元素的对齐方式，该属性的可选值如下:

- flex-start:从左到右;
- flex-end:从右到左;
- center:居中对齐;
- space-between:两端对齐；
- space-around:两端对齐。

space-between 和 space-around 都表示两端对齐，二者的区别就体现在元素的间距上。前者是元素本身没有间距，所以会贴着两边对齐。后者是元素之间的间距要相同，相当于各自有一个相等的 margin，所以不会贴着两边对齐。

除了设置主轴方向的元素对齐，还可以用 align-items 属性设置交叉轴方向的元素对齐，

align-items 属性的可选值如下:

- flex-start: 从上到下;
- flex-end: 从下到上;
- center: 居中对齐;
- baseline: 基线对齐;
- stretch: 填满整个高度(默认)。

前 3 个属性值不再展开介绍，和主轴的含义相同。baseline 是指按照文字的基线对齐。因为一个容器内不同文字的大小可能不同，高度也就会不同，采用基线对齐就可以按照文字的最低处对齐，这样有利于文字排版。

stretch 表示填满整个父元素的高度，如上面提到的左右布局，如果希望任意一列的高度改变时，另一列能以最高的高度显示，永远填满父元素，那么此时使用 stretch 就可以。

使用上面介绍的主轴和交叉轴的方向、排列方式、对齐方式完成布局基本上已经够用。然而当元素在一个方向放不下时，需要换行。

容器元素是否换行，可以通过 flex-wrap 属性设置。flex-wrap 属性的可选值如下:

- nowrap:不换行(默认);
- wrap:换行，第一行在上;
- wrap-reverse:换行，第一行在下。

当一个轴的元素放不下时，默认是不换行的，Flex 容器会将元素的宽度等比例压缩，使其排列到一行。在一般情况下，如果需要换行，将 flex-wrap 属性设置为 wrap 即可，超出元素会自动换到下一行，如图所示:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101612992.png)

### 2. 样式与动画解析

CSS 诞生之初主要是为网页内容添加样式，如最基本的宽度、高度、边距、颜色和字体等

但是随着前端不断地追求用户体验，这些基本样式已经不能满足需求，于是 CSS3 带来了功能更加强大的样式与动画系统，

本节着重介绍新添加的、很酷且非常实用的 CSS3 样式与动画。

#### 一、渐变

可以将 CSS3 渐变(Gradients)看做一个颜色组，用来在两个或多个指定的颜色之间平稳过

渡。设置渐变后，就可以将它视作一种自定义颜色来使用。

CSS3 定义了如下两种类型的渐变:

- 线性渐变(Linear Gradients): 上下/左右/对角方向改变颜色;
- 径向渐变(Radial Gradients): 由中心点向外扩散改变颜色。

线性渐变通过 linear-gradient()函数来实现。linear-gradient()函数的第一个参数表示渐变方向，通过一个角度来控制。示例如下:

- 0deg: 0 度，表示从下到上渐变;
- 90deg: 90 度，表示从左到右渐变;
- 180deg: 180 度，表示从上到下渐变;
- 90deg: -90 度，表示从右到左渐变。

如果要实现一个 120 度的渐变背景色，那么代码如下:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>渐变</title>
    <style>
      .box {
        width: 400px;
        height: 200px;
        /* 当浏览器不⽀持渐变的时候，显示背景⾊ */
        background-color: red;
        background-image: linear-gradient(120deg, red, yellow, blue);
      }
    </style>
  </head>

  <body>
    <div class="box"></div>
  </body>
</html>
```

效果如图：

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101612021.png)

背景可以直接设置渐变色。是否有方法设置渐变色的文字呢?当然有，但不支持将渐变色直接

复制给 color 属性，而是用一种变通的方法实现文字渐变。代码如下:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>⽂字渐变</title>
    <style>
      h1 {
        background: linear-gradient(120deg, red, yellow, blue);
        color: transparent;
        background-clip: text;
        -webkit-background-clip: text;
      }
    </style>
  </head>
  <body>
    <h1>
      前端真好玩前端真好玩前端真好玩前端真好玩前端真好玩前端真好玩前端真好玩前端真好玩前
      端真好玩
    </h1>
  </body>
</html>
```

这里主要使用 -webkit-background-clip 属性将背景色的应用区域只限制在文字上，相当于在文字后面隐藏了这个背景色。之后将文字颜色设置为透明，这样具有文字轮廓的背景色就会显示出来。最终在浏览器中显示的效果如图所示:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101612408.png)

线性渐变和径向渐变大同小异。径向渐变通过 radial-gradient()函数来实现。径向渐变默认展示一个椭圆形状，中心点在正中央。radial-gradient()函数第一个参数 shape 表示形状，支持圆形(circle)和椭圆(ellipse)两种

基于上面的代码实现一个圆形的径向渐变:

```css
<style>
.box {
	width: 400px;
	height: 200px;
	background-color: red;
	border-image: radial-gradient(circle, red, yellow, blue);
}
</style>
```

显示效果如图所示：

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101612285.png)

#### 二、 转换

CSS 转换(Transform)可以对元素本身进行改变，包括移动、缩放、转动或拉伸。

这个特性非常适合做鼠标指针移入动画，如常见的某个按钮，鼠标指针移入时变大或出现阴影，移出后元素恢复原状，用转换实现非常轻松。转换分为 2D 转换和 3D 转换，常用的是 2D 转换。

2D 转换的分类及其对应的实现函数如下:

- 位移:translate(x,y);
- 旋转:rotate(0deg);
- 缩放:scale(x,y);
- 倾斜:skew(x,y);

这些都是经常使用的函数。位移会移动元素本身的位置;旋转会指定一个角度;缩放则以 1 为基准，设置放大或缩小的比例。除了 rotate()，其他函数都可以指定两个参数，分别表示在 X 轴和 Y 轴上如何转换。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>渐变</title>
    <style>
      .box {
        margin: 100px;
        width: 300px;
        height: 300px;
        background-color: lightblue;
        /* 右移 20 像素，上移 30 像素 */
        transform: translate(20px, 20px);
        /* 旋转 60 度 */
        transform: rotate(60deg);
        /* 放⼤ 1.2 倍 */
        transform: scale(1.2);
        /* X 轴倾斜 10 度，Y 轴倾斜 20 度 */
        transform: skew(10deg, 20deg);
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>
```

用两个参数表示 X 轴和 Y 轴如何转换的方法，也可以拆成两个单独的方法分别设置 X 轴和 Y 轴上的变化。例如，可以将位移函数 translate(20px,30px)拆分为如下形式:

- translateX(20px):X 轴位移 20 像素;
- translateY(30px):Y 轴位移 30 像素;

transform 属性还支持同时定义多个参数。例如，设置一个元素，鼠标指针移入时放大并旋转代码如下:

```css
.box:hover {
  transform: scale(1.2) rotate(30deg);
}
```

#### 三、过渡

CSS3 中的过渡(Transition)是指元素在发生变化时，可以指定一个时间让元素慢慢变化，而不是瞬间改变，瞬间改变给用户的感觉太生硬，加一些过渡效果会有更好的用户体验。

实现过渡也很简单，需要指定两方面的内容:一是需要过渡的 CSS 属性，二是效果持续的时间。

例如，对于一个元素，在鼠标指针移入时高度升高 50 像素，移出时恢复原状，动画持续的时间是 1 秒，代码如下:

```css
<div class="box"></box>
<style>
.box {
 width: 200px;
 height: 200px;
 background-color: lightblue;
 transition: height 1s;
}
.box:hover {
 height: 250px;
}
</style>
```

在浏览器中运行，可以看到鼠标指针移入和移出元素时，高度在缓慢改变。

过渡还支持多个属性同时改变，如果想要将上面的动画改为“鼠标指针移入时高度增加 50 像素，向右移动 50 像素，同时放大 1.1 倍”，那么 CSS 部分可以修改如下:

```css
<style>
 .box {
 width: 200px;
 height: 200px;
 background-color: lightblue;
 transition: height 1s, transform 1s;
 }
 .box:hover {
 height: 250px;
 transform: translate(50px) scale(1.1);
 }
</style>
```

翻阅 API 文档可以发现，transition 其实是一个简写属性，由以下 4 个属性组成。

- transition-property:指定过渡的 CSS 属性名;
- transition-duration:指定过渡时间，默认为 0;
- transition-timing-function:过渡时间的变化速度，默认为 ease;
- transition-delay:过渡何时开始，默认为 0。

前面只用到了前两个属性，后两个属性的功能其实更强大，利用它们能做出很多效果。例如，第三个属性用来指定时间的变化速度，可以设置为匀速(linear)、先快后慢(ease-out)、先慢后快(ease-in)、或快或慢(ease)(开始和结束时速度较慢，中间时速度较快)等。如果要更精确地控制不同时间的变化速度，那么可以直接使用贝塞尔曲线:

```css
.box {
  transition: transform 1s cubic-bezier(0.2, 0.1, 0.2, 1);
}
```

贝塞尔曲线可以通过 cubic-bezier(x1,y1,x2,y2)方法实现。该方向一共有 4 个参数，分别表示两个控制速度变化的点坐标，也就是下图中 P1 和 P2 两个点的坐标。

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101613129.png)

这两个点的坐标的改变会引起曲线的改变，同时速度会随着曲线的坡度改变而改变。

transition-delay 属性用于指定动画延迟触发，这样可以在上一个动画完成后再出发下一个从而实现简单的连续动画。

#### 四、动画

在 CSS 中，利用过渡可以很轻松地实现常用的动画效果，但是过渡是一种线性行为，只能指定从 A 到 B 的直线变化。加入需要一个连续动画，让某个元素永不停止地旋转，此时使用过渡就无法达到目的了。

制作连续动画需要使用 CSS 中的 animation 属性来实现。动画通过 @keyframes 来定义，下面列举一个简单的例子:

```css
/* 定义动画 */
@keyframes myAnimation {
  from {
    transform: red;
  }
  to {
    background: blue;
  }
}
/* 使⽤动画 */
.box {
  width: 300px;
  height: 300px;
  animation: myAnimation 5s;
}
```

上述代码定义了一个动画并命名为 myAnimation。其中，from 和 to 分别代表开始和结束的

变化。在使用时，将 myAnimation 动画赋值给元素的 animation，并指定动画时间。

- animation 也是一个简写形式，包含的动画属性有以下几个:
- animation-name:指定动画名称;
- animation-duration:指定动画时长;
- animation-timing-function:指定速度变化曲线，如贝塞尔曲线;
- animation-delay:指定延迟时间;
- animation-iteration-count:指定动画播放次数，如 infinite 代表无限次。

在了解了上述内容后，实现一个元素永不停止地旋转就会简单很多:

```css
/* 定义动画 */
@keyframes myAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
/* 使⽤动画 */
.box {
  margin: 100px;
  width: 200px;
  height: 200px;
  background-color: lightblue;
  animation: myAnimation 12s linear 0s infinite;
}
```

定义动画，除了使用 from 和 to 分别表示开始和结束的变化，还可以用百分比以更细粒度控

制动画在不同时间点分别做什么。from 和 to 对应的百分比分别是 0% 和 100%。

下面用动画来实现跑马灯效果，代码如下:

```html
<div class="marquee">
  <div class="marquee-content">
    这是⼀个跑⻢灯效果的例⼦⽂字，可以循环滚动显示。
  </div>
</div>
<style>
  /* 设置跑⻢灯容器的样式 */
  .marquee {
    width: 300px; /* 跑⻢灯的宽度 */
    overflow: hidden; /* 隐藏超出容器的内容 */
    white-space: nowrap; /* 禁⽌⽂字换⾏ */
    border: 1px solid #000; /* 可选：添加边框 */
    position: relative; /* 相对定位 */
  }
  /* 设置滚动内容的样式和动画 */
  .marquee-content {
    display: inline-block; /* 将内容设为⾏内块级元素 */
    padding-left: 100%; /* 初始位置从右边界之外开始 */
    animation: marquee 10s linear infinite; /* 设定动画，10秒完成⼀次循环，线性
		动画，⽆限循环 */
  }
  /* 定义滚动动画 */
  @keyframes marquee {
    0% {
      transform: translateX(0); /* 起始位置 */
    }
    25% {
      transform: translateX(-25%); /* 移动到容器宽度的四分之⼀ */
    }
    50% {
      transform: translateX(-50%); /* 移动到容器宽度的⼀半 */
    }
    75% {
      transform: translateX(-75%); /* 移动到容器宽度的四分之三 */
    }
    100% {
      transform: translateX(-100%); /* 移动到容器外部 */
    }
  }
</style>
```

上述代码指定了不同时间点(百分比)的变化位置，并应用到元素上循环播放。

### 3. CSS 工程化

提到前端工程化，基本上是指 JavaScript 的工程化体系。很多前端程序员可能没有意识到 CSS 也是有工程化的，如 Sass 和 Less 就是 CSS 工程化的一种。

由于 CSS 不支持嵌套用法，因此当 HTML 结构比较复杂时，CSS 代码就会存在明显的类名重复，可读性差，以及难以维护等问题。示例如下:

```css
.main {
  font-size: 18px;
}
.main .box {
  margin: 10px;
}
.main .box h2 {
  font-size: 20px;
}
.main .box h2 span {
  color: red;
}
```

除此之外，CSS 还不支持模块化。JavaScript 在 ES6 中支持通过 import/export 来导入和导出模块，使代码更好地隔离而互不影响，但是 CSS 显然还做不到这一点。

但是这些问题在前端工程化的演进中已经用工程化的方式解决了，这些解决方案中最主要的角色就是预处理。

#### 一、预处理器：Less/Sass

对于 CSS 来说，预处理器就相当于 React 和 Vue.js 对应 JavaScript 的意义。预处理器提供了更简单、更高效的方式来实现功能，开发者不用撰写 CSS 代码，它会处理好一切，如图所示：

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101613267.png)

预处理器的代表是 Less 和 Sass，它们普遍具有如下特性

- 具有嵌套代码的能力;
- 支持模块化的引用;
- 支持定义 CSS 变量;
- 允许代码混入;
- 提供计算函数。

嵌套代码就是上面展示的有层级的代码。Less 和 Sass 都实现了模块化引用，用关键字

@import 来表示引入，导出不需要显示指定。示例如下:

```less
// a.less
.box {
  background: red;
}
// b.less
@import "./a.less" .box2 {
  background: blue;
}
```

提示：这里的模块化引用仅仅是将两个文件拼接到⼀起，并没有做到真正的模块化。例如，在 JavaScript 中导入另⼀个模块，两个模块的代码不会发生冲突。当使用 Sass/Less 导入模块 时，如果两个模块有相同的类名，就会覆盖其中一个类名。

#### 二、代码复用：变量和混入

在 JavaScript 中复用一段代码很容易，但是在 CSS 中则比较困难。复用代码可以分两个层次，分别为复用一个属性(变量)和复用几个属性(代码片段)。如果在项目中指定了一个主题色，这个主题色在所有页面的 CSS 中几乎都要使用，那么是否可以设置成一个变量呢?

预处理器同样支持变量，不过 Less 和 Sass 的定义标识不同。前者使用符号 @，后者使用符号 $。示例如下:

```less
// a.less
@main-color: red;
.a {
  color: @main-color;
}
// b.sass
$main-color: red;
.a {
  color: $main-color;
}
```

编译后的结果相同:

```css
.a {
  color: red;
}
```

不过在 Chrome 49 之后，CSS 支持自定义变量，但定义方式又与预处理器有所不同。先通过根伪类:`root` 来表示变量可以全局使用，再使用前缀--来表示变量名，最后使用 var()函数引用变量:

```css
:root {
  --main-color: red;
}

.a {
  color: var(--main-color);
}
```

复用单个属性的需求实现了，如何复用一个代码片段(一组属性)呢?

预处理器对于代码片段的复用称为混入(Mixins)。使用 Less 实现混入的方式如下:

```less
/* 阴影代码⽚段 */
.custom-shadow {
  box-shadow: 2px 0px 2px 1px #f3f3f3;
  &:hover {
    box-shadow: 2px 2px 10px 2px #ddd;
  }
}
/* 使⽤代码⽚段 */
.box1 {
  background: red;
  .custom-shadow();
}
.box2 {
  background: blue;
  .custom-shadow();
}
```

我们可以使用 [Less 的在线编辑器](https://lesscss.org/less-preview)，将 Less 代码输入到左边，观察右边的编译效果:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101613345.png)

可见，Less 先将代码片段定义为一个类名，再在需要使用这个代码片段的地方将类名当做函数使用。不过这种方式会使代码片段和普通样式难以区分。下面通过示例来介绍 Sass 是如何实现的。

```sass
// 阴影代码⽚段
@mixin custom-shadow {
 box-shadow: 2px 0px 2px 1px #f3f3f3;
 &:hover {
 box-shadow: 2px 2px 10px 2px #ddd;
 }
}
// 使⽤代码块
.box1 {
 background: red;
 @include custom-shadow;
}
.box2 {
 background: blue;
 @include custom-shadow;
}
```

我们可以使用[ Sass Playground](https://sass-lang.com/playground/) ，将 Sass 代码输入到左边，观察右边的编译效果:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101613917.png)

Sass 的实现方式比较优雅，一目了然。

预处理器还内置了许多函数，在定义一些复杂值时非常方便。例如，下面的代码中的 hsl()函数通过色相(hue)、饱和度(saturation)和亮度(lightness)来创建一种颜色。

```css
.box {
  background: hsl(90, 100%, 50%);
}
```

#### 三、后处理器：PostCSS

预处理器提供了一系列高级功能，最终将代码转换成 CSS 代码。但是转换成 CSS 代码后并不是就万事大吉了，如果一些新属性需要做浏览器兼容，那么需要添加一些浏览器指定的前缀。

```css
.box {
  transition: all 4s ease;
  -webkit-transition: all 4s ease;
  -moz-transition: all 4s ease;
  -ms-transition: all 4s ease;
  -o-transition: all 4s ease;
}
```

显然，这样的用法是非常繁琐的，但是有了 PostCSS 就可以完全忽略浏览器指定的前缀。在

预处理器将代码转换成 CSS 代码后，PostCSS 会监测到一些需要兼容的属性，并且自动在属性前添加前缀，这是通过 autoprefixer 实现的。

除了自动添加前缀，PostCSS 还支持直接使用未来的 CSS 语法，并且可以自动处理 polyfils。当然，要实现这两项功能还需要构建工具(如 Webpack、Vite)进行配合。

### 4. 动态值与响应式

响应式布局是为了在不同屏幕尺寸的设备上打开网页时，可以动态显示适合当前设备的样式。从而解决 PC 端网页用手机打开样式“乱跑”的问题。

响应式的一个关键就是“动态”。例如，一个元素的字号在 PC 上是 20 像素，在平板电脑上会变成 18 像素，在手机上则变成 16 像素。不同的屏幕要展示合适的尺寸，可以使用 CSS 的媒体查询来实现。示例如下:

```css
body {
  font-size: 20px;
}
@media screen and (max-width: 850px) {
  body {
    font-size: 18px;
  }
}
@media screen and (max-width: 400px) {
  body {
    font-size: 16px;
  }
}
```

媒体查询是响应式的一种方案，CSS3 提供了多种方案可供选择。

- 使用 rem;
- 使用 ww 和 vh;
- 计算动态尺寸。

rem 是一个新的 CSS 单位，其值永远指向 HTML 根元素的 font-size 属性，比如我们设置了如下样式:

```css
html {
  font-size: 10px;
}
body h2 {
  /* 编译后的结果是 font-size: 20px; */
  font-size: 2rem;
}
```

如果动态更改 HTML 根元素的 font-size 属性，那么使用 rem 的样式都会自动改变。媒体查询只能用来设置一个宽度的范围，相当于设置一个边界值，但是 rem 可以用来设置“连续变化”的效果。

下面演示如果通过监听浏览器窗口的变化来实时改变 rem 的值：

```html
<h2>前端真好玩</h2>
<style>
  html {
    font-size: 10px;
  }
  body h2 {
    font-size: 2rem;
  }
</style>
<script>
  // 判断窗⼝变化事件
  let resizeEvent =
    "orientationchange" in window ? "orientationchange" : "resize";
  // 函数，动态修改根元素的 font-size 属性
  const recalc = () => {
    let width = document.body.clientWidth;
    document.getElementsByTagName("html")[0].style.fontSize =
      14 * (width / 750) + "px";
  };
  // 监听⽂档初始化事件
  document.addEventListener("DOMContentLoaded", recalc);
  // 监听窗⼝变化事件
  window.addEventListener(resizeEvent, recalc);
</script>
```

在浏览器中运行代码，并且不断改变窗口的宽度，可以发现字号会随之不断改变

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101613127.png)

上述代码是兼容性比较好的实现方案，如果充分发挥 CSS 的能力，还可以更简单。vw 和 vh 分别代表浏览器窗口的宽度和高度。示例如下:

```css
.box {
  /* 1vw = 浏览器宽度的 1% */
  width: 20vw;
  /* 1vh = 浏览器⾼度的 1% */
  height: 20vh;
}
```

当为一个属性赋值 ww/vh 时，这个属性就变成一个动态值。例如，简单的左右布局，设置左侧元素的宽度为 20vw，右侧元素的宽度为 80vw，这样就实现了响应式。

函数 calc()的功能很强大，借助这个函数可以轻松计算函数。例如，一个三栏布局，左右两栏固定，中间栏填充剩余空间。如果不借助 Flex 布局，就可以采用如下形式:

```less
.box {
  .left {
    width: calc(100vw - 100px - 80px);
  }
  .right {
    width: 80px;
  }
}
```

由此可知，calc() 函数可以混合计算 vw、vh 和像素等不同单位，相当于可以在 vw/vh 动态 值的基础上再加⼀层动态计算。这样就会⾮常灵活，程序员可以充分发挥计算的能力。

请思考，上面监听浏览器窗口的变化，以及改变 rem 的值是否连续还有更好的方式吗？使用纯 CSS 代码能否实现？ 当然是可以的，并且非常简单。

```
body { font-size: 0.3vw; }
```

因为 vw 是动态值，所以根元素的 font-size 属性也变成了动态值，进⽽ rem 也变成了动态值。此时如果再改变浏览器窗⼝的宽度，⽂字⼤⼩就会随之改变。
