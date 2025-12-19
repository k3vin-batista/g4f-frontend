import { useCallback, useEffect, useState } from 'react';
import type { Noticia } from '../../../types/noticia';
import {
  fetchNoticias,
  createNoticia,
  updateNoticia,
  deleteNoticia,
} from '../../../services/noticias.service';

export function useNoticias() {
  const [items, setItems] = useState<Noticia[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Noticia | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchNoticias(page, limit);

      setItems(response.data);
      setTotal(response.meta.total);
    } catch {
      setError('Não foi possível carregar as notícias.');
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (payload: Omit<Noticia, 'id'>) => {
    try {
      setLoading(true);
      setError(null);

      if (editing) {
        await updateNoticia(editing.id, payload);
      } else {
        await createNoticia(payload);
      }

      setEditing(null);
      await load();
    } catch {
      setError('Erro ao salvar a notícia.');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm('Deseja excluir esta notícia?')) return;

    try {
      setLoading(true);
      await deleteNoticia(id);
      await load();
    } catch {
      setError('Erro ao excluir a notícia.');
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    page,
    limit,
    total,
    loading,
    error,
    editing,

    setPage,
    setEditing,
    save,
    remove,
  };
}
