import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage: React.FC = () => {
    return (
        <div className="space-y-32 py-10 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    v1.0 Beta is Live
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-bold tracking-tight"
                >
                    Master Java with <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-500 to-indigo-500 animate-gradient-x">
                        Deep Understanding
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Stop memorizing syntax. Visualize how the JVM works, understand memory management, and build real-world applications from scratch.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-center gap-4 pt-8"
                >
                    <Link
                        to="/learn"
                        className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
                    >
                        Start Learning Free
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        to="/projects"
                        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all border border-slate-700 hover:border-slate-600 hover:-translate-y-1"
                    >
                        View Projects
                    </Link>
                </motion.div>
            </section>

            {/* Feature Grid */}
            <section className="grid md:grid-cols-3 gap-6 relative z-10 px-4">
                <FeatureCard
                    icon={<BookOpen className="text-blue-400" />}
                    title="Visual Learning"
                    description="Interactive diagrams for complex topics like Garbage Collection and Memory Stack."
                />
                <FeatureCard
                    icon={<Code className="text-violet-400" />}
                    title="Build Real Stuff"
                    description="Don't just print 'Hello World'. Build Banking Systems, APIs, and Games."
                />
                <FeatureCard
                    icon={<Zap className="text-amber-400" />}
                    title="Industry Ready"
                    description="Learn Spring Boot, Hibernate, and Microservices architecture patterns."
                />
            </section>

            {/* Why Java Section */}
            <section className="relative z-10 px-4">
                <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-12 md:p-20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white">Why Java in 2026?</h2>
                        <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-blue-400">Enterprise King</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    90% of Fortune 500 companies run on Java. It's the backbone of banking, e-commerce, and big data processing.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-emerald-400">High Performance</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    With the new GraalVM and Virtual Threads (Project Loom), Java rivals C++ in speed while maintaining memory safety.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-purple-400">Massive Ecosystem</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    From Android Apps to Minecraft Mods, from AWS Lambdas to Apache Kafka - Java is everywhere.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-amber-400">Career Stability</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Java developers are always in high demand. It's a skill that pays dividends for decades.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-white/10 hover:bg-white/10 transition-all"
        >
            <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center mb-4 border border-white/5">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-100">{title}</h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
