import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export interface UserStats {
    xp: number;
    level: number;
    current_streak: number;
}

export const useGamification = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<UserStats>({ xp: 0, level: 1, current_streak: 0 });
    const [loading, setLoading] = useState(true);
    const [showLevelUp, setShowLevelUp] = useState(false);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchStats = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('xp, level, current_streak')
                    .eq('id', user.id)
                    .single();

                if (error) throw error;
                if (data) setStats(data);
            } catch (error) {
                console.error('Error fetching gamification stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();

        // Subscribe to real-time changes
        const subscription = supabase
            .channel('public:profiles')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'profiles',
                filter: `id=eq.${user.id}`
            }, (payload) => {
                const newStats = payload.new as UserStats;
                // Check for level up
                if (newStats.level > stats.level) {
                    setShowLevelUp(true);
                }
                setStats(newStats);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [user, stats.level]);

    const addXP = async (amount: number) => {
        if (!user) return; // Guest mode - maybe store in local storage later?

        const newXP = stats.xp + amount;
        // Level logic: Level = 1 + floor(sqrt(XP / 50))
        // Example: 0xp=Lvl1, 50xp=Lvl2, 200xp=Lvl3, 450xp=Lvl4
        const newLevel = 1 + Math.floor(Math.sqrt(newXP / 50));

        const updates: any = {
            xp: newXP,
            last_activity_date: new Date().toISOString()
        };

        // Only update level if increased
        if (newLevel > stats.level) {
            updates.level = newLevel;
            // setShowLevelUp(true) handled by realtime sub, but can do here too for instant feedback
        }

        try {
            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;
        } catch (error) {
            console.error('Error adding XP:', error);
            // Optimistic update could happen here
        }
    };

    return {
        stats,
        loading,
        addXP,
        showLevelUp,
        closeLevelUp: () => setShowLevelUp(false)
    };
};
