import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Globe, Key, UserCheck } from 'lucide-react';

export const SecurityFilterChainVis: React.FC = () => {
    const [requestState, setRequestState] = useState<'idle' | 'moving' | 'blocked' | 'success'>('idle');
    const [currentFilter, setCurrentFilter] = useState<number>(-1);
    const [tokenType, setTokenType] = useState<'valid' | 'invalid' | 'missing'>('valid');
    const [log, setLog] = useState<string[]>([]);

    const filters = [
        { id: 0, name: 'CorsFilter', icon: Globe, description: 'Checks Origin (CORS)' },
        { id: 1, name: 'CsrfFilter', icon: Shield, description: 'Checks Anti-Forgery Token' },
        { id: 2, name: 'JwtAuthFilter', icon: Key, description: 'Validates JWT Signature' },
        { id: 3, name: 'AuthorizationFilter', icon: UserCheck, description: 'Checks User Role (ADMIN)' },
    ];

    const startRequest = () => {
        setRequestState('moving');
        setCurrentFilter(-1);
        setLog(['Request started...']);
    };

    useEffect(() => {
        if (requestState !== 'moving') return;

        let step = -1;
        const interval = setInterval(() => {
            step++;
            setCurrentFilter(step);

            if (step >= filters.length) {
                // Reached the Controller (Success)
                setRequestState('success');
                setLog(prev => [...prev, '✅ Reached Controller! Data returned.']);
                clearInterval(interval);
                return;
            }

            const filter = filters[step];

            // Logic Simulation
            if (filter.name === 'JwtAuthFilter') {
                if (tokenType === 'missing') {
                    setRequestState('blocked');
                    setLog(prev => [...prev, `❌ ${filter.name}: No Token found! (401)`]);
                    clearInterval(interval);
                    return;
                }
                if (tokenType === 'invalid') {
                    setRequestState('blocked');
                    setLog(prev => [...prev, `❌ ${filter.name}: Invalid Signature! (401)`]);
                    clearInterval(interval);
                    return;
                }
            }

            setLog(prev => [...prev, `✓ ${filter.name}: Passed`]);

        }, 1500);

        return () => clearInterval(interval);
    }, [requestState, tokenType]);

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="text-green-400" /> Security Filter Chain
            </h3>

            {/* Controls */}
            <div className="flex gap-4 mb-8 bg-slate-800 p-4 rounded-lg items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => setTokenType('valid')}
                        className={`px-3 py-1 rounded text-xs border ${tokenType === 'valid' ? 'bg-green-500/20 border-green-500 text-green-300' : 'border-transparent text-slate-400'}`}
                    >
                        Valid Token
                    </button>
                    <button
                        onClick={() => setTokenType('invalid')}
                        className={`px-3 py-1 rounded text-xs border ${tokenType === 'invalid' ? 'bg-red-500/20 border-red-500 text-red-300' : 'border-transparent text-slate-400'}`}
                    >
                        Invalid Token
                    </button>
                    <button
                        onClick={() => setTokenType('missing')}
                        className={`px-3 py-1 rounded text-xs border ${tokenType === 'missing' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' : 'border-transparent text-slate-400'}`}
                    >
                        No Token
                    </button>
                </div>
                <button
                    onClick={startRequest}
                    disabled={requestState === 'moving'}
                    className="ml-auto bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded text-sm font-bold"
                >
                    {requestState === 'moving' ? 'Processing...' : 'Send Request'}
                </button>
            </div>

            {/* Visualization Pipeline */}
            <div className="relative flex justify-between items-center mb-8 px-4 h-32 bg-slate-950/50 rounded-xl border border-white/5">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700 -z-0"></div>

                {/* Request Object */}
                <AnimatePresence>
                    {requestState !== 'blocked' && (
                        <motion.div
                            className="absolute top-1/2 z-20 -mt-3"
                            initial={{ left: '0%' }}
                            animate={{
                                left: requestState === 'success' ? '95%' :
                                    currentFilter === -1 ? '5%' :
                                        `${(currentFilter * 25) + 15}%`
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="w-6 h-6 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] border-2 border-white"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Filters */}
                {filters.map((filter, index) => {
                    const isActive = currentFilter === index;
                    const isPassed = currentFilter > index || requestState === 'success';
                    const isBlockedHere = requestState === 'blocked' && currentFilter === index;

                    return (
                        <div key={filter.id} className="relative z-10 flex flex-col items-center group">
                            <div className={`
                                w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                ${isActive ? 'bg-blue-600 border-white scale-110 shadow-lg shadow-blue-500/50' :
                                    isPassed ? 'bg-green-600 border-green-400' :
                                        isBlockedHere ? 'bg-red-600 border-red-400' :
                                            'bg-slate-800 border-slate-600'}
                            `}>
                                <filter.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute top-16 w-32 text-center">
                                <p className={`text-xs font-bold transition-colors ${isActive ? 'text-blue-300' : 'text-slate-400'}`}>
                                    {filter.name}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {/* Success Node */}
                <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all
                        ${requestState === 'success' ? 'bg-emerald-600 border-emerald-400 shadow-lg shadow-emerald-500/50' : 'bg-slate-800 border-slate-600'}
                    `}>
                        <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-16 w-32 text-center -left-8">
                        <p className="text-xs font-bold text-slate-400">Controller</p>
                    </div>
                </div>
            </div>

            {/* Log Console */}
            <div className="bg-black/50 p-4 rounded-lg h-40 overflow-y-auto font-mono text-xs border border-white/10">
                {log.map((entry, i) => (
                    <div key={i} className={`mb-1 ${entry.includes('❌') ? 'text-red-400' :
                        entry.includes('✅') ? 'text-emerald-400' :
                            entry.includes('✓') ? 'text-green-300' : 'text-slate-300'
                        }`}>
                        {entry}
                    </div>
                ))}
                {log.length === 0 && <span className="text-slate-600">Waiting for request...</span>}
            </div>
        </div>
    );
};
