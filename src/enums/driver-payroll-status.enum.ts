export const DriverPayrollStatus = {
  CREATED: "CREATED",
  CONFIRMED: "CONFIRMED",
  DELETED: "DELETED"
} as const;

export type DriverPayrollStatus = (typeof DriverPayrollStatus) [keyof typeof DriverPayrollStatus];