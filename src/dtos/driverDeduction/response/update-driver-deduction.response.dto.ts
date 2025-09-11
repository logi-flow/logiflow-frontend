export interface UpdateDriverDeductionResponseDto {
  id: number;
  deductionTypeCode: string;
  deductionTypeName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  memo: string | null;

  createdAt: string;
  updatedAt: string;
}