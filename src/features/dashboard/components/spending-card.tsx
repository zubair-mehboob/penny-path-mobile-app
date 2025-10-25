import React from "react";
import { Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "react-native-paper";

export default function SpendingCards({
  total = 10000,
  spent = 4000, // example values
}) {
  const percentSpent = Math.min(spent / total, 1);
  const percentLeft = 1 - percentSpent;
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {/* Spend Card */}
      <Card style={{ backgroundColor: colors.primaryContainer }}>
        <Card.Title title="Total" />
        <Card.Content>
          <Text variant="bodyLarge">Rs {total}</Text>
        </Card.Content>
      </Card>

      <LinearGradient
        colors={["red", colors.primaryContainer]}
        locations={[0, percentSpent]} // red covers up to spent%
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientCard}
      >
        <Card style={styles.cardTransparent} elevation={0}>
          <Card.Title title="Spend" />
          <Card.Content>
            <Text variant="bodyLarge">₨ {spent.toLocaleString()}</Text>
          </Card.Content>
        </Card>
      </LinearGradient>

      {/* Left Card */}
      <LinearGradient
        colors={["green", colors.primaryContainer]}
        locations={[0, percentLeft]} // green covers up to left%
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientCard}
      >
        <Card style={styles.cardTransparent} elevation={0}>
          <Card.Title title="Left" />
          <Card.Content>
            <Text variant="bodyLarge">
              ₨ {(total - spent).toLocaleString()}
            </Text>
          </Card.Content>
        </Card>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    flexDirection: "row",
  },
  gradientCard: {
    borderRadius: 12,
    overflow: "hidden",
  },
  cardTransparent: {
    // backgroundColor: "transparent",
  },
});
