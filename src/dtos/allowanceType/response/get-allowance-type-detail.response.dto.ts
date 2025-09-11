export interface GetAllowanceTypeDetailResponseDto {
  id: number;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}