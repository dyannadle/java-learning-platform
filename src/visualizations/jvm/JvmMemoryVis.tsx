import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, RefreshCw, Box } from 'lucide-react';

interface JavaObject {
    id: number;
    age: number; // GC Age
    location: 'eden' | 's0' | 's1' | 'old' | 'dead';
    size: number;
}

export const JvmMemoryVis: React.FC = () => {
    const [objects, setObjects] = useState<JavaObject[]>([]);
    const [stats, setStats] = useState({ eden: 0, s0: 0, s1: 0, old: 0 });
    const [gcLog, setGcLog] = useState<string[]>([]);

    // Helper to calculate stats
    useEffect(() => {
        setStats({
            eden: objects.filter(o => o.location === 'eden').length,
            s0: objects.filter(o => o.location === 's0').length,
            s1: objects.filter(o => o.location === 's1').length,
            old: objects.filter(o => o.location === 'old').length
        });
    }, [objects]);

    const allocateObject = () => {
        const id = Date.now();
        if (stats.eden >= 8) {
            triggerMinorGC();
            return;
        }
        setObjects(prev => [...prev, { id, age: 0, location: 'eden', size: 1 }]);
        setGcLog(prev => [...prev.slice(-3), `Allocated Object-${id.toString().slice(-4)} in Eden`]);
    };

    const triggerMinorGC = () => {
        setGcLog(prev => [...prev.slice(-3), `⚠️ Eden Full! Triggering Minor GC...`]);
        setObjects(prev => prev.map(o => {
            // Simulate random reachability (50% chance of dying)
            const isLive = Math.random() > 0.4;

            if (!isLive && o.location !== 'old') return { ...o, location: 'dead' as const }; // Kill object

            // Promote Survivors
            if (o.location === 'eden') return { ...o, location: 's0' as const, age: o.age + 1 };
            if (o.location === 's0') return { ...o, location: 's1' as const, age: o.age + 1 };
            if (o.location === 's1') return { ...o, location: 'old' as const, age: o.age + 1 }; // Tenure promotion
            return o;
        }).filter(o => o.location !== 'dead')); // Cleanup
    };

    const triggerMajorGC = () => {
        setGcLog(prev => [...prev.slice(-3), `🔥 Old Gen Full! Triggering Major GC (Stop-The-World)...`]);
        setObjects(prev => prev.filter(o => o.location !== 'old' || Math.random() > 0.5)); // Kill 50% of old objects
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Box className="text-orange-400" /> JVM Heap Memory Layout
            </h3>

            {/* Controls */}
            <div className="flex gap-4 mb-8 justify-center">
                <button
                    onClick={allocateObject}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-bold"
                >
                    <Box size={14} />
                    new Object()
                </button>
                <button
                    onClick={triggerMinorGC}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded text-sm font-bold"
                >
                    <RefreshCw size={14} />
                    Run Minor GC
                </button>
                <button
                    onClick={triggerMajorGC}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-sm font-bold"
                >
                    <Trash2 size={14} />
                    Run Full GC
                </button>
            </div>

            {/* Visualization Area */}
            <div className="grid grid-cols-12 gap-4 h-64">

                {/* Young Gen */}
                <div className="col-span-8 border-2 border-dashed border-slate-600 rounded-lg p-2 relative bg-slate-800/50">
                    <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-slate-400 font-bold">Young Generation (Minor GC)</span>
                    <div className="grid grid-cols-3 gap-2 h-full">
                        {/* Eden */}
                        <div className="bg-green-500/10 rounded border border-green-500/30 p-2 relative">
                            <span className="text-[10px] text-green-400 font-bold uppercase block mb-2 text-center">Eden Space</span>
                            <div className="flex flex-wrap gap-1 content-start">
                                <AnimatePresence>
                                    {objects.filter(o => o.location === 'eden').map(o => (
                                        <motion.div
                                            key={o.id}
                                            layoutId={String(o.id)}
                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                            className="w-3 h-3 bg-green-400 rounded-full"
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        {/* S0 */}
                        <div className="bg-yellow-500/10 rounded border border-yellow-500/30 p-2">
                            <span className="text-[10px] text-yellow-400 font-bold uppercase block mb-2 text-center">Survivor 0</span>
                            <div className="flex flex-wrap gap-1 content-start">
                                <AnimatePresence>
                                    {objects.filter(o => o.location === 's0').map(o => (
                                        <motion.div
                                            key={o.id}
                                            layoutId={String(o.id)}
                                            className="w-3 h-3 bg-yellow-400 rounded-sm"
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                        {/* S1 */}
                        <div className="bg-yellow-500/10 rounded border border-yellow-500/30 p-2">
                            <span className="text-[10px] text-yellow-400 font-bold uppercase block mb-2 text-center">Survivor 1</span>
                            <div className="flex flex-wrap gap-1 content-start">
                                <AnimatePresence>
                                    {objects.filter(o => o.location === 's1').map(o => (
                                        <motion.div
                                            key={o.id}
                                            layoutId={String(o.id)}
                                            className="w-3 h-3 bg-yellow-400 rounded-sm"
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Old Gen */}
                <div className="col-span-4 border-2 border-dashed border-slate-600 rounded-lg p-2 relative bg-slate-800/50">
                    <span className="absolute -top-3 left-4 bg-slate-900 px-2 text-xs text-slate-400 font-bold">Old Generation (Major GC)</span>
                    <div className="bg-red-500/10 rounded border border-red-500/30 p-2 h-full">
                        <div className="flex flex-wrap gap-1 content-start">
                            <AnimatePresence>
                                {objects.filter(o => o.location === 'old').map(o => (
                                    <motion.div
                                        key={o.id}
                                        layoutId={String(o.id)}
                                        className="w-4 h-4 bg-red-500 rounded text-[8px] flex items-center justify-center font-bold"
                                    >
                                        {o.age}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Console */}
            <div className="mt-4 bg-black/50 p-2 rounded h-20 overflow-y-auto font-mono text-xs border border-white/10">
                {gcLog.map((line, i) => (
                    <div key={i} className="text-slate-300">{line}</div>
                ))}
            </div>
        </div>
    );
};
