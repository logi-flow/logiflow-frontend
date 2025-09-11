export interface UpdateDriverAllowanceResponseDto {
  id: number;
  allowanceTypeCode: string;
  allowanceTypeName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  memo: string | null;

  createdAt: string;
  updatedAt: string;
}