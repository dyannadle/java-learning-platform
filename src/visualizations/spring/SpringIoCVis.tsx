import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, ArrowRight, Cog, Database, Globe } from 'lucide-react';

type BeanStatus = 'uninitialized' | 'instantiating' | 'injecting' | 'ready';

interface Bean {
    id: string;
    type: 'Controller' | 'Service' | 'Repository';
    status: BeanStatus;
    dependencies: string[];
}

export const SpringIoCVis: React.FC = () => {
    const [started, setStarted] = useState(false);
    const [beans, setBeans] = useState<Bean[]>([
        { id: 'userRepository', type: 'Repository', status: 'uninitialized', dependencies: [] },
        { id: 'userService', type: 'Service', status: 'uninitialized', dependencies: ['userRepository'] },
        { id: 'userController', type: 'Controller', status: 'uninitialized', dependencies: ['userService'] }
    ]);

    const startContext = () => {
        setStarted(true);
        // Reset
        setBeans(prev => prev.map(b => ({ ...b, status: 'uninitialized' })));

        // Visualize IoC Sequence
        const sequence = async () => {
            // Level 1: Repository (No deps)
            await animateBean('userRepository');
            // Level 2: Service (Depends on Repo)
            await animateBean('userService');
            // Level 3: Controller (Depends on Service)
            await animateBean('userController');
        };
        sequence();
    };

    const animateBean = (id: string) => new Promise<void>(resolve => {
        setBeans(prev => prev.map(b => b.id === id ? { ...b, status: 'instantiating' } : b));

        setTimeout(() => {
            setBeans(prev => prev.map(b => b.id === id ? { ...b, status: 'injecting' } : b));
            setTimeout(() => {
                setBeans(prev => prev.map(b => b.id === id ? { ...b, status: 'ready' } : b));
                resolve();
            }, 1000);
        }, 1000);
    });

    return (
        <div className="p-6 bg-slate-900/50 rounded-xl border border-white/5 h-[450px] relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-green-400 flex items-center gap-2">
                        <Box size={20} /> Spring ApplicationContext
                    </h3>
                    <p className="text-xs text-slate-400">The IoC Container manages bean lifecycle & wiring.</p>
                </div>
                <button
                    onClick={startContext}
                    disabled={started && beans.some(b => b.status !== 'ready' && b.status !== 'uninitialized')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {started ? 'Restart Context' : 'Start Application'}
                </button>
            </div>

            <div className="flex-1 flex flex-col-reverse justify-around items-center relative gap-4">
                {/* Wiring Lines would go here typically, simplified for responsiveness */}

                {beans.map((bean, index) => (
                    <div key={bean.id} className="w-full max-w-md relative">
                        <motion.div
                            initial={false}
                            animate={{
                                scale: bean.status === 'instantiating' ? 1.1 : 1,
                                opacity: bean.status === 'uninitialized' ? 0.3 : 1
                            }}
                            className={`p-4 rounded-xl border-2 flex items-center justify-between transition-colors duration-500 ${bean.status === 'ready' ? 'bg-slate-800 border-green-500/50' :
                                    bean.status === 'injecting' ? 'bg-slate-800 border-blue-500/50' :
                                        'bg-slate-900 border-dashed border-slate-700'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${bean.type === 'Controller' ? 'bg-purple-900/50 text-purple-400' :
                                        bean.type === 'Service' ? 'bg-blue-900/50 text-blue-400' :
                                            'bg-orange-900/50 text-orange-400'
                                    }`}>
                                    {bean.type === 'Controller' && <Globe size={20} />}
                                    {bean.type === 'Service' && <Cog size={20} />}
                                    {bean.type === 'Repository' && <Database size={20} />}
                                </div>
                                <div>
                                    <div className="font-mono text-sm font-bold text-slate-200">
                                        @{bean.type} {bean.id}
                                    </div>
                                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                                        {bean.status}
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {bean.status === 'injecting' && (
                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-xs text-blue-400 font-mono flex items-center gap-1"
                                    >
                                        <ArrowRight size={12} /> @Autowired
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Dependency Pointer */}
                        {bean.dependencies.length > 0 && bean.status === 'ready' && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: 20 }}
                                className="absolute left-8 top-full w-0.5 bg-slate-600 mx-auto"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
