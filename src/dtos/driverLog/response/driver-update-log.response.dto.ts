export interface DriverLicenseLogResponseDto {
    id: number;
    username: string;
    changedByUsername: string;
    type: string;
    prevData: string;
    newData: string;

    createdAt: number;
}