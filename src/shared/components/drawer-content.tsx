import { useAuthContext } from "@/src/features/auth/context/AuthContex";
import { MaterialCommunityIcons as PaperIcon } from "@expo/vector-icons";
import { useSegments } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Drawer as PaperDrawer, Text, useTheme } from "react-native-paper";
import { globalStyles } from "../styles/gloabl-styles";

export function CustomDrawerContent(props: any) {
  const { logout } = useAuthContext();
  const segments = useSegments();
  const routeName = segments[segments.length - 1];
  const { colors } = useTheme();
  const styles = globalStyles(colors);

  const drawerItems: {
    label: string;
    route: string;
    icon: keyof typeof PaperIcon.glyphMap;
  }[] = [
    { label: "Dashboard", route: "index", icon: "view-dashboard" },
    { label: "Transactions", route: "transaction", icon: "cash-100" },
    { label: "Settings", route: "settings", icon: "application-settings" },
  ];

  return (
    <View style={styles.drawer}>
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
            <Text
              style={{
                color: colors.onSurface,
                marginLeft: 16,
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </PaperDrawer.Section>

      {/* Logout Button (Fixed at Bottom) */}
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <PaperDrawer.Section>
          <TouchableOpacity
            onPress={logout}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 10,
              marginHorizontal: 5,
              borderRadius: 8,
            }}
          >
            <PaperIcon name="logout" size={22} color={colors.error} />
            <Text
              style={{
                color: colors.error,
                marginLeft: 16,
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </PaperDrawer.Section>
      </View>
    </View>
  );
}
