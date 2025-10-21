import type { Fuel } from "../../../enums/fuel.enum";
import type { VehicleStatus } from "../../../enums/vehicle-status.enum";

export interface GetVehicleDetailRseponseDto {
    vehicleId: number;
    vehicleNumber: string;
    capacity: number;
    fuel: Fuel;
    mileage: number;
    status: VehicleStatus;
    modelName: string;
    modelYear: number;

    createdAt: string;
    updatedAt: string;
}