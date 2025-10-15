import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
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
  const login = async (token: string, user: User) => {
    setUser(user);
    setToken(token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await AsyncStorage.setItem("toekn", JSON.stringify(token));
    router.replace("/(protected)/(tabs)/dashboard");
  };
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("user");
    router.replace("/auth/signin");
  };
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        router.replace("/(protected)/(tabs)/dashboard");
      } else {
        router.replace("/auth/signin");
      }
    };
    checkAuth();
  }, []);
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
