export const Fuel = {
  GASOLINE: "GASOLINE",
  LGP: "LGP",
  ELECTRIC: "ELECTRIC",
  DIESEL: "DIESEL"
} as const;

export type Fuel = (typeof Fuel) [keyof typeof Fuel];