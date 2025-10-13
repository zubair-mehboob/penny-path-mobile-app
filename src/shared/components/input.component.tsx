// src/components/AuthInput.tsx
import { Input, Label, Stack } from "tamagui";

interface AppInputProps {
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export const AppInput = ({
  label,
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}: AppInputProps) => (
  <Stack mb={4}>
    <Label color="$color" mb={1}>
      {label}
    </Label>
    <Input
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      borderColor="$primary"
      borderWidth={1}
      px={3}
      py={2}
      b={4}
      width={200}
      color="$color"
    />
  </Stack>
);
