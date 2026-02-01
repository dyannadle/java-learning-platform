import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

interface Term {
    id: string;
    term: string;
    definition: string;
    category: 'Basic' | 'OOP' | 'Advanced' | 'Collections';
}

const terms: Term[] = [
    { id: '1', term: 'Variable', definition: 'A container that holds data values.', category: 'Basic' },
    { id: '2', term: 'Class', definition: 'A blueprint for creating objects.', category: 'OOP' },
    { id: '3', term: 'Object', definition: 'An instance of a class.', category: 'OOP' },
    { id: '4', term: 'Inheritance', definition: 'Mechanism where a new class derives properties and characteristics from an existing class.', category: 'OOP' },
    { id: '5', term: 'Polymorphism', definition: 'The ability of an object to take on many forms.', category: 'OOP' },
    { id: '6', term: 'Encapsulation', definition: 'Wrapping data (variables) and code acting on the data (methods) together as a single unit.', category: 'OOP' },
    { id: '7', term: 'Interface', definition: 'A reference type in Java, it is similar to a class, it is a collection of abstract methods.', category: 'OOP' },
    { id: '8', term: 'Exception', definition: 'An event, which occurs during the execution of a program, that disrupts the normal flow of the program\'s instructions.', category: 'Advanced' },
    { id: '9', term: 'ArrayList', definition: 'A resizable array, which can be found in the java.util package.', category: 'Collections' },
    { id: '10', term: 'HashMap', definition: 'A map based collection class that is used for storing Key & Value pairs.', category: 'Collections' },
    { id: '11', term: 'Thread', definition: 'A lightweight subprocess, the smallest unit of processing.', category: 'Advanced' },
    { id: '12', term: 'Lambda Expression', definition: 'A short block of code which takes in parameters and returns a value.', category: 'Advanced' },
];

export const Glossary: React.FC = () => {
    const [search, setSearch] = useState('');

    const filteredTerms = terms.filter(t =>
        t.term.toLowerCase().includes(search.toLowerCase()) ||
        t.definition.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                        Java Glossary
                    </h1>
                    <p className="text-slate-400 mt-2">Essential terms for every Java developer.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search terms..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-sans"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {filteredTerms.map((item) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={item.id}
                            className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-6 rounded-xl hover:bg-slate-800/50 hover:border-blue-500/30 transition-all group"
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
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {item.definition}
                            </p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredTerms.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                    <p>No terms found matching "{search}"</p>
                </div>
            )}
        </div>
    );
};
