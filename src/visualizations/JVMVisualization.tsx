import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Cpu, Database, FileCode, Play, Terminal } from 'lucide-react';

export const JVMVisualization: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const steps = [
        { id: 'source', label: 'Source Code (.java)', icon: FileCode, desc: "Human readable code." },
        { id: 'compiler', label: 'Compiler (javac)', icon: Terminal, desc: "Translates code into Bytecode." },
        { id: 'bytecode', label: 'Bytecode (.class)', icon: FileCode, desc: "Platform independent code." },
        { id: 'jvm', label: 'JVM', icon: Cpu, desc: "Java Virtual Machine executes the bytecode." },
        { id: 'native', label: 'Native Machine Code', icon: Database, desc: "Binary code the CPU understands." },
    ];

    const handleNext = () => {
        setActiveStep((prev) => (prev + 1) % (steps.length + 1));
    };



    return (
        <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-950/50">
            <div className="relative w-full max-w-md space-y-4">
                {/* Connection Line Background */}
                <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-800 -z-10" />

                {steps.map((step, index) => {
                    const isActive = activeStep >= index + 1;
                    const isCurrent = activeStep === index + 1;

                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0.5, x: 0 }}
                            animate={{
                                opacity: isActive ? 1 : 0.4,
                                scale: isCurrent ? 1.05 : 1,
                                borderColor: isCurrent ? '#3b82f6' : 'transparent'
                            }}
                            className={cn(
                                "relative flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-slate-900 transition-all duration-500",
                                isActive && "bg-slate-800 border-white/10 shadow-lg"
                            )}
                        >
                            {/* Status Indicator */}
                            <div className={cn(
                                "w-16 h-16 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-500",
                                isActive ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-600"
                            )}>
                                <step.icon size={24} />
                            </div>

                            <div className="flex-1">
                                <h3 className={cn("font-bold transition-colors", isActive ? "text-white" : "text-slate-500")}>
                                    {step.label}
                                </h3>
                                <p className="text-sm text-slate-400">{step.desc}</p>
                            </div>

                            {/* Data Flow Particle */}
                            {isCurrent && (
                                <motion.div
                                    layoutId="particle"
                                    className="absolute -left-[5px] top-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-12 flex gap-4">
                <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                    <Play size={18} />
                    {activeStep === 0 ? "Start Compilation" : activeStep >= steps.length ? "Restart" : "Next Step"}
                </button>
            </div>

            <AnimatePresence>
                {activeStep >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-8 left-8 right-8 p-4 bg-slate-900/90 backdrop-blur border border-blue-500/20 rounded-lg text-center"
                    >
                        <p className="text-blue-200">
                            {activeStep === 1 && "Start with simple text code written by a human."}
                            {activeStep === 2 && "The 'javac' compiler checks for errors and translates syntax."}
                            {activeStep === 3 && "Bytecode is created! This 'intermediate' code can run on ANY device with a JVM."}
                            {activeStep === 4 && "The JVM interprets (or JIT compiles) the bytecode for this specific OS."}
                            {activeStep === 5 && "The CPU executes the final binary instructions. The app runs!"}
                            {activeStep > 5 && "Process Complete! This architecture makes Java 'Write Once, Run Anywhere'."}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
