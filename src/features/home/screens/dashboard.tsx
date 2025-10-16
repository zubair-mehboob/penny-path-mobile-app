// app/(protected)/index.tsx or dashboard.tsx
import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "expo-router";

import { getHeaderConfig } from "@/src/shared/services/header.service";
import { View, Text } from "react-native";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [sheetOpen, setSheetOpen] = useState(false);

  // Configure header
  useLayoutEffect(() => {
    const config = getHeaderConfig("index", {
      openSheet: () => setSheetOpen(true),
    });

    navigation.setOptions({
      title: config.title,
      headerRight: () => (
        <>
          {config.actions?.map((action) => (
            <React.Fragment key={action.key}>{action.element}</React.Fragment>
          ))}
        </>
      ),
    });
  }, [navigation]);

  return (
    <>
      <Text>Welcome to the Dashboard!</Text>
    </>
  );
}
