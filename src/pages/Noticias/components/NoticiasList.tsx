import type { Noticia } from '../../../types/noticia';
import { NoticiasItem } from './NoticiasItem';

type Props = {
  items: Noticia[];
  onEdit: (item: Noticia) => void;
  onDelete: (id: string) => void;
};

export function NoticiasList({ items, onEdit, onDelete }: Props) {
  if (!items.length) {
    return <p className="empty">Nenhuma notícia encontrada.</p>;
  }

  return (
    <div className="noticiasGrid">
      {items.map((item) => (
        <NoticiasItem
          key={item.id}
          item={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  );
}
