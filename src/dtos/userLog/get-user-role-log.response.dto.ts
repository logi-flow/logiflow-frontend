import type { UserRole } from "../../enums/user-role.enum";

export interface GetUserRoleLogResponseDto {
  id: number;
  userId: number;
  username: string;
  changeReason: string;
  prevRole: UserRole;
  newRole: UserRole;
  createdAt: string;
}