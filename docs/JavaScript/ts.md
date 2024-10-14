# TypeScript:支持类型的 JavaScript

TypeScript 是 JavaScript 的超集，在 JavaScript 已有功能上扩展了类型系统，可以 TypeScript 是支持静态类型的 JavaScript。

TypeScript 由微软公司开发，首次出现于前端框架 Angular.js 中，随后成为风靡前端的热门技术。到目前为止，TypeScript 已经广泛应用于现代前端应用开发中。尤其是开源项目，几乎都在用 TypeScript 开发或重写。

TypeScript 可以在浏览器和 Node.is 环境中运行，可以被编译成纯 JavaScript，常与现代编

译工具结合使用。因此，TypeScript 还有除类型之外更强大的扩展能力。

### 1. 应该使用 TypeScript 吗

#### 一、静态类型

静态类型是 TypeScript 最关键、最核心的功能，下面先列举一个普通 JavaScript 变量的例子

```javascript
var name ='张三
name = false
```

在上述代码中，变量 name 是一个字符串，在 JavaScript 中允许将其修改为布尔值 false。

下面将上述代码片段修改为 TypeScript，结果如下:

```typescript
var name: string = "张三";
name = false; // 错误:不能将 boolean 类型分配给 string 类型
```

因为变量 name 指定了类型为 string，也就限定了这个变量的值只能是 string 类型的。如果将变量 name 修改为非 string 类型的值，TypeScript 就会在代码执行前抛出异常，这就是静态类型检测。

静态类型检测大大避免了在开发中因为编写不严谨导致的错误，保证了前端应用的健壮性。

#### 二、快捷提示

在使用一些第三方软件包时，经常能看到快捷提示。例如，在对象(软件包的实例)后输入符号“.”

编辑器会自动将对象下的属性和方法全部列出来。

我们首先定义一个接口 `Person `，它描述了一个人的基本信息:

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age: number;
  greet: () => string;
}
```

然后创建-个函数` createPerson`，它接受` firstName`、`lastName` 和` age` 作为参数，并返回一个 `Person `对象:

```typescript
function createPerson(firstName: string, lastName: string, age: number): P
erson {
  return {
    firstName,
    lastName,
    age,
    greet: function () {
      return `Hello, my name is ${this.firstName} ${this.lastName} a
nd I am ${this.age} years old.`;
    }
  }; }
```

接着，就可以使用 createPerson 函数创建一个新的 Person 对象，并调用其方法。由于 TypeScript 的静态类型检查和 VSCode 的智能提示，我们可以获得参数的类型信息、方法的自动补全，以及错误提示。

接着，就可以使用 createPerson 函数创建一个新的 Person 对象，并调用其方法。由于 TypeScript 的静态类型检查和 VSCode 的智能提示，我们可以获得参数的类型信息、方法的自动补全，以及错误提示。

```typescript
const person: Person = createPerson("John", "Doe", 30);
// VSCode 会在这⾥提供智能提示，如显示 person 对象的属性和⽅法。
console.log(person.greet());
// 如果你尝试访问不存在的属性或⽅法，VSCode 会⽴即显示错误提示。
// console.log(person.address) // 这⾏代码会在 VSCode 中显示错误提示。
```

快捷提示不仅列出了所有方法名，还列出了方法的具体用法和作用，大大提高了前端开发效率，省去了查阅文档的麻烦。另外，当输入的属性或方法名有错误时，快捷提示会及时发现错误并提示如何修复，这也是 TypeScript 最主要的特性之一。

当然，TypeScript 的快捷提示是否合理、友好，主要在于 TypeScript 类型文件是如何编写的。如果类型文件编写得糟糕，大量使用 any 就会使快捷提示的优势发挥不出来。

### 2. 常用类型全览

TypeScript 提供了丰富的类型以应对不同的场景。其中最常用的 8 个类型如下：

- string:字符串
- number:数值
- boolean:布尔值
- enull: Null
- undefined: Undefined
- symbol:Symbol
- type[]:数组
- object:对象

这 8 个类型分别对应 JavaScript 不同的数据类型，其中的 string、number 和 boolean 是最基本且使用得最多的类型，下面以这 3 个类型举例。

#### 一、基本类型

为变量指定类型非常简单，只需要在变量名后面添加“:类型”即可，代码如下:

```typescript
var godName: string = "孙悟空";
var godAge: number = 100;
var isGod: boolean = true;
```

null 和 undefined 在 JavaScript 中是两个基本值，在 TypeScript 中又是两个类型。因此,null 和 undefined 既是类型又是值，它们的类型就是值本身，代码如下:

```typescript
var age: null = null;
var area: undefined = undefined;
var flag: boolean = null; // 错误，不能将 null 类型分配给 boolean 类型
```

在 JavaScript 开发中，通常将一个对象的初始值设置为 null，因此可以将 null 作为任意数据类型的初始值使用。但 TypeScript 对类型有严格的限制，如果要将 null 赋值给其他类型，就需要在配置文件 tsconfig.ison 中的 compilerOptions 选项下添加一条配置:

```
"strictNullChecks": false
```

ES6 新增了一个基本型，即 Symbol，与 TypeScript 中的 symbol 类型对应，代码如下:

```typescript
var smb: symbol = Symbol("标志");
```

#### 二、引用类型

在 JavaScript 的数据类型中，除了基本类型，其他都是引用类型。引用类型使用得最多的数组、对象和函数。

(1)数组是某个或多个类型的集合，有两种定义方式，示例如下:

```typescript
let num1: number[] = [1, 2, 3];
let num2: Array<number> = [4, 5, 6];
```

以上两种定义数组的格式，在开发中推荐使用第一种。上述代码定义了一个由 number 组成的数组，因此数组类型是 number。如果数组项全部是字符串，数组类型就变成 string。数组元素可以是任意类型的，也可以同时包含多个类型。

假设数组的数组项包含字符串和数字，那么数组类型可以使用“number|string”(联合类型)。如果数组项包含任意类型，那么更直接的用法是“any”。不过非必要最好不要使用 any，因为这样会丢失一部分类型验证。示例如下:

```typescript
let arr1: (number | string)[] = [1, 2, "3", "4"];
let arr2: any[] = [1, "2", true, null];
```

(2)在 JavaScript 中，对象的概念非常广泛。在一般情况下，引用类型的数据都可以被称为对象。这些广义上的对象类型统一用 object 表示，示例如下:

```typescript
var date: object = new Date();
var fun: object = () => {};
var arr: object = ["object"];
```

object 类型虽然能表示对象，但不能区分对象(如区分函数和数组)。obiect 类型的作用仅仅是区分基本类型和引用类型。将变量设置为 object 类型，其值不可以是基本类型。示例如下:

```typescript
var num: object = 2; // 错误：不能将 number 类型分配给 obiect 类型
var str: object = "hello world"; // 错误：不能将 string 类型分配给 object 类型
```

#### 三、函数类型

函数是一个比较灵活的类型，因为它有参数和返回值。函数类型是由参数型和返回值类型成的。下面引入一个基本的无参数且无返回值的函数。(关键字 void 也是一个类型，表示函数无返回值)

```typescript
// 普通函数
function fun1(): void {
  console.log("这是⼀个普通函数");
}
// 箭头函数
const fun2 = (): void => {
  console.log("这是⼀个箭头函数");
};
```

如果函数返回字符串，就用 string 代替 void，其他类型同理。示例如下:

```typescript
const fun3 = (name: string): string => {
  return `姓名: ${name}`;
};
```

上述代码中的函数有一个参数 name，其类型为字符串，且函数执行的返回值为字符串。通过为函数添加一些“类型的限定”，就可以知道应该如何使用这个函数。

函数的参数可能是动态的。如果某个参数为必传，某个参数为非必传，此时就需要一个非必传标记。标记方法是在参数名后面加上“?”，示例如下:

```typescript
const fun4 = (name: string, tag?: string): string => {
  return tag || "" + name;
};
fun4("你好");
fun4("你好", "世界");
```

可选参数需要放在所有必传参数的后面，因为 JavaScript 的函数参数是按照顺序定位的，如果可选参数在前面就必须传一个占位符，这在 TypeScript 中是不被允许的。

采用上面的方式可以为已有函数指定类型，那么能不能在函数声明之前定义一个完整的函数类型呢?当然可以。下面为一个变量指定函数类型:

```typescript
// 声明变量
var fun5: (name: string, tag?: string) => string;
// 赋值函数
fun5 = (arg1: string, arg2?: string) => arg1 + arg2 || "";
```

上述代码中的“(name:string,tag?:string)=>string”就是一个完整的函数类型，这个类型与 string、number 并没有本质上的区别。在为某个变量指定该函数类型之后，这个变量就只能赋值为符合该类型的函数。

因为函数类型根据参数和返回值的不同而改变，所以也可以将常用的函数类型设置为一个自定义类型。自定义类型(也叫类型别名)用 type 关键字声明，一些复杂类型非常适合用自定义类型代替，使用时可以减少代码量，示例如下:

```typescript
// ⾃定义类型
type myFunType = (name: string, tag?: string) => string;
// 绑定类型
var fun6: myFunType = (name, tag) => {
  return name + tag;
};
```

#### 四、联合类型

前面介绍的所有类型都是单独类型，实际上某些值并不是只有一个类型，可能是多个类型的组

如既可以是 string 又可以是 number，这时就需要使用联合类型。

联合类型用符号“ | ”将多个类型连接起来，使用非常简单，示例如下:

```typescript
var val1: string | number;
var val2: object | null = null;
```

联合类型表示某个值可能有多个类型。在使用联合类型时，TypeScript 只会将多个类型的共有属性看作值的属性，如果不是共有属性，那么 TypeScript 会提示错误(方法与属性同理)。示例如下:

```typescript
var val3: string | number = 123;
console.log(val3.toString());
console.log(val3.length); // 错误：number 类型不存在 length 属性
```

上述代码中的值是字符串，但是类型是字符串与数值的联合类型。toString()是字符串与数值共有的方法，因此不会报错。但是只有字符串有 length 属性，数值类型没有，因此 TypeScript 类型验动不通过。

可以为变量“强制指定某个类型”，这种方式叫作类型断言。类型断言是通过关键字 as 来实现的。代码如下:

```typescript
let val4: unknown = "this is a string";
let strLength: number = (val4 as string).length;
```

需要注意的是，只有非常确定数据类型的情况下才使用类型断言，否则还是交由 TypeScript 判断。

### 3. 接口与泛型

引用数据类型用 object 表示，是数组、对象和函数等所有非基本数据类型的统称。JavaScript 中狭义的对象是指 JSON 对象，JSON 对象的类型可以用 object 来表示。

实际上，需要通过类型来了解 JSON 对象有哪些属性，属性值的类型是什么，但 object 类型无法提供这些功能，因此还需要其他的类型，

#### 一、接口

TypeScript 提供了一个叫作“接口”的类型，用关键字 interface 表示，专门用来设置 JSON 对象的类型。通过 interface 可以定义对象的属性名、属性是否可选和属性值的类型等。示例如下:

```typescript
interface StudentType {
  id: number;
  name: string;
  desc?: string;
}
const student: StudentType = {
  id: 1,
  name: "⼩明",
  desc: "三好学⽣",
};
```

上述代码中的接口类型 StudentType 包含 3 个属性。id 和 name 是必需的，值类型分别是 number 和 string;desc 是可选的，值类型是 string。为变量 student 赋值时必须遵 StudentTyp 类型的规定，不规范的一律报错。示例如下:

```typescript
const student: StudentType = {
  name: "⼩明",
}; // 错误：缺少 id 属性
const student: StudentType = {
  id: 1,
  name: "⼩明",
  age: 18,
}; // 错误：age 不在接⼝类型 StudentType 中
```

使用 interface 的好处在于，在使用一个对象时，可以很清楚地知道对象具有哪些属性。为一个变量指定 interface 类型，在使用这个变量时，编辑器就会自动提示，非常方便。

JSON 数据有可能是多尽嵌套的，因此 interface 类型也支持多层嵌套以满足丰富的数据格式的需求。示例如下:

```typescript
interface BaseType {
  value: number;
  label: string;
}
interface ListType {
  tag: string;
  list: BaseType[];
}
const citys: ListType = {
  tag: "⾼校",
  list: [
    {
      value: 1,
      label: "清华⼤学",
    },
    {
      value: 2,
      label: "北京⼤学",
    },
  ],
};
console.log(citys);
```

interface 是复杂应用中最重要的类型，几乎可以包含 TypeScript 中的所有类型。因此，在这些公共函数、公共组件中，合理地编写 interface 类型不仅会让应用的健壮性更高，还会使快捷提更加友好。

#### 二、泛型

TypeScript 泛型(Generics)允许你创建可重用的、类型安全的代码，使函数、类、接口等能够与多种类型协同工作，而不失去类型检查的能力。泛型在实际开发中非常有用，特别是在处理多种类型的数据结构时。

**1)泛型函数**

泛型函数允许我们编写类型安全的代码，同时可以在函数调用时指定类型。

```typescript
// 定义⼀个泛型函数，T 是泛型参数
function identity<T>(arg: T): T {
  return arg;
}
// 使⽤泛型函数
let output1 = identity<string>("Hello TypeScript!"); // 明确指定 T 为 string
let output2 = identity<number>(42); // 明确指定 T 为 number
console.log(output1); // 输出: Hello TypeScript!
console.log(output2); // 输出: 42
```

在上面的例子中，`identity`函数可以处理任何类型的参数，并返回相同类型的值。使用泛型使得函数可以接受不同类型的参数，而不失去类型检查。

**2)泛型接口**

可以使用泛型定义接口，以支持多个类型，

```typescript
// 定义⼀个泛型接⼝
interface Pair<T, U> {
  first: T;
  second: U;
}
// 使⽤泛型接⼝
let pair1: Pair<string, number> = { first: "One", second: 1 };
let pair2: Pair<boolean, string> = { first: true, second: "True" };
console.log(pair1); // 输出: { first: "One", second: 1 }
console.log(pair2); // 输出: { first: true, second: "True" }
```

在这个例子中，`Pair `接口使用了两个泛型参数`T`和`U`，允许 `first` 和 `second`属性有不同的类型。

**3)泛型类**

泛型类允许类的属性和方法支持多种类型。

```typescript
// 定义⼀个泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
  constructor(zeroValue: T, addFn: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = addFn;
  }
}
// 使⽤泛型类
let myGenericNumber = new GenericNumber<number>(0, (x, y) => x + y);
console.log(myGenericNumber.add(5, 10)); // 输出: 15
let myGenericString = new GenericNumber<string>("", (x, y) => x + y);
console.log(myGenericString.add("Hello, ", "World!")); // 输出: Hello, World!
```

在这个例子中，`GenericNumber`类使用了一个泛型 T，允许创建能够处理不同类型，(如 number 或 string )的实例。

**4)泛型约束**

可以使用泛型约束来限制泛型的类型范围。

```typescript
// 定义⼀个具有泛型约束的接⼝
interface Lengthwise {
  length: number;
}
// 泛型函数，要求 T 必须具有 length 属性
function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// 使⽤泛型函数
logLength("Hello TypeScript!"); // 输出: 16
logLength([1, 2, 3]); // 输出: 3
logLength({ length: 10, value: 42 }); // 输出: 10
// logLength(42); // 错误: number 类型没有 length 属性
```

在这个例子中，`logLength `函数要求泛型 T 必须是具有`length `属性的类型。因此，传递给 `logLength` 的参数必须具有 `length`属性，如字符串、数组或带有 length 属性的对象。

**5)泛型默认类型**

可以为泛型参数提供默认类型。

```typescript
// 定义⼀个带有默认泛型类型的函数
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
// 使⽤泛型函数
let stringArray = createArray(3, "Hello"); // 推断 T 为 string
let numberArray = createArray<number>(3, 42); // 显式指定 T 为 number
console.log(stringArray); // 输出: ["Hello", "Hello", "Hello"]
console.log(numberArray); // 输出: [42, 42, 42]
```

在这个例子中，`createArray`函数的泛型参数`T`默认类型为 string ，所以不显式指定类型时，它会自动使用` string`类型。

总之，泛型提供了一种强大的方式来创建灵活且类型安全的代码，使得代码可以处理多种类型而不失去类型检查的能力。通过使用泛型，我们可以创建可重用的函数、接口、类等，并确保它们在不同的类型下依然工作良好。

提示:虽然 TypeScript 中的 any 类型也表示任意类型，但它和泛型的区别很大。any 可以直接屏蔽 TypeScript 的类型验证;而泛型是一个类型变量，有严格的类型验证。

### 4. 装饰器

装饰器是一种高阶语法，可以装饰某个数据对象。但装饰器目前只是 ECMAScript 的提案没有标准化，并且在 TypeScript 中也只是试验性功能，需要在配置中开启后才能使用。

开启装饰器的方法:在配置文件 tsconfig.json 中的 `compilerOptions `对象下，添加属姓`'experimentalDecorators":true` 即可。

TypeScript 中的装饰器(Decorators)是一种特殊的声明，它能够被附加到类、方法、属性或参数上，为它们添加元数据或修改其行为。装饰器提供了一种非常灵活和强大的机制，可以用来解决许多实际编程问题，尤其是在元编程、依赖注入、日志记录和权限控制等方面。

装饰器可以用于类、方法、属性和参数。以下是一些常见的装饰器类型及其妙用。

#### 一、类装饰器

类装饰器用于修改类的行为或为类添加元数据。下面这个简单的例子是给类添加一个日志功能，

记录类的实例化。

```typescript
function LogClass(constructor: Function) {
  console.log(`Class ${constructor.name} is being created`);
}
@LogClass
class MyClass {}
// 输出: Class MyClass is being created
```

#### 二、方法装饰器

方法装饰器可以用来修改或扩展方法的行为。例如，我们可以创建一个方法装饰器来测量方法执行的时间。

```typescript
function LogExecutionTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Executing ${propertyKey}...`);
    return originalMethod.apply(this, args);
  };
}
class MyService {
  @LogExecutionTime
  doSomething() {
    console.log("Doing something");
  }
}
const service = new MyService();
service.doSomething();
// 输出:
// Executing doSomething...
// Doing something
```

TypeScript 的配置文件 `tsconfig.json` 中需要开启 `experimentalDecorators` 选项。这是因为装饰器是一个实验性的特性，默认情况下并未开启。

**确保开启装饰器支持：** 打开 `tsconfig.json` 文件，确保里面有以下设置：

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

这里的 `LogExecutionTime`装饰器在`doSomething`方法执行之前打印了一条日志。

#### 三、属性装饰器

属性装饰器可以用来初始化或修改类的属性。

```typescript
function DefaultValue(value: any) {
  return function (target: any, propertyKey: string) {
    target[propertyKey] = value;
  };
}
class TestClass {
  @DefaultValue("Hello, World!")
  greeting: string;
}
const testClass = new TestClass();
console.log(testClass.greeting); // 输出: Hello, World!
```

`DefaultValue`装饰器将`greeting`属性初始化为“Hello，World!

#### 四、参数装饰器

参数装饰器可以用来记录方法参数。

```typescript
function LogParameter(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  console.log(`Parameter at index ${parameterIndex} in method ${propertyKe
                                                                y}`) }
class DemoClass {
  greet(@LogParameter message: string) {
    console.log(message)
  } }
const demoClass = new DemoClass()
demoClass.greet('Hello')
// 输出: Parameter at index 0 in method greet
```

`LogParameter`装饰器记录了 `greet `方法的第一个参数。

TypeScript 装饰器为元编程提供了强大的工具，使得我们能够优雅地实现许多复杂的功能，如日志记录、权限控制、依赖注入和数据验证。虽然装饰器功能强大，但也应当谨慎使用，避免滥用装饰器导致代码难以维护和调试。

### 5. tsconfig.json

前面提到了配置文件 tsconfig.json，其实 TypeScript 的所有规则都定义在这个配置文件中。

TypeScript 与其他高级语法一样，浏览器并不认识，需要通过编译器将 TypeScript 代码转换成 JavaScript 代码。TypeScript 的编译器就是 tsc 编译器。

tsconfig.json 文件中的几个主要配置项如下:

```json
{
  "compileOnSave": true,
  "include": [],
  "exclude": [],
  "compilerOptions": {}
}
```

前 3 个配置项都是 tsc 编译器的选项，其含义如下

- compileOnSave: 是否在文件保存时自动编译。
- include: 指定哪些目录/文件会被编译。
- exclude: 指定哪些目录/文件不会被编译。

这 3 个配置项确定了 tsc 编译器需要编译哪些文件;第 4 个配置项 compilerOptions 表示详细的编译规则，并且是重中之重。compilerOptions 配置项包含的属性如下。

- target: 编译后的 ES 版本，可选值有 ES3(默认值)、ES5、ES6 和 ESNEXT 等
- module: 编译后的模块标准，可选值有 CommonJS 和 ES6。
- baseUr: 重要，模块的基本路径。
- paths: 重要，设置基于 baseUrl 的模块路径。
- allowJs: 是否允许编译 JavaScript 文件，默认值为 false。
- checkJs: 是否检查和报告 JavaScript 文件中的错误，默认值为 false。
- sourceMap: 是否生成.map 文件。
- strictNulChecks: 是否严格检查 nul 和 undefined。

其中，比较重要且经常被修改的是` baseUrl` 属性和 `paths `属性。例如，在 Webpack 中配置了一个路径别名“@/”，但 TypeScript 并不认识这个别名，所以需要在 paths 属性中配置这个别名。

要配置 paths 属性必须先配置 baseUrl 属性，因为 paths 配置的路径是基于 baseUrl 属性的，示例如下:

```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

这个配置告诉 TypeScript，路径“@/_”实际指向的地址是“./src/_”，这样 TypeScript 就不会报错。

提示:更多关于` compilerOptions` 配置项的配置请查阅官方文档。
