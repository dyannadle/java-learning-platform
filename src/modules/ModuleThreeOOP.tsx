import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { OOPVisualization } from '../visualizations/OOPVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';

export const ModuleThreeOOP: React.FC = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Classes & Objects"
            subtitle="Module 3: Object Oriented Programming"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<OOPVisualization />}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-blue-300">The Blueprint Metaphor</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        Java is an "Object Oriented" language. This means we model our code after real-world things.
                    </p>
                </section>

                {step >= 1 && (
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs">CLASS</span>
                            = The Blueprint
                        </h3>
                        <p className="text-slate-400 text-sm mb-2">
                            A Class is a template. It defines what properties (color, speed) an object WILL have, but it is not the object itself.
                        </p>
                        <p className="text-slate-500 text-xs italic">
                            "You cannot drive a blueprint of a car."
                        </p>
                    </div>
                )}

                {step >= 2 && (
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded text-xs">OBJECT</span>
                            = The Actual Thing
                        </h3>
                        <p className="text-slate-400 text-sm mb-2">
                            An Object is an "instance" of a class. You can create thousands of unique objects from one single class.
                        </p>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-900 p-3 rounded border border-white/5">
                                <h4 className="text-white text-xs font-bold mb-1">Constructors</h4>
                                <p className="text-[10px] text-slate-400 mb-2">Special method to initialize objects. Called when using `new`.</p>
                                <code className="text-[10px] text-blue-300 bg-black/30 p-2 block rounded font-mono">
                                    {`Car(String c) {
  this.color = c; // 'this' refers to current object
}`}
                                </code>
                            </div>

                            <div className="bg-slate-900 p-3 rounded border border-white/5">
                                <h4 className="text-white text-xs font-bold mb-2">Access Modifiers</h4>
                                <table className="w-full text-[10px]">
                                    <thead>
                                        <tr className="text-slate-500 border-b border-white/10">
                                            <th className="text-left pb-1">Keyword</th>
                                            <th className="text-left pb-1">Visibility</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-300">
                                        <tr><td className="py-1 text-green-400">public</td><td>Everywhere</td></tr>
                                        <tr><td className="py-1 text-blue-400">protected</td><td>Package + Kids</td></tr>
                                        <tr><td className="py-1 text-yellow-400">no modifier</td><td>Package Only</td></tr>
                                        <tr><td className="py-1 text-red-400">private</td><td>Class Only</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <pre className="font-mono text-xs bg-black/30 p-2 rounded text-slate-300 mt-4">
                            {`Car myCar = new Car("Red"); // Constructor called`}
                        </pre>
                    </div>
                )}

                {step >= 3 && (
                    <section>
                        <h3 className="text-lg font-semibold mb-2 text-white">Why use OOP?</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex gap-2 items-start">
                                <span className="text-blue-400 font-bold">•</span>
                                <span><strong>Organization:</strong> Group related data and behaviors together.</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-blue-400 font-bold">•</span>
                                <span><strong>Reusability:</strong> writes the 'Car' logic once, use it for 1,000 traffic simulation cars.</span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="text-blue-400 font-bold">•</span>
                                <span><strong>Maintenance:</strong> If you need to add a 'fuel' property, you only change the Blueprint!</span>
                            </li>
                        </ul>
                    </section>
                )}

                <RealWorldContext
                    useCase="In a Banking App, 'BankAccount' is a Class. Every user's account is an Object. The logic for 'withdraw()' is written only ONCE in the class."
                    impact="OOP allows massive teams to work together. One team builds the 'User' class, another builds the 'product' class."
                    role="System Architects design the 'Class Hierarchy' to ensure the code stays clean as the app grows to millions of lines."
                />
            </div>
        </LessonLayout>
    );
};
