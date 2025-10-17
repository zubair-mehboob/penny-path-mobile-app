// src/screens/LoginScreen.tsx
import { Input } from "@/src/shared/components/input.component";
import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { usePost } from "@/src/shared/hooks/useApi";
import React, { useState } from "react";

import { useAuth } from "../context/AuthContex";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
export default function SigninScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { login } = useAuth();
  const onSignin = usePost<
    { userId: number; name: string; email: string; jwt: string }, //return type
    { email: string; password: string } // dto
  >(ENDPOINTS.auth.login, {
    onSuccess: (res) => {
      console.log({ res }, "from api");
      login(res.jwt, {
        email: res.email,
        name: res.name,
        userId: res.userId,
      });
    },
  });
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
