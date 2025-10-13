/// <reference types="tamagui" />
import { AuthProvider } from "@/src/features/auth/context/AuthContex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { config } from "../tamagui.config";
const queryClient = new QueryClient();

export default function RootLayout() {
  const scheme = useColorScheme(); // 'light' or 'dark'
  return (
    <TamaguiProvider config={config} defaultTheme={scheme ?? "light"}>
      <Theme name={scheme ?? "light"}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </QueryClientProvider>
      </Theme>
    </TamaguiProvider>
  );
}
