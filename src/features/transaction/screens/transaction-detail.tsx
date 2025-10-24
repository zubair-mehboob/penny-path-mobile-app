import { useLocalSearchParams, useRouter } from "expo-router";

import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import { useHeader } from "@/src/shared/providers/header-provider";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import TransactionDetailComponent from "../components/transaction-detail";
import { useGetTransactionById } from "../hooks/useTransaction";

export default function EditTransactionScreen() {
  const { id } = useLocalSearchParams();
  const { setHeader } = useHeader();
  const router = useRouter();
  const { data, isLoading } = useGetTransactionById(id);
  useFocusEffect(
    React.useCallback(() => {
      setHeader({
        title: "Transaction Detail",
        goBack: true,
      });
    }, [])
  );
  const handleSubmit = (formData: any) => {
    console.log("Updating:", id, formData);
    // call update mutation
  };

  if (isLoading) return null;

  return (
    // <TransactionForm type="edit" defaultValues={data} onSubmit={handleSubmit} />
    <TransactionDetailComponent defaultValue={data as ITransaction} />
  );
}
