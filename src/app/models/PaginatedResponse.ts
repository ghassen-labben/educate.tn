export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  pageNumber: number;
  totalElements: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
