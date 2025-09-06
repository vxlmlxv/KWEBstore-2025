import type { Product, ProductsResponse, Category } from "../types";

const BASE_URL = "https://dummyjson.com";

export const api = {
  // 모든 상품 가져오기 (무한 스크롤용)
  getAllProducts: async (limit = 8, skip = 0): Promise<ProductsResponse> => {
    const response = await fetch(
      `${BASE_URL}/products?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  },

  // 상품 검색
  searchProducts: async (
    query: string,
    sortBy?: string,
    order?: string
  ): Promise<ProductsResponse> => {
    let url = `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`;
    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to search products");
    return response.json();
  },

  // 카테고리별 상품 가져오기
  getProductsByCategory: async (
    category: string,
    sortBy?: string,
    order?: string
  ): Promise<ProductsResponse> => {
    let url = `${BASE_URL}/products/category/${category}`;
    if (sortBy && order) {
      url += `?sortBy=${sortBy}&order=${order}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch products by category");
    return response.json();
  },

  // 단일 상품 가져오기
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return response.json();
  },

  // 카테고리 목록 가져오기
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },
};
