import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Card, CardHeader, CardContent, Grid, Stack, TextField, Button,
  Alert, Tabs, Tab, Typography, InputAdornment, LinearProgress
} from "@mui/material";
import { requestPasswordResetCustomer, requestPasswordResetUser } from "../../apis/auth/auth.apis";
import type ResponseDto from "../../dtos/response.dto";
import type { CustomerPasswordResetResponseDto } from "../../dtos/auth/response/customer-password-reset.response.dto";
import type { UserPasswordResetResponseDto } from "../../dtos/auth/response/user-password-reset.response.dto";

const REGEX = {
  USERNAME: /^[a-zA-Z][a-zA-Z0-9]{4,11}$/,
  NAME_KOREAN: /^[가-힣]{2,10}$/,
  EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
  BN_P1: /^\d{3}$/,
  BN_P2: /^\d{2}$/,
  BN_P3: /^\d{5}$/,
  PHONE_P1: /^01[0-9]$/,
  PHONE_P2: /^\d{3,4}$/,
  PHONE_P3: /^\d{4}$/,
};

const isSuccess = (res: any) =>
  res?.code === "SU" || res?.code === "SUCCESS" ||
  res?.ok === true || res?.success === true ||
  (typeof res?.status === "number" && res.status >= 200 && res.status < 300);

const trimLower = (s: string) => s.trim().toLowerCase();

export default function PasswordResetRequest() {
  const [tab, setTab] = useState<0 | 1>(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [resultType, setResultType] = useState<"none" | "success" | "fail">("none");

  const [cUsername, setCUsername] = useState("");
  const [cEmailLocal, setCEmailLocal] = useState("");
  const [cEmailDomain, setCEmailDomain] = useState("");
  const [cBn1, setCBn1] = useState("");
  const [cBn2, setCBn2] = useState("");
  const [cBn3, setCBn3] = useState("");
  const [cRepName, setCRepName] = useState("");

  const [uUsername, setUUsername] = useState("");
  const [uName, setUName] = useState("");
  const [uP1, setUP1] = useState("010");
  const [uP2, setUP2] = useState("");
  const [uP3, setUP3] = useState("");
  const [uEmailLocal, setUEmailLocal] = useState("");
  const [uEmailDomain, setUEmailDomain] = useState("");

  const customerEmail = useMemo(() => {
    if (!cEmailLocal.trim() || !cEmailDomain.trim()) return "";
    return `${cEmailLocal.trim()}@${cEmailDomain.trim()}`;
  }, [cEmailLocal, cEmailDomain]);

  const userEmail = useMemo(() => {
    if (!uEmailLocal.trim() || !uEmailDomain.trim()) return "";
    return `${uEmailLocal.trim()}@${uEmailDomain.trim()}`;
  }, [uEmailLocal, uEmailDomain]);

  const customerBn = useMemo(() => {
    if (!cBn1 || !cBn2 || !cBn3) return "";
    return `${cBn1}-${cBn2}-${cBn3}`;
  }, [cBn1, cBn2, cBn3]);

  const onChange = (setter: (v: string) => void, limit?: number, digitsOnly?: boolean) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      let v = e.target.value;
      if (digitsOnly) v = v.replace(/\D/g, "");
      if (typeof limit === "number") v = v.slice(0, limit);
      setter(v);
    };

  const validCustomer = () =>
    REGEX.USERNAME.test(cUsername) &&
    REGEX.EMAIL.test(customerEmail) &&
    REGEX.BN_P1.test(cBn1) && REGEX.BN_P2.test(cBn2) && REGEX.BN_P3.test(cBn3) &&
    REGEX.NAME_KOREAN.test(cRepName);

  const validUser = () =>
    REGEX.USERNAME.test(uUsername) &&
    REGEX.NAME_KOREAN.test(uName) &&
    REGEX.PHONE_P1.test(uP1) && REGEX.PHONE_P2.test(uP2) && REGEX.PHONE_P3.test(uP3) &&
    REGEX.EMAIL.test(userEmail);

  const resetAlerts = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setResultType("none");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setResultType("none");

    try {
      setSubmitting(true);

      if (tab === 0) {
        if (!validCustomer()) {
          setErrorMsg("입력값을 확인해 주세요. (아이디/이메일/사업자번호/대표자명)");
          setResultType("fail");
          return;
        }

        const dto = {
          username: cUsername.trim(),
          email: trimLower(customerEmail),
          businessNumber: customerBn,
          representativeName: cRepName.trim(),
        };

        const res: ResponseDto<CustomerPasswordResetResponseDto> =
          await requestPasswordResetCustomer(dto as any);

        if (!isSuccess(res)) {
          setErrorMsg(res?.message ?? "요청 처리에 실패했습니다.");
          setResultType("fail");
          return;
        }

        setSuccessMsg("비밀번호 재설정 메일을 전송했습니다. 메일함을 확인해 주세요.");
        setResultType("success");

      } else {
        if (!validUser()) {
          setErrorMsg("입력값을 확인해 주세요. (아이디/이름/휴대폰/이메일)");
          setResultType("fail");
          return;
        }

        const dto = {
          username: uUsername.trim(),
          name: uName.trim(),
          phoneNumber: `${uP1}${uP2}${uP3}`,
          email: trimLower(userEmail),
        };

        const res: ResponseDto<UserPasswordResetResponseDto> =
          await requestPasswordResetUser(dto as any);

        if (!isSuccess(res)) {
          setErrorMsg(res?.message ?? "요청 처리에 실패했습니다.");
          setResultType("fail");
          return;
        }

        setSuccessMsg("비밀번호 재설정 메일을 전송했습니다. 메일함을 확인해 주세요.");
        setResultType("success");
      }
    } catch (err: any) {
      setErrorMsg(err?.message ?? "요청 처리 중 오류가 발생했습니다.");
      setResultType("fail");
    } finally {
      setSubmitting(false);
    }
  };

  if (resultType === "success") {
    return (
      <Card sx={{ maxWidth: 560, mx: "auto", mt: 6 }}>
        <CardHeader title="비밀번호 재설정" />
        {submitting && <LinearProgress />}
        <CardContent>
          <Alert severity="success">
            {successMsg ?? "비밀번호 재설정 메일을 전송했습니다. 메일함을 확인해 주세요."}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <Card sx={{ maxWidth: 860, mx: "auto", mt: 5 }}>
        <CardHeader title="비밀번호 재설정" subheader="본인 확인 후 이메일로 재설정 링크를 보내드립니다." />
        {submitting && <LinearProgress />}

        <CardContent>
          <Tabs
            value={tab}
            onChange={(_, v) => {
              setTab(v);
              resetAlerts();
            }}
            sx={{ mb: 2 }}
          >
            <Tab label="고객사" />
            <Tab label="사용자(직원/기사)" />
          </Tabs>

          {tab === 0 ? (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="아이디" value={cUsername} onChange={onChange(setCUsername, 12)} fullWidth required />
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    label="이메일"
                    value={cEmailLocal}
                    onChange={onChange(setCEmailLocal, 64)}
                    InputProps={{ endAdornment: <InputAdornment position="end">@</InputAdornment> }}
                    fullWidth
                    required
                  />
                  <TextField
                    label="도메인"
                    value={cEmailDomain}
                    onChange={onChange(setCEmailDomain, 64)}
                    placeholder="example.com"
                    fullWidth
                    required
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: .5 }}>사업자등록번호</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField value={cBn1} onChange={onChange(setCBn1, 3, true)} placeholder="000" fullWidth required />
                  <Typography>-</Typography>
                  <TextField value={cBn2} onChange={onChange(setCBn2, 2, true)} placeholder="00" fullWidth required />
                  <Typography>-</Typography>
                  <TextField value={cBn3} onChange={onChange(setCBn3, 5, true)} placeholder="00000" fullWidth required />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="대표자명" value={cRepName} onChange={onChange(setCRepName, 10)} fullWidth required />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="아이디" value={uUsername} onChange={onChange(setUUsername, 12)} fullWidth required />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="이름" value={uName} onChange={onChange(setUName, 10)} fullWidth required />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" sx={{ mb: .5 }}>휴대폰 번호</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField value={uP1} onChange={onChange(setUP1, 3, true)} fullWidth required />
                  <Typography>-</Typography>
                  <TextField value={uP2} onChange={onChange(setUP2, 4, true)} fullWidth required />
                  <Typography>-</Typography>
                  <TextField value={uP3} onChange={onChange(setUP3, 4, true)} fullWidth required />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    label="이메일"
                    value={uEmailLocal}
                    onChange={onChange(setUEmailLocal, 64)}
                    InputProps={{ endAdornment: <InputAdornment position="end">@</InputAdornment> }}
                    fullWidth
                    required
                  />
                  <TextField
                    label="도메인"
                    value={uEmailDomain}
                    onChange={onChange(setUEmailDomain, 64)}
                    placeholder="example.com"
                    fullWidth
                    required
                  />
                </Stack>
              </Grid>
            </Grid>
          )}

          {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}
          {successMsg && (
            <Alert severity="success" sx={{ mt: 2 }}>{successMsg}</Alert>
          )}


          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            disabled={submitting || (tab === 0 ? !validCustomer() : !validUser())}
            fullWidth
          >
            재설정 메일 보내기
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
