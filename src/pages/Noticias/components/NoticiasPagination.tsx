type Props = {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
};

export function NoticiasPagination({ page, total, limit, onChange }: Props) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Anterior
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Próxima
      </button>
    </div>
  );
}
