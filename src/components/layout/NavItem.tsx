import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
    to: string;
    icon: LucideIcon;
    label: string;
    isCollapsed?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isCollapsed }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    "relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group hover:bg-white/5",
                    isActive ? "text-blue-400 bg-blue-500/10" : "text-slate-400 hover:text-slate-200"
                )
            }
        >
            {({ isActive }) => (
                <>
                    {isActive && (
                        <motion.div
                            layoutId="nav-active"
                            className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    )}
                    <Icon size={20} className={cn("min-w-[20px]", isActive && "text-blue-400")} />
                    {!isCollapsed && (
                        <span className="font-medium whitespace-nowrap overflow-hidden transition-all duration-300">
                            {label}
                        </span>
                    )}
                    {isCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 border border-slate-700">
                            {label}
                        </div>
                    )}
                </>
            )}
        </NavLink>
    );
};
