import React from 'react';
import { useDailyQuests } from '../../hooks/useDailyQuests';
import { CheckCircle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export const DailyQuests: React.FC = () => {
    const { quests } = useDailyQuests();

    return (
        <div className="bg-slate-900/50 border border-white/5 rounded-xl p-4 mt-6">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Trophy className="text-yellow-500" size={16} /> Daily Quests
            </h3>
            <div className="space-y-3">
                {quests.map((quest) => (
                    <div key={quest.id} className="relative">
                        <div className="flex justify-between items-center text-xs mb-1">
                            <span className={`font-medium ${quest.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                                {quest.text}
                            </span>
                            <span className="text-yellow-500 font-bold">+{quest.xpReward} XP</span>
                        </div>

                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-1">
                            <motion.div
                                className={`h-full ${quest.completed ? 'bg-green-500' : 'bg-blue-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${(quest.progress / quest.goal) * 100}%` }}
                            />
                        </div>

                        {quest.completed && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-0 right-0 -mr-2 -mt-2 bg-green-500 text-black p-0.5 rounded-full"
                            >
                                <CheckCircle size={10} />
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
            <div className="text-[10px] text-slate-600 text-center mt-3">
                Resets at Midnight
            </div>
        </div>
    );
};
