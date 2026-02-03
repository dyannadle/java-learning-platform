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
    const totalSteps = 4;

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

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                                🔧 Under the Hood: The Cost of Exceptions
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Exceptions are expensive! When you say <code>throw new Exception()</code>, Java has to pause and crawl up the entire stack to build the <strong>Stack Trace</strong>.
                            </p>
                            <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-slate-300 mb-4">
                                <strong>Optimization Tip:</strong><br />
                                Avoid using Exceptions for logic control (e.g., <code>try - catch</code> loops). It's 100x slower than an <code>if</code> check.<br />
                            </div>
                            <div className="text-xs text-slate-400">
                                <strong>Bytecode Secret:</strong> Compiler generates an "Exception Table" at the end of the method. If an error happens at line X, it jumps to the handler defined in the table. Zero cost if no exception happens!
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                                <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">⚠️ Common Pitfalls</h3>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-slate-300">
                                    <li>
                                        <strong>Swallowing Exceptions:</strong>
                                        <code className="block bg-black/30 p-1 rounded mt-1 text-xs">catch (Exception e) {'{}'} // EVIL!</code>
                                        Function fails silently. You'll spend days debugging this. Always log it!
                                    </li>
                                    <li>
                                        <strong>Catching Throwable:</strong> Don't catch <code>Throwable</code>. You might catch <code>OutOfMemoryError</code> which you can't recover from anyway.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Yz Interview Prep</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Mid Level</p>
                                        <p className="text-sm text-white">"Checked vs Unchecked Exceptions?"</p>
                                        <p className="text-xs text-slate-400 mt-1">Checked (Compile-time, e.g., IOException) must be handled. Unchecked (Runtime, e.g., NullPointer) are bugs.</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Senior Level</p>
                                        <p className="text-sm text-white">"Difference between Final, Finally, and Finalize?"</p>
                                        <p className="text-xs text-slate-400 mt-1">Final = Constant. Finally = Always runs. Finalize = Garbage Collection (Deprecated).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </LessonLayout>
    );
};
