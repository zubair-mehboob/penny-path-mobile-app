// src/screens/LoginScreen.tsx
import { Input } from "@/src/shared/components/input.component";
import { ENDPOINTS } from "@/src/shared/constants/endpoints.constant";
import { usePost } from "@/src/shared/hooks/useApi";
import { useThemeService } from "@/src/shared/hooks/useThemeService";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import { useAuth } from "../context/AuthContex";
import { View } from "react-native";
import { Button } from "react-native-paper";
export default function SigninScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
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
    <View style={{ padding: 16 }}>
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
          console.log("signin function getting called");
          onSignin.mutate({ email, password });
        }}
      >
        Login
      </Button>
    </View>
    // <Stack
    //   flex={1}
    //   justify="center"
    //   items="center"
    //   background="$background"
    //   p={5}
    // >
    //   <Text fontSize={28} fontWeight={700} color="$color" mb={5}>
    //     Login
    //   </Text>

    //   <AppInput
    //     label="Email"
    //     value={email}
    //     onChangeText={setEmail}
    //     placeholder="Enter email"
    //   />
    //   <AppInput
    //     label="Password"
    //     value={password}
    //     onChangeText={setPassword}
    //     placeholder="Enter password"
    //     secureTextEntry
    //   />

    //   <Button
    //     width={150}
    //     mt={4}
    //     onPress={() => {
    //       console.log("signin function getting called");
    //       onSignin.mutate({ email, password });
    //     }}
    //   >
    //     Login
    //   </Button>

    //   <Button
    //     width={150}
    //     mt={3}
    //     variant="outlined"
    //     color="$color"
    //     onPress={() => router.push("/auth/signup")}
    //   >
    //     Go to Signup
    //   </Button>
    //   {onSignin.isPending && <Spinner color={"$color"} />}
    // </Stack>
  );
}
