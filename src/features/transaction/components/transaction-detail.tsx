import { PaperIconButton } from "@/src/shared/components/icon-button";
import { AppModal } from "@/src/shared/components/modal";
import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Text,
  Switch,
  Button,
  DataTable,
  Card,
  useTheme,
} from "react-native-paper";
import { TransactionForm } from "./transaction-form";
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "@/src/shared/dtos/request/transaction.dto";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { SplitTransactionsTable } from "./split-transaction-table";
type TransactionDetailProps = {
  defaultValue?: ITransaction;
};
export default function TransactionDetailComponent({
  defaultValue,
}: TransactionDetailProps) {
  const { colors } = useTheme();
  const globalStyle = globalStyles(colors);
  // Example transaction data

  const [transaction, setTransaction] = useState(defaultValue);

  const [isRecurring, setIsRecurring] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formType, setFormType] = useState<"create" | "edit">("create");
  const [selectedChild, setSelectedChild] = useState<ITransaction>();

  // Open modal for create or edit
  const openModal = (type: "create" | "edit", child?: any) => {
    setFormType(type);
    setSelectedChild(child);
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedChild(undefined);
  };

  // Handle form submit
  const handleSubmit = (
    data: CreateTransactionDTO | UpdateTransactionDTO | ITransaction
  ) => {
    if (formType === "create") {
      const newChild = {
        title: data.title,
        amount: data.amount,
      };
      console.log({ newChild, data });
      //   setTransaction((prev) => {
      //     if (!prev) return undefined;
      //     return {
      //       ...prev,
      //       children: [...prev.children, newChild],
      //     };
      //   });
    } else if (formType === "edit" && selectedChild) {
      console.log({ data }, "edit case");
      //   setTransaction((prev) => {
      //     if (!prev) return undefined;
      //     return {
      //       ...prev,
      //       children: prev.children.map((c) =>
      //         c.transactionId === selectedChild.transactionId
      //           ? { ...c, ...data }
      //           : c
      //       ),
      //     };
      //   });
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
          onPress: () =>
            setTransaction((prev) => {
              if (!prev) return undefined;
              return {
                ...prev,
                children: prev.children.filter(
                  (c) => c.transactionId !== childId
                ),
              };
            }),
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
              onEdit={(item: any) => {
                console.log({ item }, "edit");
                openModal("edit", item);
              }}
              onDelete={handleDelete}
            />
          </Card.Content>
        </Card>
      )}
      <AppModal
        visible={modalVisible}
        title={
          formType === "create"
            ? "Add Split Transaction"
            : "Edit Split Transaction"
        }
        onDismiss={closeModal}
        content={
          <TransactionForm
            type={formType}
            defaultValues={selectedChild}
            onSubmit={handleSubmit}
          />
        }
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
