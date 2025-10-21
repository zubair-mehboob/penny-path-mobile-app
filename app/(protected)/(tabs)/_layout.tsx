import { PaperIcon } from "@/src/shared/components/icon";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
export default function TabLayout() {
  const { colors } = useTheme();
  const style = globalStyles(colors);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: style.bottomTab,
        tabBarActiveTintColor: colors.onPrimaryContainer,
        tabBarInactiveTintColor: colors.onSurfaceDisabled,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <PaperIcon
              name="view-dashboard"
              color={
                focused ? colors.onPrimaryContainer : colors.onSurfaceDisabled
              }
            />
          ),
          title: "Dashboard",
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <PaperIcon
              name="cash-check"
              color={
                focused ? colors.onPrimaryContainer : colors.onSurfaceDisabled
              }
            />
          ),
          title: "Transactions",
        }}
      />
    </Tabs>
  );
}
