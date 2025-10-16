// src/shared/components/BottomSheet.tsx
import React, { forwardRef, useCallback, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface AppBottomSheetProps extends Partial<BottomSheetProps> {
  snapPoints?: string[] | number[];
  children: React.ReactNode;
  onClose?: () => void;
  fixedHeight?: number;
}

export const AppBottomSheet = forwardRef<BottomSheet, AppBottomSheetProps>(
  ({ snapPoints = ["50%"], children, onClose, ...props }, ref) => {
    const sheetRef = useRef<BottomSheet>(null);

    // Combine forwarded ref and internal ref
    React.useImperativeHandle(ref, () => sheetRef.current!);

    // memoize snap points
    const memoSnapPoints = useMemo(() => {
      // Example: 300px fixed height
      if (props.fixedHeight) return [props.fixedHeight];
      return snapPoints;
    }, [snapPoints, props.fixedHeight]);

    const handleClose = useCallback(() => {
      if (onClose) onClose();
    }, [onClose]);

    return (
      <BottomSheet
        ref={sheetRef}
        index={-1} // initially closed
        snapPoints={memoSnapPoints}
        enablePanDownToClose
        onClose={handleClose}
        {...props}
      >
        <BottomSheetView style={styles.content}>{children}</BottomSheetView>
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
