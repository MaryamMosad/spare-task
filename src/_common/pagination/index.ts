import { PaginationDto } from "./pagination-type";

export const paginateConditions = (reqQuery) => {
  const page = +(reqQuery.page as string) || 1;
  const limit = +(reqQuery.limit as string) || 10;

  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
};

export const transformResponse = <T>(
  response: { rows: T[]; count: number },
  paginate: PaginationDto
) => {
  return {
    totalCount: response.count,
    page: paginate.page,
    limit: paginate.limit,
    data: response.rows,
  };
};
