import type { UserRole } from "../../../enums/user-role.enum";

export interface UpdateUserRoleResponseDto {
  id?: number;
  role: UserRole;
  changedBy: number;
  changedByUsername: string;
  changedReason: string;
  prevRole: UserRole;
  newRole: UserRole;
  createdAt: string;
  updatedAt: string
}