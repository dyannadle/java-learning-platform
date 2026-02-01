import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Plus, Trash2, ArrowRight, LayoutList, BoxSelect, Table } from 'lucide-react';


type CollectionType = 'List' | 'Set' | 'Map';

interface CollectionItem {
    id: string;
    value: string;
    key?: string; // For Map
}

export const CollectionsVisualization: React.FC = () => {
    const [activeTab, setActiveTab] = useState<CollectionType>('List');
    const [items, setItems] = useState<CollectionItem[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [inputKey, setInputKey] = useState(''); // For Map
    const [message, setMessage] = useState('');

    const addItem = () => {
        if (!inputValue.trim()) return;

        // Set Logic: Uniqueness
        if (activeTab === 'Set' && items.some(item => item.value === inputValue)) {
            setMessage(`Set already contains "${inputValue}"! Duplicates rejected.`);
            return;
        }

        // Map Logic: Key Uniqueness
        if (activeTab === 'Map') {
            if (!inputKey.trim()) return;
            if (items.some(item => item.key === inputKey)) {
                // Update existing key
                setItems(prev => prev.map(item => item.key === inputKey ? { ...item, value: inputValue } : item));
                setMessage(`Updated key "${inputKey}" with new value "${inputValue}".`);
                setInputValue('');
                setInputKey('');
                return;
            }
        }

        const newItem: CollectionItem = {
            id: Math.random().toString(36).substr(2, 9),
            value: inputValue,
            key: inputKey
        };

        setItems(prev => [...prev, newItem]);
        setMessage(activeTab === 'Map' ? `Added Key-Value pair.` : `Added "${inputValue}" to index ${items.length}.`);
        setInputValue('');
        setInputKey('');
    };

    const removeItem = (id: string, index: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
        if (activeTab === 'List') {
            setMessage(`Removed item at index ${index}. Subsequent items shifted left.`);
        } else {
            setMessage('Item removed.');
        }
    };

    const clear = () => {
        setItems([]);
        setMessage('Collection cleared.');
    };

    return (
        <div className="h-full flex flex-col p-6 bg-slate-950/50">

            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6 p-1 bg-slate-900 rounded-lg border border-white/10 w-fit">
                {(['List', 'Set', 'Map'] as CollectionType[]).map(type => (
                    <button
                        key={type}
                        onClick={() => { setActiveTab(type); setItems([]); setMessage(''); }}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                            activeTab === type ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
                        )}
                    >
                        {type === 'List' && <LayoutList size={16} />}
                        {type === 'Set' && <BoxSelect size={16} />}
                        {type === 'Map' && <Table size={16} />}
                        {type}
                    </button>
                ))}
            </div>

            {/* Control Panel */}
            <div className="flex gap-4 mb-6 items-end">
                {activeTab === 'Map' && (
                    <div className="flex-1 space-y-1">
                        <label className="text-xs text-slate-500 uppercase font-bold pl-1">Key</label>
                        <input
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value)}
                            placeholder="Key..."
                            className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            onKeyDown={(e) => e.key === 'Enter' && addItem()}
                        />
                    </div>
                )}
                <div className="flex-[2] space-y-1">
                    <label className="text-xs text-slate-500 uppercase font-bold pl-1">Value</label>
                    <div className="flex gap-2">
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={activeTab === 'Map' ? "Value..." : "Add item..."}
                            className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            onKeyDown={(e) => e.key === 'Enter' && addItem()}
                        />
                        <button
                            onClick={addItem}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-2 active:scale-95"
                        >
                            <Plus size={18} /> Add
                        </button>
                    </div>
                </div>
            </div>

            {/* Info Message */}
            <div className="h-6 mb-4 text-xs font-mono text-emerald-400 flex items-center gap-2">
                {message && <><TerminalIcon size={12} /> {message}</>}
            </div>

            {/* Visualization Container */}
            <div className="flex-1 bg-black/20 rounded-xl border border-white/5 p-4 relative overflow-y-auto">
                {/* Labels */}
                <div className="flex text-xs text-slate-500 font-mono mb-2 uppercase tracking-wide border-b border-white/5 pb-2">
                    <div className="w-12 text-center text-slate-600">Index</div>
                    <div className="flex-1 pl-4">Value</div>
                    <div className="w-20 text-center">Action</div>
                </div>

                <div className="space-y-2">
                    <AnimatePresence mode='popLayout'>
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                className={cn(
                                    "flex items-center p-3 rounded-lg border border-white/5 group",
                                    activeTab === 'List' ? "bg-slate-800" :
                                        activeTab === 'Set' ? "bg-indigo-900/30 border-indigo-500/30" : "bg-emerald-900/30 border-emerald-500/30"
                                )}
                            >
                                <div className="w-12 text-center font-mono text-slate-500 text-sm">
                                    {activeTab === 'Map' ? '--' : index}
                                </div>

                                <div className="flex-1 pl-4 flex items-center gap-2 font-mono text-sm text-slate-200">
                                    {activeTab === 'Map' ? (
                                        <>
                                            <span className="text-emerald-400 py-0.5 px-2 bg-emerald-500/10 rounded">{item.key}</span>
                                            <ArrowRight size={14} className="text-slate-600" />
                                            <span className="text-white">"{item.value}"</span>
                                        </>
                                    ) : (
                                        <span>"{item.value}"</span>
                                    )}
                                </div>

                                <div className="w-20 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => removeItem(item.id, index)}
                                        className="p-1.5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {items.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 italic">
                        Collection is empty.
                    </div>
                )}
            </div>

            <div className="mt-4 flex justify-between items-center px-2">
                <div className="text-xs text-slate-500">
                    Size: <span className="text-white font-mono">{items.length}</span>
                </div>
                {items.length > 0 && (
                    <button onClick={clear} className="text-xs text-red-400 hover:text-red-300 transition-colors">
                        Clear All
                    </button>
                )}
            </div>
        </div>
    );
};

const TerminalIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);
