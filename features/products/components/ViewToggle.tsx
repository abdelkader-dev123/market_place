import { Pressable, StyleSheet, Text, View } from "react-native";

export type ViewMode = "list" | "grid";

type Props = {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
};

const OPTIONS: ViewMode[] = ["list", "grid"];

export function ViewToggle({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((mode) => {
        const isActive = value === mode;
        return (
          <Pressable
            key={mode}
            onPress={() => onChange(mode)}
            style={[styles.option, isActive ? styles.optionActive : null]}
          >
            <Text style={[styles.text, isActive ? styles.textActive : null]}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 3,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  option: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  optionActive: { backgroundColor: "#111827" },
  text: { color: "#4B5563", fontSize: 12, fontWeight: "600" },
  textActive: { color: "#FFFFFF" },
});
