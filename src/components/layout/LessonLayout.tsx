import React from 'react';

import { ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface LessonLayoutProps {
    title: string;
    subtitle: string;
    currentStep: number;
    totalSteps: number;
    onNext?: () => void;
    onPrev?: () => void;
    onComplete?: () => void;
    children: React.ReactNode;
    visualization: React.ReactNode;
}

export const LessonLayout: React.FC<LessonLayoutProps> = ({
    title,
    subtitle,
    children,
    visualization,
    currentStep,
    totalSteps,
    onNext,
    onPrev,
    onComplete
}) => {
    return (
        <div className="h-[calc(100vh-4rem)] flex gap-6 overflow-hidden">
            {/* Scrollable Content Area */}
            <div className="w-1/2 flex flex-col h-full bg-white/5 rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-sm bg-slate-900/50 z-10">
                    <div>
                        <Link to="/learn" className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 mb-1 transition-colors">
                            <ArrowLeft size={12} /> Back to Course
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
                        <p className="text-sm text-slate-400">{subtitle}</p>
                    </div>
                    <div className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                        Step {currentStep} / {totalSteps}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
                    {children}
                </div>

                <div className="p-6 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm flex justify-between items-center">
                    <button
                        onClick={onPrev}
                        disabled={currentStep === 1}
                        className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => {
                            if (currentStep === totalSteps && onComplete) {
                                onComplete();
                            } else if (onNext) {
                                onNext();
                            }
                        }}
                        disabled={currentStep === totalSteps && !onComplete}
                        className={cn(
                            "px-6 py-2 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                            currentStep === totalSteps && onComplete
                                ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
                                : "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
                        )}
                    >
                        {currentStep === totalSteps && onComplete ? (
                            <>Complete Module <CheckCircle size={16} /></>
                        ) : (
                            <>Next Lesson <ChevronRight size={16} /></>
                        )}
                    </button>
                </div>
            </div>

            {/* Interactive Visualization Area */}
            <div className="w-1/2 h-full bg-black/20 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col">
                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <span className="px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-slate-500">
                        Interactive View
                    </span>
                </div>
                <div className="flex-1 relative">
                    {visualization}
                </div>
            </div>
        </div>
    );
};
