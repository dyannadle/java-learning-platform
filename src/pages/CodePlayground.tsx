import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Terminal, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const CodePlayground: React.FC = () => {
    const [code, setCode] = useState<string>(`public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
    System.out.println("Coding is fun.");
    
    int age = 25;
    System.out.println("Age: " + age);
  }
}`);

    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col lg:flex-row gap-6 animate-in fade-in zoom-in-95 duration-500">

            {/* Editor Section */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-2 text-xs text-slate-400 font-mono">Main.java</span>
                    </div>
                    <button
                        onClick={runCode}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-semibold disabled:opacity-50 transition-colors"
                    >
                        {isRunning ? (
                            <>Compiling...</>
                        ) : (
                            <><Play size={12} fill="currentColor" /> Run Code</>
                        )}
                    </button>
                </div>

                <div className="flex-1 relative font-mono text-sm leading-relaxed">
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] p-4 resize-none focus:outline-none scrollbar-thin scrollbar-thumb-[#424242]"
                        spellCheck={false}
                    />
                </div>
            </div>

            {/* Output Console */}
            <div className="lg:w-1/3 flex flex-col bg-black rounded-xl border border-white/10 overflow-hidden shadow-2xl">
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
                        <div key={i} className="text-slate-300">
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
    );
};
