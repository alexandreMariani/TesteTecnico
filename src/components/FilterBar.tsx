import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface FilterBarProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <FormControl fullWidth variant="outlined" sx={{ mb: { xs: 2, md: 0 } }}>
            <InputLabel id="category-filter-label">Categoria</InputLabel>
            <Select
                labelId="category-filter-label"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as string)}
                label="Categoria"
            >
                <MenuItem value="all">Todas as Categorias</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category} value={category} sx={{ textTransform: 'capitalize' }}>
                        {category}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
