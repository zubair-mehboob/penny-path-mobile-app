import { useEffect, useState } from "react";
import { Slot, useRouter, useRootNavigationState } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../src/shared/providers/theme-provider";
import { AuthProvider } from "@/src/features/auth/context/AuthContex";
import { storageService } from "@/src/shared/services/storage.service";
import { Text } from "react-native";
import { setRouter } from "@/src/shared/services/navigation.service";

const queryClient = new QueryClient();

export default function RootLayout() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //console.log(rootNavigationState, ";see this before return");
    if (!rootNavigationState?.key) return;
    setRouter(router);

    const initApp = async () => {
      // Wait until the router is fully mounted
      try {
        await storageService.init();
      } catch (e) {
        console.log(e, "this eror occured");
      } finally {
        setLoading(false);
      }

      const storedUser = storageService.get("user");
      if (storedUser) {
        router.replace("/(protected)/dashboard");
      } else {
        router.replace("/auth/signin");
      }
    };

    initApp();
  }, [rootNavigationState?.key]);

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
