import type { VehicleStatus } from "../../../enums/vehicle-status.enum";

export interface GetAllVehicleRseponseDto {
    vehicleId: number;
    vehicleNumber: string;
    status: VehicleStatus;
    modelName: string;

    createdAt: string;
    updatedAt: string;
}