import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { JVMVisualization } from '../visualizations/JVMVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';

export const ModuleOneIntro: React.FC = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

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
                        <h3 className="text-lg font-semibold mb-2 text-white">The "WORA" Concept</h3>
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
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-violet-300">The Secret Weapon: JVM</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            The <strong>Java Virtual Machine (JVM)</strong> is the "local translator".
                            When you download Java, you are mostly downloading the JVM.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-900 rounded-lg border border-white/5">
                                <h4 className="font-semibold text-slate-200 mb-1">Compiler</h4>
                                <p className="text-xs text-slate-500">Checks your syntax errors. Creates the .class file.</p>
                            </div>
                            <div className="p-4 bg-slate-900 rounded-lg border border-white/5">
                                <h4 className="font-semibold text-slate-200 mb-1">Interpreter</h4>
                                <p className="text-xs text-slate-500">Reads the .class file and runs it on the CPU.</p>
                            </div>
                        </div>
                    </section>
                )}

                {step >= 3 && (
                    <section className="border-l-2 border-emerald-500 pl-4">
                        <h2 className="text-lg font-semibold mb-2 text-white">Real World Impact</h2>
                        <p className="text-slate-300 text-sm italic">
                            "This architecture is why Minecraft runs on Windows, Mac, and Linux without the developers needing to rewrite the game 3 times."
                        </p>
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
