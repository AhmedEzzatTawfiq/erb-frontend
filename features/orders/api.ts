import { api } from '@/lib/axios';
import {
  OrderApi,
  OrdersResponse,
  CreateOrderInput,
  UpdateOrderInput,
  UpdateOrderStatusInput,
  GetOrdersParams,
} from './types';

export async function getOrders(params: GetOrdersParams = {}): Promise<OrdersResponse> {
  const response = await api.get('/orders', { params });
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

export async function getOrder(id: string): Promise<OrderApi> {
  const response = await api.get(`/orders/${id}`);
  return response.data;
}

export async function createOrder(data: CreateOrderInput): Promise<OrderApi> {
  const response = await api.post('/orders', data);
  return response.data;
}

export async function updateOrder({
  id,
  data,
}: {
  id: string;
  data: UpdateOrderInput;
}): Promise<OrderApi> {
  const response = await api.put(`/orders/${id}`, data);
  return response.data;
}

export async function updateOrderStatus({
  id,
  data,
}: {
  id: string;
  data: UpdateOrderStatusInput;
}): Promise<OrderApi> {
  const response = await api.patch(`/orders/${id}/status`, data);
  return response.data;
}

export async function deleteOrder(id: string): Promise<void> {
  await api.delete(`/orders/${id}`);
}
