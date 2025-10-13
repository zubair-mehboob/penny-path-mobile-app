// src/screens/LoginScreen.tsx
import { AppInput } from "@/src/shared/components/input.component";
import { useThemeService } from "@/src/shared/hooks/useThemeService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Stack, Text } from "tamagui";
export default function SigninScreen({ navigation }: any) {
  const { toggleTheme } = useThemeService();
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
        Login
      </Text>

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
        onPress={() => alert("Logged In")}
      >
        Login
      </Button>

      <Button
        marginTop="$3"
        variant="outlined"
        borderColor="$primary"
        color="$color"
        onPress={() => router.push("/auth/signup")}
      >
        Go to Signup
      </Button>

      <Button marginTop="$6" onPress={toggleTheme}>
        Toggle Theme
      </Button>
    </Stack>
  );
}
