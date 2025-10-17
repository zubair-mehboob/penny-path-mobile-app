// import { View } from "react-native";
// import { Drawer as PaperDrawer, useTheme } from "react-native-paper";
// import { useAuth } from "@/src/features/auth/context/AuthContex";
// import { useSegments } from "expo-router";
// import { MaterialCommunityIconName, PaperIcon } from "./icon";
// import { globalStyles } from "../styles/gloabl-styles";

// export function CustomDrawerContent(props: any) {
//   const { logout } = useAuth();
//   const segments = useSegments();
//   const routeName = segments[segments.length - 1];
//   const { colors } = useTheme();
//   const styles = globalStyles(colors);
//   const drawerItems: {
//     label: string;
//     route: string;
//     icon: MaterialCommunityIconName;
//   }[] = [
//     { label: "Dashboard", route: "index", icon: "view-dashboard" },
//     { label: "Expense", route: "expense", icon: "cash-100" },
//     { label: "Settings", route: "settings", icon: "application-settings" },
//   ];

//   return (
//     <View style={styles.primaryContainer}>
//       <PaperDrawer.Section>
//         {drawerItems.map((item) => (
//           <PaperDrawer.Item
//             key={item.route}
//             label={item.label}
//             active={routeName === item.route}
//             onPress={() => props.navigation.navigate(item.route)}
//             icon={() => <PaperIcon name={item.icon} size={20} />}
//           />
//         ))}
//       </PaperDrawer.Section>

//       <PaperDrawer.Section>
//         <PaperDrawer.Item
//           label="Logout"
//           onPress={logout}
//           // icon={() => <Icon name="LogOut" size={20} />}
//         />
//       </PaperDrawer.Section>
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
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

  // 👇 state to control collapsed / expanded drawer
  const [collapsed, setCollapsed] = useState(false);
  const drawerWidth = React.useRef(new Animated.Value(240)).current;

  const toggleDrawer = () => {
    setCollapsed((prev) => !prev);
    Animated.timing(drawerWidth, {
      toValue: collapsed ? 240 : 70,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

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
    <Animated.View
      style={[
        styles.primaryContainer,
        {
          width: drawerWidth,
          backgroundColor: colors.surface,
          paddingVertical: 10,
        },
      ]}
    >
      {/* Toggle Button */}
      <TouchableOpacity
        onPress={toggleDrawer}
        style={{
          alignSelf: collapsed ? "center" : "flex-end",
          margin: 10,
        }}
      >
        <PaperIcon name={collapsed ? "menu-open" : "menu"} size={24} />
      </TouchableOpacity>

      {/* Drawer Items */}
      <PaperDrawer.Section style={{ marginTop: 10 }}>
        {drawerItems.map((item) => (
          <TouchableOpacity
            key={item.route}
            onPress={() => props.navigation.navigate(item.route)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 10,
              backgroundColor:
                routeName === item.route
                  ? colors.primaryContainer
                  : "transparent",
              borderRadius: 8,
              marginHorizontal: 5,
            }}
          >
            <PaperIcon
              name={item.icon}
              size={22}
              color={
                routeName === item.route ? colors.primary : colors.onSurface
              }
            />
            {!collapsed && (
              <Animated.Text
                style={{
                  color: colors.onSurface,
                  marginLeft: 16,
                  fontSize: 14,
                }}
              >
                {item.label}
              </Animated.Text>
            )}
          </TouchableOpacity>
        ))}
      </PaperDrawer.Section>

      {/* Logout Button */}
      <PaperDrawer.Section style={{ marginTop: "auto" }}>
        <TouchableOpacity
          onPress={logout}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 10,
          }}
        >
          <PaperIcon name="logout" size={22} color={colors.error} />
          {!collapsed && (
            <Animated.Text style={{ color: colors.error, marginLeft: 16 }}>
              Logout
            </Animated.Text>
          )}
        </TouchableOpacity>
      </PaperDrawer.Section>
    </Animated.View>
  );
}
