import type { CustomerStatus } from "../../../enums/customer-status.enum";

export interface GetAllCustomerResponseDto {
  id?: number;
  userId?: number;
  name: string;
  status: CustomerStatus;
  businessNumber: string;
  representativeName: string;
  telephone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}