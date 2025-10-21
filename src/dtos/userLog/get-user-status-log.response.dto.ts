import type { UserStatus } from "../../enums/user-status.enum";

export interface GetUserStatusLogResponseDto {
  id: number;
  userId: number;
  username: string;
  changeReason: string;
  prevStatus: UserStatus;
  newStatus: UserStatus;
  createdAt: string;
}