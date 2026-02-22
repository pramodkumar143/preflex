"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Simple check to ensure we wait for AuthContext to load from localStorage
        const storedUser = localStorage.getItem('netflix_user');

        if (!user && !storedUser) {
            router.push("/login");
        } else {
            setIsChecking(false);
        }
    }, [user, router]);

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-netflix-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
            </div>
        );
    }

    return <>{children}</>;
}
