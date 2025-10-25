import React, { useEffect } from "react";

import { FlatList, View } from "react-native";

import { PaperIcon } from "@/src/shared/components/icon";
import { PaperIconButton } from "@/src/shared/components/icon-button";
import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import { useHeader } from "@/src/shared/providers/header-provider";
import { storageService } from "@/src/shared/services/storage.service";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { List, Text, useTheme } from "react-native-paper";
import { useGetTransactions } from "../hooks/useTransaction";

export default function TransactionList() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { setHeader } = useHeader();
  const accountId = storageService.get("accountId");
  useFocusEffect(
    React.useCallback(() => {
      setHeader({
        title: "Transactions",
        actions: [
          {
            key: "add",
            element: (
              <PaperIconButton
                icon="plus"
                onPress={() =>
                  router.push("/(protected)/(tabs)/transaction/create")
                }
              />
            ),
          },
        ],
      });
    }, [])
  );

  const transactions = useGetTransactions(accountId as number);
  useEffect(() => {
    transactions.refetch();
  }, [accountId]);

  if (transactions.isLoading)
    return (
      <View style={styles.container}>
        <Text>Loading.....</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions.data as []}
        renderItem={({ item }: { item: ITransaction }) => (
          <List.Section style={styles.list}>
            <List.Item
              title={`${item.amount} Rs.`}
              description={`${item.title} - ${item.date.toString()}`}
              onPress={() =>
                router.push(
                  `/(protected)/(tabs)/transaction/${item.transactionId}`
                )
              }
              right={() => {
                return (
                  <PaperIcon name="chevron-right" color={styles.list.color} />
                );
              }}
            />
          </List.Section>
        )}
      />
    </View>
  );
}
