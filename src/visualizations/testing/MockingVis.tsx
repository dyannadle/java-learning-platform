import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, FileCode, Play, XCircle, ShieldAlert } from 'lucide-react';

export const MockingVis: React.FC = () => {
    const [testState, setTestState] = useState<'idle' | 'running' | 'intercepted' | 'success' | 'failed'>('idle');
    const [isMocked, setIsMocked] = useState(true);
    const [log, setLog] = useState<string[]>([]);

    const runTest = () => {
        setTestState('running');
        setLog(['@Test testFindUser() started...']);

        // Step 1: Service Call
        setTimeout(() => {
            setLog(prev => [...prev, 'userService.findUser(1) called...']);

            // Step 2: Repo Call
            setTimeout(() => {
                if (isMocked) {
                    setTestState('intercepted');
                    setLog(prev => [...prev, '⚠️ INTERCEPTED by Mockito!']);

                    setTimeout(() => {
                        setTestState('success');
                        setLog(prev => [...prev, '✅ Mock returned "Fake User" (No DB call)', '✅ Assertion Passed']);
                    }, 1000);
                } else {
                    setTestState('failed');
                    setLog(prev => [...prev, '❌ Creating Real Database Connection...', '💥 Connection Refused! (No DB in Unit Test)']);
                }
            }, 1500);
        }, 1000);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldAlert className="text-yellow-400" /> Mockito Visualization
            </h3>

            {/* Controls */}
            <div className="flex gap-4 mb-8 bg-slate-800 p-4 rounded-lg items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isMocked}
                        onChange={(e) => setIsMocked(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-500 bg-slate-700 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm font-bold text-slate-300">Use @Mock (Mockito)</span>
                </label>

                <button
                    onClick={runTest}
                    disabled={testState !== 'idle' && testState !== 'success' && testState !== 'failed'}
                    className="ml-auto bg-green-600 hover:bg-green-500 disabled:opacity-50 px-4 py-2 rounded text-sm font-bold flex items-center gap-2"
                >
                    <Play size={16} /> Run Test
                </button>
            </div>

            {/* Visualization Area */}
            <div className="relative flex justify-between items-center mb-8 px-12 h-40 bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden">

                {/* Components */}
                <div className="z-10 flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-900/50 border-2 border-blue-500 rounded-lg flex items-center justify-center">
                        <FileCode className="text-blue-300 w-8 h-8" />
                    </div>
                    <span className="text-xs mt-2 font-mono text-blue-300">UserService</span>
                </div>

                <div className="z-10 flex flex-col items-center relative">
                    <div className={`w-16 h-16 border-2 transition-all duration-300 flex items-center justify-center rounded-lg
                        ${isMocked ? 'bg-yellow-900/50 border-yellow-500' : 'bg-slate-800 border-slate-600 opacity-50'}
                    `}>
                        <ShieldAlert className={`w-8 h-8 ${isMocked ? 'text-yellow-400' : 'text-slate-500'}`} />
                    </div>
                    <span className="text-xs mt-2 font-mono text-yellow-500">
                        {isMocked ? '@Mock Repository' : 'Direct Call'}
                    </span>

                    {/* Intercept Badge */}
                    <AnimatePresence>
                        {testState === 'intercepted' && (
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                className="absolute -top-4 -right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg"
                            >
                                INTERCEPTED
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="z-10 flex flex-col items-center">
                    <div className={`w-16 h-16 border-2 flex items-center justify-center rounded-full transition-colors
                        ${!isMocked ? 'bg-slate-800 border-white' : 'bg-slate-900 border-slate-700 opacity-30'}
                     `}>
                        <Database className="text-slate-300 w-8 h-8" />
                    </div>
                    <span className="text-xs mt-2 font-mono text-slate-500">Real Database</span>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="15%" y1="50%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
                </svg>

                {/* Animated Ball */}
                <AnimatePresence>
                    {(testState === 'running' || testState === 'intercepted') && (
                        <motion.div
                            className="absolute top-1/2 -mt-2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)] z-20"
                            initial={{ left: '15%' }}
                            animate={{ left: '50%' }}
                            transition={{ duration: 1.5, ease: "linear" }}
                        />
                    )}
                    {/* Failure X moving towards DB */}
                    {testState === 'failed' && (
                        <motion.div
                            className="absolute top-1/2 -mt-3 z-20"
                            initial={{ left: '50%', opacity: 1 }}
                            animate={{ left: '80%', opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <XCircle className="text-red-500 w-6 h-6" />
                        </motion.div>
                    )}
                    {/* Success Return */}
                    {testState === 'success' && (
                        <motion.div
                            className="absolute top-1/2 -mt-3 z-20"
                            initial={{ left: '50%' }}
                            animate={{ left: '15%' }}
                            transition={{ duration: 1 }}
                        >
                            <div className="bg-green-500 text-black text-[10px] font-bold px-2 py-1 rounded">Fake Data</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Log Console */}
            <div className="bg-black/50 p-4 rounded-lg h-40 overflow-y-auto font-mono text-xs border border-white/10">
                {log.map((entry, i) => (
                    <div key={i} className={`mb-1 ${entry.includes('❌') || entry.includes('💥') ? 'text-red-400' :
                        entry.includes('✅') ? 'text-emerald-400' :
                            entry.includes('⚠️') ? 'text-yellow-400' : 'text-slate-300'
                        }`}>
                        {entry}
                    </div>
                ))}
                {/* Re-enable button logic workaround by resetting state after delay if needed in real app, here handled manually by user resetting or re-clicking if enabled */}
            </div>

            {testState === 'success' && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded text-center">
                    <h4 className="text-green-400 font-bold text-sm">Test Passed!</h4>
                    <p className="text-xs text-slate-400">The Service logic was tested in isolation. No DB was touched.</p>
                </div>
            )}
            {testState === 'failed' && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-center">
                    <h4 className="text-red-400 font-bold text-sm">Test Failed!</h4>
                    <p className="text-xs text-slate-400">Integration failure. Unit tests should NOT attempt real network connections.</p>
                </div>
            )}
        </div>
    );
};
