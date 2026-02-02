import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { ConcurrencyVisualization } from '../visualizations/ConcurrencyVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export const ModuleEightConcurrency: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();

    const handleComplete = () => {
        markComplete(8);
        navigate('/learn');
    };

    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Concurrency & Threads"
            subtitle="Module 8: Doing Multiple Things at Once"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<ConcurrencyVisualization />}
            onComplete={handleComplete}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-300">The Multiverse of Code</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            By default, code runs line-by-line (Single Threaded). But computers have multiple cores. <strong>Threads</strong> allow us to use all those cores to do multiple tasks simultaneously.
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-orange-200">
                            Thread t1 = new Thread(() -&gt; downloadFile()); <br />
                            Thread t2 = new Thread(() -&gt; playMusic()); <br />
                            <br />
                            t1.start(); <br />
                            t2.start(); <span className="text-slate-500">// Both run at the same time!</span>
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-red-300">Race Conditions</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Concurrency is dangerous. If two threads try to update the same variable at the same time, they can overwrite each other. This is a <strong>Race Condition</strong>.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            We fix this using <strong>Synchronization</strong> (Limits access to one thread at a time), represented by the Lock in the demo.
                        </p>
                        <div className="mt-4 bg-slate-900 border border-white/5 p-3 rounded">
                            <h4 className="text-xs font-bold text-white mb-2">The Fix: Synchronized Blocks</h4>
                            <pre className="text-xs font-mono text-emerald-200">
                                synchronized(lock) {'{'}<br />
                                &nbsp;&nbsp; count++; <span className="text-slate-500">// Safe!</span><br />
                                {'}'}
                            </pre>
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-lg font-semibold mb-2 text-white">Summary</h2>
                        <p className="text-slate-300 mb-4">Threads are powerful but introduce chaos. Synchronization restores order.</p>

                        <RealWorldContext
                            useCase="Web Servers (like Tomcat) use a Thread Pool to handle 1000s of users at once."
                            impact="Without concurrency, a website would freeze for everyone while one person uploads a file."
                            role="Senior Engineers spend days debugging 'Heisenbugs' - bugs that disappear when you look for them (due to timing)."
                        />
                    </section>
                )}
            </div>
        </LessonLayout>
    );
};
