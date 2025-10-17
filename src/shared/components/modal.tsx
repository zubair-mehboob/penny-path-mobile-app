// src/shared/components/AppModal.tsx
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, useTheme, Button, Text } from "react-native-paper";
import { globalStyles } from "../styles/gloabl-styles";

interface AppModalProps {
  visible: boolean;
  title?: string;
  content?: React.ReactNode;
  onDismiss: () => void;
  actions?: {
    label: string;
    onPress: () => void;
    mode?: "text" | "contained";
  }[];
}

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  title,
  content,
  onDismiss,
  actions = [],
}) => {
  const { colors } = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: colors.primaryContainer,
          width: "90%",
        }}
      >
        {title ? (
          <Text style={[styles.title, { color: colors.onBackground }]}>
            {title}
          </Text>
        ) : null}

        <View style={styles.content}>{content}</View>

        <View style={styles.actions}>
          {actions.map((action, index) => (
            <Button
              key={index}
              mode={action.mode || "text"}
              onPress={action.onPress}
              style={styles.actionButton}
            >
              {action.label}
            </Button>
          ))}
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  content: {
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  actionButton: {
    marginLeft: 8,
  },
});
