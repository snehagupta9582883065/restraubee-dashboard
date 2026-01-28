"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { getUserRole } from "@/lib/auth";

export type UserRole = "admin" | "user" | "super-admin";

interface UserContextType {
    role: UserRole;
    userName: string;
    switchRole: (role: UserRole) => void;
    login: (token: string, role: UserRole, name: string) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRole] = useState<UserRole>("user");
    const [userName, setUserName] = useState<string>("User");

    React.useEffect(() => {
        const storedRole = localStorage.getItem("userRole") as UserRole;
        const storedName = localStorage.getItem("userName");

        if (storedRole && (storedRole === "admin" || storedRole === "user" || storedRole === "super-admin")) {
            setRole(storedRole);
        }
        if (storedName) {
            setUserName(storedName);
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
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        setRole("user");
        setUserName("User");
    };

    return (
        <UserContext.Provider value={{ role, userName, switchRole, login, logout }}>
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
