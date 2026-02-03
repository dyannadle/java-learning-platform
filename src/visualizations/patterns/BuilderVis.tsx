import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, RotateCcw } from 'lucide-react';

type Ingredient = 'Bun (Bottom)' | 'Patty' | 'Cheese' | 'Lettuce' | 'Tomato' | 'Bun (Top)';

export const BuilderVis: React.FC = () => {
    const [stack, setStack] = useState<Ingredient[]>([]);

    const add = (item: Ingredient) => setStack(prev => [...prev, item]);
    const reset = () => setStack([]);

    return (
        <div className="flex gap-6 p-6 bg-slate-900/50 rounded-xl border border-white/5 h-[400px]">
            {/* Controls */}
            <div className="w-1/3 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <Layers size={18} className="text-yellow-400" /> BurgerBuilder
                </h3>
                <div className="space-y-2">
                    {['Bun (Bottom)', 'Patty', 'Cheese', 'Lettuce', 'Tomato', 'Bun (Top)'].map((ing) => (
                        <button
                            key={ing}
                            onClick={() => add(ing as Ingredient)}
                            className="w-full text-left px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group"
                        >
                            {ing}
                            <Plus size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
                        </button>
                    ))}
                </div>
                <button
                    onClick={reset}
                    className="mt-auto flex items-center justify-center gap-2 py-2 text-xs text-red-400 hover:bg-red-950/30 rounded transition-colors"
                >
                    <RotateCcw size={14} /> Reset
                </button>
            </div>

            {/* Visual Stack */}
            <div className="flex-1 bg-black/40 rounded-xl border border-white/5 flex items-end justify-center pb-10 relative overflow-hidden">
                <div className="absolute top-4 left-4 font-mono text-xs text-slate-500">
                    Product result = builder.build();
                </div>

                <div className="flex flex-col-reverse items-center gap-1 w-40">
                    <AnimatePresence>
                        {stack.map((item, i) => (
                            <motion.div
                                key={`${item}-${i}`}
                                initial={{ y: -200, opacity: 0, rotate: Math.random() * 10 - 5 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className={`w-full h-8 rounded-full border shadow-lg flex items-center justify-center text-[10px] font-bold uppercase tracking-widest ${item.includes('Bun') ? 'bg-orange-300 border-orange-400 text-orange-900' :
                                        item === 'Patty' ? 'bg-amber-900 border-amber-800 text-amber-200' :
                                            item === 'Cheese' ? 'bg-yellow-400 border-yellow-500 text-yellow-900' :
                                                item === 'Lettuce' ? 'bg-green-500 border-green-600 text-green-900' :
                                                    'bg-red-500 border-red-600 text-red-900'
                                    }`}
                                style={{ zIndex: i }}
                            >
                                {item}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {stack.length === 0 && (
                        <div className="text-slate-600 text-xs text-center py-10 opacity-50">
                            Start building...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
