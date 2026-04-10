import { Pressable, StyleSheet, Text, View } from "react-native";

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
  title: { fontSize: 28, fontWeight: "700", color: "#111827" },
  subtitle: { color: "#6B7280", marginTop: 4, maxWidth: 240 },
  logoutButton: {
    backgroundColor: "#111827",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  logoutText: { color: "#FFF", fontWeight: "600" },
});
