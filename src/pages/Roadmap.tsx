import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, Node, Edge, BackgroundVariant, useNodesState, useEdgesState, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';

// Custom Node Component to look premium
const CustomNode = ({ data }: { data: { label: string, status: 'done' | 'current' | 'locked' } }) => {
    const isDone = data.status === 'done';
    const isCurrent = data.status === 'current';

    return (
        <div className={`px-4 py-2 rounded-xl shadow-lg border min-w-[150px] text-center transition-all ${isDone ? 'bg-green-900/50 border-green-500/50 text-green-200' :
                isCurrent ? 'bg-blue-600 border-blue-400 text-white ring-2 ring-blue-500/50' :
                    'bg-slate-900 border-slate-700 text-slate-500'
            }`}>
            <div className="font-bold text-sm">{data.label}</div>
            <div className="text-[10px] uppercase tracking-wider mt-1 opacity-70">
                {isDone ? 'Completed' : isCurrent ? 'In Progress' : 'Locked'}
            </div>
        </div>
    );
};

const initialNodes: Node[] = [
    { id: '1', position: { x: 250, y: 0 }, data: { label: 'Introduction', status: 'done' }, type: 'custom' },
    { id: '2', position: { x: 250, y: 100 }, data: { label: 'Variables', status: 'done' }, type: 'custom' },
    { id: '3', position: { x: 100, y: 200 }, data: { label: 'Control Flow', status: 'current' }, type: 'custom' },
    { id: '4', position: { x: 400, y: 200 }, data: { label: 'Arrays', status: 'locked' }, type: 'custom' },
    { id: '5', position: { x: 250, y: 300 }, data: { label: 'OOP Basics', status: 'locked' }, type: 'custom' },
    { id: '6', position: { x: 250, y: 400 }, data: { label: 'Collections', status: 'locked' }, type: 'custom' },
    { id: '7', position: { x: 100, y: 500 }, data: { label: 'Exceptions', status: 'locked' }, type: 'custom' },
    { id: '8', position: { x: 400, y: 500 }, data: { label: 'File I/O', status: 'locked' }, type: 'custom' },
    { id: '9', position: { x: 250, y: 600 }, data: { label: 'Advanced Java', status: 'locked' }, type: 'custom' },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#3b82f6' } },
    { id: 'e2-4', source: '2', target: '4', style: { stroke: '#334155' } },
    { id: 'e3-5', source: '3', target: '5', style: { stroke: '#334155' } },
    { id: 'e4-5', source: '4', target: '5', style: { stroke: '#334155' } },
    { id: 'e5-6', source: '5', target: '6', style: { stroke: '#334155' } },
    { id: 'e6-7', source: '6', target: '7', style: { stroke: '#334155' } },
    { id: 'e6-8', source: '6', target: '8', style: { stroke: '#334155' } },
    { id: 'e7-9', source: '7', target: '9', style: { stroke: '#334155' } },
    { id: 'e8-9', source: '8', target: '9', style: { stroke: '#334155' } },
];

export const Roadmap: React.FC = () => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

    return (
        <div className="h-[calc(100vh-6rem)] relative bg-slate-950/50 rounded-xl border border-white/5 overflow-hidden animate-in fade-in zoom-in-95 duration-700">
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h1 className="text-2xl font-bold text-white">Learning Roadmap</h1>
                <p className="text-slate-400 text-sm">Follow the path to mastery.</p>
            </div>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                className="bg-slate-900"
                minZoom={0.5}
                maxZoom={1.5}
                proOptions={{ hideAttribution: true }}
            >
                <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#334155" />
                <Controls className="bg-slate-800 border-white/10 fill-white" />
            </ReactFlow>
        </div>
    );
};
