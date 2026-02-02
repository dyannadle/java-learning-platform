import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCcw, Scissors } from 'lucide-react';
import { cn } from '../lib/utils';

// Data item representing a number in the stream
interface StreamItem {
    id: number;
    value: number;
    status: 'pending' | 'filtered' | 'mapped' | 'collected';
    color: string;
}

export const StreamVisualization: React.FC = () => {
    const [stream, setStream] = useState<StreamItem[]>([]);
    const [step, setStep] = useState(0); // 0: Init, 1: Filter, 2: Map, 3: Collect
    const [isAnimating, setIsAnimating] = useState(false);

    // Initial Data
    const generateData = () => {
        return Array.from({ length: 6 }, (_, i) => ({
            id: Date.now() + i,
            value: Math.floor(Math.random() * 10) + 1, // 1-10
            status: 'pending' as const,
            color: 'bg-slate-500'
        }));
    };

    const reset = () => {
        setStream(generateData());
        setStep(0);
        setIsAnimating(false);
    };

    useEffect(() => {
        reset();
    }, []);

    const runSimulation = async () => {
        if (isAnimating || step === 3) return;
        setIsAnimating(true);

        const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

        if (step === 0) {
            // FILTER: Keep even numbers
            // Animate check
            for (let i = 0; i < stream.length; i++) {
                setStream(prev => prev.map((item, idx) =>
                    idx === i ? { ...item, color: 'bg-blue-500' } : item // Highlight current
                ));
                await delay(600);

                if (stream[i].value % 2 !== 0) {
                    // Filter out odd
                    setStream(prev => prev.map((item, idx) =>
                        idx === i ? { ...item, status: 'filtered', color: 'bg-red-900/50 opacity-20' } : item
                    ));
                } else {
                    // Keep even
                    setStream(prev => prev.map((item, idx) =>
                        idx === i ? { ...item, color: 'bg-emerald-500' } : item
                    ));
                }
                await delay(400);
            }
            setStep(1);
        } else if (step === 1) {
            // MAP: Double the value (x * 2)
            const activeIndices = stream.map((item, i) => item.status !== 'filtered' ? i : -1).filter(i => i !== -1);

            for (let i of activeIndices) {
                setStream(prev => prev.map((item, idx) =>
                    idx === i ? { ...item, color: 'bg-yellow-500', value: item.value * 2, status: 'mapped' } : item
                ));
                await delay(800);
            }
            setStep(2);
        } else if (step === 2) {
            // COLLECT: Sum or List
            // Just mark all as collected
            setStream(prev => prev.map(item =>
                item.status === 'mapped' ? { ...item, status: 'collected', color: 'bg-purple-500' } : item
            ));
            await delay(1000);
            setStep(3);
        }

        setIsAnimating(false);
    };

    // Helper to get code snippet based on step
    const getCode = () => {
        return (
            <div className="font-mono text-xs">
                <div className={cn("p-1", step === 0 && isAnimating && "bg-blue-900/20 text-blue-200")}>
                    List&lt;Integer&gt; numbers = ...;
                </div>
                <div className={cn("pl-4 p-1", step === 0 && !isAnimating && "text-slate-500")}>
                    numbers.stream()
                </div>
                <div className={cn("pl-8 p-1 transition-colors", step === 0 && isAnimating && "bg-blue-500/20 text-white font-bold")}>
                    .filter(n -&gt; n % 2 == 0) <span className="text-slate-500">// Keep evens</span>
                </div>
                <div className={cn("pl-8 p-1 transition-colors", step === 1 && "bg-yellow-500/20 text-yellow-200 font-bold")}>
                    .map(n -&gt; n * 2) <span className="text-slate-500">// Double it</span>
                </div>
                <div className={cn("pl-8 p-1 transition-colors", step >= 2 && "bg-purple-500/20 text-purple-200 font-bold")}>
                    .collect(Collectors.toList());
                </div>
            </div>
        );
    };

    return (
        <div className="h-full flex flex-col p-6 bg-slate-950/50">
            {/* Controls */}
            <div className="flex justify-between items-center mb-8 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                    <button
                        onClick={runSimulation}
                        disabled={isAnimating || step === 3}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 font-bold shadow-lg shadow-blue-900/20"
                    >
                        {isAnimating ? "Processing..." : step === 3 ? "Finished" : <><Play size={18} /> Next Step</>}
                    </button>
                    <button onClick={reset} disabled={isAnimating} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 disabled:opacity-50">
                        <RefreshCcw size={18} />
                    </button>
                </div>
                <div className="text-sm font-mono text-slate-400">
                    Step: <span className="text-white">{step === 0 ? "Filter" : step === 1 ? "Map" : step === 2 ? "Collect" : "Done"}</span>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-8">
                {/* Visualization Area */}
                <div className="flex-1 bg-slate-900/30 rounded-xl border border-white/5 p-8 flex items-center justify-around relative overflow-hidden">
                    {/* Pipe Graphic Background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <div className="w-[120%] h-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-3xl"></div>
                    </div>

                    <AnimatePresence>
                        {stream.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{
                                    scale: item.status === 'filtered' ? 0.5 : 1,
                                    opacity: 1,
                                    y: item.status === 'filtered' ? 100 : 0
                                }}
                                className={cn(
                                    "w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl transition-colors duration-500 z-10",
                                    item.color
                                )}
                            >
                                {item.value}
                                {item.status === 'filtered' && (
                                    <div className="absolute inset-0 flex items-center justify-center text-red-500/80">
                                        <Scissors size={24} />
                                    </div>
                                )}
                                {item.status === 'mapped' && (
                                    <motion.div
                                        initial={{ scale: 2, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 0 }}
                                        className="absolute inset-0 border-2 border-white rounded-full"
                                    />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Code Block */}
                <div className="bg-slate-950 rounded-xl border border-white/10 p-4 relative">
                    <div className="absolute top-0 right-0 p-2 bg-slate-900 rounded-bl-lg text-[10px] text-slate-500">Pipeline Definition</div>
                    {getCode()}
                </div>
            </div>
        </div>
    );
};
