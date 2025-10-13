// tamagui.config.ts
import { tokens } from "@tamagui/themes";
import { createTamagui } from "tamagui";

const themes = {
  light: { background: "#fff", color: "#000", primary: "#007aff" },
  dark: { background: "#000", color: "#fff", primary: "#0a84ff" },
};

export const config = createTamagui({
  tokens,
  themes,
  defaultTheme: "light",
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
