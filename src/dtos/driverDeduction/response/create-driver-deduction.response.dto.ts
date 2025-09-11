import type { DriverDeductionStatus } from "../../../enums/driver-deduction-status.enum";

export interface CreateDriverDeductionResponseDto {
  id: number;
  deductionTypeCode: string;
  deductionTypeName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  memo: string | null;
  status: DriverDeductionStatus;

  createdAt: string;
  updatedAt: string;
}