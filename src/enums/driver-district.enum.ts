export const DriverDistrict = {
    JUNG: "JUNG",
    SEO: "SEO",
    DONG: "DONG",
    YEONGDO: "YEONGDO",
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

export const driverDistrictMap: Record<DriverDistrict, string> = {
    [DriverDistrict.JUNG]: "중구",
    [DriverDistrict.SEO]: "서구",
    [DriverDistrict.DONG]: "동구",
    [DriverDistrict.YEONGDO]: "영도구",
    [DriverDistrict.JIN]: "부산진구",
    [DriverDistrict.NAM]: "남구",
    [DriverDistrict.BUK]: "북구",
    [DriverDistrict.HAEUNDAE]: "해운대구",
    [DriverDistrict.SAHA]: "사하구",
    [DriverDistrict.GEUMJUNG]: "금정구",
    [DriverDistrict.GANGSEO]: "강서구",
    [DriverDistrict.YEONJE]: "연제구",
    [DriverDistrict.SUYEONG]: "수영구",
    [DriverDistrict.SASANG]: "사상구",
    [DriverDistrict.GIJANG]: "기장군",
};