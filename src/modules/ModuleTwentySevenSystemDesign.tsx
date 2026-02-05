import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { SystemDesignVis } from '../visualizations/system/SystemDesignVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';

export const ModuleTwentySevenSystemDesign: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    const handleComplete = () => {
        markComplete(27);
        navigate('/learn');
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="System Design for Java Devs"
            subtitle="Module 27: Architecture Scale"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<SystemDesignVis />}
            onComplete={handleComplete}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-emerald-400">Vertical vs Horizontal Scaling</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            When your app gets 1 million users, your single server will crash. You have two choices:
                        </p>
                        <ul className="space-y-3">
                            <li className="bg-slate-900 section p-4 rounded-lg border border-orange-500/20">
                                <strong className="text-orange-400">Vertical Scaling (Scale Up)</strong>
                                <p className="text-sm text-slate-400">Buy a bigger machine (64GB RAM → 128GB RAM). Easy, but expensive and limited.</p>
                            </li>
                            <li className="bg-slate-900 section p-4 rounded-lg border border-emerald-500/20">
                                <strong className="text-emerald-400">Horizontal Scaling (Scale Out)</strong>
                                <p className="text-sm text-slate-400">Add more machines. Infinite scaling, but complex (requires Load Balancer).</p>
                            </li>
                        </ul>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Load Balancing</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            A <strong>Load Balancer</strong> (like NGINX or AWS ALB) sits in front of your servers and distributes traffic.
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl">
                            <h4 className="text-sm font-bold text-white mb-2">Techniques:</h4>
                            <ul className="list-disc pl-5 text-xs text-slate-300 space-y-2">
                                <li><strong>Round Robin:</strong> Send requests sequentially (Server 1, then 2, then 3...).</li>
                                <li><strong>Least Connections:</strong> Send to the server with the fewest active users.</li>
                                <li><strong>IP Hash:</strong> Ensure User A always goes to Server 1 (good for caches).</li>
                            </ul>
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">CAP Theorem</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In a distributed system, you can only pick <strong>2 out of 3</strong>:
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                            <div className="bg-purple-900/30 p-2 rounded text-purple-200 border border-purple-500/30">Consistency<br /><span className="font-normal text-[10px] text-slate-400">All nodes see same data</span></div>
                            <div className="bg-purple-900/30 p-2 rounded text-purple-200 border border-purple-500/30">Availability<br /><span className="font-normal text-[10px] text-slate-400">Every request gets a response</span></div>
                            <div className="bg-purple-900/30 p-2 rounded text-purple-200 border border-purple-500/30">Partition Tolerance<br /><span className="font-normal text-[10px] text-slate-400">System works if network fails</span></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-4">
                            Since networks *always* fail (P is mandatory), you must choose between <strong>CP</strong> (Banking apps - Consistency) or <strong>AP</strong> (Social Media - Availability).
                        </p>
                    </section>
                )}

                {step === 4 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">Caching Strategies</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Database calls are slow (Disk). Cache (Redis) is fast (RAM).
                        </p>
                        <div className="space-y-3 font-mono text-xs">
                            <div className="bg-slate-900 p-3 rounded border border-white/5">
                                <span className="text-blue-400">Write-Through:</span> App writes to Cache AND DB at same time. (Safe, slower write).
                            </div>
                            <div className="bg-slate-900 p-3 rounded border border-white/5">
                                <span className="text-blue-400">Write-Back:</span> App writes to Cache. Cache writes to DB later. (Fast write, risk of data loss).
                            </div>
                        </div>
                        <RealWorldContext
                            useCase="Instagram Feed."
                            impact="They pre-generate your feed and store it in Redis. When you open the app, it loads instantly (O(1)) instead of querying millions of photos."
                            role="System Design is the primary topic for L5/L6 (Senior) interviews."
                        />
                    </section>
                )}

            </div>
        </LessonLayout>
    );
};
