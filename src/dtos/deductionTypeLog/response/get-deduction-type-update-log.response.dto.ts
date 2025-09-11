export interface GetDeductionTypeUpdateLogResponseDto {
  id: number;
  code: string;
  type: string;
  prevData: string;
  newData: string;
  changedByUsername: string;

  createdAt: string;
}