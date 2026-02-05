import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { ModernJavaVis } from '../visualizations/modern/ModernJavaVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export const ModuleTwentySixModern: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const handleComplete = () => {
        markComplete(26);
        navigate('/learn');
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Modern Java (17 & 21)"
            subtitle="Module 26: The New Era of Java"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<ModernJavaVis />}
            onComplete={handleComplete}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-emerald-400">Why Upgrade from Java 8?</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Many companies are still stuck on Java 8 (released in 2014!). But Java has evolved to become concise, faster, and more cloud-native.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex gap-3 bg-slate-900 p-3 rounded-lg border border-white/5">
                                <span className="text-2xl">🚀</span>
                                <div>
                                    <strong className="text-white block">Performance</strong>
                                    <span className="text-sm text-slate-400">G1GC (Garbage Collector) improvements in Java 17 reduce pause times significantly.</span>
                                </div>
                            </li>
                            <li className="flex gap-3 bg-slate-900 p-3 rounded-lg border border-white/5">
                                <span className="text-2xl">✍️</span>
                                <div>
                                    <strong className="text-white block">Conciseness</strong>
                                    <span className="text-sm text-slate-400">Features like Records and 'var' reduce boilerplate code by 50%+.</span>
                                </div>
                            </li>
                        </ul>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Records (Data Carriers)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Stop writing getters, setters, equals, hashCode, and toString for simple DTOs (Data Transfer Objects).
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            <span className="text-slate-500">// Old Way (POJO)</span><br />
                            public class User {'{'}<br />
                            &nbsp;&nbsp;private final String name;<br />
                            &nbsp;&nbsp;public User(String name) {'{'} this.name = name; {'}'}<br />
                            &nbsp;&nbsp;public String getName() {'{'} return name; {'}'}<br />
                            {'}'}<br /><br />
                            <span className="text-blue-400 font-bold">// New Way (Java 14+)</span><br />
                            public record User(String name) {'{}'}
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Records are <strong>Immutable</strong> by default (fields are final). Perfect for API responses and Database entities.
                        </p>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Sealed Classes (Java 17)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Usually, if you make a class `public`, <em>anyone</em> can extend it. <strong>Sealed Classes</strong> let you restrict WHO can be your child.
                        </p>
                        <div className="bg-slate-900 border border-purple-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            public <span className="text-purple-400">sealed</span> interface Shape <br />
                            &nbsp;&nbsp;<span className="text-purple-400">permits</span> Circle, Square {'{}'}<br /><br />

                            public final class Circle implements Shape {'{}'}<br />
                            public final class Square implements Shape {'{}'}<br />
                            <span className="text-slate-500">// public class Triangle implements Shape &lt;-- ERROR! Not permitted.</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            This gives you total control over your class hierarchy, enabling exhaustive pattern matching in switch statements.
                        </p>
                    </section>
                )}

                {step === 4 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">Pattern Matching (Java 21)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            We can now switch on Types! No more `instanceof` casting chains.
                        </p>
                        <div className="bg-slate-900 border border-orange-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            static String check(Object obj) {'{'}<br />
                            &nbsp;&nbsp;return switch (obj) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;case Integer i -&gt; "It is a number: " + i;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;case String s  -&gt; "It is a string: " + s;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;case null      -&gt; "It is null";<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;default        -&gt; "Unknown type";<br />
                            &nbsp;&nbsp;{'}'};<br />
                            {'}'}
                        </div>
                        <RealWorldContext
                            useCase="Processing different types of Events (UserLoginEvent, PaymentFailedEvent) in a single stream."
                            impact="Cleaner, safer code. The compiler warns you if you miss a case (when used with Sealed Classes)."
                            role="Senior Engineers use this to write robust Domain Logic."
                        />
                    </section>
                )}

            </div>
        </LessonLayout>
    );
};
