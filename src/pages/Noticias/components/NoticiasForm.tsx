import { useEffect, useState } from 'react';
import type { Noticia } from '../../../types/noticia';

type Props = {
  editing: Noticia | null;
  loading: boolean;
  onSave: (payload: Omit<Noticia, 'id'>) => void;
  onCancel: () => void;
};

export function NoticiasForm({ editing, loading, onSave, onCancel }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (editing) {
      setTitulo(editing.titulo);
      setDescricao(editing.descricao);
    } else {
      setTitulo('');
      setDescricao('');
    }
  }, [editing]);

  const submit = () => {
    if (!titulo.trim() || !descricao.trim()) {
      alert('Título e descrição são obrigatórios.');
      return;
    }

    onSave({ titulo, descricao });
  };

  return (
    <div className="noticiaForm">
      <h2>{editing ? 'Editar notícia' : 'Nova notícia'}</h2>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        disabled={loading}
      />

      <textarea
        placeholder="Descrição"
        rows={4}
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        disabled={loading}
      />

      <div className="formActions">
        <button onClick={submit} disabled={loading}>
          Salvar
        </button>

        {editing && (
          <button className="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
