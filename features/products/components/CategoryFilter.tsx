import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

type Props = {
  categories: string[];
  selected: string | undefined;
  onSelect: (category: string | undefined) => void;
};

const ALL = "All";

export function CategoryFilter({ categories, selected, onSelect }: Props) {
  const displayCategories = useMemo(() => [ALL, ...categories], [categories]);

  return (
    <ScrollView
      contentContainerStyle={styles.row}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
    >
      {displayCategories.map((item) => {
        const isActive = (item === ALL && !selected) || item === selected;
        return (
          <Pressable
            key={item}
            onPress={() => onSelect(item === ALL ? undefined : item)}
            style={[styles.chip, isActive ? styles.chipActive : null]}
          >
            <Text
              style={[styles.chipText, isActive ? styles.chipTextActive : null]}
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0, marginBottom: 10 },
  row: {
    gap: 8,
    paddingBottom: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipActive: { backgroundColor: "#111827", borderColor: "#111827" },
  chipText: {
    color: "#374151",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  chipTextActive: { color: "#FFFFFF" },
});
