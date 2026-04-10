import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Header } from "@/components/header";
import {
  useDeleteProduct,
  useProduct,
  useUpdateProduct,
} from "@/features/products/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);
  const { data: product, isLoading, error } = useProduct(id);
  const updateMutation = useUpdateProduct(id);
  const deleteMutation = useDeleteProduct(id);

  const onUpdatePrice = async () => {
    if (!product) {
      return;
    }
    const nextPrice = Number((product.price * 0.9).toFixed(2));
    await updateMutation.mutateAsync({ price: nextPrice });
  };

  const onDelete = () => {
    Alert.alert(
      "Delete product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteMutation.mutateAsync();
            router.back();
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    const errorMessage =
      error instanceof Error ? error.message : "Product not found.";
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContent}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="Product Details" />
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.meta}>
          {product.brand ?? "Generic"} • {product.category}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
        <View style={styles.actionsRow}>
          <Pressable
            disabled={updateMutation.isPending}
            onPress={onUpdatePrice}
            style={[styles.actionButton, styles.updateButton]}
          >
            <Text style={styles.actionText}>
              {updateMutation.isPending ? "Updating..." : "Discount 10%"}
            </Text>
          </Pressable>
          <Pressable
            disabled={deleteMutation.isPending}
            onPress={onDelete}
            style={[styles.actionButton, styles.deleteButton]}
          >
            <Text style={styles.actionText}>
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F6F8" },
  container: { padding: 16, paddingBottom: 24 },
  centerContent: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    backgroundColor: "#E5E7EB",
  },
  title: { marginTop: 16, fontSize: 28, fontWeight: "700", color: "#111827" },
  meta: { marginTop: 8, color: "#6B7280", textTransform: "capitalize" },
  price: { marginTop: 14, fontSize: 24, fontWeight: "700", color: "#111827" },
  actionsRow: { marginTop: 14, flexDirection: "row", gap: 10 },
  actionButton: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  updateButton: { backgroundColor: "#111827" },
  deleteButton: { backgroundColor: "#B91C1C" },
  actionText: { color: "#FFFFFF", fontWeight: "600" },
  description: { marginTop: 16, color: "#374151", lineHeight: 22 },
  error: { color: "#DC2626" },
});
