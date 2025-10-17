import React from "react";
import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { useGet } from "@/src/shared/hooks/useApi";

import { View, FlatList } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useHeader } from "@/src/shared/providers/header-provider";
import { PaperIconButton } from "@/src/shared/components/icon-button";
import { useTheme, Text, List } from "react-native-paper";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";

export default function ExpenseList() {
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { setHeader } = useHeader();
  useFocusEffect(
    React.useCallback(() => {
      setHeader({
        title: "Expense",
        actions: [],
      });
    }, [])
  );
  const expenses = useGet<{ title: string }[]>(
    ["expense-list"],
    ENDPOINTS.expenses.all(1)
  );

  if (expenses.isLoading)
    return (
      <View style={styles.container}>
        <Text>Loading.....</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses.data as []}
        renderItem={({ item }: { item: { title: string } }) => (
          <List.Section style={styles.list}>
            <List.Item title={item.title} />
          </List.Section>
        )}
      />
    </View>
  );
}
