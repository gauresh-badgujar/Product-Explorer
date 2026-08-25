import type { Product, ProductsResponse } from "./types";

export async function fetchProducts(): Promise<ProductsResponse> {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }
  return res.json();
}

export async function fetchProductsByCategory(category: string): Promise<ProductsResponse> {
  const res = await fetch(
    `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch related products: ${res.status}`);
  }
  return res.json();
}
