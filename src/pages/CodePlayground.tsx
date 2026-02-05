import React, { useState, useRef } from 'react';
import { Play, RotateCcw, Terminal, AlertCircle, Copy, Book, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { executeCode } from '../lib/piston';

const SNIPPETS = [
    {
        name: "Hello World",
        code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
    System.out.println("Coding is fun.");
  }
}`
    },
    {
        name: "Variables & Types",
        code: `public class Main {
  public static void main(String[] args) {
    int age = 25;
    String name = "Alice";
    double score = 95.5;
    boolean isStudent = true;
    
    System.out.println("User: " + name);
    System.out.println("Age: " + age);
  }
}`
    },
    {
        name: "Loops (For/While)",
        code: `public class Main {
  public static void main(String[] args) {
    System.out.println("--- For Loop ---");
    for (int i = 1; i <= 3; i++) {
        System.out.println("Count: " + i);
    }
    
    System.out.println("\\n--- While Loop ---");
    int j = 0;
    while (j < 3) {
        System.out.println("While: " + j);
        j++;
    }
  }
}`
    },
    {
        name: "HashMap Demo",
        code: `import java.util.HashMap;

public class Main {
  public static void main(String[] args) {
    HashMap<String, Integer> scores = new HashMap<>();
    
    scores.put("Alice", 90);
    scores.put("Bob", 85);
    
    System.out.println("Bob's Score: " + scores.get("Bob"));
    
    // Iterate
    scores.forEach((key, value) -> {
        System.out.println(key + ": " + value);
    });
  }
}`
    },
    {
        name: "Streams API",
        code: `import java.util.List;
import java.util.stream.Collectors;

public class Main {
  public static void main(String[] args) {
    List<String> names = List.of("Alice", "Bob", "Charlie", "David");
    
    List<String> filtered = names.stream()
        .filter(n -> n.length() > 3) // Only long names
        .map(String::toUpperCase)    // Make UPPERCASE
        .collect(Collectors.toList());
        
    System.out.println(filtered);
  }
}`
    },
    {
        name: "Threads",
        code: `public class Main {
  public static void main(String[] args) {
    Thread t = new Thread(() -> {
        System.out.println("Running in a thread!");
    });
    
    t.start();
    System.out.println("Main thread finished.");
  }
}`
    }
];

export const CodePlayground: React.FC = () => {
    const [code, setCode] = useState<string>(SNIPPETS[0].code);
    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resetCode = () => setCode(SNIPPETS[0].code);

    const runCode = async () => {
        setIsRunning(true);
        setOutput([]);
        setError(null);

        try {
            const result = await executeCode('java', '15.0.2', code);

            if (result.run.code !== 0) {
                // Runtime or Compilation Error
                setError("Execution failed");
                setOutput(result.run.stderr.split('\\n'));
            } else {
                // Success
                setOutput(result.run.stdout.split('\\n'));
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to execute code. Please check your internet connection.");
            }
        } finally {
            setIsRunning(false);
        }
    };

    // Generate line numbers
    const lineNumbers = code.split('\\n').map((_, i) => i + 1);

    return (
        <div className="h-[calc(100vh-6rem)] flex gap-4 animate-in fade-in zoom-in-95 duration-500 overflow-hidden">

            {/* Snippets Sidebar */}
            <div className={cn(
                "w-64 flex flex-col bg-[#1e1e1e] rounded-xl border border-white/10 shadow-xl transition-all duration-300",
                !isSidebarOpen && "w-0 opacity-0 overflow-hidden border-0"
            )}>
                <div className="p-4 border-b border-white/5 font-bold text-slate-300 flex items-center justify-between">
                    <div className="flex items-center gap-2"><Book size={16} /> Snippets</div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {SNIPPETS.map((snippet, i) => (
                        <button
                            key={i}
                            onClick={() => setCode(snippet.code)}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors group flex items-center justify-between"
                        >
                            <span>{snippet.name}</span>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4 min-w-0">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-2">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold hover:text-white transition-colors"
                    >
                        {isSidebarOpen ? "Hide Library" : "Show Library"}
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={runCode}
                            disabled={isRunning}
                            className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold disabled:opacity-50 shadow-lg shadow-green-900/20 transition-all active:scale-95"
                        >
                            {isRunning ? (
                                <>Compiling...</>
                            ) : (
                                <><Play size={14} fill="currentColor" /> Run Code</>
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
                    {/* Editor Section */}
                    <div className="flex-1 flex flex-col bg-[#1e1e1e] rounded-xl border border-white/10 overflow-hidden shadow-2xl relative group">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <span className="ml-2 text-xs text-slate-400 font-mono">Main.java</span>
                            </div>
                            <button
                                onClick={resetCode}
                                className="text-xs text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors mr-3"
                            >
                                <RotateCcw size={12} /> Reset
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(code)}
                                className="text-xs text-slate-500 hover:text-white flex items-center gap-1 transition-colors"
                            >
                                <Copy size={12} /> Copy
                            </button>
                        </div>

                        <div className="flex-1 relative font-mono text-sm leading-6 flex overflow-hidden">
                            {/* Line Numbers */}
                            <div className="w-10 bg-[#1e1e1e] text-slate-600 text-right pr-3 pt-4 select-none border-r border-white/5">
                                {lineNumbers.map(n => (
                                    <div key={n}>{n}</div>
                                ))}
                            </div>

                            {/* Text Area */}
                            <textarea
                                ref={textareaRef}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="flex-1 h-full bg-[#1e1e1e] text-[#d4d4d4] p-4 resize-none focus:outline-none scrollbar-thin scrollbar-thumb-[#424242] whitespace-pre"
                                spellCheck={false}
                            />
                        </div>
                    </div>

                    {/* Output Console */}
                    <div className="lg:w-1/3 flex flex-col bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl h-1/2 lg:h-auto">
                        <div className="px-4 py-2 bg-slate-900 border-b border-white/5 flex items-center justify-between">
                            <span className="text-xs text-slate-400 font-mono flex items-center gap-2">
                                <Terminal size={12} /> Terminal Output
                            </span>
                            <button
                                onClick={() => { setOutput([]); setError(null); }}
                                className="text-slate-500 hover:text-white transition-colors"
                                title="Clear Console"
                            >
                                <RotateCcw size={12} />
                            </button>
                        </div>

                        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto font-medium">
                            {isRunning && (
                                <div className="text-blue-400 animate-pulse">
                                    Compiling Main.java...
                                </div>
                            )}

                            {error && (
                                <div className="text-red-400 flex items-start gap-2 mt-2">
                                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {!isRunning && !error && output.map((line, i) => (
                                <div key={i} className="text-slate-300 border-b border-white/5 pb-1 mb-1 last:border-0">
                                    {line}
                                </div>
                            ))}

                            {!isRunning && !error && output.length === 0 && (
                                <div className="text-slate-600 italic">
                                    Click "Run Code" to see output...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

