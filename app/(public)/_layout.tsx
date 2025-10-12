import { APP_ROUTES } from "@/constants/routes";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name={APP_ROUTES.signin} />
      <Stack.Screen name={APP_ROUTES.signup} />
    </Stack>
  );
};
export default AuthLayout;
