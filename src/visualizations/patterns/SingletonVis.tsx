import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Copy, AlertCircle } from 'lucide-react';

export const SingletonVis: React.FC = () => {
    const [instanceId, setInstanceId] = useState<string | null>(null);
    const [requests, setRequests] = useState<{ id: number; status: 'pending' | 'served' }[]>([]);
    const [logs, setLogs] = useState<string[]>([]);

    const handleRequest = () => {
        const reqId = Date.now();
        setRequests(prev => [...prev, { id: reqId, status: 'pending' }]);

        // Simulate processing
        setTimeout(() => {
            if (!instanceId) {
                const newId = "INST-" + Math.floor(Math.random() * 10000).toString(16).toUpperCase();
                setInstanceId(newId);
                setLogs(prev => [`Creating NEW instance: ${newId}`, ...prev]);
            } else {
                setLogs(prev => [`Returning EXISTING instance: ${instanceId}`, ...prev]);
            }

            setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'served' } : r));

            // Cleanup request visual after a bit
            setTimeout(() => {
                setRequests(prev => prev.filter(r => r.id !== reqId));
            }, 1000);
        }, 800);
    };

    const reset = () => {
        setInstanceId(null);
        setLogs([]);
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-900/50 rounded-xl border border-white/5 h-[400px]">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="text-purple-400" /> Database Connection
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleRequest}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-sm transition-colors shadow-lg shadow-purple-900/20 active:scale-95"
                    >
                        Get Instance
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="flex-1 flex gap-4 relative">
                {/* The Class / Factory */}
                <div className="w-1/3 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center relative bg-slate-800/20">
                    <div className="absolute top-2 left-2 text-xs text-slate-500 font-mono">Database.class</div>

                    <AnimatePresence>
                        {instanceId ? (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="w-24 h-24 bg-purple-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)] z-10"
                            >
                                <Shield className="text-white mb-1" size={32} />
                                <div className="text-[10px] font-mono font-bold text-white bg-black/20 px-2 py-0.5 rounded">
                                    {instanceId}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="text-slate-600 text-sm font-medium">No Instance</div>
                        )}
                    </AnimatePresence>

                    {/* Incoming Requests */}
                    {requests.map(req => (
                        <motion.div
                            key={req.id}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{
                                x: req.status === 'served' ? 100 : 0,
                                opacity: req.status === 'served' ? 0 : 1
                            }}
                            className="absolute left-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg z-20"
                        >
                            <Copy size={14} className="text-slate-900" />
                        </motion.div>
                    ))}
                </div>

                {/* Console Log */}
                <div className="w-2/3 bg-black rounded-xl border border-white/10 p-4 font-mono text-xs overflow-y-auto">
                    {logs.length === 0 ? (
                        <span className="text-slate-600 italic">Access logs will appear here...</span>
                    ) : (
                        logs.map((log, i) => (
                            <div key={i} className="mb-1">
                                <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                <span className={log.includes("NEW") ? "text-purple-400 font-bold" : "text-emerald-400"}>
                                    {log}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
