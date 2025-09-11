import type { DriverJoinLeavePoint } from "./driver-join-leave-point";

export interface GetDriverJoinLeaveResponseDto {
  from: string;
  to: string;
  points: DriverJoinLeavePoint[];
}