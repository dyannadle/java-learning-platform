import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { DockerLayersVis } from '../visualizations/cloud/DockerLayersVis';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, type Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is a Docker 'Image'?",
        options: [
            "A screenshot of your code",
            "A read-only template containing your code and dependencies",
            "A running database",
            "A virtual machine"
        ],
        correctIndex: 1,
        explanation: "Think of an Image as a 'Blueprint' or 'Class'. A Container is the running 'Instance' or 'Object'."
    },
    {
        id: 2,
        text: "Why do we use 'Multi-Stage Builds'?",
        options: [
            "To make the build slower",
            "To keep the final image small by removing build tools (like Maven)",
            "To run multiple apps",
            "It's required by law"
        ],
        correctIndex: 1,
        explanation: "The build stage has Maven (big). The run stage only needs the JRE and the JAR (small). This saves disk space and security risks."
    },
    {
        id: 3,
        text: "What does the 'FROM' instruction do?",
        options: [
            "Sends an email",
            "Specifies the base OS/Image (e.g., OpenJDK)",
            "Copies files",
            "Starts the app"
        ],
        correctIndex: 1,
        explanation: "Every Dockerfile starts with FROM. It says 'Start with THIS existing image'."
    }
];

export const ModuleNineteenDocker: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);
    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(19);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="Docker for Java Developers"
            subtitle="Module 19: Containerization"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<DockerLayersVis />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">It Runs on My Machine?</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Containerization solves the "It works on my machine" problem. A <strong>Container</strong> packages your Code + JDK + OS Settings into one standardized box.
                        </p>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-orange-400">The Dockerfile</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            The recipe for your container.
                        </p>
                        <div className="bg-slate-900 border border-blue-500/30 p-4 rounded-xl font-mono text-xs text-slate-300">
                            <span className="text-blue-400">FROM</span> openjdk:17-alpine<br />
                            <span className="text-blue-400">WORKDIR</span> /app<br />
                            <span className="text-blue-400">COPY</span> target/myapp.jar app.jar<br />
                            <span className="text-blue-400">ENTRYPOINT</span> ["java", "-jar", "app.jar"]
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-400">Layer Caching</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Docker images are built in <strong>Layers</strong>. If you change your code but not your dependencies, Docker Re-uses the dependency layer.
                        </p>
                        <p className="text-slate-300 text-sm">
                            This makes builds super fast. That's why we copy <code>pom.xml</code> first, run install, AND THEN copy source code.
                        </p>
                    </section>
                )}

                {step === 4 && (
                    <section className="space-y-4">
                        <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-green-400 mb-4">
                                🔧 Best Practice: Multi-Stage Builds
                            </h2>
                            <p className="text-sm text-slate-300 mb-4">
                                Don't ship Maven/Gradle to production. It bloats the image.
                            </p>
                            <div className="bg-black/50 p-2 rounded text-xs font-mono text-slate-400">
                                <span className="text-slate-500"># Stage 1: Build</span><br />
                                FROM maven AS build<br />
                                RUN mvn package<br /><br />
                                <span className="text-slate-500"># Stage 2: Run</span><br />
                                FROM openjdk:17-jre<br />
                                COPY --from=build /target/app.jar app.jar
                            </div>
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Every major tech company (Google, Netflix, Amazon) runs on containers."
                    impact="Containers allow you to deploy the exact same artifact to Dev, QA, and Production."
                    role="DevOps Engineers manage this."
                />
            </div>
        </LessonLayout>
    );
};
