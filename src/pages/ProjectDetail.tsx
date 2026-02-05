import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Code, Layers, FileCode } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { cn } from '../lib/utils';

export const ProjectDetail: React.FC = () => {
    const { projectId } = useParams();
    const project = PROJECTS.find(p => p.id === projectId);

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-slate-500">
                <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
                <Link to="/projects" className="text-blue-400 hover:underline">
                    Back to Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <header className="space-y-6">
                <Link to="/projects" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors w-fit">
                    <ArrowLeft size={16} /> Back to Projects
                </Link>

                <div className="flex items-start justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                                <project.icon size={32} />
                            </div>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-mono font-medium border",
                                project.difficulty === 'Beginner' && "border-green-500/30 text-green-400 bg-green-500/10",
                                project.difficulty === 'Intermediate' && "border-orange-500/30 text-orange-400 bg-orange-500/10",
                                project.difficulty === 'Advanced' && "border-red-500/30 text-red-400 bg-red-500/10"
                            )}>
                                {project.difficulty}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-slate-100 mb-4">{project.title}</h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                            {project.longDescription}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {project.tech.map(t => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300">
                            {t}
                        </span>
                    ))}
                </div>
            </header>

            {/* Deep Dive Section (New) */}
            {project.deepDiveSynopsis && (
                <div className="bg-slate-900/80 border border-purple-500/20 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/20 transition-all"></div>

                    <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3 relative z-10">
                        <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                            <Code size={24} />
                        </span>
                        Technical Deep Dive
                    </h2>

                    <div className="prose prose-invert max-w-none prose-p:text-slate-400 prose-headings:text-slate-200 prose-li:text-slate-400">
                        <div dangerouslySetInnerHTML={{ __html: project.deepDiveSynopsis.replace(/\n/g, '<br/>') }} />
                    </div>
                    <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                        <p className="text-sm text-purple-300 font-mono">
                            💡 This section covers Architecture, Design Patterns, and Interview Questions.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left: Steps */}
                <div className="md:col-span-2 space-y-8">
                    <div className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                        <Layers className="text-blue-400" /> Implementation Guide
                    </div>

                    {project.steps && project.steps.length > 0 ? (
                        {
                            project.steps && project.steps.length > 0 ? (
                                <div className="relative space-y-0 pl-8 border-l-2 border-white/5">
                                    {project.steps.map((step, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            key={idx}
                                            className="mb-12 relative"
                                        >
                                            {/* Timeline Dot */}
                                            <span className="absolute -left-[41px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border-2 border-blue-600 text-blue-500 ring-4 ring-slate-950">
                                                <div className="h-2 w-2 rounded-full bg-current" />
                                            </span>

                                            <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2">
                                                <span className="text-blue-400">Step {idx + 1}:</span> {step.title}
                                            </h3>

                                            <p className="text-slate-400 mb-4 leading-relaxed max-w-2xl">
                                                {step.description}
                                            </p>

                                            {step.code && (
                                                <div className="group/code relative bg-slate-900 border border-white/10 rounded-lg overflow-hidden shadow-lg">
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(step.code!)}
                                                            className="px-2 py-1 text-xs font-bold bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors shadow-lg"
                                                        >
                                                            Copy
                                                        </button>
                                                    </div>
                                                    <div className="p-4 overflow-x-auto">
                                                        <pre className="text-sm font-mono text-blue-100">{step.code}</pre>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 bg-slate-900/50 border border-white/5 rounded-2xl text-center text-slate-500">
                                    <FileCode size={40} className="mx-auto mb-4 opacity-50" />
                                    <p>Detailed guide coming soon.</p>
                                </div>
                            )
                        }
                </div>

                {/* Right: Sidebar */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 sticky top-24">
                        <h3 className="font-bold text-slate-100 mb-4 flex items-center gap-2">
                            <CheckCircle size={18} className="text-emerald-400" /> Learning Outcomes
                        </h3>
                        <ul className="space-y-3">
                            <li className="text-sm text-slate-400 flex gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                                Start simple with logic.
                            </li>
                            <li className="text-sm text-slate-400 flex gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                                Structure code into classes.
                            </li>
                            <li className="text-sm text-slate-400 flex gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></span>
                                Handle real-world edge cases.
                            </li>
                        </ul>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <Link
                                to="/playground"
                                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                            >
                                <Code size={20} />
                                Start Building
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
