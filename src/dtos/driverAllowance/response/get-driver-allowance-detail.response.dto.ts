export interface GetDriverAllowanceDetailResponseDto {
  id: number;
  allowanceTypeId: number;
  allowanceTypeCode: string;
  allowanceTypeName: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  memo: string | null;

  createdAt: string;
  updatedAt: string;
}