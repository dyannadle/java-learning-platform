import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Wallet, Bitcoin, CheckCircle } from 'lucide-react';

type PaymentMethod = 'CreditCard' | 'PayPal' | 'Crypto';

export const StrategyVis: React.FC = () => {
    const [strategy, setStrategy] = useState<PaymentMethod>('CreditCard');
    const [status, setStatus] = useState<'idle' | 'processing' | 'paid'>('idle');

    const pay = () => {
        setStatus('processing');
        setTimeout(() => {
            setStatus('paid');
            setTimeout(() => setStatus('idle'), 2000);
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-900/50 rounded-xl border border-white/5 h-[400px]">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">PaymentContext.pay(100)</h3>
                <div className="flex bg-slate-800 rounded-lg p-1">
                    {(['CreditCard', 'PayPal', 'Crypto'] as PaymentMethod[]).map(m => (
                        <button
                            key={m}
                            onClick={() => setStrategy(m)}
                            disabled={status !== 'idle'}
                            className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-2 transition-all ${strategy === m ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {m === 'CreditCard' && <CreditCard size={14} />}
                            {m === 'PayPal' && <Wallet size={14} />}
                            {m === 'Crypto' && <Bitcoin size={14} />}
                            {m}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-between relative px-10">
                {/* Context / User */}
                <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-500">
                        <span className="font-bold text-slate-300">$100</span>
                    </div>
                    <div className="text-xs font-mono text-slate-500">Checkout</div>
                </div>

                {/* Flow Animation */}
                <div className="flex-1 h-2 bg-slate-800 relative mx-4 rounded overflow-hidden">
                    {status === 'processing' && (
                        <motion.div
                            layoutId="payment-flow"
                            className="absolute top-0 bottom-0 w-1/3 bg-blue-500 blur-sm"
                            initial={{ x: '-100%' }}
                            animate={{ x: '400%' }}
                            transition={{ duration: 1.5, ease: "linear" }}
                        />
                    )}
                </div>

                {/* Strategy Execution */}
                <div className="flex flex-col items-center gap-2 w-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={strategy}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-2 shadow-xl ${strategy === 'CreditCard' ? 'bg-purple-900/50 border-purple-500' :
                                strategy === 'PayPal' ? 'bg-blue-900/50 border-blue-500' :
                                    'bg-orange-900/50 border-orange-500'
                                }`}
                        >
                            {strategy === 'CreditCard' && <CreditCard size={32} className="text-purple-400" />}
                            {strategy === 'PayPal' && <Wallet size={32} className="text-blue-400" />}
                            {strategy === 'Crypto' && <Bitcoin size={32} className="text-orange-400" />}

                            {status === 'paid' && (
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-emerald-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"
                                >
                                    <CheckCircle size={10} /> Paid
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                    <div className="text-xs font-mono text-slate-400">
                        {strategy}Strategy.execute()
                    </div>
                </div>
            </div>

            <button
                onClick={pay}
                disabled={status !== 'idle'}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 font-bold rounded-xl disabled:opacity-50 active:scale-95 transition-all"
            >
                {status === 'idle' ? 'Process Payment' : status === 'processing' ? 'Processing...' : 'Success!'}
            </button>
        </div>
    );
};
