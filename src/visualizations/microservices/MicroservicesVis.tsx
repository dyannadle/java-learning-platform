import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Globe, Box, Database, Router } from 'lucide-react';

export const MicroservicesVis: React.FC = () => {
    const [requestState, setRequestState] = useState<'idle' | 'gateway' | 'serviceA' | 'serviceB' | 'db' | 'return'>('idle');
    const [log, setLog] = useState<string[]>([]);

    const sendRequest = (service: 'users' | 'orders') => {
        if (requestState !== 'idle') return;

        setRequestState('gateway');
        setLog([`Request: GET /api/${service}/123`]);

        // 1. Gateway Routing
        setTimeout(() => {
            setLog(prev => [...prev, 'Gateway: Looking up service in Eureka...']);

            // 2. Service Processing
            setTimeout(() => {
                setRequestState(service === 'users' ? 'serviceA' : 'serviceB');
                setLog(prev => [...prev, `Gateway: Routing to ${service}-service:8081`]);

                // 3. DB Call
                setTimeout(() => {
                    setRequestState('db');
                    setLog(prev => [...prev, `${service}-service: Querying Database...`]);

                    // 4. Return
                    setTimeout(() => {
                        setRequestState('return');
                        setLog(prev => [...prev, '✓ Response 200 OK']);

                        setTimeout(() => {
                            setRequestState('idle');
                        }, 2000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Globe className="text-blue-400" /> API Gateway Simulator
            </h3>

            {/* Controls */}
            <div className="flex gap-4 mb-8 bg-slate-800 p-4 rounded-lg items-center justify-center">
                <button
                    onClick={() => sendRequest('users')}
                    disabled={requestState !== 'idle'}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded text-sm font-bold"
                >
                    Get User Profile
                </button>
                <button
                    onClick={() => sendRequest('orders')}
                    disabled={requestState !== 'idle'}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 px-4 py-2 rounded text-sm font-bold"
                >
                    Get Order History
                </button>
            </div>

            {/* Architecture Diagram */}
            <div className="relative h-64 bg-slate-950/50 rounded-xl border border-white/5 p-4 mx-10">

                {/* Client Layer */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center">
                        <Globe className="text-slate-400" />
                    </div>
                    <span className="text-xs mt-2 font-mono text-slate-500">Client</span>
                </div>

                {/* API Gateway */}
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className={`w-20 h-20 border-2 rounded-lg flex items-center justify-center transition-colors
                        ${requestState === 'gateway' ? 'bg-blue-900/50 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-slate-900 border-white/20'}
                    `}>
                        <Router className={requestState === 'gateway' ? 'text-blue-400' : 'text-slate-600'} size={32} />
                    </div>
                    <span className="text-xs mt-2 font-mono font-bold text-white">API Gateway</span>
                </div>

                {/* Services */}
                <div className="absolute right-1/4 top-8 flex flex-col items-center z-10">
                    <div className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center transition-colors
                        ${requestState === 'serviceA' ? 'bg-blue-600 border-white' : 'bg-slate-800 border-slate-600'}
                    `}>
                        <Server className="text-white" />
                    </div>
                    <span className="text-xs mt-2 font-mono text-blue-300">User Service</span>
                </div>

                <div className="absolute right-1/4 bottom-8 flex flex-col items-center z-10">
                    <div className={`w-16 h-16 border-2 rounded-lg flex items-center justify-center transition-colors
                        ${requestState === 'serviceB' ? 'bg-purple-600 border-white' : 'bg-slate-800 border-slate-600'}
                    `}>
                        <Box className="text-white" />
                    </div>
                    <span className="text-xs mt-2 font-mono text-purple-300">Order Service</span>
                </div>

                {/* Database */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <div className={`w-14 h-14 border rounded-full flex items-center justify-center transition-colors
                        ${requestState === 'db' ? 'bg-emerald-600 border-emerald-400 animate-pulse' : 'bg-slate-900 border-slate-700'}
                   `}>
                        <Database className="text-slate-300" size={20} />
                    </div>
                </div>

                {/* Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Client -> Gateway */}
                    <line x1="80" y1="128" x2="33%" y2="128" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />

                    {/* Gateway -> Service A (Users) */}
                    <path d="M 43% 128 C 50% 128, 60% 64, 75% 64" fill="none" stroke="#334155" strokeWidth="2" />

                    {/* Gateway -> Service B (Orders) */}
                    <path d="M 43% 128 C 50% 128, 60% 192, 75% 192" fill="none" stroke="#334155" strokeWidth="2" />

                    {/* Services -> DB */}
                    <line x1="81%" y1="64" x2="90%" y2="128" stroke="#334155" strokeWidth="1" />
                    <line x1="81%" y1="192" x2="90%" y2="128" stroke="#334155" strokeWidth="1" />
                </svg>

                {/* Moving Packet */}
                <AnimatePresence>
                    {requestState !== 'idle' && requestState !== 'return' && (
                        <motion.div
                            className="absolute z-20 w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                            initial={{ top: '50%', left: '40px' }}
                            animate={{
                                top: requestState === 'serviceA' ? '25%' :
                                    requestState === 'serviceB' ? '75%' :
                                        requestState === 'db' ? '50%' : '50%',
                                left: requestState === 'gateway' ? '33%' :
                                    requestState.startsWith('service') ? '75%' :
                                        requestState === 'db' ? '93%' : '33%'
                            }}
                            transition={{ duration: 1 }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Log Console */}
            <div className="mt-4 bg-black/50 p-4 rounded-lg h-32 overflow-y-auto font-mono text-xs border border-white/10">
                {log.map((entry, i) => (
                    <div key={i} className={`mb-1 ${entry.includes('✓') ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {entry}
                    </div>
                ))}
            </div>
        </div>
    );
};
