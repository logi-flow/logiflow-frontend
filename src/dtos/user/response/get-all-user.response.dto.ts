import type { UserRole } from "../../../enums/user-role.enum";
import type { UserStatus } from "../../../enums/user-status.enum";

export interface GetAllUserResponseDto {
  id?: number;
  username: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string
}