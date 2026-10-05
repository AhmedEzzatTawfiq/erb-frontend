import { api } from '@/lib/axios';
import {
  InvoiceApi,
  InvoicesResponse,
  GetInvoicesParams,
  UpdateInvoiceStatusInput,
} from './types';

export async function getInvoices(params: GetInvoicesParams = {}): Promise<InvoicesResponse> {
  const response = await api.get('/invoices', { params });
  const resData = response.data;
  if (Array.isArray(resData)) {
    return {
      data: resData,
      meta: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        totalCount: resData.length,
        total: resData.length,
        totalPages: 1,
      },
    };
  }
  return resData;
}

export async function getInvoice(id: string): Promise<InvoiceApi> {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
}

export async function updateInvoiceStatus({
  id,
  data,
}: {
  id: string;
  data: UpdateInvoiceStatusInput;
}): Promise<InvoiceApi> {
  const response = await api.patch(`/invoices/${id}/status`, data);
  return response.data;
}
