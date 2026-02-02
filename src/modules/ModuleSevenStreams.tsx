import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { StreamVisualization } from '../visualizations/StreamVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export const ModuleSevenStreams: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();

    const handleComplete = () => {
        markComplete(7);
        navigate('/learn');
    };

    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Functional Programming"
            subtitle="Module 7: Streams & Lambdas"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<StreamVisualization />}
            onComplete={handleComplete}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-300">The Declarative Shift</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Before Java 8, we wrote <strong>Imperative</strong> code: "Do this, then do that loop, then add this."
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Now we use <strong>Declarative</strong> code with Streams: "I want a list of even numbers doubled." We don't say <em>how</em> to loop, just <em>what</em> we want.
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-purple-200">
                            List&lt;Employee&gt; paid = allEmployees.stream() <br />
                            &nbsp;&nbsp; .filter(e -&gt; e.hasWorked()) <br />
                            &nbsp;&nbsp; .map(e -&gt; e.calculatePay()) <br />
                            &nbsp;&nbsp; .collect(Collectors.toList());
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-yellow-300">Lambda Expressions</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Lambdas <code>-&gt;</code> are tiny anonymous functions. They let you pass code as data.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400 border-l-2 border-yellow-500/50 pl-4">
                            <li>• <strong>Syntax:</strong> <code>(input) -&gt; body</code></li>
                            <li>• <strong>Usage:</strong> Any interface with a single method (Functional Interface) can use a Lambda.</li>
                        </ul>
                        <div className="mt-4 bg-slate-900 border border-white/5 p-3 rounded">
                            <h4 className="text-xs font-bold text-white mb-2">Old vs New</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-[10px] text-red-400 mb-1">Anonymous Inner Class</div>
                                    <pre className="text-[10px] text-slate-400">
                                        new Runnable() {'{'}<br />
                                        &nbsp;run() {'{'} print("Hi"); {'}'}<br />
                                        {'}'}
                                    </pre>
                                </div>
                                <div>
                                    <div className="text-[10px] text-emerald-400 mb-1">Lambda</div>
                                    <pre className="text-[10px] text-slate-400">
                                        () -&gt; print("Hi");
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-lg font-semibold mb-2 text-white">Summary</h2>
                        <p className="text-slate-300 mb-4">Streams make data processing readable, concise, and ready for parallelism.</p>

                        <RealWorldContext
                            useCase="Big Data processing (Spark/Kafka) uses the exact same 'Map-Reduce' concepts as Java Streams."
                            impact="Readable code is maintainable code. 10 lines of loops become 3 lines of streams."
                            role="Senior Devs prefer Streams for data pipelines but standard Loops for high-performance tight cycles."
                        />
                    </section>
                )}
            </div>
        </LessonLayout>
    );
};
