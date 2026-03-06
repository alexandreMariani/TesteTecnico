import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export type SortOption = "none" | "title-asc" | "title-desc" | "price-asc" | "price-desc";

interface OrderBarProps {
    sortOrder: SortOption;
    setSortOrder: (order: SortOption) => void;
}

export const OrderBar: React.FC<OrderBarProps> = ({ sortOrder, setSortOrder }) => {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id="order-label">Ordenar Por</InputLabel>
            <Select
                labelId="order-label"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOption)}
                label="Ordenar Por"
            >
                <MenuItem value="none">Padrão</MenuItem>
                <MenuItem value="title-asc">Nome (A-Z)</MenuItem>
                <MenuItem value="title-desc">Nome (Z-A)</MenuItem>
                <MenuItem value="price-asc">Preço (Menor → Maior)</MenuItem>
                <MenuItem value="price-desc">Preço (Maior → Menor)</MenuItem>
            </Select>
        </FormControl>
    );
};
