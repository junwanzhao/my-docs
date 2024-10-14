# JavaScript:页面运行的核心原理

​ JavaScript 是前端的核心，是一门应用非常广泛并且在快速发展的编程语言。早期的 JavaScript 虽然简单好用，但一些细节上的设计可能难以理解，这也是历史原因造成的。ES6 出现后，JavaScript 语法进行了一次大版本的升级，并且迅速应用到现代前端框架中，所以 JavaScript 的面貌焕然一新。

​ 然而，JavaScript 的语法虽然在升级，但核心的运行机制并没有改变，依然是单线程基于事件循环执行任务，依然是基于原型的面向对象，这也是 JavaScript 的基础和根本。

​ 本节主要介绍 JavaScript 的核心原理。这部分内容会在面试中用到，可以用来考验程序员的 JavaScript 基础是否深厚。

### 1. 数据类型与函数

​ 根据存储方式的不同，可以把 JavaScript 的数据类型分为基本类型(原始类型)和引用类型复杂类型)两种。基本类型的结构简单，直接保存在栈内存中，引用类型则保存在堆内存中。

​ 这两种存储方式的差别反映到代码上就是给一个变量赋值时能不能做到完全拷贝。例如，在下面的代码中，当变量 b 改变时，变量 a 是否会改变:

```javascript
var a = "前端真好玩";
var b = a;
b = "前端真有趣";
console.log("a:", a);
console.log("b:", b);
var a1 = { name: "前端⼈" };
var b1 = a1;
b1.name = "程序员";
console.log("a1:", a1);
console.log("b1:", b1);
```

执⾏代码，打印结果如图所示：

![img](https://cdn.nlark.com/yuque/0/2024/png/33728136/1725719299299-48c660cf-5b2a-4fc4-870c-8b140199ca26.png)

可以看出，采用同样的赋值方式，修改变量 b 时不会影响变量 a 的值，而修改变量 b1 时会同时修改变量 a1 的值，这看起来很不可思议。其实，在了解了基本类型和引用类型的存储原理后，这个问题将迎刃而解。

JavaScript 中的基本类型共 6 种(Symbol 为 ES6 新增类型)，具体如下:

- String:字符串
- Number:数值
- Boolean:布尔值
- NuI:空
- Undefined:未定义
- Symbol:唯一的值

这 6 种基本类型可以用 typeof 关键字来判断，方法如下:

```javascript
typeof "hello"; // "string"
typeof 5; // "number"
typeof false; // "boolean"
typeof null; // "object"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
```

其中的 5 种类型都可以准确判断，但是 Nul 类型的判断结果是“object”，而使用 typeof 关

键字判断引用类型时结果也是“object”，这就会比较尴尬。typeof 关键字不能用来判断 Null 类型。

应该如何判断 Nu 类型后面会介绍，这里只需要了解其特殊性即可。

基本类型的前 3 种会经常用到，此处不再赘述。很多人可能混淆 Null 和 Undefined，因为它们看着好像差不多，实际上是有区别的。在语义上，Undefined 表示未定义，即变量没有值;而

Null 表示变量有值，但是是一个空值。

Undefined 表示的是一个声明但未赋值的状态，具体包括以下几种:

- 声明一个变量未赋值;
- 访问对象不存在的属性;
- 函数定义了参数，但没有传参。

而 Nu 表示被人为设置为空对象，一般由开发者主动赋值。最常见的情况是定义一个变量表

示对象，这个变量实际的值会在后面的某个环节设置，此时需要将变量的初始值设置“Null”。在变量使用完毕需要重置时，再把它赋值为“NuII”上面提到的对象就是一个引用类型。常见的引用类型分为以下几种:

- Object:对象
- Array:数组
- Function:函数
- Date:时间
- RegExp:正则表达式

如果尝试用 typeof 关键字判断引用类型，就会发现除了函数，其他类型的结果都

是“object”:

```javascript
typeof console.log; // "function"
typeof {}; // "object"
typeof []; // "object"
typeof new Date(); // "object"
```

至此，可以得出一个类型判断的结论:typeof 关键字可以用来判断除 Nu 之外的基本类型和函数。

除函数之外的引用类型，以及基本类型 Nu 应该怎么判断呢?这些无法使用 typeof 关键字判断的类型，都可以使用 Object 原型对象上的一个方法来判断，具体如下:

```javascript
Object.prototype.toString();
```

为什么可以用 Object 原型对象上的方法呢?这是因为引用类型虽然分为上面几种，但实际上

所有的引用类型都继承自 Object 对象。那为什么 Nu 页可以这样判断呢?因为 Nu 同样继承自

Object 对象，其他基本类型也继承自 Object 对象，这就是 JavaScript 中所说的“万物皆对象”

因此，Object.prototype.toString()方法适用于所有数据类型。

因为 Object.prototype.toString()是原型对象上的方法，所以默认只对 Object 对象本身有

效。如果由继承该对象的成员使用，那么使用 call()方法来改变 this 指向并调用，具体如下:

```javascript
// 引⽤类型
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call({}); // [object Object]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call(/\\/); // [object RegExp]
// 基本类型
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call("前端"); // [object String]
Object.prototype.toString.call(false); // [object Boolean]
```

根据返回的结果就可以看到区别，如果希望类型的判断结果和 typeof 关键字保持统一，那么

可以稍微处理一下，编写一个获取类型的函数:

```javascript
function getDataType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}
getDataType(null); // null
getDataType([]); // array
getDataType({}); // object
```

使用 Object 原型对象判断类型很可靠，但是编写的代码有些冗长，不像 typeof 这样一个简

单的关键字就能搞定。那么判断引用类型还有更简单的方法吗?

当然有。除了 typeof 关键字，JavaScript 还有一个专门用来判断引用类型的关键字——

instanceof。instanceof 关键字的原理是基于原型链判断实例是否继承自某个构造函数，具体如下：

```javascript
[] instanceof Array; // true
new Date() instanceof Date; // true
var json = {};
json instanceof Object; // true
var fun = () => {};
fun instanceof Function; // true
```

显然，这种方式比使用 Object 原型对象判断优雅。既然有快捷方法，那么 Object.prototype.toString()方法还有存在的必要吗?其实是有的。首先，Object.prototype.toString()方法的兼容性是最好的，可以用来做 Polyfi 兼容方案;其次，搞懂了 Object.prototype.toString()方法可以更好地帮助我们理解原型链继承的相关知识。

在引用类型中有一个功能强大的类型叫做函数。函数不光是数据类型，更重要的是它是一个执行任务的单元。

### 2. 变量与作用域

前面使用 var 关键字声明了变量，且声明的变量可在当前作用域使用，即变量是有作用域

的。

使用 var 关键字声明的变量的作用域可能有两种，分别为全局作用域和函数作用域。全局声明(任意函数之外声明)的变量具有全局作用域;函数内声明的变量具有函数作用域，仅在函数内可用。示例如下:

```javascript
var str1 = "北京";
function test() {
  var str2 = "上海";
  console.log("str1", str1);
}
test();
console.log("str2", str2);
```

执行代码，结果如下：

```bash
str1 北京
ReferenceError: str2 is not defined
```

这说明在函数内可以访问函数外的变量，但在函数外不可以访问函数内的变量。这是

JavaScript 最基本的作用域机制:如果在当前作用域中找不到变量，那么 JavaScript 会“探出头”从父级作用域找，这类似于事件冒泡，一直找到最外层的作用域，但是永远不会从子级作用域

中寻找。

ES6 新增了一个作用域，叫作块级作用域。顾名思义，块级作用域是一个代码块的作用域用一对大括号表示。块级作用域必须用新的关键字 let 声明变量，并且当变量声明再一对大括号中时，这个变量就有了块级作用域。

```javascript
{
  let city1 = "上海";
  var city2 = "南京";
}
console.log(city1); // ReferenceError: city1 is not defined
console.log(city2); // 南京
```

除了声明块级变量，相比 var 关键字，let 关键字还有其他的特性，具有代表性的是以下两方面:

- 相同变量名禁止重复声明;
- 不存在变量提升。

使用 var 关键字声明变量，相同变量名是可以重复声明的，这看起来是不符合逻辑的操作然而 JavaScript 并不会报错，只不过是后面声明的变量覆盖了前面的变量。事实上，并不是 JavaScript 允许重复声明，而是在这种情况下 JavaScript 做了自动转换，示例如下:

```javascript
// 代码
var a = 1;
var a = 2;
// JavaScript 转换
var a = 1;
a = 2;
```

转换逻辑很简单，重复声明会自动删除 var 关键字。不过这种转换带来的问题是，在声明个新变量时，如果 和之前的变量名发生冲突，此时旧的变量就会在我们不知道的情况下被覆盖，这就带来了隐患。而 let 关键字不允许重复声明，否则会报错，这反而是我们想要的。

```javascript
function fun() {
  let b = 1;
  let b = 2; // SyntaxError: Identifier 'b' has already been declared
}
```

let 关键字的另一个特点是不存在**变量提升**，

什么是**变量提升**?下面引入一段代码：

```javascript
function fun1() {
  console.log(str);
}
fun1(); // ReferenceError: str is not defined
function fun2() {
  console.log(str);
  var str = "前端开发";
}
fun2(); // undefined
```

函数 fun10 的运行结果正常，但是函数 fun20 的打印结果很奇怪:明明 str 变量是在打印语句后声明的，在正常情况下这里的结果应该是 ReferenceError，但是变成了 undefined，这就是变量提升带来的结果。函数 fun2()的代码被 JavaScript 解析后变成了如下形式:

```javascript
function fun2() {
  var str;
  console.log(str);
  str = "前端开发";
}
```

由此可知，使用 var 关键字声明的变量会被自动提升到当前作用域的顶层，结果是只要变量被声明，不管是在前还是在后，访问都不会报错，这也导致初学者很迷惑。let 关键字去掉了变量提升，若出现异常，则正常抛出错误:

```javascript
function fun2() {
  console.log(str);
  let str = "前端开发";
}
fun2(); // ReferenceError: Cannot access 'str' before initialization
```

ES6 新增的第二个声明关键字是 const，表示声明的是一个常量，常量在声明后是不可以修改的。同样，const 关键字的作用是避免误操作覆盖了本不应该变化的数据。既然是常量，就要求声明时必须赋值，否则会报错。

const 关键字具有和 let 关键字一样的特性，包括块级作用域，常量不提升不可重复声明,const 关键字和 let 关键字的组合是 JavaScript 变量声明更标准的实现，因此建议用 let+ const 代替 var 关键字声明。

使用 const 关键字声明的常量是不可更改的。不可更改是指不允许重复赋值，但是对于引用类型，数据本身的更改并不代表重新赋值。示例如下:

```javascript
const str = "迪迦";
str = "盖亚"; // TypeError: Assignment to constant variable.
const arr = [1];
arr.push(2);
console.log(arr); // [1,2]
arr = [1, 2]; // TypeError: Assignment to constant variable.
```

对于引用类型，变量/常量存储的都是一个指针，该指针指向堆内存中的真实数据。数据本身的变化不会导致指针的变化，因此修改数据本身，如添加一个数组项，添加一个对象属性，都是可以的。但是如果要为变量重新赋值，就会改变指针，因此同样会报错。

### 3. 面向对象

众所周知，JavaScript 是一门面向对象的编程语言。但是它又不像 Java 那样是纯粹的基于类

的面向对象，而是独有的基于原型和原型链实现的面向对象。

什么是原型?原型(prototype)是一种设计模式，以自己独有的方式实现继承和复用。具体来说，原型就是一个对象，也可称为原型对象。原型对象只是一个有 constructor 属性的普通对象，没有什么神奇之处。重要的是，原型对象通过属性的互相指向实现继承。

下面列举一个简单的声明数组的例子:

```javascript
var arr = new Array(); // 或者 var arr = []
arr.push("北京");
console.log(arr); // ['北京']
```

上面声明了一个空数组，并且通过 arr.push()添加了一个元素，但是这里的 push()方法从何而来呢?在刚学 JavaScript 的时候，很多人就可能知道 push()方法，但是这个方法定义在哪里呢?在浏览器开发者工具控制台，可以看到结果如下图所示:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101615486.png)

可以看到，数组下有一个[[Prototype]]属性，这个属性下定义了很多方法，可以使用的数组方法都定义在这里，push()方法是其中之一。事实上，[[Prototype]】是一个内部属性，不可以显式访问，但是这个属性指向的就是一个原型对象(有 constructor 属性)。

为了方便访问，浏览器厂商使用`_proto_`属性来指向这个原型对象。`_**proto_**`属性和内部属性[[Prototype]]的指向一致，但该属性可以直接访问。因此，push()方法的调用逻辑如下:

```javascript
arr.push("北京");
// 等同于
arr.__proto__.push("北京");
```

这个原型对象从何而来呢?为什么会出现在 arr 变量上?由上面的图可知，[[Prototype]]属性的后面是 Array(0)，表示这个内部属性实际上是属于 Array 构造函数的。Array 构造函数有一个 prototype 属性指向它的原型对象，如图所示:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101615520.png)

原来`arr._proto_`指向的就是 Array.prototype，也就是它的构造函数 Array 的原型对象。上面提到，原型对象有 constructor 属性，由上图可知，constructor 属性又指回构造函数 Array 本身。下面在控制台上进行演示:

```javascript
Array.prototype.constructor === Array; // true
arr.__proto__ === Array.prototype; // true
```

综上可以得出以下 3 条规律:

1. 构造函数有 prototype 属性，并且指向它的原型对象;
2. 原型对象有 constructor 属性，并且指回构造函数;
3. 实例有 proto 属性，并且指向构造函数的原型对象。

这几点结论是理解 JavaScript 面向对象的关键。除此之外，还需要特别声明一点:实例本身没有原型对象，只有构造函数才有原型对象，但是实例可以访问它的构造函数的原型对象。原型链又是什么呢?

还是接着上面那个例子进行演示，再引用一个方法就能明白:

```javascript
arr.valueOf(); // ['北京']
```

细查构造函数 Array 的原型对象 Array.prototype，发现并没有 valueOf()方法，这里为什么可以执行呢?这个方法在哪里呢?其实可以把 Array.prototype 也看成一个实例对象，这个实例对象和 ar 一样，也有一个`__proto__` 属性，并且该属性指向它自己的构造函数的原型对象。

数组原型对象的`__proto__`是什么呢，如图所示:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101615600.png)

Array.prototype 是数组的原型对象，也是 Object 的实例。当在 Array.prototype 上找不到 valueOf()方法时，会沿着`__proto__`属性继续向上找，直到在 Object.prototype 上找到为止。

这种在原型之间层层向上找的情况，就组成了一条原型链。根据原型链可以总结出第 4 条规律。

4.原型对象也有\_proto 属性，并且指向上层原型对象，直到原型对象为 null。

因为 Object.prototype.\__proto_==nul，而 nu 没有原型，所以这是原型链种的最后一个环节。如果所用的方法到这里还没有找到，就会抛出错误 TypeError。

综上可知，当访问一个 JavaScript 实例的属性/方法时，先搜索这个实例本身，如果找不到，就会转而搜索实例的原型对象，如果还找不到，就搜索原型对象的原型对象，一直往上走，这个搜索的轨迹就叫做原型链。

在掌握了原型和原型链之后，我们可以自己动手实现一条原型链，

假设小明有两只小猫，其中西西是白色的，兜兜是灰色的。这两只猫有一个共同的特征--喜欢喵喵叫。

下面创建一个构造函数 MyCat()来表示小猫：

```javascript
// 定义 MyCat 构造函数
function MyCat(name, color) {
  this.name = name;
  this.color = color;
}
// 创建 MyCat 实例
var xixi = new MyCat("⻄⻄", "⽩⾊");
var doudou = new MyCat("兜兜", "灰⾊");
console.log(xixi.name); // ⻄⻄
console.log(doudou.color); // 灰⾊
```

两只猫的名字和颜色都已经设置好，但是叫--cal()这个方法是猫的共同特征，如果定义在函数内部，那么在实例化时会重复创建。根据原型链原理，在构造函数 MyCat()的原型对象上定义一次即可:

```javascript
// 定义 MyCat 构造函数
function MyCat(name, color) {
  this.name = name;
  this.color = color;
}
// 为 MyCat 的原型添加⽅法
MyCat.prototype.call = function () {
  console.log("喵喵喵");
};
// 创建 MyCat 实例
var xixi = new MyCat("⻄⻄", "⽩⾊");
var doudou = new MyCat("兜兜", "灰⾊");
xixi.call(); // 喵喵喵
doudou.call(); // 喵喵喵
```

现在两只猫都会叫了。假设小明还准备养一只狗，或者一只乌龟。这些都是小明的宠物。如果要给它们都做一个标识--主人是小明，为了避免重复定义，还要再定义一个函数，让小明的宠物加上 owner 这个标签:

```javascript
// 定义 MyPets 构造函数
function MyPets() {
  this.owner = "⼩明";
}
// 定义 MyCat 构造函数
function MyCat(name, color) {
  MyPets.call(this); // 使⽤ MyPets 构造函数初始化 owner 属性
  this.name = name;
  this.color = color;
}
// 通过直接操作 __proto__ 来实现继承关系
MyCat.prototype.__proto__ = MyPets.prototype;
// 创建 MyCat 实例
var xixi = new MyCat("⻄⻄", "⽩⾊");
var doudou = new MyCat("兜兜", "⽩⾊");
console.log(xixi.owner); // 输出: ⼩明
console.log(doudou.owner); // 输出: ⼩明
```

这样就实现了原型链的继承。ES6 新增的 class 可以代替构造函数，从而更直观地实现继承。但 class 是构造函数的语法糖，只是让原型链的写法更加清晰，更像面向对象编程。上述例子可以用 class 尝试来改造:

```javascript
// 宠物类
class MyPets {
  owner = "⼩明";
}
// ⼩猫类
class MyCat extends MyPets {
  constructor(name, color) {
    super();
    this.name = name;
    this.color = color;
  }
  call() {
    console.log("喵喵喵");
  }
}
var xixi = new MyCat("⻄⻄", "⽩⾊");
var doudou = new MyCat("兜兜", "⽩⾊");
xixi.call();
doudou.call();
console.log(xixi.owner);
console.log(doudou.owner);
```

### 4. 事件循环

如果你想了解 JavaScript 的异步执行机制，那么事件循环一定是绕不开的话题。事件循环就是 Event-Loop。下面是一段经典的异步执行的代码:

```javascript
console.log(1);
setTimeout(function () {
  console.log(2);
});
new Promise(function (resolve) {
  console.log(3);
  resolve();
})
  .then(function () {
    console.log(4);
  })
  .then(function () {
    console.log(5);
  });
console.log(6);
```

上述代码的打印顺序是什么样的呢?可以先在脑子里跑一遍代码，并记住结果，再带着问题解析事件循环。

要了解事件循环，需要先了解 JavaScript 是如何执行的。这里涉及如下 3 个重要角色函数调用栈。

- 宏任务(Macro-Task)队列。
- 微任务(Micro-Task)队列。

JavaScript 代码是分块执行的。每个需要执行的代码块会被放到一个栈中，按照“后进先出”顺序执行，这个栈就是函数调用栈。在第一次执行 JavaScrip t 代码时，全局代码会被推入函数用栈执行。后面每调用一次函数，就会在栈中推一个新的函数并执行。执行完毕，函数会从栈中

弹出。

下面引入一段简单的代码:

```javascript
console.log("开始");
function test() {
  console.log("执⾏");
}
test();
```

可以用下图表示这段代码在函数调用栈中是如何执行的。

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101615821.png)

也就是说，代码只有在进入函数调用栈之后才能被执行。在一系列函数被推入函数调用栈之后，JavaScript 先从栈顶开始执行函数，执行完一个立刻出栈再执行下一个，这个过程非常快。

还有一种特殊情况，就是异步任务。一个函数(或全局代码)内包含异步任务时，如 setTimeout 的回调函数和 promise.then 的回调函数，这些函数是不能立刻被推入函数调用栈执

行的，需要等到某个时间点后才能决定是否执行。不能立刻执行怎么办呢?只能排队等待。于是这些等待执行的任务按照一定的规则排队，等待被推到函数调用栈中。这个由异步任务组成的队列就叫作任务队列。

所谓的宏任务与微任务，是对任务队列中任务的进一步细分。JavaScript 中的宏任务队列和微任务队列如下图所示。

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101615326.png)

提示:script 脚本(全局代码)也是一个宏任务。此外，宏任务队列中的 setlmmediate、微任务队列中的 process.nextTick 都是 Node.js 独有的。

​ 至此，我们就能解析本节开头的异步代码了。在初始情况下，函数调用栈为空，微任务队列宏任务队列中有且只有一个 script 脚本(全局代码)，如图所示：

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101615780.png)

当第一次运行 JavaScript 代码时，宏任务队列中的全局代码率先出列并进入函数调用栈执行同步代码会按照顺序执行完毕，因此控制台先打印 1、3、6。

为什么也会打印 3 呢?因为构造函数 Promise 的参数是一个同步函数，会立即执行。后面

的 .then 和 .catch 才是真正的异步任务。

在执行同步代码时，会产生新的宏任务和微任务进入各自的队列，此时的函数调用栈和队列情况如图所示:

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101616791.png)

提示：如图所示，全局代码执⾏后会⼀直保存在栈中，不会出栈，否则⼀些全局变量就访问不到。

接下来由构造函数 Promise 产生的微任务按照队列先后顺序依次被推入函数调用栈执行，直到清空微任务队列。此环节执行完毕，控制台会打印 4 和 5。

微任务队列被清空后，会执行一次 U1 渲染操作，这样第一轮任务就完成了。接下来检查宏任务队列，如果宏任务队列不为空，就提取一个宏任务进入函数调用栈执行，开始执行第二轮任务。

在执行这个宏任务的过程中可能又会产生新的宏任务和微任务，此时继续执行微任务，并检查宏任务，直到两个任务队列彻底被清空，这个循环检查和执行任务的过程就是事件循环。

宏任务和微任务的区别体现在以下两方面。

- 宏任务先执行，第一个宏任务就是全局代码，宏任务与微任务交替执行。
- 宏任务是一个一个地执行，微任务是一整列一次执行完毕。

当 Promise.then 的回调函数都执行完毕，才执行 setTimeout 的回调函数，并打印 2。因

此，开头的实例代码的打印顺序如下:

```bash
1,3,6,4,5,2
```

综上所述，事件循环的⼤体流程为⼀个宏任务 → ⼀组微任务 → ⼀个宏任务 → ⼀组微任务。

### 5. 执行上下文与 this

在介绍事件循环时提到，若想执行代码，则需要将全局代码或函数推入函数调用栈。为什么要将代码推入函数调用栈后就能执行呢?

这是因为代码被推入函数调用栈后创建了执行上下文环境，上下文才是真正执行代码的地方——任何代码都在执行上下文环境中运行。

执行上下文主要分为 3 种。

- 全局上下文:全局代码所处的环境;
- 函数上下文:函数调用时创建的上下文;
- Eval 上下文(几乎已经被废弃，只需要知道即可)

在全局代码作为第一个宏任务进入函数调用栈后，就创建了全局上下文环境。全局上下文有两个明显的标志:一是全局对象(Window 或 Global);二是 this，指向全局对象。

提示：在浏览器环境下全局对象是 Window，在 Node.js 环境下全局对象是 G lobal

前面提到，全局代码执行后并不会出栈。按照执行上下文的解释，就是全局上下文一直存在，因此能在代码中一直访问全局变量和 this。

如果全局代码中声明了变量和函数，那么这些变量和函数会一直随着全局上下文存在。

请运行下面这段代码，直看全局上下文究竟是什么样子的:

```javascript
// test.js
var city = "北京";
var area = "海淀区";
function getAddress() {
  return city + area;
}
getAddress();
```

上述代码声明了两个变量和一个函数，在全局上下文创建时会被添加到全局对象 Window 下。虽然我们看不到，但是创建过程是分阶段的。执行上下文的生命周期分为以下两个阶段。

- 创建阶段:初始化变量和函数等。
- 执行阶段:逐行执行脚本中的代码。

创建阶段做的事情分为以下几个步骤。

- 第 1 步:创建全局对象( Window 或 Global);
- 第 2 步:创建 this，并指向全局对象;
- 第 3 步:将变量和函数放到内存中，为变量赋值 undefined;
- 第 4 步:创建作用域链。

第 3 步在创建变量后并不是直接赋值，而是先赋值 undefined。因为这一步还没有读取变量只是为变量开辟内存空间，并为其赋予一个默认值而已。

这也解释了前面介绍的变量提升。为什么会出现变量提升呢?从本质上来说，在执行上下文创建阶段已经将变量赋值为 undefined，此时代码还未执行，在代码执行时变量已经存在，这才现了变量提升的错觉。

第 4 步也非常重要，这一步直接影响闭包(后面介绍)

当创建阶段的准备工作完成后，接下来进入执行阶段。执行阶段是按照先后顺序执行代码的遇到变量赋值时就赋值，遇到函数调用时就调用，在这个阶段正式开始事件循环。

再看上面那段简单的代码，可以按照上下文的两个阶段进行拆分:

```javascript
// 1. 创建阶段
var city = undefined;
var area = undefined;
function getAddress() {
  var country = "中国";
  return country + city + area;
}
// 执⾏阶段
city = "北京";
area = "海淀区";
getAddress();
```

在全局上下文的执行阶段如果遇到函数，那么函数会被推入函数调用栈执行，此时创建了函数上下文。函数上下文也分为创建阶段和执行阶段，与全局上下文基本一致。但二者也是有区别的，具体如下。

- 创建时机:全局上下文是在运行脚本时创建的，函数上下文是在函数调用时创建的。
- 创建频率:全局上下文仅在第一次运行时创建一次，函数上下文则是调用一次创建一次。
- 创建参数:全局上下文创建全局对象(Window)，函数上下文创建参数对象

​ (argument)

- this 指向:全局上下文指向全局对象，函数上下文取决于函数如何被调用。

函数调用栈在执行完成后会立刻出栈，函数上下文同时被销毁，函数上下文所包含的变量自然也不能再被访问，这也是 JavaScript 访问变量只能访问父级作用域而不能访问子函数的原因。因为此时子函数要么没有被调用，要么调用完被销毁，函数作用域已经不存在，自然不能访问到里面的变量。

这里提到的作用域，其实就是指变量所处的执行上下文。

在介绍完函数调用栈的创建/销毁逻辑，就不得不提一个特殊的场景--闭包。下面直接引入代码:

```javascript
function funOut(a) {
  return function funIn(b) {
    return a + b;
  };
}
var funAdd = funOut(10);
console.log(funAdd(20)); // 30
```

在上述代码中，funOut()函数执行后返回一个新函数，在新函数中使用了 funOut() 函数的参数(可看作变量)a。当调用新函数 funAdd()时，funOut()函数已经调用完毕，按理说函数上下文已经销毁。然而，还可以在新函数 funAdd()中使用已经销毁的变量 a，这是为什么呢?难道 funOut()函数的上下文并未销毁?

并不是这样，funOut()函数调用完毕函数上下文已经销毁。然而，在执行上下文的创建阶段还创建了作用域链，正是作用域链将可能用到的父级函数上下文中的变量保存下来。所以，之后虽然父级函数上下文已经销毁，但是依然能够从作用域链中找到变量。

前面提到，作用域就是变量所处的执行上下文。因此，函数执行上下文在函数调用后必然会销毁，但是作用域可能会被缓存。

至此，JavaScript 的核心原理部分就介绍完毕。将执行上下文和事件循环的内容相结合，绘制一张简易的 JavaScript 执行流程图如下。

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101616792.png)
