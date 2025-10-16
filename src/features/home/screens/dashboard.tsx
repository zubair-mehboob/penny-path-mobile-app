// app/(protected)/index.tsx or dashboard.tsx
import React, { useState, useLayoutEffect, useRef, useCallback } from "react";
import { useNavigation } from "expo-router";

import { getHeaderConfig } from "@/src/shared/services/header.service";
import { View } from "react-native";
import { AppBottomSheet } from "@/src/shared/components/bottom-sheet";
import { useGet } from "@/src/shared/hooks/useApi";
import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { List } from "react-native-paper";
import { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import { PaperIconButton } from "@/src/shared/components/icon-button";
import { Text } from "react-native-paper";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const sheetRef = useRef<any>(null);
  const accounts = useGet<{ title: string }[]>(
    ["account-list"],
    ENDPOINTS.accounts.all(1)
  );

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
        handleComponent={() => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View />
            <Text>Switch Account</Text>
            <PaperIconButton
              icon="plus-circle"
              onPress={() => alert("add account")}
            />
          </View>
        )}
        ref={sheetRef}
        onClose={() => console.log("Sheet closed")}
        maxDynamicContentSize={400}
      >
        <BottomSheetFlashList
          data={accounts.data as []}
          renderItem={_renderAccounts}
          keyExtractor={(item: any, index: number) => String(item + index)}
          contentContainerStyle={{ paddingBottom: 60 }} // space for button
        />
      </AppBottomSheet>
    </>
  );
}
