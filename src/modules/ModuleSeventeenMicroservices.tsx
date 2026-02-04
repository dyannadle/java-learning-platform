import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { MicroservicesVis } from '../visualizations/microservices/MicroservicesVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is a 'Monolith'?",
        options: [
            "A type of ancient stone",
            "A single application where all code (UI, API, DB) is in one massive project",
            "A database technology",
            "A very fast computer"
        ],
        correctIndex: 1,
        explanation: "A Monolith is a single deployable unit. Easy to start, but hard to scale as it grows."
    },
    {
        id: 2,
        text: "What is the role of an API Gateway?",
        options: [
            "To block all internet traffic",
            "To act as a single entry point that routes requests to the correct internal service",
            "To create databases",
            "To pay for APIs"
        ],
        correctIndex: 1,
        explanation: "The Gateway (like Spring Cloud Gateway) handles routing, security, and rate limiting, so clients don't talk to services directly."
    },
    {
        id: 3,
        text: "What is 'Service Discovery' (Eureka)?",
        options: [
            "Finding a service on Google Maps",
            "A phonebook for services. It lets 'Order Service' find 'User Service' without hardcoding IP addresses.",
            "A way to discover new Java features",
            "An IDE plugin"
        ],
        correctIndex: 1,
        explanation: "In the cloud, IP addresses change constantly. Eureka allows services to find each other by NAME, not IP."
    }
];

export const ModuleSeventeenMicroservices: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    const totalSteps = 4; // Intro + Gateway + Discovery + Patterns

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(17);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Microservices Architecture"
            subtitle="Module 17: Breaking the Monolith"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<MicroservicesVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">Monolith vs Microservices</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In a <strong>Monolith</strong>, if one tiny part breaks (e.g., PDF generation), the <strong>entire server crashes</strong>.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In <strong>Microservices</strong>, we split the app into small, independent services (User Service, Order Service, Payment Service).
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-bold text-center">
                            <div className="bg-red-500/10 border border-red-500/30 p-4 rounded">
                                <span className="text-red-400 block mb-1">Monolith</span>
                                ❌ Hard to Scale<br />
                                ❌ Single Point of Failure<br />
                                ✅ Easy to Deploy (Simple)
                            </div>
                            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded">
                                <span className="text-green-400 block mb-1">Microservices</span>
                                ✅ Scalable Independently<br />
                                ✅ Fault Tolerant<br />
                                ❌ Complex Ops (DevOps)
                            </div>
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Spring Cloud Gateway</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            How does the frontend talk to 50 different services? It doesn't. It talks to <strong>One Interface</strong>: The Gateway.
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            spring:<br />
                            &nbsp;&nbsp;cloud:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;gateway:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routes:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- id: user-service<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;uri: lb://USER-SERVICE<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;predicates:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Path=/users/**
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            This YAML config tells Spring: "If a request starts with /users, send it to the User Service."
                        </p>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Service Discovery (Eureka)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In the cloud, servers restart and change IP addresses all the time.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
                            <li>
                                Each Service <strong>Registers</strong> itself with Eureka ("Hi, I'm User-Service, I'm at 10.0.0.5").
                            </li>
                            <li>
                                Other services <strong>Ask</strong> Eureka ("Where is User-Service?").
                            </li>
                            <li>
                                This is called <strong>Client-Side Load Balancing</strong>.
                            </li>
                        </ul>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-emerald-400 mb-4">
                                🔧 Deep Dive: Distributed Tracing
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Debugging a monolith is easy (check one log file). Debugging microservices is a nightmare (50 log files).
                            </p>
                            <p className="text-sm text-slate-300 mb-4">
                                Solution: <strong>Zipkin & Sleuth</strong> (Micrometer Tracing).
                            </p>
                            <div className="bg-black/50 p-2 rounded text-xs font-mono text-slate-400">
                                [user-service, <span className="text-blue-400">traceId=abc1234</span>, spanId=custom]
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                                Spring adds a unique Trace ID to every log line. This ID travels across services, so you can filter logs by ONE request.
                            </p>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Netflix is the most famous example of Microservices. They have over 1,000 services talking to each other."
                    impact="If the Recommendation Engine crashes, you can still play movies. The system degrades gracefully."
                    role="Cloud Architects design these systems."
                />
            </div>
        </LessonLayout>
    );
};
