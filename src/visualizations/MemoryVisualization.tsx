import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Box, Layers } from 'lucide-react';

interface MemoryItem {
    name: string;
    value: string;
    type: 'primitive' | 'reference';
    address?: string;
    id: string;
}

export const MemoryVisualization: React.FC<{ items: MemoryItem[] }> = ({ items }) => {
    return (
        <div className="h-full flex gap-4 p-8 bg-slate-950/50">

            {/* S T A C K */}
            <div className="w-1/2 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-orange-400 font-bold uppercase tracking-widest text-sm text-center justify-center">
                    <Layers size={16} /> Stack Memory
                </div>
                <div className="flex-1 bg-slate-900 border-2 border-slate-700 border-dashed rounded-xl p-4 flex flex-col-reverse gap-2 overflow-y-auto relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                        <span className="text-6xl font-black text-white">LIFO</span>
                    </div>

                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className={cn(
                                "p-3 rounded border flex justify-between items-center text-sm shadow-lg z-10",
                                item.type === 'primitive'
                                    ? "bg-orange-500/10 border-orange-500/50"
                                    : "bg-blue-500/10 border-blue-500/50"
                            )}
                        >
                            <div className="flex flex-col">
                                <span className="font-mono font-bold text-slate-200">{item.name}</span>
                                <span className={cn("text-[10px]", item.type === 'primitive' ? "text-orange-400" : "text-blue-400")}>
                                    {item.type === 'primitive' ? 'int/double' : 'Reference'}
                                </span>
                            </div>

                            <div className="font-mono bg-black/40 px-2 py-1 rounded text-slate-300">
                                {item.type === 'primitive' ? item.value : `@${item.address}`}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* H E A P */}
            <div className="w-1/2 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold uppercase tracking-widest text-sm text-center justify-center">
                    <Box size={16} /> Heap Memory
                </div>
                <div className="flex-1 bg-slate-900 border-2 border-slate-700 border-dashed rounded-xl p-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                        <span className="text-6xl font-black text-white">OBJS</span>
                    </div>

                    {/* Render Objects in Heap */}
                    {items.filter(i => i.type === 'reference').map((item) => (
                        <motion.div
                            key={`${item.id}-heap`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 200 }}
                            className="absolute top-10 left-10 p-4 rounded-lg bg-blue-600/20 border border-blue-500 text-center shadow-xl cursor-grab active:cursor-grabbing backdrop-blur-md"
                        >
                            <div className="text-[10px] text-blue-300 absolute -top-2 -right-2 bg-slate-900 border border-blue-500 px-1 rounded">
                                @{item.address}
                            </div>
                            <div className="mb-2">
                                <Box className="mx-auto text-blue-400 mb-1" size={24} />
                                <span className="font-bold text-white block">{item.value}</span>
                            </div>
                            <div className="text-[10px] text-slate-400">Str Object</div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </div>
    );
};
