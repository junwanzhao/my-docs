# ES6+:下一代语法标准

ES6+是指从 ECMAScript 标准的第 6 个版本开始到目前为止所有的更新。

ES6 是 JavaScript 语法的一个分水岭，从 ES6 开始，几平每年都会推出一个新版本，新增更多功能以应对前端的变化。

ES6 是最重要的，因为 JavaScript 中创造性的更新都来源于这个版本，如 Promise、class 和模块化等。

### 1. 变量与字符串的扩展

#### 一、变量的解构赋值

const 关键字用于声明常量，let 关键字用于声明局部变量。

与之前的版本相比，除了声明方式有变化，ES6 中变量/常量的读取方式也有了较大的简化，示例如下:

```javascript
var foods = {
  best: "⼩⻰虾",
  good: "⽕锅",
  normal: "快餐",
  bad: "⽅便⾯",
};
// 获取 best 和 bad
var best = foods.best;
var bad = foods.bad;
```

ES6 提供了解构赋值这种高效操作，可以用更少的代码实现一样的效果:

```javascript
var { best, bad } = foods;
console.log("best", best); // ⼩⻰虾
```

解构赋值相当于批量声明并读取某个对象的属性，编写更简洁。如果出现属性重名的情况，那么可以为属性设置别名，示例如下:

```javascript
var { best: best1, bad: bad1, hate } = foods;
console.log("best", best1); // ⼩⻰虾
console.log("bad", bad1); // ⽅便⾯
console.log("hate", hate); // undefined
```

使用冒号“:”设置别名后，原来的属性名就不可以再使用了。如果结构的属性不存在，那么默认值为 undefined。

解构赋值还可以对多层嵌套对象起作用，示例如下：

```javascript
var address = {
  city: {
    name: "北京市",
    area: {
      name: "海淀区",
      school: {
        name: "北京⼤学",
      },
    },
  },
};
// 分别取出城市、区和学校
console.log(address.city.name); // 北京市
console.log(address.city.area.name); // 海淀区
console.log(address.city.area.school.name); // 北京⼤学
```

这个三层对象看起来比较复杂，但实际上根据对象的层级结构以相同的层级就能解构出内层属

性，代码如下:

```javascript
var address = {
  city: {
    name: "北京市",
    area: {
      name: "海淀区",
      school: {
        name: "北京⼤学",
      },
    },
  },
};
let {
  city: {
    name: city_name,
    area: {
      name: area_name,
      school: { name: school_name },
    },
  },
} = address;
console.log(city_name); // 北京市
console.log(area_name); // 海淀区
console.log(school_name); // 北京⼤学
```

除了对象，数组也可以被解构。二者的区别在于:对象解构根据属性，数组解构则根据位置，示例如下：

```javascript
var foods = ["炸鸡", "啤酒", "烧烤"];
let [a, b, c] = foods;
console.log(a); // 炸鸡
console.log(b); // 啤酒
console.log(c); // 烧烤
```

数组解构比对象简单许多，因为数组解构不存在属性，所以也不需要指定别名。但是数组存在层

级，在层级解构数组时也是完全按照位置匹配的，示例如下:

```javascript
var foods = ["⼩⻰虾", ["⽺⾁串", "板筋", ["烤鸡腿", "烤鸡⽖"]]];
let [a, [b1, b2, [c1, c2]]] = foods;
console.log(a); //⼩⻰虾
console.log(b1, b2); //⽺⾁串 板筋
console.log(c1, c2); //烤鸡腿 烤鸡⽖
```

#### 二、字符串的扩展

在项目开发中字符串是使用得最多的数据类型之一。字符串操作包括但不限于拼接、截取、取

某个位置的值等。ES6 提供了许多字符串操作方法。

例如，要想知道某个字符串中是否包含某个字符片段，通常只能用 indexOf( 方法来判断。示例如下:

```javascript
var str = "You are best engineer";
console.log(str.indexOf("best")); // 8
console.log(str.indexOf("bst")); //-1
```

ES6 提供的 3 个新方法可以更便捷地判断包含关系，并且这 3 个新方法都返回布尔值。

- includes(): 判断字符串中是否包含某个字符。
- startsWith(): 判断字符串是否以某个字符开头。
- endsWith(): 判断字符串是否以某个字符结尾。

示例如下:

```javascript
var str = "You are best engineer";
console.log(str.includes("best")); // true
console.log(str.startsWith("You")); // true，这⾥是区分⼤⼩写的
console.log(str.endsWith("neer")); // true
```

使用 repeat()方法可以将字符串重复 N 次。当前端测试元素内容过多时，repeat() 方法的滚动效果非常好用。示例如下：

```javascript
var str = "测试内容";
str = str.repeat(100);
console.log(str);
```

另一个常见的场景如下:将字符串中的字符 A 全部替换为字符 B，而旧语法提供的 replace()方法只能替换第一个匹配的值。ES6 新增了 replaceAI() 方法，利用该方法可以快速替换所有内容，示例如下:

```javascript
var str = "I love you, superstar is you";
str = str.replaceAll("you", "me");
console.log(str); // 'I love me, superstar is me'
```

ES6 提供的最强大的字符串功能——>**模板字符串**:

用反引号（``）)标识，简化了字符串与变量的拼接，还提供了格式保留(如换行、缩进等)，使字符串的使用和展示都非常友好。

```javascript
var title = "块级元素";
var divstr = `
 <div>
 <span>${title}</span>
 </div>
`;
```

在上述代码中,用字符串表示一个元素结构，换行和缩进都能保留，同时可以指定变量。在字符串模板中，使用符号“${}”嵌入变量，这使得使用加号“+”拼接字符串成为过去式。

### 2. 对象的扩展

ES5 要求在对象中定义属性和方法时必须采用 key:value 的方式。ES6 则允许在 key==value 时只使用一个属性，这是一种简化用法。示例如下:

```javascript
var city = "北京市";
function getCity() {
  return city;
}
var object = { city, getCity };
// 等同于 var object ={city:city, getCity:getCity}
console.log(object.city); // ‘北京市’
console.log(object.getCity()); // ‘北京市’
```

除了定义对象可以简化，读取对象的属性/方法也可以简化，使用解构赋值的方法。示例如下:

```javascript
var { city, getCity } = object;
```

#### 一、扩展运算符

扩展运算符(用“...”表示)，使用该运算符可以将对象中的“剩余属性”另存到一个新对象中。剩余属性是指原对象中未显式解构的属性/方法。示例如下：

```javascript
var obj = { a: 1, b: 2, c: 3, d: 4, e: 5 };
let { a, b, ...other } = obj;
console.log(other); // { c: 3, d: 4, e: 5 }
```

在上述代码中，先用解构赋值的方式取值，再用"..."将 c、d、e 这 3 个属性放到新对象 other 中，other 对象中包含除 a 和 b 之外的剩余属性。

提示:扩展运算符必须在对象的所有属性之后，否则 Javascript 会解析错误。

既然扩展运算符可以取剩余参数，那么也可以取全部参数。在一个对象未显示解构任意属性只提供了扩展运算符时，新对象会包含原对象的所有属性，这样就实现了对象的“复制”。示例如下：

```javascript
var obj = { a: 1, b: 2 };
let { ...copy } = obj;
console.log(copy); // { a: 1, b: 2 }
// 等同于
let copy = { ...obj };
console.log(copy); // { a: 1, b: 2 }
```

上面介绍的两种解构方式都可以用来实现对象复制，但这种复制方式是一种浅拷贝。

#### 二、.描述对象

对象是由多个属性组成的。在项目开发中会频繁地执行属性操作。JavaScript 的对象很灵活属性可以任意添加、删除和遍历。

但有时我们希望可以控制属性的操作，如强制某个属性不可以删除。实现这个需求的方式是设置描述对象。对象的每个属性都有一个描述对象(Descriptor)来控制该属性的行为。使用 Object.getOwnPropertyDescriptor()方法可以获取描述对象:

```javascript
let obj = { city: "北京" };
let desc = Object.getOwnPropertyDescriptor(obj, "city");
console.log(desc);
```

描写对象中包含以下 6 个常用属性:

- value: 属性值
- writable: 属性值是否可以修改
- enumerable: 描述对象是否可以修改
- get: 取值函数(getter)
- set: 存值函数(setter)

既然可以获取属性的描述对象，那么必然可以修改描述对象。修改描述对象用 Object.defineProperty()方法来实现。示例如下：

```javascript
let obj = { city: "北京" };
// 设置描述符，是否可以修改值
Object.defineProperty(obj, "city", {
  writable: false,
});
obj.city = "上海";
console.log(obj); // { city: '北京' }
```

在上述代码中，先修改属性 city 的描述对象，将其可修改性 writable 改为 false。接着修改 city 的属性值，若修改不成功，则说明设置 city 属性不可修改性已生效。

描述对象中的 setter()方法和 getter()方法，在设置后会分别在属性的赋值和读取时触发。Vue.js 就是通过设置描述对象的 setter()方法和 getter()方法来实现响应式系统的。

#### 三、对象遍历

遍历数组：分别读取数组的元素。

遍历对象：将对象的属性和值分别转化为数组。

ES6 提供了以下几个便捷的方法来实现这些功能。

- Object.keys():获取对象的属性数组。
- Object.values():获取对象的值数组。
- Object.entries():获取对象的属性和值数组。

```javascript
var obj = {
  name: "李⼩⻰",
  position: "⾹港",
  skill: "中国武术",
};
console.log(Object.keys(obj)); //[ 'name', 'position', 'skill' ]
console.log(Object.values(obj)); //[ '李⼩⻰', '⾹港', '中国武术' ]
console.log(Object.entries(obj)); //[ [ 'name', '李⼩⻰' ], [ 'position', '⾹ 港' ], [ 'skill', '中国武术' ] ]
```

如果要判断对象的所有属性是否都不为空，这些方法就可以派上用场。上述对象的属性遍历也可以通过描述对象来控制。属性描述对象的 enumerable 选项表示属性是否可以遍历，当该选项为 true 时才能被以上 3 个方法遍历。

下面修改 enumerable 选项:

```javascript
var obj = {
  name: "李⼩⻰",
  position: "⾹港",
  skill: "中国武术",
};
Object.defineProperty(obj, "skill", {
  enumerable: false,
});
console.log(Object.keys(obj)); // ['name','position']
```

此时，skil 属性已经不可以被遍历。

#### 四、对象拷贝

1. 浅拷贝

JavaScript 中的引用类型保存在堆内存中，栈内存只保存一个引用，当复制一对象时默认会复制其引用。这会导致两个对象的值互相影响。示例如下：

```javascript
var a = { name: '前端' }
var b = a b.name = '后端'
console.log(b) // { name: '后端' }
console.log(a) // { name: '后端' }
```

使用**扩展运算符**也可以实现对象复制，这种复制同样是一种浅拷贝。示例如下：

```javascript
var a = { name: "前端" };
var b = { ...a };
```

ES6 还有第 3 种实现对象浅拷贝的方法，即**对象合并**。对象合并是指将多个目标对象的可枚属性(enumerable 选项为 true 的属性)合并到一个新对象中，通过 Object.assign()方法来实现。示例如下：

```javascript
var obj = {};
var obj2 = { b: 2 };
var obj3 = { c: 3 };
Object.assign(obj, obj2, obj3);
console.log(obj); //{ b: 2, c: 3 }
```

Object.assign()方法与扩展运算符都能实现对象的浅拷贝。二者的区别如下:前者是对对象性的扩增;后者是对对象属性的缩减，两者最终处理后的属性都被赋值给一个新对象。

2）深拷贝

上面介绍了对象浅拷贝的 3 种方式，在很多场景下还需要深拷贝。深拷贝是指对复制后的对象修改属性/方法时不会影响原对象。

要实现所有数据类型的深拷贝很复杂。这里介绍常用的 JSON 数据的深拷贝，实现方法很简単：

```javascript
var obj = {
  name: "电影",
  category: {
    cartoon: "动漫",
    kungfu: "武侠",
    love: "爱情",
  },
  platform: ["腾讯视频", "爱奇艺", "优酷"],
};
var obj2 = JSON.parse(JSON.stringify(obj));
obj2.category.kungfu = "仙侠";
obj2.platform[2] = "哗哩哗哩";
console.log(obj2.category.kungfu, obj2.platform[2]); //仙侠 哗哩哗哩
console.log(obj.category.kungfu, obj.platform[2]); //武侠 优酷
```

在上述代码中，先将对象序列化(JSON.stringify())为字符串，再将字符串反序列化(JSON.parse())为对象，最终实现一个深拷贝后的对象。

### 3. 数组的扩展

数组常常与对象结合使用，二者组成了复杂的 JSON 数据。数组的扩展主要表现在查询、过

滤、遍历和转换 4 个方面。

#### 一、数组查询

数组查询分为元素查询和索引查询两类，是指在一个数组中查询满足某个条件的数组或索引。ES6 中的数组查询包括 4 个方法，分别为 find()、findLast()、findlndex()和 findLastIndex()。

find() 方法和 findLast()方法的作用是从数组中查找元素，前者查找匹配的第一个元素，后者

查匹配的最后一个元素。方法执行后会返回查找到的元素。示例如下：

```javascript
var arrs = [
  { name: "赛罗", color: "红蓝" },
  { name: "捷德", color: "红⿊" },
  { name: "维克特利", color: "红⿊" },
  { name: "迪迦", color: "红蓝" },
];
var row = arrs.find((row) => row.color == "红蓝");
console.log(row.name); //赛罗
var row2 = arrs.findLast((row) => row.color == "红蓝");
console.log(row2.name); //迪迦
```

在上述代码中，如果查找到就会返回匹配的元素，否则返回 nul。

findlndex()方法和 findLastIndex()方法与前两个方法的逻辑一致，只不过返回的是索引。示例如下：

```javascript
var index = arrs.findIndex((row) => row.color == "红⿊");
console.log(index); // 1
var index2 = arrs.findLastIndex((row) => row.color == "红⿊");
console.log(index2); //2
var index3 = arrs.findIndex((row) => row.color == "红⽩");
console.log(index3); // -1
```

#### 二、数组过滤

数组过滤是指从数组中筛选出我们想要的元素并返回新数组。常用的数组过滤方法：

**filter()方法：**按照条件筛选数组，筛选出的数组长度小于或等于原数组长度。示例如下：

```javascript
var generals = [
  { id: 1, name: "吕布" },
  { id: 2, name: "关⽻" },
  { id: 3, name: "⻢超" },
  { id: 4, name: "邢道荣" },
];
var flarr = generals.filter((row) => row.id >= 3);
console.log(flarr); // [ { id: 3, name: '⻢超' }, { id: 4, name: '邢道荣' } ]
```

**slice()方法：**同样用于过滤数组，只不过该方法的过滤方式并不是依据条件，而是依据下标。slice()方法有两个参数，分别指定开始下标和结束下标，区间规则是左闭右开(包含左边不包含边)。示例如下：

```javascript
var flarr = generals.slice(1, 3);
console.log(flarr); //[ { id: 2, name: '关⽻' }, { id: 3, name: '⻢超' } ]
```

通常需要判断一个元素是否在数组中，传统的方法是用 indexOf()的方法来获取索引位置，若大于 -1 则表示存在，否则不存在。

ES6 提供了更快捷的方式一 includes()方法，可以更简单直观地判断包含关系。includes()方法的第 2 个参数表示从数组的哪个位置开始判断，示例如下:

```javascript
var arrs = ["张环", "李朗", "杨⽅", "任阔"];
console.log(arrs.includes("张环")); // true
console.log(arrs.includes("魔灵")); // false
console.log(arrs.includes("李朗")); // true
console.log(arrs.includes("李朗", 2)); // false
// 等同于 arrs.slice(2).includes('李朗'） // false
```

#### 三、数组遍历

数组遍历是指按照元素顺序依次执行函数。JavaScript 原始的遍历方式是 for 循环，ES6 为数组新增了有遍历功能的便捷方法，主要包括 forEach()方法和 map()方法。区别在于:

- forEach()方法单纯执行遍历，无返回值;
- map()方法可以在回调函数内返回一个值，方法执行后会返回一个新数组。示例如下:

```javascript
var arrs = [1, 2, 3, 4, 5];
arrs.forEach((n) => {
  console.log(n); // 分别打印出 1,2,3,4,5
});
let res = arrs.map((n) => {
  return n * 2;
});
console.log(res); // [2, 4, 6, 8,10]
```

#### 四、数组转换

数组转换表示将原数组根据需要转换成另一种格式，一般是指修改数组的组织方式。数组转包

括 from()方法、flat()方法和 sort()方法。

from()方法用于将类数组转换为数组。类数组是指具有数组的专有特性(数字下标和 length

属性)。下面用对象来模拟一个类数组:

```javascript
var like_arr = {
  0: "a",
  1: "b",
  length: 2,
};
var arr = Array.from(like_arr);
console.log(arr); // [ 'a', 'b' ]
```

from()方法常用于将 Set 转为数字，从而实现数组去重:

```javascript
var arr = [1, 2, 3, 2, 1];
var set = new Set(arr);
Array.from(set);
console.log(set); // Set(3) { 1, 2, 3 }
```

flat()是数组扁平化的快捷方法，示例如下:

```javascript
var arr = ["a", "b", ["c", "d", ["e"]]];
arr.flat();
console.log(arr); // [ 'a', 'b', [ 'c', 'd', [ 'e' ] ] ]
arr.flat(2);
console.log(arr); // [ 'a', 'b', [ 'c', 'd', [ 'e' ] ] ]
```

如上述代码所示，flat()方法用于将多层嵌套数组合并，默认只合并一层。如果需要合并多就需要显式传参(如代码中参数为 2 表示合并 2 层)。如果要合并所有层，那么 flat()方法的参数为 Infinity 关键字。

sort()方法用于排序，这也是比较常用的功能。下面列举一个首字母排序的例子:

```javascript
var arrs = ["萧炎", "美杜莎", "云韵", "海波东"];
arrs.sort((row1, row2) => {
  return row1.localeCompare(row2) ? 1 : -1;
});
```

如上述代码所示，数组元素 row1 和 row2 两两比较，若返回 1 则向后排，若返回 -1 则向前排。

### 4. 函数的扩展

函数的扩展主要在格式、上下文和参数上。

ES6 提供了函数的最新格式，即箭头函数，使函数的编写更加简洁:

```javascript
// ES5 中的⽤法
function getName(name) {
  return name;
}
// 箭头函数的⽤法
const getName = (name) => name;
```

可以看到，箭头函数省略了 function 关键字，函数体中只有返回值时可以使用。简写形式与普通函数相比，除了语法上的简化，箭头函数更大的不同在于上下文的变化。上下文就是指向，下面通过示例查看其变化:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      var obj = {
        fun1() {
          console.log("fun1:", this); // {fun1: ƒ, fun2: ƒ}
        },
        fun2: () => {
          console.log("fun2:", this); // Window
        },
      };
      obj.fun1();
      obj.fun2();
    </script>
  </body>
</html>
```

![img](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410101616740.png)

上述代码将两个函数放到 obj 对象下。二者的 this 指向不同，前者指向 obj 对象，后者指 Window 对象。

这是因为，普通函数的 this 指向规则如下:谁调用函数，this 就指向谁。箭头函数的 this 指向与谁调用无关，而是永远指向父作用域的 this。

obj.fun1()方法的调用者是 obi，因此 fun1()函数的 this 指向 obj;fun2()函数的父作用域就是全局作用域，因此函数内的 this 指向 Window。

在 ES6 之前函数的参数不能指定默认值，但是 ES6 支持指定默认值:

```javascript
function eat(food = "苹果") {
  console.log(food);
}
eat(); // 苹果
eat("⾹蕉"); //⾹蕉
```

函数的参数不仅可以指定默认值，还支持指定 rest 参数。rest 参数与前面的扩展运算符的用法基本一致。如果一个函数的参数是动态的，并且数量不固定，那么使用 rest 参数可以很方便地取到剩余参数。

```javascript
const myLog = (tag, ...args) => {
  console.log(`${tag}:`, args);
};
myLog("⽔果", "⽕⻰果"); // ⽔果: [ '⽕⻰果' ]
myLog("零⻝", "坚果", "芒果⼲", "辣条"); // 零⻝: [ '坚果', '芒果⼲', '辣条' ]
```

上述代码使用“..”声明 rest 参数，并将剩余参数放在一个数组中。

### 5. 异步编程方案

pro 是一种应用广泛的现代异步方案，比传统的回调函数更简洁。下面用代码演示如何使用 Promise:

```javascript
const promise = new Promise((resolve, reject) => {
  Request({
    url: "http://xxx.com",
    onSuccess(data) {
      resolve(data);
    },
    onError(err) {
      reject(err);
    },
  });
});
```

在上述代码中，用构造函数 Promise()包裹了一个异步请求方法。当请求成功时，执行 resove 方法;当请求失败时，执行 reject()方法。

在使用 Promise 实例时，会根据异步任务的执行结果触发以下方法。

- then():Promise 内部的 resolve()方法执行时触发
- catch():Promise 内部的 reject()方法执行时触发。
- finally():异步任务完成即触发，无论成败。

示例如下:

```javascript
// 使⽤ Promise
Promise.then((data) => {
  console.log(data);
})
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("完成");
  });
```

这是 Promise 最基本的用法，在前端请求接口时经常能见到。除此之外，还可以让一组 Promise 并行请求，主要用到如下两个方法:

- Promise.all(): 全部请求完成触发 then()方法。
- Promise.race(): 最快的一个请求完成触发 then()方法。

Promise 并行请求的代码如下:

```javascript
var promise1,
  promise2 = new Promise();
Promise.all({
  promise1,
  promise2,
}).then(([res1, res2]) => {
  console.log(res1, res2);
});
Promise.race({
  promise1,
  promise2,
}).then((res) => {
  console.log(res);
});
```

Promise 方案的升级版是 async/await，它们是 Promise 的语法糖，但编写起来是完全同步的感觉。

```javascript
const getRes = async () => {
  try {
    let res = await fetch("http://xxx.json");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
```

在上述代码中，fetch()方法是一个 Promise，加上关键字 async 和 await 后就可以像同步代码一样编写。它的返回值 res 是执行成功后的返回值，如果发生异常就会被 catch 捕获到。

因此，**使用 async/await 代替 Promise 时，务必要包裹一条 try...catch 语句。**

### 6. 模块体系

早期的 JavaScript 中并没有模块化的功能，所以代码难以分块隔离，更不能实现导入/导出。最早大规模引入模块系统的是 Node.js。

```javascript
const path = require("path");
var json = {
  path: path.resolve(__dirname),
};
module.export = json;
```

在上述代码中，开头用 require 导入一个模块，结尾用 module.export 导出一个模块。这样的模块之间互相隔离， 导入和导出支持模块间的复用。这套模块方案被称为 `CommonJS`。

ES6 并没有沿用 CommonJS，而是创造了自己的模块方案，即 `ESModule`(以下简称 `ESM`),实现方式如下:

```javascript
import util from "./util.js";
var json = {
  path: util.getPath(),
};
export default json;
```

从代码来看，ESM 与 CommonJS 并无二致，只是关键字不一样。实际上，ESM 还有许多功能，如可以导出模块的变量:

```javascript
// a.js
export const name = "⼤闸蟹";
export const getAttr = () => {
  return name;
};
// b.js
import { name, getAttr } from "./a.js";
console.log(name); // ⼤闸蟹
console.log(getAttr()); // ⼤闸蟹
```

在上述代码中，并没有直接导出模块，而是导出模块内的变量。使用时可以直接导入这些变量。

上述代码中的 a.js 可以换一种写法，以实现完全相同的效果，并且 b.js 也可以为变量指定别

名。代码如下:

```javascript
// a.js
export const name = "⼤闸蟹";
const getAttr = () => {
  return name;
};
export default { name, getAttr };
// b.js
import { name as myName, getAttr as myFun } from "./a.js";
console.log(myName); // ⼤闸蟹
console.log(myFun()); // ⼤闸蟹
```

提示:ESM 已经成为 Javascript 模块化主流方案，会逐渐取代 CommonJS，成为浏览器和服务器通用的模块解决方案。

上述所有 import 关键字都会在编译时确定模块的依赖关系，因此 **import 模块导入必须放在顶层**。

在实际场景中，有时希望可以根据条件动态导入模块。例如，在单击按钮时动态导入一个 JSON 文件，此时使用 import 关键字就做不到。

为了解决这个问题，ES2020 引入了 import()函数，支持动态加载模块。示例如下：

```javascript
if (true) {
  import("./xxx.json").then((json) => {
    console.log(json);
  });
}
```

框架的路由组件就是用 import()函数动态导入的。
