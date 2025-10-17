import { CustomDrawerContent } from "@/src/shared/components/drawer-content";
import { CustomHeader } from "@/src/shared/components/header";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        header: ({ navigation }) => (
          <CustomHeader onMenuPress={() => navigation.toggleDrawer()} />
        ),
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
      <Drawer.Screen name="transaction" options={{ title: "Transaction" }} />
      <Drawer.Screen name="settings" options={{ title: "Settings" }} />
    </Drawer>
  );
}
