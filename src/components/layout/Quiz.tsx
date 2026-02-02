import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export interface Question {
    id: number;
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

interface QuizProps {
    questions: Question[];
    onPass: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onPass }) => {
    const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
        if (showResults) return; // Locked after submitting
        const newAnswers = [...answers];
        newAnswers[questionIndex] = optionIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        setShowResults(true);
        const score = answers.reduce((acc, ans, idx) => {
            return ans === questions[idx].correctIndex ? acc + 1 : acc;
        }, 0);

        const passed = score / questions.length >= 0.7; // 70% pass rate
        if (passed) {
            onPass();
        }
    };

    const score = answers.reduce((acc, ans, idx) => ans === questions[idx].correctIndex ? acc + 1 : acc, 0);
    const passed = score / questions.length >= 0.7;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Knowledge Check</h2>
                <p className="text-slate-400">Score at least 70% to unlock the next module.</p>
            </div>

            <div className="space-y-6">
                {questions.map((q, qIdx) => (
                    <div key={q.id} className="bg-slate-800/50 border border-white/5 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-slate-200 mb-4">
                            <span className="text-blue-400 font-mono mr-2">{qIdx + 1}.</span>
                            {q.text}
                        </h3>

                        <div className="space-y-3">
                            {q.options.map((opt, optIdx) => {
                                const isSelected = answers[qIdx] === optIdx;
                                const isCorrect = q.correctIndex === optIdx;
                                let statusClass = "border-white/5 hover:bg-slate-700/50";

                                if (showResults) {
                                    if (isCorrect) statusClass = "border-emerald-500/50 bg-emerald-500/10 text-emerald-200";
                                    else if (isSelected && !isCorrect) statusClass = "border-red-500/50 bg-red-500/10 text-red-200";
                                    else statusClass = "opacity-50 border-transparent";
                                } else {
                                    if (isSelected) statusClass = "border-blue-500 bg-blue-500/20 text-blue-100";
                                }

                                return (
                                    <button
                                        key={optIdx}
                                        onClick={() => handleOptionSelect(qIdx, optIdx)}
                                        disabled={showResults}
                                        className={cn(
                                            "w-full text-left p-4 rounded-lg border transition-all flex justify-between items-center group",
                                            statusClass
                                        )}
                                    >
                                        <span>{opt}</span>
                                        {showResults && isCorrect && <CheckCircle size={18} className="text-emerald-400" />}
                                        {showResults && isSelected && !isCorrect && <XCircle size={18} className="text-red-400" />}
                                    </button>
                                );
                            })}
                        </div>

                        {showResults && (answers[qIdx] !== q.correctIndex) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 p-3 bg-blue-900/20 border border-blue-500/20 rounded text-sm text-slate-300 flex gap-2"
                            >
                                <AlertCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold text-blue-300">Explanation:</span> {q.explanation}
                                </div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div className="sticky bottom-6 z-10 flex justify-center">
                {!showResults ? (
                    <button
                        onClick={handleSubmit}
                        disabled={answers.includes(-1)}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                    >
                        Submit Answers
                    </button>
                ) : (
                    <div className={cn(
                        "px-8 py-4 rounded-xl border flex items-center gap-4 shadow-2xl backdrop-blur-md",
                        passed ? "bg-emerald-900/90 border-emerald-500" : "bg-red-900/90 border-red-500"
                    )}>
                        {passed ? (
                            <>
                                <CheckCircle size={32} className="text-emerald-400" />
                                <div>
                                    <div className="font-bold text-emerald-100 text-lg">Quiz Passed!</div>
                                    <div className="text-emerald-300/80 text-sm">You can now complete the module.</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <XCircle size={32} className="text-red-400" />
                                <div>
                                    <div className="font-bold text-red-100 text-lg">Nice try!</div>
                                    <div className="text-red-300/80 text-sm">Review the lessons and try again.</div>
                                </div>
                                <button
                                    onClick={() => {
                                        setAnswers(new Array(questions.length).fill(-1));
                                        setShowResults(false);
                                    }}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-sm font-medium transition-colors"
                                >
                                    Retry
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
