import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { DataTable, IconButton, Text } from "react-native-paper";

type SplitTransaction = {
  transactionId: number;
  title: string;
  amount: number;
};

type SplitTransactionsTableProps = {
  childrenData: SplitTransaction[];
  onEdit: (item: SplitTransaction) => void;
  onDelete: (childId: number) => void;
};

export const SplitTransactionsTable: React.FC<SplitTransactionsTableProps> = ({
  childrenData,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      <DataTable>
        {/* Table Header */}
        <DataTable.Header>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
          <DataTable.Title style={{ justifyContent: "center" }}>
            Actions
          </DataTable.Title>
        </DataTable.Header>

        {/* Scrollable Rows */}
        <FlatList
          data={childrenData}
          keyExtractor={(item) => item.transactionId.toString()}
          style={{ maxHeight: 250 }} // 👈 only table body scrolls
          nestedScrollEnabled
          renderItem={({ item }) => (
            <DataTable.Row>
              <DataTable.Cell>{item.title}</DataTable.Cell>
              <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
              <DataTable.Cell style={styles.actionsCell}>
                <IconButton
                  icon="pencil"
                  size={18}
                  onPress={() => onEdit(item)}
                />
                <IconButton
                  icon="delete"
                  size={18}
                  onPress={() => onDelete(item.transactionId)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text>No split transactions</Text>
            </View>
          }
        />
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  actionsCell: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center",
  },
});
