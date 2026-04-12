import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontSizes } from "@/constants/fontSizes";

type Props = {
  onLogout: () => void;
};

export function HomeHeader({ onLogout }: Props) {
  return (
    <View style={styles.headerRow}>
      <View>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>Here are your products.</Text>
      </View>
      <Pressable onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: {
    fontSize: fontSizes["4xl"],
    fontWeight: "700",
    color: colors.primary,
  },
  subtitle: { color: colors.textMuted, marginTop: 4, maxWidth: 240 },
  logoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  logoutText: { color: colors.onPrimary, fontWeight: "600" },
});
