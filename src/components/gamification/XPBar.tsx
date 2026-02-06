import React from 'react';
import { motion } from 'framer-motion';
import { useGamification } from '../../hooks/useGamification';
import { Zap, Trophy } from 'lucide-react';

interface XPBarProps {
    isCollapsed: boolean;
}

export const XPBar: React.FC<XPBarProps> = ({ isCollapsed }) => {
    const { stats, loading } = useGamification();

    if (loading) return null;

    // Level Math: Level 1 = 0-49 XP, Level 2 = 50-199 XP...
    // Previous Level Threshold calculation is needed to show progress BAR percentage relative to current level
    const currentLevel = stats.level;
    const nextLevel = currentLevel + 1;

    // Inverse formula: XP = 50 * (Level - 1)^2
    const xpForCurrentLevel = 50 * Math.pow(currentLevel - 1, 2);
    const xpForNextLevel = 50 * Math.pow(nextLevel - 1, 2);

    const xpInThisLevel = stats.xp - xpForCurrentLevel;
    const xpNeededForNextLevel = xpForNextLevel - xpForCurrentLevel;

    const progress = Math.min(100, Math.max(0, (xpInThisLevel / xpNeededForNextLevel) * 100));

    if (isCollapsed) {
        return (
            <div className="flex flex-col items-center gap-1 p-2 bg-slate-800/50 hidden">
                {/* Simplified view could go here, but hiding for now to keep sidebar clean */}
            </div>
        );
    }

    return (
        <div className="mx-3 mt-4 mb-2 p-3 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-white/5 shadow-lg relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="flex items-center gap-2 pt-2">
                    <div className="bg-yellow-500/20 p-1.5 rounded-lg text-yellow-500">
                        <Trophy size={14} fill="currentColor" />
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Level</div>
                        <div className="text-xl font-bold text-white leading-none">{stats.level}</div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1 bg-black/40 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-bold text-orange-400 border border-orange-500/20">
                        <Zap size={10} fill="currentColor" />
                        {stats.current_streak} Day Streak
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total XP</div>
                        <div className="text-sm font-mono text-yellow-400 font-bold">{stats.xp.toLocaleString()}</div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden relative">
                <motion.div
                    className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>

            <div className="flex justify-between mt-1 text-[9px] text-slate-500 font-medium">
                <span>{Math.floor(xpInThisLevel)} XP</span>
                <span>{Math.floor(xpNeededForNextLevel)} XP</span>
            </div>
        </div>
    );
};
