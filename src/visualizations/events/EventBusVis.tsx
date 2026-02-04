import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Mail, Package, Radio } from 'lucide-react';

interface EventPacket {
    id: number;
    destination: 'topic';
}

export const EventBusVis: React.FC = () => {
    const [events, setEvents] = useState<EventPacket[]>([]);
    const [consumerStatus, setConsumerStatus] = useState({ email: 'idle', inventory: 'idle' });
    const [log, setLog] = useState<string[]>([]);

    const publishEvent = () => {
        const id = Date.now();
        setEvents(prev => [...prev, { id, destination: 'topic' }]);
        setLog(prev => [...prev, `Order Service: Published OrderCreatedEvent #${id.toString().slice(-4)}`]);

        // Simulate async consumption
        setTimeout(() => {
            processEvent(id);
        }, 1500);
    };

    const processEvent = (id: number) => {
        setEvents(prev => prev.filter(e => e.id !== id));

        // Trigger consumers
        setConsumerStatus({ email: 'processing', inventory: 'processing' });
        setLog(prev => [...prev, `Kafka: Broadcasting Event #${id.toString().slice(-4)} to Listeners`]);

        setTimeout(() => {
            setConsumerStatus(prev => ({ ...prev, email: 'done' }));
            setLog(prev => [...prev, `Email Service: Sent Confirmation`]);

            setTimeout(() => setConsumerStatus(prev => ({ ...prev, email: 'idle' })), 1000);
        }, 1000);

        setTimeout(() => {
            setConsumerStatus(prev => ({ ...prev, inventory: 'done' }));
            setLog(prev => [...prev, `Inventory Service: Reserved Stock`]);

            setTimeout(() => setConsumerStatus(prev => ({ ...prev, inventory: 'idle' })), 1000);
        }, 1500);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Radio className="text-orange-400" /> Event Bus (Kafka)
            </h3>

            {/* Controls */}
            <div className="text-center mb-8">
                <button
                    onClick={publishEvent}
                    className="bg-orange-600 hover:bg-orange-500 px-6 py-2 rounded-lg font-bold shadow-lg shadow-orange-600/20 active:scale-95 transition-transform"
                >
                    Publish "Order Created" Event
                </button>
            </div>

            {/* Diagram */}
            <div className="relative h-64 bg-slate-950/50 rounded-xl border border-white/5 mx-10">

                {/* Producer */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center border-2 border-white/20">
                        <Server className="text-white" />
                    </div>
                    <span className="text-xs mt-2 font-mono text-blue-300">Order Service</span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold mt-1">Producer</span>
                </div>

                {/* Topic (Bus) */}
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-48 h-20 bg-slate-800 rounded-lg border-2 border-slate-600 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center">
                        <Radio className="text-slate-400 mb-1" />
                        <span className="text-xs font-mono font-bold text-slate-300">Topic: orders</span>
                    </div>
                </div>

                {/* Consumers */}
                <div className="absolute right-6 top-8 flex flex-col items-center">
                    <div className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center transition-all duration-300
                        ${consumerStatus.email === 'processing' ? 'bg-yellow-600 border-yellow-300 scale-110' :
                            consumerStatus.email === 'done' ? 'bg-green-600 border-green-300' : 'bg-slate-800 border-slate-600'}
                     `}>
                        <Mail className="text-white" size={20} />
                    </div>
                    <span className="text-xs mt-2 font-mono text-slate-400">Email Service</span>
                </div>

                <div className="absolute right-6 bottom-8 flex flex-col items-center">
                    <div className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center transition-all duration-300
                        ${consumerStatus.inventory === 'processing' ? 'bg-purple-600 border-purple-300 scale-110' :
                            consumerStatus.inventory === 'done' ? 'bg-green-600 border-green-300' : 'bg-slate-800 border-slate-600'}
                     `}>
                        <Package className="text-white" size={20} />
                    </div>
                    <span className="text-xs mt-2 font-mono text-slate-400">Inventory Service</span>
                </div>

                {/* Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="80" y1="128" x2="33%" y2="128" stroke="#334155" strokeWidth="2" />
                    <line x1="60%" y1="128" x2="80%" y2="60" stroke="#334155" strokeWidth="2" />
                    <line x1="60%" y1="128" x2="80%" y2="190" stroke="#334155" strokeWidth="2" />
                </svg>

                {/* Events Animation */}
                <AnimatePresence>
                    {events.map((e) => (
                        <motion.div
                            key={e.id}
                            className="absolute z-20 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_10px_orange]"
                            initial={{ left: '80px', top: '50%' }}
                            animate={{ left: '45%' }}
                            exit={{ opacity: 0, scale: 2 }}
                            transition={{ duration: 0.8 }}
                        />
                    ))}
                    {/* Fan Out Animation */}
                    {(consumerStatus.email === 'processing' || consumerStatus.inventory === 'processing') && (
                        <>
                            <motion.div
                                className="absolute z-20 w-3 h-3 bg-orange-500 rounded-full"
                                initial={{ left: '60%', top: '50%' }}
                                animate={{ left: '80%', top: '25%' }} // To Email
                                transition={{ duration: 0.5 }}
                            />
                            <motion.div
                                className="absolute z-20 w-3 h-3 bg-orange-500 rounded-full"
                                initial={{ left: '60%', top: '50%' }}
                                animate={{ left: '80%', top: '75%' }} // To Inventory
                                transition={{ duration: 0.5 }}
                            />
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Log */}
            <div className="mt-4 bg-black/50 p-4 rounded-lg h-32 overflow-y-auto font-mono text-xs border border-white/10">
                {log.map((entry, i) => (
                    <div key={i} className="mb-1 text-slate-300 border-l-2 border-slate-700 pl-2">
                        {entry}
                    </div>
                ))}
            </div>
        </div>
    );
};
