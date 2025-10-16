import React from "react";
import { Stack, getTokenValue, useTheme, styled } from "tamagui";
import * as LucideIcons from "lucide-react-native";
import type { ColorTokens, SizeTokens, Token } from "tamagui";
import type { LucideProps } from "lucide-react-native";

type IconName = keyof typeof LucideIcons;

type IconProps = {
  name: IconName;
  size?: SizeTokens | number;
  color?: ColorTokens | string;
  strokeWidth?: number;
  pressable?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  backgroundColor?: ColorTokens | string;
  borderRadius?: SizeTokens | number;
  hitSlop?: number;
  padding?: SizeTokens | number;
};

const Icon = ({
  name,
  size = "$4",
  color,
  strokeWidth = 2,
  pressable = false,
  onPress,
  disabled = false,
  backgroundColor,
  borderRadius = "$4",
  hitSlop = 8,
  padding = "$2",
}: IconProps) => {
  const theme = useTheme();
  const LucideIcon = LucideIcons[name] as React.FC<LucideProps>;

  if (!LucideIcon) {
    console.warn(`❗ Icon "${name}" not found in lucide-react-native`);
    return null;
  }

  const resolvedSize =
    typeof size === "number"
      ? size
      : (getTokenValue(size as Token, "size") as number);

  const resolvedColor =
    typeof color === "string" ? color : theme[color || "color"]?.get();

  const resolvedBg =
    typeof backgroundColor === "string"
      ? backgroundColor
      : backgroundColor
      ? theme[backgroundColor]?.get()
      : "transparent";

  const resolvedRadius =
    typeof borderRadius === "number"
      ? borderRadius
      : (getTokenValue(borderRadius as Token, "radius") as number);

  const resolvedPadding =
    typeof padding === "number"
      ? padding
      : (getTokenValue(padding as Token, "space") as number);

  const content = (
    <LucideIcon
      size={resolvedSize}
      color={resolvedColor}
      strokeWidth={strokeWidth}
    />
  );

  if (pressable) {
    return (
      <StyledPressable
        onPress={onPress}
        disabled={disabled}
        hitSlop={hitSlop}
        bg={resolvedBg}
        p={resolvedPadding}
        opacity={disabled ? 0.4 : 1}
      >
        {content}
      </StyledPressable>
    );
  }

  return content;
};

const StyledPressable = styled(Stack, {
  name: "IconPressable",
  items: "center",
  justify: "center",
  pressStyle: { opacity: 0.6 },
});

export default Icon;
