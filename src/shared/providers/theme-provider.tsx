import React, { createContext, useState, useContext, ReactNode } from "react";
import { PaperProvider } from "react-native-paper";
import { customDarkTheme, customLightTheme } from "../theme/paper-theme";

const ThemeContext = createContext({ toggleTheme: () => {} });

export const usePaperTheme = () => useContext(ThemeContext);

export const PaperThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? customDarkTheme : customLightTheme;

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
