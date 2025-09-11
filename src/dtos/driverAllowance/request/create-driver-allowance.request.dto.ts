export interface CreateDriverAllowanceRequestDto {
  allowanceTypeId: number;
  quantity: number;
  unitPrice: number;
  memo?: string;
}