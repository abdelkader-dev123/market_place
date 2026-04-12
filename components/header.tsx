import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { fontSizes } from "@/constants/fontSizes";

type HeaderProps = {
  title?: string;
};

export function Header({ title = "Product Details" }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    color: colors.primary,
    fontSize: fontSizes["2xl"],
    alignSelf: "center",
    fontWeight: "600",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: fontSizes.lg,
    fontWeight: "600",
    color: colors.primary,
    marginHorizontal: 12,
  },
  rightSpacer: {
    width: 38,
    height: 38,
  },
});
