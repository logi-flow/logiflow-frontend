import { useEffect, useState, type ChangeEvent } from "react";
// import { useCookies } from "react-cookie";
import type { GetDriverJoinLeaveResponseDto } from "../../dtos/stats/driverJoinLeave/response/get-driver-join-leave.response.dto";
import { getDrvierJoinLeave } from "../../apis/stats/stats.apis";
import { Box, Button, CircularProgress, Stack, TextField, Toolbar, Typography } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import DriverJoinLeaveChart from "../../components/stats/driverJoinLeave/DriverJoinLeaveChart";

function DriverJoinLeaveStatsPage() {
  // const [cookies] = useCookies(["accessToken"]);
  // const accessToken = cookies.accessToken;
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTU0MTM3OCwiZXhwIjoxNzYxNTc3Mzc4fQ.Q5u957SfuVFbqvyWn2A1a_J9u-DrOY8luyMRmHL9Wwg";
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [data, setData] = useState<GetDriverJoinLeaveResponseDto | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    const now = new Date();
    const fromDate = `${now.getFullYear()}-${String(now.getMonth() - 5).padStart(2, "0")}`;
    const toDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    setFrom(fromDate);
    setTo(toDate);
    handleSearch();
  }, [accessToken]);
  
  const handleChange = (set: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    set(e.target.value);
  };

  const handleSearch = async () => {
    if (!accessToken || loading) return;

    try {
      const response = await getDrvierJoinLeave(accessToken, from, to);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setData(data);
      } else {
        console.error("기사 입퇴사 통계 조회 실패: ", message);
        alert("기사 입퇴사 통계 조회 실패: " + message);
      }
    } catch (e) {
      console.error("기사 입퇴사 통계 조회 중 에러 발생: ", e);
      alert("기사 입퇴사 통계 조회 중 에러 발생: " + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            기사 입퇴사 통계
          </Typography>
        </Stack>

        <Stack sx={{ p: 3 }} spacing={2} direction="row" alignItems="center">
          <Stack spacing={2} direction="row" alignItems="center">
            <TextField
              id="fromMonth"
              name="fromMonth"
              label="조회 시작월"
              type="month"
              inputMode="text"
              InputLabelProps={{ shrink: true }}
              value={from}
              size="small"
              onChange={handleChange(setFrom)}
            />
            <TextField
              id="toMonth"
              name="toMonth"
              label="조회 종료월"
              type="month"
              inputMode="text"
              InputLabelProps={{ shrink: true }}
              value={to}
              size="small"
              onChange={handleChange(setTo)}
            />
          </Stack>

          <Stack>
            <Button
            sx={{ width: '80px' }}
            variant="contained"
            size="medium"
            disabled={loading}
            onClick={handleSearch}
          >
            조회
          </Button>
          </Stack>
        </Stack>

        {loading && (
          <Stack sx={{ p: 3 }} alignItems="center" >
            <CircularProgress color="inherit" size={28} sx={{ mx: 'auto'}}/>
          </Stack>
        )}

        {!loading && data && data.points.length > 0 && (
          <DriverJoinLeaveChart points={data.points} />
        )}

        {!loading && data && data.points.length === 0 && (
          <Stack sx={{ p: 3 }} alignItems="center">
            <Typography>조회 결과가 없습니다.</Typography>
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default DriverJoinLeaveStatsPage;