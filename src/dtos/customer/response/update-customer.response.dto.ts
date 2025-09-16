import type { CustomerStatus } from "../../../enums/customer-status.enum";

export interface UpdateCustomerResponseDto {
  id?: number;
  userId?: number;
  status: CustomerStatus;
  name: string;
  businessNumber: string;
  representativeName: string;
  businessType: string;
  businessItems: string;
  telephone: string;
  email: string;
  fax?: string;
  businessZipCode: string;
  businessAddress: string;
  businessAddressDetail?: string;
  chargePosition?: string;
  chargeDepartment?: string;
  chargeName?: string;
  chargePhone?: string;
  chargeEmail?: string;
  createdAt: string;
  updatedAt: string;
}