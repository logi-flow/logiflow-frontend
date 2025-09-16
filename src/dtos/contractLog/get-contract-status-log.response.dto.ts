export interface GetContractStatusLogResponseDto {
  id: number;
  customerName: string;
  businessNumber: string;
  representativeName: string;
  changedByUsername: string;
  changeReason: string;
  prevStatus: string;
  newStatus: string;
  createdAt: string;
}