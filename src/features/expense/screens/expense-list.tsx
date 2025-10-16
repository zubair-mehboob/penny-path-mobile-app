import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { useGet } from "@/src/shared/hooks/useApi";

import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native-gesture-handler";

import { Text } from "react-native";

export default function ExpenseList() {
  const res = useGet<{ title: string }[]>(
    ["expense-list"],
    ENDPOINTS.expenses.all(1)
  );

  if (res.isLoading) return <Text>Loading.....</Text>;

  return (
    <FlatList
      data={res.data as []}
      renderItem={({ item }: { item: { title: string } }) => (
        <Text>{item.title}</Text>
      )}
    />
  );
}
