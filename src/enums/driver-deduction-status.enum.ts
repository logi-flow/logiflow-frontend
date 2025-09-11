export const DriverDeductionStatus = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED"
} as const;

export type DriverDeductionStatus = (typeof DriverDeductionStatus) [keyof typeof DriverDeductionStatus];