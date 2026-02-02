import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const STORAGE_KEY = 'java-learning-progress';

export const useProgress = () => {
    const { user } = useAuth();

    // Initialize from LocalStorage first (Instant load)
    const [completedModules, setCompletedModules] = useState<number[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to load progress", e);
            return [];
        }
    });

    // Sync with Cloud when User logs in
    useEffect(() => {
        if (!user) return;

        const syncProgress = async () => {
            // 1. Get Cloud Progress
            const { data: cloudData } = await supabase
                .from('user_progress')
                .select('module_id')
                .eq('user_id', user.id);

            const cloudModules = cloudData?.map(d => d.module_id) || [];

            // 2. Get Local Progress
            const localStored = localStorage.getItem(STORAGE_KEY);
            const localModules: number[] = localStored ? JSON.parse(localStored) : [];

            // 3. Merge (Union)
            const merged = Array.from(new Set([...cloudModules, ...localModules]));

            // 4. Update State & LocalStorage
            setCompletedModules(merged);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));

            // 5. Push any missing local modules to Cloud
            const newForCloud = localModules.filter(m => !cloudModules.includes(m));
            if (newForCloud.length > 0) {
                const inserts = newForCloud.map(mid => ({
                    user_id: user.id,
                    module_id: mid,
                    completed_at: new Date().toISOString()
                }));
                await supabase.from('user_progress').insert(inserts);
            }
        };

        syncProgress();
    }, [user]);

    // Save to LocalStorage & Cloud
    const markComplete = async (moduleId: number) => {
        // Optimistic UI Update
        setCompletedModules(prev => {
            if (prev.includes(moduleId)) return prev;
            const newVal = [...prev, moduleId];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal));
            return newVal;
        });

        // Cloud Update
        if (user) {
            const { error } = await supabase.from('user_progress').insert({
                user_id: user.id,
                module_id: moduleId,
                completed_at: new Date().toISOString()
            });
            if (error && error.code !== '23505') { // Ignore duplicate key errors
                console.error("Failed to save to cloud", error);
            }
        }
    };

    const isCompleted = (moduleId: number) => completedModules.includes(moduleId);

    const isLocked = (moduleId: number) => {
        if (moduleId === 1) return false;
        return !completedModules.includes(moduleId - 1);
    };

    const resetProgress = async () => {
        setCompletedModules([]);
        localStorage.removeItem(STORAGE_KEY);
        if (user) {
            await supabase.from('user_progress').delete().eq('user_id', user.id);
        }
    };

    return {
        completedModules,
        markComplete,
        isCompleted,
        isLocked,
        resetProgress
    };
};
