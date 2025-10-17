import { View } from "react-native";
import { Drawer as PaperDrawer, useTheme } from "react-native-paper";
import { useAuth } from "@/src/features/auth/context/AuthContex";
import { useSegments } from "expo-router";
import { MaterialCommunityIconName, PaperIcon } from "./icon";
import { globalStyles } from "../styles/gloabl-styles";

export function CustomDrawerContent(props: any) {
  const { logout } = useAuth();
  const segments = useSegments();
  const routeName = segments[segments.length - 1];
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const drawerItems: {
    label: string;
    route: string;
    icon: MaterialCommunityIconName;
  }[] = [
    { label: "Dashboard", route: "index", icon: "view-dashboard" },
    { label: "Expense", route: "expense", icon: "cash-100" },
    { label: "Settings", route: "settings", icon: "application-settings" },
  ];

  return (
    <View style={styles.primaryContainer}>
      <PaperDrawer.Section>
        {drawerItems.map((item) => (
          <PaperDrawer.Item
            key={item.route}
            label={item.label}
            active={routeName === item.route}
            onPress={() => props.navigation.navigate(item.route)}
            icon={() => <PaperIcon name={item.icon} size={20} />}
          />
        ))}
      </PaperDrawer.Section>

      <PaperDrawer.Section>
        <PaperDrawer.Item
          label="Logout"
          onPress={logout}
          // icon={() => <Icon name="LogOut" size={20} />}
        />
      </PaperDrawer.Section>
    </View>
  );
}
