import React from 'react';
import { Box, Pagination } from '@mui/material';

interface PaginationBarProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const PaginationBar: React.FC<PaginationBarProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    if (pageCount <= 1) return null;

    return (
        <Box sx={{ display: 'flex', justifyItems: 'center', justifyContent: 'center', mt: 4, mb: 4 }}>
            <Pagination
                count={pageCount}
                page={currentPage}
                onChange={onPageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
            />
        </Box>
    );
};
