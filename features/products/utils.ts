import type { ProductsQuery } from "@/features/products/types";

export function normalizeQueryValue(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function buildProductsEndpoint(query: ProductsQuery): string {
  const search = normalizeQueryValue(query.search);
  const category = normalizeQueryValue(query.category);

  if (search) {
    return "/products/search";
  }

  if (category) {
    return `/products/category/${encodeURIComponent(category)}`;
  }

  return "/products";
}

export function getNextSkip(skip: number, limit: number, total: number): number | undefined {
  const nextSkip = skip + limit;
  return nextSkip < total ? nextSkip : undefined;
}
