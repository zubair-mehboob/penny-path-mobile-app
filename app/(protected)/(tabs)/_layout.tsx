import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="dashboard" options={{ title: "Home" }} />
      <Tabs.Screen name="expense" options={{ title: "Expenses" }} />
    </Tabs>
  );
}
