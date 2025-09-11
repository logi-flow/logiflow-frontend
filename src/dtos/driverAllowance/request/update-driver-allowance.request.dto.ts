export interface UpdateDriverAllowanceRequestDto {
  items: UpdateDriverAllowanceRequestDtoItem[];
}

export interface UpdateDriverAllowanceRequestDtoItem {
  id: number;
  quantity: number;
  unitPrice: number;
  memo?: string;
}