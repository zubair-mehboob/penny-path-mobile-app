import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useMemo, useState } from "react";
import { Platform, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

interface Props {
  label: string;
  mode?: "date" | "time" | "datetime";
  value: Date | string;
  onChange: (date: Date) => void;
}

const DateTimePickerInput: React.FC<Props> = ({
  label,
  mode = "date",
  value,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const theme = useTheme();

  // ✅ Convert string to Date safely
  const dateValue = useMemo(() => {
    if (value instanceof Date) return value;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [value]);

  const handleChange = (_: any, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) onChange(selectedDate);
  };

  const formatted =
    mode === "time"
      ? dateValue.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : dateValue.toLocaleDateString();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background, // 👈 follow theme background
        borderRadius: theme.roundness,
      }}
    >
      <TextInput
        label={label}
        value={formatted}
        onFocus={() => setShow(true)}
        right={<TextInput.Icon icon="calendar" onPress={() => setShow(true)} />}
        editable={false}
        mode="outlined"
        style={{
          backgroundColor: theme.colors.background,
        }}
        outlineColor={theme.colors.outline}
        activeOutlineColor={theme.colors.primary}
        textColor={theme.colors.onSurface}
      />

      {show && (
        <DateTimePicker
          value={dateValue}
          mode={mode === "datetime" ? "date" : mode}
          display="default"
          onChange={handleChange}
          themeVariant={theme.dark ? "dark" : "light"} // 👈 match Paper theme
          accentColor={theme.colors.primary}
          design="material"
        />
      )}
    </View>
  );
};

export default DateTimePickerInput;
