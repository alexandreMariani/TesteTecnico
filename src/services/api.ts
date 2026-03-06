import { Product, ProductsResponse, Category } from "@/types";

const BASE_URL = "https://dummyjson.com";

export const getProducts = async (
    limit: number,
    skip: number,
    category?: string,
    searchQuery?: string,
    sortBy?: string,
    order?: string
): Promise<ProductsResponse> => {
    let url = new URL(`${BASE_URL}/products`);

    if (searchQuery) {
        url = new URL(`${BASE_URL}/products/search`);
        url.searchParams.append("q", searchQuery);
    } else if (category && category !== "all") {
        url = new URL(`${BASE_URL}/products/category/${category}`);
    }

    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("skip", skip.toString());

    if (sortBy && sortBy !== "none") {
        url.searchParams.append("sortBy", sortBy);
        url.searchParams.append("order", order || "asc");
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

export const getCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
};

export const getProductById = async (id: string): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch product details");
    }
    return response.json();
};
