// src/shared/components/AccountDetailsModal.tsx
import { Input } from "@/src/shared/components/input.component";
import { AppModal } from "@/src/shared/components/modal";
import React from "react";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";

type AccountDetails = {
  balance: number;
  isDefault: boolean;
  title: string;
  userId: number;
};

interface AccountDetailsModalProps {
  visible: boolean;
  data: AccountDetails;
  onDismiss: () => void;
  onSave?: (updated: AccountDetails) => void;
}

export const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({
  visible,
  data,
  onDismiss,
  onSave,
}) => {
  const [form, setForm] = React.useState<AccountDetails>(data);

  React.useEffect(() => {
    setForm(data);
  }, [data]);

  const handleChange = (key: keyof AccountDetails, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppModal
      visible={visible}
      title="Account Details"
      onDismiss={onDismiss}
      content={
        <View style={{ gap: 12 }}>
          <Input
            label={"Title"}
            value={form.title}
            onChangeText={(v) => handleChange("title", v)}
          />
          <Input
            label="Balance"
            keyboardType="numeric"
            value={String(form.balance)}
            onChangeText={(v) => handleChange("balance", parseFloat(v) || 0)}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Default Account</Text>
            <Switch
              value={form.isDefault}
              onValueChange={(v) => handleChange("isDefault", v)}
            />
          </View>
        </View>
      }
      actions={[
        {
          label: "Save",
          onPress: () => onSave?.(form),
        },
      ]}
    />
  );
};
