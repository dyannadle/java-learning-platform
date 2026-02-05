import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

export const ModernJavaVis: React.FC = () => {
    const [feature, setFeature] = useState<'records' | 'switch' | 'textblocks'>('records');

    const features = {
        records: {
            title: "Records (Java 14+)",
            old: `class Point {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int x() { return x; }
    public int y() { return y; }

    // + equals(), hashCode(), toString()...
}`,
            new: `record Point(int x, int y) {}`,
            benefit: "Reduces boilerplate by 95%. Automatically gives you constructor, getters, equals, hashCode, and toString."
        },
        switch: {
            title: "Enhanced Switch (Java 14+)",
            old: `switch (day) {
    case MONDAY:
    case FRIDAY:
    case SUNDAY:
        System.out.println(6);
        break;
    case TUESDAY:
        System.out.println(7);
        break;
}`,
            new: `int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    default                     -> throw new IllegalStateException();
};`,
            benefit: "No more 'break' statements. Can be used as an expression (return a value)."
        },
        textblocks: {
            title: "Text Blocks (Java 15+)",
            old: `String json = "{\\n" +
              "  \"name\": \"John\",\\n" +
              "  \"age\": 30\\n" +
              "}";`,
            new: `String json = """
    {
      "name": "John",
      "age": 30
    }
    """;`,
            benefit: "No more escaping newlines and quotes. Perfect for SQL, JSON, and HTML."
        }
    };

    const activeFeature = features[feature];

    return (
        <div className="p-6 bg-slate-900 rounded-xl border border-blue-500/20 shadow-2xl space-y-6">
            <div className="flex gap-4 mb-6 justify-center">
                {(Object.keys(features) as Array<keyof typeof features>).map((key) => (
                    <button
                        key={key}
                        onClick={() => setFeature(key)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${feature === key
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        {features[key].title}
                    </button>
                ))}
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Old Way */}
                    <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3 text-red-400 font-bold text-sm uppercase tracking-wider">
                            <XCircle size={16} /> Old Java (Pre-14)
                        </div>
                        <pre className="text-xs font-mono text-red-200 overflow-x-auto p-4 bg-black/40 rounded-lg h-64">
                            {activeFeature.old}
                        </pre>
                    </div>

                    {/* New Way */}
                    <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Code size={120} className="text-emerald-500" />
                        </div>
                        <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                            <CheckCircle size={16} /> Modern Java
                        </div>
                        <pre className="text-xs font-mono text-emerald-200 overflow-x-auto p-4 bg-black/40 rounded-lg h-64 flex items-center">
                            {activeFeature.new}
                        </pre>
                        <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                            <p className="text-emerald-200 text-sm font-medium flex gap-2">
                                <ArrowRight size={16} className="mt-0.5 shrink-0" />
                                {activeFeature.benefit}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
