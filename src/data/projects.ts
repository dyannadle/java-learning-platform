import { Code, Server, Globe, Database, Smartphone, Terminal } from 'lucide-react';

export type Difficulty = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProjectStep {
    title: string;
    description: string;
    code?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string; // Brief Synopsis
    longDescription: string; // Detailed Synopsis
    deepDiveSynopsis?: string; // New: Technical Deep Dive
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    tech: string[];
    icon: any; // Lucide Icon
    steps: ProjectStep[];
}

export const PROJECTS: Project[] = [
    {
        id: 'console-bank',
        title: 'Console Banking System',
        description: 'A CLI app to manage customers, accounts, and transactions. Learn loops, arrays, and basic OOP.',
        longDescription: 'Build a robust command-line banking application. User will be able to create accounts, deposit money, withdraw funds, and transfer between accounts. This project reinforces Object-Oriented Programming (OOP) principles like Encapsulation and Polymorphism.',
        difficulty: 'Beginner',
        tech: ['Java Core', 'Scanner', 'Arrays', 'OOP'],
        icon: Terminal,
        steps: [
            {
                title: "Step 1: The Account Class",
                description: "Create a base class to hold account data.",
                code: `public class Account {
    private String accountNumber;
    private double balance;
    
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    // getters and setters...
}`
            },
            {
                title: "Step 2: The Bank Manager",
                description: "Create a class to manage a list of accounts (using Array or ArrayList).",
                code: `public class Bank {
    private List<Account> accounts = new ArrayList<>();
    
    public void createAccount(String name, double initialDeposit) {
        // Logic to create and add account
    }
}`
            },
            {
                title: "Step 3: The CLI Menu",
                description: "Use a while loop and Scanner to accept user input.",
                code: `Scanner sc = new Scanner(System.in);
while(running) {
    System.out.println("1. Deposit  2. Withdraw  3. Exit");
    int choice = sc.nextInt();
    // switch-case for choices
}`
            }
        ],
        deepDiveSynopsis: `
### 🔧 Architecture & Design
This project follows a **Monolithic CLI Architecture**.
- **State Management**: The \`Bank\` class acts as the single source of truth (Singleton-lite), holding the state of all accounts in memory.
- **Encapsulation**: All account fields are \`private\`. Access is strictly controlled via \`deposit()\` and \`withdraw()\` methods to prevent invalid states (e.g., negative balance).

### ⚠️ Technical Challenges
1.  **Input Validation**: Handling non-numeric input when the Scanner expects an \`int\` (throws \`InputMismatchException\`).
2.  **Object References**: Understanding that \`Account a = accounts.get(0)\` returns a **reference**, not a copy. Modifying \`a\` modifies the object in the list.

### 💼 Interview Relevance
- "Explain how you would handle floating-point errors in a banking app?" (Answer: Don't use \`double\` for money! Use \`BigDecimal\`. This project uses double for simplicity, which is a great talking point about its limitations.)`
    },
    {
        id: 'calculator',
        title: 'Scientific Calculator',
        description: 'Build a GUI calculator that handles complex math operations. Introduction to Swing/JavaFX.',
        longDescription: 'Move away from the console and build your first Desktop Application. You will create a visual calculator that supports standard operations (Add, Sub, Mul, Div) and scientific functions (Sin, Cos, Log).',
        difficulty: 'Beginner',
        tech: ['JavaFX', 'Math API', 'Event Handling'],
        icon: Code,
        steps: [
            {
                title: "Step 1: Setup JavaFX / Swing",
                description: "Initialize the main window (Stage) and Layout (GridPane).",
                code: `public void start(Stage primaryStage) {
    GridPane grid = new GridPane();
    Scene scene = new Scene(grid, 300, 400);
    primaryStage.setTitle("Calculator");
    primaryStage.show();
}`
            },
            {
                title: "Step 2: Creating Buttons",
                description: "Create Button objects for digits 0-9 and operators.",
                code: `Button btn1 = new Button("1");
btn1.setOnAction(e -> inputField.appendText("1"));`
            },
            {
                title: "Step 3: Logic Parsing",
                description: "When '=' is pressed, parse the string to perform math.",
                code: `// Use a simple evaluation logic or a library
double result = evaluate(expression);
display.setText(String.valueOf(result));`
            }
        ],
        deepDiveSynopsis: `
### 🔧 Architecture & Design
This project introduces **Event-Driven Programming**.
- **The Event Loop**: Unlike the CLI, which pauses for input, a GUI runs on the "Event Dispatch Thread" (EDT).
- **Callback Pattern**: \`btn.setOnAction(e -> ...)\` is a Lambda Expression acting as a callback function.

### ⚠️ Technical Challenges
1.  **Blocking the UI**: If you calculate a massive factorial on the UI thread, the window freezes. (Fix: Use background threads).
2.  **Order of Operations**: Parsing "2 + 3 * 4" requires implementing BODMAS/PEMDAS logic, often using a Stack data structure or Expression Tree.

### 💼 Interview Relevance
- "What is the difference between AWT, Swing, and JavaFX?"
- "Why must UI updates happen on the main thread?"`
    },
    {
        id: 'library-man',
        title: 'Library Management',
        description: 'Track books, members, and due dates. Intro to file I/O and data persistence.',
        longDescription: 'A classic system to manage a library. Books can be issued to members and returned. The key feature here is Persistence: data must be saved to a CSV or binary file so it isn\'t lost when the program closes.',
        difficulty: 'Intermediate',
        tech: ['File I/O', 'Collections', 'Serialization', 'Dates'],
        icon: Server,
        steps: [
            {
                title: "Step 1: Book & Member Models",
                description: "Define the data structures.",
                code: `class Book implements Serializable {
    String isbn;
    String title;
    boolean isIssued;
}`
            },
            {
                title: "Step 2: File Persistence",
                description: "Write methods to save/load data from a file.",
                code: `public void save() throws IOException {
    try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("library.dat"))) {
        oos.writeObject(books);
    }
}`
            }
        ],
        deepDiveSynopsis: `
### 🔧 Architecture & Design
This project focuses on **Data Persistence** and **Serialization**.
- **Java Serialization**: The \`Serializable\` marker interface allows the JVM to convert an Object Graph into a Byte Stream.
- **File Systems**: Understanding relative vs. absolute paths when saving "library.dat".

### ⚠️ Technical Challenges
1.  **Version Compatibility**: If you change the \`Book\` class (add a field) after saving data, reading operation will fail with \`InvalidClassException\`. (Fix: Use \`serialVersionUID\`).
2.  **Concurrent Access**: What if two instances of the app try to write to the file at the same time? File locking is needed.

### 💼 Interview Relevance
- "How does \`transient\` keyword work?" (It prevents sensitive fields from being serialized).
- "JSON vs Binary Serialization?" (Binary is smaller/faster, JSON is readable/interoperable).`
    },
    {
        id: 'employee-api',
        title: 'Employee REST API',
        description: 'Create a backend service to Create, Read, Update, and Delete employee records.',
        longDescription: 'Introduction to Enterprise Java. You will build a backend API that a Frontend (React/Vue) or Mobile App could consume. We will use Spring Boot, which auto-configures 80% of the work for you.',
        difficulty: 'Intermediate',
        tech: ['Spring Boot', 'REST', 'Lombok', 'JPA'],
        icon: Globe,
        steps: [
            {
                title: "Step 1: The Entity",
                description: "Define the data model that maps to a Database Table.",
                code: `@Entity
public class Employee {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String role;
}`
            },
            {
                title: "Step 2: The Repository",
                description: "Create an interface to talk to the database (Magic!)",
                code: `// Spring automatically implements this!
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    // Methods like save(), findAll(), delete() are free
}`
            },
            {
                title: "Step 3: The Controller",
                description: "Expose HTTP Endpoints (GET, POST).",
                code: `@RestController
class EmployeeController {
    @PostMapping("/employees")
    Employee newEmployee(@RequestBody Employee newEmployee) {
        return repository.save(newEmployee);
    }
}`
            }
        ],
        deepDiveSynopsis: `
### 🔧 Architecture & Design
This is a standard **Three-Tier Architecture** (Controller -> Service -> Repository).
- **Inversion of Control (IoC)**: Spring manages the lifecycle of objects using the Dependency Injection pattern.
- **DTO Pattern**: Using Data Transfer Objects to decouple the internal Entity from the external API response.

### ⚠️ Technical Challenges
1.  **N+1 Select Problem**: Fetching a list of Employees and then fetching their Department in a loop leads to performance death.
2.  **Transaction Management**: Ensuring that if saving an Employee fails, any side effects (like audit logs) are rolled back (\`@Transactional\`).

### 💼 Interview Relevance
- "Explain the Bean Lifecycle in Spring."
- "What is the difference between \`@Controller\` and \`@RestController\`?"`
    },
    {
        id: 'ecommerce',
        title: 'E-Commerce Microservices',
        description: 'Scalable backend with Order, Product, and User services communicating via networking.',
        longDescription: 'A complex distributed system. Instead of one giant app (Monolith), you build small, independent services. If the "Order Service" crashes, the "Product Service" stays alive. This is how Netflix & Uber work.',
        difficulty: 'Advanced',
        tech: ['Microservices', 'Spring Cloud', 'Docker', 'Kafka'],
        icon: Database,
        steps: [
            {
                title: "Step 1: Service Discovery",
                description: "Setup a 'Eureka Server' so services can find each other's IP addresses.",
                code: `@EnableEurekaServer
@SpringBootApplication
public class ServiceRegistryApplication { ... }`
            },
            {
                title: "Step 2: Product Service",
                description: "A standalone REST API just for Products.",
                code: `@RestController
@RequestMapping("/products")
public class ProductController {
    @GetMapping("/{id}")
    public Product get(@PathVariable String id) { ... }
}`
            },
            {
                title: "Step 3: Feign Client",
                description: "How the Order Service talks to the Product Service.",
                code: `@FeignClient(name = "product-service")
public interface ProductClient {
    @GetMapping("/products/{id}")
    Product getLocation(@PathVariable("id") String id);
}`
            }
        ],
        deepDiveSynopsis: `
### 🔧 Architecture & Design
This project implements **Distributed Systems** patterns.
- **Service Discovery (Eureka)**: Services registers themselves so they don't need hardcoded IPs.
- **API Gateway**: A single entry point that routes requests to appropriate microservices.
- **Circuit Breaker**: Preventing cascading failures when one service is down.

### ⚠️ Technical Challenges
1.  **Distributed Transactions**: You can't use simple SQL transactions across different databases. You need patterns like **SAGA** or **Two-Phase Commit**.
2.  **Latency**: Every network call adds delay. Aggregating data from 3 services is slower than 1 monolith query.

### 💼 Interview Relevance
- "CAP Theorem?" (Consistency, Availability, Partition Tolerance - pick two).
- "How do you trace a request across microservices?" (Distributed Tracing with Zipkin/Sleuth IDs).`
    },
    {
        id: 'chat-app',
        title: 'Real-Time Chat App',
        description: 'Multi-user chat room using WebSockets for instant messaging.',
        longDescription: 'Standard HTTP is "Request-Response" (Client asks, Server answers). For Chat, we need the Server to PUSH messages to clients instantly. We use WebSockets & STOMP protocol.',
        difficulty: 'Advanced',
        tech: ['WebSockets', 'Multi-threading', 'Socket.io'],
        icon: Smartphone,
        steps: [
            {
                title: "Step 1: Configuration",
                description: "Enable the Message Broker.",
                code: `@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
    }
}`
            },
            {
                title: "Step 2: Message Handling",
                description: "Receive a message and broadcast it to everyone.",
                code: `@MessageMapping("/hello")
@SendTo("/topic/greetings")
public Greeting greeting(HelloMessage message) {
    return new Greeting("Hello, " + message.getName() + "!");
}`
            },
            {
                title: "Step 3: Client (JS)",
                description: "Connect to the socket from a browser.",
                code: `var socket = new SockJS('/gs-guide-websocket');
stompClient = Stomp.over(socket);
stompClient.connect({}, function (frame) {
    stompClient.subscribe('/topic/greetings', function (greeting) { ... });
});`
            }
        ],
        deepDiveSynopsis: `
### 🔧 Architecture & Design
This project uses **Full-Duplex Communication** via WebSockets.
- **STOMP Protocol**: Defines a format for messages (like HTTP headers but for sockets).
- **Pub/Sub Model**: The server doesn't send to "User A". It publishes to "/topic/chat", and anyone subscribed gets it.

### ⚠️ Technical Challenges
1.  **Connection Limits**: A server can only hold ~65k open TCP connections. For millions of users, you need specialized infrastructure (Redis/Kafka) to relay messages between server instances.
2.  **Heartbeats**: Detecting when a user silently disconnects (e.g., WiFi drops) using Ping/Pong frames.

### 💼 Interview Relevance
- "WebSockets vs Long Polling vs Server-Sent Events (SSE)?"
- "How do you scale a WebSocket server?" (Sticky Sessions or a Message Broker).`
    }
];
