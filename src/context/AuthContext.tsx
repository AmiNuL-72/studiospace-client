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
  loginWithGoogle: (customUser?: { name: string; email: string; photo?: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const savedUser = typeof window !== "undefined" ? localStorage.getItem("studiospace_user") : null;

        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {

          }
        }

        if (token) {
          const res = await axiosSecure.get("/auth/me");
          if (res.data?.success && res.data?.data) {
            const userData = res.data.data;
            const authenticatedUser = {
              id: userData._id || userData.id,
              name: userData.name,
              email: userData.email,
              image: userData.photo || "",
            };
            setUser(authenticatedUser);
            if (typeof window !== "undefined") {
              localStorage.setItem("studiospace_user", JSON.stringify(authenticatedUser));
            }
          }
        } else {

          const res = await axiosSecure.get("/auth/me");
          if (res.data?.success && res.data?.data) {
            const userData = res.data.data;
            const authenticatedUser = {
              id: userData._id || userData.id,
              name: userData.name,
              email: userData.email,
              image: userData.photo || "",
            };
            setUser(authenticatedUser);
            if (typeof window !== "undefined") {
              localStorage.setItem("studiospace_user", JSON.stringify(authenticatedUser));
            }
          } else {
            setUser(null);
            if (typeof window !== "undefined") {
              localStorage.removeItem("studiospace_user");
            }
          }
        }
      } catch {

        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          localStorage.removeItem("studiospace_user");
        }
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axiosSecure.post("/auth/login", { email, password });
      if (res.data?.success && res.data?.data) {
        const userData = res.data.data;
        if (userData.token && typeof window !== "undefined") {
          localStorage.setItem("token", userData.token);
        }
        const loggedUser: AuthUser = {
          id: userData._id || userData.id,
          name: userData.name,
          email: userData.email,
          image: userData.photo || "",
        };
        setUser(loggedUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("studiospace_user", JSON.stringify(loggedUser));
        }
      } else {
        throw new Error(res.data?.message || "Login failed");
      }
    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = errorResponse.response?.data?.message || errorResponse.message || "Invalid email or password";
      throw new Error(msg);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    photoURL?: string
  ) => {
    try {
      const res = await axiosPublic.post("/auth/register", {
        name,
        email,
        password,
        photo: photoURL || "",
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Registration failed");
      }
    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = errorResponse.response?.data?.message || errorResponse.message || "Registration failed";
      throw new Error(msg);
    }
  };

  const loginWithGoogle = async (customUser?: { name: string; email: string; photo?: string }) => {
    try {
      const googlePayload = customUser || {
        name: "Google Creator",
        email: "creator.google@studiospace.io",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
      };

      const res = await axiosSecure.post("/auth/google-login", googlePayload);
      if (res.data?.success && res.data?.data) {
        const userData = res.data.data;
        if (userData.token && typeof window !== "undefined") {
          localStorage.setItem("token", userData.token);
        }
        const loggedUser: AuthUser = {
          id: userData._id || userData.id,
          name: userData.name,
          email: userData.email,
          image: userData.photo || "",
        };
        setUser(loggedUser);
        if (typeof window !== "undefined") {
          localStorage.setItem("studiospace_user", JSON.stringify(loggedUser));
        }
      } else {
        throw new Error(res.data?.message || "Google sign-in failed");
      }
    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = errorResponse.response?.data?.message || errorResponse.message || "Google sign-in failed";
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      await axiosSecure.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("studiospace_user");
      }
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
