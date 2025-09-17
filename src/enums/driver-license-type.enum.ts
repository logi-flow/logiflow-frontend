export const DriverLicenseType = {
  CLASS1: "CLASS1",
  CLASS2: "CLASS2",
  HGV: "HGV"
} as const;

export type DriverLicenseType = (typeof DriverLicenseType) [keyof typeof DriverLicenseType];