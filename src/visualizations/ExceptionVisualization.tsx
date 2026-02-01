import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Bug } from 'lucide-react';
import { cn } from '../lib/utils';

interface StackFrame {
    id: string;
    name: string;
    status: 'normal' | 'running' | 'error' | 'caught';
}

export const ExceptionVisualization: React.FC = () => {
    const [stack, setStack] = useState<StackFrame[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState("Ready to run code.");

    const reset = () => {
        setStack([]);
        setIsRunning(false);
        setMessage("Ready.");
    };

    const runSimulation = async () => {
        if (isRunning) return;
        setIsRunning(true);
        reset();

        // 1. Main Method
        setMessage("Step 1: main() method starts.");
        setStack([{ id: 'main', name: 'main()', status: 'running' }]);
        await wait(1000);

        // 2. Service Call
        setMessage("Step 2: main() calls processData()");
        setStack(prev => [
            { id: 'service', name: 'processData()', status: 'running' },
            ...prev.map(s => ({ ...s, status: 'normal' } as StackFrame))
        ]);
        await wait(1000);

        // 3. Database Call
        setMessage("Step 3: processData() calls databaseQuery()");
        setStack(prev => [
            { id: 'db', name: 'databaseQuery()', status: 'running' },
            ...prev.map(s => ({ ...s, status: 'normal' } as StackFrame))
        ]);
        await wait(1000);

        // 4. ERROR OCCURS
        setMessage("Step 4: CRASH! Database connection failed!");
        setStack(prev => prev.map(s => s.id === 'db' ? { ...s, status: 'error' } : s));
        await wait(1500);


        // 5. Bubbling Up
        setMessage("Step 5: Error bubbles up to processData(). No catch block found.");
        setStack(prev => prev.filter(s => s.id !== 'db')); // Pop db
        // Flash error on service
        setStack(prev => prev.map(s => s.id === 'service' ? { ...s, status: 'error' } : s));
        await wait(1500);

        // 6. Main Catch
        setMessage("Step 6: Error bubbles to main(). CATCH block found!");
        setStack(prev => prev.filter(s => s.id !== 'service')); // Pop service
        setStack(prev => prev.map(s => s.id === 'main' ? { ...s, status: 'caught' } : s));
        await wait(1000);

        setMessage("Step 7: Exception handled gracefully. Program continues.");
        setIsRunning(false);
    };

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <div className="h-full flex flex-col p-6 bg-slate-950/50">
            <div className="flex justify-between items-center mb-6 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-1">System Status</h3>
                    <div className="font-mono text-emerald-400 text-sm h-6 flex items-center gap-2">
                        {message}
                    </div>
                </div>
                <button
                    onClick={runSimulation}
                    disabled={isRunning}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 font-bold shadow-lg shadow-red-900/20"
                >
                    {isRunning ? "Running..." : <><Bug size={18} /> Trigger Error</>}
                </button>
            </div>

            <div className="flex-1 flex gap-8">
                {/* Call Stack Visualization */}
                <div className="flex-1 flex flex-col justify-end relative bg-slate-900/30 rounded-xl border-x border-b border-white/10 p-8">
                    <div className="absolute top-4 left-0 w-full text-center text-slate-600 text-xs font-bold tracking-[0.2em] uppercase">Call Stack Memory</div>

                    <div className="flex flex-col-reverse gap-2 w-2/3 mx-auto">
                        <AnimatePresence mode='popLayout'>
                            {stack.map((frame) => (
                                <motion.div
                                    key={frame.id}
                                    layout
                                    initial={{ opacity: 0, y: -50, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        backgroundColor: frame.status === 'error' ? 'rgba(239, 68, 68, 0.2)' :
                                            frame.status === 'caught' ? 'rgba(16, 185, 129, 0.2)' :
                                                frame.status === 'running' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 41, 59, 0.5)'
                                    }}
                                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                                    className={cn(
                                        "p-4 rounded-lg border-2 flex items-center justify-between shadow-lg backdrop-blur-sm",
                                        frame.status === 'error' ? "border-red-500 text-red-200" :
                                            frame.status === 'caught' ? "border-emerald-500 text-emerald-200" :
                                                frame.status === 'running' ? "border-blue-500 text-blue-200" : "border-slate-700 text-slate-400"
                                    )}
                                >
                                    <span className="font-mono font-bold">{frame.name}</span>
                                    {frame.status === 'error' && <AlertTriangle size={20} className="text-red-500 animate-pulse" />}
                                    {frame.status === 'caught' && <ShieldCheck size={20} className="text-emerald-500" />}
                                    {frame.status === 'running' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {stack.length === 0 && (
                            <div className="text-center text-slate-700 italic py-10">Stack is empty</div>
                        )}
                    </div>
                </div>

                {/* Code Preview */}
                <div className="w-80 bg-slate-950 rounded-xl border border-white/10 p-4 font-mono text-xs text-slate-400 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-2 bg-slate-900 rounded-bl-lg text-[10px] text-slate-500">Source Code</div>
                    <pre className="space-y-1">
                        <div className={cn("p-1 rounded", stack.some(s => s.id === 'main') && "bg-blue-900/20 text-blue-200")}>
                            <span className="text-purple-400">void</span> <span className="text-yellow-200">main</span>() {'{'}
                        </div>
                        <div className={cn("pl-4 p-1 rounded", stack.some(s => s.id === 'main' && s.status === 'running') && "bg-blue-900/20 text-blue-200")}>
                            <span className="text-purple-400">try</span> {'{'} <br />
                            &nbsp;&nbsp;processData(); <br />
                            {'}'} <span className="text-purple-400">catch</span> (Error e) {'{'}
                        </div>
                        <div className={cn("pl-8 p-1 rounded", stack.some(s => s.id === 'main' && s.status === 'caught') && "bg-emerald-900/30 text-emerald-200 font-bold")}>
               // Error Caught Here! <br />
                            recover();
                        </div>
                        <div className="pl-4">{'}'}</div>
                        <div>{'}'}</div>
                        <br />

                        <div className={cn("p-1 rounded", stack.some(s => s.id === 'service') && "bg-blue-900/20 text-blue-200")}>
                            <span className="text-purple-400">void</span> <span className="text-yellow-200">processData</span>() {'{'}
                        </div>
                        <div className={cn("pl-4 p-1 rounded", stack.some(s => s.id === 'service' && s.status === 'running') && "bg-blue-900/20 text-blue-200")}>
                            databaseQuery(); <span className="text-slate-600">// No catch here</span>
                        </div>
                        <div className={cn("pl-4 p-1 rounded transition-colors duration-300",
                            stack.some(s => s.id === 'service' && s.status === 'error') && "bg-red-900/30 text-red-200"
                        )}>
                            <span className="opacity-0">.</span> {/* Spacer for error flash */}
                        </div>
                        <div>{'}'}</div>
                        <br />

                        <div className={cn("p-1 rounded", stack.some(s => s.id === 'db') && "bg-blue-900/20 text-blue-200")}>
                            <span className="text-purple-400">void</span> <span className="text-yellow-200">databaseQuery</span>() {'{'}
                        </div>
                        <div className={cn("pl-4 p-1 rounded", stack.some(s => s.id === 'db' && s.status === 'error') && "bg-red-900/20 text-red-200 font-bold")}>
                            <span className="text-purple-400">throw new</span> <span className="text-red-400">Error</span>();
                        </div>
                        <div>{'}'}</div>
                    </pre>
                </div>
            </div>
        </div>
    );
};
