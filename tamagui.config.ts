import { createTamagui } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { themes } from "./src/shared/theme/theme";

export const config = createTamagui({
  ...defaultConfig,
  themes,
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
