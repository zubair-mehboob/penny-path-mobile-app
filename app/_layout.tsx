/// <reference types="tamagui" />
import { AuthProvider } from "@/src/features/auth/context/AuthContex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "../src/shared/providers/theme-provider";
const queryClient = new QueryClient();

export default function RootLayout() {
  const scheme = useColorScheme(); // 'light' or 'dark'
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
