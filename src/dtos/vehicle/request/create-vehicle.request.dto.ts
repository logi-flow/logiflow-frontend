import type { Fuel } from "../../../enums/fuel.enum";
import type { VehicleStatus } from "../../../enums/vehicle-status.enum";

export interface CreateVehicleRequestDto {
    vehicleNumber: string;
    capacity: number;
    fuel: Fuel;
    mileage: number;
    status: VehicleStatus;
    modelName: string;
    modelYear: number;
}