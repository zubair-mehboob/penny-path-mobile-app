// src/screens/LoginScreen.tsx
import { Input } from "@/src/shared/components/input.component";
import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { usePost } from "@/src/shared/hooks/useApi";
import React, { useState } from "react";

import apiClient from "@/src/shared/services/api-client.service";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useAuthContext } from "../context/AuthContex";
import { useSignin } from "../hooks/useAuth";
import { ILoginResponseDTO } from "@/src/shared/dtos/response/auth.dto";
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
