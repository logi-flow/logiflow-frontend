export interface CreateContractRequestDto {
  startDate: string;
  endDate: string;
  baseFee: number;
  weightLimitKg: number;
  parcelLimit: number;
  overWeightFeePerKg: number;
  overParcelFee: number;
  specialTerms?: string;
}