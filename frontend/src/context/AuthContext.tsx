"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    user: any;
    profile: any;
    login: (userData: any) => void;
    logout: () => void;
    setProfile: (profileData: any) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    login: () => { },
    logout: () => { },
    setProfile: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfileState] = useState<any>(null);

    useEffect(() => {
        // Check local storage for user/profile on load
        const storedUser = localStorage.getItem('netflix_user');
        const storedProfile = localStorage.getItem('netflix_profile');

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedProfile) setProfileState(JSON.parse(storedProfile));
    }, []);

    const login = (userData: any) => {
        setUser(userData);
        localStorage.setItem('netflix_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setProfileState(null);
        localStorage.removeItem('netflix_user');
        localStorage.removeItem('netflix_profile');
    };

    const setProfile = (profileData: any) => {
        setProfileState(profileData);
        localStorage.setItem('netflix_profile', JSON.stringify(profileData));
    };

    return (
        <AuthContext.Provider value={{ user, profile, login, logout, setProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
