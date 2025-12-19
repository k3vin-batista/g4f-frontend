export type Noticia = {
  id: string;
  titulo: string;
  descricao: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};
