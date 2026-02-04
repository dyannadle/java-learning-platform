import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Lock, User, AlertTriangle, CheckCircle } from 'lucide-react';

type LockType = 'OPTIMISTIC' | 'PESSIMISTIC';
type TxStatus = 'IDLE' | 'READING' | 'LOCKED' | 'UPDATING' | 'COMMITTED' | 'FAILED' | 'WAITING';

export const LockingVis: React.FC = () => {
    const [mode, setMode] = useState<LockType>('OPTIMISTIC');
    const [rowVersion, setRowVersion] = useState(1);

    // Transaction States
    const [tx1, setTx1] = useState<{ status: TxStatus, version: number | null }>({ status: 'IDLE', version: null });
    const [tx2, setTx2] = useState<{ status: TxStatus, version: number | null }>({ status: 'IDLE', version: null });
    const [dbLock, setDbLock] = useState<'TX1' | 'TX2' | null>(null);

    const reset = () => {
        setTx1({ status: 'IDLE', version: null });
        setTx2({ status: 'IDLE', version: null });
        setDbLock(null);
        setRowVersion(prev => prev + 1);
    };

    const handleRead = (tx: 1 | 2) => {
        const setTx = tx === 1 ? setTx1 : setTx2;

        if (mode === 'PESSIMISTIC') {
            if (dbLock && dbLock !== (tx === 1 ? 'TX1' : 'TX2')) {
                setTx(prev => ({ ...prev, status: 'WAITING' }));
                return;
            }
            setDbLock(tx === 1 ? 'TX1' : 'TX2');
            setTx({ status: 'LOCKED', version: rowVersion });
        } else {
            setTx({ status: 'READING', version: rowVersion });
        }
    };

    const handleWrite = (tx: 1 | 2) => {
        const setTx = tx === 1 ? setTx1 : setTx2;
        const currentTx = tx === 1 ? tx1 : tx2;

        if (mode === 'PESSIMISTIC') {
            // Already locked, just commit
            setRowVersion(prev => prev + 1);
            setTx({ ...currentTx, status: 'COMMITTED' });
            setDbLock(null);

            // Wake up waiting thread (simple simulation)
            if (tx === 1 && tx2.status === 'WAITING') handleRead(2);
            if (tx === 2 && tx1.status === 'WAITING') handleRead(1);
        } else {
            // Optimistic Check
            if (currentTx.version === rowVersion) {
                setRowVersion(prev => prev + 1);
                setTx({ ...currentTx, status: 'COMMITTED' });
            } else {
                setTx({ ...currentTx, status: 'FAILED' });
            }
        }
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <Database className="text-blue-400" /> Database Transactions
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => { setMode('OPTIMISTIC'); reset(); }}
                        className={`px-3 py-1 rounded text-xs font-bold ${mode === 'OPTIMISTIC' ? 'bg-blue-600' : 'bg-slate-800'}`}
                    >
                        Optimistic (@Version)
                    </button>
                    <button
                        onClick={() => { setMode('PESSIMISTIC'); reset(); }}
                        className={`px-3 py-1 rounded text-xs font-bold ${mode === 'PESSIMISTIC' ? 'bg-blue-600' : 'bg-slate-800'}`}
                    >
                        Pessimistic (Select For Update)
                    </button>
                </div>
            </h3>

            {/* DB Row */}
            <div className="mb-8 flex justify-center">
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-600 w-64 text-center relative">
                    <div className="text-xs text-slate-400 mb-1">TABLE: INVENTORY</div>
                    <div className="font-mono text-lg font-bold">Item: "PS5" | Qty: 1</div>
                    <div className="text-xs text-yellow-500 mt-1 font-mono">Row Version: v{rowVersion}</div>

                    {dbLock && (
                        <motion.div
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="absolute -top-3 -right-3 bg-red-600 p-2 rounded-full shadow-lg border border-red-400"
                        >
                            <Lock size={16} />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Transactions Area */}
            <div className="grid grid-cols-2 gap-8">
                {/* TX 1 */}
                <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 font-bold text-blue-400">
                        <User size={20} /> Transaction 1
                    </div>

                    <div className="h-20 flex items-center justify-center w-full">
                        {tx1.status === 'IDLE' && <span className="text-slate-600 text-sm">Waiting to start...</span>}
                        {tx1.status === 'READING' && <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded text-xs">Read v{tx1.version}</span>}
                        {tx1.status === 'LOCKED' && <span className="bg-red-900/50 text-red-300 px-3 py-1 rounded text-xs flex items-center gap-1"><Lock size={12} /> Locked Row</span>}
                        {tx1.status === 'WAITING' && <span className="bg-yellow-900/50 text-yellow-300 px-3 py-1 rounded text-xs animate-pulse">Waiting for Lock...</span>}
                        {tx1.status === 'COMMITTED' && <span className="text-green-500 flex items-center gap-1"><CheckCircle size={16} /> Success</span>}
                        {tx1.status === 'FAILED' && <span className="text-red-500 flex items-center gap-1"><AlertTriangle size={16} /> StaleObjectException!</span>}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => handleRead(1)} disabled={tx1.status !== 'IDLE'}
                            className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 px-3 py-1 rounded text-xs"
                        >
                            Select
                        </button>
                        <button
                            onClick={() => handleWrite(1)} disabled={!['READING', 'LOCKED'].includes(tx1.status)}
                            className="bg-green-700 hover:bg-green-600 disabled:opacity-50 px-3 py-1 rounded text-xs"
                        >
                            Update
                        </button>
                    </div>
                </div>

                {/* TX 2 */}
                <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 font-bold text-purple-400">
                        <User size={20} /> Transaction 2
                    </div>

                    <div className="h-20 flex items-center justify-center w-full">
                        {tx2.status === 'IDLE' && <span className="text-slate-600 text-sm">Waiting to start...</span>}
                        {tx2.status === 'READING' && <span className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded text-xs">Read v{tx2.version}</span>}
                        {tx2.status === 'LOCKED' && <span className="bg-red-900/50 text-red-300 px-3 py-1 rounded text-xs flex items-center gap-1"><Lock size={12} /> Locked Row</span>}
                        {tx2.status === 'WAITING' && <span className="bg-yellow-900/50 text-yellow-300 px-3 py-1 rounded text-xs animate-pulse">Waiting for Lock...</span>}
                        {tx2.status === 'COMMITTED' && <span className="text-green-500 flex items-center gap-1"><CheckCircle size={16} /> Success</span>}
                        {tx2.status === 'FAILED' && <span className="text-red-500 flex items-center gap-1"><AlertTriangle size={16} /> StaleObjectException!</span>}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => handleRead(2)} disabled={tx2.status !== 'IDLE'}
                            className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 px-3 py-1 rounded text-xs"
                        >
                            Select
                        </button>
                        <button
                            onClick={() => handleWrite(2)} disabled={!['READING', 'LOCKED'].includes(tx2.status)}
                            className="bg-green-700 hover:bg-green-600 disabled:opacity-50 px-3 py-1 rounded text-xs"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                <button onClick={reset} className="text-xs text-slate-500 hover:text-white underline">Reset Simulation</button>
            </div>
        </div>
    );
};
