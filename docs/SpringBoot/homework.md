# 课后作业

## JDK 8~JDK17 主要的新特性学习

### JDK 8 新特性

#### Lambda 表达式

**目标:**

掌握 JDK 8 引入的 **Lambda 表达式** 特性，用于简化代码、提高可读性和可维护性，特别是在集合操作和并发处理中。

**任务描述:**

假设你正在开发一个员工管理系统，需要对员工列表进行各种操作，如筛选、排序和统计等。

**示例代码:**

首先，定义一个员工类 `Employee`：

```java
public class Employee {
    private Long id;
    private String name;
    private int age;
    private String department;
    // // Constructors, getters, and setters
}

```

然后，创建一个服务类 `EmployeeService`，使用 Lambda 表达式和 Stream API 来处理员工列表：

```java
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private List<Employee> employees = Arrays.asList(
        new Employee(1L, "Alice", 28, "HR"),
        new Employee(2L, "Bob", 35, "IT"),
        new Employee(3L, "Charlie", 32, "Finance"),
        new Employee(4L, "David", 25, "IT")
    );

    // 使用 Lambda 表达式过滤 IT 部门的员工
    public List<Employee> getITDepartmentEmployees() {
        return employees.stream()
                .filter(employee -> "IT".equals(employee.getDepartment()))
                .collect(Collectors.toList());
    }

    // 使用 Lambda 表达式计算平均年龄
    public double getAverageAge() {
        return employees.stream()
                .mapToInt(Employee::getAge)
                .average()
                .orElse(0);
    }
}
```

接着，创建一个 Spring Boot 控制器 `EmployeeController`：

```java
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeService employeeService;
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/it")
    public List<Employee> getITDepartmentEmployees() {
        return employeeService.getITDepartmentEmployees();
    }

    @GetMapping("/average-age")
    public double getAverageAge() {
        return employeeService.getAverageAge();
    }


```

启动应用，访问以下端点：

- 获取 IT 部门员工列表: `[http://localhost:8080/employees/it](http://localhost:8080/employees/it)`
- 获取员工平均年龄: `[http://localhost:8080/employees/average-age](about:blank)`

说明：

**Lambda 表达式** 是 JDK 8 的一大特性，它允许你使用更简洁的方式来表示匿名函数，主要用于替代匿名内部类。其语法格式如下：

`(parameters) -> expression`

`(parameters) -> { statements; }`

在集合操作中，Lambda 表达式与 **Stream API** 结合，可以方便地进行过滤、映射、排序等操作。例如 ：

**过滤**： `list.stream().filter(element -> condition).collect(Collectors.toList());`

**映射**：`list.stream().map(element -> transform).collect(Collectors.toList());`

**排序**：`list.stream().sorted((e1, e2) -> e1.compareTo(e2)).collect(Collectors.toList());`

### JDK 9 新特性

#### **改进 Optional 类:新增** `ifPresentOrElse`、`or` 和 `stream` 方法

**目标：**

掌握 JDK 9 引入的 **Optional** 新特性 `ifPresentOrElse`、`or` 和 `stream` 方法，用于更高效地处理可能为空的值，增强代码的健壮性和简洁性。

**任务描述：**

**1.场景设定**: 假设你正在开发一个订单管理系统，需要处理订单的交付状态。订单可能存在不同状态，比如已交付、待交付或取消。你可以通过 JDK 9 引入的 `Optional` 方法来处理订单状态，避免空值引发的潜在错误。

**2.要求**:

- 使用 `ifPresentOrElse` 检查订单状态并根据情况执行不同的操作。
- 使用 `or` 提供一个备用的 `Optional` 值。
- 使用 `stream` 将 `Optional` 转换为流，便于结合 Stream API 进行操作。

**示例代码：**

首先，定义一个 `Order` 类来表示订单信息：

```java
public class Order {
    private Long id;
    private String product;
    private Optional<String> deliveryStatus;

    public Order(Long id, String product, String deliveryStatus) {
        this.id = id;
        this.product = product;
        this.deliveryStatus = Optional.ofNullable(deliveryStatus); // 允许交付状态为空
    }
// getters, and setters
}

```

接着，创建一个服务类 `OrderService`，利用 JDK 9 的 `Optional` 新特性来处理订单的交付状态：

```java
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class OrderService {
    private List<Order> orders = List.of(
        new Order(1L, "Laptop", "Delivered"),
        new Order(2L, "Smartphone", null), // 未交付
        new Order(3L, "Tablet", "Pending")
    );

    // 使用 ifPresentOrElse 打印订单状态或执行默认操作
    public void printDeliveryStatus(Long orderId) {
        findOrderById(orderId).ifPresentOrElse(
            order -> order.getDeliveryStatus().ifPresentOrElse(
                status -> System.out.println("Order delivery status: " + status),
                () -> System.out.println("Delivery status not available")
            ),
            () -> System.out.println("Order not found")
        );
    }

    // 使用 or 提供一个默认的 Optional 值
    public String getDeliveryStatusOrDefault(Long orderId) {
        return findOrderById(orderId)
                .flatMap(Order::getDeliveryStatus) // 使用 flatMap 展开 Optional<Optional<String>>
                .or(() -> Optional.of("Unknown"))  // 若状态为空，返回默认值“Unknown”
                .get();
    }

    // 使用 stream 方法将 Optional 转换为流
    public void processDeliveryStatusStream(Long orderId) {
        findOrderById(orderId).flatMap(Order::getDeliveryStatus)
            .stream()
            .forEach(status -> System.out.println("Processing delivery status: " + status));
    }

    private Optional<Order> findOrderById(Long id) {
        return orders.stream()
                     .filter(order -> order.getId().equals(id))
                     .findFirst();
    }
}
```

最后，创建一个控制器 `OrderController` 来处理 REST API 请求：

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{id}/status")
    public void printDeliveryStatus(@PathVariable Long id) {
        orderService.printDeliveryStatus(id);
    }

    @GetMapping("/{id}/status-or-default")
    public String getDeliveryStatusOrDefault(@PathVariable Long id) {
        return orderService.getDeliveryStatusOrDefault(id);
    }

    @GetMapping("/{id}/process-status")
    public void processDeliveryStatusStream(@PathVariable Long id) {
        orderService.processDeliveryStatusStream(id);
    }
}
```

**启动访问以下端点：**

- **打印订单交付状态或默认消息\*\***: **`[**http://localhost:8080/orders/1/status\*\*](http://localhost:8080/orders/1/status)`
- **获取订单交付状态或默认值\*\***: **`[**http://localhost:8080/orders/2/status-or-default\*\*](http://localhost:8080/orders/2/status-or-default)`
- **处理订单交付状态流: **`[**http://localhost:8080/orders/3/process-status**](http://localhost:8080/orders/3/process-status)`

#### 集合工厂方法

假设你正在开发一个学生管理系统，需要初始化一些集合数据，如学生名单、课程列表等。利用 JDK 9 引入的集合增强特性，通过简洁的 API 初始化不可变集合，提升代码的可读性和维护性。

**示例代码：**

首先，定义一个学生类 `Student`：

```java
public class Student {
    private Long id;
    private String name;
    private int age;
    private String major;
    // Constructors, getters, and setters
}
```

然后，创建一个服务类 `StudentService`，使用 JDK 9 的集合增强特性来初始化不可变集合：

```java
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class StudentService {
    // 使用 JDK 9 的 List.of() 初始化不可变学生列表
    private List<Student> students = List.of(
        new Student(1L, "Alice", 20, "Computer Science"),
        new Student(2L, "Bob", 22, "Mechanical Engineering"),
        new Student(3L, "Charlie", 21, "Electrical Engineering")
    );

    // 使用 JDK 9 的 Set.of() 初始化不可变专业集合
    private Set<String> majors = Set.of("Computer Science", "Mechanical Engineering", "Electrical Engineering");

    // 使用 JDK 9 的 Map.of() 初始化不可变课程-学分映射
    private Map<String, Integer> courses = Map.of(
        "Math", 3,
        "Physics", 4,
        "Programming", 5
    );

    // 获取学生列表
    public List<Student> getAllStudents() {
        return students;
    }

    // 获取所有专业
    public Set<String> getAllMajors() {
        return majors;
    }

    // 获取课程-学分映射
    public Map<String, Integer> getAllCourses() {
        return courses;
    }
}
```

接着，创建一个 Spring Boot 控制器 `StudentController`：

```java
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/majors")
    public Set<String> getAllMajors() {
        return studentService.getAllMajors();
    }

    @GetMapping("/courses")
    public Map<String, Integer> getAllCourses() {
        return studentService.getAllCourses();
    }
}

```

**启动应用，访问以下端点：**

- **获取学生列表**: `[http://localhost:8080/students/all](http://localhost:8080/students/all)`
- **获取所有专业**: `[http://localhost:8080/students/majors](http://localhost:8080/students/majors)`
- **获取课程-学分映射**: `[http://localhost:8080/students/courses](http://localhost:8080/students/courses)`

**说明：**

- `**List.of()**`：创建一个不可变的 `List`，简化集合的初始化过程。
- `**Set.of()**`：创建一个不可变的 `Set`，确保集合不被修改。
- `**Map.of()**`：创建一个不可变的 `Map`，可以传入键值对，最多支持 10 对键值；可以使用 `Map.ofEntries()` 传入更多对键值。

### JDK 13/14 新特性

#### 文本块（Text Blocks）

假设你正在开发一个报告生成系统，需要生成复杂的 HTML 模板或 SQL 查询。通过 JDK 13/14 引入的文本块特性，可以简化多行字符串的创建，提升代码可读性，减少手动处理多行字符串的繁琐工作。

**示例代码**

定义一个生成 HTML 报告的服务类 `ReportService`：

```java
import org.springframework.stereotype.Service;

@Service
public class ReportService {
    public String generateReport(String title, String content) {
        // 使用文本块简化 HTML 模板的表示
        String htmlTemplate = """
                <html>
                    <head>
                        <title>%s</title>
                    </head>
                    <body>
                        <h1>%s</h1>
                        <p>%s</p>
                    </body>
                </html>
                """;
        return String.format(htmlTemplate, title, title, content);
    }
}
```

创建一个 Spring Boot 控制器 `ReportController`，用于返回生成的 HTML 报告：

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/{title}")
    public String getReport(@PathVariable String title) {
        // 模拟报告内容
        String content = "This is the content of the report.";
        return reportService.generateReport(title, content);
    }
}

```

**启动应用，访问以下端点：**

**获取生成的 HTML 报告**：`http://localhost:8080/report/{title}`

例如，访问 `http://localhost:8080/report/AnnualReport` 会生成如下 HTML 输出：

![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141248149.png)

**说明：**

文本块的主要优点：

- **简化多行字符串的表示**：不再需要手动加引号和换行符，使用三重引号 `"""` 包围文本块即可创建多行字符串。
- **自动处理缩进**：文本块可以自动处理缩进，使代码格式更加整齐。
- **减少转义字符的使用**：不需要大量的转义字符来表示换行或引号

### JDK 17 新特性

#### 模式匹配（Pattern Matching for `instanceof`）

假设你正在开发一个车辆管理系统，需要根据不同的车辆类型处理特定的车辆信息。通过 JDK 17 的模式匹配特性，可以简化对象类型检查和类型转换。

**示例代码：**

\*\* \*\*首先，定义一个基本的 `Vehicle` 类及其子类：

```java
public class Vehicle {
    private String licensePlate;
    private String brand;

    public Vehicle(String licensePlate, String brand) {
        this.licensePlate = licensePlate;
        this.brand = brand;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public String getBrand() {
        return brand;
    }
}

public class Car extends Vehicle {
    private int seatingCapacity;

    public Car(String licensePlate, String brand, int seatingCapacity) {
        super(licensePlate, brand);
        this.seatingCapacity = seatingCapacity;
    }

    public int getSeatingCapacity() {
        return seatingCapacity;
    }
}

public class Truck extends Vehicle {
    private double loadCapacity;

    public Truck(String licensePlate, String brand, double loadCapacity) {
        super(licensePlate, brand);
        this.loadCapacity = loadCapacity;
    }

    public double getLoadCapacity() {
        return loadCapacity;
    }
}
```

然后，创建一个服务类 `VehicleService`，使用 JDK 17 的模式匹配特性处理不同类型的车辆：

```java
import org.springframework.stereotype.Service;

@Service
public class VehicleService {

    public String getVehicleDetails(Vehicle vehicle) {
        // 使用 JDK 17 模式匹配简化类型检查和转换
        if (vehicle instanceof Car car) {
            return "Car - Brand: " + car.getBrand() + ", Seating Capacity: " + car.getSeatingCapacity();
        } else if (vehicle instanceof Truck truck) {
            return "Truck - Brand: " + truck.getBrand() + ", Load Capacity: " + truck.getLoadCapacity() + " tons";
        } else {
            return "Vehicle - Brand: " + vehicle.getBrand();
        }
    }
}
```

接着，创建一个 Spring Boot 控制器 `VehicleController`：

```java
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping("/{licensePlate}")
    public String getVehicleDetails(@PathVariable String licensePlate) {
        // 模拟一个车辆对象，实际应用中可以从数据库或其他服务获取
        Vehicle vehicle = "ABC123".equals(licensePlate) ? new Car("ABC123", "Toyota", 5) :
                          "XYZ789".equals(licensePlate) ? new Truck("XYZ789", "Volvo", 10) :
                          new Vehicle("DEF456", "Ford");
        return vehicleService.getVehicleDetails(vehicle);
    }
}

```

**启动应用，访问以下端点：**

- **获取车辆详情**: `http://localhost:8080/vehicles/{licensePlate}`

根据不同的车辆类型，返回对应的详情信息。例如：

- `http://localhost:8080/vehicles/ABC123` 返回 "Car - Brand: Toyota, Seating Capacity: 5"
- `http://localhost:8080/vehicles/XYZ789` 返回 "Truck - Brand: Volvo, Load Capacity: 10 tons"
- `http://localhost:8080/vehicles/DEF456` 返回 "Vehicle - Brand: Ford"

**说明：**

- **模式匹配用于 **`**instanceof**`：通过模式匹配，代码可以在 `instanceof` 语句之后，直接声明和使用该类型的变量，而无需再次强制类型转换。这个特性使代码更加简洁明了。

## 常用的 IDEA 插件使用

[九款好用的 IDEA 插件，强烈推荐！！！不容错过\_idea 中文插件-CSDN 博客](https://blog.csdn.net/m0_70325779/article/details/137346909?ops_request_misc=%257B%2522request%255Fid%2522%253A%25220C170EBC-765B-43AA-A725-7708F4C668EF%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=0C170EBC-765B-43AA-A725-7708F4C668EF&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_positive~default-1-137346909-null-null.142^v100^pc_search_result_base4&utm_term=idea%E6%8F%92%E4%BB%B6&spm=1018.2226.3001.4187)

### Apifox Helper

按照官方文档进行简单配置后，在项目中，直接右键就可以将接口同步到 Apifox，省去了很多导入导出的工作。

### Apipost-Helper-2.0

这是可以直接在 idea 中调用请求的插件，restful 也能做到，但是它的界面更加好看操作丝滑，可以配置默认请求头和前缀，不用在 idea 和 apifox 中来回切换，大大提高了效率，也能我们更专心 code。

### **SonarLint**

- **功能**：实时的代码质量和安全分析工具，帮助发现代码中的潜在问题和安全漏洞，提供重构建议。
- **适用场景**：代码质量管理、重构或优化时。
- **优势**：支持多种编程语言（Java、JavaScript、Kotlin 等），能快速发现潜在的错误或优化点。

**推荐原因**：与 SonarQube 平台集成，可以帮助提高代码的健壮性和可维护性，尤其适用于敏捷开发和代码审查流程。

### **String Manipulation**

- **功能**：提供一系列字符串处理工具，如转换大小写、连接行、反转字符串、转换为 CamelCase 等等。
- **适用场景**：需要频繁对字符串进行手动操作和调整时。
- **优势**：提供丰富的字符串处理功能，提升处理复杂文本内容的效率。

**推荐原因**：字符串操作频繁的场景中可以大大减少重复工作，提升工作效率。

### **Tabnine**

- **功能**：AI 驱动的代码自动补全工具，能够根据上下文预测代码，并生成相关提示。
- **适用场景**：需要智能代码提示和快速编写代码时，适用于各种语言（Java、Python、JavaScript 等）。
- **优势**：通过机器学习提供高效智能补全，尤其在重复性任务或初学新语言时非常有帮助。

**推荐原因**：相比传统的 IDE 提示，它能够更智能地理解上下文并进行提示，提升编码速度。

### Translation

- **功能**：为 IntelliJ IDEA 提供多语言翻译支持，支持即时翻译文本内容。
- **适用场景**：需要翻译文档、代码注释、变量名等内容，尤其适合需要阅读外文技术资料的项目。
- **优势**：支持多个翻译引擎，操作简便，快捷翻译高效。
- **推荐原因**：减少开发者查阅外文资料的时间，提升开发和学习效率，特别适合国际化项目和技术学习。

## 其他

### jdk 任意切换

[cmd 命令一键切换 JDK 版本环境\_cmd jdk 版本-CSDN 博客](https://blog.csdn.net/qq_41365048/article/details/136657501?ops_request_misc=&request_id=&biz_id=102&utm_term=JDK%E7%89%88%E6%9C%AC%E4%BB%BB%E6%84%8F%E5%88%87%E6%8D%A2%EF%BC%8C%E5%91%BD%E4%BB%A4%E8%A1%8C%E4%B8%80%E6%9D%A1%E5%B0%B1%E5%8F%AF%E4%BB%A5&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-136657501.142^v100^pc_search_result_base4&spm=1018.2226.3001.4187)

关掉窗口后无法保持切换后的 jdk，仍会变回默认的 jdk

[TIOBE 指数 - TIOBE](https://www.tiobe.com/tiobe-index/)![](https://hyzhu-oss.oss-cn-hangzhou.aliyuncs.com/md/202410141249018.png)

###
