import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { MemoryVisualization } from '../visualizations/MemoryVisualization';

export const ModuleTwoVariables: React.FC = () => {
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
                        <p className="text-slate-400 text-sm">
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
            </div>
        </LessonLayout>
    );
};
