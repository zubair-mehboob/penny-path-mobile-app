// src/providers/ThemeProvider.tsx

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TamaguiProvider, Theme } from "tamagui";
import { config } from "../../../tamagui.config";
import { storageService } from "../services/storage.service";

type ThemeType = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  // Load persisted theme from storage
  useEffect(() => {
    const theme = storageService.get("theme");
    setTheme(theme);
  }, []);

  // Toggle and save theme
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      storageService.set("theme", next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <TamaguiProvider config={config} defaultTheme={theme}>
        <Theme name={theme}>{children}</Theme>
      </TamaguiProvider>
    </ThemeContext.Provider>
  );
};
