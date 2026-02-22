"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AdminDashboard() {
    const [formData, setFormData] = useState({
        title: '', description: '', genre: '', video: null as File | null, thumbnail: null as File | null
    });

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        alert("This would upload to our backend /api/upload and then create a Movie via /api/movies.");
    };

    return (
        <div className="min-h-screen bg-netflix-black pt-24 px-4 md:px-12 text-white pb-10">
            <Navbar />
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Content Upload</h1>

            <div className="max-w-2xl bg-gray-900 border border-gray-800 rounded p-6 md:p-8">
                <form onSubmit={handleUpload} className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 font-semibold">Movie Title</label>
                        <input
                            required
                            className="bg-black border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-white"
                            type="text"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 font-semibold">Description</label>
                        <textarea
                            required
                            className="bg-black border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-white"
                            rows={4}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 font-semibold">Genre</label>
                        <input
                            required
                            className="bg-black border border-gray-700 rounded px-4 py-2 focus:outline-none focus:border-white"
                            type="text"
                            value={formData.genre}
                            onChange={e => setFormData({ ...formData, genre: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-gray-400 font-semibold">Video File</label>
                            <input
                                required
                                className="bg-black border border-gray-700 rounded px-4 py-2 focus:outline-none"
                                type="file"
                                accept="video/*"
                                onChange={e => setFormData({ ...formData, video: e.target.files?.[0] || null })}
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-gray-400 font-semibold">Thumbnail Image</label>
                            <input
                                required
                                className="bg-black border border-gray-700 rounded px-4 py-2 focus:outline-none"
                                type="file"
                                accept="image/*"
                                onChange={e => setFormData({ ...formData, thumbnail: e.target.files?.[0] || null })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 bg-netflix-red text-white font-bold py-3 rounded hover:bg-netflix-red-hover transition shadow-sm"
                    >
                        Upload Content
                    </button>
                </form>
            </div>
        </div>
    );
}
