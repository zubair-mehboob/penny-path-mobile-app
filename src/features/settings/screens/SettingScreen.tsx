import { useHeader } from "@/src/shared/providers/header-provider";
import { globalStyles } from "@/src/shared/styles/gloabl-styles";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Text, useTheme } from "react-native-paper";

export default function SettingScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = globalStyles(colors);
  const { setHeader } = useHeader();
  useFocusEffect(
    React.useCallback(() => {
      setHeader({
        title: "Settings",
        goBack: true,
      });
    }, [])
  );

  return <Text>Setting screen</Text>;
}
