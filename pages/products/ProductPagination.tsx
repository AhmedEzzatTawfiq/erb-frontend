'use client';

import React from 'react';
import Pagination from '@/components/shared/Pagination';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination(props: ProductPaginationProps) {
  return <Pagination {...props} entityLabel="products" />;
};
