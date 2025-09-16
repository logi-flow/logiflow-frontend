import type { CustomerStatus } from "../../../enums/customer-status.enum";

export interface UpdateCustomerStatusReqeustDto {
  status: CustomerStatus;
  changedReason: string;
}