import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Zap, X } from 'lucide-react';

interface Marble {
    id: number;
    value: number;
    color: string;
    result?: number | null; // For map/filter results
}

type Operator = 'none' | 'map' | 'filter';

export const MarbleDiagramVis: React.FC = () => {
    const [marbles, setMarbles] = useState<Marble[]>([]);
    const [operator, setOperator] = useState<Operator>('none');
    const nextId = useRef(1);

    const addMarble = () => {
        const value = Math.floor(Math.random() * 9) + 1; // 1-9
        const newMarble: Marble = {
            id: nextId.current++,
            value,
            color: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'][Math.floor(Math.random() * 4)]
        };
        setMarbles(prev => [...prev.slice(-4), newMarble]); // Keep last 5
    };

    const clear = () => setMarbles([]);

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="text-yellow-400" /> Reactive Stream (Flux)
            </h3>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <button
                    onClick={addMarble}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-full text-sm font-bold border border-white/10"
                >
                    <Play size={14} /> Emit Item
                </button>
                <div className="w-px bg-slate-700 mx-2"></div>
                <button
                    onClick={() => setOperator('none')}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${operator === 'none' ? 'bg-blue-600' : 'bg-slate-800'}`}
                >
                    Raw Stream
                </button>
                <button
                    onClick={() => setOperator('map')}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${operator === 'map' ? 'bg-blue-600' : 'bg-slate-800'}`}
                >
                    .map(x -&gt; x * 2)
                </button>
                <button
                    onClick={() => setOperator('filter')}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${operator === 'filter' ? 'bg-blue-600' : 'bg-slate-800'}`}
                >
                    .filter(x -&gt; x % 2 == 0)
                </button>
                <button
                    onClick={clear}
                    className="ml-auto text-slate-500 hover:text-red-400"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Diagram Area */}
            <div className="relative h-48 bg-slate-950/50 rounded-xl border border-white/5 p-6 flex items-center justify-around overflow-hidden">
                {/* Source Line */}
                <div className="absolute top-1/3 left-0 right-0 h-1 bg-slate-700 z-0"></div>

                {/* Operator Text */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 font-mono text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {operator === 'none' ? 'No Ops' : operator === 'map' ? 'Map (*2)' : 'Filter (Even)'}
                </div>

                {/* Result Line (if operator active) */}
                {operator !== 'none' && (
                    <div className="absolute bottom-1/3 left-0 right-0 h-1 bg-slate-700 z-0 border-t border-dashed border-slate-600 bg-transparent h-0"></div>
                )}

                <AnimatePresence mode='popLayout'>
                    {marbles.map((marble) => {
                        let resultVal = marble.value;
                        let passed = true;

                        if (operator === 'map') resultVal = marble.value * 2;
                        if (operator === 'filter') passed = marble.value % 2 === 0;

                        return (
                            <motion.div
                                key={marble.id}
                                layout
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                className="z-10 flex flex-col items-center gap-8"
                            >
                                {/* Source Marble */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${marble.color}`}>
                                    {marble.value}
                                </div>

                                {/* Result Marble (if applicable) */}
                                {operator !== 'none' && (
                                    <div className="h-10 flex items-center justify-center">
                                        {passed ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg border-2 border-white/20 ${marble.color}`}
                                            >
                                                {resultVal}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 1 }}
                                                animate={{ opacity: 0.2 }}
                                                className="text-red-500 font-bold text-xs"
                                            >
                                                X
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="mt-4 text-center text-xs text-slate-500">
                Items flow from left to right over time. This is a "Flux".
            </div>
        </div>
    );
};
