import React, { ReactNode } from "react";
import { Sheet, YStack, useTheme } from "tamagui";

type ReusableSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  snapPoints?: number[];
  defaultPosition?: number;
  dismissOnOverlayPress?: boolean;
  modal?: boolean;
};

export function ReusableSheet({
  open,
  onOpenChange,
  children,
  snapPoints = [50], // 👈 50% of screen height
  defaultPosition = 0,
  dismissOnOverlayPress = true,
  modal = true,
}: ReusableSheetProps) {
  const theme = useTheme();

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={snapPoints}
      defaultPosition={defaultPosition}
      dismissOnOverlayPress={dismissOnOverlayPress}
      modal={modal}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame>
        {/* The ScrollView ensures content scrolls if it exceeds half the screen */}
        <Sheet.ScrollView>
          <YStack p="$4" gap="$3">
            {children}
          </YStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
    </Sheet>
  );
}
