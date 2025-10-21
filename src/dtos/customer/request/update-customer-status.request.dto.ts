import type { CustomerStatus } from "../../../enums/customer-status.enum";

export interface UpdateCustomerStatusRequestDto {
  status: CustomerStatus;
  changedReason: string;
}