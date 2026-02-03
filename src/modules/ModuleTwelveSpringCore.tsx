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

    const totalSteps = 4; // IoC + Scopes + Deep Dive + Quiz

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

                {step === 3 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                                🔧 Under the Hood: Spring Proxies
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                How does Spring make <code>@Transactional</code> annotations work? It wraps your actual class in a <strong>Proxy</strong>!
                            </p>
                            <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-slate-300 mb-4">
                                <strong>The Proxy Pattern in Action:</strong><br />
                                <div className="mt-2 text-slate-400">
                                    When you call <code>userService.save()</code>, you are actually calling <code>Proxy.save()</code>.<br />
                                    1. Proxy starts Transaction.<br />
                                    2. Proxy calls REAL <code>userService.save()</code>.<br />
                                    3. Proxy commits/rollbacks Transaction.
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                                <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">⚠️ Common Pitfalls</h3>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-slate-300">
                                    <li>
                                        <strong>Self-Invocation:</strong> Calling <code>this.methodB()</code> from <code>methodA()</code> BYPASSES the proxy! Annotations on methodB (like @Transactional) will be IGNORED.
                                    </li>
                                    <li>
                                        <strong>Circular Dependencies:</strong> Bean A needs Bean B, Bean B needs Bean A. Spring crashes at startup. Fix: Use <code>@Lazy</code> or refactor your design.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Yz Interview Prep</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Mid Level</p>
                                        <p className="text-sm text-white">"Difference between @Component, @Service, @Repository?"</p>
                                        <p className="text-xs text-slate-400 mt-1">Technically they are the same (Stereotypes). But @Repository adds Exception Translation (SQL -&gt; Spring Exceptions).</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Senior Level</p>
                                        <p className="text-sm text-white">"ApplicationContext vs BeanFactory?" (BeanFactory is lazy/basic. ApplicationContext is eager/advanced with AOP, Events, i18n support).</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </LessonLayout>
    );
};
