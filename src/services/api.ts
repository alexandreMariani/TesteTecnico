import { ProductsResponse } from "@/types";

const BASE_URL = "https://dummyjson.com";

export const getProducts = async (limit: number, skip: number, category?: string, searchQuery?: string): Promise<ProductsResponse> => {
    let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

    if (searchQuery) {
        url = `${BASE_URL}/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
    } else if (category && category !== "all") {
        url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

export const getCategories = async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
};
