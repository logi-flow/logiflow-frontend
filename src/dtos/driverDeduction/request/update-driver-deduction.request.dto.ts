export interface UpdateDriverDeductionRequestDto {
  items: UpdateDriverDeductionRequestDtoItem[];
}

export interface UpdateDriverDeductionRequestDtoItem {
  id: number;
  quantity: number;
  unitPrice: number;
  memo?: string;
}