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
  <Stack marginBottom="$4">
    <Label color="$color" marginBottom="$1">
      {label}
    </Label>
    <Input
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      borderColor="$primary"
      borderWidth={1}
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius="$4"
      color="$color"
    />
  </Stack>
);
