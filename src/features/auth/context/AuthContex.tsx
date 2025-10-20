import { storageService } from "@/src/shared/services/storage.service";

import { router, useRootNavigationState } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
export type IUser = {
  name: string;
  email: string;
  userId: number;
};

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  login: (token: string, accountId: number, user: IUser) => void;
  logout: () => void;
  isLoading: boolean;
}
const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: false,
  token: null,
  login: (token: string, accountId: number, user?: IUser) => void {},
  logout: () => void {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const rootNavigationState = useRootNavigationState();
  const login = async (token: string, accountId: number, user: IUser) => {
    setUser(user);
    setToken(token);

    storageService.set("user", user);
    storageService.set("token", token);
    storageService.set("accountId", accountId);
    router.replace("/(protected)");
  };
  const logout = async () => {
    setUser(null);
    setToken(null);
    storageService.removeAll();
    router.replace("/auth");
  };
  const value = { login, logout, token, user, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
