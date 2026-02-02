import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, HardDrive, ArrowRight, Database, Play } from 'lucide-react';

export const IOVisualization: React.FC = () => {
    const [isReading, setIsReading] = useState(false);
    const [buffer, setBuffer] = useState<string[]>([]);
    const [fileContent] = useState(["Line 1: Hello", "Line 2: Java", "Line 3: I/O"]);
    const [ramContent, setRamContent] = useState<string[]>([]);

    useEffect(() => {
        if (isReading) {
            let i = 0;
            const interval = setInterval(() => {
                if (i < fileContent.length) {
                    const line = fileContent[i];
                    // Step 1: Disk to Buffer
                    setBuffer([line]);

                    // Step 2: Buffer to RAM (delayed)
                    setTimeout(() => {
                        setRamContent(prev => [...prev, line]);
                        setBuffer([]);
                    }, 800);

                    i++;
                } else {
                    setIsReading(false);
                    clearInterval(interval);
                }
            }, 1600);
            return () => clearInterval(interval);
        }
    }, [isReading, fileContent]);

    const reset = () => {
        setRamContent([]);
        setBuffer([]);
        setIsReading(false);
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-900/50">
            <div className="flex justify-between w-full max-w-2xl mb-12 relative">
                {/* DISK */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-slate-800 rounded-xl border border-white/10 flex items-center justify-center relative">
                        <HardDrive size={40} className="text-slate-500" />
                        <span className="absolute -bottom-6 text-xs text-slate-500 font-mono">Hard Disk</span>
                    </div>
                    <div className="space-y-1">
                        {fileContent.map((line, idx) => (
                            <div key={idx} className="text-[10px] font-mono bg-black/20 px-2 py-1 rounded text-slate-400">
                                {line}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stream / Buffer Animation */}
                <div className="flex-1 flex items-center justify-center relative">
                    <div className="h-1 w-full bg-slate-800 absolute top-12" />
                    <AnimatePresence>
                        {buffer.map((line, idx) => (
                            <motion.div
                                key={line + idx}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 100, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-8 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg shadow-blue-500/20 z-10 flex items-center gap-2"
                            >
                                <Database size={10} /> {line}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <span className="absolute top-16 text-[10px] text-blue-400 font-mono">Stream/Buffer</span>
                </div>

                {/* RAM */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 bg-slate-800 rounded-xl border border-blue-500/30 flex items-center justify-center relative shadow-lg shadow-blue-900/20">
                        <FileText size={40} className="text-blue-400" />
                        <span className="absolute -bottom-6 text-xs text-blue-400 font-bold font-mono">RAM (Program)</span>
                    </div>
                    <div className="space-y-1 min-h-[80px]">
                        {ramContent.map((line, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={idx}
                                className="text-[10px] font-mono bg-blue-500/20 px-2 py-1 rounded text-blue-200"
                            >
                                {line}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={() => setIsReading(true)}
                    disabled={isReading || ramContent.length === 3}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <Play size={16} /> Read File
                </button>
                <button
                    onClick={reset}
                    disabled={isReading}
                    className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full disabled:opacity-50 transition-all"
                >
                    Reset
                </button>
            </div>

            <p className="mt-8 text-xs text-slate-500 max-w-sm text-center">
                Visualizing how a BufferedReader pulls data line-by-line from the slow Disk into the fast RAM.
            </p>
        </div>
    );
};
