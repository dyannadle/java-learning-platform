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

    const totalSteps = 3;

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
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">SQL is Hard? Use JPA.</h2>
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
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Entities & Repositories</h2>
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
            </div>
        </LessonLayout>
    );
};
