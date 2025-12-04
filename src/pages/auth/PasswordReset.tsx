import { useEffect, useState, type FormEvent } from "react";
import {
  Card, CardHeader, CardContent, Stack, TextField, Button,
  Alert, LinearProgress, InputAdornment, IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { resetPassword, verifyEmail } from "../../apis/auth/auth.apis";
import type ResponseDto from "../../dtos/response.dto";
import type { PasswordResetSendEmailResponseDto } from "../../dtos/auth/response/password-reset-send-email.response.dto";
import { useSearchParams, useNavigate } from "react-router-dom";

const REGEX = {
  PASSWORD: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~!@#$%^&*()\-_=+])[A-Za-z0-9~!@#$%^&*()\-_=+]{8,15}$/,
};

const isSuccess = (res: any) =>
  res?.code === "SU" || res?.code === "SUCCESS" ||
  res?.ok === true || res?.success === true ||
  (typeof res?.status === "number" && res.status >= 200 && res.status < 300);

export default function PasswordReset() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const token = search.get("token") ?? "";

  const [verifying, setVerifying] = useState(true);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [done, setDone] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setVerifyError("토큰이 없습니다. 다시 요청해 주세요.");
        setVerifying(false);
        return;
      }
      try {
        const res: ResponseDto<PasswordResetSendEmailResponseDto> = await verifyEmail(token);
        if (!isSuccess(res)) {
          setVerifyError(res?.message ?? "유효하지 않은 링크입니다.");
        }
      } catch (e: any) {
        setVerifyError(e?.message ?? "유효하지 않은 링크입니다.");
      } finally {
        setVerifying(false);
      }
    };
    run();
  }, [token]);

  const validForm = () =>
    REGEX.PASSWORD.test(password) &&
    password === confirm;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!validForm()) {
      setErrorMsg("비밀번호 형식 또는 확인이 올바르지 않습니다.");
      return;
    }

    try {
      setSubmitting(true);
      const dto = { newPassword: password.trim(), confirmPassword: confirm.trim() };
      const res: ResponseDto<PasswordResetSendEmailResponseDto> =
        await resetPassword(dto as any, token);
      if (!isSuccess(res)) {
        setErrorMsg(res?.message ?? "비밀번호 재설정에 실패했습니다.");
        return;
      }
      setDone(true);
    } catch (e: any) {
      setErrorMsg(e?.message ?? "요청 처리 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (verifying) {
    return (
      <Card sx={{ maxWidth: 560, mx: "auto", mt: 6 }}>
        <CardHeader title="비밀번호 재설정" subheader="링크 검증 중..." />
        <LinearProgress />
        <CardContent />
      </Card>
    );
  }

  if (verifyError) {
    return (
      <Card sx={{ maxWidth: 560, mx: "auto", mt: 6 }}>
        <CardHeader title="비밀번호 재설정" />
        <CardContent>
          <Alert severity="error" sx={{ mb: 2 }}>{verifyError}</Alert>
          <Button variant="contained" onClick={() => navigate("/auth/password/request")} fullWidth>
            재설정 메일 다시 받기
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (done) {
    return (
      <Card sx={{ maxWidth: 560, mx: "auto", mt: 6 }}>
        <CardHeader title="비밀번호 재설정" />
        <CardContent>
          <Alert severity="success" sx={{ mb: 2 }}>
            비밀번호가 성공적으로 변경되었습니다.
          </Alert>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/auth/login")}
          >
            로그인 하기
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <Card sx={{ maxWidth: 560, mx: "auto", mt: 6 }}>
        <CardHeader title="비밀번호 재설정" subheader="새 비밀번호를 입력하세요." />
        {submitting && <LinearProgress />}
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="새 비밀번호"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              helperText="영문/숫자/특수문자(~!@#$%^&*()-_=+) 포함 8~15자"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPw(v => !v)} edge="end" aria-label="toggle password">
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="비밀번호 확인"
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(v => !v)} edge="end" aria-label="toggle password confirm">
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <Button type="submit" variant="contained" fullWidth disabled={submitting || !validForm() || !token}>
              비밀번호 변경
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}
