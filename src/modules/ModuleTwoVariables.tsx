import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { MemoryVisualization } from '../visualizations/MemoryVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export const ModuleTwoVariables: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();

    const handleComplete = () => {
        markComplete(2);
        navigate('/learn');
    };

    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    // Determine memory state based on step
    const getMemoryItems = () => {
        const items = [];
        if (step >= 2) items.push({ id: '1', name: 'age', value: '25', type: 'primitive' as const });
        if (step >= 3) items.push({ id: '2', name: 'score', value: '98.5', type: 'primitive' as const });
        if (step >= 4) {
            items.push({ id: '3', name: 'name', value: 'Alice', type: 'reference' as const, address: 'x101' });
        }
        return items;
    };

    return (
        <LessonLayout
            title="Variables & Memory"
            subtitle="Module 2: The Stack and The Heap"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<MemoryVisualization items={getMemoryItems()} />}
            onComplete={handleComplete}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section>
                    <h2 className="text-xl font-semibold mb-4 text-orange-300">Variables are Containers</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        In Java, data is stored in memory. But WHERE in memory? That depends on the <strong>Type</strong> of data.
                    </p>
                </section>

                {step >= 1 && (
                    <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-orange-500">
                        <h3 className="font-bold text-white mb-2">Code Execution</h3>
                        <pre className="font-mono text-sm text-slate-300 bg-black/30 p-3 rounded">
                            {`public void main() {
  // Step 2
  int age = 25;
  
  // Step 3
  double score = 98.5;

  // Step 4
  String name = "Alice";
}`}
                        </pre>
                    </div>
                )}

                {step >= 2 && (
                    <section>
                        <h3 className="text-lg font-semibold mb-2 text-white">Primitive Types (The Stack)</h3>
                        <p className="text-slate-400 text-sm mb-2">
                            Simple values like <code className="text-orange-400">int</code>, <code className="text-orange-400">double</code>, and <code className="text-orange-400">boolean</code> live on the <strong>Stack</strong>.
                        </p>

                        <div className="mt-4 overflow-hidden rounded-lg border border-white/10">
                            <table className="w-full text-xs text-left">
                                <thead className="bg-slate-900 text-slate-400 font-bold uppercase">
                                    <tr>
                                        <th className="p-2">Type</th>
                                        <th className="p-2">Size</th>
                                        <th className="p-2">Range/Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 bg-slate-800/50">
                                    <tr><td className="p-2 font-mono text-orange-300">byte</td><td className="p-2">8-bit</td><td className="p-2">-128 to 127</td></tr>
                                    <tr><td className="p-2 font-mono text-orange-300">int</td><td className="p-2">32-bit</td><td className="p-2">-2 billion to 2 billion</td></tr>
                                    <tr><td className="p-2 font-mono text-orange-300">long</td><td className="p-2">64-bit</td><td className="p-2">Very huge numbers (`L` suffix)</td></tr>
                                    <tr><td className="p-2 font-mono text-orange-300">boolean</td><td className="p-2">1-bit*</td><td className="p-2">`true` or `false`</td></tr>
                                    <tr><td className="p-2 font-mono text-orange-300">char</td><td className="p-2">16-bit</td><td className="p-2">Single character (`'A'`)</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="p-3 bg-slate-800 rounded border border-white/5">
                                <h4 className="text-white text-xs font-bold mb-1">Type Casting</h4>
                                <p className="text-xs text-slate-400 mb-1"><strong>Widening:</strong> Automatic.</p>
                                <code className="text-[10px] text-green-300 bg-black/30 p-1 block">double d = 100; // 100.0</code>
                                <p className="text-xs text-slate-400 mt-2 mb-1"><strong>Narrowing:</strong> Manual (Risk of data loss!).</p>
                                <code className="text-[10px] text-red-300 bg-black/30 p-1 block">int i = (int) 9.99; // 9</code>
                            </div>
                            <div className="p-3 bg-slate-800 rounded border border-white/5">
                                <h4 className="text-white text-xs font-bold mb-1">Constants</h4>
                                <p className="text-xs text-slate-400">Use `final` keyword. Variable cannot be reassigned.</p>
                                <code className="text-[10px] text-blue-300 bg-black/30 p-1 block mt-2">final int MAX_SPEED = 120;</code>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm mt-4">
                            The Stack is fast, orderly, and strictly managed. When a method finishes, the stack frame is popped (deleted).
                        </p>
                    </section>
                )}

                {step >= 4 && (
                    <section>
                        <h3 className="text-lg font-semibold mb-2 text-white">Reference Types (The Heap)</h3>
                        <p className="text-slate-400 text-sm mb-2">
                            Complex objects like <code className="text-blue-400">String</code>, <code className="text-blue-400">Arrays</code>, or your own Classes live on the <strong>Heap</strong>.
                        </p>
                        <p className="text-slate-400 text-sm">
                            The variable on the Stack (<code className="font-mono">name</code>) only holds the <strong>Address</strong> (@x101) of the actual object.
                        </p>
                        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded text-xs text-blue-200">
                            <strong>Why does this matter?</strong> If you pass a primitive to a function, you pass a COPY. If you pass an Object, you pass the REMOTE CONTROL (Reference). Modifying the object inside the function modifies the original!
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="High-Frequency Trading systems avoid creating too many Objects on the Heap to prevent 'Garbage Collection' pauses."
                    impact="Stack access is immediate. Heap access requires finding the address first, which is slightly slower."
                    role="Senior Developers optimize memory usage by choosing primitives (int) over objects (Integer) where performance is critical."
                />
            </div>
        </LessonLayout>
    );
};

