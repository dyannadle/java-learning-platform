import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Trophy, Medal, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LeaderboardUser {
    id: string;
    username: string; // or full_name or email
    xp: number;
    level: number;
}

export const Leaderboard: React.FC = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                // Assuming 'profiles' table has username/xp/level
                // If username doesn't exist, we might fallback to a masked email or generic name
                const { data, error } = await supabase
                    .from('profiles')
                    .select('id, username, xp, level')
                    .order('xp', { ascending: false })
                    .limit(20);

                if (error) throw error;
                setUsers(data || []);
            } catch (err) {
                console.error("Failed to load leaderboard", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const getMedal = (index: number) => {
        switch (index) {
            case 0: return <Medal className="text-yellow-400" fill="currentColor" />;
            case 1: return <Medal className="text-slate-400" fill="currentColor" />;
            case 2: return <Medal className="text-orange-700" fill="currentColor" />;
            default: return <span className="text-slate-500 font-mono font-bold w-6 text-center">{index + 1}</span>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 inline-flex items-center gap-3">
                    <Trophy className="text-yellow-400" size={40} fill="currentColor" />
                    Global Leaderboard
                </h1>
                <p className="text-slate-400 mt-2">Top Java Masters from around the world</p>
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="grid grid-cols-12 px-6 py-4 bg-slate-950/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-1 text-center">Rank</div>
                    <div className="col-span-7">User</div>
                    <div className="col-span-2 text-right">Level</div>
                    <div className="col-span-2 text-right">XP</div>
                </div>

                {loading ? (
                    <div className="p-10 text-center text-slate-500">Loading champions...</div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {users.map((u, index) => (
                            <motion.div
                                key={u.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`grid grid-cols-12 px-6 py-4 items-center group transition-colors hover:bg-white/5
                                    ${u.id === currentUser?.id ? 'bg-blue-500/10 border-l-2 border-blue-500' : ''}
                                `}
                            >
                                <div className="col-span-1 flex justify-center">
                                    {getMedal(index)}
                                </div>
                                <div className="col-span-7 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
                                        <User size={14} className="text-slate-400" />
                                    </div>
                                    <span className={`font-medium ${u.id === currentUser?.id ? 'text-blue-400' : 'text-slate-200'}`}>
                                        {u.username || `User ${u.id.substring(0, 6)}`}
                                    </span>
                                    {u.id === currentUser?.id && (
                                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">YOU</span>
                                    )}
                                </div>
                                <div className="col-span-2 text-right font-mono text-slate-400 text-sm">
                                    Lvl {u.level}
                                </div>
                                <div className="col-span-2 text-right font-mono text-yellow-400 font-bold">
                                    {u.xp.toLocaleString()} XP
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {!loading && users.length === 0 && (
                    <div className="p-10 text-center text-slate-500">
                        No data found. Be the first to join the leaderboard!
                    </div>
                )}
            </div>
        </div>
    );
};
