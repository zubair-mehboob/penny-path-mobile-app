// src/shared/components/CustomHeader.tsx
import React from "react";
import { Text, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { globalStyles } from "../styles/gloabl-styles";

import { useHeader } from "../providers/header-provider";

interface CustomHeaderProps {
  title?: string;
  onMenuPress?: () => void;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onMenuPress,
}) => {
  const { header } = useHeader();
  const { colors } = useTheme();
  const styles = globalStyles(colors);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        {!header.rightAction && onMenuPress ? (
          <IconButton
            icon="menu"
            iconColor={styles.headerIcon.color}
            onPress={onMenuPress}
          />
        ) : (
          header.rightAction
        )}
        <Text style={styles.headerTitle}>{header.title || title}</Text>
      </View>

      <View style={styles.headerRight}>
        {header.actions?.map((a) => (
          <View key={a.key}>{a.element}</View>
        ))}
      </View>
    </View>
  );
};
