import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PROJECTS, Difficulty } from '../data/projects';

// Remove the local Project interface and projects array
// Using imported PROJECTS


export const ProjectsGallery: React.FC = () => {
    const [filter, setFilter] = useState<Difficulty>('All');

    const filteredProjects = PROJECTS.filter(p => filter === 'All' || p.difficulty === filter);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                    Project Repository
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl">
                    The best way to learn is to build. Here is your roadmap from "Hello World" to Senior Developer.
                </p>
            </header>

            {/* Filter Tabs */}
            <div className="flex gap-2 p-1 bg-white/5 w-fit rounded-lg border border-white/5">
                {(['All', 'Beginner', 'Intermediate', 'Advanced'] as Difficulty[]).map((level) => (
                    <button
                        key={level}
                        onClick={() => setFilter(level)}
                        className={cn(
                            "px-4 py-2 rounded-md text-sm font-medium transition-all",
                            filter === level
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        {level}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredProjects.map((project) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        key={project.id}
                        className="group relative bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:bg-slate-800/50"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                                <project.icon size={24} />
                            </div>
                            <span className={cn(
                                "text-xs font-mono px-2 py-1 rounded border",
                                project.difficulty === 'Beginner' && "border-green-500/20 text-green-400 bg-green-500/10",
                                project.difficulty === 'Intermediate' && "border-orange-500/20 text-orange-400 bg-orange-500/10",
                                project.difficulty === 'Advanced' && "border-red-500/20 text-red-400 bg-red-500/10",
                            )}>
                                {project.difficulty}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map(t => (
                                <span key={t} className="text-xs text-slate-500 bg-black/30 px-2 py-1 rounded">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <Link
                            to={`/projects/${project.id}`}
                            className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 gap-1 group/link"
                        >
                            View Synopsis <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                    No projects found for this filter.
                </div>
            )}
        </div>
    );
};
