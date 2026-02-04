import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { SecurityFilterChainVis } from '../visualizations/security/SecurityFilterChainVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is the difference between Authentication and Authorization?",
        options: [
            "They are the same thing",
            "Authentication = 'Who are you?'. Authorization = 'What can you do?'",
            "Authentication is for admins, Authorization is for users",
            "Authentication is for databases, Authorization is for APIs"
        ],
        correctIndex: 1,
        explanation: "Authentication (AuthN) verifies identity (Login). Authorization (AuthZ) verifies permissions (Can I delete this?)."
    },
    {
        id: 2,
        text: "What is the Security Filter Chain?",
        options: [
            "A physical chain lock for servers",
            "A series of Gates (Filters) that every request must pass through before reaching your code",
            "A database encryption algorithms",
            "A firewall setting"
        ],
        correctIndex: 1,
        explanation: "Before a request hits your Controller, it passes through many filters. Any filter can reject the request (throw exception)."
    },
    {
        id: 3,
        text: "Why use JWT (JSON Web Tokens)?",
        options: [
            "Because they are colorful",
            "For Stateless Authentication. The server doesn't need to remember the user's session.",
            "To encrypt passwords",
            "To speed up the internet"
        ],
        correctIndex: 1,
        explanation: "JWTs allow the server to be Stateless. The token itself contains the user's ID and Role, signed by a secret key."
    }
];

export const ModuleFifteenSecurity: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    const totalSteps = 4; // Intro + FilterChain + JWT + Deep Dive

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(15);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Spring Security"
            subtitle="Module 15: Protecting Your API"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<SecurityFilterChainVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-red-400">Security is NOT Optional</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            If you put an API on the internet without security, it WILL be hacked. Bots scan for open APIs 24/7.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800 p-4 rounded-lg border border-red-500/30">
                                <h3 className="font-bold text-red-300 mb-2">Authentication (AuthN)</h3>
                                <p className="text-xs text-slate-400">"Who are you?"</p>
                                <p className="text-xs text-white mt-2">Login, FaceID, API Key</p>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-lg border border-blue-500/30">
                                <h3 className="font-bold text-blue-300 mb-2">Authorization (AuthZ)</h3>
                                <p className="text-xs text-slate-400">"What are you allowed to do?"</p>
                                <p className="text-xs text-white mt-2">Admin vs User, Read-Only</p>
                            </div>
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">The Filter Chain</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Spring Security works by placing a **Guard** at the door. This guard is actually a chain of many small checks (Filters).
                        </p>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex gap-2 items-start">
                                <span className="bg-blue-500/20 text-blue-400 px-2 rounded font-mono text-xs mt-1">CorsFilter</span>
                                <div>Checks if the request is coming from an allowed website (e.g. localhost:3000).</div>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="bg-purple-500/20 text-purple-400 px-2 rounded font-mono text-xs mt-1">JwtFilter</span>
                                <div>Checks the HTTP Header for a valid Token. If invalid, it blocks execution immediately.</div>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="bg-red-500/20 text-red-400 px-2 rounded font-mono text-xs mt-1">ExceptionTranslation</span>
                                <div>Catches security errors and returns "401 Unauthorized" or "403 Forbidden".</div>
                            </li>
                        </ul>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-yellow-400">Stateless Auth (JWT)</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In modern REST APIs, we don't use Cookies/Sessions. We use **Tokens**.
                        </p>
                        <div className="bg-slate-900 border border-yellow-500/30 p-4 rounded-xl font-mono text-xs">
                            <div className="mb-4">
                                <p className="text-slate-500 mb-1">Header:</p>
                                <code className="text-purple-300">Authorizaton: Bearer eyJhbGciOiJIUzI1Ni...</code>
                            </div>
                            <div className="p-3 bg-black/50 rounded">
                                <p className="text-slate-500 mb-1 border-b border-white/10 pb-1">Token Content (Decoded):</p>
                                <div className="text-green-400">sub: "deepak"</div>
                                <div className="text-blue-400">role: "ADMIN"</div>
                                <div className="text-red-400">exp: 1735689600 (Expires tomorrow)</div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-4">
                            The server trusts the token because it is **Signed** with a secret key that only the server knows.
                        </p>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-emerald-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                                🔧 Under the Hood: The SecurityContext
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Where does Spring store the "Currently Logged In User"?
                            </p>
                            <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-slate-300 mb-4">
                                <strong>ThreadLocal:</strong><br />
                                Spring stores the <code>Authentication</code> object in a thread-local variable.<br />
                                This means it is available ANYWHERE in your code for that specific request.
                                <div className="mt-2 text-green-300 block bg-slate-800 p-2 rounded">
                                    SecurityContextHolder.getContext().getAuthentication();
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-900/10 border border-red-500/20 rounded-xl p-5">
                                <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">⚠️ Common Pitfalls</h3>
                                <ul className="list-disc pl-4 space-y-2 text-sm text-slate-300">
                                    <li>
                                        <strong>CSRF on REST:</strong> You usually DISABLE CSRF for stateless REST APIs, but ENABLE it for browser-based form apps.
                                    </li>
                                    <li>
                                        <strong>Hardcoded Secrets:</strong> NEVER commit your JWT Secret Key to GitHub. Use Environment Variables!
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5">
                                <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Yz Interview Prep</h3>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Mid Level</p>
                                        <p className="text-sm text-white">"How do you hash passwords?"</p>
                                        <p className="text-xs text-slate-400 mt-1">Use <strong>BCrypt</strong>. Never store plain text. BCrypt adds a "Salt" so identical passwords have different hashes.</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">Senior Level</p>
                                        <p className="text-sm text-white">"OAuth2 Flow?"</p>
                                        <p className="text-xs text-slate-400 mt-1">User redirects to Google &rarr; Logs in &rarr; Google sends Code &rarr; Backend exchanges Code for Token.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Every time you refresh your Banking App, your phone sends a hidden 'Access Token'. If that token expires, you are forced to login again."
                    impact="Security that stays out of the way. Stateless Auth scales to millions of users easily."
                    role="Security Engineers configure the Filter Chain and ensure no 'backdoors' exist."
                />
            </div>
        </LessonLayout>
    );
};
