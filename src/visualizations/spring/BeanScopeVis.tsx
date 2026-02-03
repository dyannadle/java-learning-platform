import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Copy, RefreshCw, Hexagon } from 'lucide-react';

type Scope = 'Singleton' | 'Prototype';

export const BeanScopeVis: React.FC = () => {
    const [scope, setScope] = useState<Scope>('Singleton');
    const [instances, setInstances] = useState<string[]>([]);
    const [flash, setFlash] = useState(false);

    const singletonId = "Bean@7a4f0f";

    const getBean = () => {
        setFlash(true);
        setTimeout(() => setFlash(false), 200);

        if (scope === 'Singleton') {
            if (!instances.includes(singletonId)) {
                setInstances([singletonId]);
            }
        } else {
            const newId = `Bean@${Math.floor(Math.random() * 16777215).toString(16)}`;
            setInstances(prev => [...prev, newId].slice(-5)); // Keep last 5
        }
    };

    return (
        <div className="p-6 bg-slate-900/50 rounded-xl border border-white/5 h-[400px] flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Hexagon size={18} className="text-yellow-400" /> Bean Scopes
                    </h3>
                    <div className="flex bg-slate-800 rounded-lg p-1 w-max">
                        <button
                            onClick={() => { setScope('Singleton'); setInstances([]); }}
                            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${scope === 'Singleton' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                        >
                            @Scope("singleton")
                        </button>
                        <button
                            onClick={() => { setScope('Prototype'); setInstances([]); }}
                            className={`px-3 py-1 text-xs font-bold rounded transition-colors ${scope === 'Prototype' ? 'bg-orange-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                        >
                            @Scope("prototype")
                        </button>
                    </div>
                </div>
                <button
                    onClick={getBean}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-sm font-bold text-white flex items-center gap-2 transition-all active:scale-95"
                >
                    <RefreshCw size={14} className={flash ? "animate-spin" : ""} /> context.getBean()
                </button>
            </div>

            <div className="flex-1 bg-black/20 rounded-xl border border-white/5 relative overflow-hidden p-6 flex flex-wrap content-start gap-4">
                <AnimatePresence>
                    {instances.map((id, i) => (
                        <motion.div
                            key={id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`h-14 px-4 rounded-lg flex items-center gap-3 font-mono text-xs border shadow-lg ${scope === 'Singleton'
                                    ? 'bg-blue-900/20 border-blue-500/50 text-blue-200'
                                    : 'bg-orange-900/20 border-orange-500/50 text-orange-200'
                                }`}
                        >
                            <Box size={16} />
                            <div className="flex flex-col">
                                <span className="font-bold">MyService</span>
                                <span className="opacity-50">{id}</span>
                            </div>
                            {scope === 'Singleton' && i === 0 && (
                                <div className="ml-2 px-1.5 py-0.5 bg-blue-500/20 rounded text-[9px] uppercase tracking-wider text-blue-300">Shared</div>
                            )}
                            {scope === 'Prototype' && (
                                <div className="ml-2 px-1.5 py-0.5 bg-orange-500/20 rounded text-[9px] uppercase tracking-wider text-orange-300">New</div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {instances.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-sm">
                        Click "getBean()" to request an instance
                    </div>
                )}
            </div>

            <div className="mt-4 text-xs text-slate-400 leading-relaxed">
                {scope === 'Singleton'
                    ? "Singleton: The container creates ONE instance and caches it. All requests return this same shared object. Default in Spring."
                    : "Prototype: The container creates a NEW instance every time you request it. Useful for stateful beans."}
            </div>
        </div>
    );
};
