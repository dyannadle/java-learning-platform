import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { EventBusVis } from '../visualizations/events/EventBusVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is 'Eventual Consistency'?",
        options: [
            "Data is always consistent immediately",
            "The system will become consistent over time, but there might be a delay",
            "Data is never consistent",
            "A database error"
        ],
        correctIndex: 1,
        explanation: "In distributed systems, it takes time for an event to travel. User A might see the update 1 second before User B."
    },
    {
        id: 2,
        text: "What is a 'Topic' in Kafka?",
        options: [
            "A conversation about java",
            "A category or feed name to which messages are published",
            "A type of database table",
            "A specialized internet forum"
        ],
        correctIndex: 1,
        explanation: "Producers write to a Topic. Consumers listen to a Topic. It's like a channel."
    },
    {
        id: 3,
        text: "Why use Events instead of REST APIs?",
        options: [
            "Events are slower",
            "Decoupling. The Sender doesn't need to know who the Receiver is, or if they are even online.",
            "REST is dead",
            "Events use less internet"
        ],
        correctIndex: 1,
        explanation: "Events allow 'Fire and Forget'. If the Email Service is down, the Order Service still works. The Email Service will catch up later."
    }
];

export const ModuleEighteenEvents: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(18);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Event-Driven Architecture"
            subtitle="Module 18: Decoupled Systems"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<EventBusVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">Sync vs Async</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            <strong>REST is Synchronous (Blocking).</strong> You call the phone, and you wait for an answer.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            <strong>Events are Asynchronous (Non-Blocking).</strong> You send a text message. You don't wait. You do other things.
                        </p>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">The Power of Decoupling</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Imagine Amazon. When you click "Buy", many things happen:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
                            <li>Check Inventory</li>
                            <li>Charge Credit Card</li>
                            <li>Send Confirmation Email</li>
                            <li>Notify Warehouse Robot</li>
                        </ul>
                        <p className="text-slate-300 mt-4 text-sm">
                            If we used REST, the "Buy" button would spin for 10 seconds. With Events, we just say "Order Placed" and return "Success" immediately. The rest happens in the background.
                        </p>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Apache Kafka</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Kafka is a "Distributed Streaming Platform". It's like a giant, super-fast log file.
                        </p>
                        <div className="bg-slate-900 border border-purple-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            // Producer<br />
                            kafkaTemplate.send("orders", new Order(123));<br /><br />
                            // Consumer<br />
                            @KafkaListener(topics = "orders")<br />
                            public void listen(Order order) {'{'}<br />
                            &nbsp;&nbsp; emailService.send(order.email);<br />
                            {'}'}
                        </div>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-emerald-400 mb-4">
                                🔧 Deep Dive: SAGA Pattern
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Distributed Transactions are hard. You can't use <code>@Transactional</code> across two different microservices.
                            </p>
                            <p className="text-sm text-slate-300 mb-4">
                                We use the <strong>SAGA Pattern</strong>: A sequence of local transactions.
                            </p>
                            <div className="bg-black/50 p-2 rounded text-xs font-mono text-slate-300">
                                1. Order Service: Create Order (Pending)<br />
                                2. Payment Service: Charge Card -&gt; Success<br />
                                3. Order Service: Update Order (Confirmed)<br />
                                <span className="text-red-400">4. IF Payment Fails -&gt; Trigger Compensation (Undo Order)</span>
                            </div>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Uber uses Kafka to track the location of every driver in real-time."
                    impact="If one server fails, the stream of location data doesn't stop. It just gets picked up by another consumer."
                    role="Data Engineers build pipelines."
                />
            </div>
        </LessonLayout>
    );
};
