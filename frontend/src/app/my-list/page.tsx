"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MyList() {
    const [list, setList] = useState<any[]>([]);

    useEffect(() => {
        // Mock My List
        setList([
            { _id: '1', title: 'Favorite Movie 1', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg' },
            { _id: '2', title: 'Favorite Movie 2', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/1E5baNhKGimkM01sC2v5P3eivkH.jpg' },
            { _id: '3', title: 'Favorite Movie 3', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/w2nFc2Rsm93PDkvjY4LTn17ePO0.jpg' },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-12">
            <Navbar />
            <h1 className="text-3xl font-bold mb-8 text-white">My List</h1>

            {list.length === 0 ? (
                <p className="text-gray-400">You haven't added any movies to your list yet.</p>
            ) : (
                <div className="flex flex-wrap gap-4 md:gap-6">
                    {list.map((movie) => (
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
                </div>
            )}
        </div>
    );
}
