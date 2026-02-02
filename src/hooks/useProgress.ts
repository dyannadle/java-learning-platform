import { useState, useEffect } from 'react';

const STORAGE_KEY = 'java-learning-progress';

export const useProgress = () => {
    const [completedModules, setCompletedModules] = useState<number[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Failed to load progress", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completedModules));
    }, [completedModules]);

    const markComplete = (moduleId: number) => {
        setCompletedModules(prev => {
            if (prev.includes(moduleId)) return prev;
            return [...prev, moduleId];
        });
    };

    const isCompleted = (moduleId: number) => completedModules.includes(moduleId);

    // Simple logic: Module N is locked unless Module N-1 is complete
    // Module 1 is always unlocked.
    const isLocked = (moduleId: number) => {
        if (moduleId === 1) return false;
        return !completedModules.includes(moduleId - 1);
    };

    const resetProgress = () => {
        setCompletedModules([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        completedModules,
        markComplete,
        isCompleted,
        isLocked,
        resetProgress
    };
};
