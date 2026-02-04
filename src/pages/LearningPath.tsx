import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, CheckCircle, Circle, Cpu, Database, Layers, Lock, ShieldCheck, Filter, Play, HardDrive, Zap, Globe, Radio, Box, Activity } from 'lucide-react';
import { cn } from '../lib/utils';


import { useProgress } from '../hooks/useProgress';

// ... (imports)

// Remove 'status' from interface as it is now dynamic
interface ModuleCardProps {
    id: number;
    title: string;
    description: string;
    icon: React.ElementType;
    link: string;
}

const modules: ModuleCardProps[] = [
    {
        id: 1,
        title: "Introduction to Java",
        description: "Understand the JVM, Bytecode, and why Java is 'Write Once, Run Anywhere'.",
        icon: Cpu,
        link: '/learn/module-1'
    },
    {
        id: 2,
        title: "Variables & Memory",
        description: "Deep dive into Stack vs Heap memory. Visualizing where your data actually lives.",
        icon: Database,
        link: '/learn/module-2'
    },
    {
        id: 3,
        title: "OOP Concepts",
        description: "Master Classes and Objects with the interactive Car Factory blueprint system.",
        icon: Layers,
        link: '/learn/module-3'
    },
    {
        id: 4,
        title: "Collections Framework",
        description: "Lists, Sets, and Maps. Visualizing how data structures store and retrieve values.",
        icon: Brain,
        link: '/learn/module-4'
    },
    {
        id: 5,
        title: "Control Flow",
        description: "Mastering If/Else logic and Loops. The heartbeat of every algorithm.",
        icon: ArrowRight,
        link: '/learn/module-5'
    },
    {
        id: 6,
        title: "Exception Handling",
        description: "Learn how to catch errors (Try/Catch) and prevent your app from crashing.",
        icon: ShieldCheck,
        link: '/learn/module-6'
    },
    {
        id: 7,
        title: "Functional Programming",
        description: "Modern Java: Lambda expressions, Streams API, and declarative coding.",
        icon: Filter,
        link: '/learn/module-7'
    },
    {
        id: 8,
        title: "Concurrency & Threads",
        description: "Multithreading, race conditions, and synchronization.",
        icon: Play,
        link: '/learn/module-8'
    },
    {
        id: 9,
        title: "File I/O",
        description: "Reading/Writing files, Buffers, and Serialization.",
        icon: HardDrive, // Need to import this
        link: '/learn/module-9'
    },
    {
        id: 10,
        title: "Generics",
        description: "Writing type-safe code with <T> and Wildcards.",
        icon: Filter,
        link: '/learn/module-10'
    },
    {
        id: 11,
        title: "Design Patterns",
        description: "Singleton, Factory, Observer. Architectural solutions to common problems.",
        icon: Layers,
        link: '/learn/module-11'
    },
    {
        id: 17,
        title: "Microservices",
        description: "Breaking the monolith. Spring Cloud Gateway and Eureka.",
        icon: Globe,
        link: '/learn/module-17'
    },
    {
        id: 18,
        title: "Event-Driven Arch",
        description: "Decoupled systems with Kafka and Asynchronous events.",
        icon: Radio,
        link: '/learn/module-18'
    },
    {
        id: 19,
        title: "Docker Containers",
        description: "Containerization, Dockerfiles, and Multi-Stage Builds.",
        icon: Box,
        link: '/learn/module-19'
    },
    {
        id: 20,
        title: "Kubernetes Basics",
        description: "Orchestration, Pods, Services, and Self-Healing.",
        icon: Activity,
        link: '/learn/module-20'
    },
    {
        id: 21,
        title: "Reactive (WebFlux)",
        description: "Non-blocking I/O using Mono, Flux, and Backpressure.",
        icon: Zap,
        link: '/learn/module-21'
    },
    {
        id: 22,
        title: "GraphQL",
        description: "Flexible APIs with Schemas, Queries, and Mutations.",
        icon: Database,
        link: '/learn/module-22'
    }
];

export const LearningPath: React.FC = () => {
    const { isCompleted, isLocked, resetProgress } = useProgress();
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredModules = modules.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Learning Path</h1>
                    <p className="text-slate-400">Your journey from "Hello World" to System Architect.</p>
                </div>

                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search modules..."
                        className="bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 w-full md:w-64 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button
                        onClick={() => {
                            if (confirm("Are you sure you want to reset all progress?")) {
                                resetProgress();
                            }
                        }}
                        className="text-xs text-slate-600 hover:text-red-400 transition-colors"
                    >
                        Reset Progress
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map((module) => {
                    const completed = isCompleted(module.id);
                    const locked = isLocked(module.id);
                    const current = !completed && !locked;
                    const status = completed ? 'completed' : locked ? 'locked' : 'current';

                    return (
                        <Link
                            key={module.id}
                            to={locked ? '#' : module.link}
                            className={cn(
                                "group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1",
                                status === 'completed' ? "bg-slate-900/50 border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-900/20" :
                                    status === 'current' ? "bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/50" :
                                        "bg-slate-950 border-white/5 opacity-75 grayscale cursor-not-allowed"
                            )}
                            onClick={(e) => locked && e.preventDefault()}
                        >
                            <div className="absolute top-6 right-6 flex items-center gap-2">
                                <span className="hidden group-hover:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Zap size={10} fill="currentColor" /> Deep Dive
                                </span>
                                {status === 'completed' && <CheckCircle className="text-emerald-500" size={20} />}
                                {status === 'current' && <Circle className="text-blue-500" size={20} />}
                                {status === 'locked' && <Lock className="text-slate-600" size={20} />}
                            </div>

                            <div className="mb-4 w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                                <module.icon className={cn(
                                    "transition-colors",
                                    status === 'completed' ? "text-emerald-400" :
                                        status === 'current' ? "text-blue-400" : "text-slate-500"
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
                                    status === 'completed' ? "text-emerald-500" :
                                        status === 'current' ? "text-blue-500" : "text-slate-600"
                                )}>
                                    {status === 'completed' ? "Review Module" :
                                        status === 'current' ? "Continue Learning" : "Locked"}
                                    {status !== 'locked' && <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
