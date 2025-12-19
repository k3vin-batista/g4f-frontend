import { httpClient } from './httpClient';
import type { Noticia, PaginatedResponse } from '../types/noticia';

export async function fetchNoticias(page: number, limit: number) {
  const response = await httpClient.get<PaginatedResponse<Noticia>>('/noticias', {
    params: { page, limit },
  });

  return response.data;
}

export async function createNoticia(payload: Omit<Noticia, 'id'>) {
  const response = await httpClient.post<Noticia>('/noticias', payload);
  return response.data;
}

export async function updateNoticia(id: string, payload: Omit<Noticia, 'id'>) {
  const response = await httpClient.put<Noticia>(`/noticias/${id}`, payload);
  return response.data;
}

export async function deleteNoticia(id: string) {
  await httpClient.delete(`/noticias/${id}`);
}
