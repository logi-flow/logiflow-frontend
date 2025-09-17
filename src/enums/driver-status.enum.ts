export const DriverStatus = {
  WORKING: "WORKING",
  ON_LEAVE: "ON_LEAVE",
  RETIRED: "RETIRED"
} as const;

export type DriverStatus = (typeof DriverStatus) [keyof typeof DriverStatus];