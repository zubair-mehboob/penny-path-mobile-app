import { AuthProvider } from "@/src/features/auth/context/AuthContex";
import { HeaderProvider } from "@/src/shared/providers/header-provider";
import {
  customDarkTheme,
  customLightTheme,
} from "@/src/shared/theme/paper-theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

import { StatusBar, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // 'light' | 'dark' | null
  const theme = colorScheme === "dark" ? customDarkTheme : customLightTheme;
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.primaryContainer }}
          >
            <HeaderProvider>
              <Slot />
              <StatusBar
                backgroundColor={theme.colors.primaryContainer}
                barStyle={
                  colorScheme === "dark" ? "light-content" : "dark-content"
                }
                translucent={false}
              />
            </HeaderProvider>
          </SafeAreaView>
        </AuthProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
}
