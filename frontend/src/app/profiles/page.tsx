"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const mockProfiles = [
    { id: '1', name: 'Dad', avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
    { id: '2', name: 'Mom', avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
    { id: '3', name: 'Kids', avatar: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png', isKids: true },
];

export default function Profiles() {
    const { user, setProfile } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!mounted || !user) return null;

    const handleProfileSelect = (profile: any) => {
        setProfile(profile);
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center pt-20">
            <h1 className="text-3xl md:text-5xl text-white font-medium mb-10">Who's watching?</h1>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {mockProfiles.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => handleProfileSelect(p)}
                        className="group cursor-pointer flex flex-col items-center gap-4 transition-transform hover:scale-105"
                    >
                        <div className="w-24 h-24 md:w-36 md:h-36 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-colors duration-300 relative">
                            <img src={p.avatar} alt={p.name} className="object-cover w-full h-full" />
                        </div>
                        <p className="text-gray-400 text-lg md:text-xl group-hover:text-white transition-colors">{p.name}</p>
                    </div>
                ))}

                {/* Add Profile Button */}
                <div className="cursor-pointer flex flex-col items-center gap-4 group transition-transform hover:scale-105">
                    <div className="w-24 h-24 md:w-36 md:h-36 rounded border-2 border-transparent group-hover:border-white transition-colors duration-300 flex items-center justify-center group-hover:bg-gray-800 bg-transparent shrink-0">
                        <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                    </div>
                    <p className="text-gray-400 text-lg md:text-xl group-hover:text-white transition-colors">Add Profile</p>
                </div>
            </div>

            <button className="mt-20 border border-gray-500 text-gray-400 px-6 py-2 uppercase tracking-widest hover:border-white hover:text-white transition duration-300 text-sm md:text-base">
                Manage Profiles
            </button>
        </div>
    );
}
