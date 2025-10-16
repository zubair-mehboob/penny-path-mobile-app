// import { useAuth } from "@/src/features/auth/context/AuthContex";
// import {
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from "@react-navigation/drawer";

// export function CustomDrawerContent(props: any) {
//   const { logout } = useAuth();

//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />

//       {/* Custom Logout button */}
//       <DrawerItem label="Logout" onPress={logout} />
//     </DrawerContentScrollView>
//   );
// }
import { View } from "react-native";
import { Drawer as PaperDrawer, useTheme } from "react-native-paper";
import { useAuth } from "@/src/features/auth/context/AuthContex";
import { useSegments } from "expo-router";
import { MaterialCommunityIconName, PaperIcon } from "./icon";
import { PaperIconButton } from "./icon-button";

export function CustomDrawerContent(props: any) {
  const { logout } = useAuth();
  const segments = useSegments();
  const routeName = segments[segments.length - 1];
  const { colors } = useTheme();

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
    <View style={{ flex: 1, backgroundColor: colors.onPrimary }}>
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
