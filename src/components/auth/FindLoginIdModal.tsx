import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Tabs, Tab, Grid, Stack, TextField, Button, IconButton,
  CircularProgress, InputAdornment, Typography, Tooltip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { findCustomerLoginId, findUserLoginId } from "../../apis/auth/auth.apis";
import type ResponseDto from "../../dtos/response.dto";
import type { CustomerLoginIdFindResponseDto } from "../../dtos/auth/response/customer-login-id-find.response.dto";
import type { UserLoginIdFindResponseDto } from "../../dtos/auth/response/user-login-id-find.response.dto";

interface Props {
  open: boolean;
  onClose: () => void;
  onFound?: (username: string) => void;
  autoFillOnFound?: boolean;
}

const REGEX = {
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
  res?.code === "SU" ||
  res?.code === "SUCCESS" ||
  res?.ok === true ||
  res?.success === true ||
  (typeof res?.status === "number" && res.status >= 200 && res.status < 300);

const trimLower = (s: string) => s.trim().toLowerCase();

export default function FindLoginIdModal({ open, onClose, onFound, autoFillOnFound = false }: Props) {
  const [tab, setTab] = useState<0 | 1>(0);
  const [loading, setLoading] = useState(false);
  const [resultType, setResultType] = useState<"none" | "success" | "fail">("none");
  const [foundUsername, setFoundUsername] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [cEmailLocal, setCEmailLocal] = useState("");
  const [cEmailDomain, setCEmailDomain] = useState("");
  const [cBn1, setCBn1] = useState("");
  const [cBn2, setCBn2] = useState("");
  const [cBn3, setCBn3] = useState("");
  const [cRepName, setCRepName] = useState("");

  const [uName, setUName] = useState("");
  const [uP1, setUP1] = useState("010");
  const [uP2, setUP2] = useState("");
  const [uP3, setUP3] = useState("");

  useEffect(() => {
    if (!open) return;
    setFoundUsername(null);
    setResultType("none");
    setCopied(false);
    setLoading(false);
    setCEmailLocal(""); setCEmailDomain("");
    setCBn1(""); setCBn2(""); setCBn3("");
    setCRepName("");
    setUName(""); setUP1("010"); setUP2(""); setUP3("");
  }, [open]);

  const customerEmail = useMemo(() => {
    const local = cEmailLocal.trim();
    const domain = cEmailDomain.trim();
    if (!local || !domain) return "";
    return `${local}@${domain}`;
  }, [cEmailLocal, cEmailDomain]);

  const customerBn = useMemo(() => {
    if (!cBn1 || !cBn2 || !cBn3) return "";
    return `${cBn1}-${cBn2}-${cBn3}`;
  }, [cBn1, cBn2, cBn3]);

  const isCustomerFormValid = () =>
    REGEX.EMAIL.test(customerEmail) &&
    REGEX.BN_P1.test(cBn1) && REGEX.BN_P2.test(cBn2) && REGEX.BN_P3.test(cBn3) &&
    REGEX.NAME_KOREAN.test(cRepName);

  const isUserFormValid = () =>
    REGEX.NAME_KOREAN.test(uName) &&
    REGEX.PHONE_P1.test(uP1) && REGEX.PHONE_P2.test(uP2) && REGEX.PHONE_P3.test(uP3);

  const handleClose = (_: object, reason?: "backdropClick" | "escapeKeyDown") => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    onClose();
  };

  const handleCopy = async () => {
    if (!foundUsername) return;
    await navigator.clipboard.writeText(foundUsername);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onChange =
    (setter: (v: string) => void, limit?: number, digitsOnly?: boolean) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      let v = e.target.value;
      if (digitsOnly) v = v.replace(/\D/g, "");
      if (typeof limit === "number") v = v.slice(0, limit);
      setter(v);
    };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFoundUsername(null);
    setResultType("none");

    try {
      setLoading(true);
      let username: string | null = null;

      if (tab === 0) {
        if (!isCustomerFormValid()) {
          setResultType("fail");
          return;
        }
        const dto = {
          email: trimLower(customerEmail),
          businessNumber: customerBn,
          representativeName: cRepName.trim(),
        };
        const res: ResponseDto<CustomerLoginIdFindResponseDto> = await findCustomerLoginId(dto as any);
        if (isSuccess(res) && res?.data?.username) username = res.data.username;
      } else {
        if (!isUserFormValid()) {
          setResultType("fail");
          return;
        }
        const phoneNumber = `${uP1}${uP2}${uP3}`;
        const dto = { name: uName.trim(), phoneNumber };
        const res: ResponseDto<UserLoginIdFindResponseDto> = await findUserLoginId(dto as any);
        if (isSuccess(res) && res?.data?.username) username = res.data.username;
      }

      if (username) {
        setFoundUsername(username);
        setResultType("success");
        if (autoFillOnFound && onFound) onFound(username);
      } else {
        setResultType("fail");
      }
    } catch {
      setResultType("fail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth disableEscapeKeyDown>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          아이디 찾기
          <IconButton onClick={() => onClose()}>
            <CloseIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Stack alignItems="center" sx={{ py: 4 }}>
            <CircularProgress size={28} />
          </Stack>
        ) : resultType === "success" ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 5 }}>
            <Typography variant="body1" sx={{ fontSize: 18, textAlign: "center" }}>
              입력하신 정보와 일치하는 아이디는{" "}
              <b style={{ color: "#1976d2" }}>{foundUsername}</b> 입니다.
            </Typography>
            <Tooltip title={copied ? "복사됨!" : "복사"}>
              <IconButton onClick={handleCopy} sx={{ mt: 1 }}>
                {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>
        ) : resultType === "fail" ? (
          <Stack alignItems="center" justifyContent="center" sx={{ py: 5 }}>
            <Typography variant="body1" sx={{ fontSize: 18, textAlign: "center", color: "#d32f2f" }}>
              입력하신 정보와 일치하는 계정을 찾을 수 없습니다.
            </Typography>
          </Stack>
        ) : (
          <form id="findLoginIdForm" onSubmit={onSubmit}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              sx={{ mb: 2 }}
            >
              <Tab label="고객사" />
              <Tab label="사용자(직원/기사)" />
            </Tabs>

            {tab === 0 ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      label="이메일(아이디 수신)"
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
                  <Typography variant="body2" sx={{ mb: 0.5 }}>사업자등록번호</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField value={cBn1} onChange={onChange(setCBn1, 3, true)} placeholder="000" fullWidth required />
                    <Typography>-</Typography>
                    <TextField value={cBn2} onChange={onChange(setCBn2, 2, true)} placeholder="00" fullWidth required />
                    <Typography>-</Typography>
                    <TextField value={cBn3} onChange={onChange(setCBn3, 5, true)} placeholder="00000" fullWidth required />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="대표자명"
                    value={cRepName}
                    onChange={onChange(setCRepName, 10)}
                    placeholder="한글 2~10자"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="이름"
                    value={uName}
                    onChange={onChange(setUName, 10)}
                    placeholder="한글 2~10자"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>휴대폰 번호</Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField value={uP1} onChange={onChange(setUP1, 3, true)} fullWidth required />
                    <Typography>-</Typography>
                    <TextField value={uP2} onChange={onChange(setUP2, 4, true)} fullWidth required />
                    <Typography>-</Typography>
                    <TextField value={uP3} onChange={onChange(setUP3, 4, true)} fullWidth required />
                  </Stack>
                </Grid>
              </Grid>
            )}
          </form>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">닫기</Button>
        {resultType === "none" && (
          <Button
            type="submit"
            form="findLoginIdForm"
            variant="contained"
            disabled={loading || (tab === 0 ? !isCustomerFormValid() : !isUserFormValid())}
          >
            {loading ? "조회 중..." : "아이디 찾기"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
