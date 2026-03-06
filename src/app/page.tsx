"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Typography, Grid, Box, CircularProgress, Alert } from "@mui/material";
import { Product } from "@/types";
import { getProducts, getCategories } from "@/services/api";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { OrderBar, SortOption } from "@/components/OrderBar";
import { PaginationBar } from "@/components/PaginationBar";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // State for filters, search, pagination, and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOption>("none");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Re-fetch only when page changes here. 
  // We don't want to re-fetch on every query type immediately without user pressing Enter,
  // but we can listen to category changes here.

  useEffect(() => {
    // Reset page to 1 when changing category, then fetch
    setPage(1);
    fetchProducts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  const fetchProducts = async (currentPage = page, query = searchQuery) => {
    setLoading(true);
    setError("");
    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      const response = await getProducts(ITEMS_PER_PAGE, skip, selectedCategory, query);
      setProducts(response.products);
      setTotalItems(response.total);
    } catch (err) {
      setError("Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchProducts(1, searchQuery);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Client-side sorting for the current page items
  const sortedProducts = useMemo(() => {
    if (sortOrder === "none") return products;

    return [...products].sort((a, b) => {
      if (sortOrder === "title-asc") return a.title.localeCompare(b.title);
      if (sortOrder === "title-desc") return b.title.localeCompare(a.title);
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [products, sortOrder]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold" sx={{ mb: 4, letterSpacing: '-0.02em', color: '#1a1a1a' }}>
        Catálogo de Produtos
      </Typography>

      <Box sx={{ mb: 4, p: 3, bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <OrderBar
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : sortedProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h6" color="text.secondary">
            Nenhum resultado encontrado para o filtro e busca atuais.
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {sortedProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          <PaginationBar
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
}
