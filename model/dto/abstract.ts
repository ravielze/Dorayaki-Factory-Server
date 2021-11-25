export interface PaginationResult<T> {
    page: number;
    maxPage: number;
    itemPerPage: number;
    totalItems: number;
    items: T[];
}
