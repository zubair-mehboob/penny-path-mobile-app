import { CustomDrawerContent } from "@/src/shared/components/drawer-content";
import { Drawer } from "expo-router/drawer";
export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{ headerTitle: "" }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="(tabs)" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
