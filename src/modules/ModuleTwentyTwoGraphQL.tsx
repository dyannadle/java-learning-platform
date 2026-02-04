import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { GraphExplorerVis } from '../visualizations/graphql/GraphExplorerVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is the main problem GraphQL solves?",
        options: [
            "SQL Injection",
            "Slow Internet",
            "Over-fetching and Under-fetching data (REST API inflexibility)",
            "Database storage size"
        ],
        correctIndex: 2,
        explanation: "With REST, you get ALL the fields from the /users endpoint. With GraphQL, you ask only for the fields you need."
    },
    {
        id: 2,
        text: "In GraphQL, what is a 'Schema'?",
        options: [
            "A database table",
            "The contract describing what data is available (Types, Queries, Mutations)",
            "A visual diagram",
            "Authentication logic"
        ],
        correctIndex: 1,
        explanation: "The Schema (usually .graphqls file) is the strict type system your API enforces."
    },
    {
        id: 3,
        text: "How many endpoints does a GraphQL API typically have?",
        options: [
            "One per resource (e.g. /users, /posts)",
            "Just one (usually /graphql)",
            "Hundreds",
            "Zero"
        ],
        correctIndex: 1,
        explanation: "GraphQL exposes a single endpoint (POST /graphql), and the query body determines what function runs."
    }
];

export const ModuleTwentyTwoGraphQL: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);
    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(22);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="GraphQL with Spring Boot"
            subtitle="Module 22: Modern APIs"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<GraphExplorerVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Stop Over-Fetching</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In REST, <code>GET /users/1</code> might return 50 fields. But your mobile app only needs the <strong>Name</strong>.
                        </p>
                        <p className="text-slate-300 text-sm">
                            GraphQL lets the <strong>Client</strong> decide what data it wants. Use the explorer above to see this in action.
                        </p>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">The Schema</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            GraphQL is strictly typed. You define types first.
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            type User {'{'}<br />
                            &nbsp;&nbsp;id: ID!<br />
                            &nbsp;&nbsp;name: String!<br />
                            &nbsp;&nbsp;posts: [Post]<br />
                            {'}'}<br /><br />
                            type Query {'{'}<br />
                            &nbsp;&nbsp;user(id: ID): User<br />
                            {'}'}
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Query vs Mutation</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            REST has GET, POST, PUT, DELETE. GraphQL has:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-slate-300">
                            <li><strong className="text-white">Query</strong>: Fetch data (read-only).</li>
                            <li><strong className="text-white">Mutation</strong>: Create, Update, or Delete data.</li>
                            <li><strong className="text-white">Subscription</strong>: Real-time updates (via WebSockets).</li>
                        </ul>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-green-400 mb-4">
                                🍃 Spring for GraphQL
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Spring Boot 3 makes this easy effectively.
                            </p>
                            <div className="bg-black/50 p-2 rounded text-xs font-mono text-slate-400">
                                @SchemaMapping(typeName="User")<br />
                                public List&lt;Post&gt; posts(User user) {'{'}<br />
                                &nbsp;&nbsp;return postService.findByAuthor(user.getId());<br />
                                {'}'}
                            </div>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Facebook (Meta) invented GraphQL to solve complex data fetching in their mobile app."
                    impact="It enables frontend teams to iterate faster without waiting for backend changes."
                    role="Full Stack Developers."
                />
            </div>
        </LessonLayout>
    );
};
