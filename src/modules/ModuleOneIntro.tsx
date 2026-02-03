import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { JVMVisualization } from '../visualizations/JVMVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export const ModuleOneIntro: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();

    const handleComplete = () => {
        markComplete(1);
        navigate('/learn');
    };

    const [step, setStep] = useState(1);
    const totalSteps = 6;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="How Java Works"
            subtitle="Module 1: The JVM Architecture"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<JVMVisualization />}
            onComplete={handleComplete}
        >
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-blue-300">Why are we here?</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Programming is telling a computer what to do. But computers only understand 1s and 0s (electricity ON/OFF).
                        Humans speak languages like English. We need a translator.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                        Java is special because it uses a <span className="text-white font-semibold">two-step translation</span> process.
                        This is what makes it "Write Once, Run Anywhere".
                    </p>
                </section>

                {step >= 1 && (
                    <section className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
                        <h3 className="text-lg font-semibold mb-2 text-white">1. The "WORA" Concept</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Imagine you write a letter in English.
                        </p>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex gap-2">
                                <span className="bg-blue-500/20 text-blue-400 px-2 rounded font-mono text-xs py-0.5 h-fit mt-0.5">C++</span>
                                <span>You translate it directly to French. It only works for French people. (Dependent on OS)</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-orange-500/20 text-orange-400 px-2 rounded font-mono text-xs py-0.5 h-fit mt-0.5">Java</span>
                                <span>You translate it to "Esperanto" (Bytecode). Then, every country has a local translator (JVM) that reads Esperanto and speaks the local language.</span>
                            </li>
                        </ul>
                    </section>
                )}

                {step >= 2 && (
                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold text-emerald-300">2. The Compilation Pipeline</h3>
                        <p className="text-slate-300 leading-relaxed text-sm">
                            Before your code runs, it goes through a rigorous factory line. This is why Java is safer than Python or JavaScript.
                        </p>
                        <div className="grid gap-3 text-sm">
                            <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-white/5">
                                <div className="w-8 h-8 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-slate-200">Source Code (.java)</h4>
                                    <p className="text-slate-500">Readable text you write. "Human Language".</p>
                                </div>
                            </div>
                            <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-700"></div></div>
                            <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-white/5">
                                <div className="w-8 h-8 rounded bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-slate-200">Compiler (javac)</h4>
                                    <p className="text-slate-500">Checks for syntax errors. If you miss a semicolon, it stops here.</p>
                                </div>
                            </div>
                            <div className="flex justify-center"><div className="w-0.5 h-4 bg-slate-700"></div></div>
                            <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-white/5">
                                <div className="w-8 h-8 rounded bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-bold text-slate-200">Bytecode (.class)</h4>
                                    <p className="text-slate-500">Optimized instructions for the JVM. Not human readable.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {step >= 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-violet-300">3. The Secret Weapon: JVM</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            The <strong>Java Virtual Machine (JVM)</strong> is the "local translator".
                            It is a marvelous piece of engineering that does three main things:
                        </p>
                        <ul className="list-decimal pl-5 space-y-2 text-sm text-slate-300 mb-6">
                            <li><strong>Loads Code:</strong> The <em>Classloader</em> brings your .class files into memory.</li>
                            <li><strong>Verifies Code:</strong> The <em>Bytecode Verifier</em> ensures the code won't crash the computer (Security).</li>
                            <li><strong>Executes Code:</strong> The <em>Interpreter</em> runs specific instructions for your CPU.</li>
                        </ul>

                        <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-lg mb-4">
                            <h4 className="font-bold text-blue-300 mb-2 text-sm uppercase tracking-wider">Deep Dive: JDK vs JRE vs JVM</h4>
                            <div className="space-y-2 text-sm text-slate-400">
                                <p><strong className="text-white">JDK (Java Development Kit):</strong> For Developers. Includes Compiler (`javac`), Debugger, and JRE.</p>
                                <p><strong className="text-white">JRE (Java Runtime Environment):</strong> For Users. Includes Libraries (`rt.jar`) and JVM.</p>
                                <p><strong className="text-white">JVM (Java Virtual Machine):</strong> The engine. Loads code, verifies it, and executes it.</p>
                            </div>
                        </div>
                    </section>
                )}

                {step >= 4 && (
                    <section className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                        <h3 className="text-lg font-semibold mb-4 text-amber-300">4. Just-In-Time (JIT) Compilation</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            Java used to be slow because it was "interpreted" (translated line-by-line).
                            Modern Java uses a <strong>JIT Compiler</strong> (HotSpot).
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-950 rounded-lg border border-white/5">
                                <h4 className="font-semibold text-slate-200 mb-2">Interpretation (Slow)</h4>
                                <p className="text-xs text-slate-500">Read opcode &rarr; Execute &rarr; Next.</p>
                                <p className="text-xs text-slate-500 mt-2">Good for code that runs only once.</p>
                            </div>
                            <div className="p-4 bg-amber-900/10 rounded-lg border border-amber-500/20">
                                <h4 className="font-semibold text-amber-200 mb-2">JIT Compilation (Fast)</h4>
                                <p className="text-xs text-amber-200/70">JVM notices a "Hot Method" running 10,000 times.</p>
                                <p className="text-xs text-amber-200/70 mt-2">It compiles it to **Native Machine Code**. Now it runs as fast as C++!</p>
                            </div>
                        </div>
                    </section>
                )}

                {step >= 5 && (
                    <section className="border-l-2 border-emerald-500 pl-4">
                        <h2 className="text-lg font-semibold mb-2 text-white">5. Real World Impact</h2>
                        <p className="text-slate-300 text-sm italic">
                            "This architecture is why Minecraft runs on Windows, Mac, and Linux without the developers needing to rewrite the game 3 times."
                        </p>
                    </section>
                )}

                {step >= 6 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                                🔧 6. Under the Hood: The `main` Method
                            </h2>
                            <code className="block bg-black/50 p-4 rounded-lg font-mono text-sm text-slate-300 mb-4">
                                <span className="text-orange-400">public</span> <span className="text-blue-400">static</span> <span className="text-purple-400">void</span> <span className="text-yellow-300">main</span>(String[] args)
                            </code>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><strong>public</strong>: JVM calls it from outside the class.</li>
                                <li><strong>static</strong>: JVM calls it <em>without</em> creating an object of the class first.</li>
                                <li><strong>void</strong>: It doesn't return value to the OS (use `System.exit()` for status codes).</li>
                                <li><strong>String[] args</strong>: Command line arguments passed when running the program.</li>
                            </ul>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                                <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">⚠️ Common Pitfalls</h3>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-slate-300">
                                    <li>
                                        <strong>Wrong Signature:</strong> If you forget `static` or `args`, the program compiles but won't run (`NoSuchMethodError`).
                                    </li>
                                    <li>
                                        <strong>File Mismatch:</strong> `public class Main` MUST be in `Main.java`.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Yz Interview Prep</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Junior Level</p>
                                        <p className="text-sm text-white">"What is the difference between JDK and JRE?"</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Senior Level</p>
                                        <p className="text-sm text-white">"Can you overload the main method? (Yes, but JVM only calls the standard signature)."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Netflix uses the JVM to handle billions of streams because they can run the same code on thousands of different server types."
                    impact="The JVM optimizes code while it runs (JIT), often making Java faster than natively compiled C++ for long-running server tasks."
                    role="Backend Engineers must know how to tune JVM memory settings (Garbage Collection) to prevent server crashes."
                />
            </div>
        </LessonLayout>
    );
};
