import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/src/features/auth/context/AuthContex";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import {
  customLightTheme,
  customDarkTheme,
} from "@/src/shared/theme/paper-theme";
import { PaperProvider } from "react-native-paper";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  const theme = colorScheme === "dark" ? customDarkTheme : customLightTheme;
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Slot />
          </SafeAreaView>
        </AuthProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
