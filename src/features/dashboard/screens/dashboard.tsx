// app/(protected)/index.tsx or dashboard.tsx
import React, { useRef, useCallback, useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { AppBottomSheet } from "@/src/shared/components/bottom-sheet";
import { useGet } from "@/src/shared/hooks/useApi";
import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { List, RadioButton, useTheme } from "react-native-paper";
import { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import { PaperIconButton } from "@/src/shared/components/icon-button";
import { Text } from "react-native-paper";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { useHeader } from "@/src/shared/providers/header-provider";
import { useFocusEffect } from "@react-navigation/native";
import { AppModal } from "@/src/shared/components/modal";
import { AccountDetailsModal } from "../components/add-account";
import { fetchAccounts } from "../api/account";
import { IAccount } from "@/src/shared/dtos/response/account.dto";

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
  const accounts = useGet<IAccount[]>(["account-list"], () => fetchAccounts(1));
  console.log({ accounts });
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
    ({ item, index }: { item: IAccount; index: number }) => {
      return (
        <List.Section>
          <List.Item
            key={item.userId}
            title={item.title}
            //description={item.description}
            left={() => (
              <RadioButton
                value={item.userId.toString()}
                // status={selected === item.id ? "checked" : "unchecked"}
                onPress={() => null}
                color={colors.primary}
              />
            )}
            right={() => (
              <View style={{ flexDirection: "row" }}>
                <PaperIconButton icon="pencil" size={20} onPress={() => null} />
                <PaperIconButton icon="delete" size={20} onPress={() => null} />
              </View>
            )}
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
