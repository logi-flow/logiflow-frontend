import type { DriverAllowanceStatus } from "../../../enums/driver-allowance-status.enum";

export interface CreateDriverAllowanceResponseDto {
  id: number;
  allowanceTypeCode: string;
  allowanceTypeName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  memo: string | null;
  status: DriverAllowanceStatus;

  createdAt: string;
  updatedAt: string;
}