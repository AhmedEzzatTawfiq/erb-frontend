"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import {
  getProfile,
  refreshToken,
  logout as logoutApi,
} from "./api";
import { clearAccessToken, setAccessToken, setAuthExpieredHandler } from "@/lib/auth";
import { User } from "./types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetchUser = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);
    } catch (error) {
      console.error("Failed to refresh user profile", error);
    }
  };

  useEffect(() => {
    setAuthExpieredHandler(() => {
      clearAccessToken();
      setUser(null);
    });

    return () => {
      setAuthExpieredHandler(() => { });
    };
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        // 1. Get a new access token using the HttpOnly refresh cookie
        const response = await refreshToken();

        // 2. Store the new access token in memory
        setAccessToken(response.accessToken);

        // 3. Get the authenticated user's profile
        const profile = await getProfile();

        // 4. Store the user
        setUser(profile);

      } catch {
        clearAccessToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);


  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refetchUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};