import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { ControlFlowVisualization } from '../visualizations/ControlFlowVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export const ModuleFiveControlFlow: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();

    const handleComplete = () => {
        markComplete(5);
        navigate('/learn');
    };

    const [step, setStep] = useState(1);
    const totalSteps = 4; // If, Loop, Summary, Deep Dive

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Control Flow"
            subtitle="Module 5: Logic & Loops"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<ControlFlowVisualization />}
            onComplete={handleComplete}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-300">Making Decisions (If/Else)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Code isn't just a straight line. Sometimes you need to fork the path. This is called <strong>Control Flow</strong>.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In the visualization, the diamond shape represents a decision. If the condition is true, we go one way; if false, we go another.
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-blue-200">
                            if (N &lt; 5) {'{'} <br />
                            &nbsp;&nbsp; print(N); <br />
                            {'}'} else {'{'} <br />
                            &nbsp;&nbsp; print("Done"); <br />
                            {'}'}
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-amber-300">Repetition (Loops)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            The real power of computers is doing the same thing millions of times without getting bored. The arrow looping back in the visualization represents a <code>while</code> loop.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400 border-l-2 border-amber-500/50 pl-4">
                            <li>• <strong>Condition:</strong> The loop keeps running AS LONG AS the result is True.</li>
                            <li>• <strong>Infinite Loop:</strong> If N never reaches 5, the program runs forever (and crashes).</li>
                        </ul>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-xs font-mono bg-slate-800 p-3 rounded text-amber-200">
                                <div className="text-[10px] text-slate-500 mb-1">// Old Switch</div>
                                switch (day) {'{'} <br />
                                &nbsp;&nbsp; case 1: print("Mon"); break; <br />
                                &nbsp;&nbsp; case 2: print("Tue"); break; <br />
                                {'}'}
                            </div>
                            <div className="text-xs font-mono bg-slate-800 p-3 rounded text-green-200">
                                <div className="text-[10px] text-slate-500 mb-1">// New Switch (Java 14+)</div>
                                String res = switch (day) {'{'}<br />
                                &nbsp;&nbsp; case 1, 5 -&gt; "Work";<br />
                                &nbsp;&nbsp; default -&gt; "Rest";<br />
                                {'}'};
                            </div>
                        </div>

                        <div className="mt-4 bg-slate-900 border border-white/5 p-3 rounded">
                            <h4 className="text-xs font-bold text-white mb-2">Deep Dive: Break & Continue</h4>
                            <ul className="space-y-1 text-[10px] text-slate-400">
                                <li><strong className="text-red-400">break;</strong> Exits the loop immediately.</li>
                                <li><strong className="text-blue-400">continue;</strong> Skips current iteration, jumps to next.</li>
                                <li><strong className="text-violet-400">label:</strong> You can name loops logic: loops (e.g., `outer:`) to break out of nested loops.</li>
                            </ul>
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-lg font-semibold mb-2 text-white">Summary</h2>
                        <p className="text-slate-300 mb-4">Logic gates and loops are the atoms of all algorithms.</p>

                        <RealWorldContext
                            useCase="Video games use a 'Game Loop' that runs 60 times per second to check input and render graphics."
                            impact="Bad loops cause 'Freezes'. Efficient logic makes apps feel snappy."
                            role="A Junior Dev must know how to avoid O(n^2) nested loops that kill performance."
                        />
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                                🔧 Under the Hood: Branch Prediction
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                CPUs try to guess which way an <code>if</code> statement will go BEFORE calculating it, to stay fast.
                            </p>
                            <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-slate-300 mb-4">
                                <strong>The Sorted Logic Fact:</strong><br />
                                Processing a SORTED array is faster than an UNSORTED array with an <code>if</code> condition.<br />
                                <em>Why?</em> The CPU can predict "True, True, True..." easily. Random data makes it stumble (Branch Misprediction).
                            </div>
                            <div className="text-xs text-slate-400">
                                <strong>Bytecode Secret:</strong> A <code>switch</code> statement compiles to either a <code>tableswitch</code> (O(1) Jump Table, fast) or <code>lookupswitch</code> (O(log n) Binary Search, slower) depending on how close your case numbers are.
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                                <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">⚠️ Common Pitfalls</h3>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-slate-300">
                                    <li>
                                        <strong>Switch Fallthrough:</strong> Forgetting <code>break;</code> executes ALL cases below it. (Fixed in new Java 14 switch).
                                    </li>
                                    <li>
                                        <strong>Floating Point Logic:</strong> <code>if (0.1 + 0.2 == 0.3)</code> is FALSE! It equals 0.300000004. Use <code>BigDecimal</code> for money.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Yz Interview Prep</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Mid Level</p>
                                        <p className="text-sm text-white">"What is Big O notation?"</p>
                                        <p className="text-xs text-slate-400 mt-1">It measures how execution time grows with data size. O(1) is instant. O(n) is linear.</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Senior Level</p>
                                        <p className="text-sm text-white">"Can you use a Switch on a String?" (Yes, since Java 7. internally it uses `hashCode()` and `equals()`).</p>
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
