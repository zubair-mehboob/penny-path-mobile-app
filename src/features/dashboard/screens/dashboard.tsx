// app/(protected)/index.tsx or dashboard.tsx
import { AppBottomSheet } from "@/src/shared/components/bottom-sheet";
import { PaperIconButton } from "@/src/shared/components/icon-button";
import { IAccount } from "@/src/shared/dtos/response/account.dto";
import { useHeader } from "@/src/shared/providers/header-provider";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { BottomSheetFlashList } from "@gorhom/bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { useColorScheme, View } from "react-native";
import { Card, List, RadioButton, Text, useTheme } from "react-native-paper";
import { AccountDetailsModal } from "../components/add-account";
import { useGetAccounts, useSetDefaultAccount } from "../hooks/useAccount";
import MonthlySpendBarChart from "../components/bar-chart";
import SpendingCards from "../components/spending-card";

export default function DashboardScreen() {
  const [visible, setVisible] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(0);
  const [account, setAccount] = useState({
    balance: 3000000.98,
    isDefault: true,
    title: "Freelance",
    userId: 1,
  });
  const sheetRef = useRef<any>(null);
  const accounts = useGetAccounts();
  const setDefaultAccount = useSetDefaultAccount();

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
      console.log(index + "---------", { item }, "account item\n");
      return (
        <List.Section>
          <List.Item
            key={item.userId}
            title={item.title}
            //description={item.description}
            left={() => (
              <RadioButton
                value={item.userId.toString()}
                status={item.isDefault ? "checked" : "unchecked"}
                onPress={() => {
                  setDefaultAccount.mutate(item.accountId);
                }}
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
        <View style={{ alignSelf: "center", flexDirection: "row", gap: 10 }}>
          <SpendingCards total={10000} spent={4000} />
        </View>
        <MonthlySpendBarChart />
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
