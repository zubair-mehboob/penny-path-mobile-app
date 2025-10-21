// src/shared/components/BottomSheet.tsx
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "react-native-paper";
import { globalStyles } from "../styles/gloabl-styles";

interface AppBottomSheetProps extends Partial<BottomSheetProps> {
  snapPoints?: string[] | number[];
  children: React.ReactNode;
  onClose?: () => void;
}

export const AppBottomSheet = forwardRef<BottomSheet, AppBottomSheetProps>(
  ({ snapPoints = ["50%"], children, onClose, ...props }, ref) => {
    const sheetRef = useRef<BottomSheet>(null);
    React.useImperativeHandle(ref, () => sheetRef.current!);
    const memoSnapPoints = useMemo(() => {
      return snapPoints;
    }, [snapPoints]);
    const { colors } = useTheme();
    const styles = globalStyles(colors);
    const handleClose = useCallback(() => {
      if (onClose) onClose();
    }, [onClose]);

    return (
      <BottomSheet
        backgroundStyle={styles.bottomSheet}
        ref={sheetRef}
        index={-1} // initially closed
        snapPoints={memoSnapPoints}
        enablePanDownToClose
        onClose={handleClose}
        {...props}
      >
        {children}
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
});

AppBottomSheet.displayName = "AppBottomSheet";
