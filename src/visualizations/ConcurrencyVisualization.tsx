import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, AlertTriangle, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

export const ConcurrencyVisualization: React.FC = () => {
    const [counter, setCounter] = useState(0);
    const [thread1Progress, setThread1Progress] = useState(0);
    const [thread2Progress, setThread2Progress] = useState(0);
    const [isRacing, setIsRacing] = useState(false);
    const [useLock, setUseLock] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const reset = () => {
        setCounter(0);
        setThread1Progress(0);
        setThread2Progress(0);
        setIsRacing(false);
        setLogs([]);
    };

    const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

    const runRace = async () => {
        if (isRacing) return;
        setIsRacing(true);
        reset();
        await new Promise(r => setTimeout(r, 500));

        // Simulate Thread 1
        const race1 = async () => {
            for (let i = 0; i < 5; i++) {
                // Random delay to simulate context switching
                await new Promise(r => setTimeout(r, Math.random() * 800 + 200));
                setThread1Progress(p => p + 20);

                if (useLock) {
                    // Atomic-ish update visualization
                    setCounter(c => c + 1);
                    addLog(`Thread 1: Incremented to ${counter + 1} (Locked)`);
                } else {
                    // Race condition simulation (state updates in React are batched, 
                    // so we simulate the "read-modify-write" gap visually)
                    setCounter(c => {
                        const newVal = c + 1;
                        addLog(`Thread 1: Read ${c}, Wrote ${newVal}`);
                        return newVal;
                    });
                }
            }
        };

        // Simulate Thread 2
        const race2 = async () => {
            for (let i = 0; i < 5; i++) {
                await new Promise(r => setTimeout(r, Math.random() * 800 + 200));
                setThread2Progress(p => p + 20);

                if (useLock) {
                    setCounter(c => c + 1);
                    addLog(`Thread 2: Incremented to ${counter + 1} (Locked)`);
                } else {
                    setCounter(c => {
                        const newVal = c + 1;
                        addLog(`Thread 2: Read ${c}, Wrote ${newVal}`);
                        return newVal;
                    });
                }
            }
        };

        await Promise.all([race1(), race2()]);
        setIsRacing(false);
        addLog("Race Finished.");
    };

    return (
        <div className="h-full flex flex-col p-6 bg-slate-950/50">
            <div className="flex justify-between items-center mb-8 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                    <button
                        onClick={runRace}
                        disabled={isRacing}
                        className="px-6 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center gap-2 font-bold shadow-lg shadow-red-900/20"
                    >
                        {isRacing ? "Racing..." : <><Play size={18} /> Start Race</>}
                    </button>
                    <button
                        onClick={() => setUseLock(!useLock)}
                        className={cn(
                            "px-4 py-2 rounded-lg font-mono text-sm border transition-all flex items-center gap-2",
                            useLock ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-800 border-slate-600 text-slate-400"
                        )}
                    >
                        <Lock size={16} />
                        {useLock ? "Synchronized (Safe)" : "Unsynchronized (Unsafe)"}
                    </button>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-500 uppercase font-bold">Shared Counter</div>
                    <div className={cn("text-2xl font-mono font-bold", counter === 10 ? "text-emerald-400" : "text-amber-400")}>
                        {counter} / 10
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-8">
                {/* Race Track */}
                <div className="flex-1 bg-slate-900/30 rounded-xl border border-white/5 p-8 flex flex-col justify-center gap-12 relative">

                    {/* Thread 1 Lane */}
                    <div className="relative">
                        <div className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-2">Thread 1 <div className="text-[10px] bg-blue-900 px-1 rounded text-blue-200">RUNNING</div></div>
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${thread1Progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Shared Memory Visual */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-slate-950 rounded-full border-4 border-dashed border-slate-700 flex flex-col items-center justify-center z-10">
                        <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Heap Memory</div>
                        <div className="text-3xl font-mono text-white">{counter}</div>
                        {!useLock && isRacing && <AlertTriangle size={24} className="text-red-500 animate-pulse absolute -top-4 -right-4" />}
                        {useLock && <Lock size={20} className="text-emerald-500 absolute -top-2 -right-2" />}
                    </div>

                    {/* Thread 2 Lane */}
                    <div className="relative">
                        <div className="text-xs font-bold text-purple-400 mb-2 flex items-center gap-2">Thread 2 <div className="text-[10px] bg-purple-900 px-1 rounded text-purple-200">RUNNING</div></div>
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${thread2Progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Logs */}
                <div className="w-64 bg-black rounded-xl border border-white/10 p-4 font-mono text-xs overflow-hidden">
                    <div className="text-slate-500 mb-2 border-b border-white/10 pb-1">Thread Logs</div>
                    <div className="space-y-2">
                        <AnimatePresence mode='popLayout'>
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-slate-300 border-l-2 border-slate-800 pl-2"
                                >
                                    {log}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {logs.length === 0 && <span className="text-slate-700 italic">Waiting...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};
