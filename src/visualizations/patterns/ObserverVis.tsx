import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, User, Rss, Send } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Subscriber {
    id: number;
    name: string;
    isSubscribed: boolean;
    hasNotification: boolean;
}

export const ObserverVis: React.FC = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([
        { id: 1, name: "Alice", isSubscribed: true, hasNotification: false },
        { id: 2, name: "Bob", isSubscribed: false, hasNotification: false },
        { id: 3, name: "Charlie", isSubscribed: true, hasNotification: false },
        { id: 4, name: "Dave", isSubscribed: false, hasNotification: false },
    ]);

    const toggleSubscribe = (id: number) => {
        setSubscribers(prev => prev.map(s =>
            s.id === id ? { ...s, isSubscribed: !s.isSubscribed, hasNotification: false } : s
        ));
    };

    const notify = () => {
        // Reset first
        setSubscribers(prev => prev.map(s => ({ ...s, hasNotification: false })));

        // Then trigger
        setTimeout(() => {
            setSubscribers(prev => prev.map(s =>
                s.isSubscribed ? { ...s, hasNotification: true } : s
            ));
        }, 100);
    };

    return (
        <div className="flex flex-col gap-8 p-6 bg-slate-900/50 rounded-xl border border-white/5">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Rss className="text-orange-400" /> YouTube Channel (Subject)
                </h3>
                <button
                    onClick={notify}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold shadow-lg shadow-red-900/20 active:scale-95 transition-all"
                >
                    <Send size={16} /> Upload Video
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subscribers.map(sub => (
                    <div
                        key={sub.id}
                        className={cn(
                            "relative p-4 rounded-xl border flex flex-col items-center gap-3 transition-all",
                            sub.isSubscribed
                                ? "bg-slate-800 border-white/10"
                                : "bg-slate-900/50 border-white/5 opacity-60"
                        )}
                    >
                        <div className="relative">
                            <div className={cn(
                                "w-12 h-12 rounded-full flex items-center justify-center border-2",
                                sub.isSubscribed ? "bg-blue-600 border-blue-400 text-white" : "bg-slate-700 border-slate-600 text-slate-400"
                            )}>
                                <User size={24} />
                            </div>

                            {/* Notification Badge */}
                            <motion.div
                                initial={false}
                                animate={{ scale: sub.hasNotification ? [0, 1.2, 1] : 0 }}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-slate-800 text-white"
                            >
                                <Bell size={12} fill="currentColor" />
                            </motion.div>
                        </div>

                        <div className="text-center">
                            <div className="font-medium text-slate-200">{sub.name}</div>
                            <button
                                onClick={() => toggleSubscribe(sub.id)}
                                className={cn(
                                    "mt-2 text-xs px-3 py-1 rounded-full font-bold transition-colors",
                                    sub.isSubscribed
                                        ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                                        : "bg-red-600 text-white hover:bg-red-500"
                                )}
                            >
                                {sub.isSubscribed ? "Subscribed" : "Subscribe"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-4 bg-black/30 rounded-lg border border-white/5 text-xs font-mono text-slate-400">
                <div className="mb-2 font-bold text-slate-300">console.log:</div>
                {subscribers.map(s => (
                    <div key={s.id} className="flex justify-between py-0.5">
                        <span>User {s.name}:</span>
                        <span className={s.hasNotification ? "text-emerald-400" : "text-slate-600"}>
                            {s.hasNotification ? "Received Notification!" : "..."}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
