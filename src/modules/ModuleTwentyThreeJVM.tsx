import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { JvmMemoryVis } from '../visualizations/jvm/JvmMemoryVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "Where do new Objects (e.g., 'new Customer()') get allocated?",
        options: [
            "The Stack",
            "Eden Space (Young Generation Heap)",
            "Old Generation Heap",
            "MetaSpace"
        ],
        correctIndex: 1,
        explanation: "New objects start in Eden. If they survive a GC, they move to Survivors. If they survive many GCs (Tenuring), they move to Old Gen."
    },
    {
        id: 2,
        text: "What is 'Stop-The-World'?",
        options: [
            "A JIT optimization",
            "When the GC pauses ALL application threads to safely move memory",
            "When the computer crashes",
            "A feature of Time Travel"
        ],
        correctIndex: 1,
        explanation: "During a Major GC, the JVM freezes your application. Long pauses cause lag. Modern GCs (ZGC, Shenandoah) try to minimize this."
    },
    {
        id: 3,
        text: "What does the JIT (Just-In-Time) Compiler do?",
        options: [
            "Compiles Java to C++",
            "Compiles Bytecode to Native Machine Code at runtime",
            "Compiles Source Code to Bytecode",
            "Checks for syntax errors"
        ],
        correctIndex: 1,
        explanation: "Java starts interpreted (slow). JIT detects 'Hot Spots' (frequently run code) and compiles them to super-fast native assembly."
    }
];

export const ModuleTwentyThreeJVM: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);
    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(23);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="JVM Internals & Performance"
            subtitle="Module 23: Under the Hood"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<JvmMemoryVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Write Once, Run Anywhere</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            How does Java run on both Mac and Windows? The <strong>JVM (Java Virtual Machine)</strong> translates your Bytecode (<code>.class</code>) into CPU instructions.
                        </p>
                        <p className="text-slate-300 text-sm">
                            It also manages memory for you, so you don't have to (unlike C++).
                        </p>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">The Heap Generations</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Java assumes <strong>"Most objects die young"</strong> (Weak Generational Hypothesis).
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-300">
                            <li><strong className="text-green-400">Eden:</strong> The nursery. New objects are born here. Very chaotic.</li>
                            <li><strong className="text-yellow-400">Survivor (S0/S1):</strong> The waiting room. Objects that survived one GC event.</li>
                            <li><strong className="text-red-400">Old Gen:</strong> The retirement home. Long-lived objects (e.g., Cache, Service Beans).</li>
                        </ul>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Garbage Collection (GC)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            When memory is full, the GC wakes up.
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            Minor GC: Cleans Young Gen. Very Fast (ms).<br />
                            Major GC: Cleans Old Gen. Slow. Can freeze app.<br />
                            G1GC / ZGC: Modern algorithms to reduce freeze time.
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-green-400 mb-4">
                                🚀 The JIT Compiler
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Why is Java almost as fast as C++?
                            </p>
                            <p className="text-sm text-slate-300">
                                The <strong>Just-In-Time (JIT)</strong> compiler watches your code run. If a method is called 10,000 times ("Hot"), JIT replaces the slow bytecode with highly optimized Machine Code.
                            </p>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="High-Frequency Trading firms tune the JVM to avoid GC pauses."
                    impact="A 100ms GC pause can cost millions of dollars in a trading system."
                    role="Performance Engineers."
                />
            </div>
        </LessonLayout>
    );
};
