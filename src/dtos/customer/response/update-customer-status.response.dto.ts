import type { CustomerStatus } from "../../../enums/customer-status.enum";

export interface UpdateCustomerStatusResponseDto {
  id?: number;
  status: CustomerStatus;
  changedBy: string;
  changedByUsername: string;
  changedReason: string;
  prevStatus: CustomerStatus;
  newStatus: CustomerStatus;
  createdAt: string;
  updatedAt: string;
}