"use client";

import React, { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress, Alert, Button, Card, CardMedia, CardContent, Divider, Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { getProductById } from "@/services/api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(params.id);
                setProduct(data);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar os detalhes do produto.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={60} />
            </Container>
        );
    }

    if (error || !product) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Alert severity="error">{error || "Produto não encontrado."}</Alert>
                <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mt: 2 }}>
                    Voltar para o Catálogo
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => router.back()}
                sx={{ mb: 4, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
                Voltar para o Catálogo
            </Button>

            <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, borderRadius: 3, boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}>
                <Box sx={{ width: { xs: '100%', md: '50%' }, bgcolor: '#f5f5f5', p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CardMedia
                        component="img"
                        image={product.thumbnail}
                        alt={product.title}
                        sx={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', maxHeight: 500 }}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto', p: { xs: 3, md: 5 } }}>
                        <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.5, fontWeight: 'bold' }}>
                            {product.category.replace("-", " ")}
                        </Typography>
                        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom sx={{ mt: 1, mb: 2 }}>
                            {product.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Rating value={product.rating} precision={0.1} readOnly size="large" />
                            <Typography variant="body1" color="text.secondary" sx={{ ml: 1, fontWeight: 'medium' }}>
                                ({product.rating.toFixed(2)})
                            </Typography>
                        </Box>

                        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                            ${product.price.toFixed(2)}
                        </Typography>

                        {product.discountPercentage && product.discountPercentage > 0 && (
                            <Typography variant="body1" color="success.main" fontWeight="medium" sx={{ mb: 3 }}>
                                Economize {product.discountPercentage}%
                            </Typography>
                        )}

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                            {product.description}
                        </Typography>

                        <Box sx={{ mt: 4, pt: 3, bgcolor: '#f9fafb', p: 3, borderRadius: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Disponibilidade
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" color={product.stock > 0 ? "success.main" : "error.main"}>
                                {product.stock > 0 ? `${product.stock} em estoque` : "Fora de estoque"}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Card>
        </Container>
    );
}
