import React, { useState } from 'react';
import { LessonLayout } from '../components/layout/LessonLayout';
import { IOVisualization } from '../visualizations/IOVisualization';
import { RealWorldContext } from '../components/ui/RealWorldContext';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { Quiz, Question } from '../components/layout/Quiz';

const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is the primary purpose of a Buffer in File I/O?",
        options: [
            "To delete the file content",
            "To reduce the number of physical disk accesses by reading chunks at a time",
            "To encrypt the data",
            "To make the file read-only"
        ],
        correctIndex: 1,
        explanation: "Disks are slow. Buffers read large chunks (e.g., 8KB) into memory at once, so your program reads from fast RAM instead of hitting the disk for every byte."
    },
    {
        id: 2,
        text: "What does 'Serializable' do?",
        options: [
            "Converts an Object into a stream of bytes to be saved to a file",
            "Sorts a list of objects",
            "Prints the object to the console",
            "Deletes the object from memory"
        ],
        correctIndex: 0,
        explanation: "Serialization turns a complex Java Object (Heap) into a raw byte format that can be stored on disk or sent over a network."
    },
    {
        id: 3,
        text: "Why must we close streams/files?",
        options: [
            "To free up system resources (file handles) and prevent memory leaks",
            "It is not necessary in modern Java",
            "To delete the file",
            "To speed up the CPU"
        ],
        correctIndex: 0,
        explanation: "Operating Systems have a limit on open files. Failing to close them can crash your app or lock the file from being used by others."
    }
];

export const ModuleNineIO: React.FC = () => {
    const navigate = useNavigate();
    const { markComplete } = useProgress();
    const [step, setStep] = useState(1);
    const [quizPassed, setQuizPassed] = useState(false);

    // 3 Content Steps + 1 Quiz Step
    const totalSteps = 4;

    const handleComplete = () => {
        if (quizPassed) {
            markComplete(9);
            navigate('/learn');
        }
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    return (
        <LessonLayout
            title="File I/O"
            subtitle="Module 9: Reading & Writing Data"
            currentStep={step}
            totalSteps={totalSteps}
            onNext={nextStep}
            onPrev={prevStep}
            visualization={<IOVisualization />}
            onComplete={handleComplete}
            quiz={<Quiz questions={QUIZ_QUESTIONS} onPass={() => setQuizPassed(true)} />}
            isQuizPassed={quizPassed}
        >
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {step === 1 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-blue-300">Streams of Data</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            In Java, all data input and output is handled by <strong>Streams</strong>. Imagine a pipe connecting your program to a file, keyboard, or network.
                        </p>
                        <div className="mt-4 bg-slate-800 p-4 rounded-xl border border-white/5">
                            <h3 className="text-sm font-bold text-white mb-2">Byte vs Character Streams</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-black/20 rounded border border-white/5">
                                    <div className="text-xs text-blue-400 mb-1">InputStream / OutputStream</div>
                                    <p className="text-[10px] text-slate-400">For Raw Bytes (Images, Audio, PDFs).</p>
                                </div>
                                <div className="p-3 bg-black/20 rounded border border-white/5">
                                    <div className="text-xs text-amber-400 mb-1">Reader / Writer</div>
                                    <p className="text-[10px] text-slate-400">For Text (Human readable strings).</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {step === 2 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-emerald-300">The Power of Buffering</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Reading from a disk is thousands of times slower than reading from RAM.
                            If you read 1 byte at a time, your app will crawl.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            A <strong>BufferedReader</strong> grabs a big chunk of data (the Buffer) at once, minimizing expensive trips to the disk.
                        </p>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-emerald-200">
                            <div className="text-[10px] text-slate-500 mb-1">// Try-with-resources (Auto-closes file)</div>
                            try (BufferedReader br = new BufferedReader(new FileReader("data.txt"))) {'{'}<br />
                            &nbsp;&nbsp; String line;<br />
                            &nbsp;&nbsp; while ((line = br.readLine()) != null) {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp; System.out.println(line);<br />
                            &nbsp;&nbsp; {'}'}<br />
                            {'}'}
                        </div>
                    </section>
                )}

                {step === 3 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 text-purple-300">Serialization</h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            How do you save a running Java Object (like a Game Save) to a file? You "Serialize" it.
                            This turns the object into a byte stream.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400 border-l-2 border-purple-500/50 pl-4">
                            <li>• <strong>Interface:</strong> Class must implement <code>Serializable</code> (Marker interface).</li>
                            <li>• <strong>transient:</strong> Keyword to skip fields (e.g., passwords) during serialization.</li>
                        </ul>
                        <div className="mt-4 text-xs font-mono bg-slate-800 p-3 rounded text-purple-200">
                            class User implements Serializable {'{'}<br />
                            &nbsp;&nbsp; String name;<br />
                            &nbsp;&nbsp; transient String password; // Won't be saved<br />
                            {'}'}
                        </div>
                    </section>
                )}

                <RealWorldContext
                    useCase="Every time you hit 'Save' in a Word Doc, File I/O writes buffers to disk."
                    impact="Efficient I/O is critical for databases. They use massive buffers to ensure queries are fast."
                    role="Backend Devs process 10GB log files using Streams because loading the whole file into RAM would crash the server."
                />
            </div>
        </LessonLayout>
    );
};
