"use client";

import { useRouter } from 'next/navigation';

export default function Watch({ params }: { params: { id: string } }) {
    const router = useRouter();

    return (
        <div className="h-screen w-screen bg-black relative">
            {/* Back button */}
            <nav className="absolute top-0 left-0 w-full p-4 md:p-8 z-50 transition duration-300 flex items-center gap-4 bg-gradient-to-b from-black/80 to-transparent">
                <svg
                    onClick={() => router.back()}
                    className="w-8 h-8 md:w-12 md:h-12 text-white cursor-pointer hover:text-gray-300 transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                <h1 className="text-white text-lg md:text-2xl font-bold tracking-wider">Watching Movie {params.id}</h1>
            </nav>

            {/* Video Player */}
            <video
                className="w-full h-full object-contain focus:outline-none"
                autoPlay
                controls
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />
        </div>
    );
}
