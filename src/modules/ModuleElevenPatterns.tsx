import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { SingletonVis } from '../visualizations/patterns/SingletonVis';
import { FactoryVis } from '../visualizations/patterns/FactoryVis';
import { ObserverVis } from '../visualizations/patterns/ObserverVis';
import { StrategyVis } from '../visualizations/patterns/StrategyVis';
import { BuilderVis } from '../visualizations/patterns/BuilderVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is the defining characteristic of the Singleton pattern?",
        options: [
            "It allows creating unlimited instances",
            "It ensures a class has only one instance and provides a global access point",
            "It creates objects without specifying the exact class",
            "It notifies multiple objects about events"
        ],
        correctIndex: 1,
        explanation: "Singleton means 'Single'. It restricts the instantiation of a class to one 'single' instance. Useful for Database Connections or Config Managers."
    },
    {
        id: 2,
        text: "The Factory Method pattern is primarily used to:",
        options: [
            "Speed up the application",
            "Decouple the logic of creating objects from the code that uses them",
            "Ensure only one object exists",
            "Connect to a database"
        ],
        correctIndex: 1,
        explanation: "Instead of calling 'new Car()', you ask the Factory: 'createVehicle(\"Car\")'. This means your code doesn't need to know HOW to build a Car, just that it needs one."
    },
    {
        id: 3,
        text: "Which real-world scenario best fits the Observer pattern?",
        options: [
            "A library storing books",
            "A YouTube channel notifying subscribers about a new video",
            "A calculated result in a math equation",
            "A single login manager for an app"
        ],
        correctIndex: 1,
        explanation: "The Observer pattern is all about 'Publish-Subscribe'. One Subject (Channel) broadcasts an event to many Observers (Subscribers)."
    },
    {
        id: 4,
        text: "The Strategy Pattern allows you to:",
        options: [
            "Build complex objects step-by-step",
            "Swap algorithms or behaviors at runtime",
            "Ensure thread safety",
            "Create a single instance"
        ],
        correctIndex: 1,
        explanation: "Strategy lets you define a family of algorithms (e.g., Payment Methods: CreditCard, PayPal) and make them interchangeable."
    },
    {
        id: 5,
        text: "When would you use the Builder Pattern?",
        options: [
            "When you need to notify users of updates",
            "When you have a simple object with 1 field",
            "When constructing a complex object with many optional parameters",
            "When you need a global variable"
        ],
        correctIndex: 2,
        explanation: "Builder is perfect for complex objects (like a Pizza or House) where you want to construct it step-by-step (addCheese(), addPepperoni())."
    }
];

export const ModuleElevenPatterns: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    const totalSteps = 6; // 5 Patterns + Quiz

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(11);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    // Dynamic visualization based on step
    const getVisualization = () => {
        switch (step) {
            case 1: return <SingletonVis />;
            case 2: return <FactoryVis />;
            case 3: return <ObserverVis />;
            case 4: return <StrategyVis />;
            case 5: return <BuilderVis />;
            default: return <SingletonVis />;
        }
    };

    return (
        <LessonLayout
            title="Design Patterns"
            subtitle="Module 11: Architectural Thinking"
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
                        <h2 className="text-xl font-semibold mb-4 text-purple-300">The Singleton Pattern</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Sometimes, you need to ensure that there is <strong>exactly one</strong> instance of a class in your entire application.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-300 mb-4">
                            <li><strong>Database Connection:</strong> You don't want 100 open connections. You want 1 shared connection pool.</li>
                            <li><strong>Logger:</strong> All parts of the app should write to the same log file.</li>
                            <li><strong>Config Manager:</strong> Application settings should be consistent everywhere.</li>
                        </ul>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-purple-200">
                             // The Constructor is private!<br />
                            private static Singleton instance;<br /><br />
                            public static Singleton getInstance() {'{'}<br />
                            &nbsp;&nbsp; if (instance == null) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp; instance = new Singleton();<br />
                            &nbsp;&nbsp; {'}'}<br />
                            &nbsp;&nbsp; return instance;<br />
                            {'}'}
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-emerald-300">The Factory Pattern</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In a complex app, using the <code>new</code> keyword everywhere makes your code rigid.
                            The <strong>Factory Pattern</strong> centralizes object creation.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Imagine a Logistics App. Today it handles `Trucks`. Tomorrow it might need `Ships`.
                            If you use a Factory, you just change the Factory logic, not the 100 places where you create vehicles.
                        </p>
                        <RealWorldContext
                            useCase="Java's NumberFormat.getInstance() is a Factory. It returns a different formatter depending on whether you are in the US, Germany, or Japan."
                            impact="Makes code 'Loosely Coupled'. Your business logic doesn't care exactly WHICH class is created, as long as it follows the interface."
                            role="Framework Designers use this everywhere so you can swap out implementations (e.g., swapping SQL for Oracle DB)."
                        />
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-300">The Observer Pattern</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Also known as <strong>Publish-Subscribe</strong>. This pattern defines a one-to-many dependency between objects.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            When the <strong>Subject</strong> (e.g., a YouTuber) changes state (upload video), all its <strong>Observers</strong> (Subscribers) are notified automatically.
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-orange-200">
                            interface Observer {'{'} void update(String msg); {'}'}<br /><br />
                            class Channel {'{'}<br />
                            &nbsp;&nbsp; List&lt;Observer&gt; subs = new ArrayList&lt;&gt;();<br />
                            &nbsp;&nbsp; void upload(String video) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp; for(Observer sub : subs) sub.update(video);<br />
                            &nbsp;&nbsp; {'}'}<br />
                            {'}'}
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-300">The Strategy Pattern</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            The <strong>Strategy Pattern</strong> allows you to define a family of algorithms, put each in its own class, and make their objects interchangeable.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Think of a **Payment System**. You can pay with `CreditCard`, `PayPal`, or `Bitcoin`. All of them share the common method `pay(amount)`.
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-blue-200">
                            interface PaymentStrategy {'{'} void pay(int amount); {'}'}<br /><br />
                            class ShoppingCart {'{'}<br />
                            &nbsp;&nbsp; void checkout(PaymentStrategy method) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp; method.pay(totalAmount);<br />
                            &nbsp;&nbsp; {'}'}<br />
                            {'}'}
                        </div>
                    </section>
                )}

                {step === 5 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-yellow-300">The Builder Pattern</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Constructing complex objects step-by-step. The <strong>Builder Pattern</strong> separates the construction of a complex object from its representation.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Useful when an object has many parameters (e.g., a Pizza with 10 possible toppings). Instead of a constructor with 10 arguments, you chain methods.
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-yellow-200">
                            Pizza p = new Pizza.Builder()<br />
                            &nbsp;&nbsp; .setSize("Large")<br />
                            &nbsp;&nbsp; .addCheese()<br />
                            &nbsp;&nbsp; .addPepperoni()<br />
                            &nbsp;&nbsp; .build();
                        </div>
                    </section>
                )}
            </div>
        </LessonLayout>
    );
};
