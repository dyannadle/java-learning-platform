import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { K8sClusterVis } from '../visualizations/cloud/K8sClusterVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is a 'Pod'?",
        options: [
            "A type of vegetable",
            "The smallest unit in K8s. It contains one or more containers (usually just one).",
            "A cluster of servers",
            "A networking cable"
        ],
        correctIndex: 1,
        explanation: "Docker containers don't run directly on K8s. They wrap inside a Pod."
    },
    {
        id: 2,
        text: "What is the job of a 'ReplicaSet'?",
        options: [
            "To copy files",
            "To ensure a specific number of Pod copies are always running (Self-Healing).",
            "To replicate databases",
            "To replace broken hardware"
        ],
        correctIndex: 1,
        explanation: "If you want 3 pods and one crashes, the ReplicaSet notices (Current=2, Desired=3) and starts a new one."
    },
    {
        id: 3,
        text: "What is a 'Service' in K8s?",
        options: [
            "Customer Support",
            "A stable IP address/DNS name that sits in front of dynamic Pods.",
            "A paid feature",
            "A microservice"
        ],
        correctIndex: 1,
        explanation: "Pods die and restart with new IPs. The Service gives them a stable address so other apps can find them."
    }
];

export const ModuleTwentyKubernetes: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);
    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(20);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Kubernetes (K8s) Basics"
            subtitle="Module 20: Orchestration"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<K8sClusterVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">The Captain of the Ship</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Docker runs <strong>one</strong> container. Kubernetes (K8s) runs <strong>thousands</strong>.
                        </p>
                        <p className="text-slate-300 text-sm">
                            K8s manages "Orchestration": Scheduling, Scaling, and Healing.
                        </p>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">Pods & Deployments</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            You define a <strong>Deployment</strong> YAML ("I want 3 copies of nginx").
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            K8s creates a <strong>ReplicaSet</strong>, which creates 3 <strong>Pods</strong>.
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            apiVersion: apps/v1<br />
                            kind: Deployment<br />
                            spec:<br />
                            &nbsp;&nbsp;replicas: 3<br />
                            &nbsp;&nbsp;selector:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;matchLabels:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;app: my-java-app
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Self-Healing</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Try killing a pod in the simulation above. K8s will immediately start a new one.
                        </p>
                        <p className="text-slate-300 text-sm">
                            This means you can wake up at 3 AM less often.
                        </p>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-green-400 mb-4">
                                🔧 Services & Ingress
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Pods are ephemeral (they die). Services are forever.
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-400 font-mono">
                                <li>ClusterIP: Internal only (Database)</li>
                                <li>NodePort: Opens a port on the server</li>
                                <li>LoadBalancer: Asks AWS/GCP for a real Load Balancer</li>
                            </ul>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Pokemon GO runs on Google Kubernetes Engine (GKE)."
                    impact="When millions of users logged in, K8s auto-scaled their servers up. When they left, it scaled down to save money."
                    role="Platform Engineers."
                />
            </div>
        </LessonLayout>
    );
};
