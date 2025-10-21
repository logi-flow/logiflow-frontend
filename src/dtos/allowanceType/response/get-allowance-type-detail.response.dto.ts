export interface GetAllowanceTypeDetailResponseDto {
  id: number;
  code: string;
  name: string;
  description: string | null;
  active: boolean;

  createdAt: string;
  updatedAt: string;
}