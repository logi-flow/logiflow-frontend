import type { AllowanceTypeStatus } from "../../../enums/allowance-type-status.enum";

export interface CreateAllowanceTypeResponseDto {
  id: number;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  status: AllowanceTypeStatus;

  createdAt: string;
  updatedAt: string;
}