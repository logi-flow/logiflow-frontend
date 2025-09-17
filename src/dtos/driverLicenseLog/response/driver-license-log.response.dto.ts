export interface DriverLicenseLogResponseDto {
    id: number;
    driverName: string;
    licenseNumber: string;
    changedByUsername: string;
    type: string;
    prevData: string;
    newData: string;

    createdAt: number;
}