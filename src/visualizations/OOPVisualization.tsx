import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Box, FileJson, Minus, Plus } from 'lucide-react';

interface Car {
    id: string;
    color: string;
    speed: number;
}

export const OOPVisualization: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [bluePrintColor, setBluePrintColor] = useState('red');

    const createCar = () => {
        const newCar: Car = {
            id: Math.random().toString(36).substr(2, 9),
            color: bluePrintColor,
            speed: 0
        };
        setCars(prev => [...prev, newCar]);
    };

    const removeCar = (id: string) => {
        setCars(prev => prev.filter(c => c.id !== id));
    };

    return (
        <div className="h-full flex flex-col p-6 bg-slate-950/50">

            {/* The Class (Blueprint) */}
            <div className="mb-8 p-6 bg-slate-900 border-2 border-dashed border-blue-500/50 rounded-xl relative">
                <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-blue-400 font-bold text-sm flex items-center gap-2">
                    <FileJson size={16} /> class Car (The Blueprint)
                </div>

                <div className="flex gap-8 items-center">
                    <div className="space-y-2 text-sm font-mono text-slate-300">
                        <div>String color = <span className={cn(
                            "font-bold transition-colors",
                            bluePrintColor === 'red' ? "text-red-400" :
                                bluePrintColor === 'blue' ? "text-blue-400" : "text-green-400"
                        )}>"{bluePrintColor}"</span>;</div>
                        <div>int speed = 0;</div>
                        <div className="text-slate-500">// Methods...</div>
                    </div>

                    <div className="h-12 w-px bg-white/10" />

                    <div className="flex flex-col gap-2">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Configuration</span>
                        <div className="flex gap-2">
                            {['red', 'blue', 'green'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => setBluePrintColor(color)}
                                    className={cn(
                                        "w-6 h-6 rounded-full border-2 transition-all",
                                        bluePrintColor === color ? "border-white scale-110" : "border-transparent opacity-50",
                                        color === 'red' && "bg-red-500",
                                        color === 'blue' && "bg-blue-500",
                                        color === 'green' && "bg-green-500",
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={createCar}
                        className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                    >
                        <Plus size={18} /> new Car();
                    </button>
                </div>
            </div>

            {/* The Objects (Instances) */}
            <div className="flex-1 bg-black/20 rounded-xl border border-white/5 p-4 overflow-y-auto relative">
                <div className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Box size={14} /> Heap Memory (Objects)
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {cars.map(car => (
                            <motion.div
                                key={car.id}
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                className="p-4 rounded-xl bg-slate-800 border border-white/10 group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className="font-mono text-[10px] text-slate-500">@{car.id}</span>
                                    <button
                                        onClick={() => removeCar(car.id)}
                                        className="text-slate-600 hover:text-red-400 transition-colors"
                                    >
                                        <Minus size={14} />
                                    </button>
                                </div>

                                <div className="flex justify-center mb-4">
                                    <CarIcon color={car.color} />
                                </div>

                                <div className="space-y-1 text-xs font-mono text-slate-400">
                                    <div className="flex justify-between">
                                        <span>color:</span>
                                        <span style={{ color: car.color === 'red' ? '#f87171' : car.color === 'blue' ? '#60a5fa' : '#4ade80' }}>
                                            "{car.color}"
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>speed:</span>
                                        <span>{car.speed}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {cars.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 italic">
                        No objects created yet. Click "new Car();"
                    </div>
                )}
            </div>
        </div>
    );
};

const CarIcon = ({ color }: { color: string }) => {
    const fill = color === 'red' ? '#ef4444' : color === 'blue' ? '#3b82f6' : '#22c55e';
    return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 17H20C20.5523 17 21 16.5523 21 16V13H21.5C21.7761 13 22 12.7761 22 12.5V11.5C22 11.2239 21.7761 11 21.5 11H21L19 5H5L3 11H2.5C2.22386 11 2 11.2239 2 11.5V12.5C2 12.7761 2.22386 13 2.5 13H3V16C3 16.5523 3.44772 17 4 17H5M5 17V18C5 18.5523 5.44772 19 6 19H7C7.55228 19 8 18.5523 8 18V17M5 17H8M19 17V18C19 18.5523 18.5523 19 18 19H17C16.4477 19 16 18.5523 16 18V17M19 17H16M16 17H8" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 13H8M16 13H18" stroke={fill} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};
