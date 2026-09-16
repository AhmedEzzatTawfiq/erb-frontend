'use client';

import React from 'react';
import Pagination from '@/components/shared/Pagination';

interface OrderPaginationProps {
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function OrderPagination(props: OrderPaginationProps) {
  return <Pagination {...props} entityLabel="orders" />;
};
