export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered';

export interface OrderLine {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

export interface OrderCustomer {
  id: string;
  companyName: string;
  contactName: string;
  email: string | null;
  phone: string | null;
}

export interface OrderApi {
  id: string;
  customerId: string;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: string;
  shippingAddress: string;
  totalAmount: number;
  customer: OrderCustomer;
  lines: OrderLine[];
}

export interface CreateOrderInput {
  customerId: string;
  orderDate: string;
  paymentMethod: string;
  shippingAddress: string;
  lines: {
    productId: string;
    quantity: number;
    unitPrice: number;
    discount: number;
  }[];
}

export interface UpdateOrderInput {
  customerId?: string;
  orderDate?: string;
  paymentMethod?: string;
  shippingAddress?: string;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

export interface GetOrdersParams {
  status?: OrderStatus;
  customerId?: string;
  from?: string;
  to?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UseOrdersParams extends GetOrdersParams {}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalCount?: number;
  total?: number;
  totalPages: number;
}

export interface OrdersResponse {
  data: OrderApi[];
  meta: PaginationMeta;
}

