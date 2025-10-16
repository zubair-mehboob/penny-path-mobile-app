// src/shared/components/Input.tsx
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  TextInputProps,
  TextInput,
  useTheme,
  HelperText,
} from "react-native-paper";

type InputProps = TextInputProps & {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string | boolean;
  style?: StyleProp<ViewStyle>;
  isPassword?: boolean; // toggle for password fields
};

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  error,
  style,
  isPassword = false,
  ...rest
}) => {
  const theme = useTheme();
  const [secure, setSecure] = useState(isPassword);

  return (
    <>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        mode="outlined"
        style={style}
        error={!!error}
        secureTextEntry={secure}
        right={
          isPassword ? (
            <TextInput.Icon
              icon={secure ? "eye" : "eye-off"}
              onPress={() => setSecure((prev) => !prev)}
            />
          ) : undefined
        }
        {...rest}
      />
      {error && typeof error === "string" && (
        <HelperText type="error" visible={true}>
          {error}
        </HelperText>
      )}
    </>
  );
};
