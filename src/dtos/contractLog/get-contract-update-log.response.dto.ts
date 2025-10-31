export interface GetContractUpdateLogResponseDto {
  id: number;
  contractId: number;
  customerName: string;
  businessNumber: string;
  representativeName: string;
  changedByUsername: string;
  type: string;
  prevData: string;
  newData: string;
  createdAt: string;
}