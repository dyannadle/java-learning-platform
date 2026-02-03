import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { RestFlowVis } from '../visualizations/spring/RestFlowVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What does the @RestController annotation do?",
        options: [
            "Connects to the database",
            "Mark the class as a Controller where every method returns a JSON response",
            "Creates a HTML view",
            "Restarts the server"
        ],
        correctIndex: 1,
        explanation: "@RestController is a convenience annotation that combines @Controller and @ResponseBody. It means 'I am serving data (JSON), not HTML pages'."
    },
    {
        id: 2,
        text: "Which HTTP method is used to CREATE a new resource?",
        options: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        correctIndex: 1,
        explanation: "POST is for creating. GET is for reading. PUT is for updating. DELETE is for deleting."
    },
    {
        id: 3,
        text: "What is the typical flow of data in Spring Layered Architecture?",
        options: [
            "Database -> Controller -> Client",
            "Controller -> Service -> Repository -> Database",
            "Repository -> Controller -> Service",
            "Service -> Database -> Controller"
        ],
        correctIndex: 1,
        explanation: "The Controller handles the request, passes it to the Service (Business Logic), which uses the Repository to talk to the Database."
    }
];

export const ModuleThirteenREST: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    const totalSteps = 3; // Intro + Layout + Quiz

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(13);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="REST APIs with Spring Boot"
            subtitle="Module 13: Building Backends"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<RestFlowVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">What is a REST API?</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Most modern apps are split into a **Frontend** (React, Mobile) and a **Backend** (Java, Python).
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            They talk to each other using **REST** (Representational State Transfer). The Backend exposes "Endpoinds" (URLs) that return data, usually in **JSON** format.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-300 mb-4">
                            <li><strong>GET</strong> <code>/users</code> - Get a list of users</li>
                            <li><strong>POST</strong> <code>/users</code> - Create a new user</li>
                            <li><strong>DELETE</strong> <code>/users/1</code> - Delete user ID 1</li>
                        </ul>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">The Power of Layers</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Spring applications are organized into **Layers** to keep code clean and testable.
                        </p>
                        <div className="space-y-3">
                            <div className="p-3 bg-slate-800 rounded border-l-4 border-purple-500">
                                <strong className="text-purple-300">1. Controller</strong>
                                <p className="text-xs text-slate-400 mt-1">Handles HTTP requests (URL, JSON). "The Waiter".</p>
                            </div>
                            <div className="p-3 bg-slate-800 rounded border-l-4 border-blue-500">
                                <strong className="text-blue-300">2. Service</strong>
                                <p className="text-xs text-slate-400 mt-1">Business Logic. Calculates prices, validates rules. "The Chef".</p>
                            </div>
                            <div className="p-3 bg-slate-800 rounded border-l-4 border-orange-500">
                                <strong className="text-orange-300">3. Repository</strong>
                                <p className="text-xs text-slate-400 mt-1">Talks to the Database (SQL). "The Inventory Manager".</p>
                            </div>
                        </div>
                        <RealWorldContext
                            useCase="When you login to Netflix, the 'AuthController' checks your password (Service), then loads your profile from the DB (Repository)."
                            impact="Separation of Concerns. You can change the Database without rewriting the Controller."
                            role="This architecture is the Industry Standard for Java Backends."
                        />
                    </section>
                )}
            </div>
        </LessonLayout>
    );
};
