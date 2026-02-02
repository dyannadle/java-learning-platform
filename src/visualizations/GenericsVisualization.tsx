import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

type ItemType = 'String' | 'Integer' | 'Double' | 'Unknown';

interface Item {
    id: number;
    val: string;
    type: ItemType;
}

export const GenericsVisualization: React.FC = () => {
    const [boxType, setBoxType] = useState<'Raw' | 'String' | 'Integer'>('Raw');
    const [contents, setContents] = useState<Item[]>([]);
    const [message, setMessage] = useState<string>("");

    // Items to try inserting
    const items: Item[] = [
        { id: 1, val: '"Hello"', type: 'String' },
        { id: 2, val: '42', type: 'Integer' },
        { id: 3, val: '3.14', type: 'Double' }
    ];

    const addItem = (item: Item) => {
        if (boxType === 'Raw') {
            setContents(prev => [...prev, item]);
            setMessage("Allowed! (But unsafe...)");
        } else if (boxType === 'String') {
            if (item.type === 'String') {
                setContents(prev => [...prev, item]);
                setMessage("Allowed! Type matches <String>.");
            } else {
                setMessage(`Compilation Error! Cannot put ${item.type} into Box<String>.`);
            }
        } else if (boxType === 'Integer') {
            if (item.type === 'Integer') {
                setContents(prev => [...prev, item]);
                setMessage("Allowed! Type matches <Integer>.");
            } else {
                setMessage(`Compilation Error! Cannot put ${item.type} into Box<Integer>.`);
            }
        }
    };

    const clearBox = () => {
        setContents([]);
        setMessage("");
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-900/50">
            {/* Controls */}
            <div className="flex gap-4 mb-10">
                <button
                    onClick={() => { setBoxType('Raw'); clearBox(); }}
                    className={`px-4 py-2 rounded-lg text-sm border font-mono transition-all ${boxType === 'Raw' ? 'bg-slate-700 border-white text-white' : 'border-slate-700 text-slate-500'}`}
                >
                    Box (Raw)
                </button>
                <button
                    onClick={() => { setBoxType('String'); clearBox(); }}
                    className={`px-4 py-2 rounded-lg text-sm border font-mono transition-all ${boxType === 'String' ? 'bg-blue-600 border-blue-400 text-white' : 'border-slate-700 text-slate-500'}`}
                >
                    Box&lt;String&gt;
                </button>
                <button
                    onClick={() => { setBoxType('Integer'); clearBox(); }}
                    className={`px-4 py-2 rounded-lg text-sm border font-mono transition-all ${boxType === 'Integer' ? 'bg-amber-600 border-amber-400 text-white' : 'border-slate-700 text-slate-500'}`}
                >
                    Box&lt;Integer&gt;
                </button>
            </div>

            {/* The Box */}
            <div className="relative w-48 h-48 border-4 border-dashed border-slate-600 rounded-xl flex items-center justify-center bg-slate-800/50">
                <div className="absolute -top-10 text-slate-400 font-mono text-xs">
                    Memory Heap
                </div>

                {/* Label */}
                <div className={`absolute -bottom-8 px-3 py-1 rounded text-xs font-bold font-mono transition-colors ${boxType === 'Raw' ? 'bg-slate-700 text-slate-300' :
                        boxType === 'String' ? 'bg-blue-500 text-white' :
                            'bg-amber-500 text-white'
                    }`}>
                    {boxType === 'Raw' ? 'Box obj = new Box()' :
                        boxType === 'String' ? 'Box<String> s = ...' :
                            'Box<Integer> i = ...'}
                </div>

                <div className="grid grid-cols-2 gap-2 p-2 w-full h-full content-center justify-items-center">
                    <AnimatePresence>
                        {contents.map((item, idx) => (
                            <motion.div
                                key={item.id + idx}
                                initial={{ scale: 0, y: -50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0 }}
                                className={`text-[10px] w-14 h-14 rounded-lg flex items-center justify-center font-bold shadow-lg ${item.type === 'String' ? 'bg-blue-500/80 text-white' :
                                        item.type === 'Integer' ? 'bg-amber-500/80 text-black' :
                                            'bg-purple-500/80 text-white'
                                    }`}
                            >
                                {item.val}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Message Area */}
            <div className="h-8 mt-12 text-sm font-bold text-center">
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center gap-2 ${message.includes("Error") ? "text-red-400" : "text-emerald-400"}`}
                    >
                        {message.includes("Error") ? <XCircle size={16} /> : <CheckCircle size={16} />}
                        {message}
                    </motion.div>
                )}
            </div>

            {/* Input Items */}
            <div className="mt-8 flex gap-4">
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => addItem(item)}
                        className={`px-4 py-2 rounded border border-white/10 bg-slate-800 hover:bg-slate-700 transition-colors flex flex-col items-center gap-1 ${item.type === 'String' ? 'hover:border-blue-500' :
                                item.type === 'Integer' ? 'hover:border-amber-500' :
                                    'hover:border-purple-500'
                            }`}
                    >
                        <span className="text-[10px] text-slate-500 uppercase">{item.type}</span>
                        <span className="font-mono text-sm text-white">{item.val}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
