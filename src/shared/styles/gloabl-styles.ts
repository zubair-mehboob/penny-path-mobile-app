// src/styles/global.ts
import { StyleSheet } from "react-native";
import type { MD3Theme } from "react-native-paper";

export const globalStyles = (colors: MD3Theme["colors"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
      color: colors.onBackground,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.primary,
    },
    text: {
      fontSize: 16,
      color: colors.onBackground,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: colors.onPrimary,
    },
    primaryContainer: {
      backgroundColor: colors.primaryContainer,
      color: colors.onPrimaryContainer,
      flex: 1,
    },
    secondaryContainer: {
      backgroundColor: colors.secondaryContainer,
      color: colors.onSecondaryContainer,
      flex: 1,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 10,
      backgroundColor: colors.primaryContainer,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    headerTitle: {
      color: colors.onPrimaryContainer,
      fontSize: 20,
      fontWeight: "bold",
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    headerIcon: {
      color: colors.onPrimaryContainer,
    },
    list: {
      backgroundColor: colors.surfaceVariant,
      color: colors.onSurfaceVariant,
    },
    bottomSheet: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      shadowColor: colors.onBackground,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 8, //
    },
    bottomSheetIcon: {
      color: colors.onBackground,
    },
    bottomSheetTitle: {
      color: colors.onBackground,
    },
    drawer: {
      backgroundColor: colors.primaryContainer,
      flex: 1,
    },
    modal: {
      backgroundColor: colors.surfaceVariant,
      alignSelf: "center",
      padding: 20,
      borderRadius: 16,
    },
    bottomTab: {
      backgroundColor: colors.primaryContainer,
      borderTopWidth: 0,
      height: 60,
    },
  });
export type GlobalStylesType = ReturnType<typeof globalStyles>;
