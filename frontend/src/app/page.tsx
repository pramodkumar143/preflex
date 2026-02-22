"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('netflix_user');

        if (user || storedUser) {
            router.push("/browse");
        } else {
            router.push("/login");
        }
    }, [user, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-netflix-black">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
        </div>
    );
}
