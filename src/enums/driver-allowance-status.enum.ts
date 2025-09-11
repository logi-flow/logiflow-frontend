export const DriverAllowanceStatus = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED"
} as const;

export type DriverAllowanceStatus = (typeof DriverAllowanceStatus) [keyof typeof DriverAllowanceStatus];