import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { ProductCard } from "./ProductCard";
import type { ViewMode } from "./ViewToggle";

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  thumbnail: string;
};

type Props = {
  products: Product[];
  viewMode: ViewMode;
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onFetchNextPage: () => void;
};

export function ProductList({
  products,
  viewMode,
  isLoading,
  error,
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage,
}: Props) {
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load products.</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No products found.</Text>
      </View>
    );
  }

  return (
    <FlashList
      key={viewMode}
      contentContainerStyle={styles.list}
      data={products}
      keyExtractor={(item) => String(item.id)}
      numColumns={viewMode === "grid" ? 2 : 1}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          onFetchNextPage();
        }
      }}
      onEndReachedThreshold={0.4}
      renderItem={({ item }) => <ProductCard item={item} viewMode={viewMode} />}
      ListFooterComponent={
        isFetchingNextPage ? (
          <View style={styles.footerLoader}>
            <ActivityIndicator />
          </View>
        ) : null
      }
      ItemSeparatorComponent={() =>
        viewMode === "list" ? (
          <View style={styles.listSeparator} />
        ) : (
          <View style={styles.gridSeparator} />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingBottom: 18 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  footerLoader: { paddingVertical: 18 },
  listSeparator: { height: 12 },
  gridSeparator: { height: 0 },
  error: { color: "#DC2626" },
  empty: { color: "#6B7280" },
});
