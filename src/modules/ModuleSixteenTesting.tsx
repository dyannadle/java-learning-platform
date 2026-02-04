import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { MockingVis } from '../visualizations/testing/MockingVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is the main goal of a Unit Test?",
        options: [
            "To test the entire application including the database",
            "To test a single class/method in isolation",
            "To test the User Interface",
            "To test network speed"
        ],
        correctIndex: 1,
        explanation: "Unit tests focus on one 'Unit' (smallest testable part) of code, usually a single class, mocking out all dependencies."
    },
    {
        id: 2,
        text: "Why use Mockito?",
        options: [
            "To create fake objects so you don't need a real database/API",
            "To mock your coworkers",
            "To compile Java faster",
            "To generate random numbers"
        ],
        correctIndex: 0,
        explanation: "Mockito allows you to define behavior for dependencies (e.g., 'when(repo.save).thenReturn(user)') without running the actual code."
    },
    {
        id: 3,
        text: "What is Testcontainers?",
        options: [
            "A shipping container for code",
            "A library that spins up real Docker containers (like Postgres) for Integration Tests",
            "A new Java keyword",
            "A folder for tests"
        ],
        correctIndex: 1,
        explanation: "Testcontainers is the industry standard for Integration Testing. It gives you a real, throwaway database for your tests."
    }
];

export const ModuleSixteenTesting: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    const totalSteps = 4; // Intro + Unit/Mocking + Integration + Deep Dive

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(16);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Testing & QA"
            subtitle="Module 16: Building Robust Code"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<MockingVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-green-400">Why Write Tests?</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            You write code once, but you read it and change it 100 times. Tests ensure that **future changes don't break existing features**.
                        </p>
                        <div className="p-4 bg-slate-800 rounded border border-white/5">
                            <h3 className="font-bold text-white mb-2">The Testing Pyramid</h3>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li className="text-green-300">▲ End-to-End (Slow, Broad)</li>
                                <li className="text-blue-300">▲ Integration (Medium, Database)</li>
                                <li className="text-purple-300">▲ Unit (Fast, Isolated, 70% of tests)</li>
                            </ul>
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Unit Testing with Mockito</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            A Unit Test should never touch the Database or Network. It should run in milliseconds.
                        </p>
                        <p className="text-slate-300 mb-4">
                            But your Service needs a Repository! How do we test it? We **Mock** the repository.
                        </p>
                        <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-slate-300">
                            <span className="text-purple-400">@Test</span><br />
                            void testCreateUser() {'{'}<br />
                            &nbsp;&nbsp;// 1. Define Behavior<br />
                            &nbsp;&nbsp;<span className="text-yellow-400">when</span>(userRepo.save(any())).thenReturn(new User("Deepak"));<br /><br />
                            &nbsp;&nbsp;// 2. Run Logic<br />
                            &nbsp;&nbsp;User result = userService.createUser("Deepak");<br /><br />
                            &nbsp;&nbsp;// 3. Verify<br />
                            &nbsp;&nbsp;<span className="text-green-400">assertEquals</span>("Deepak", result.getName());<br />
                            {'}'}
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">Integration Testing</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Sometimes you NEED to check the SQL. Does the query actually work?
                        </p>
                        <div className="bg-slate-900 border border-orange-500/30 p-4 rounded-xl">
                            <h4 className="font-bold text-orange-300 mb-2">Testcontainers 🐳</h4>
                            <p className="text-xs text-slate-400 mb-2">
                                The modern standard. It spins up a **Real Postgres Database** inside Docker just for the test, runs the query, and then destroys it.
                            </p>
                            <code className="block bg-black/30 p-2 rounded text-[10px] text-slate-300 font-mono">
                                @Container<br />
                                static PostgreSQLContainer&lt;?&gt; postgres = new PostgreSQLContainer&lt;&gt;("postgres:15");
                            </code>
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                                🔧 Deep Dive: TDD (Test Driven Development)
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                "Red - Green - Refactor".
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-400">
                                <li><strong>Red:</strong> Write a test that FAILS (because the code doesn't exist yet).</li>
                                <li><strong>Green:</strong> Write the MINIMUM code to pass the test.</li>
                                <li><strong>Refactor:</strong> Clean up the code. The test ensures you didn't break it.</li>
                            </ol>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                                <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">⚠️ Common Pitfalls</h3>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-slate-300">
                                    <li>
                                        <strong>Flaky Tests:</strong> Tests that pass sometimes and fail others (e.g. relying on <code>Thread.sleep()</code>).
                                    </li>
                                    <li>
                                        <strong>Testing Implementation:</strong> Don't test PRIVATE methods. Test the public API only.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Yz Interview Prep</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Mid Level</p>
                                        <p className="text-sm text-white">"Difference between @Mock and @Spy?"</p>
                                        <p className="text-xs text-slate-400 mt-1">@Mock = completely fake object. @Spy = wraps a REAL object, but you can override specific methods.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="A bank update crashes the system because no one tested the 'Transfer' button with a negative amount."
                    impact="Tests are your insurance policy. They give you the confidence to deploy on Friday at 5 PM."
                    role="QA Engineers & Developers work together to automate everything."
                />
            </div>
        </LessonLayout>
    );
};
