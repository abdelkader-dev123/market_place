import { describe, expect, it } from "@jest/globals";

import {
  buildProductsEndpoint,
  getNextSkip,
  normalizeQueryValue,
} from "@/features/products/utils";

describe("products utils", () => {
  it("normalizes optional query values", () => {
    expect(normalizeQueryValue("  phone  ")).toBe("phone");
    expect(normalizeQueryValue("   ")).toBeUndefined();
    expect(normalizeQueryValue(undefined)).toBeUndefined();
  });

  it("builds search endpoint when search exists", () => {
    expect(
      buildProductsEndpoint({ limit: 12, skip: 0, search: "iphone" }),
    ).toBe("/products/search");
  });

  it("builds category endpoint when category exists", () => {
    expect(
      buildProductsEndpoint({ limit: 12, skip: 0, category: "smartphones" }),
    ).toBe("/products/category/smartphones");
  });

  it("builds default products endpoint when no filters", () => {
    expect(buildProductsEndpoint({ limit: 12, skip: 0 })).toBe("/products");
  });

  it("returns next skip only if more records exist", () => {
    expect(getNextSkip(0, 12, 30)).toBe(12);
    expect(getNextSkip(24, 12, 30)).toBeUndefined();
  });
});
