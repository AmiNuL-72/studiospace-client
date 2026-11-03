"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "@/types";
import { authClient } from "@/lib/auth-client";
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

async function syncGoogleUserWithBackend(googleUser: {
  name: string;
  email: string;
  image?: string | null;
}): Promise<AuthUser | null> {
  try {
    const res = await axiosPublic.post("/auth/google-login", {
      name: googleUser.name,
      email: googleUser.email,
      photo: googleUser.image || "",
    });
    if (res.data?.success && res.data?.data) {
      const userData = res.data.data;

      if (userData.token && typeof window !== "undefined") {
        localStorage.setItem("token", userData.token);
      }
      const authUser: AuthUser = {
        id: userData._id || userData.id,
        name: userData.name,
        email: userData.email,
        image: userData.photo || googleUser.image || "",
      };
      if (typeof window !== "undefined") {
        localStorage.setItem("studiospace_user", JSON.stringify(authUser));
      }
      return authUser;
    }
  } catch (err) {
    console.error("syncGoogleUserWithBackend failed:", err);
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      try {

        const sessionRes = await authClient.getSession();
        if (sessionRes?.data?.user) {
          const u = sessionRes.data.user;

          const existingToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
          const savedUserRaw = typeof window !== "undefined" ? localStorage.getItem("studiospace_user") : null;
          const savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;

          if (existingToken && savedUser?.email === u.email) {
            setUser(savedUser);
            setLoading(false);
            return;
          }

          const authUser = await syncGoogleUserWithBackend({
            name: u.name,
            email: u.email,
            image: u.image,
          });

          if (authUser) {
            setUser(authUser);
            setLoading(false);
            return;
          }

          const fallbackUser: AuthUser = {
            id: u.id,
            name: u.name,
            email: u.email,
            image: u.image || "",
          };
          setUser(fallbackUser);
          if (typeof window !== "undefined") {
            localStorage.setItem("studiospace_user", JSON.stringify(fallbackUser));
          }
          setLoading(false);
          return;
        }

        const savedUserRaw = typeof window !== "undefined" ? localStorage.getItem("studiospace_user") : null;
        if (savedUserRaw) {
          try {
            setUser(JSON.parse(savedUserRaw));
          } catch {

          }
        }

        try {
          const res = await axiosSecure.get("/auth/me");
          if (res.data?.success && res.data?.data) {
            const userData = res.data.data;
            const authUser: AuthUser = {
              id: userData._id || userData.id,
              name: userData.name,
              email: userData.email,
              image: userData.photo || "",
            };
            setUser(authUser);
            if (typeof window !== "undefined") {
              localStorage.setItem("studiospace_user", JSON.stringify(authUser));
            }
          } else if (!savedUserRaw) {
            setUser(null);
          }
        } catch {

          if (!savedUserRaw) setUser(null);
        }
      } catch {
        const savedUserRaw = typeof window !== "undefined" ? localStorage.getItem("studiospace_user") : null;
        if (!savedUserRaw) setUser(null);
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

  const loginWithGoogle = async () => {
    try {

      const callbackURL = typeof window !== "undefined" ? window.location.origin : "/";
      await authClient.signIn.social({
        provider: "google",
        callbackURL,
      });

    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = errorResponse.response?.data?.message || errorResponse.message || "Google sign-in could not be completed";
      throw new Error(msg);
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch {

    }
    try {
      await axiosSecure.post("/auth/logout");
    } catch {

    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("studiospace_user");
    }
    setUser(null);
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
