import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Activity, Trash2 } from 'lucide-react';

interface Pod {
    id: number;
    status: 'starting' | 'running' | 'terminating';
    health: number;
}

export const K8sClusterVis: React.FC = () => {
    const [pods, setPods] = useState<Pod[]>([
        { id: 1, status: 'running', health: 100 },
        { id: 2, status: 'running', health: 100 },
        { id: 3, status: 'running', health: 100 },
    ]);
    const [replicaCount, setReplicaCount] = useState(3);
    const [log, setLog] = useState<string[]>(['ReplicaSet: Desired=3, Current=3']);

    // Reconciliation Loop (The "Brain" of K8s)
    useEffect(() => {
        const interval = setInterval(() => {
            setPods(currentPods => {
                const runningOrStarting = currentPods.filter(p => p.status !== 'terminating');

                // Scale Up
                if (runningOrStarting.length < replicaCount) {
                    const newId = Math.max(0, ...currentPods.map(p => p.id)) + 1;
                    setLog(prev => [...prev.slice(-4), `K8s: Current < Desired. Scheduling Pod-${newId}...`]);
                    return [...currentPods, { id: newId, status: 'starting', health: 0 }];
                }

                // Scale Down
                if (runningOrStarting.length > replicaCount) {
                    const toKill = runningOrStarting[runningOrStarting.length - 1];
                    setLog(prev => [...prev.slice(-4), `K8s: Current > Desired. Terminating Pod-${toKill.id}...`]);
                    return currentPods.map(p => p.id === toKill.id ? { ...p, status: 'terminating' } : p);
                }

                // Transition Logic
                return currentPods.map(p => {
                    if (p.status === 'starting') {
                        return { ...p, status: 'running', health: 100 }; // Instant start for demo
                    }
                    if (p.status === 'terminating') {
                        return null; // Remove
                    }
                    return p;
                }).filter(Boolean) as Pod[];
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [replicaCount]);

    const killPod = (id: number) => {
        setPods(prev => prev.map(p => p.id === id ? { ...p, status: 'terminating' } : p));
        setLog(prev => [...prev.slice(-4), `⚠️ Pod-${id} Crashed!`]);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="text-blue-400" /> Kubernetes ReplicaSet
            </h3>

            {/* Controls */}
            <div className="flex gap-4 mb-8 justify-center items-center">
                <div className="bg-slate-800 px-4 py-2 rounded-lg flex items-center gap-4 border border-white/10">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Replicas</span>
                    <button
                        onClick={() => setReplicaCount(Math.max(0, replicaCount - 1))}
                        className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded hover:bg-slate-600"
                    >
                        -
                    </button>
                    <span className="text-xl font-bold font-mono w-4 text-center">{replicaCount}</span>
                    <button
                        onClick={() => setReplicaCount(Math.min(6, replicaCount + 1))}
                        className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded hover:bg-blue-500"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Cluster View */}
            <div className="min-h-[200px] bg-slate-950/50 rounded-xl border border-white/5 p-6 flex flex-wrap gap-4 justify-center content-start">
                <AnimatePresence>
                    {pods.map((pod) => (
                        <motion.div
                            key={pod.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, backgroundColor: pod.status === 'terminating' ? '#ef444420' : '#3b82f620' }}
                            exit={{ scale: 0, opacity: 0 }}
                            className={`w-32 h-32 rounded-lg border-2 flex flex-col items-center justify-center relative group
                                ${pod.status === 'starting' ? 'border-yellow-500 border-dashed animate-pulse' :
                                    pod.status === 'terminating' ? 'border-red-500' : 'border-blue-500'}
                            `}
                        >
                            <Box className={pod.status === 'running' ? 'text-blue-400' : 'text-slate-500'} size={32} />
                            <span className="mt-2 font-mono font-bold text-sm">Pod-{pod.id}</span>
                            <span className="text-[10px] uppercase font-bold text-slate-500">{pod.status}</span>

                            {pod.status === 'running' && (
                                <button
                                    onClick={() => killPod(pod.id)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                                    title="Simulate Crash"
                                >
                                    <Trash2 size={12} />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Log */}
            <div className="mt-4 bg-black/50 p-4 rounded-lg h-32 overflow-y-auto font-mono text-xs border border-white/10">
                {log.map((entry, i) => (
                    <div key={i} className={`mb-1 ${entry.includes('Crashed') ? 'text-red-400' : entry.includes('Scheduling') ? 'text-yellow-400' : 'text-blue-300'}`}>
                        {entry}
                    </div>
                ))}
            </div>
        </div>
    );
};
