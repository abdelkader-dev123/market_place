export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  brand?: string;
  category: string;
};

export type ProductCategory = string;

export type ProductsPage = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type ProductsQuery = {
  limit: number;
  skip: number;
  search?: string;
  category?: string;
};

export type UpdateProductPayload = Partial<
  Pick<Product, "title" | "description" | "price" | "category" | "thumbnail">
>;

export type CreateProductPayload = Required<
  Pick<Product, "title" | "description" | "price" | "category" | "thumbnail">
>;
