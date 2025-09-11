export interface DeductionItemDto {
  id: number;
  deductionTypeId: number;
  deductionTypeCode: string;
  deductionTypeName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  memo: string | null;

  createdAt: string;
  updatedAt: string;
}