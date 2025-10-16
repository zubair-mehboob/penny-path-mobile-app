import React from "react";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type MaterialCommunityIconName =
  keyof typeof MaterialCommunityIcons.glyphMap;

type PaperIconProps = {
  name: MaterialCommunityIconName;
  size?: number;
  color?: string;
};

export const PaperIcon: React.FC<PaperIconProps> = ({
  name,
  size = 24,
  color,
}) => {
  const theme = useTheme();
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color || theme.colors.onSurface}
    />
  );
};
