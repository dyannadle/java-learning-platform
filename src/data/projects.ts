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
    description: string;
    longDescription: string;
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
    }
];
