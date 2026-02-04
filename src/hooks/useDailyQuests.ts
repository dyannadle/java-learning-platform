import { useState, useEffect } from 'react';
import { useGamification } from './useGamification';

export interface Quest {
    id: string;
    text: string;
    goal: number;
    progress: number;
    completed: boolean;
    xpReward: number;
    type: 'xp' | 'module' | 'login';
}

const QUEST_TEMPLATES = [
    { id: 'daily_xp', text: 'Earn 100 XP', goal: 100, xpReward: 50, type: 'xp' },
    { id: 'daily_module', text: 'Complete 1 Module', goal: 1, xpReward: 100, type: 'module' },
    { id: 'daily_login', text: 'Login to the Platform', goal: 1, xpReward: 20, type: 'login' }, // Auto-completes
];

const STORAGE_KEY = 'java-mastery-daily-quests';

export const useDailyQuests = () => {
    const { addXP } = useGamification();
    const [quests, setQuests] = useState<Quest[]>([]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const stored = localStorage.getItem(STORAGE_KEY);

        let dailyData = stored ? JSON.parse(stored) : null;

        // If no data or data is from a different day, generate new quests
        if (!dailyData || dailyData.date !== today) {
            const newQuests: Quest[] = QUEST_TEMPLATES.map(t => ({
                ...t,
                progress: t.type === 'login' ? 1 : 0,
                completed: t.type === 'login',
                // cast string to literal type to fix TS error if needed, but here it matches
                type: t.type as 'xp' | 'module' | 'login'
            }));

            dailyData = { date: today, quests: newQuests };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dailyData));
        }

        setQuests(dailyData.quests);
    }, []);

    const updateProgress = (type: 'xp' | 'module', amount: number) => {
        setQuests(prev => {
            const newQuests = prev.map(q => {
                if (q.type !== type || q.completed) return q;

                const newProgress = Math.min(q.progress + amount, q.goal);
                const isJustCompleted = newProgress >= q.goal && !q.completed;

                if (isJustCompleted) {
                    addXP(q.xpReward); // Claim Reward
                }

                return {
                    ...q,
                    progress: newProgress,
                    completed: newProgress >= q.goal
                };
            });

            // Persist
            const today = new Date().toISOString().split('T')[0];
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, quests: newQuests }));

            return newQuests;
        });
    };

    return { quests, updateProgress };
};
