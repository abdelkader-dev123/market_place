import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteProduct,
  getCategories,
  getProductById,
  getProducts,
  updateProduct,
} from "@/features/products/api";
import type {
  ProductsQuery,
  UpdateProductPayload,
} from "@/features/products/types";
import { getNextSkip, normalizeQueryValue } from "@/features/products/utils";

const PRODUCTS_PAGE_SIZE = 12;

export function useProducts(search?: string, category?: string) {
  const normalizedSearch = normalizeQueryValue(search);
  const normalizedCategory = normalizeQueryValue(category);

  return useInfiniteQuery({
    queryKey: [
      "products",
      {
        limit: PRODUCTS_PAGE_SIZE,
        search: normalizedSearch,
        category: normalizedCategory,
      },
    ],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => {
      const query: ProductsQuery = {
        limit: PRODUCTS_PAGE_SIZE,
        skip: pageParam,
        search: normalizedSearch,
        category: normalizedCategory,
      };
      return getProducts(query);
    },
    getNextPageParam: (lastPage) =>
      getNextSkip(lastPage.skip, lastPage.limit, lastPage.total),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["product-categories"],
    queryFn: getCategories,
  });
}

export function useUpdateProduct(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProductPayload) => updateProduct(id, payload),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(["product", id], updatedProduct);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: async () => {
      queryClient.setQueriesData({ queryKey: ["products"] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            products: page.products.filter((p: any) => p.id !== id),
          })),
        };
      });

      queryClient.removeQueries({ queryKey: ["product", id] });
    },
  });
}
