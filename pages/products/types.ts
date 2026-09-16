export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'Networking' | 'Hardware' | 'Storage' | 'Peripherals' | 'Electronics';
  price: number;
  stock: number;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  image?: string;
  description?: string;
}
