import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { useAuth } from "@/features/auth/hooks";
import { CategoryFilter } from "@/features/products/components/CategoryFilter";
import { HomeHeader } from "@/features/products/components/HomeHeader";
import { ProductList } from "@/features/products/components/ProductList";
import {
  ViewMode,
  ViewToggle,
} from "@/features/products/components/ViewToggle";
import { useCategories, useProducts } from "@/features/products/hooks";

export default function HomeScreen() {
  const { logout } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts(search, category);

  const { data: categories = [] } = useCategories();
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HomeHeader onLogout={logout} />
        <ViewToggle value={viewMode} onChange={setViewMode} />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setSearch}
          placeholder="Search products..."
          placeholderTextColor={colors.textPlaceholder}
          style={styles.searchInput}
          value={search}
        />
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />
        <ProductList
          error={error}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          onFetchNextPage={fetchNextPage}
          products={products}
          viewMode={viewMode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  searchInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    color: colors.primary,
  },
});
