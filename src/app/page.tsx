"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Product, Category } from "@/types";
import { getProducts, getCategories } from "@/services/api";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { OrderBar, SortOption } from "@/components/OrderBar";
import { PaginationBar } from "@/components/PaginationBar";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);


  // State for filters, search, pagination, and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<SortOption>("none");
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ITEMS_PER_PAGE = 10;

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const skip = (page - 1) * ITEMS_PER_PAGE;
        let sortByParam = "none";
        let orderParam = "asc";

        if (sortOrder === "title-asc") { sortByParam = "title"; orderParam = "asc" }
        if (sortOrder === "title-desc") { sortByParam = "title"; orderParam = "desc" }
        if (sortOrder === "price-asc") { sortByParam = "price"; orderParam = "asc" }
        if (sortOrder === "price-desc") { sortByParam = "price"; orderParam = "desc" }

        const response = await getProducts(ITEMS_PER_PAGE, skip, selectedCategory, searchQuery, sortByParam, orderParam);
        setProducts(response.products);
        setTotalItems(response.total);
      } catch (err) {
        console.error("Error fetching products", err);
        setError("Não foi possível carregar os produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedCategory, searchQuery, sortOrder]);

  const handleSearch = () => {
    setPage(1); // will trigger useEffect
  };

  const handleFilterChange = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1); // reset to page 1 on category change
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOrder(sort);
    setPage(1); // reset to page 1 to sort globally
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
          <Grid size={{ xs: 12, md: 4 }}>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={handleFilterChange}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <OrderBar
              sortOrder={sortOrder}
              setSortOrder={handleSortChange}
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
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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
