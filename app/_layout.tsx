import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/src/features/auth/context/AuthContex";
import { SafeAreaView } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";
import { PortalProvider } from "@tamagui/portal";
import { config } from "@/tamagui.config";
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <PortalProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Slot />
            </SafeAreaView>
          </AuthProvider>
        </QueryClientProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}
