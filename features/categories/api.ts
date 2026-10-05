import { api } from '@/lib/axios';
import { Category } from './types';

export async function getCategories(): Promise<Category[]> {
  const response = await api.get('/categories');
  return response.data;
}

export async function createCategory(name: string): Promise<Category> {
  const response = await api.post('/categories', { name });
  return response.data;
}
