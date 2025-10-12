import { createContext, useContext, useState } from "react";
type User = {
  name: string;
  email: string;
};
interface IAuthContext {
  user: any;
  token: string | null;
  login: (token: string, user?: User) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}
export const AuthContext = createContext<IAuthContext>({
  user: null,
  token: "",
  login: async (token: string, user?: User) => {},
  logout: async () => {},
  isLoading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const login = async (
    token: string,
    user: User = { name: "zubair", email: "a@y.com" }
  ) => {
    setUser(user);
    setToken(token);
  };
  const logout = async () => {
    setUser(null);
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ isLoading, login, logout, token, user }}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
