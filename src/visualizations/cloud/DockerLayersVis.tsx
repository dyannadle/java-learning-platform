import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Box, RefreshCw } from 'lucide-react';

export const DockerLayersVis: React.FC = () => {
    const [building, setBuilding] = useState(false);
    const [layers, setLayers] = useState([
        { id: 1, name: 'Guest OS (Alpine Linux)', size: '5MB', status: 'cached' },
        { id: 2, name: 'JDK Runtime', size: '100MB', status: 'cached' },
        { id: 3, name: 'Maven Dependencies', size: '40MB', status: 'cached' },
        { id: 4, name: 'Application Code', size: '2MB', status: 'cached' },
    ]);
    const [buildLog, setBuildLog] = useState<string[]>([]);

    const triggerBuild = (changeDeps: boolean) => {
        setBuilding(true);
        setBuildLog(['Starting Build...']);

        // Reset statuses based on change
        setLayers(prev => prev.map(l => ({
            ...l,
            status: (l.id === 4 || (changeDeps && l.id === 3)) ? 'pending' : 'cached'
        })));

        let currentStep = 0;
        const totalSteps = 4;

        const interval = setInterval(() => {
            currentStep++;

            const currentLayerIndex = currentStep - 1;
            const layer = layers[currentLayerIndex];

            // This logic is simplified for the demo
            // In reality we'd check the state we just set

            if (currentStep > totalSteps) {
                clearInterval(interval);
                setBuilding(false);
                setLayers(prev => prev.map(l => ({ ...l, status: 'fresh' }))); // Just visual final state
                setBuildLog(prev => [...prev, 'Build Complete! Image ID: a1b2c3d4']);
                return;
            }

            // Check if this layer is cached or needs rebuild
            const isDependencyLayer = currentStep === 3;
            const isCodeLayer = currentStep === 4;

            if (changeDeps && isDependencyLayer) {
                setBuildLog(prev => [...prev, `Layer ${currentStep}: Dependencies changed. REBUILDING...`]);
                // Visual update would happen here
            } else if (isCodeLayer) {
                setBuildLog(prev => [...prev, `Layer ${currentStep}: Code changed. REBUILDING...`]);
            } else {
                setBuildLog(prev => [...prev, `Layer ${currentStep}: Using Cache`]);
            }

        }, 800);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Box className="text-blue-400" /> Docker Layer Caching
            </h3>

            {/* Controls */}
            <div className="flex gap-4 mb-8 justify-center">
                <button
                    onClick={() => triggerBuild(false)}
                    disabled={building}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 px-4 py-2 rounded text-sm font-bold border border-white/10"
                >
                    <RefreshCw size={14} className={building ? "animate-spin" : ""} />
                    Change Code Only
                </button>
                <button
                    onClick={() => triggerBuild(true)}
                    disabled={building}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-4 py-2 rounded text-sm font-bold"
                >
                    <Box size={14} />
                    Change Dependencies (pom.xml)
                </button>
            </div>

            <div className="flex gap-8 items-start">

                {/* Layer Stack */}
                <div className="flex-1 space-y-2 flex flex-col-reverse">
                    {layers.map((layer) => {
                        // Determine visual state dynamically based on button press for simplicity in render
                        // In a real app we'd bind this strictly to state
                        // Here we assume "pending" logic from triggerBuild
                        return (
                            <motion.div
                                key={layer.id}
                                layout
                                className={`p-4 rounded-lg border flex justify-between items-center
                                    ${building && (layer.id === 4 || (layer.id === 3 && buildLog.join('').includes('Dependencies'))) ? 'bg-yellow-500/10 border-yellow-500/50 animate-pulse' :
                                        'bg-green-500/10 border-green-500/30'}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <Layers size={16} className="text-slate-400" />
                                    <div>
                                        <div className="text-sm font-bold text-slate-200">{layer.name}</div>
                                        <div className="text-[10px] text-slate-500">{layer.size}</div>
                                    </div>
                                </div>
                                <div className="text-xs font-mono">
                                    {building ? '...' : 'Cached'}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Console */}
                <div className="w-1/2 h-64 bg-black/50 rounded-lg p-4 font-mono text-xs overflow-y-auto border border-white/5">
                    {buildLog.length === 0 && <span className="text-slate-600">Waiting for build command...</span>}
                    {buildLog.map((line, i) => (
                        <div key={i} className={`mb-1 ${line.includes('REBUILDING') ? 'text-yellow-400' : line.includes('Cache') ? 'text-green-400' : 'text-slate-300'}`}>
                            {line}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
