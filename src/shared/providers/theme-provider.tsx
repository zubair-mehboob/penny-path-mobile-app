// src/theme/ThemeProvider.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { TamaguiProvider, Theme } from "tamagui";
import { config } from "../../../tamagui.config";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("appTheme");
      if (saved === "dark" || saved === "light") {
        setTheme(saved);
      }
    })();
  }, []);

  const toggleTheme = async () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    await AsyncStorage.setItem("appTheme", nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <TamaguiProvider config={config} defaultTheme={theme}>
        <Theme name={theme}>{children}</Theme>
      </TamaguiProvider>
    </ThemeContext.Provider>
  );
};
