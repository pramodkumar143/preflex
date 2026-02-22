"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isSignIn ? '/api/auth/login' : '/api/auth/register';
            const payload = isSignIn ? { email, password } : { username, email, password };

            const res = await fetch(`/api${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (res.ok) {
                if (isSignIn) {
                    login(data);
                    router.push('/browse');
                } else {
                    // Registration successful: switch to sign in view
                    setIsSignIn(true);
                    // Optional: clear password field so they type it again
                    setPassword('');
                    alert("Account created successfully! Please sign in.");
                }
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('Failed to connect to the server. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black/60 bg-blend-overlay bg-cover bg-center relative" style={{ backgroundImage: 'url("https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/US-en-20240226-popsignuptwoweeks-perspective_alpha_website_medium.jpg")' }}>
            <div className="absolute top-4 left-4 md:left-12">
                <h1 className="text-netflix-red text-4xl font-bold uppercase tracking-wider">Preflex</h1>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-12 md:p-16 rounded mb-20 w-full max-w-md flex flex-col gap-6 z-10 animate-fadeIn border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <h2 className="text-3xl font-bold text-white mb-2">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
                {error && <div className="bg-red-500/80 backdrop-blur-sm text-white p-3 rounded text-sm border border-red-500/50">{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {!isSignIn && (
                        <input
                            type="text"
                            placeholder="Username"
                            className="bg-black/40 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/10 backdrop-blur-sm placeholder-gray-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email or phone number"
                        className="bg-black/40 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/10 backdrop-blur-sm placeholder-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-black/40 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/10 backdrop-blur-sm placeholder-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading} className="bg-netflix-red/90 hover:bg-netflix-red backdrop-blur-sm text-white font-semibold py-3 rounded mt-4 transition shadow-lg disabled:opacity-50 flex items-center justify-center border border-netflix-red/50">
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : isSignIn ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="flex justify-between text-sm text-gray-300 -mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="accent-gray-400 bg-white/20 rounded" /> Remember me
                    </label>
                    <a href="#" className="hover:text-white transition">Need help?</a>
                </div>

                <div className="text-gray-300 mt-8">
                    {isSignIn ? 'New to Preflex? ' : 'Already have an account? '}
                    <button onClick={() => setIsSignIn(!isSignIn)} className="text-white hover:underline cursor-pointer transition font-medium">
                        {isSignIn ? 'Sign up now.' : 'Sign in.'}
                    </button>
                </div>

                <p className="text-xs text-gray-400 mt-2">
                    This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="text-blue-400 hover:text-blue-300 transition">Learn more.</a>
                </p>
            </div>
        </div>
    );
}
