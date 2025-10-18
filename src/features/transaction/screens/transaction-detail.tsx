import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

import { getTransactionById } from "../api/transactions";
import { TransactionForm } from "../components/transaction-form";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { useHeader } from "@/src/shared/providers/header-provider";
import { PaperIconButton } from "@/src/shared/components/icon-button";
import { tr } from "zod/v4/locales";
import TransactionDetailComponent from "../components/transaction-detail";

export default function EditTransactionScreen() {
  const { id } = useLocalSearchParams();
  const { setHeader } = useHeader();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(Number(id)),
  });
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
    <TransactionDetailComponent defaultValue={data} />
  );
}
