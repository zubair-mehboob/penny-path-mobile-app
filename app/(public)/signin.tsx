import { APP_ROUTES } from "@/constants/routes";
import { Link, RelativePathString } from "expo-router";
import { Button, Text, View } from "react-native";

export default function SignIn() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Sign In Screen</Text>
      <Link href={`/${APP_ROUTES.signup}` as RelativePathString} asChild>
        <Button title="Go to Sign Up" />
      </Link>
      <Link href={"/forgot-password" as RelativePathString} asChild>
        <Button title="Forgot Password?" />
      </Link>
    </View>
  );
}
