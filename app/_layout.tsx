import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../src/shared/providers/theme-provider";
import { AuthProvider } from "@/src/features/auth/context/AuthContex";
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
