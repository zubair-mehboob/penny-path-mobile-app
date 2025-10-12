import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function SigninPage() {
  return (
    <View>
      <Text>This is Signin page</Text>
      <Link href={"/auth/signup"}>Go to signup</Link>
    </View>
  );
}
