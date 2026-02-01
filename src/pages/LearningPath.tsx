import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, CheckCircle, Circle, Cpu, Database, Layers, Lock, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';


interface ModuleCardProps {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    status: 'completed' | 'current' | 'locked';
    link: string;
}

const modules: ModuleCardProps[] = [
    {
        id: 1,
        title: "Introduction to Java",
        description: "Understand the JVM, Bytecode, and why Java is 'Write Once, Run Anywhere'.",
        icon: Cpu,
        status: 'completed',
        link: '/learn/module-1'
    },
    {
        id: 2,
        title: "Variables & Memory",
        description: "Deep dive into Stack vs Heap memory. Visualizing where your data actually lives.",
        icon: Database,
        status: 'completed',
        link: '/learn/module-2'
    },
    {
        id: 3,
        title: "OOP Concepts",
        description: "Master Classes and Objects with the interactive Car Factory blueprint system.",
        icon: Layers,
        status: 'completed',
        link: '/learn/module-3'
    },
    {
        id: 4,
        title: "Collections Framework",
        description: "Lists, Sets, and Maps. Visualizing how data structures store and retrieve values.",
        icon: Brain,
        status: 'completed',
        link: '/learn/module-4'
    },
    {
        id: 5,
        title: "Control Flow",
        description: "Mastering If/Else logic and Loops. The heartbeat of every algorithm.",
        icon: ArrowRight,
        status: 'completed',
        link: '/learn/module-5'
    },
    {
        id: 6,
        title: "Exception Handling",
        description: "Learn how to catch errors (Try/Catch) and prevent your app from crashing.",
        icon: ShieldCheck,
        status: 'current',
        link: '/learn/module-6'
    }
];

export const LearningPath: React.FC = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">Learning Path</h1>
                <p className="text-slate-400">Your journey from "Hello World" to System Architect.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module) => (
                    <Link
                        key={module.id}
                        to={module.link}
                        className={cn(
                            "group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1",
                            module.status === 'completed' ? "bg-slate-900/50 border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-900/20" :
                                module.status === 'current' ? "bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/50" :
                                    "bg-slate-950 border-white/5 opacity-75 grayscale cursor-not-allowed"
                        )}
                    >
                        <div className="absolute top-6 right-6">
                            {module.status === 'completed' && <CheckCircle className="text-emerald-500" size={20} />}
                            {module.status === 'current' && <Circle className="text-blue-500" size={20} />}
                            {module.status === 'locked' && <Lock className="text-slate-600" size={20} />}
                        </div>

                        <div className="mb-4 w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                            <module.icon className={cn(
                                "transition-colors",
                                module.status === 'completed' ? "text-emerald-400" :
                                    module.status === 'current' ? "text-blue-400" : "text-slate-500"
                            )} size={24} />
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
                                <span className="text-xs font-mono text-slate-500">0{module.id}</span>
                                {module.title}
                            </h3>
                            <p className="text-sm text-slate-400">{module.description}</p>
                        </div>

                        <div className="flex items-center text-xs font-bold uppercase tracking-wider">
                            <span className={cn(
                                "flex items-center gap-1",
                                module.status === 'completed' ? "text-emerald-500" :
                                    module.status === 'current' ? "text-blue-500" : "text-slate-600"
                            )}>
                                {module.status === 'completed' ? "Review Module" :
                                    module.status === 'current' ? "Continue Learning" : "Locked"}
                                {module.status !== 'locked' && <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
