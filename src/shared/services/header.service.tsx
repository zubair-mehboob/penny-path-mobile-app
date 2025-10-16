// src/shared/services/header-service.ts
import { ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";

export type HeaderAction = {
  key: string;
  element: ReactNode;
};

export type HeaderConfig = {
  title?: string;
  actions?: HeaderAction[];
  customHeader?: ReactNode;
};

export type RouteName = "index" | "expense" | "settings" | "(protected)";

type HeaderServiceParams = {
  openSheet?: () => void;
};

export const getHeaderConfig = (
  routeName: RouteName,
  params?: HeaderServiceParams
): HeaderConfig => {
  switch (routeName) {
    case "(protected)":
      return {
        title: "Dashboard",
        actions: [
          {
            key: "openSheet",
            element: <Text>Hello</Text>,
          },
        ],
      };

    case "expense":
      return {
        title: "Expenses",
        actions: [
          {
            key: "refresh",
            element: (
              <TouchableOpacity onPress={() => console.log("Refresh expenses")}>
                <Text style={{ color: "blue" }}>Refresh</Text>
              </TouchableOpacity>
            ),
          },
        ],
      };

    case "settings":
      return {
        title: "Settings",
        actions: [
          {
            key: "logout",
            element: (
              <TouchableOpacity onPress={() => console.log("Logout clicked")}>
                <Text style={{ color: "red" }}>Logout</Text>
              </TouchableOpacity>
            ),
          },
        ],
      };
    case "index":
      return {
        title: "Dashboard",
        actions: [
          {
            key: "openSheet",
            element: <Text>Hello</Text>,
          },
        ],
      };
    default:
      return { title: "App" };
  }
};
