/// <reference types="tamagui" />
import { AuthProvider } from "@/src/features/auth/context/AuthContex";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { ThemeProvider } from "../src/shared/providers/theme-provider";
const queryClient = new QueryClient();

export default function RootLayout() {
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
