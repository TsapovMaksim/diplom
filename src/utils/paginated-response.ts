export default function paginatedReponse<T>(
  items: T[],
  { total, pageSize, page }: { total: number; pageSize: number; page: number }
) {
  const lastPage = Math.ceil(total / pageSize);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  return {
    total,
    page,
    nextPage,
    content: items,
  };
}
