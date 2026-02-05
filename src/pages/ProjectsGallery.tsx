import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { ChevronRight, Star, Filter, Code, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PROJECTS, type Difficulty } from '../data/projects';

export const ProjectsGallery: React.FC = () => {
    const [difficulty, setDifficulty] = useState<Difficulty>('All');
    const [selectedTech, setSelectedTech] = useState<string>('All');

    // Extract unique technologies dynamically
    const allTech = useMemo(() => {
        const techs = new Set<string>();
        PROJECTS.forEach(p => p.tech.forEach(t => techs.add(t)));
        return ['All', ...Array.from(techs).sort()];
    }, []);

    const filteredProjects = PROJECTS.filter(p => {
        const matchDiff = difficulty === 'All' || p.difficulty === difficulty;
        const matchTech = selectedTech === 'All' || p.tech.includes(selectedTech);
        return matchDiff && matchTech;
    });

    const featuredProject = PROJECTS.find(p => p.difficulty === 'Advanced') || PROJECTS[0];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900 rounded-3xl p-8 border border-white/10 overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <featuredProject.icon size={300} />
                </div>
                <div className="relative z-10 max-w-2xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-bold uppercase tracking-wider">
                        <Star size={12} fill="currentColor" /> Featured Project
                    </div>
                    <h1 className="text-5xl font-bold text-white tracking-tight">
                        {featuredProject.title}
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed">
                        {featuredProject.longDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {featuredProject.tech.map(t => (
                            <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-300 border border-white/5">
                                {t}
                            </span>
                        ))}
                    </div>
                    <Link
                        to={`/projects/${featuredProject.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
                    >
                        Start Building <ChevronRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-slate-900/50 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider">
                        <Filter size={16} /> Difficulty
                    </div>
                    <div className="flex gap-1 p-1 bg-black/20 rounded-lg">
                        {(['All', 'Beginner', 'Intermediate', 'Advanced'] as Difficulty[]).map((level) => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={cn(
                                    "px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                                    difficulty === level
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                )}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-wider">
                        <Code size={16} /> Tech Stack
                    </div>
                    <select
                        value={selectedTech}
                        onChange={(e) => setSelectedTech(e.target.value)}
                        className="bg-black/20 text-slate-300 text-sm rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:border-blue-500 hover:bg-black/40 transition-colors cursor-pointer"
                    >
                        {allTech.map(t => (
                            <option key={t} value={t} className="bg-slate-900">{t}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            key={project.id}
                            className="group relative bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/5 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={cn(
                                    "p-3 rounded-xl transition-colors",
                                    project.difficulty === 'Beginner' ? "bg-green-500/10 text-green-400" :
                                        project.difficulty === 'Intermediate' ? "bg-orange-500/10 text-orange-400" :
                                            "bg-red-500/10 text-red-400"
                                )}>
                                    <project.icon size={24} />
                                </div>
                                <Link
                                    to={`/projects/${project.id}`}
                                    className="p-2 -mr-2 -mt-2 text-slate-500 hover:text-white transition-colors"
                                >
                                    <Info size={18} />
                                </Link>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.slice(0, 3).map(t => (
                                    <span key={t} className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                                        {t}
                                    </span>
                                ))}
                                {project.tech.length > 3 && (
                                    <span className="text-[10px] font-bold text-slate-600 px-2 py-1">
                                        +{project.tech.length - 3}
                                    </span>
                                )}
                            </div>

                            <Link
                                to={`/projects/${project.id}`}
                                className="w-full py-2.5 rounded-lg border border-white/10 text-slate-300 text-sm font-bold hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                            >
                                View Project <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                    <div className="inline-flex p-4 rounded-full bg-slate-800 text-slate-500 mb-4">
                        <Filter size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                    <p className="text-slate-400">Try adjusting your filters to find what you're looking for.</p>
                    <button
                        onClick={() => { setDifficulty('All'); setSelectedTech('All'); }}
                        className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-bold"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};
