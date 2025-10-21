import type { UserRole } from "../../../enums/user-role.enum";

export interface UpdateUserRoleRequestDto {
  role: UserRole;
  changedReason: string;
}