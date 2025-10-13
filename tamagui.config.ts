// tamagui.config.ts
import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

// 👇 You can override any tokens, themes, etc.
export const config = createTamagui({
  ...defaultConfig,
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      background: "#ffffff",
      color: "#000000",
      primary: "#007bff",
    },
    dark: {
      ...defaultConfig.themes.dark,
      background: "#000000",
      color: "#ffffff",
      primary: "#007bff",
    },
  },
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
