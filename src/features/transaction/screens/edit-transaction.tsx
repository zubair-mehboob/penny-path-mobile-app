import { useHeader } from "@/src/shared/providers/header-provider";
import { storageService } from "@/src/shared/services/storage.service";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { TransactionForm } from "../components/transaction-form";
import {
  useCreateTransaction,
  useGetTransactionById,
  useUpdateTransaction,
} from "../hooks/useTransaction";
import { useLocalSearchParams } from "expo-router";
import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";

export default function EditTransactionScreen() {
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { setHeader } = useHeader();
  const accountId = storageService.get("accountId");
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetTransactionById(id);
  const onUpdateTransaction = useUpdateTransaction(
    data?.transactionId as number
  );
  useFocusEffect(
    React.useCallback(() => {
      setHeader({
        title: "Edit Transaction",
        goBack: true,
      });
    }, [])
  );
  const handleSubmit = (dataToSend: Partial<ITransaction>) => {
    const payload = {
      amount: dataToSend.amount,
      date: dataToSend.date,
      title: dataToSend.title,
      description: dataToSend.description,
      transactionId: data?.transactionId,
    };
    onUpdateTransaction.mutate(payload);
  };

  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  return (
    <View style={styles.container}>
      <TransactionForm
        type="edit"
        onSubmit={handleSubmit}
        loading={onUpdateTransaction.isPending}
        defaultValues={data}
      />
    </View>
  );
}
