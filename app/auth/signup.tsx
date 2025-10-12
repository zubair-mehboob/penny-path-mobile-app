import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function SignupPage() {
  return (
    <View>
      <Text>This is Signup page</Text>
      <Link href={"/auth/signin"}>Go to signup</Link>
    </View>
  );
}
