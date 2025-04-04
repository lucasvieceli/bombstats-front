export interface IPaginate<T> {
  items: T[];
  meta: IPaginationMeta;
}

export interface IPaginationMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginateOptions {
  page?: number;
  limit?: number;
  orderBy?: unknown;
  order?: IPaginateOrderBy;
}
export type IPaginateOrderBy = "ASC" | "DESC";
