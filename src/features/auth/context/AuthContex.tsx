import { storageService } from "@/src/shared/services/storage.service";

import { router, useRootNavigationState } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
type User = {
  name: string;
  email: string;
  userId: number;
};

interface IAuthContext {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}
const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: false,
  token: null,
  login: (token: string, user?: User) => void {},
  logout: () => void {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const rootNavigationState = useRootNavigationState();
  const login = async (token: string, user: User) => {
    console.log({ user, token });
    setUser(user);
    setToken(token);

    storageService.set("user", user);
    storageService.set("token", token);
    const t = storageService.get("token");
    router.replace("/(protected)/dashboard");
  };
  const logout = async () => {
    setUser(null);
    setToken(null);
    storageService.removeAll();
    router.replace("/auth/signin");
  };
  const value = { login, logout, token, user, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
