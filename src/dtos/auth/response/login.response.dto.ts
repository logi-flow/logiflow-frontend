import type { UserRole } from "../../../enums/user-role.enum";

export interface LoginResponseDto {
  mustChangePassword: boolean;
  token: string;
  exprTime: number;
  id?: number;
  role: UserRole;
  username: string;
  name: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}