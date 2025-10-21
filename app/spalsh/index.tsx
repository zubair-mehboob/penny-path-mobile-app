import { useEffect } from "react";
import { useRouter, useRootNavigationState } from "expo-router";
import { storageService } from "@/src/shared/services/storage.service";
import { Text } from "react-native";
import { setRouter } from "@/src/shared/services/navigation.service";
import { useGetDefaultAccount } from "@/src/features/dashboard/hooks/useAccount";
export default function Splash() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    setRouter(router);

    const initApp = async () => {
      try {
        await storageService.init();
      } catch (e) {
        console.log(e, "this eror occured");
      }

      const storedUser = storageService.get("user");
      if (storedUser) {
        router.replace("/(protected)");
      } else {
        router.replace("/auth");
      }
    };

    initApp();
  }, [rootNavigationState?.key]);

  return <Text>Splash screen</Text>;
}
