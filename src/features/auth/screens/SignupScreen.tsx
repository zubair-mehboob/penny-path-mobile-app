// src/screens/SignupScreen.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text } from "react-native";

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return <Text>Signup</Text>;
}
