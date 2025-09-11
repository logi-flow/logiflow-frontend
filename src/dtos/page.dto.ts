export default interface PageDto<T = any> {
  content: T[];
  
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;

  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;

  sort: string;
}