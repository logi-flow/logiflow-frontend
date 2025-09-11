export const AllowanceTypeStatus = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED"
} as const;

export type AllowanceTypeStatus = (typeof AllowanceTypeStatus) [keyof typeof AllowanceTypeStatus];