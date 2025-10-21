export const DriverPayrollStatus = {
  CREATED: "CREATED",
  CONFIRMED: "CONFIRMED",
  DELETED: "DELETED"
} as const;

export type DriverPayrollStatus = (typeof DriverPayrollStatus) [keyof typeof DriverPayrollStatus];

export const payrollStatusMap: Record<DriverPayrollStatus, string> = {
  [DriverPayrollStatus.CREATED]: "작성 중",
  [DriverPayrollStatus.CONFIRMED]: "확정",
  [DriverPayrollStatus.DELETED]: "삭제"
};

export const payrollStatusColorMap: Record<DriverPayrollStatus, "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default"> = {
  [DriverPayrollStatus.CREATED]: "info",
  [DriverPayrollStatus.CONFIRMED]: "success",
  [DriverPayrollStatus.DELETED]: "error"
};