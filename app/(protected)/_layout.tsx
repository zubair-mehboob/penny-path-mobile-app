import { CustomDrawerContent } from "@/src/shared/components/drawer-content";
import { getHeaderConfig } from "@/src/shared/services/header.service";
import { useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { View } from "react-native";

export default function DrawerLayout() {
  const segments = useSegments();
  const routeName = segments?.[segments.length - 1] as any; // current route
  const header = getHeaderConfig(routeName);
  return (
    <Drawer
      screenOptions={{
        headerRight: () => (
          <View style={{ flexDirection: "row", gap: 8 }}>
            {header.actions?.map((a) => (
              <View key={a.key}>{a.element}</View>
            ))}
          </View>
        ),
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="expense" options={{ title: "Expense" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
