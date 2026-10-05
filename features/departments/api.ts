
import { api } from '@/lib/axios';
import { Department } from './types';

export async function getDepartments(): Promise<Department[]> {
  const response = await api.get('/departments');

  return response.data;
}