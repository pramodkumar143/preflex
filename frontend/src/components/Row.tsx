"use client";

import { useEffect, useState, useRef } from "react";
import Link from 'next/link';

interface Movie {
    _id: string;
    title: string;
    thumbnailUrl: string;
}

interface RowProps {
    title: string;
    fetchUrl?: string; // Replace with an actual fetcher later if desired
}

const mockMovies: Movie[] = [
    { _id: '1', title: 'Movie 1', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg' },
    { _id: '2', title: 'Movie 2', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/1E5baNhKGimkM01sC2v5P3eivkH.jpg' },
    { _id: '3', title: 'Movie 3', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/w2nFc2Rsm93PDkvjY4LTn17ePO0.jpg' },
    { _id: '4', title: 'Movie 4', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg' },
    { _id: '5', title: 'Movie 5', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg' },
    { _id: '6', title: 'Movie 6', thumbnailUrl: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg' },
];

export default function Row({ title }: RowProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    useEffect(() => {
        // Here we would fetch data. Using mock data for UI visualization.
        setMovies(mockMovies);
    }, []);

    const handleClick = (direction: "left" | "right") => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="space-y-0.5 md:space-y-2 px-4 md:px-12 mt-4 md:mt-8 group">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
                {title}
            </h2>
            <div className="relative group md:-ml-2">
                <svg
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved && "hidden"}`}
                    onClick={() => handleClick("left")}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>

                <div
                    ref={rowRef}
                    className="flex items-center space-x-2 md:space-x-4 overflow-x-scroll scrollbar-hide no-scrollbar md:p-2 transition-all duration-300"
                >
                    {movies.map((movie) => (
                        <Link href={`/watch/${movie._id}`} key={movie._id} className="relative min-w-[160px] h-[90px] md:min-w-[280px] md:h-[155px] cursor-pointer transition duration-200 ease-out md:hover:scale-105 overflow-hidden rounded transform hover:z-50">
                            <img
                                src={movie.thumbnailUrl}
                                alt={movie.title}
                                className="object-cover md:rounded absolute top-0 left-0 w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition duration-200 flex items-center justify-center p-4">
                                <div className="text-white text-center">
                                    <p className="font-bold text-sm md:text-lg drop-shadow">{movie.title}</p>
                                    <button className="mt-2 bg-white text-black rounded-full p-2 hover:bg-white/80 transition shadow-lg">
                                        <svg className="w-4 h-4 md:w-6 md:h-6" fill="black" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <svg
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
                    onClick={() => handleClick("right")}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );
}
