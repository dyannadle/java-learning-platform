import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileJson, CheckSquare, Square } from 'lucide-react';

interface Field {
    name: string;
    selected: boolean;
}

export const GraphExplorerVis: React.FC = () => {
    const [fields, setFields] = useState<Field[]>([
        { name: 'id', selected: true },
        { name: 'name', selected: true },
        { name: 'email', selected: false },
        { name: 'posts', selected: false },
        { name: 'friends', selected: false },
    ]);

    const toggleField = (index: number) => {
        setFields(prev => prev.map((f, i) => i === index ? { ...f, selected: !f.selected } : f));
    };

    const getResponse = () => {
        const response: any = { data: { user: {} } };
        if (fields.find(f => f.name === 'id' && f.selected)) response.data.user.id = "u_123";
        if (fields.find(f => f.name === 'name' && f.selected)) response.data.user.name = "John Doe";
        if (fields.find(f => f.name === 'email' && f.selected)) response.data.user.email = "john@example.com";
        if (fields.find(f => f.name === 'posts' && f.selected)) response.data.user.posts = [{ id: 1, title: "Hello" }];
        if (fields.find(f => f.name === 'friends' && f.selected)) response.data.user.friends = ["Jane", "Bob"];
        return JSON.stringify(response, null, 2);
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-4xl mx-auto text-white flex flex-col md:flex-row gap-6">

            {/* Query Builder (Client) */}
            <div className="flex-1 bg-slate-800 p-4 rounded-lg border border-slate-600">
                <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <CheckSquare size={16} /> CLIENT: Build Query
                </h3>
                <div className="font-mono text-sm bg-slate-950 p-4 rounded border border-white/5 h-64 overflow-y-auto">
                    <span className="text-purple-400">query</span> {'{'}
                    <div className="pl-4">
                        <span className="text-yellow-400">user</span>(id: "123") {'{'}
                        <div className="pl-4 flex flex-col gap-1 mt-2 mb-2">
                            {fields.map((f, i) => (
                                <div
                                    key={f.name}
                                    onClick={() => toggleField(i)}
                                    className={`cursor-pointer flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-800 ${f.selected ? 'text-white' : 'text-slate-600'}`}
                                >
                                    {f.selected ? <CheckSquare size={12} className="text-green-500" /> : <Square size={12} />}
                                    {f.name}
                                </div>
                            ))}
                        </div>
                        {'}'}
                    </div>
                    {'}'}
                </div>
            </div>

            {/* Network / Graph */}
            <div className="flex flex-col justify-center items-center gap-2">
                <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ArrowRight className="text-slate-500" />
                </motion.div>
                <div className="bg-pink-600 text-[10px] font-bold px-2 py-1 rounded">POST /graphql</div>
            </div>

            {/* Response (Server) */}
            <div className="flex-1 bg-slate-800 p-4 rounded-lg border border-slate-600">
                <h3 className="text-sm font-bold text-green-400 mb-4 flex items-center gap-2">
                    <FileJson size={16} /> SERVER: Response
                </h3>
                <div className="font-mono text-sm bg-slate-950 p-4 rounded border border-white/5 h-64 overflow-y-auto text-green-300 whitespace-pre">
                    {getResponse()}
                </div>
            </div>

        </div>
    );
};
