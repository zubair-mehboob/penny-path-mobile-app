import { CustomDrawerContent } from "@/src/shared/components/drawer-content";
import { Drawer } from "expo-router/drawer";
export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="expense" options={{ title: "Expense" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
