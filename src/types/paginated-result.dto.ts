export class PaginatedResultDto<T> {
  constructor(data: Array<T>, page: number, total: number, count: number) {
    this.data = data;
    this.page = page;
    this.total = total;
    this.count = count;
  }

  data: Array<T>;
  page: number;
  total: number;
  count: number;
}