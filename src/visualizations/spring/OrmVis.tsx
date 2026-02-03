import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Table, ArrowRight, Save, RefreshCw } from 'lucide-react';

export const OrmVis: React.FC = () => {
    const [javaName, setJavaName] = useState("User");
    const [fields, setFields] = useState([
        { name: "id", type: "Long", sql: "BIGINT PRIMARY KEY" },
        { name: "username", type: "String", sql: "VARCHAR(255)" },
        { name: "email", type: "String", sql: "VARCHAR(255)" }
    ]);
    const [saving, setSaving] = useState(false);
    const [lastQuery, setLastQuery] = useState("");

    const sqlTableName = javaName.toLowerCase() + "s";

    const saveUser = () => {
        setSaving(true);
        setLastQuery(`INSERT INTO ${sqlTableName} (id, username, email) VALUES (1, 'Deepak', 'deepak@example.com');`);
        setTimeout(() => setSaving(false), 2000);
    };

    return (
        <div className="p-6 bg-slate-900/50 rounded-xl border border-white/5 h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-orange-400 flex items-center gap-2">
                        <Database size={20} /> ORM (Object-Relational Mapping)
                    </h3>
                    <p className="text-xs text-slate-400">Hibernate translates your Java Classes into SQL Tables automatically.</p>
                </div>
                <button
                    onClick={saveUser}
                    disabled={saving}
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                    {saving ? <RefreshCw className="animate-spin" size={16} /> : <Save size={16} />}
                    repository.save(user)
                </button>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-8 relative">
                {/* Java Side */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 font-mono text-sm relative">
                    <div className="absolute -top-3 left-4 bg-orange-600 px-2 rounded text-xs font-bold text-white uppercase">Java Class</div>

                    <div className="text-orange-300 mb-2">@Entity</div>
                    <div className="text-white mb-2">
                        public class <span className="text-yellow-300 font-bold" contentEditable onBlur={(e) => setJavaName(e.currentTarget.innerText)}>{javaName}</span> {'{'}
                    </div>

                    <div className="pl-4 space-y-2 text-slate-300">
                        <div className="flex gap-2">
                            <span className="text-orange-300">@Id</span>
                        </div>
                        {fields.map((f, i) => (
                            <div key={i}>
                                <span className="text-blue-400">{f.type}</span> <span className="text-white">{f.name}</span>;
                            </div>
                        ))}
                    </div>
                    <div className="text-white mt-2">{'}'}</div>
                </div>

                {/* Mapping Arrow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-slate-900 p-2 rounded-full border border-slate-700">
                    <ArrowRight size={24} className="text-slate-500" />
                </div>

                {/* SQL Side */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 font-mono text-sm relative">
                    <div className="absolute -top-3 right-4 bg-blue-600 px-2 rounded text-xs font-bold text-white uppercase">Database Table</div>

                    <div className="flex items-center gap-2 text-slate-400 mb-4 pb-2 border-b border-white/10">
                        <Table size={16} />
                        CREATE TABLE <span className="text-white font-bold">{sqlTableName}</span> (
                    </div>

                    <div className="pl-4 space-y-2 text-slate-300">
                        {fields.map((f, i) => (
                            <div key={i} className="flex justify-between">
                                <span className="text-white">{f.name}</span>
                                <span className="text-blue-400">{f.sql}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-slate-400">);</div>

                    {/* Simulating Data Row Insertion */}
                    <AnimatePresence>
                        {saving && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-4 left-4 right-4 bg-green-900/30 border border-green-500/30 p-2 rounded text-green-300 text-xs truncate"
                            >
                                + Row: [1, 'Deepak', 'deepak@example.com']
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Console Output */}
            <div className="mt-6 h-16 bg-black/50 rounded-lg p-3 font-mono text-xs text-slate-400 border border-white/5 flex flex-col justify-center">
                <span className="opacity-50">// Hibernate SQL Output:</span>
                <span className="text-white typing-effect">{lastQuery}</span>
            </div>
        </div>
    );
};
