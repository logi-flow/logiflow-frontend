export interface CreateDriverDeductionRequestDto {
  deductionTypeId: number;
  quantity: number;
  unitPrice: number;
  memo?: string;
}