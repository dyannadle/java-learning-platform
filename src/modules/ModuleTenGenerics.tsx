import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { GenericsVisualization } from '../visualizations/GenericsVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is the main benefit of Generics?",
        options: [
            "To make code run faster at runtime",
            "To provide compile-time type safety and eliminate casting",
            "To allow multiple classes to communicate via network",
            "To encrypt data in memory"
        ],
        correctIndex: 1,
        explanation: "Generics let the compiler catch type errors (e.g., PUTTING a String into a List of Integers) BEFORE you run the program."
    },
    {
        id: 2,
        text: "What happens to Generic types at Runtime?",
        options: [
            "They are erased (Type Erasure)",
            "They are preserved and checked by the JVM",
            "They create new classes for each type",
            "They slow down the application"
        ],
        correctIndex: 0,
        explanation: "Java uses 'Type Erasure' to maintain backward compatibility. List<String> becomes just List (raw type) at runtime."
    },
    {
        id: 3,
        text: "What does strict usage of '?' wildcard mean: List<?>",
        options: [
            "List of potentially anything",
            "List of questions",
            "List of Integers only",
            "List of Nulls"
        ],
        correctIndex: 0,
        explanation: "The wildcard <?> represents an unknown type. It's useful when your code doesn't care about the specific type inside."
    }
];

export const ModuleTenGenerics: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(10);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Generics"
            subtitle="Module 10: Type Safety & <T>"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<GenericsVisualization />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-300">Life Before Generics</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Before Java 5, collections were "Raw". A <code>ArrayList</code> held <code>Object</code> type.
                            You could accidentally put a String in a list of Integers, and you wouldn't know until the program crashed (Runtime Error).
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-slate-400">
                             // Old Code (Unsafe)<br />
                            List list = new ArrayList();<br />
                            list.add(10);<br />
                            list.add("Hello"); // Compiles fine...<br />
                            <br />
                             // CRASH!<br />
                            Integer x = (Integer) list.get(1);
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-emerald-300">The Diamond &lt;&gt;</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Generics allow you to specify the type a class operates on. This moves errors from <strong>Runtime</strong> (Crash) to <strong>Compile Time</strong> (Red Squiggly Line).
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-emerald-200">
                             // New Code (Safe)<br />
                            List&lt;Integer&gt; list = new ArrayList&lt;&gt;();<br />
                            list.add(10);<br />
                            <br />
                            <span className="text-red-400 decoration-wavy underline">list.add("Hello");</span> // Compiler Error!
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-300">Generic Methods & Classes</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            You can write your own generic classes. <code className="text-purple-300">T</code> is a placeholder for "Type".
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-purple-200">
                            public class Box&lt;T&gt; {'{'}<br />
                            &nbsp;&nbsp; private T item;<br />
                            &nbsp;&nbsp; public void set(T item) {'{'} this.item = item; {'}'}<br />
                            &nbsp;&nbsp; public T get() {'{'} return item; {'}'}<br />
                            {'}'}<br />
                            <br />
                            Box&lt;String&gt; b = new Box&lt;&gt;();
                        </div>
                        <div className="mt-4 bg-slate-900 border border-white/5 p-3 rounded">
                            <h4 className="text-xs font-bold text-white mb-2">Common Placeholders</h4>
                            <ul className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                                <li><code className="text-blue-400">T</code> - Type</li>
                                <li><code className="text-blue-400">E</code> - Element (Collections)</li>
                                <li><code className="text-blue-400">K</code> - Key (Maps)</li>
                                <li><code className="text-blue-400">V</code> - Value (Maps)</li>
                            </ul>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Database DAOs (Data Access Objects) use Generics to write one 'findById()' method that works for Users, Products, and Orders."
                    impact="Reduces code duplication by 70%. You don't need 'IntegerList', 'StringList', 'UserList'."
                    role="Library Authors (like Google Guava or Spring) use Generics heavily so you can use their tools with YOUR objects."
                />
            </div>
        </LessonLayout>
    );
};
