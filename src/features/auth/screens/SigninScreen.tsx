// src/screens/LoginScreen.tsx
import { Input } from "@/src/shared/components/input.component";
import React, { useState } from "react";

import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useAuthContext } from "../context/AuthContex";
import { useSignin } from "../hooks/useAuth";
export default function SigninScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { login } = useAuthContext();
  const onSignin = useSignin(login);
  return (
    <View style={styles.container}>
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        isPassword
        style={{ marginTop: 16 }}
      />
      <Button
        onPress={() => {
          onSignin.mutate({ email, password });
        }}
      >
        Login
      </Button>
    </View>
  );
}
