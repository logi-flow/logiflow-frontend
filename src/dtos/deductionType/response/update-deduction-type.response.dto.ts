import type { DeductionTypeStatus } from "../../../enums/deduction-type-status.enum";

export interface UpdateDeductionTypeResponseDto {
  id: number;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  status: DeductionTypeStatus;
  
  createdAt: string;
  updatedAt: string;
}