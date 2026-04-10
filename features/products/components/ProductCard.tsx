import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
      <Link asChild href={`/(protected)/product/${item.id}`}>
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
    backgroundColor: "#FFF",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  gridCard: { height: "100%" },
  image: { width: "100%", height: 160, backgroundColor: "#E5E7EB" },
  gridImage: { height: 120 },
  cardBody: { padding: 12 },
  productTitle: { fontSize: 16, fontWeight: "600", color: "#111827" },
  category: { color: "#6B7280", marginTop: 4, textTransform: "capitalize" },
  price: { marginTop: 8, fontSize: 18, fontWeight: "700", color: "#111827" },
});
