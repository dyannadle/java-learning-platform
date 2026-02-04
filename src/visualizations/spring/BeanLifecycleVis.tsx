import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Box, ArrowDown, Settings, ShieldCheck, CheckCircle } from 'lucide-react';

const STAGES = [
    { id: 'instantiation', label: '1. Instantiation', desc: 'Java calls "new Bean()". Contructor runs.', icon: Box },
    { id: 'populate', label: '2. Populate Properties', desc: 'Spring injects @Autowired dependencies.', icon: ArrowDown },
    { id: 'aware', label: '3. Aware Interfaces', desc: 'BeanNameAware, BeanFactoryAware setter calls.', icon: Settings },
    { id: 'bpp_before', label: '4. BPP (Before)', desc: 'BeanPostProcessor.postProcessBeforeInitialization()', icon: Settings },
    { id: 'init', label: '5. Initialization', desc: '@PostConstruct methods run.', icon: Play },
    { id: 'bpp_after', label: '6. BPP (After)', desc: 'Proxies created here (AOP, Transactions).', icon: ShieldCheck },
    { id: 'ready', label: '7. Ready', desc: 'Bean is in the ApplicationContext.', icon: CheckCircle },
];

export const BeanLifecycleVis: React.FC = () => {
    const [currentStage, setCurrentStage] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning && currentStage < STAGES.length - 1) {
            const timer = setTimeout(() => {
                setCurrentStage(prev => prev + 1);
            }, 2000);
            return () => clearTimeout(timer);
        } else if (currentStage === STAGES.length - 1) {
            setIsRunning(false);
        }
    }, [isRunning, currentStage]);

    const reset = () => {
        setCurrentStage(0);
        setIsRunning(false);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Box className="text-green-400" /> Spring Bean Lifecycle
            </h3>

            {/* Controls */}
            <div className="flex gap-4 mb-8 justify-center">
                <button
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning || currentStage === STAGES.length - 1}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 px-4 py-2 rounded text-sm font-bold"
                >
                    <Play size={14} /> Start Lifecycle
                </button>
                <button
                    onClick={reset}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-sm font-bold"
                >
                    <RotateCcw size={14} /> Reset
                </button>
            </div>

            {/* Flow */}
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[29px] top-6 bottom-6 w-1 bg-slate-800 z-0"></div>

                <div className="flex flex-col gap-4">
                    {STAGES.map((stage, index) => {
                        const isActive = index === currentStage;
                        const isPast = index < currentStage;
                        const Icon = stage.icon;

                        return (
                            <motion.div
                                key={stage.id}
                                animate={{ opacity: isPast || isActive ? 1 : 0.3, scale: isActive ? 1.05 : 1 }}
                                className={`relative z-10 flex items-center gap-4 p-3 rounded-lg border transition-colors ${isActive ? 'bg-slate-800 border-green-500' : 'bg-slate-900 border-transparent'}`}
                            >
                                <div className={`w-15 h-15 flex items-center justify-center rounded-full border-4 ${isActive ? 'border-green-500 bg-slate-800' : isPast ? 'border-green-800 bg-green-900/20' : 'border-slate-700 bg-slate-900'} w-14 h-14 shrink-0`}>
                                    <Icon size={24} className={isActive ? 'text-green-400' : isPast ? 'text-green-700' : 'text-slate-600'} />
                                </div>

                                <div>
                                    <h4 className={`font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>{stage.label}</h4>
                                    <p className="text-xs text-slate-500">{stage.desc}</p>
                                </div>

                                {isActive && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute right-4 text-xs font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded"
                                    >
                                        PROCESSING...
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
