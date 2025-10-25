import DateTimePickerInput from "@/src/shared/components/datetimepicker";
import { AppModal } from "@/src/shared/components/modal";
import {
  SplitTransactionDTO,
  SplitTransactionSchema,
} from "@/src/shared/dtos/request/transaction.dto";
import { ITransaction } from "@/src/shared/dtos/response/transaction.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
type SplitTransactionFormType = {
  visible: boolean;
  setVisible(visible: boolean): void;
  formType: "create" | "edit";
  defaultValues: SplitTransactionDTO | ITransaction;
  onSubmit: (data: SplitTransactionDTO | ITransaction) => void;
};
const SplitTransactionForm = ({
  visible,
  setVisible,
  formType,
  defaultValues,
  onSubmit,
}: SplitTransactionFormType) => {
  const schema = SplitTransactionSchema;

  const {
    control,
    handleSubmit,
    formState: { errors, defaultValues: data },
    reset,
  } = useForm<SplitTransactionDTO | ITransaction>({
    resolver: zodResolver(schema) as any,
  });

  useEffect(() => {
    if (visible && defaultValues && Object.keys(defaultValues).length) {
      reset({
        ...defaultValues,
        date: defaultValues.date ? new Date(defaultValues.date) : new Date(),
      });
    }
  }, [visible]);

  return (
    <AppModal
      visible={visible}
      onDismiss={() => setVisible(false)}
      content={
        <View>
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
        </View>
      }
      title={
        formType === "create"
          ? "Add Split Transaction"
          : "Edit Split Transaction"
      }
      actions={[
        {
          label: "Save",

          onPress: handleSubmit((data) => onSubmit(data)),
        },
      ]}
    />
  );
};
export default SplitTransactionForm;
