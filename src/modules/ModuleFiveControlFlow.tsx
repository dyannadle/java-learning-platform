import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { ControlFlowVisualization } from '../visualizations/ControlFlowVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';

export const ModuleFiveControlFlow: React.FC = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

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
            </div>
        </LessonLayout>
    );
};
