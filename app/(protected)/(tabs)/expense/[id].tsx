import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
export default function ExpenseDetailPage() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>{`Expense Detail page with expense id: ${id}`}</Text>
    </View>
  );
}
