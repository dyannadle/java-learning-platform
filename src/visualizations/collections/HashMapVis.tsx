import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, Plus } from 'lucide-react';

interface Entry {
    key: string;
    value: string;
    hash: number;
}

export const HashMapVis: React.FC = () => {
    const [buckets, setBuckets] = useState<Entry[][]>([[], [], [], []]);
    const [size, setSize] = useState(0);
    const [keyInput, setKeyInput] = useState('Apple');

    // Simple hash function for demo (returns 0-3)
    const getHash = (str: string, bucketCount: number) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash + str.charCodeAt(i)) % bucketCount;
        }
        return hash;
    };

    const put = () => {
        if (!keyInput) return;

        const bucketCount = buckets.length;
        const hash = getHash(keyInput, bucketCount);

        const newBuckets = [...buckets];
        const existingIndex = newBuckets[hash].findIndex(e => e.key === keyInput);

        if (existingIndex >= 0) {
            // Update
            newBuckets[hash][existingIndex] = { key: keyInput, value: Math.floor(Math.random() * 100).toString(), hash };
        } else {
            // Add (Collision if bucket not empty)
            newBuckets[hash].push({ key: keyInput, value: Math.floor(Math.random() * 100).toString(), hash });
            setSize(prev => prev + 1);
        }

        setBuckets(newBuckets);

        // Check Resize (Load Factor 0.75)
        if ((size + 1) / bucketCount > 0.75) {
            setTimeout(resize, 1000);
        }
    };

    const resize = () => {
        const oldEntries = buckets.flat();
        const newCapacity = buckets.length * 2;
        const newBuckets: Entry[][] = Array(newCapacity).fill(null).map(() => []);

        oldEntries.forEach(entry => {
            const newHash = getHash(entry.key, newCapacity);
            newBuckets[newHash].push({ ...entry, hash: newHash });
        });

        setBuckets(newBuckets);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Table className="text-emerald-400" /> HashMap Internals
            </h3>

            {/* Controls */}
            <div className="flex gap-4 mb-8 justify-center items-end">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">Key</label>
                    <input
                        type="text"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm"
                    />
                </div>
                <button
                    onClick={put}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded text-sm font-bold"
                >
                    <Plus size={14} /> map.put("{keyInput}", rand)
                </button>
            </div>

            {/* Buckets */}
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(buckets.length, 8)}, 1fr)` }}>
                {buckets.map((bucket, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        {/* Bucket Header */}
                        <div className="bg-slate-800 p-2 rounded text-center text-xs font-mono border border-slate-600">
                            Index {i}
                        </div>

                        {/* Bucket Content (LinkedList Chain) */}
                        <div className="bg-slate-950/50 p-2 rounded border border-dashed border-slate-700 min-h-[100px] flex flex-col gap-2 relative">
                            <AnimatePresence>
                                {bucket.map((entry, idx) => (
                                    <motion.div
                                        key={entry.key}
                                        initial={{ scale: 0, y: -20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        layout
                                        className={`bg-emerald-500/20 border border-emerald-500/50 p-2 rounded text-xs overflow-hidden relative ${idx > 0 ? 'mt-1' : ''}`}
                                    >
                                        <div className="font-bold text-white">{entry.key}</div>
                                        <div className="text-[10px] text-emerald-300">Hash: {getHash(entry.key, buckets.length)}</div>
                                        {idx > 0 && (
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-slate-500 text-[8px]">
                                                ⬇
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {bucket.length === 0 && <span className="text-slate-700 text-[10px] text-center mt-4">Empty</span>}
                            {bucket.length > 1 && <span className="text-red-400 text-[10px] font-bold text-center mt-auto">Collision!</span>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center text-xs text-slate-500">
                Load Factor: {((size / buckets.length) * 100).toFixed(0)}% (Resizes at 75%)
            </div>
        </div>
    );
};
