import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { OrmVis } from '../visualizations/spring/OrmVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is ORM?",
        options: [
            "Object-Relational Mapping",
            "Only Read Memory",
            "Official React Module",
            "Ordered Row Manager"
        ],
        correctIndex: 0,
        explanation: "ORM is a technique that converts data between incompatible type systems (Java Objects <-> SQL Tables)."
    },
    {
        id: 2,
        text: "Which annotation marks a class as a Database Table?",
        options: [
            "@Table",
            "@Entity",
            "@Database",
            "@Persistent"
        ],
        correctIndex: 1,
        explanation: "@Entity tells JPA that this class represents a table in the database."
    },
    {
        id: 3,
        text: "Why do we use Lazy Loading?",
        options: [
            "Because we are lazy",
            "To load data only when it is actually needed (Performance)",
            "To slow down the application",
            "To load everything at start up"
        ],
        correctIndex: 1,
        explanation: "Lazy Loading prevents fetching massive amounts of related data (e.g., all 10,000 orders for a user) unless you explicitly ask for it."
    }
];

export const ModuleFourteenJPA: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    const totalSteps = 5; // Intro + Entities + PersistContext + Relations + Deep Dive

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(14);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Data Persistence with JPA"
            subtitle="Module 14: Talking to Databases"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<OrmVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">1. SQL is Hard? Use JPA.</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Writing raw SQL queries (<code>SELECT * FROM users...</code>) is error-prone and tedious.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            **JPA (Java Persistence API)** lets you treat Database Tables like regular Java Objects. You just create a class, add some annotations, and Spring handles the SQL for you.
                        </p>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">2. Entities & Repositories</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-slate-800 rounded-lg">
                                <h3 className="font-bold text-white mb-2">1. The Entity</h3>
                                <p className="text-xs text-slate-400 mb-2">Represents the Data Structure.</p>
                                <code className="block bg-black/30 p-2 rounded text-xs text-green-300 font-mono">
                                    @Entity<br />
                                    class Product {'{'}<br />
                                    &nbsp;&nbsp;@Id Long id;<br />
                                    &nbsp;&nbsp;String name;<br />
                                    {'}'}
                                </code>
                            </div>
                            <div className="p-4 bg-slate-800 rounded-lg">
                                <h3 className="font-bold text-white mb-2">2. The Repository</h3>
                                <p className="text-xs text-slate-400 mb-2">The Interface for saving/loading.</p>
                                <code className="block bg-black/30 p-2 rounded text-xs text-blue-300 font-mono">
                                    interface ProductRepo extends JpaRepository&lt;Product, Long&gt; {'{'}<br />
                                    &nbsp;&nbsp;// Magic methods!<br />
                                    &nbsp;&nbsp;List&lt;Product&gt; findByName(String name);<br />
                                    {'}'}
                                </code>
                            </div>
                        </div>
                        <RealWorldContext
                            useCase="Instagram stores billions of photos. They use ORM-like tools to map 'Photo' objects to database rows."
                            impact="Productivity. Developers focus on logic, not writing 'INSERT INTO' statements all day."
                            role="Backend Engineers design the Data Model (Entities)."
                        />
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">3. The Persistence Context</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            JPA doesn't just send SQL immediately. It has a "Staging Area" called the <strong>Persistence Context</strong> (First Level Cache).
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                            <div className="bg-slate-800 p-3 rounded">
                                <strong className="text-yellow-300 block mb-2">Caching</strong>
                                <code>
                                    User u1 = repo.findById(1);<br />
                                    User u2 = repo.findById(1);<br />
                                    // SQL runs ONLY once!<br />
                                    // u2 comes from cache.
                                </code>
                            </div>
                            <div className="bg-slate-800 p-3 rounded">
                                <strong className="text-red-300 block mb-2">Dirty Checking</strong>
                                <code>
                                    User u = repo.findById(1);<br />
                                    u.setName("New Name");<br />
                                    // No repo.save() needed!<br />
                                    // JPA detects change & saves.
                                </code>
                            </div>
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-green-400">4. Relationships</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Tables are related (User has many Orders). JPA handles this with annotations.
                        </p>
                        <div className="space-y-4">
                            <div className="p-3 bg-slate-800 rounded border-l-4 border-green-500">
                                <h4 className="font-bold text-green-300 text-sm">@OneToMany</h4>
                                <p className="text-xs text-slate-400 mb-2">A User "Has Many" Orders. Default is <strong>Lazy</strong> (Orders are NOT fetched until you ask).</p>
                            </div>
                            <div className="p-3 bg-slate-800 rounded border-l-4 border-red-500">
                                <h4 className="font-bold text-red-300 text-sm">@ManyToOne</h4>
                                <p className="text-xs text-slate-400 mb-2">An Order "Belongs To" a User. Default is <strong>Eager</strong> (User data is fetched immediately with the Order).</p>
                            </div>
                        </div>
                    </section>
                )}

                {step === 5 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                                🔧 5. Under the Hood: The N+1 Problem
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                The most common performance killer in JPA!
                            </p>
                            <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-slate-300 mb-4">
                                <strong>Scenario:</strong> You fetch 10 Users. Then you loop through them to print their Address.<br />
                                <div className="mt-2 text-slate-400">
                                    Query 1: SELECT * FROM Users (Returns 10 rows)<br />
                                    Query 2: SELECT * FROM Address WHERE user_id = 1<br />
                                    Query 3: SELECT * FROM Address WHERE user_id = 2<br />
                                    ...<br />
                                    Query 11: SELECT * FROM Address WHERE user_id = 10<br />
                                    <strong>Total: 11 Queries for 10 users!</strong> (Imagine if you had 1000 users...)
                                </div>
                                <div className="mt-2 text-green-400">
                                    <strong>Fix:</strong> Use <code>JOIN FETCH</code> in your query to get everything in ONE shot.
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                                <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">⚠️ Common Pitfalls</h3>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-slate-300">
                                    <li>
                                        <strong>LazyInitializationException:</strong> Trying to read a "Lazy" collection (like <code>user.getOrders()</code>) AFTER the database session has closed. Fix: Fetch it eagerly or keep the transaction open.
                                    </li>
                                    <li>
                                        <strong>Flush Mode:</strong> Changes to Entities are NOT saved immediately. They are saved when the Transaction commits (or you call <code>flush()</code>).
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Yz Interview Prep</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Mid Level</p>
                                        <p className="text-sm text-white">"JPA vs Hibernate?"</p>
                                        <p className="text-xs text-slate-400 mt-1">JPA is the Interface (Standard). Hibernate is the Implementation (Code that does the work). You use JPA annotations (@Entity) so you can switch implementations later.</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Senior Level</p>
                                        <p className="text-sm text-white">"First Level vs Second Level Cache?" (L1 is enabled by default per Transaction. L2 is global/shared across sessions and must be configured manually e.g., with Redis).</p>
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
