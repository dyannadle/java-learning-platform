import React, { useMemo, useCallback } from 'react';
import { ReactFlow, Background, Controls, type Node, type Edge, BackgroundVariant, useNodesState, useEdgesState, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Custom Node Component to look premium
const CustomNode = ({ data }: { data: { label: string, status: 'done' | 'current' | 'locked', path?: string } }) => {
    const isDone = data.status === 'done';
    const isCurrent = data.status === 'current';
    const isLocked = data.status === 'locked';

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`px-6 py-4 rounded-2xl shadow-2xl border min-w-[180px] text-center transition-all duration-300 relative group cursor-pointer ${isDone ? 'bg-slate-900/80 border-emerald-500/50 text-emerald-200 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]' :
                isCurrent ? 'bg-blue-600 border-blue-400 text-white ring-4 ring-blue-500/20 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]' :
                    'bg-slate-950/80 border-slate-800 text-slate-600 grayscale'
                }`}
        >
            <Handle type="target" position={Position.Top} className="!bg-slate-500 !w-3 !h-3" />

            <div className="font-bold text-lg font-heading tracking-tight">{data.label}</div>
            <div className={`text-[10px] uppercase tracking-widest mt-2 font-bold ${isDone ? 'text-emerald-400' : isCurrent ? 'text-blue-200' : 'text-slate-600'
                }`}>
                {isDone ? 'Completed' : isCurrent ? 'In Progress' : 'Locked'}
            </div>

            {!isLocked && (
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all" />
            )}

            <Handle type="source" position={Position.Bottom} className="!bg-slate-500 !w-3 !h-3" />
        </motion.div>
    );
};

const initialNodes: Node[] = [
    { id: '1', position: { x: 250, y: 0 }, data: { label: '1. Intro to Java', status: 'done', path: '/learn/module-1' }, type: 'custom' },
    { id: '2', position: { x: 250, y: 150 }, data: { label: '2. Variables & Memory', status: 'done', path: '/learn/module-2' }, type: 'custom' },
    { id: '3', position: { x: 250, y: 300 }, data: { label: '3. OOP Basics', status: 'done', path: '/learn/module-3' }, type: 'custom' },
    { id: '4', position: { x: 50, y: 450 }, data: { label: '4. Collections', status: 'done', path: '/learn/module-4' }, type: 'custom' },
    { id: '5', position: { x: 450, y: 450 }, data: { label: '5. Control Flow', status: 'done', path: '/learn/module-5' }, type: 'custom' },
    { id: '6', position: { x: 250, y: 600 }, data: { label: '6. Exceptions', status: 'done', path: '/learn/module-6' }, type: 'custom' },
    { id: '7', position: { x: 250, y: 750 }, data: { label: '7. Streams & Lambdas', status: 'done', path: '/learn/module-7' }, type: 'custom' },
    { id: '8', position: { x: 50, y: 900 }, data: { label: '8. Concurrency', status: 'done', path: '/learn/module-8' }, type: 'custom' },
    { id: '9', position: { x: 450, y: 900 }, data: { label: '9. File I/O', status: 'done', path: '/learn/module-9' }, type: 'custom' },
    { id: '10', position: { x: 250, y: 1050 }, data: { label: '10. Generics', status: 'current', path: '/learn/module-10' }, type: 'custom' },
    { id: '11', position: { x: 250, y: 1200 }, data: { label: '11. Design Patterns', status: 'locked', path: '/learn/module-11' }, type: 'custom' },
    { id: '12', position: { x: 50, y: 1350 }, data: { label: '12. Spring Core', status: 'locked', path: '/learn/module-12' }, type: 'custom' },
    { id: '13', position: { x: 450, y: 1350 }, data: { label: '13. REST APIs', status: 'locked', path: '/learn/module-13' }, type: 'custom' },
    { id: '14', position: { x: 250, y: 1500 }, data: { label: '14. JPA & Database', status: 'locked', path: '/learn/module-14' }, type: 'custom' },
    { id: '15', position: { x: 250, y: 1650 }, data: { label: '15. Spring Security', status: 'locked', path: '/learn/module-15' }, type: 'custom' },
    { id: '16', position: { x: 450, y: 1650 }, data: { label: '16. Testing & QA', status: 'locked', path: '/learn/module-16' }, type: 'custom' },
    { id: '17', position: { x: 250, y: 1800 }, data: { label: '17. Microservices', status: 'locked', path: '/learn/module-17' }, type: 'custom' },
    { id: '18', position: { x: 250, y: 1950 }, data: { label: '18. Event-Driven Arch', status: 'locked', path: '/learn/module-18' }, type: 'custom' },
    { id: '19', position: { x: 250, y: 2100 }, data: { label: '19. Docker', status: 'locked', path: '/learn/module-19' }, type: 'custom' },
    { id: '20', position: { x: 250, y: 2250 }, data: { label: '20. Kubernetes', status: 'locked', path: '/learn/module-20' }, type: 'custom' },
    { id: '21', position: { x: 450, y: 2250 }, data: { label: '21. Reactive', status: 'locked', path: '/learn/module-21' }, type: 'custom' },
    { id: '22', position: { x: 650, y: 2250 }, data: { label: '22. GraphQL', status: 'locked', path: '/learn/module-22' }, type: 'custom' },
    { id: '23', position: { x: 250, y: 2400 }, data: { label: '23. JVM Internals', status: 'locked', path: '/learn/module-23' }, type: 'custom' },
    { id: '24', position: { x: 450, y: 2400 }, data: { label: '24. DB Locking', status: 'locked', path: '/learn/module-24' }, type: 'custom' },
    { id: '25', position: { x: 650, y: 2400 }, data: { label: '25. Performance', status: 'locked', path: '/learn/module-25' }, type: 'custom' },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e4-6', source: '4', target: '6', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e7-9', source: '7', target: '9', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e8-10', source: '8', target: '10', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e9-10', source: '9', target: '10', animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
    { id: 'e10-11', source: '10', target: '11', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
    { id: 'e11-12', source: '11', target: '12', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e11-13', source: '11', target: '13', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e12-14', source: '12', target: '14', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e13-14', source: '13', target: '14', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e14-15', source: '14', target: '15', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e14-16', source: '14', target: '16', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e15-17', source: '15', target: '17', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e16-17', source: '16', target: '17', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e17-18', source: '17', target: '18', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e18-19', source: '18', target: '19', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e19-20', source: '19', target: '20', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e20-21', source: '20', target: '21', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e21-22', source: '21', target: '22', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e20-23', source: '20', target: '23', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e23-24', source: '23', target: '24', style: { stroke: '#334155', strokeWidth: 2 } },
    { id: 'e24-25', source: '24', target: '25', style: { stroke: '#334155', strokeWidth: 2 } },
];

export const Roadmap: React.FC = () => {
    const navigate = useNavigate();
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        if (node.data.path && node.data.status !== 'locked') {
            navigate(node.data.path);
        }
    }, [navigate]);

    return (
        <div className="h-[calc(100vh-6rem)] relative bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden animate-in fade-in zoom-in-95 duration-700">
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h1 className="text-3xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                    Learning Roadmap
                </h1>
                <p className="text-slate-400 text-sm mt-1">Interactive path to mastery. Click unlocked nodes to start learning.</p>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                fitView
                className="bg-transparent"
                minZoom={0.5}
                maxZoom={1.5}
                defaultEdgeOptions={{ type: 'smoothstep' }}
                proOptions={{ hideAttribution: true }}
            >
                <Background variant={BackgroundVariant.Dots} gap={30} size={1} color="#334155" />
                <Controls className="bg-slate-800 border-white/10 fill-white" />
            </ReactFlow>
        </div>
    );
};
