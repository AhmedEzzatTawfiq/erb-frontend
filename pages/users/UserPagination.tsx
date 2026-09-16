'use client';

import React from 'react';
import Pagination from '@/components/shared/Pagination';

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  totalFilteredCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function UserPagination(props: UserPaginationProps) {
  return <Pagination {...props} entityLabel="results" />;
};
