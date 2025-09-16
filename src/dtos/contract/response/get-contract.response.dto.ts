export interface GetContractResponseDto {
  id: number;
  customerId: number;
  status: string;
  startDate: string;
  endDate: string;
  baseFee: number;
  weightLimitKg: number;
  parcelLimit: number;
  overWeightFeePerKg: number;
  overParcelFee: number;
  specialTerms: string;
  createdAt: string;
  updatedAt: string;
}