import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { LockingVis } from '../visualizations/database/LockingVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "When should you use Optimistic Locking (@Version)?",
        options: [
            "When conflicts are rare (Read-heavy systems)",
            "When conflicts are frequent (High-concurrency writes)",
            "Always",
            "Never"
        ],
        correctIndex: 0,
        explanation: "Optimistic locking is cheap (no DB lock held). It's best when you assume the collision won't happen often."
    },
    {
        id: 2,
        text: "What happens in Pessimistic Locking?",
        options: [
            "The database is optimistic",
            "The transaction holds a row lock (SELECT ... FOR UPDATE) preventing others from writing",
            "Wait time is zero",
            "It uses a version column"
        ],
        correctIndex: 1,
        explanation: "Pessimistic means 'I assume someone WILL try to mess with this data', so I lock it immediately."
    },
    {
        id: 3,
        text: "What is a Deadlock?",
        options: [
            "A security feature",
            "When Tx A waits for B, and Tx B waits for A. Neither can finish.",
            "Fast database performance",
            "A type of key"
        ],
        correctIndex: 1,
        explanation: "Deadlocks freeze up your DB. Most DBs automatically detect this and kill one of the transactions to clear the jam."
    }
];

export const ModuleTwentyFourLocking: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);
    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(24);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Database Locking & Concurrency"
            subtitle="Module 24: Data Integrity"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<LockingVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">The Double Booking Problem</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Imagine two users try to buy the <strong>last ticket</strong> for a concert at the exact same millisecond. Without locking, both might succeed, and you oversell the event.
                        </p>
                        <p className="text-slate-300 text-sm">
                            Database Locking prevents this by serializing access to shared data.
                        </p>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">Optimistic Locking (@Version)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            "I hope nobody changed this while I was looking at it."
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            1. Read Row (Version = 1)<br />
                            2. Prepare Update<br />
                            3. Save: <span className="text-green-400">UPDATE ... SET ver=2 WHERE id=1 AND ver=1</span>
                        </div>
                        <p className="text-slate-400 text-xs mt-2">
                            If another user bumped Version to 2 already, your update finds 0 rows. Transaction fails.
                        </p>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Pessimistic Locking</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            "I am locking this row. Nobody touches it until I am done."
                        </p>
                        <div className="bg-slate-900 border border-red-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            SELECT * FROM inventory WHERE id=1 <span className="text-red-400 font-bold">FOR UPDATE</span>;
                        </div>
                        <p className="text-slate-400 text-xs mt-2">
                            Other transactions attempting to read this row will <strong>WAIT</strong> until you commit or rollback. Safe, but slow.
                        </p>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-green-400 mb-4">
                                ☠️ Deadlocks
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Tx A locks Row 1. Tx B locks Row 2.<br />
                                Tx A tries to lock Row 2 (waits for B).<br />
                                Tx B tries to lock Row 1 (waits for A).<br />
                            </p>
                            <p className="text-sm text-red-300 font-bold">
                                Result: Infinite Wait.
                            </p>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Bank Transfers. Moving money from Account A to B requires locking both accounts to ensure money isn't lost or duplicated."
                    impact="Optimistic locking powers most high-scale web apps (Airbnb bookings). Pessimistic is used in strict financial systems."
                    role="Backend Engineers."
                />
            </div>
        </LessonLayout>
    );
};
