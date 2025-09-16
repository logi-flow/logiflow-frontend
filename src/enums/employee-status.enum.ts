export const EmployeeStatus = {
  WORKING: "WORKING",
  ON_LEAVE: "ON_LEAVE",
  RETIRED: "RETIRED"
} as const;

export type EmployeeStatus = (typeof EmployeeStatus) [keyof typeof EmployeeStatus];