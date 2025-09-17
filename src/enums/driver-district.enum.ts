export const DriverDistrict = {
    JUNG: "JUNG",
    SEO: "SEO",
    DONG: "DONG",
    YEONGDO: "TEONGDO",
    JIN: "JIN",
    NAM: "NAM",
    BUK: "BUK",
    HAEUNDAE: "HAEUNDAE",
    SAHA: "SAHA",
    GEUMJUNG: "GEUMJUNG",
    GANGSEO: "GANGSEO",
    YEONJE: "YEONJE",
    SUYEONG: "SUYEONG",
    SASANG: "SASANG",
    GIJANG: "GIJANG"
} as const;

export type DriverDistrict = (typeof DriverDistrict) [keyof typeof DriverDistrict];