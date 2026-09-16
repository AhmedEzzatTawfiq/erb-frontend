'use client';

import React from 'react';
import Pagination from '@/components/shared/Pagination';

interface SupplierPaginationProps {
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function SupplierPagination(props: SupplierPaginationProps) {
  return <Pagination {...props} entityLabel="suppliers" />;
};
