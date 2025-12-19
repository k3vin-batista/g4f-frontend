import './Noticias.css';
import { useNoticias } from './hooks/useNoticias';
import { NoticiasForm } from './components/NoticiasForm';
import { NoticiasList } from './components/NoticiasList';
import { NoticiasPagination } from './components/NoticiasPagination';
import { NoticiasError } from './components/NoticiasError';

export function Noticias() {
  const { items, page, limit, total, loading, error, editing, setPage, setEditing, save, remove } =
    useNoticias();

  return (
    <section className="noticiasPage">
      <header>
        <h1>Notícias</h1>
      </header>

      <NoticiasForm
        editing={editing}
        loading={loading}
        onSave={save}
        onCancel={() => setEditing(null)}
      />

      {error && <NoticiasError message={error} />}

      <NoticiasList items={items} onEdit={setEditing} onDelete={remove} />

      <NoticiasPagination page={page} total={total} limit={limit} onChange={setPage} />
    </section>
  );
}
