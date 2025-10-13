import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="/auth/signin" />
      <Stack.Screen name="/auth/signup" />
      <Stack.Screen name="/auth/forgot-password" />
    </Stack>
  );
}
