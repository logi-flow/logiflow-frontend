import type { VehicleStatus } from "../../../enums/vehicle-status.enum";

export interface UpdateVehicleStatusRequestDto {
    status: VehicleStatus;
    changeReason: string;
}