import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';


interface InteractiveDiagramProps {
    children: ReactNode;
    title?: string;
    className?: string;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({
    children,
    title = "Interactive Diagram",
    className
}) => {
    return (
        <div className={cn(
            "relative w-full h-full bg-slate-900 rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl",
            className
        )}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-white/5 backdrop-blur-sm z-10">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    {title}
                </span>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
            </div>

            {/* Content Canvas */}
            <div className="flex-1 relative overflow-auto scrollbar-thin scrollbar-thumb-slate-700 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                {children}
            </div>

            {/* Footer / Legend area could go here */}
        </div>
    );
};
