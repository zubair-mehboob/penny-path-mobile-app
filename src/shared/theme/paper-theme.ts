// src/themes/paperTheme.ts
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import lightTheme from "./light-theme.json";
import darkTheme from "./dark-them.json";
// Light Theme
export const customLightTheme = {
  ...MD3LightTheme,
  lightTheme,
};

// Dark Theme
export const customDarkTheme = {
  ...MD3DarkTheme,
  darkTheme,
};
