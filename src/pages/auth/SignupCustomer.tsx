import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Stack,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Typography,
  LinearProgress,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { CustomerSignUpRequestDto } from "../../dtos/auth/request/customer-sign-up.request.dto";
import {
  Signup,
  checkBusinessNumberDuplicate,
  checkEmailDuplicate,
  checkLoginIdDuplicate,
} from "../../apis/auth/auth.apis";

const REGEX = {
  USERNAME: /^[a-zA-Z][a-zA-Z0-9]{4,11}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~!@#$%^&*()\-_=+])[A-Za-z0-9~!@#$%^&*()\-_=+]{8,15}$/,
  NAME_KOREAN: /^[가-힣]{2,10}$/,
  BUSINESS_NUMBER: /^([0-9]{3})-([0-9]{2})-([0-9]{5})$/,
  TELEPHONE: /^([0-9]{2,3})-([0-9]{3,4})-([0-9]{4})$/,
  PHONE_NUMBER: /^(01[0-9])[ -]?([0-9]{3,4})[ -]?([0-9]{4})$/,
  EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
  EMAIL_LOCAL: /^[A-Za-z0-9._%+-]+$/,
  EMAIL_DOMAIN: /^[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
  ZIPCODE: /^\d{5}$/,
  ADDRESS: /^[가-힣a-zA-Z0-9\s\-,]{5,100}$/,
  ADDRESS_DETAIL: /^[가-힣a-zA-Z0-9\s\-\.,/#]{1,100}$/,
  BUSINESS: /^[가-힣a-zA-Z0-9\s·&/()\-,]{1,50}$/,
  FAX: /^(0\d{1,2})-(\d{3,4})-(\d{4})$/,
};

const initial: CustomerSignUpRequestDto = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  businessNumber: "",
  name: "",
  representativeName: "",
  businessType: "",
  businessItems: "",
  telephone: "",
  fax: "", 
  businessZipCode: "",
  businessAddress: "",
  businessAddressDetail: "",
  chargePosition: "",
  chargeDepartment: "",
  chargeName: "",
  chargePhone: "",
  chargeEmail: "",
};

type DupState = { state: "idle" | "checking" | "available" | "taken" | "error"; message?: string };

const isSuccess = (res: any) =>
  res?.code === "SUCCESS" ||
  res?.code === 200 ||
  res?.success === true ||
  res?.ok === true ||
  (typeof res?.status === "number" ? res.status >= 200 && res.status < 300 : true);

const getExists = (res: any): boolean => {
  if (typeof res?.data?.exists === "boolean") return res.data.exists;
  if (typeof res?.exists === "boolean") return res.exists;
  if (typeof res?.data?.available === "boolean") return !res.data.available;
  return false;
};

const sanitize = (v?: string | null) => {
  const t = (v ?? "").trim();
  return t.length ? t : null;
};

export default function SignupCustomer() {
  const [dto, setDto] = useState<CustomerSignUpRequestDto>(initial);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const [bizParts, setBizParts] = useState({ p1: "", p2: "", p3: "" });
  const [telParts, setTelParts] = useState({ p1: "", p2: "", p3: "" });
  const [emailParts, setEmailParts] = useState({ local: "", domain: "" });

  const [usernameDup, setUsernameDup] = useState<DupState>({ state: "idle" });
  const [emailDup, setEmailDup] = useState<DupState>({ state: "idle" });
  const [bizDup, setBizDup] = useState<DupState>({ state: "idle" });

  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onChange =
    (key: keyof CustomerSignUpRequestDto) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setDto((prev) => ({ ...prev, [key]: value }));
      if (key === "username") setUsernameDup({ state: "idle" });
      if (key === "email") setEmailDup({ state: "idle" });
      if (key === "businessNumber") setBizDup({ state: "idle" });
    };

  const onPickImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;
    setProfileImage(file);
    setImgPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleBizPartChange =
    (key: "p1" | "p2" | "p3") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyNum = e.target.value.replace(/\D/g, "");
      const max = key === "p1" ? 3 : key === "p2" ? 2 : 5;
      if (onlyNum.length <= max) {
        const next = { ...bizParts, [key]: onlyNum };
        setBizParts(next);
        const full =
          next.p1.length === 3 && next.p2.length === 2 && next.p3.length === 5
            ? `${next.p1}-${next.p2}-${next.p3}`
            : "";
        setDto((prev) => ({ ...prev, businessNumber: full }));
        setBizDup({ state: "idle" });
      }
    };

  const handleTelPartChange =
    (key: "p1" | "p2" | "p3") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const onlyNum = e.target.value.replace(/\D/g, "");
      const max = key === "p1" ? 3 : key === "p2" ? 4 : 4;
      if (onlyNum.length <= max) {
        const next = { ...telParts, [key]: onlyNum };
        setTelParts(next);
        const validLengths =
          (next.p1.length === 2 || next.p1.length === 3) &&
          (next.p2.length === 3 || next.p2.length === 4) &&
          next.p3.length === 4;
        const full = validLengths ? `${next.p1}-${next.p2}-${next.p3}` : "";
        setDto((prev) => ({ ...prev, telephone: full }));
      }
    };

  const handleEmailPartChange =
    (key: "local" | "domain") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.trim();
      const next = { ...emailParts, [key]: val };
      setEmailParts(next);
      const full = next.local && next.domain ? `${next.local}@${next.domain}` : "";
      setDto((prev) => ({ ...prev, email: full }));
      setEmailDup({ state: "idle" });
    };

  const handleCheckUsername = async () => {
    const trimmed = (dto.username ?? "").trim();
    if (!trimmed) return;
    setUsernameDup({ state: "checking" });
    const res = await checkLoginIdDuplicate(trimmed);
    if (!isSuccess(res)) {
      setUsernameDup({ state: "error", message: res?.message ?? "중복확인 실패" });
      return;
    }
    const exists = getExists(res);
    setUsernameDup({ state: exists ? "taken" : "available", message: exists ? "이미 사용 중인 아이디입니다." : "사용 가능한 아이디입니다." });
  };

  const handleCheckEmail = async () => {
    const full = (dto.email ?? "").trim();
    if (!full || !REGEX.EMAIL.test(full)) {
      setEmailDup({ state: "error", message: "올바른 이메일 형식을 입력하세요." });
      return;
    }
    setEmailDup({ state: "checking" });
    const normalized = full.toLowerCase();
    const res = await checkEmailDuplicate(normalized);
    if (!isSuccess(res)) {
      setEmailDup({ state: "error", message: res?.message ?? "중복확인 실패" });
      return;
    }
    const exists = getExists(res);
    setEmailDup({ state: exists ? "taken" : "available", message: exists ? "이미 사용 중인 이메일입니다." : "사용 가능한 이메일입니다." });
    const [loc, dom] = normalized.split("@");
    setEmailParts({ local: loc ?? "", domain: dom ?? "" });
    setDto((prev) => ({ ...prev, email: normalized }));
  };

  const handleCheckBiz = async () => {
    const full = dto.businessNumber ?? "";
    if (!REGEX.BUSINESS_NUMBER.test(full)) return;
    setBizDup({ state: "checking" });
    const res = await checkBusinessNumberDuplicate(full);
    if (!isSuccess(res)) {
      setBizDup({ state: "error", message: res?.message ?? "중복확인 실패" });
      return;
    }
    const exists = getExists(res);
    setBizDup({ state: exists ? "taken" : "available", message: exists ? "이미 등록된 사업자입니다." : "사용 가능한 사업자등록번호입니다." });
  };

  const isFormValid = (): boolean => {
    const {
      username,
      password,
      confirmPassword,
      email,
      businessNumber,
      name,
      representativeName,
      businessType,
      businessItems,
      telephone,
      businessZipCode,
      businessAddress,
      businessAddressDetail,
      fax,
      chargePhone,
      chargeEmail,
    } = dto;

    if (
      !username || !password || !confirmPassword || !email || !businessNumber ||
      !name || !representativeName || !businessType || !businessItems ||
      !telephone || !businessZipCode || !businessAddress
    ) {
      setErrorMsg("필수 항목을 모두 입력해 주세요.");
      return false;
    }

    if (!REGEX.USERNAME.test(username)) return setErrorMsg("아이디는 영문으로 시작하고 5~12자 이내여야 합니다."), false;
    if (!REGEX.PASSWORD.test(password)) return setErrorMsg("비밀번호는 영문, 숫자, 특수문자를 포함해 8~15자여야 합니다."), false;
    if (password !== confirmPassword) return setErrorMsg("비밀번호와 확인이 일치하지 않습니다."), false;

    if (!REGEX.EMAIL.test(email)) return setErrorMsg("올바른 이메일 형식을 입력하세요."), false;
    if (!REGEX.BUSINESS_NUMBER.test(businessNumber)) return setErrorMsg("사업자등록번호는 000-00-00000 형식이어야 합니다."), false;
    if (!REGEX.BUSINESS.test(businessType)) return setErrorMsg("업태 형식이 올바르지 않습니다."), false;
    if (!REGEX.BUSINESS.test(businessItems)) return setErrorMsg("종목 형식이 올바르지 않습니다."), false;
    if (!REGEX.TELEPHONE.test(telephone)) return setErrorMsg("대표전화는 000-0000-0000 형식이어야 합니다."), false;

    if (!REGEX.ZIPCODE.test(businessZipCode)) return setErrorMsg("우편번호는 5자리 숫자여야 합니다."), false;
    if (!REGEX.ADDRESS.test(businessAddress)) return setErrorMsg("주소 형식이 올바르지 않습니다."), false;
    if (businessAddressDetail && !REGEX.ADDRESS_DETAIL.test(businessAddressDetail)) return setErrorMsg("상세 주소 형식이 올바르지 않습니다."), false;

    if (!REGEX.NAME_KOREAN.test(representativeName)) return setErrorMsg("대표자명은 한글 2~10자여야 합니다."), false;
    if (fax && !REGEX.FAX.test(fax)) return setErrorMsg("팩스번호 형식이 올바르지 않습니다."), false;
    if (chargePhone && !REGEX.PHONE_NUMBER.test(chargePhone)) return setErrorMsg("담당자 연락처 형식이 올바르지 않습니다."), false;
    if (chargeEmail && !REGEX.EMAIL.test(chargeEmail)) return setErrorMsg("담당자 이메일 형식이 올바르지 않습니다."), false;

    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!isFormValid()) return;

    setSubmitting(true);

    const req: CustomerSignUpRequestDto = {
      ...dto,
      email: (dto.email ?? "").trim().toLowerCase(),
    };
    const optionalKeys = [
      "fax",
      "businessAddressDetail",
      "chargePosition",
      "chargeDepartment",
      "chargeName",
      "chargePhone",
      "chargeEmail",
    ] as const;

    const cleaned: any = { ...req };
    optionalKeys.forEach((k) => {
      const v = sanitize((req as any)[k]);
      if (v === null) delete cleaned[k];
      else cleaned[k] = v;
    });

    const res = await Signup(cleaned, profileImage);
    setSubmitting(false);

    if (isSuccess(res)) {
      setSuccessMsg("회원가입 신청이 완료되었습니다. 관리자 승인 후 이용 가능합니다.");
      setDto(initial);
      setProfileImage(null);
      setImgPreview(null);
      setUsernameDup({ state: "idle" });
      setEmailDup({ state: "idle" });
      setBizDup({ state: "idle" });
      setBizParts({ p1: "", p2: "", p3: "" });
      setTelParts({ p1: "", p2: "", p3: "" });
      setEmailParts({ local: "", domain: "" });
    } else {
      setErrorMsg(res?.message ?? "회원가입에 실패했습니다.");
    }
  };

  const DupBadge = ({ s }: { s: DupState }) => {
    if (s.state === "checking") return <Typography variant="caption" color="text.secondary">검사 중...</Typography>;
    if (s.state === "available") return <Typography variant="caption" color="success.main">사용 가능</Typography>;
    if (s.state === "taken") return <Typography variant="caption" color="error.main">사용 불가</Typography>;
    if (s.state === "error") return <Typography variant="caption" color="warning.main">확인 실패</Typography>;
    return null;
  };

  if (successMsg) {
    return (
      <Card sx={{ maxWidth: 980, mx: "auto", mt: 5 }}>
        <CardHeader title="고객사 회원가입" />
        <CardContent>
          <Alert severity="success" sx={{ fontSize: 16, py: 2 }}>
            {successMsg}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <Card sx={{ maxWidth: 980, mx: "auto", mt: 5 }}>
        <CardHeader title="고객사 회원가입" subheader="필수 정보를 정확히 입력해 주세요" />
        {submitting && <LinearProgress />}
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>계정 정보</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField label="아이디" value={dto.username} onChange={onChange("username")} fullWidth required />
                <Button
                  variant="outlined"
                  onClick={handleCheckUsername}
                  disabled={!dto.username || usernameDup.state === "checking" || !REGEX.USERNAME.test(dto.username.trim())}
                >
                  중복확인
                </Button>
                <DupBadge s={usernameDup} />
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="비밀번호"
                type={showPw ? "text" : "password"}
                value={dto.password}
                onChange={onChange("password")}
                required
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPw((p) => !p)} edge="end" aria-label="toggle password visibility">
                        {showPw ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="비밀번호 확인"
                type={showPw2 ? "text" : "password"}
                value={dto.confirmPassword}
                onChange={onChange("confirmPassword")}
                required
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPw2((p) => !p)} edge="end" aria-label="toggle password visibility">
                        {showPw2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center" sx={{ flexGrow: 1 }}>
                  <TextField
                    label="이메일 아이디"
                    value={emailParts.local}
                    onChange={handleEmailPartChange("local")}
                    inputProps={{ maxLength: 64 }}
                    fullWidth
                  />
                  <Typography>@</Typography>
                  <TextField
                    label="도메인 (예: gmail.com)"
                    value={emailParts.domain}
                    onChange={handleEmailPartChange("domain")}
                    inputProps={{ maxLength: 64 }}
                    fullWidth
                  />
                </Stack>
                <Button
                  variant="outlined"
                  onClick={handleCheckEmail}
                  disabled={
                    emailDup.state === "checking" ||
                    !emailParts.local ||
                    !emailParts.domain ||
                    !REGEX.EMAIL_LOCAL.test(emailParts.local) ||
                    !REGEX.EMAIL_DOMAIN.test(emailParts.domain)
                  }
                >
                  중복확인
                </Button>
                <DupBadge s={emailDup} />
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>사업자 정보</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center" sx={{ flexGrow: 1 }}>
                  <TextField
                    value={bizParts.p1}
                    onChange={handleBizPartChange("p1")}
                    inputProps={{ maxLength: 3, style: { textAlign: "center" } }}
                    sx={{ width: 80 }}
                    label="사업자번호(앞 3자리)"
                  />
                  <Typography>-</Typography>
                  <TextField
                    value={bizParts.p2}
                    onChange={handleBizPartChange("p2")}
                    inputProps={{ maxLength: 2, style: { textAlign: "center" } }}
                    sx={{ width: 60 }}
                    label="중간 2자리"
                  />
                  <Typography>-</Typography>
                  <TextField
                    value={bizParts.p3}
                    onChange={handleBizPartChange("p3")}
                    inputProps={{ maxLength: 5, style: { textAlign: "center" } }}
                    sx={{ width: 100 }}
                    label="뒤 5자리"
                  />
                </Stack>
                <Button
                  variant="outlined"
                  onClick={handleCheckBiz}
                  disabled={
                    bizDup.state === "checking" ||
                    !(bizParts.p1.length === 3 && bizParts.p2.length === 2 && bizParts.p3.length === 5)
                  }
                >
                  중복확인
                </Button>
                <DupBadge s={bizDup} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="상호(회사명)" value={dto.name} onChange={onChange("name")} fullWidth required />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="대표자명" value={dto.representativeName} onChange={onChange("representativeName")} fullWidth required />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="업태" value={dto.businessType} onChange={onChange("businessType")} fullWidth required />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="업종" value={dto.businessItems} onChange={onChange("businessItems")} fullWidth required />
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center" sx={{ flexGrow: 1 }}>
                  <TextField
                    label="지역/사업자(2~3)"
                    value={telParts.p1}
                    onChange={handleTelPartChange("p1")}
                    inputProps={{ maxLength: 3, style: { textAlign: "center" } }}
                    sx={{ width: 90 }}
                  />
                  <Typography>-</Typography>
                  <TextField
                    label="국번(3~4)"
                    value={telParts.p2}
                    onChange={handleTelPartChange("p2")}
                    inputProps={{ maxLength: 4, style: { textAlign: "center" } }}
                    sx={{ width: 100 }}
                  />
                  <Typography>-</Typography>
                  <TextField
                    label="번호(4)"
                    value={telParts.p3}
                    onChange={handleTelPartChange("p3")}
                    inputProps={{ maxLength: 4, style: { textAlign: "center" } }}
                    sx={{ width: 100 }}
                  />
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="팩스(선택)" value={dto.fax ?? ""} onChange={onChange("fax")} fullWidth />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mb: 1 }}>사업장 주소</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <TextField label="우편번호" value={dto.businessZipCode} onChange={onChange("businessZipCode")} fullWidth required />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField label="기본 주소" value={dto.businessAddress} onChange={onChange("businessAddress")} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="상세 주소(선택)" value={dto.businessAddressDetail ?? ""} onChange={onChange("businessAddressDetail")} fullWidth />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>담당자 정보 (선택)</Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <TextField label="부서" value={dto.chargeDepartment ?? ""} onChange={onChange("chargeDepartment")} fullWidth />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="직책" value={dto.chargePosition ?? ""} onChange={onChange("chargePosition")} fullWidth />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="담당자명" value={dto.chargeName ?? ""} onChange={onChange("chargeName")} fullWidth />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField label="담당자 연락처" value={dto.chargePhone ?? ""} onChange={onChange("chargePhone")} fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="담당자 이메일" type="email" value={dto.chargeEmail ?? ""} onChange={onChange("chargeEmail")} fullWidth />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" sx={{ mb: 1 }}>프로필 이미지 (선택)</Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item>
              <Button component="label" variant="outlined">
                이미지 업로드
                <input hidden type="file" accept="image/*" onChange={onPickImage} />
              </Button>
            </Grid>
            {imgPreview && (
              <Grid item>
                <img
                  src={imgPreview}
                  alt="미리보기"
                  style={{ width: 160, height: 160, objectFit: "cover", borderRadius: 12, border: "1px solid #eee" }}
                />
              </Grid>
            )}
          </Grid>

          {errorMsg && <Alert severity="error" sx={{ mb: 1 }}>{errorMsg}</Alert>}

          <Button type="submit" variant="contained" fullWidth disabled={submitting}>
            회원가입
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
