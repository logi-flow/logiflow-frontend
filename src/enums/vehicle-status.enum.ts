export const VehicleStatus = {
  AVAILABLE: "AVAILABLE",
  IN_USE: "IN_USE",
  UNDER_MAINTENANCE: "UNDER_MAINTENANCE",
  DELETED: "DELETED"
} as const;

export type VehicleStatus = (typeof VehicleStatus) [keyof typeof VehicleStatus];