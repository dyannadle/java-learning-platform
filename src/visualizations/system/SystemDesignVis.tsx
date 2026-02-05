import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, User, Database, ArrowRight, Shield, Layers, TrendingUp } from 'lucide-react';

export const SystemDesignVis: React.FC = () => {
    const [mode, setMode] = useState<'monolith' | 'vertical' | 'horizontal'>('monolith');
    const [requests, setRequests] = useState<number[]>([]);

    // Simulate incoming traffic
    useEffect(() => {
        const interval = setInterval(() => {
            setRequests(prev => [...prev.slice(-4), Date.now()]);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 bg-slate-900 rounded-xl border border-blue-500/20 shadow-2xl space-y-8">
            {/* Mode Selection */}
            <div className="flex gap-4 justify-center">
                <button
                    onClick={() => setMode('monolith')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'monolith' ? 'bg-red-500/20 text-red-400 border border-red-500' : 'bg-slate-800 text-slate-400'}`}
                >
                    1. Single Server
                </button>
                <button
                    onClick={() => setMode('vertical')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'vertical' ? 'bg-orange-500/20 text-orange-400 border border-orange-500' : 'bg-slate-800 text-slate-400'}`}
                >
                    2. Vertical Scaling
                </button>
                <button
                    onClick={() => setMode('horizontal')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'horizontal' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500' : 'bg-slate-800 text-slate-400'}`}
                >
                    3. Horizontal Scaling
                </button>
            </div>

            {/* Visualization Area */}
            <div className="h-64 relative bg-black/20 rounded-xl border border-white/5 flex items-center justify-between px-10 overflow-hidden">

                {/* Users (Traffic Source) */}
                <div className="flex flex-col gap-2 items-center z-10">
                    <div className="flex -space-x-2">
                        <User size={24} className="text-blue-400" />
                        <User size={24} className="text-blue-400" />
                        <User size={24} className="text-blue-400" />
                    </div>
                    <span className="text-xs text-blue-300 font-mono">Traffic</span>
                    {/* Animated Packets */}
                    {requests.map(r => (
                        <motion.div
                            key={r}
                            initial={{ x: 0, opacity: 1 }}
                            animate={{ x: 200, opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute left-20 top-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                        />
                    ))}
                </div>

                {/* Load Balancer (Only for Horizontal) */}
                <AnimatePresence>
                    {mode === 'horizontal' && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="flex flex-col items-center gap-2 z-10"
                        >
                            <div className="p-3 bg-purple-500/20 border border-purple-500 rounded-lg text-purple-400">
                                <Shield size={32} />
                            </div>
                            <span className="text-xs text-purple-300">Load Balancer</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Servers */}
                <div className="flex flex-col justify-center gap-4 z-10">
                    <AnimatePresence mode='wait'>
                        {/* Case 1: Monolith */}
                        {mode === 'monolith' && (
                            <motion.div
                                key="mono"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 relative">
                                    <Server size={32} />
                                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-1.5 rounded-full animate-pulse">99% CPU</div>
                                </div>
                                <span className="text-xs text-red-300">Small Server</span>
                            </motion.div>
                        )}

                        {/* Case 2: Vertical */}
                        {mode === 'vertical' && (
                            <motion.div
                                key="vert"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="p-6 bg-orange-500/10 border border-orange-500/50 rounded-xl text-orange-400 relative">
                                    <Server size={64} />
                                    <div className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] px-1.5 rounded-full">40% CPU</div>
                                </div>
                                <span className="text-xs text-orange-300">Super Computer (Expensive!)</span>
                            </motion.div>
                        )}

                        {/* Case 3: Horizontal */}
                        {mode === 'horizontal' && (
                            <motion.div
                                key="horiz"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {[1, 2, 3, 4].map(i => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-2 bg-emerald-500/10 border border-emerald-500/50 rounded text-emerald-400 flex flex-col items-center"
                                    >
                                        <Server size={20} />
                                        <span className="text-[10px]">Server {i}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Database */}
                <div className="flex flex-col items-center gap-2 z-10 opacity-50">
                    <Database size={32} className="text-slate-400" />
                    <span className="text-xs text-slate-500">DB</span>
                </div>

            </div>

            {/* Explanation Logic */}
            <div className="bg-slate-950 p-4 rounded-lg border border-white/5 text-sm text-slate-300">
                {mode === 'monolith' && (
                    <p>
                        <strong className="text-red-400">Single Server:</strong> Easy to start, but hits a limit. As traffic grows, CPU spikes to 100%, causing crashes. It is a Single Point of Failure (SPOF).
                    </p>
                )}
                {mode === 'vertical' && (
                    <p>
                        <strong className="text-orange-400">Vertical Scaling (Scale Up):</strong> Buying a bigger, faster computer (more RAM, better CPU).
                        <br /><span className="text-xs text-slate-500">Pros: No code changes. Cons: Very expensive, eventually you hit a hardware limit.</span>
                    </p>
                )}
                {mode === 'horizontal' && (
                    <p>
                        <strong className="text-emerald-400">Horizontal Scaling (Scale Out):</strong> Adding more cheap servers. Requires a <strong>Load Balancer</strong> to distribute traffic.
                        <br /><span className="text-xs text-slate-500">Pros: Infinite scaling. Fault verification (if one dies, others take over). Cons: Complex to manage.</span>
                    </p>
                )}
            </div>
        </div>
    );
};
