import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Database, ArrowRight, FileJson, CheckCircle } from 'lucide-react';

type Layer = 'Client' | 'Controller' | 'Service' | 'Repository' | 'Database';

export const RestFlowVis: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [currentLayer, setCurrentLayer] = useState<Layer>('Client');

    const sendRequest = () => {
        if (status === 'processing') return;
        setStatus('processing');
        setCurrentLayer('Client');

        const sequence: Layer[] = ['Controller', 'Service', 'Repository', 'Database', 'Repository', 'Service', 'Controller', 'Client'];

        let i = 0;
        const interval = setInterval(() => {
            if (i >= sequence.length) {
                clearInterval(interval);
                setStatus('success');
                setTimeout(() => setStatus('idle'), 2000);
            } else {
                setCurrentLayer(sequence[i]);
                i++;
            }
        }, 800);
    };

    return (
        <div className="p-6 bg-slate-900/50 rounded-xl border border-white/5 h-[450px] flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                        <Globe size={20} /> REST Request Lifecycle
                    </h3>
                    <p className="text-xs text-slate-400">Trace a GET request through the Spring Boot layers.</p>
                </div>
                <button
                    onClick={sendRequest}
                    disabled={status === 'processing'}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {status === 'processing' ? 'Processing...' : status === 'success' ? 'Success!' : 'Send Request'}
                </button>
            </div>

            <div className="flex-1 relative flex items-center justify-between px-10">
                {/* Layers */}
                <LayerNode label="Client" icon={Globe} isActive={currentLayer === 'Client'} color="text-slate-300" />
                <ArrowFn />
                <LayerNode label="Controller" icon={Server} isActive={currentLayer === 'Controller'} color="text-purple-400" sub="Web Layer" />
                <ArrowFn />
                <LayerNode label="Service" icon={Server} isActive={currentLayer === 'Service'} color="text-blue-400" sub="Business Logic" />
                <ArrowFn />
                <LayerNode label="Repository" icon={Database} isActive={currentLayer === 'Repository'} color="text-orange-400" sub="Data Access" />
                <ArrowFn />
                <LayerNode label="Database" icon={Database} isActive={currentLayer === 'Database'} color="text-green-400" sub="MySQL/Postgres" />

                {/* Moving Packet */}
                {status === 'processing' && (
                    <motion.div
                        layoutId="packet"
                        className="absolute bottom-10 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 blur-sm"
                        transition={{ duration: 0.5 }}
                    />
                )}
            </div>

            <div className="h-24 bg-slate-800/50 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-hidden relative">
                <div className="absolute top-2 right-2 text-slate-500 text-[10px] uppercase">Logs</div>
                <div className="space-y-1">
                    <LogLine layer="Client" msg="GET /api/users/1" active={currentLayer === 'Client'} />
                    <LogLine layer="Controller" msg="UserController.getUser(1)" active={currentLayer === 'Controller'} />
                    <LogLine layer="Service" msg="UserService.findById(1)" active={currentLayer === 'Service'} />
                    <LogLine layer="Repository" msg="SELECT * FROM users WHERE id=1" active={currentLayer === 'Repository' || currentLayer === 'Database'} />
                    {status === 'success' && <div className="text-green-400 flex items-center gap-1"><CheckCircle size={10} /> 200 OK: {'{ "id": 1, "name": "Deepak" }'}</div>}
                </div>
            </div>
        </div>
    );
};

const LayerNode = ({ label, icon: Icon, isActive, color, sub }: any) => (
    <div className={`flex flex-col items-center gap-2 transition-all duration-300 ${isActive ? 'scale-110 opacity-100' : 'opacity-40 scale-95'}`}>
        <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center bg-slate-900 ${isActive ? `border-current ${color} shadow-lg shadow-current/20` : 'border-slate-700 text-slate-600'}`}>
            <Icon size={28} />
        </div>
        <div className="text-center">
            <div className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-500'}`}>{label}</div>
            {sub && <div className="text-[10px] text-slate-500 uppercase tracking-wider">{sub}</div>}
        </div>
        {isActive && (
            <motion.div layoutId="active-indicator" className="mt-1">
                <FileJson size={14} className="text-yellow-400 animate-bounce" />
            </motion.div>
        )}
    </div>
);

const ArrowFn = () => <ArrowRight size={20} className="text-slate-700" />;

const LogLine = ({ layer, msg, active }: any) => (
    <div className={`flex items-center gap-2 transition-opacity ${active ? 'opacity-100' : 'opacity-20'}`}>
        <span className="w-20 text-slate-500">[{layer}]</span>
        <span className={active ? 'text-white' : 'text-slate-500'}>{msg}</span>
    </div>
);
