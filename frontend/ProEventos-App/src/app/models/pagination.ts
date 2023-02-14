
export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItem: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result?: T;
  pagination?: Pagination;
}
