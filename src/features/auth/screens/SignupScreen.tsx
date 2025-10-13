// src/screens/SignupScreen.tsx
import { AppInput } from "@/src/shared/components/input.component";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Stack, Text } from "tamagui";

export default function SignupScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <Stack
      flex={1}
      justifyContent="center"
      alignItems="center"
      background="$background"
      padding="$5"
    >
      <Text fontSize={28} fontWeight="700" color="$color" marginBottom="$5">
        Sign Up
      </Text>

      <AppInput
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <AppInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
      />
      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />

      <Button
        background="$primary"
        color="white"
        marginTop="$4"
        onPress={() => alert("Account Created!")}
      >
        Create Account
      </Button>

      <Button
        marginTop="$3"
        variant="outlined"
        borderColor="$primary"
        color="$color"
        onPress={() => router.back()}
      >
        Back to Login
      </Button>
    </Stack>
  );
}
