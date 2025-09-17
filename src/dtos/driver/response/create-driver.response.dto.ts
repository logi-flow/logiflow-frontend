export interface CreateDriverResponseDto {
    driverId: number;
    name: string;
    email: string;
    username: string;
    password: string;

    createdAt: string;
    updatedAt: string;
}