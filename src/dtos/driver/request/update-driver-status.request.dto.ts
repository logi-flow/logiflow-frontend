import type { DriverStatus } from "../../../enums/driver-status.enum";

export interface UpdateDriverStatusRequestDto {
    status: DriverStatus;
    changeReason: string;
}