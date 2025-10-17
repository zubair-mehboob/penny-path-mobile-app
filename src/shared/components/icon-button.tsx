import React from "react";
import { IconButton as PaperButton, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PaperIcon } from "./icon";

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

type PaperIconButtonProps = {
  icon: MaterialCommunityIconName;
  size?: number;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
  accessibilityLabel?: string;
};

export const PaperIconButton: React.FC<PaperIconButtonProps> = ({
  icon,
  size = 24,
  onPress,
  disabled = false,
  color,
  accessibilityLabel,
}) => {
  const theme = useTheme();

  return (
    <PaperButton
      icon={() => (
        <PaperIcon
          name={icon}
          size={size}
          color={color || theme.colors.primary}
        />
      )}
      size={size}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
    />
  );
};
