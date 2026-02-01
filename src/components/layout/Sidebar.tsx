import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BookOpen,
    Code2,
    Compass,
    Home,
    Layout,
    Settings,
    ChevronLeft,
    GraduationCap
} from 'lucide-react';
import { NavItem } from './NavItem';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

export const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <motion.div
            className={cn(
                "h-screen sticky top-0 bg-slate-900/50 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-300 z-40",
                isCollapsed ? "w-20" : "w-64"
            )}
            initial={false}
            animate={{ width: isCollapsed ? 80 : 256 }}
        >
            {/* Logo */}
            <div className="p-6 flex items-center gap-3 border-b border-white/5 h-20">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
                    <Code2 className="text-white" size={20} />
                </div>
                {!isCollapsed && (
                    <Link to="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 whitespace-nowrap">
                        JavaMastery
                    </Link>
                )}
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-800">
                <div className="mb-6">
                    {!isCollapsed && (
                        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Platform
                        </h3>
                    )}
                    <NavItem to="/" icon={Home} label="Home" isCollapsed={isCollapsed} />
                    <NavItem to="/learn" icon={BookOpen} label="Learning Path" isCollapsed={isCollapsed} />
                    <NavItem to="/projects" icon={Layout} label="Projects" isCollapsed={isCollapsed} />
                    <NavItem to="/playground" icon={Code2} label="Code Playground" isCollapsed={isCollapsed} />
                </div>

                <div>
                    {!isCollapsed && (
                        <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Resources
                        </h3>
                    )}
                    <NavItem to="/roadmap" icon={Compass} label="Roadmap" isCollapsed={isCollapsed} />
                    <NavItem to="/glossary" icon={GraduationCap} label="Glossary" isCollapsed={isCollapsed} />
                </div>
            </div>

            {/* Footer / Toggle */}
            <div className="p-3 border-t border-white/5">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-colors"
                >
                    {isCollapsed ? <Settings size={20} /> : (
                        <div className="flex items-center gap-3 w-full px-1">
                            <Settings size={20} />
                            <span className="font-medium">Settings</span>
                            <ChevronLeft className="ml-auto" size={16} />
                        </div>
                    )}
                </button>
            </div>
        </motion.div>
    );
};
