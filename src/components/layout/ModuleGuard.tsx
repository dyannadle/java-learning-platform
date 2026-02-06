import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';

interface ModuleGuardProps {
    moduleId: number;
    children: React.ReactNode;
}

export const ModuleGuard: React.FC<ModuleGuardProps> = ({ moduleId, children }) => {
    const { isLocked } = useProgress();
    const navigate = useNavigate();
    const locked = isLocked(moduleId);

    useEffect(() => {
        if (locked) {
            // Optional: You could add a toast notification here
            console.warn(`Module ${moduleId} is locked. Redirecting to /learn`);
            navigate('/learn', { replace: true });
        }
    }, [locked, moduleId, navigate]);

    if (locked) {
        return null; // Don't render anything while redirecting
    }

    return <>{children}</>;
};
