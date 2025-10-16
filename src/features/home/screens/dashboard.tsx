// app/(protected)/index.tsx or dashboard.tsx
import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import { Button, Text } from "tamagui";
import { ReusableSheet } from "@/src/shared/components/bottom-sheet";
import { getHeaderConfig } from "@/src/shared/services/header.service";
import { View } from "react-native";

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

      <ReusableSheet open={sheetOpen} onOpenChange={setSheetOpen} modal={true}>
        <View style={{ backgroundColor: "red", flex: 1 }}>
          <Text>Hello from the sheet 👋</Text>
        </View>
      </ReusableSheet>
    </>
  );
}
