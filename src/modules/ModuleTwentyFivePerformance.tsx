import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { ProfilerVis } from '../visualizations/performance/ProfilerVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What does 'java.lang.OutOfMemoryError: Java heap space' mean?",
        options: [
            "Your hard drive is full",
            "The JVM ran out of Heap memory (too many live objects)",
            "The CPU is overheating",
            "You have too many threads"
        ],
        correctIndex: 1,
        explanation: "This happens when your application keeps creating objects but never releases them (Memory Leak), or if you just need to increase Xmx."
    },
    {
        id: 2,
        text: "What is a 'Thread Dump' useful for?",
        options: [
            "Backing up the database",
            "Diagnosing 100% CPU usage or Deadlocks",
            "Deleting threads",
            "Checking network speed"
        ],
        correctIndex: 1,
        explanation: "A Thread Dump shows exactly what every single thread is doing at that moment. Essential for finding infinite loops."
    },
    {
        id: 3,
        text: "Which tool is commonly used to profile Java apps?",
        options: [
            "Photoshop",
            "VisualVM (or JProfiler/YourKit)",
            "Word",
            "Excel"
        ],
        correctIndex: 1,
        explanation: "VisualVM is a free tool included with many JDKs that lets you inspect the Heap and CPU usage live."
    }
];

export const ModuleTwentyFivePerformance: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);
    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(25);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Performance Tuning"
            subtitle="Module 25: Optimization"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<ProfilerVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">The Silent Killers</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Performance issues usually come in two flavors:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-300">
                            <li><strong className="text-red-400">CPU Spike:</strong> App freezes because it's stuck in a loop.</li>
                            <li><strong className="text-yellow-400">Memory Leak:</strong> App gets slower and slower until it crashes (OOM).</li>
                        </ul>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">Memory Leaks</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In Java, the GC handles memory. But if you put an object in a <code>static List</code> and never remove it, the GC <strong>cannot</strong> delete it.
                        </p>
                        <p className="text-sm text-slate-400">
                            The "Sawtooth" pattern in the graph transforms into a "Staircase to Heaven" (and then a crash).
                        </p>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Diagnosing CPU Issues</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            If your CPU is at 100%, take a <strong>Thread Dump</strong>.
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl font-mono text-xs text-slate-300 whitespace-pre-wrap">
                            {`"Thread-5" prio=5 tid=0x00... runnable
   at com.myapp.Service.calc(Service.java:42)
   at com.myapp.Controller.handle(Controller.java:10)`}
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                            This tells you EXACTLY where the code is stuck (Line 42).
                        </p>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-green-400 mb-4">
                                🛠️ Profiling Tools
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Use <strong>VisualVM</strong> (Desktop) or <strong>JProfiler</strong>.
                            </p>
                            <p className="text-sm text-slate-300">
                                They attach to your running JVM and show you live charts, exactly like the simulation above!
                            </p>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Netflix Engineering uses 'Flame Graphs' to visualize where their CPU time goes across thousands of microservices."
                    impact="Optimizing a hot method by 10% can save millions in AWS compute costs."
                    role="Site Reliability Engineers (SRE)."
                />
            </div>
        </LessonLayout>
    );
};
