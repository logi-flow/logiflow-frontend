import type { Fuel } from "../../../enums/fuel.enum";

export interface UpdateVehicleRequestDto {
    vehicleNumber: string;
    capacity: number;
    fuel: Fuel;
    mileage: number;
    modelName: string;
    modelYear: number;
}