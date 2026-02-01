import React from 'react';
import { Briefcase, Zap, Globe } from 'lucide-react';


interface RealWorldContextProps {
    useCase: string;
    impact: string;
    role: string;
}

export const RealWorldContext: React.FC<RealWorldContextProps> = ({ useCase, impact, role }) => {
    return (
        <div className="mt-8 grid md:grid-cols-3 gap-4 border-t border-white/10 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
                    <Globe size={16} /> Real World Use
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{useCase}</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                    <Zap size={16} /> Performance Impact
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{impact}</p>
            </div>

            <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <div className="flex items-center gap-2 mb-2 text-violet-400 font-bold text-sm uppercase tracking-wider">
                    <Briefcase size={16} /> Job Relevance
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{role}</p>
            </div>
        </div>
    );
};
