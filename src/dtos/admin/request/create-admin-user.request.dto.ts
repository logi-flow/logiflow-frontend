import type { UserRole } from "../../../enums/user-role.enum";
import type { UserStatus } from "../../../enums/user-status.enum";

export interface CreateAdminUserRequestDto {
  username: string;
  password: string;
  role: UserRole;
  stauts: UserStatus;
}