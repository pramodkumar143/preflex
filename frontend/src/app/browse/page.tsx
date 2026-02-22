"use client";

import Navbar from "@/components/Navbar";
import Row from "@/components/Row";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Browse() {
  return (
    <ProtectedRoute>
      <div className="relative min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <main className="relative h-[80vh] w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://image.tmdb.org/t/p/original/9yBVqNruk6Ykrwc32qrK2TIE5xw.jpg")' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent 80%" />
          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute bottom-[20%] left-4 md:left-14 flex flex-col gap-4 w-full md:w-[60%] lg:w-[40%] z-10 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-md">
              Mortal Kombat
            </h1>
            <p className="text-sm md:text-lg text-gray-200 drop-shadow">
              Washed-up MMA fighter Cole Young, unaware of his heritage, and hunted by Emperor Shang Tsung's best warrior, Sub-Zero, seeks out and trains with Earth's greatest champions as he prepares to stand against the enemies of Outworld in a high stakes battle for the universe.
            </p>
            <div className="flex gap-3 mt-4">
              <button className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2 md:py-3 rounded hover:bg-white/80 transition shadow-sm">
                <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>
              <button className="flex items-center gap-2 bg-gray-500/70 text-white font-semibold px-6 py-2 md:py-3 rounded hover:bg-gray-500/50 transition">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                More Info
              </button>
            </div>
          </div>
        </main>

        {/* Rows */}
        <section className="relative z-20 pb-20 -mt-10 px-4 md:px-12 space-y-2 md:space-y-6">
          <Row title="Trending Now" />
          <Row title="Top Rated" />
          <Row title="Action Movies" />
          <Row title="Comedies" />
          <Row title="Romance" />
        </section>
      </div>
    </ProtectedRoute>
  );
}
