import type { CustomerStatus } from "../../enums/customer-status.enum";

export interface GetCustomerStatusLogResponseDto {
  id?: number;
  customerId?: number
  username: string;
  changedReason: string;
  prevStatus: CustomerStatus;
  newStatus: CustomerStatus;
  createdAt: string;
}