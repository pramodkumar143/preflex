"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import Link from 'next/link';

export default function Search() {
    const [query, setQuery] = useState('');

    // Mock search results
    const mockResults = query.length > 2 ? [
        { _id: '1', title: 'Action Movie 1', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg' },
        { _id: '4', title: 'Mortal Kombat', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg' },
    ] : [];

    return (
        <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-12">
            <Navbar />

            <div className="max-w-4xl mx-auto w-full mb-10">
                <div className="relative border border-gray-600 rounded flex items-center bg-gray-900/50">
                    <svg className="w-6 h-6 text-gray-400 absolute left-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for movies, TV shows, genres..."
                        className="w-full bg-transparent text-white focus:outline-none pl-14 pr-4 py-4 md:text-lg rounded"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    {query && (
                        <svg
                            className="w-6 h-6 text-gray-400 absolute right-4 cursor-pointer hover:text-white"
                            onClick={() => setQuery('')}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    )}
                </div>
            </div>

            {query.length > 0 && (
                <div>
                    <h2 className="text-xl md:text-2xl text-gray-400 mb-6">
                        Explore titles related to: <span className="text-white">"{query}"</span>
                    </h2>

                    <div className="flex flex-wrap gap-4 md:gap-6">
                        {mockResults.map((movie) => (
                            <Link href={`/watch/${movie._id}`} key={movie._id} className="relative w-[160px] h-[90px] md:w-[280px] md:h-[155px] cursor-pointer transition duration-200 ease-out md:hover:scale-105 rounded overflow-hidden">
                                <img
                                    src={movie.thumbnailUrl}
                                    alt={movie.title}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition duration-200 flex flex-col items-center justify-center p-4">
                                    <p className="font-bold text-sm md:text-lg text-white drop-shadow text-center">{movie.title}</p>
                                </div>
                            </Link>
                        ))}

                        {mockResults.length === 0 && query.length > 2 && (
                            <p className="text-gray-400 text-lg">No matches found for "{query}".</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
