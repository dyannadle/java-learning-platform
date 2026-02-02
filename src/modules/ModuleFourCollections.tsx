import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { CollectionsVisualization } from '../visualizations/CollectionsVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export const ModuleFourCollections: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();

    const handleComplete = () => {
        markComplete(4);
        navigate('/learn');
    };

    const [step, setStep] = useState(1);
    const totalSteps = 4; // List, Set, Map, Summary

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Collections Framework"
            subtitle="Module 4: Organizing Data"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<CollectionsVisualization />}
            onComplete={handleComplete}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-300">The ArrayList (List)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            A <code>List</code> is an ordered collection (sequence). The user of this interface has precise control over where in the list each element is inserted.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400 border-l-2 border-slate-700 pl-4">
                            <li>• <strong>Order Matters:</strong> Items stay in the order you add them.</li>
                            <li>• <strong>Duplicates:</strong> Allowed. You can have "Pizza" twice.</li>
                            <li>• <strong>Access:</strong> Fast by index (get me item #5).</li>
                        </ul>

                        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="text-xs font-mono bg-slate-800 p-3 rounded text-blue-200">
                                <div className="text-[10px] text-slate-500 mb-1">// Diamond Operator &lt;&gt; infers type</div>
                                List&lt;String&gt; list = new ArrayList&lt;&gt;();
                                <br />list.add("Java");
                            </div>
                            <div className="text-xs font-mono bg-slate-800 p-3 rounded text-amber-200">
                                <div className="text-[10px] text-slate-500 mb-1">// Enhanced For-Loop</div>
                                for (String s : list) {'{'}
                                <br />&nbsp;&nbsp; print(s);
                                <br />{'}'}
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-slate-900 border border-white/5 rounded">
                            <h4 className="text-xs font-bold text-white mb-2">Deep Dive: ArrayList vs LinkedList</h4>
                            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                                <div>
                                    <strong className="text-blue-400">ArrayList</strong>
                                    <p>Backed by Array. Fast read O(1). Slow insert/delete O(n). **Use default.**</p>
                                </div>
                                <div>
                                    <strong className="text-blue-400">LinkedList</strong>
                                    <p>Doubly-linked nodes. Slow read O(n). Fast insert/delete O(1). **Use rarely.**</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-indigo-300">The HashSet (Set)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            A <code>Set</code> is a collection that contains no duplicate elements. It models the mathematical set abstraction.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400 border-l-2 border-indigo-500/50 pl-4">
                            <li>• <strong>No Duplicates:</strong> Adding "Apple" twice will trigger the second one to be ignored (return false).</li>
                            <li>• <strong>Unordered:</strong> Does not guarantee insertion order.</li>
                            <li>• <strong>Use Case:</strong> Storing output of a database query looking for unique IDs.</li>
                        </ul>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-indigo-200">
                            Set&lt;String&gt; userIds = new HashSet&lt;&gt;();
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-emerald-300">The HashMap (Map)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            A <code>Map</code> object maps keys to values. A map cannot contain duplicate keys; each key can map to at most one value.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400 border-l-2 border-emerald-500/50 pl-4">
                            <li>• <strong>Key-Value Pair:</strong> Like a dictionary. Word (Key) &rarr; Definition (Value).</li>
                            <li>• <strong>Fast Lookup:</strong> Finding a value by Key is instant (O(1)).</li>
                            <li>• <strong>Unique Keys:</strong> Keys must be unique, Values can be duplicated.</li>
                        </ul>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-emerald-200">
                            Map&lt;String, Integer&gt; scores = new HashMap&lt;&gt;();

                            <br />scores.put("Alice", 95);
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section>
                        <h2 className="text-lg font-semibold mb-2 text-white">Summary</h2>
                        <p className="text-slate-300 mb-4">Choosing the right collection is 80% of system design.</p>

                        <div className="grid grid-cols-2 gap-2 text-xs mb-6">
                            <div className="bg-slate-800 p-2 rounded">
                                <div className="font-bold text-white">List</div>
                                <div className="text-slate-500">Ordered, Duplicates OK</div>
                            </div>
                            <div className="bg-slate-800 p-2 rounded">
                                <div className="font-bold text-white">Set</div>
                                <div className="text-slate-500">Unordered, Unique</div>
                            </div>
                            <div className="bg-slate-800 p-2 rounded col-span-2">
                                <div className="font-bold text-white">Map</div>
                                <div className="text-slate-500">Key-Value Dictionary</div>
                            </div>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="E-Commerce sites use 'HashMaps' to store your Shopping Cart session, linking your Session ID (Key) to your Cart Items (Value)."
                    impact="Using the wrong collection (e.g., LinkedList instead of HashMap for lookups) can slow down a search from 1ms to 10 seconds."
                    role="Interviewers ALWAYS ask 'When would you use a LinkedList vs ArrayList?'. (Hint: ArrayList is almost always better due to CPU caching)."
                />
            </div>
        </LessonLayout>
    );
};
