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
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-amber-200">
                            while (N &lt; 5) {'{'} <br />
                            &nbsp;&nbsp; System.out.println(N); <br />
                            &nbsp;&nbsp; N++; // Increment to eventually stop <br />
                            {'}'}
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
