export const DriverStatus = {
  WORKING: "WORKING",
  ON_LEAVE: "ON_LEAVE",
  RETIRED: "RETIRED"
} as const;

export type DriverStatus = (typeof DriverStatus) [keyof typeof DriverStatus];

export const driverStatusMap: Record<DriverStatus, string> = {
  [DriverStatus.WORKING]: "재직중",
  [DriverStatus.ON_LEAVE]: "휴가중",
  [DriverStatus.RETIRED]: "퇴사",
};

export const driverStatusColorMap: Record<DriverStatus, "success" | "warning" | "error"> = {
  [DriverStatus.WORKING]: "success",
  [DriverStatus.ON_LEAVE]: "warning",
  [DriverStatus.RETIRED]: "error",
};