import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { concepts } from '../data/concepts';

export const Glossary: React.FC = () => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'Basic', 'OOP', 'Collections', 'Advanced'];

    const filteredTerms = concepts.filter(t => {
        const matchesSearch = t.term.toLowerCase().includes(search.toLowerCase()) ||
            t.definition.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                        Java Glossary
                    </h1>
                    <p className="text-slate-400 mt-2">Essential terms for every Java developer.</p>
                </div>

                <div className="flex flex-col gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search terms..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                        />
                    </div>
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === cat
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-500'
                            : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode='popLayout'>
                    {filteredTerms.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={item.id}
                        >
                            <Link
                                to={`/glossary/${item.slug}`}
                                className="block h-full bg-slate-900/50 backdrop-blur-sm border border-white/5 p-6 rounded-xl hover:bg-slate-800/50 hover:border-blue-500/30 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                                        {item.term}
                                    </h3>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${item.category === 'Basic' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                        item.category === 'OOP' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                            item.category === 'Collections' ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' :
                                                'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                        }`}>
                                        {item.category}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    {item.definition}
                                </p>
                                <div className="text-blue-500/50 text-xs font-bold group-hover:text-blue-400 flex items-center gap-1">
                                    Read Deep Dive &rarr;
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredTerms.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                    <p>No terms found matching filters</p>
                </div>
            )}
        </div>
    );
};
