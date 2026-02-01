import React, { useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { concepts } from '../data/concepts';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Code, Terminal, Brain } from 'lucide-react';

export const ConceptDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    const concept = concepts.find(c => c.slug === slug);

    if (!concept) {
        return <div className="p-20 text-center text-slate-500">Concept not found</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8 pb-20"
        >
            <Link to="/glossary" className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors gap-2 mb-4">
                <ArrowLeft size={16} /> Back to Glossary
            </Link>

            <header className="border-b border-white/10 pb-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border ${concept.category === 'Basic' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                concept.category === 'OOP' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                    concept.category === 'Collections' ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' :
                                        'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            }`}>
                            {concept.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
                            {concept.term}
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            {concept.definition}
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Deep Dive */}
                    <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <BookOpen size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-white">Deep Dive</h2>
                        </div>
                        <div className="space-y-4 text-slate-300 leading-relaxed">
                            {concept.deepDive.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </section>

                    {/* Code Snippet */}
                    <section className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                <Code size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-white">Code Example</h2>
                        </div>
                        <div className="bg-slate-950 rounded-xl p-4 overflow-x-auto border border-white/5 shadow-inner">
                            <pre className="font-mono text-sm text-blue-100">
                                {concept.codeSnippet}
                            </pre>
                        </div>
                    </section>

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Real World Use */}
                    <div className="bg-gradient-to-br from-indigo-900/20 to-violet-900/10 border border-indigo-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4 text-indigo-300 font-bold">
                            <Brain size={20} />
                            <span>Real World Utility</span>
                        </div>
                        <p className="text-sm text-indigo-100/80 leading-relaxed">
                            {concept.realWorldUse}
                        </p>
                    </div>

                    {/* Action */}
                    {concept.relatedModuleUrl && (
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 text-center">
                            <h3 className="text-white font-bold mb-2">Master this Concept</h3>
                            <p className="text-slate-400 text-xs mb-4">Jump into the interactive lesson module.</p>
                            <button
                                onClick={() => navigate(concept.relatedModuleUrl!)}
                                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all"
                            >
                                <Terminal size={18} />
                                Start Lesson
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
