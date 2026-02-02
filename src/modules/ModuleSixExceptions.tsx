import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { ExceptionVisualization } from '../visualizations/ExceptionVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export const ModuleSixExceptions: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();

    const handleComplete = () => {
        markComplete(6);
        navigate('/learn');
    };

    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Exception Handling"
            subtitle="Module 6: When Things Go Wrong"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<ExceptionVisualization />}
            onComplete={handleComplete}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-red-300">The Stack Trace</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            When an error occurs deeply nested in your code (like a database failure), Java doesn't just crash silently. It creates an <strong>Exception</strong> and throws it up the "Call Stack".
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Imagine a stack of plates. If the top plate breaks, the specific pieces fall down to the plate below.
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-red-200">
                            Exception in thread "main" java.lang.RuntimeException: DB Failed <br />
                            &nbsp;&nbsp;at Database.query(Database.java:10) <br />
                            &nbsp;&nbsp;at Service.process(Service.java:5) <br />
                            &nbsp;&nbsp;at Main.main(Main.java:20)
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-emerald-300">Try & Catch</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            To prevent the App from crashing, we use a <strong>safety net</strong> called a <code>try-catch</code> block.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400 border-l-2 border-emerald-500/50 pl-4">
                            <li>• <strong>Bubbling:</strong> The error floats up until it finds a matching catch block.</li>
                            <li>• <strong>Safety:</strong> If you catch the error, the program continues running instead of exiting.</li>
                        </ul>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-xs font-mono bg-slate-800 p-3 rounded text-emerald-200">
                                <div className="text-[10px] text-slate-500 mb-1">// Try-Catch-Finally</div>
                                try {'{'} openFile(); {'}'} <br />
                                catch (IOException e) {'{'} ... {'}'} <br />
                                finally {'{'} <br />
                                &nbsp;&nbsp; closeFile(); // Always runs <br />
                                {'}'}
                            </div>
                            <div className="text-xs font-mono bg-slate-800 p-3 rounded text-blue-200">
                                <div className="text-[10px] text-slate-500 mb-1">// Try-With-Resources (Java 7+)</div>
                                try (Scanner s = new Scanner()) {'{'} <br />
                                &nbsp;&nbsp; // Auto-closes s here <br />
                                {'}'} catch (Exception e) {'{'} ... {'}'}
                            </div>
                        </div>

                        <div className="mt-4 bg-slate-900 border border-white/5 p-3 rounded">
                            <h4 className="text-xs font-bold text-white mb-2">Deep Dive: The Hierarchy</h4>
                            <ul className="space-y-1 text-[10px] text-slate-400">
                                <li><strong className="text-red-400">Error:</strong> JVM Crashes (OutOfMemory). Don't catch these.</li>
                                <li><strong className="text-amber-400">Checked Exception:</strong> Compilation Error from compiler (e.g. FileNotFound). Must handle.</li>
                                <li><strong className="text-blue-400">Unchecked (Runtime):</strong> Logic bugs (NullPointer). Optional handling.</li>
                            </ul>
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-lg font-semibold mb-2 text-white">Summary</h2>
                        <p className="text-slate-300 mb-4">Good software assumes things will break and plans for it.</p>

                        <RealWorldContext
                            useCase="Web Servers use a top-level 'Global Exception Handler' to catch crashes so the server doesn't shut down for everyone else."
                            impact="Startups crash. Enterprises degrade gracefully. The difference is Exception Handling."
                            role="Logs are your best friend. A good stack trace tells you exactly where the fire started."
                        />
                    </section>
                )}
            </div>
        </LessonLayout>
    );
};
