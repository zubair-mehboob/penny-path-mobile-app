// src/screens/LoginScreen.tsx
import { AppInput } from "@/src/shared/components/input.component";
import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { usePost } from "@/src/shared/hooks/useApi";
import { useThemeService } from "@/src/shared/hooks/useThemeService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Stack, Text } from "tamagui";
export default function SigninScreen({ navigation }: any) {
  const { toggleTheme } = useThemeService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const onSignin = usePost<
    { userId: number; name: string; email: string; jwt: string }, //return type
    { email: string; password: string } // dto
  >(ENDPOINTS.auth.login, {
    onSuccess: () => alert("Post created!"),
  });
  return (
    <Stack
      flex={1}
      justify="center"
      items="center"
      background="$background"
      p={5}
    >
      <Text fontSize={28} fontWeight={700} color="$color" mb={5}>
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
        mt={4}
        onPress={() => onSignin.mutate({ email: "z@g.co", password: "abc" })}
      >
        Login
      </Button>

      <Button
        mt={3}
        variant="outlined"
        borderColor="$primary"
        color="$color"
        onPress={() => router.push("/auth/signup")}
      >
        Go to Signup
      </Button>

      <Button
        mt={6}
        onPress={() => {
          console.log("gonna cll this");
          alert("haha");
          toggleTheme();
        }}
      >
        Toggle Theme
      </Button>
    </Stack>
  );
}
