// GiftedCharts_BarChart_MonthlySpend.tsx
// React Native + Expo example using `react-native-gifted-charts`
// Default export is a self-contained component you can drop into an Expo app's screen.

import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { useTheme, Text } from "react-native-paper";

type DaySpend = {
  day: number;
  amount: number; // money spent that day
};

type Props = {
  monthName?: string; // shown as title
  days?: number; // number of days in the month (28..31)
  data?: DaySpend[]; // optional explicit data; if omitted demo data is generated
};

export default function MonthlySpendBarChart({
  monthName = "September",
  days = 30,
  data,
}: Props) {
  // If the user doesn't pass data, generate demo data
  const { colors } = useTheme();
  const style = globalStyles(colors);
  const dayData: DaySpend[] = useMemo(() => {
    if (data && data.length) return data.slice(0, days);
    // demo: random-ish spend between 0 and 120
    return Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      amount: Math.round(Math.sin((i + 1) / 3) * 20 + 40 + Math.random() * 60),
    }));
  }, [data, days]);

  // Convert to format expected by gifted-charts
  const chartData = dayData.map((d) => ({
    value: d.amount,
    label: String(d.day),
    // frontColor: d.amount > 80 ? "#FF6B6B" : "#4F9DDE", // highlight large spend days
    payload: { day: d.day, amount: d.amount },
  }));

  const windowWidth = Dimensions.get("window").width;
  // layout: allow horizontal scrolling when days are many
  const chartWidth = Math.max(windowWidth - 32, days * 28); // 28 px per bar minimum

  return (
    <SafeAreaView>
      <Text style={styles.title}>{monthName} — Daily Spend</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <View style={{ width: chartWidth }}>
          <BarChart
            backgroundColor={style.container.backgroundColor}
            showGradient
            gradientColor={colors.primary}
            frontColor={colors.onPrimary}
            data={chartData}
            width={chartWidth}
            height={260}
            barWidth={20}
            spacing={8}
            onPress={(item: any) => {
              // item contains { value, label, index, payload }
              // For demo we do nothing here, but you can show a modal or navigate.
              // console.log('pressed', item);
            }}
            yAxisLabelPrefix="$"
            xAxisLabelTextStyle={{ fontSize: 10, color: colors.onBackground }}
            yAxisTextStyle={{ fontSize: 10, color: colors.onBackground }}
            xAxisColor={colors.onBackground}
            yAxisColor={colors.onBackground}
            maxValue={Math.max(...chartData.map((c) => c.value), 100)}
            hideRules // hide background grid lines if you prefer
            initialSpacing={8}
            roundedTop
            // render a custom tooltip when a bar is selected (optional)
            renderTooltip={({ item }: { item: any }) => (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>Day {item.payload.day}</Text>
                <Text style={styles.tooltipAmount}>${item.payload.amount}</Text>
              </View>
            )}
            // avoid drawing EVERY x-label when many days; show only 1 out of N
          />
        </View>
      </ScrollView>

      <Text style={styles.hint}>Tip: scroll horizontally to see all days.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 8 },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  hint: { fontSize: 12, color: "#666", marginTop: 8, marginHorizontal: 16 },
  tooltip: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  tooltipText: { fontSize: 12, color: "#333" },
  tooltipAmount: { fontSize: 14, fontWeight: "700" },
});

// Example usage:
// <MonthlySpendBarChart monthName="October" days={31} />
// or pass explicit data:
// <MonthlySpendBarChart data={[ { day:1, amount:10 }, { day:2, amount:20 }, ... ]} />
