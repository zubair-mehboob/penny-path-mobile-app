// app/(protected)/index.tsx or dashboard.tsx
import React, { useRef, useCallback, useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { AppBottomSheet } from "@/src/shared/components/bottom-sheet";
import { useGet } from "@/src/shared/hooks/useApi";
import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { List, useTheme } from "react-native-paper";
import { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import { PaperIconButton } from "@/src/shared/components/icon-button";
import { Text } from "react-native-paper";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { useHeader } from "@/src/shared/providers/header-provider";
import { useFocusEffect } from "@react-navigation/native";
import { AppModal } from "@/src/shared/components/modal";
import { AccountDetailsModal } from "../components/add-account";

export default function DashboardScreen() {
  const [visible, setVisible] = useState(false);
  const [account, setAccount] = useState({
    openingBalance: 3000000.98,
    closingBalance: 0,
    isDefault: true,
    title: "Freelance",
    userId: 1,
  });
  const sheetRef = useRef<any>(null);
  const accounts = useGet<{ title: string }[]>(
    ["account-list"],
    ENDPOINTS.accounts.all(1)
  );
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { setHeader } = useHeader();
  const colorScheme = useColorScheme();

  useFocusEffect(
    React.useCallback(() => {
      setHeader({
        title: "Dashboard",
        actions: [
          {
            key: "add",
            element: (
              <PaperIconButton
                icon="account"
                onPress={() => sheetRef.current?.expand()}
                color={styles.headerIcon.color}
              />
            ),
          },
        ],
      });
    }, [colorScheme])
  );

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
      <View style={styles.container}>
        <Text>Welcome to the Dashboard!</Text>
      </View>
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
            <Text style={styles.bottomSheetTitle}>Switch Account</Text>
            <PaperIconButton
              icon="plus-circle"
              onPress={() => setVisible(true)}
              color={styles.bottomSheetIcon.color}
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
      {/* <AppModal
        visible={visible}
        title="Confirm Action"
        content={<Text>Are you sure you want to continue?</Text>}
        onDismiss={() => setVisible(false)}
        // actions={[
        //   { label: "Cancel", onPress: () => setVisible(false) },
        //   {
        //     label: "Confirm",
        //     onPress: () => console.log("Confirmed"),
        //     mode: "contained",
        //   },
        // ]}
      /> */}
      <AccountDetailsModal
        visible={visible}
        data={account}
        onDismiss={() => setVisible(false)}
        onSave={(updated) => {
          setAccount(updated);
          setVisible(false);
        }}
      />
    </>
  );
}
