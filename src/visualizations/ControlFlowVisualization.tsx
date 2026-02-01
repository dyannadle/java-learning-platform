import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';


export const ControlFlowVisualization: React.FC = () => {
    const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
    const [output, setOutput] = useState<string[]>([]);
    const [variableN, setVariableN] = useState<number>(0);
    const [isRunning, setIsRunning] = useState(false);
    const [inputValue, setInputValue] = useState(1);

    const reset = () => {
        setIsRunning(false);
        setCurrentNodeId(null);
        setOutput([]);
        setVariableN(0);
    };

    const runStep = async () => {
        if (!isRunning) return;

        // Simulation mapping
        if (currentNodeId === 'start') {
            await wait(500);
            setCurrentNodeId('input');
        } else if (currentNodeId === 'input') {
            setVariableN(inputValue);
            appendToOutput(`Initialized N = ${inputValue}`);
            await wait(800);
            setCurrentNodeId('decision');
        } else if (currentNodeId === 'decision') {
            await wait(800);
            if (variableN < 5) {
                appendToOutput(`Check: ${variableN} < 5 is TRUE`);
                setCurrentNodeId('loop_body');
            } else {
                appendToOutput(`Check: ${variableN} < 5 is FALSE`);
                setCurrentNodeId('end');
            }
        } else if (currentNodeId === 'loop_body') {
            appendToOutput(`Printed: ${variableN}`);
            setVariableN(n => n + 1);
            await wait(800);
            // Visual hack to loop back
            setCurrentNodeId('decision');
        } else if (currentNodeId === 'end') {
            setIsRunning(false);
            appendToOutput('Program Finished.');
        }
    };

    useEffect(() => {
        if (isRunning && currentNodeId) {
            runStep();
        }
    }, [isRunning, currentNodeId, variableN]);

    const startSimulation = () => {
        reset();
        setIsRunning(true);
        setCurrentNodeId('start');
    };

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const appendToOutput = (text: string) => setOutput(prev => [...prev, text]);

    return (
        <div className="h-full flex flex-col p-6 bg-slate-950/50">
            {/* Controls */}
            <div className="flex gap-4 mb-6 items-end bg-slate-900/50 p-4 rounded-xl border border-white/5">
                <div className="space-y-1">
                    <label className="text-xs text-slate-500 uppercase font-bold pl-1">Starting Number</label>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(Number(e.target.value))}
                        min={0}
                        max={10}
                        disabled={isRunning}
                        className="w-24 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
                <button
                    onClick={startSimulation}
                    disabled={isRunning}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
                >
                    {isRunning ? <span className="animate-pulse">Running...</span> : <><Play size={18} /> Run Loop</>}
                </button>
                <button
                    onClick={reset}
                    disabled={isRunning}
                    className="px-4 py-2 hover:bg-slate-800 text-slate-400 rounded-lg transition-colors"
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            <div className="flex-1 flex gap-6 min-h-0">
                {/* Flowchart Area */}
                <div className="flex-1 relative bg-slate-900/30 rounded-xl border border-white/5 p-4 flex justify-center items-center">
                    <div className="relative w-64 h-96">
                        {/* Manual SVG connection lines for simplicity in this demo */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-700" strokeWidth="2">
                            <line x1="50%" y1="40" x2="50%" y2="80" /> {/* Start -> Input */}
                            <line x1="50%" y1="120" x2="50%" y2="160" /> {/* Input -> Decision */}

                            {/* Decision -> Loop Body (True - Left) */}
                            <path d="M 128 180 L 80 180 L 80 240" fill="none" />

                            {/* Decision -> End (False - Right) */}
                            <path d="M 128 180 L 176 180 L 176 240" fill="none" />

                            {/* Loop Body -> Decision (Back Loop) */}
                            <path d="M 80 280 L 80 300 L 30 300 L 30 140 L 128 140 L 128 160" fill="none" strokeDasharray="4" className="opacity-50" />
                        </svg>

                        {/* Node Rendering */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-10 rounded-full bg-emerald-900/50 border border-emerald-500/50 flex items-center justify-center text-xs font-mono text-emerald-200 shadow-lg shadow-emerald-500/10 transition-all duration-300"
                            style={{ opacity: currentNodeId === 'start' ? 1 : 0.5, transform: `translateX(-50%) scale(${currentNodeId === 'start' ? 1.1 : 1})`, borderColor: currentNodeId === 'start' ? '#10b981' : '' }}>
                            Start
                        </div>

                        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-10 -skew-x-12 bg-blue-900/50 border border-blue-500/50 flex items-center justify-center text-xs font-mono text-blue-200 shadow-lg shadow-blue-500/10 transition-all duration-300"
                            style={{ opacity: currentNodeId === 'input' ? 1 : 0.5, transform: `translateX(-50%) skewX(-12deg) scale(${currentNodeId === 'input' ? 1.1 : 1})`, borderColor: currentNodeId === 'input' ? '#3b82f6' : '' }}>
                            <span className="skew-x-12">Input N</span>
                        </div>

                        {/* Decision Diamond */}
                        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-24 h-24 rotate-45 bg-amber-900/50 border border-amber-500/50 flex items-center justify-center shadow-lg shadow-amber-500/10 transition-all duration-300"
                            style={{ opacity: currentNodeId === 'decision' ? 1 : 0.5, transform: `translateX(-50%) rotate(45deg) scale(${currentNodeId === 'decision' ? 1.1 : 1})`, borderColor: currentNodeId === 'decision' ? '#f59e0b' : '' }}>
                            <div className="-rotate-45 text-xs font-mono text-amber-200 text-center">Is N {'<'} 5?</div>
                        </div>

                        {/* Yes Label */}
                        <div className="absolute top-[170px] left-[70px] text-[10px] text-emerald-400 font-bold">YES</div>
                        {/* No Label */}
                        <div className="absolute top-[170px] right-[70px] text-[10px] text-red-400 font-bold">NO</div>

                        {/* Loop Body */}
                        <div className="absolute top-60 left-[30px] w-28 h-12 bg-slate-800 border border-slate-600 flex flex-col items-center justify-center text-[10px] font-mono text-slate-300 shadow-lg transition-all duration-300"
                            style={{ opacity: currentNodeId === 'loop_body' ? 1 : 0.5, transform: `scale(${currentNodeId === 'loop_body' ? 1.1 : 1})`, borderColor: currentNodeId === 'loop_body' ? '#fff' : '' }}>
                            <div>Print N</div>
                            <div>N = N + 1</div>
                        </div>

                        {/* End Node */}
                        <div className="absolute top-60 right-[30px] w-24 h-10 rounded-full bg-red-900/50 border border-red-500/50 flex items-center justify-center text-xs font-mono text-red-200 shadow-lg shadow-red-500/10 transition-all duration-300"
                            style={{ opacity: currentNodeId === 'end' ? 1 : 0.5, transform: `scale(${currentNodeId === 'end' ? 1.1 : 1})`, borderColor: currentNodeId === 'end' ? '#ef4444' : '' }}>
                            End
                        </div>
                    </div>
                </div>

                {/* State Panel */}
                <div className="w-64 flex flex-col gap-4">
                    {/* Variable Watch */}
                    <div className="bg-slate-900 rounded-xl border border-white/10 p-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">Memory</h3>
                        <div className="flex justify-between items-center bg-black/40 p-2 rounded border border-white/5">
                            <span className="font-mono text-purple-400">int N</span>
                            <motion.span
                                key={variableN}
                                initial={{ scale: 1.5, color: '#fff' }}
                                animate={{ scale: 1, color: '#94a3b8' }}
                                className="font-mono text-white text-lg"
                            >
                                {variableN}
                            </motion.span>
                        </div>
                    </div>

                    {/* Console Output */}
                    <div className="flex-1 bg-black/80 rounded-xl border border-white/10 p-3 font-mono text-xs overflow-y-auto">
                        <div className="text-slate-500 mb-2 border-b border-white/10 pb-1">Console Output</div>
                        <div className="space-y-1">
                            {output.map((line, i) => (
                                <div key={i} className="text-emerald-400">{'>'} {line}</div>
                            ))}
                            {output.length === 0 && <span className="text-slate-700 italic">...waiting for program...</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
