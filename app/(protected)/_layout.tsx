import { Drawer } from "expo-router/drawer";

export default function DraweLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="(tabs)" />
      <Drawer.Screen name="settings" />
    </Drawer>
  );
}
