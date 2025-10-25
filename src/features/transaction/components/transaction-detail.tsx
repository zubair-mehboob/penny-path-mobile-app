import { SplitTransactionDTO } from "@/src/shared/dtos/request/transaction.dto";
import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import { storageService } from "@/src/shared/services/storage.service";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Card, Switch, Text, useTheme } from "react-native-paper";
import {
  useCreateSplitTransaction,
  useUpdateTransaction,
} from "../hooks/useTransaction";
import SplitTransactionForm from "./split-transaction-form";
import { SplitTransactionsTable } from "./split-transaction-table";

type TransactionDetailProps = {
  defaultValue?: ITransaction;
};
export default function TransactionDetailComponent({
  defaultValue,
}: TransactionDetailProps) {
  const { colors } = useTheme();
  const globalStyle = globalStyles(colors);

  const transaction = defaultValue;

  const [isRecurring, setIsRecurring] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formType, setFormType] = useState<"create" | "edit">("create");
  const [selectedChild, setSelectedChild] = useState<ITransaction>();
  const accountId = storageService.get("accountId");
  // Open modal for create or edit
  const openModal = (type: "create" | "edit", child?: any) => {
    setFormType(type);
    if (type === "create") {
      setSelectedChild({
        title: "",
        description: "",
        amount: 0,
        date: new Date(),
      } as ITransaction);
    } else {
      setSelectedChild(child);
    }
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedChild(undefined);
  };
  const splitTransactionCreate = useCreateSplitTransaction();
  const updateTransaction = useUpdateTransaction(
    transaction?.transactionId as number
  );
  // Handle form submit
  const handleSubmit = (data: SplitTransactionDTO | ITransaction) => {
    if (formType === "create") {
      const newChild = {
        ...data,
        accountId,
        parentId: transaction?.transactionId,
      };

      splitTransactionCreate.mutate(newChild as SplitTransactionDTO);
    } else if (formType === "edit" && selectedChild) {
      updateTransaction.mutate({ ...data });
    }
    closeModal();
  };

  // Handle delete
  const handleDelete = (childId: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this split?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={{ ...styles.container, ...globalStyle.container }}>
      {/* Switch */}
      <View style={styles.switchRow}>
        <Text variant="titleMedium">Make it recurring</Text>
        <Switch value={isRecurring} onValueChange={setIsRecurring} />
      </View>

      {/* Transaction Details */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text variant="bodyMedium" style={styles.label}>
                Title:
              </Text>
              <Text>{transaction?.title}</Text>
            </View>

            <View style={styles.column}>
              <Text variant="bodyMedium" style={styles.label}>
                Amount:
              </Text>
              <Text>${transaction?.amount}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text variant="bodyMedium" style={styles.label}>
                Date:
              </Text>
              <Text>
                {transaction?.date &&
                  new Date(transaction.date).toLocaleDateString("en-US")}
              </Text>
            </View>

            <View style={styles.column}>
              <Text variant="bodyMedium" style={styles.label}>
                Description:
              </Text>
              <Text>{transaction?.description ?? "—"}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Split Transaction Button */}
      <Button
        mode="contained"
        onPress={() => openModal("create")}
        style={styles.splitButton}
      >
        Split Transaction
      </Button>

      {/* Child Transactions */}
      {transaction?.children && transaction.children.length > 0 && (
        <Card style={styles.tableCard}>
          <Card.Title title="Split Transactions" />
          <Card.Content>
            <SplitTransactionsTable
              childrenData={transaction.children}
              onEdit={(item: Partial<ITransaction>) => {
                openModal("edit", item);
              }}
              onDelete={handleDelete}
            />
          </Card.Content>
        </Card>
      )}

      <SplitTransactionForm
        setVisible={setModalVisible}
        visible={modalVisible}
        formType={formType}
        // accountId={accountId as number}
        // parentId={transaction?.transactionId as number}
        defaultValues={{ ...selectedChild } as ITransaction}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  tableCard: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  column: {
    flex: 1,
  },
  label: {
    fontWeight: "600",
    color: "#555",
  },
  splitButton: {
    marginTop: 10,
    borderRadius: 8,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
