export interface GetCustomerUpdateLogResponseDto {
  id?: number;
  customerId: number;
  username: string;
  type: string;
  prevData: string;
  newData: string;
  createdAt: string;
}