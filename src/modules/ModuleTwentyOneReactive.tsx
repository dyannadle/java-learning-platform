import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { MarbleDiagramVis } from '../visualizations/reactive/MarbleDiagramVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is a 'Mono' in Project Reactor?",
        options: [
            "A disease",
            "A stream that emits 0 or 1 item",
            "A stream that emits infinite items",
            "A type of database"
        ],
        correctIndex: 1,
        explanation: "Mono = 0 or 1 item (like Optional but async). Flux = 0 to N items (like List but async)."
    },
    {
        id: 2,
        text: "What is 'Backpressure'?",
        options: [
            "Pain in your lower back",
            "The ability of a Consumer to tell the Producer: 'Slow down, I'm overwhelmed!'",
            "Compressing files",
            "A database backup strategy"
        ],
        correctIndex: 1,
        explanation: "Backpressure is crucial. It prevents a fast producer (e.g., Twitter Firehose) from crushing a slow consumer (e.g., your phone)."
    },
    {
        id: 3,
        text: "Why use Spring WebFlux instead of Spring MVC?",
        options: [
            "It's always faster",
            "To handle massive concurrency with few threads (Non-Blocking I/O)",
            "It's easier to debug",
            "It supports XML better"
        ],
        correctIndex: 1,
        explanation: "WebFlux uses the Netty Event Loop. It can handle 10,000 requests with just a few threads, whereas MVC would need 10,000 threads."
    }
];

export const ModuleTwentyOneReactive: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);
    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(21);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Reactive Programming & WebFlux"
            subtitle="Module 21: Modern APIs"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<MarbleDiagramVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Thinking in Streams</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Traditional programming is "Pull" (I ask for data, I wait). Reactive is "Push" (Data comes to me when ready).
                        </p>
                        <p className="text-slate-300 text-sm">
                            Everything is a stream. A mouse click, a database result, a timer.
                        </p>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">Mono vs Flux</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Project Reactor (Spring's reactive library) has two main types:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-300">
                            <li><strong className="text-white">Mono&lt;T&gt;</strong>: Emits 0 or 1 item. (e.g., "Find User by ID")</li>
                            <li><strong className="text-white">Flux&lt;T&gt;</strong>: Emits 0 to N items. (e.g., "Find All Users")</li>
                        </ul>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Operators</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Just like Java Streams, you can map, filter, and reduce. But these happen <strong>Asynchronously</strong>.
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            Flux.fromIterable(users)<br />
                            &nbsp;&nbsp;.filter(u -&gt; u.isActive())<br />
                            &nbsp;&nbsp;.map(u -&gt; u.getName())<br />
                            &nbsp;&nbsp;.subscribe(name -&gt; print(name));
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-green-400 mb-4">
                                🚀 Spring WebFlux
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                The non-blocking alternative to Spring MVC.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-400 font-mono">
                                <li>Uses Netty (not Tomcat) by default.</li>
                                <li>Great for high-concurrency (10k+ users).</li>
                                <li>Use for Streaming Data (Server-Sent Events).</li>
                            </ul>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Netflix uses Reactive programming to handle billions of events per day."
                    impact="It allows servers to handle many more concurrent users with less hardware (lower cloud bill)."
                    role="Backend Engineers in High-Scale Startups."
                />
            </div>
        </LessonLayout>
    );
};
