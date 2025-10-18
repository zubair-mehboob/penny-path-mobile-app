import { usePost } from "@/src/shared/hooks/useApi";
import { useHeader } from "@/src/shared/providers/header-provider";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createTransaction } from "../api/transactions";
import { TransactionForm } from "../components/transaction-form";

export default function CreateTransactionScreen() {
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { setHeader } = useHeader();
  useFocusEffect(
    React.useCallback(() => {
      setHeader({
        title: "Create Transaction",
        goBack: true,
      });
    }, [])
  );
  const handleSubmit = (data: any) => {
    console.log("Creating:", data);
    onCreateTransaction.mutate(data);
    // call create mutation
  };
  const onCreateTransaction = usePost(createTransaction, {
    onSuccess: (res) => {
      console.log({ res }, "from api");
    },
  });

  return (
    <View style={styles.container}>
      <TransactionForm type="create" onSubmit={handleSubmit} />
    </View>
  );
}
