import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { SpringIoCVis } from '../visualizations/spring/SpringIoCVis';
import { BeanScopeVis } from '../visualizations/spring/BeanScopeVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is Inversion of Control (IoC)?",
        options: [
            "Writing code backwards",
            "Giving control of object creation to a container/framework",
            "Reversing a loop",
            "A database compilation error"
        ],
        correctIndex: 1,
        explanation: "Instead of you calling 'new Service()', the Framework calls it for you. You gave up control to the container."
    },
    {
        id: 2,
        text: "Which annotation tells Spring to inject a dependency?",
        options: [
            "@InjectMe",
            "@Autowired",
            "@Spring",
            "@Connect"
        ],
        correctIndex: 1,
        explanation: "@Autowired tells Spring: 'Please find a matching bean in the context and plug it in here'."
    },
    {
        id: 3,
        text: "What is the default scope of a Spring Bean?",
        options: [
            "Prototype (New every time)",
            "Singleton (One per app)",
            "Request (One per HTTP request)",
            "Session (One per User)"
        ],
        correctIndex: 1,
        explanation: "By default, Spring Beans are Singletons. This saves memory and improves performance for stateless services."
    }
];

export const ModuleTwelveSpringCore: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    const totalSteps = 3; // IoC + Scopes + Quiz

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(12);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const getVisualization = () => {
        switch (step) {
            case 1: return <SpringIoCVis />;
            case 2: return <BeanScopeVis />;
            default: return <SpringIoCVis />;
        }
    };

    return (
        <LessonLayout
            title="Spring Core"
            subtitle="Module 12: Dependency Injection"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={getVisualization()}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-green-400">Inversion of Control (IoC)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In traditional programming, your code controls everything. You create objects with <code>new</code>.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In <strong>Spring</strong>, the Framework controls the objects. It creates them, wires them together, and manages their life. This is called the <strong>Application Context</strong>.
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-green-200">
                            @Component<br />
                            class UserService {'{'}<br />
                            &nbsp;&nbsp; @Autowired<br />
                            &nbsp;&nbsp; UserRepository repo; // Spring fills this automatically!<br />
                            {'}'}
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-yellow-400">Bean Scopes</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            When Spring creates a bean, how long does it live?
                        </p>
                        <ul className="list-disc pl-5 space-y-3 text-slate-300 mb-4">
                            <li>
                                <strong className="text-blue-400">Singleton (Default)</strong>: Only ONE instance is created. It is reused everywhere. Great for caching and stateless services.
                            </li>
                            <li>
                                <strong className="text-orange-400">Prototype</strong>: A NEW instance is created every time you ask for it. Useful if the bean holds unique user data.
                            </li>
                        </ul>
                        <RealWorldContext
                            useCase="Your Database Connection Pool is a Singleton. You don't want to create a new pool for every single query."
                            impact="Saving memory (Singleton) vs Isolation (Prototype). Choosing the wrong scope can lead to massive bugs."
                            role="Senior Engineers configure scopes to optimize memory usage."
                        />
                    </section>
                )}
            </div>
        </LessonLayout>
    );
};
