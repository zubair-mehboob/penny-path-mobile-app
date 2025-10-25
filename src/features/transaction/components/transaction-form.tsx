import DateTimePickerInput from "@/src/shared/components/datetimepicker";
import {
  CreateTransactionDTO,
  CreateTransactionSchema,
  UpdateTransactionDTO,
  UpdateTransactionSchema,
} from "@/src/shared/dtos/request/transaction.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";

type TransactionFormProps = {
  type: "create" | "edit";
  defaultValues?: Partial<CreateTransactionDTO | UpdateTransactionDTO>;
  onSubmit: (data: CreateTransactionDTO | UpdateTransactionDTO) => void;
  loading?: boolean;
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
  type,
  defaultValues,
  onSubmit,
  loading = false,
}) => {
  const schema =
    type === "edit" ? UpdateTransactionSchema : CreateTransactionSchema;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTransactionDTO | UpdateTransactionDTO>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      title: "",
      amount: 0,
      description: "",
      date: new Date(),
      accountId: 0,
      ...defaultValues,
    },
  });

  return (
    <View style={{ gap: 12, padding: 16 }}>
      {/* Title */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Title"
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.title}
          />
        )}
      />
      {errors.title && (
        <HelperText type="error">{errors.title.message}</HelperText>
      )}

      {/* Description */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Description"
            mode="outlined"
            multiline
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            error={!!errors.description}
          />
        )}
      />

      {/* Amount */}
      <Controller
        control={control}
        name="amount"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Amount"
            mode="outlined"
            keyboardType="numeric"
            value={String(value ?? "")}
            onBlur={onBlur}
            onChangeText={(val) => onChange(Number(val))}
            error={!!errors.amount}
          />
        )}
      />
      {errors.amount && (
        <HelperText type="error">{errors.amount.message}</HelperText>
      )}

      {/* Date */}
      {/* <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Date"
            mode="outlined"
            value={value ? new Date(value).toISOString().split("T")[0] : ""}
            onChangeText={(val) => onChange(new Date(val))}
            placeholder="YYYY-MM-DD"
            error={!!errors.date}
          />
        )}
      /> */}
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <DateTimePickerInput
            label="Date"
            mode="date"
            value={value || new Date()}
            onChange={(val) => onChange(new Date(val))}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
        style={{
          marginTop: 10,
          borderRadius: 8,
        }}
      >
        {type === "edit" ? "Update Transaction" : "Create Transaction"}
      </Button>
    </View>
  );
};
