"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "@/types";
import axiosSecure from "@/lib/axiosSecure";
import axiosPublic from "@/lib/axiosPublic";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, photoURL?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axiosSecure.get("/auth/me");
        if (res.data?.success && res.data?.data) {
          const userData = res.data.data;
          setUser({
            id: userData._id || userData.id,
            name: userData.name,
            email: userData.email,
            image: userData.photo || "",
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await axiosSecure.post("/auth/login", { email, password });
    if (res.data?.success && res.data?.data) {
      const userData = res.data.data;
      setUser({
        id: userData._id || userData.id,
        name: userData.name,
        email: userData.email,
        image: userData.photo || "",
      });
    } else {
      throw new Error(res.data?.message || "Login failed");
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    photoURL?: string
  ) => {
    const res = await axiosPublic.post("/auth/register", {
      name,
      email,
      password,
      photo: photoURL || "",
    });

    if (!res.data?.success) {
      throw new Error(res.data?.message || "Registration failed");
    }

    await login(email, password);
  };

  const loginWithGoogle = async () => {

    const defaultGoogleUser = {
      name: "Google Creator",
      email: "creator.google@studiospace.io",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    };

    const res = await axiosSecure.post("/auth/google-login", defaultGoogleUser);
    if (res.data?.success && res.data?.data) {
      const userData = res.data.data;
      setUser({
        id: userData._id || userData.id,
        name: userData.name,
        email: userData.email,
        image: userData.photo || "",
      });
    } else {
      throw new Error(res.data?.message || "Google sign-in failed");
    }
  };

  const logout = async () => {
    try {
      await axiosSecure.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
