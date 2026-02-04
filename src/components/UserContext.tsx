"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { getUserRole } from "@/lib/auth";

export type UserRole = "admin" | "user" | "super-admin";

interface UserContextType {
    role: UserRole;
    userName: string;
    token: string | null;
    switchRole: (role: UserRole) => void;
    login: (token: string, role: UserRole, name: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<UserRole>("user");
    const [userName, setUserName] = useState<string>("User");
    const [token, setToken] = useState<string | null>(null);

    React.useEffect(() => {
        const storedRole = localStorage.getItem("userRole") as UserRole;
        const storedName = localStorage.getItem("userName");
        const storedToken = localStorage.getItem("token");

        if (storedRole && (storedRole === "admin" || storedRole === "user" || storedRole === "super-admin")) {
            setRole(storedRole);
        }
        if (storedName) {
            setUserName(storedName);
        }
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const switchRole = (newRole: UserRole) => {
        setRole(newRole);
        localStorage.setItem("userRole", newRole);
    };

    const login = (token: string, newRole: UserRole, name: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", newRole);
        localStorage.setItem("userName", name);
        setRole(newRole);
        setUserName(name);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        setRole("user");
        setUserName("User");
        setToken(null);
    };

    return (
        <UserContext.Provider value={{ role, userName, token, switchRole, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
