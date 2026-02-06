import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { X, Mail, Lock, Github, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [checkInbox, setCheckInbox] = useState(false);

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log(`AuthModal: Attempting ${isSignUp ? 'Sign Up' : 'Sign In'} for ${email}`);

        try {
            if (isSignUp) {
                const { error, data } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: window.location.origin,
                    },
                });
                if (error) {
                    console.error("AuthModal: Sign Up Error:", error);
                    throw error;
                }
                console.log("AuthModal: Sign Up Successful", data);
                console.log("AuthModal: Sign Up Successful", data);
                setCheckInbox(true);
            } else {
                const { error, data } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) {
                    console.error("AuthModal: Sign In Error:", error);
                    throw error;
                }
                console.log("AuthModal: Sign In Successful", data);
                onClose();
            }
        } catch (err: any) {
            console.error("AuthModal: Caught Error:", err);
            let message = err.message;
            if (message.includes("rate limit exceeded")) {
                message = "Too many attempts. Please check your spam folder or wait 1 hour.";
                // Automatically show the "Check Inbox" screen if likely they just need to verify
                if (isSignUp) setCheckInbox(true);
            } else if (message.includes("Email not confirmed")) {
                message = "Email not verified. Please check your inbox.";
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (checkInbox) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-xl p-8 text-center"
                >
                    <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Check your Inbox</h2>
                    <p className="text-slate-400 mb-6">
                        We've sent a confirmation link to <span className="text-white font-medium">{email}</span>.
                        <br />Please click the link to activate your account.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors mb-2"
                    >
                        Close
                    </button>
                    <button
                        onClick={() => {
                            setCheckInbox(false);
                            setIsSignUp(false);
                        }}
                        className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
                    >
                        I've verified my email
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-xl"
            >
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-800/20">
                    <h2 className="text-xl font-bold">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <button
                        className="w-full py-2.5 bg-white text-black font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
                        onClick={() => alert("GitHub OAuth needs to be configured in Supabase dashboard first!")}
                    >
                        <Github size={20} />
                        Continue with GitHub
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-400">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={16} className="animate-spin" />}
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-400">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"} {' '}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-blue-400 hover:underline"
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>

                    <div className="pt-2 border-t border-white/5 text-center">
                        <button
                            onClick={onClose}
                            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            Skip for now (Progress will save to this device only)
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
