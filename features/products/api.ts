import { apiClient } from "@/services/apiClient";

import {
  type CreateProductPayload,
  type Product,
  type ProductCategory,
  type ProductsPage,
  type ProductsQuery,
  type UpdateProductPayload,
} from "@/features/products/types";
import { buildProductsEndpoint, normalizeQueryValue } from "@/features/products/utils";

export async function getProducts(query: ProductsQuery): Promise<ProductsPage> {
  const endpoint = buildProductsEndpoint(query);
  const response = await apiClient.get<ProductsPage>(endpoint, {
    params: {
      limit: query.limit,
      skip: query.skip,
      q: normalizeQueryValue(query.search),
    },
  });
  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
}

export async function getCategories(): Promise<ProductCategory[]> {
  const response = await apiClient.get<ProductCategory[]>("/products/category-list");
  return response.data;
}

export async function createProduct(payload: CreateProductPayload): Promise<Product> {
  const response = await apiClient.post<Product>("/products/add", payload);
  return response.data;
}

export async function updateProduct(id: number, payload: UpdateProductPayload): Promise<Product> {
  const response = await apiClient.put<Product>(`/products/${id}`, payload);
  return response.data;
}

export async function deleteProduct(id: number): Promise<{ id: number; isDeleted: boolean }> {
  const response = await apiClient.delete<{ id: number; isDeleted: boolean }>(`/products/${id}`);
  return response.data;
}
