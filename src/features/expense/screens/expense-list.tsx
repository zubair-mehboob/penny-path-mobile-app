import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { useGet } from "@/src/shared/hooks/useApi";

import { ChevronRight, Cloud, Moon, Star, Sun } from "@tamagui/lucide-icons";
import React, { useLayoutEffect } from "react";
import { FlatList } from "react-native-gesture-handler";

import { ListItem, Text } from "tamagui";

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
        <ListItem
          hoverTheme
          pressTheme
          title={item.title}
          subTitle="Subtitle"
          icon={Star}
          iconAfter={ChevronRight}
        />
      )}
    />
  );
}
