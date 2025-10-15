import { CustomDrawerContent } from "@/src/shared/components/drawer-content";
import { Drawer } from "expo-router/drawer";
export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="(tabs)" />
      <Drawer.Screen name="settings" />
    </Drawer>
  );
}
