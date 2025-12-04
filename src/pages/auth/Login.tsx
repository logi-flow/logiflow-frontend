import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Alert,
  LinearProgress,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth/auth.apis";
import type { LoginRequestDto } from "../../dtos/auth/request/login.request.dto";
import type { LoginResponseDto } from "../../dtos/auth/response/login.response.dto";
import type ResponseDto from "../../dtos/response.dto";
import FindLoginIdModal from "../../components/auth/FindLoginIdModal";

const isSuccess = (res: any) =>
  res?.code === "SU" ||
  res?.code === "SUCCESS" ||
  (res?.status && res.status >= 200 && res.status < 300);

export default function Login() {
  const [dto, setDto] = useState<LoginRequestDto>({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [openFindId, setOpenFindId] = useState(false);

  const navigate = useNavigate();

  const handleChange = (key: keyof LoginRequestDto) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDto((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!dto.username.trim() || !dto.password.trim()) {
      setErrorMsg("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      const res: ResponseDto<LoginResponseDto> = await login(dto);
      if (!isSuccess(res)) {
        setErrorMsg(res.message ?? "로그인에 실패했습니다.");
        return;
      }

      const token = res.data?.token;
      const role = res.data?.role;

      if (!token) {
        setErrorMsg("토큰이 존재하지 않습니다.");
        return;
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("userRole", role ?? "");

      if (res.data?.mustChangePassword) {
        navigate("/auth/must-change");
        return;
      }

      if (role === "CUSTOMER") navigate("/contracts/me");
      else if (role === "ADMIN") navigate("/contracts");
      else if (role === "EMPLOYEE") navigate("/employees/me");
      else if (role === "DRIVER") navigate("/deliveries/me");
      else navigate("/");

    } catch (err: any) { 
      setErrorMsg(err?.message ?? "서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack alignItems="center" justifyContent="center" sx={{ minHeight: "100vh", bgcolor: "#f9f9f9" }}>
        <Card sx={{ maxWidth: 420, width: "100%", p: 2, boxShadow: 3 }}>
          <CardHeader title="로그인" subheader="아이디와 비밀번호를 입력해주세요." />
          {loading && <LinearProgress />}

          <CardContent>
            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="아이디"
                  value={dto.username}
                  onChange={handleChange("username")}
                  fullWidth
                  required
                />

                <TextField
                  label="비밀번호"
                  type={showPw ? "text" : "password"}
                  value={dto.password}
                  onChange={handleChange("password")}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPw((p) => !p)}>
                          {showPw ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                >
                  로그인
                </Button>

                <Stack direction="row" justifyContent="space-between">
                  <Link
                    component="button"
                    onClick={() => setOpenFindId(true)}
                    underline="hover"
                    sx={{ fontSize: 14 }}
                  >
                    아이디 찾기
                  </Link>

                  <Link
                    component="button"
                    onClick={() => navigate("/auth/password/request")}
                    underline="hover"
                    sx={{ fontSize: 14 }}
                  >
                    비밀번호 재설정
                  </Link>
                </Stack>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Stack>

      <FindLoginIdModal
        open={openFindId}
        onClose={() => setOpenFindId(false)}
        onFound={(username: string) => {
          setDto((prev) => ({ ...prev, username }));
          setOpenFindId(false);
        }}
      />
    </>
  );
}
