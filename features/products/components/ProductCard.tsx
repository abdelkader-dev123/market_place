import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontSizes } from "@/constants/fontSizes";
import type { ViewMode } from "./ViewToggle";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
};

type Props = {
  item: Product;
  viewMode: ViewMode;
};

export function ProductCard({ item, viewMode }: Props) {
  const isGrid = viewMode === "grid";

  return (
    <View style={isGrid ? styles.gridWrapper : undefined}>
      <Link asChild href={`/(main)/product/${item.id}`}>
        <Pressable style={[styles.card, isGrid ? styles.gridCard : null]}>
          <Image
            source={{ uri: item.thumbnail }}
            style={[styles.image, isGrid ? styles.gridImage : null]}
          />
          <View style={styles.cardBody}>
            <Text style={styles.productTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  gridWrapper: { flex: 1, paddingHorizontal: 4, marginBottom: 12 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
  },
  gridCard: { height: "100%" },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: colors.imagePlaceholder,
  },
  gridImage: { height: 120 },
  cardBody: { padding: 12 },
  productTitle: {
    fontSize: fontSizes.md,
    fontWeight: "600",
    color: colors.primary,
  },
  category: {
    color: colors.textMuted,
    marginTop: 4,
    textTransform: "capitalize",
  },
  price: {
    marginTop: 8,
    fontSize: fontSizes.xl,
    fontWeight: "700",
    color: colors.primary,
  },
});
