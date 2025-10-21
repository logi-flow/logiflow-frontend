import type { UserStatus } from "../../../enums/user-status.enum";

export interface UpdateUserStatusRequestDto {
  status: UserStatus;
  changedReason: string;
}