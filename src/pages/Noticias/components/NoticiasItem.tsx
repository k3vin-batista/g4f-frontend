import type { Noticia } from '../../../types/noticia';

type Props = {
  item: Noticia;
  onEdit: () => void;
  onDelete: () => void;
};

export function NoticiasItem({ item, onEdit, onDelete }: Props) {
  return (
    <article className="noticiaCard">
      <h3>{item.titulo}</h3>
      <p>{item.descricao}</p>

      <div className="cardActions">
        <button onClick={onEdit}>Editar</button>
        <button className="danger" onClick={onDelete}>
          Excluir
        </button>
      </div>
    </article>
  );
}
