import React, { useState, useRef } from 'react';
import { Play, RotateCcw, Terminal, AlertCircle, Copy, Book, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';


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
        name: "Variables",
        code: `public class Main {
  public static void main(String[] args) {
    int age = 25;
    String name = "Alice";
    
    System.out.println("User: " + name);
    System.out.println("Age: " + age);
  }
}`
    },
    {
        name: "Loop Example",
        code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Counting...");
    
    // Simulate a loop
    System.out.println("1");
    System.out.println("2");
    System.out.println("3");
    
    System.out.println("Blast off!");
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

    const runCode = () => {
        setIsRunning(true);
        setOutput([]);
        setError(null);

        // Simulate "Compilation" delay
        setTimeout(() => {
            try {
                const logs: string[] = [];

                // Very basic "Mock" Java Parser
                // It mainly looks for System.out.println
                const lines = code.split('\n');

                // Check for class definition
                if (!code.includes('public class Main')) {
                    throw new Error("Error: Could not find or load main class Main");
                }

                if (!code.includes('public static void main')) {
                    throw new Error("Error: Main method not found in class Main");
                }

                // Variable store for VERY basic partial evaluation
                const variables: Record<string, string | number> = {};

                lines.forEach(line => {
                    const trimmed = line.trim();

                    // Capture int variables: int x = 10;
                    const intMatch = trimmed.match(/int\s+(\w+)\s*=\s*(\d+);/);
                    if (intMatch) {
                        variables[intMatch[1]] = parseInt(intMatch[2]);
                    }

                    // Capture String variables: String s = "text";
                    const strMatch = trimmed.match(/String\s+(\w+)\s*=\s*"(.*)";/);
                    if (strMatch) {
                        variables[strMatch[1]] = strMatch[2];
                    }

                    // Capture System.out.println("text");
                    const printMatch = trimmed.match(/System\.out\.println\((.*)\);/);
                    if (printMatch) {
                        let content = printMatch[1];

                        // Handle simple concatenation: "Age: " + age
                        // LIMITATION: This is a hacky regex parser, not a real language runtime.
                        const parts = content.split('+').map(p => p.trim());
                        const evaluatedParts = parts.map(p => {
                            if (p.startsWith('"') && p.endsWith('"')) {
                                return p.slice(1, -1);
                            }
                            // Check if variable exists
                            if (variables[p] !== undefined) {
                                return variables[p];
                            }
                            return p; // Return literal if unknown
                        });

                        logs.push(evaluatedParts.join(''));
                    }
                });

                if (logs.length === 0) {
                    logs.push("Program finished with no output.");
                }

                setOutput(logs);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error occurred");
                }
            } finally {
                setIsRunning(false);
            }
        }, 800);
    };

    // Generate line numbers
    const lineNumbers = code.split('\n').map((_, i) => i + 1);

    return (
        <div className="h-[calc(100vh-6rem)] flex gap-4 animate-in fade-in zoom-in-95 duration-500 overflow-hidden">

            {/* Snippets Sidebar */}
            <div className={cn(
                "w-64 flex flex-col bg-[#1e1e1e] rounded-xl border border-white/10 shadow-xl transition-all duration-300",
                !isSidebarOpen && "w-0 opacity-0 overflow-hidden border-0"
            )}>
                <div className="p-4 border-b border-white/5 font-bold text-slate-300 flex items-center gap-2">
                    <Book size={16} /> Snippets
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

