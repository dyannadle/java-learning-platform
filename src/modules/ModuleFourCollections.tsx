import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { CollectionsVisualization } from '../visualizations/CollectionsVisualization';
import { HashMapVis } from '../visualizations/collections/HashMapVis';
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
    const totalSteps = 5; // List, Set, Map, Summary, Deep Dive

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

                {step === 5 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                                🔧 Under the Hood: HashMap Internals
                            </h2>
                            <p className="text-sm text-slate-300 mb-6">
                                A HashMap is actually an <strong>Array of Buckets</strong>. When you <code>put(key, val)</code>, Java calculates <code>hash(key) % size</code> to find the index.
                            </p>

                            {/* NEW VISUALIZATION */}
                            <HashMapVis />

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="bg-black/50 p-3 rounded-lg font-mono text-xs text-slate-300">
                                    <strong>Collision:</strong> If two keys land in the same bucket, Java links them together (LinkedList).
                                </div>
                                <div className="bg-black/50 p-3 rounded-lg font-mono text-xs text-slate-300">
                                    <strong>Resizing:</strong> When the Table is 75% full, Java doubles the size and re-calculates indexes for EVERYTHING. Performance hit!
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                                <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">⚠️ Common Pitfalls</h3>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-slate-300">
                                    <li>
                                        <strong>ConcurrentModificationException:</strong>
                                        <div className="text-[10px] bg-black/30 p-1 rounded mt-1 font-mono">
                                            for(String s : list) list.remove(s); // CRASH!
                                        </div>
                                        Use <code>Iterator.remove()</code> instead.
                                    </li>
                                    <li>
                                        <strong>Mutable Keys:</strong> Never use a mutable object as a Map Key. If fields change, hashCode changes, and you lose your data forever.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Yz Interview Prep</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Mid Level</p>
                                        <p className="text-sm text-white">"Difference between Array and ArrayList?"</p>
                                        <p className="text-xs text-slate-400 mt-1">Array is fixed size. ArrayList grows dynamically (50% increase each resize).</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Senior Level</p>
                                        <p className="text-sm text-white">"Why is HashMap lookup O(1)?" (Direct index access via Hash). "Worst case?" (O(n) if all hashes collide).</p>
                                    </div>
                                </div>
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
