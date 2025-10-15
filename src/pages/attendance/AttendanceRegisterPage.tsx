import { useEffect, useMemo, useState } from 'react'
// import { useCookies } from 'react-cookie';
import { checkInAttendance, checkOutAttendance, getMyAttendance } from '../../apis/attendance/attendance.apis';
import type { GetMyAttendanceDetailResponseDto } from '../../dtos/attendance/response/get-my-attendance-detail.response.dto';
import { Box, Button, Card, CardActions, CircularProgress, Stack, Toolbar, Typography } from '@mui/material';
import CheckOutModal from '../../components/attendance/CheckOutModal';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function AttendanceRegisterPage() {
  // const [cookies] = useCookies(["accessToken"]);
  // const accessToken = cookies.accessToken;
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkcml2ZXIwMDMiLCJyb2xlIjoiRFJJVkVSIiwiaWF0IjoxNzYwMzI5NTM1LCJleHAiOjE3NjAzNjU1MzV9.UoHQTgtiClYDeQjAijgby_yefknx4uVOIJG8fkuvikk";
  const [status, setStatus] = useState<GetMyAttendanceDetailResponseDto>();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(true);
  const isOpen = useMemo(() => status?.open, [status]);
  const buttonName = isOpen ? "퇴근" : "출근";
  
  useEffect(() => {
    if (accessToken) {
      fetchMyAttendanceStatus();
    }
  }, [accessToken]);

  const fetchMyAttendanceStatus = async () => {
    if (!accessToken || loading) return;
    
    try {
      setLoading(true);

      const response = await getMyAttendance(accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setStatus(data);
      } else {
        console.error("당일 출근부 조회 실패: ", message);
        alert("당일 출근부 조회 실패");
      }
    } catch (e) {
      console.error("당일 출근부 조회 중 에러 발생: ", e);
      alert("당일 출근부 조회 요청 중 문제 발생");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!accessToken || loading) return;

    try {
      setLoading(true);

      const response = await checkInAttendance(accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setStatus(data);
      } else {
        console.error("출근 처리 실패: ", message);
        alert("출근 처리 실패");
      }
    } catch (e) {
      console.error("출근 처리 중 에러 발생: ", e);
      alert("출근 처리 요청 중 문제 발생");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (vehicleMileage: number) => {
    if (!accessToken || loading) return;

    try {
      setLoading(true);

      const dto = { vehicleMileage };
      const response = await checkOutAttendance(dto, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setStatus(data);
        setModal(false);
        setButtonEnable(false);
      } else {
        console.error("퇴근 처리 실패: ", message);
        alert("퇴근 처리 실패");
      }
    } catch (e) {
      console.error("퇴근 처리 중 에러 발생: ", e);
      alert("퇴근 처리 요청 중 문제 발생");
    } finally {
      setLoading(false);
    }
  };

  const handleModalOpen = () => setModal(true);
  const handleModalClose = () => setModal(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={ 700 }>
            출 · 퇴근 등록
          </Typography>
        </Stack>

        <Stack sx={{ p: 3, width: '100%', maxWidth: 450, mx: 'auto' }} spacing={3} alignItems="stretch" justifyContent="space-between" >
          <Card sx={{ p: 2 }}>
            {loading ? (
              <Stack direction="row" justifyContent="space-between">
                <CircularProgress color="inherit" size={28} sx={{ mx: 'auto' }}/>
              </Stack>
            ) : (
              <Stack spacing={2} >
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">
                    출근 여부
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {isOpen ? "출근 중" : "대기"}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">
                    출근 시간
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {status?.workStart ?? "-"}
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">
                    퇴근 시간
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {status?.workEnd ?? "-"}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </Card>
          <CardActions sx={{ p: 0 }}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={!buttonEnable || modal || loading}
              color={isOpen ? "error" : "success"}
              onClick={isOpen ? handleModalOpen : handleCheckIn}
            >
              {buttonName}
            </Button>
          </CardActions>
        </Stack>

        <CheckOutModal
          open={modal}
          loading={loading}
          onClose={handleModalClose}
          onConfirm={handleCheckOut}
        />
      </Box>
    </Box>
  )
}

export default AttendanceRegisterPage;