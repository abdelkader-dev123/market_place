import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

import { colors } from "@/constants/colors";

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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textBody,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  chipTextActive: { color: colors.onPrimary },
});
