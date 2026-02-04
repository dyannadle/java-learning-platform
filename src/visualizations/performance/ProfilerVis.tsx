import React, { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, AlertTriangle } from 'lucide-react';

export const ProfilerVis: React.FC = () => {
    const [cpu, setCpu] = useState<number[]>([10, 12, 11, 15, 12]);
    const [memory, setMemory] = useState<number[]>([20, 22, 25, 23, 26]);
    const [status, setStatus] = useState<'NORMAL' | 'LEAK' | 'CPU_SPIKE'>('NORMAL');

    // Simulation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(prev => {
                let next = status === 'CPU_SPIKE' ? 95 + Math.random() * 5 : 10 + Math.random() * 10;
                return [...prev.slice(-20), next];
            });

            setMemory(prev => {
                const last = prev[prev.length - 1];
                let next = last;
                if (status === 'LEAK') next += 5; // Steady growth
                else if (status === 'NORMAL') next = 20 + Math.random() * 10;

                if (next > 100) next = 100; // Cap
                return [...prev.slice(-20), next];
            });
        }, 500);

        return () => clearInterval(interval);
    }, [status]);

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="text-orange-400" /> Java VisualVM Simulator
            </h3>

            {/* Controls */}
            <div className="flex gap-4 mb-8 justify-center">
                <button
                    onClick={() => setStatus('NORMAL')}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-sm font-bold"
                >
                    <CheckCircle size={14} className="text-green-400" /> Reset
                </button>
                <button
                    onClick={() => setStatus('LEAK')}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-sm font-bold"
                >
                    <AlertTriangle size={14} className="text-yellow-400" /> Simulate Memory Leak
                </button>
                <button
                    onClick={() => setStatus('CPU_SPIKE')}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-sm font-bold"
                >
                    <Cpu size={14} className="text-red-400" /> Simulate Infinite Loop
                </button>
            </div>

            {/* Graphs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* CPU Graph */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-slate-400 flex items-center gap-2"><Cpu size={14} /> CPU Usage</span>
                        <span className={`text-xl font-mono font-bold ${cpu[cpu.length - 1] > 80 ? 'text-red-500' : 'text-blue-500'}`}>
                            {cpu[cpu.length - 1].toFixed(1)}%
                        </span>
                    </div>
                    <div className="flex items-end h-32 gap-1">
                        {cpu.map((val, i) => (
                            <div key={i} style={{ height: `${val}%` }} className={`flex-1 rounded-t ${val > 80 ? 'bg-red-500' : 'bg-blue-500'} transition-all duration-300`}></div>
                        ))}
                    </div>
                </div>

                {/* Memory Graph */}
                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-bold text-slate-400 flex items-center gap-2"><HardDrive size={14} /> Heap Memory</span>
                        <span className={`text-xl font-mono font-bold ${memory[memory.length - 1] > 80 ? 'text-red-500' : 'text-green-500'}`}>
                            {memory[memory.length - 1].toFixed(1)}MB
                        </span>
                    </div>
                    <div className="flex items-end h-32 gap-1 border-b border-slate-700 relative">
                        {/* Threshold Line */}
                        <div className="absolute top-[20%] left-0 right-0 border-t border-dashed border-red-900 z-0"></div>

                        {memory.map((val, i) => (
                            <div key={i} style={{ height: `${val}%` }} className={`flex-1 rounded-t ${val > 80 ? 'bg-red-500' : 'bg-green-500'} transition-all duration-300 z-10`}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Analysis Panel */}
            <div className="mt-6 bg-slate-800 p-4 rounded-lg border border-slate-600">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Live Thread Analysis</h4>
                <div className="font-mono text-xs space-y-2">
                    {status === 'NORMAL' && (
                        <div className="text-green-400">All threads running normally. Idle time: 90%.</div>
                    )}
                    {status === 'LEAK' && (
                        <div className="text-yellow-300">
                            WARNING: Heap usage growing steadily.<br />
                            Culprit: <span className="text-white bg-red-900/50 px-1">static List&lt;BigObject&gt; cache</span> is never cleared.
                        </div>
                    )}
                    {status === 'CPU_SPIKE' && (
                        <div className="text-red-400">
                            CRITICAL: CPU at 100%.<br />
                            Culprit: Thread-1 stuck in <span className="text-white bg-red-900/50 px-1">ProcessingService.complexCalc()</span> (Line 42).
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper for Lucide icon
import { CheckCircle } from 'lucide-react';
