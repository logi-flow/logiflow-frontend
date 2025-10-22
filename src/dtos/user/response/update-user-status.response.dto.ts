import type { UserStatus } from "../../../enums/user-status.enum";

export interface UpdateUserStatusResponseDto {
  id?: number;
  role: UserStatus;
  changedBy: number;
  changedByUsername: string;
  changedReason: string;
  prevStatus: UserStatus;
  newStatus: UserStatus;
  createdAt: string;
  updatedAt: string
}