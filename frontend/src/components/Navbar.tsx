"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-netflix-black' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'}`}>
            <div className="flex items-center justify-between px-4 py-3 md:px-12 md:py-4">
                {/* Left Side: Logo & Links */}
                <div className="flex items-center gap-8">
                    <Link href="/">
                        <h1 className="text-netflix-red text-2xl md:text-4xl font-bold uppercase tracking-wider cursor-pointer font-sans">
                            Preflex
                        </h1>
                    </Link>
                    <ul className="hidden md:flex gap-5 text-sm font-light text-gray-200">
                        <li className="font-medium text-white hover:text-gray-300 transition cursor-pointer">Home</li>
                        <li className="hover:text-gray-300 transition cursor-pointer">TV Shows</li>
                        <li className="hover:text-gray-300 transition cursor-pointer">Movies</li>
                        <li className="hover:text-gray-300 transition cursor-pointer">New & Popular</li>
                        <li className="hover:text-gray-300 transition cursor-pointer">My List</li>
                    </ul>
                </div>

                {/* Right Side: Search & Profile */}
                <div className="flex items-center gap-6 text-sm font-light text-white">
                    <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>

                    {user ? (
                        <>
                            <p className="hidden md:block cursor-pointer">Kids</p>
                            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                            </svg>

                            <div className="flex items-center gap-2 cursor-pointer relative group">
                                <div className="w-8 h-8 rounded bg-gray-600 overflow-hidden">
                                    {/* Placeholder Avatar */}
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" className="object-cover w-full h-full" />
                                </div>
                                {/* Dropdown indicator */}
                                <span className="text-xs transition group-hover:rotate-180">▼</span>

                                {/* Simple dropdown menu hover */}
                                <div className="absolute top-10 right-0 w-32 bg-netflix-black border border-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                                    <ul className="py-2 text-sm text-gray-300">
                                        <li className="px-4 py-2 hover:bg-gray-800 transition">Manage Profiles</li>
                                        <li className="px-4 py-2 hover:bg-gray-800 transition">Account</li>
                                        <li className="px-4 py-2 hover:bg-gray-800 transition">Help Center</li>
                                        <hr className="border-gray-800 my-1" />
                                        <li className="px-4 py-2 hover:bg-gray-800 transition cursor-pointer" onClick={logout}>Sign out</li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Link href="/login">
                            <button className="bg-netflix-red text-white px-4 py-1.5 rounded text-sm hover:bg-netflix-red-hover transition shadow-sm font-semibold">
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
