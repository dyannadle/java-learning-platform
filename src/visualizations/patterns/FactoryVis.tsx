import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, Car, Bike, Truck, Package } from 'lucide-react';

type VehicleType = 'Car' | 'Bike' | 'Truck';

export const FactoryVis: React.FC = () => {
    const [selectedType, setSelectedType] = useState<VehicleType>('Car');
    const [isProducing, setIsProducing] = useState(false);
    const [product, setProduct] = useState<{ type: VehicleType; id: number } | null>(null);

    const handleOrder = () => {
        setIsProducing(true);
        setProduct(null);

        setTimeout(() => {
            setProduct({ type: selectedType, id: Date.now() });
            setIsProducing(false);
        }, 1200);
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-slate-900/50 rounded-xl border border-white/5 min-h-[400px]">
            <div className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                    <span className="text-slate-300 font-medium">Vehicle Type:</span>
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-white/5">
                        {(['Car', 'Bike', 'Truck'] as VehicleType[]).map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${selectedType === type
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleOrder}
                    disabled={isProducing}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all"
                >
                    {isProducing ? 'Manufacturing...' : 'Order Vehicle'}
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-slate-950/50 rounded-xl border border-white/5">
                {/* Factory Building */}
                <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                        animate={isProducing ? { scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] } : {}}
                        transition={{ repeat: isProducing ? Infinity : 0, duration: 0.2 }}
                        className="w-32 h-32 bg-slate-800 rounded-lg flex items-center justify-center border-4 border-slate-700 shadow-2xl"
                    >
                        <Factory size={64} className={isProducing ? "text-yellow-400" : "text-slate-500"} />
                    </motion.div>
                    <div className="mt-2 font-mono text-xs text-slate-500">VehicleFactory.create("{selectedType}")</div>
                </div>

                {/* Conveyor Belt Inputs */}
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    animate={isProducing ? { x: 0, opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-10 flex gap-2"
                >
                    <Package className="text-slate-600" />
                    <Package className="text-slate-600" />
                </motion.div>

                {/* Output Product */}
                <AnimatePresence>
                    {product && !isProducing && (
                        <motion.div
                            initial={{ x: 0, scale: 0.5, opacity: 0 }}
                            animate={{ x: 150, scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="absolute z-20"
                        >
                            <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.5)] border border-white/20 flex flex-col items-center gap-2">
                                {product.type === 'Car' && <Car size={40} className="text-white" />}
                                {product.type === 'Bike' && <Bike size={40} className="text-white" />}
                                {product.type === 'Truck' && <Truck size={40} className="text-white" />}
                                <span className="text-xs font-bold text-white uppercase tracking-wider">{product.type}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
