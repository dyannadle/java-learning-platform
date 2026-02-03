import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import Confetti from 'react-confetti';

// Simple hook for window size to avoid installed dependency if not present
const useSimpleWindowSize = () => {
    const [size, setSize] = React.useState({ width: window.innerWidth, height: window.innerHeight });
    React.useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return size;
};

interface LevelUpModalProps {
    isOpen: boolean;
    level: number;
    onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ isOpen, level, onClose }) => {
    const { width, height } = useSimpleWindowSize();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Confetti width={width} height={height} recycle={false} numberOfPieces={500} gravity={0.15} />

            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-[#1a1b26] border-2 border-yellow-500/50 rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_0_50px_-12px_rgba(234,179,8,0.5)]"
            >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/40 border-4 border-[#1a1b26]">
                        <Trophy size={48} className="text-white" fill="currentColor" />
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 mb-2">
                        LEVEL UP!
                    </h2>
                    <p className="text-slate-400 text-lg mb-6">
                        You've reached <span className="text-white font-bold">Level {level}</span>
                    </p>

                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3].map(i => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + (i * 0.2) }}
                            >
                                <Star className="text-yellow-400" fill="currentColor" size={24} />
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-black font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                    >
                        Awesome!
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
