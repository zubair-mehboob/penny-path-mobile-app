import { useGet } from "@/src/shared/hooks/useApi";
import React from "react";

import { FlatList, View } from "react-native";

import { useHeader } from "@/src/shared/providers/header-provider";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { List, Text, useTheme } from "react-native-paper";
import { fetchTransactions } from "../api/transactions";

export default function TransactionList() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { setHeader } = useHeader();
  useFocusEffect(
    React.useCallback(() => {
      setHeader({
        title: "Transactions",
        actions: [],
      });
    }, [])
  );

  // use it in your component
  const transactions = useGet(["transaction-list"], () => fetchTransactions(1));

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
        renderItem={({ item }: { item: { title: string } }) => (
          <List.Section style={styles.list}>
            <List.Item
              title={item.title}
              onPress={() => router.push("/transaction/create")}
            />
          </List.Section>
        )}
      />
    </View>
  );
}
