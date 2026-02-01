export type Category = 'Basic' | 'OOP' | 'Advanced' | 'Collections';

export interface ConceptData {
    id: string;
    slug: string;
    term: string;
    definition: string;
    category: Category;
    deepDive: string[];
    codeSnippet: string;
    realWorldUse: string;
    relatedModuleUrl?: string;
}

export const concepts: ConceptData[] = [
    {
        id: '1',
        slug: 'variable',
        term: 'Variable',
        definition: 'A container that holds data values.',
        category: 'Basic',
        deepDive: [
            "Variables are the fundamental units of storage in a Java program. When you declare a variable, you are essentially reserving a specific amount of memory to hold data.",
            "In Java, variables are 'Strongly Typed', meaning you must define the type of data (int, boolean, String) before you use it. This helps the compiler catch errors early.",
            "Primitive variables (int, double) are stored on the 'Stack' for speed, while Reference variables (Objects) store a memory address on the Stack that points to the actual data on the 'Heap'."
        ],
        codeSnippet: `// Declaration + Initialization
int age = 25;
double price = 19.99;
String name = "Java";

// Constants (cannot change)
final double PI = 3.14159;`,
        realWorldUse: "Used everywhere. From storing a user's score in a game to holding a bank balance calculation.",
        relatedModuleUrl: '/learn/module-2'
    },
    {
        id: '2',
        slug: 'class',
        term: 'Class',
        definition: 'A blueprint for creating objects.',
        category: 'OOP',
        deepDive: [
            "A Class is a user-defined blueprint or prototype from which objects are created. It represents the set of properties strings (fields) and methods that are common to all objects of one type.",
            "Think of a Class like a 'Cookie Cutter'. It determines the shape, but it is not the cookie itself. You can make millions of cookies (Objects) from one cutter.",
            "Classes don't consume memory for their fields until you actually create an Instance (Object) of that class."
        ],
        codeSnippet: `public class Car {
    // Fields (State)
    String color;
    int currentSpeed;

    // Methods (Behavior)
    void drive() {
        currentSpeed = 60;
    }
}`,
        realWorldUse: "In a banking app, 'BankAccount' is any class. It defines that every account has a 'balance' and a 'withdraw()' method.",
        relatedModuleUrl: '/learn/module-3'
    },
    {
        id: '3',
        slug: 'object',
        term: 'Object',
        definition: 'An instance of a class.',
        category: 'OOP',
        deepDive: [
            "An Object is a basic unit of Object-Oriented Programming and represents real-life entities. A Java program creates many objects which interact by invoking methods.",
            "Objects live on the 'Heap' memory. Java's Garbage Collector automatically frees up memory when objects are no longer used.",
            "Each object has its own copy of instance variables. Changing 'color' on one Car object does not affect another Car object."
        ],
        codeSnippet: `// 'Car' is the Class (Type)
// 'myCar' is the Object (Instance)
Car myCar = new Car();

myCar.color = "Red";
myCar.drive();`,
        realWorldUse: "A 'User' object representing You currently logged in. Another 'User' object represents your friend.",
        relatedModuleUrl: '/learn/module-3'
    },
    {
        id: '4',
        slug: 'method',
        term: 'Method (Function)',
        definition: 'A block of code which only runs when it is called.',
        category: 'Basic',
        deepDive: [
            "A Method is a collection of statements that perform some specific task and return the result to the caller. In other languages, these are often called 'Functions'.",
            "Every method has a Signature: Name + Parameter Types. You can have multiple methods with the same name if they have different parameters (Overloading).",
            "When a method is called, a new 'Stack Frame' is pushed onto the Call Stack to hold its local variables. When it returns, the frame is popped."
        ],
        codeSnippet: `// ReturnType Name(Parameters)
public int add(int a, int b) {
    return a + b;
}

// Calling it
int sum = add(5, 10); // 15`,
        realWorldUse: "Reusable logic. Instead of writing the tax calculation code 50 times, you write one 'calculateTax()' method and call it.",
        relatedModuleUrl: '/learn/module-3'
    },
    {
        id: '5',
        slug: 'inheritance',
        term: 'Inheritance',
        definition: 'Mechanism where a new class derives properties from an existing class.',
        category: 'OOP',
        deepDive: [
            "Inheritance allows you to define a parent class (Superclass) and child classes (Subclasses) that inherit fields and methods.",
            "It promotes code reuse using the `extends` keyword. Ideally, it models an 'IS-A' relationship (e.g., A Dog IS-A Animal).",
            "In Java, every class implicitly extends the `Object` class."
        ],
        codeSnippet: `class Animal {
    void eat() { System.out.println("Eating..."); }
}

// Dog inherits 'eat()'
class Dog extends Animal {
    void bark() { System.out.println("Woof!"); }
}`,
        realWorldUse: "In a UI framework, 'Button', 'Slider', and 'Checkbox' all inherit from a common 'Component' class that handles rendering.",
        relatedModuleUrl: '/learn/module-3'
    },
    {
        id: '6',
        slug: 'polymorphism',
        term: 'Polymorphism',
        definition: 'The ability of an object to take on many forms.',
        category: 'OOP',
        deepDive: [
            "Polymorphism allows you to treat objects of different classes in a uniform way. The most common use is when a Parent Class reference holds a Child Class object.",
            "Dynamic Dispatch (Runtime Polymorphism): The method that gets called is decided at runtime based on the actual object type, not the variable type.",
            "This makes systems extensible. You can add new types of 'Shape' without changing the code that draws all shapes."
        ],
        codeSnippet: `Animal a = new Dog();
a.makeSound(); // Calls Dog's version even though type is Animal

Animal b = new Cat();
b.makeSound(); // Calls Cat's version`,
        realWorldUse: "A 'PaymentProcessor' interface allows you to swap between 'Stripe', 'PayPal', or 'CreditCard' implementations without breaking the app.",
        relatedModuleUrl: '/learn/module-3'
    },
    {
        id: '7',
        slug: 'encapsulation',
        term: 'Encapsulation',
        definition: 'Wrapping data (variables) and code acting on the data together.',
        category: 'OOP',
        deepDive: [
            "Encapsulation is about 'Data Hiding'. storage fields should be `private` so they cannot be accessed directly from outside the class.",
            "Access is provided via public 'Getters' and 'Setters'. This allows you to add validation logic (e.g., preventing a negative age).",
            "It decouples the internal implementation from how others use your class."
        ],
        codeSnippet: `class User {
    private String password; // Hidden

    public void setPassword(String p) {
        if (p.length() > 8) {
             this.password = p;
        }
    }
}`,
        realWorldUse: "A Bank Account class wouldn't let you set 'balance = -1000' directly. You must use 'withdraw()', which checks if you have enough money.",
        relatedModuleUrl: '/learn/module-3'
    },
    {
        id: '8',
        slug: 'interface',
        term: 'Interface',
        definition: 'A reference type defining a contract of abstract methods.',
        category: 'OOP',
        deepDive: [
            "An Interface is a completely 'abstract class' that is used to group related methods with empty bodies. It defines WHAT a class must do, but not HOW.",
            "A class `implements` an interface. Java allows implementing multiple interfaces (solving the multiple inheritance problem).",
            "Since Java 8, interfaces can also have `default` methods with implementation."
        ],
        codeSnippet: `interface Flyable {
    void fly(); // No body
}

class Bird implements Flyable {
    public void fly() {
        System.out.println("Flapping wings");
    }
}`,
        realWorldUse: "USB Standard. Any device (mouse, keyboard, drive) that 'implements' the USB interface can be plugged into your computer.",
        relatedModuleUrl: '/learn/module-3'
    },
    {
        id: '9',
        slug: 'exception',
        term: 'Exception',
        definition: 'An event that disrupts the normal flow of the program.',
        category: 'Advanced',
        deepDive: [
            "Exceptions are objects that wrap an error event. When an error occurs, an exception is 'thrown'.",
            "Checked Exceptions (e.g., IOException) must be handled at compile time. Unchecked Exceptions (e.g., NullPointerException) happen at runtime.",
            "We handle them using `try`, `catch`, and `finally` blocks to prevent the application from crashing."
        ],
        codeSnippet: `try {
    int data = 10 / 0; // Throws ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
} finally {
    System.out.println("Always runs to cleanup");
}`,
        realWorldUse: "If a file is missing or the internet disconnects, your app shows a 'Retry' button instead of crashing to desktop.",
        relatedModuleUrl: '/learn/module-6'
    },
    {
        id: '10',
        slug: 'arraylist',
        term: 'ArrayList',
        definition: 'A resizable array implementation of the List interface.',
        category: 'Collections',
        deepDive: [
            "Standard Arrays in Java are fixed-size. `ArrayList` grows dynamically. It is part of the `java.util` package.",
            "It is backed by a regular array. When it gets full, it creates a new, larger array (usually 50% larger) and copies all elements over.",
            "It is very fast for reading data O(1) but slower for inserting into the middle O(n)."
        ],
        codeSnippet: `import java.util.ArrayList;

ArrayList<String> list = new ArrayList<>();
list.add("Apple"); 
list.add("Banana");
list.remove(0); // Removes Apple`,
        realWorldUse: "Storing a list of items in a shopping cart where you don't know how many items the user will add.",
        relatedModuleUrl: '/learn/module-4'
    },
    {
        id: '11',
        slug: 'hashmap',
        term: 'HashMap',
        definition: 'A map based collection that stores Key-Value pairs.',
        category: 'Collections',
        deepDive: [
            "HashMap uses a technique called 'Hashing'. It converts the Key into an integer index (hash code) to find the location in memory.",
            "This makes checking for data extremely fast (O(1) average time complexity), regardless of how much data is in the map.",
            "Keys must be unique. If you add a duplicate key, it overwrites the existing value."
        ],
        codeSnippet: `import java.util.HashMap;

HashMap<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 80);

int score = scores.get("Alice"); // 95`,
        realWorldUse: "Caching. Storing user sessions where the Key is the Session ID and the Value is the User Profile.",
        relatedModuleUrl: '/learn/module-4'
    },
    {
        id: '12',
        slug: 'thread',
        term: 'Thread',
        definition: 'A unit of execution within a process.',
        category: 'Advanced',
        deepDive: [
            "Multithreading allows a program to do multiple things at once (Concurrency).",
            "You create a thread by extending the `Thread` class or implementing `Runnable`.",
            "The JVM and OS manage these threads, slicing CPU time between them to give the illusion of parallelism."
        ],
        codeSnippet: `Thread t = new Thread(() -> {
    System.out.println("Running in background...");
});
t.start(); // Starts the separate thread`,
        realWorldUse: "Downloading a large file in a background thread while keeping the UI responsive to mouse clicks.",
        relatedModuleUrl: undefined
    },
    {
        id: '13',
        slug: 'lambda-expression',
        term: 'Lambda Expression',
        definition: 'A short block of code which takes parameters and returns a value.',
        category: 'Advanced',
        deepDive: [
            "Lambdas were introduced in Java 8 to enable Functional Programming. They provide a clear and concise way to represent one method interface.",
            "They are often used with the Stream API to process collections of data.",
            "Syntax: `(parameters) -> expression`."
        ],
        codeSnippet: `List<Integer> numbers = Arrays.asList(1, 2, 3);

// Using Lambda to print each number
numbers.forEach( (n) -> System.out.println(n) );`,
        realWorldUse: "Filtering a list of products: `products.filter(p -> p.price < 50)`.",
        relatedModuleUrl: undefined
    },
    {
        id: '14',
        slug: 'array',
        term: 'Array',
        definition: 'A container object that holds a fixed number of values of a single type.',
        category: 'Basic',
        deepDive: [
            "Arrays are the most basic data structure. They store items in contiguous memory locations.",
            "They have a fixed size once created. You cannot add more slots later.",
            "Accessing an element by index `arr[5]` is extremely fast because the computer can calculate the exact memory address."
        ],
        codeSnippet: `int[] numbers = new int[5]; // Array of 5 integers
numbers[0] = 10;
numbers[1] = 20;

// Literal syntax
String[] fruits = {"Apple", "Banana"};`,
        realWorldUse: "Pixel data in an image (width x height). Matrices in math. Underlying storage for ArrayLists.",
        relatedModuleUrl: '/learn/module-4'
    },
    {
        id: '15',
        slug: 'loop',
        term: 'Loop',
        definition: 'A control flow statement for traversing a sequence of instructions.',
        category: 'Basic',
        deepDive: [
            "Loops allow you to execute a block of code multiple times.",
            "Common types: `for` (standard), `while` (indefinite), `do-while` (at least once), and `for-each` (for collections).",
            "You must be careful to update the loop condition, otherwise you get an Infinite Loop which freezes the program."
        ],
        codeSnippet: `// For Loop
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// While Loop
while (gameRunning) {
   updateGame();
}`,
        realWorldUse: "Processing every user in a database. Drawing every pixel on the screen 60 times a second.",
        relatedModuleUrl: '/learn/module-5'
    }
];
