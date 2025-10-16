// app/(protected)/index.tsx or dashboard.tsx
import React, { useState, useLayoutEffect, useRef, useCallback } from "react";
import { useNavigation } from "expo-router";

import { getHeaderConfig } from "@/src/shared/services/header.service";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { AppBottomSheet } from "@/src/shared/components/bottom-sheet";
import { useGet } from "@/src/shared/hooks/useApi";
import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { List } from "react-native-paper";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<any>(null);
  const accounts1 = useGet<{ title: string }[]>(
    ["account-list"],
    ENDPOINTS.accounts.all(1)
  );
  const accounts = {
    data: [
      { title: "1" },
      { title: "1" },
      { title: "1" },
      { title: "1" },
      { title: "1" },
      { title: "1" },
      { title: "1" },
      { title: "1" },
      { title: "1" },
      { title: "1" },
    ],
  };
  // Configure header
  useLayoutEffect(() => {
    const config = getHeaderConfig("index", {
      openSheet: () => sheetRef.current?.expand(),
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
  const _renderAccounts = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <List.Section>
          <List.Item
            title={item.title}
            right={(props) => <List.Icon {...props} icon="folder" />}
          />
        </List.Section>
      );
    },
    []
  );
  return (
    <>
      <Text>Welcome to the Dashboard!</Text>
      <AppBottomSheet
        ref={sheetRef}
        onClose={() => console.log("Sheet closed")}
        footerComponent={() => (
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#ddd",
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity>
              <List.Item
                title="Add Account"
                left={(props) => <List.Icon {...props} icon="folder" />}
              />
            </TouchableOpacity>
          </View>
        )}
      >
        <View style={{ flex: 1 }}>
          {/* Scrollable content */}
          <FlatList
            data={accounts1.data as []}
            renderItem={_renderAccounts}
            keyExtractor={(item, index) => String(index)}
            contentContainerStyle={{ paddingBottom: 60 }} // space for button
            style={{ flex: 1 }}
          />
        </View>
      </AppBottomSheet>
    </>
  );
}
