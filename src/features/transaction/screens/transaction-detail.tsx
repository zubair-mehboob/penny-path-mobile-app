import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

import { getTransactionById } from "../api/transactions";
import { TransactionForm } from "../components/transaction-form";

export default function EditTransactionScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["transaction", id],
    queryFn: () => getTransactionById(Number(id)),
  });

  const handleSubmit = (formData: any) => {
    console.log("Updating:", id, formData);
    // call update mutation
  };

  if (isLoading) return null;

  return (
    <TransactionForm type="edit" defaultValues={data} onSubmit={handleSubmit} />
  );
}
