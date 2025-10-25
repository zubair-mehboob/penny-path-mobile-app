import { useHeader } from "@/src/shared/providers/header-provider";
import { storageService } from "@/src/shared/services/storage.service";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { TransactionForm } from "../components/transaction-form";
import {
  useCreateTransaction,
  useGetTransactionById,
} from "../hooks/useTransaction";
import { useLocalSearchParams } from "expo-router";

export default function EditTransactionScreen() {
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { setHeader } = useHeader();
  const accountId = storageService.get("accountId");
  useFocusEffect(
    React.useCallback(() => {
      setHeader({
        title: "Edit Transaction",
        goBack: true,
      });
    }, [])
  );
  const { id } = useLocalSearchParams();
  const handleSubmit = (data: any) => {
    console.log("Creating:", data);
    onCreateTransaction.mutate({ ...data, accountId });
    // call create mutation
  };
  const { data, isLoading } = useGetTransactionById(id);
  const onCreateTransaction = useCreateTransaction();

  return (
    <View style={styles.container}>
      <TransactionForm
        type="edit"
        onSubmit={handleSubmit}
        loading={onCreateTransaction.isPending}
        defaultValues={data}
      />
    </View>
  );
}
