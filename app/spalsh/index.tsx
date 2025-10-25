import { setRouter } from "@/src/shared/services/navigation.service";
import { storageService } from "@/src/shared/services/storage.service";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "react-native-paper";
export default function Splash() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const { colors } = useTheme();
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
        router.replace("/(protected)/(tabs)");
      } else {
        router.replace("/auth");
      }
    };

    initApp();
  }, [rootNavigationState?.key]);

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[colors.primaryContainer, colors.primary]}
    ></LinearGradient>
  );
}
