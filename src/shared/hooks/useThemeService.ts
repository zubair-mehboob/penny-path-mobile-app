// src/theme/useThemeService.ts
import { useContext } from "react";
import { ThemeContext } from "../providers/theme-provider";

export const useThemeService = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeService must be used within ThemeProvider");
  }
  return context;
};
