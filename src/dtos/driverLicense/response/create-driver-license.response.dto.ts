export interface CreateDriverLicenseResponseDto {
    driverLicenseId: number;
    name: string;
    dirverNumber: string;
    expiredDate: string;

    createdAt: number;
    updatedAt: number;
}