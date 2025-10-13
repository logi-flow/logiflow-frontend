import { useEffect, useMemo, useState } from 'react'
import { useCookies } from 'react-cookie';
import { checkInAttendance, checkOutAttendance, getMyAttendance } from '../../apis/attendance/attendance.apis';
import type { GetMyAttendanceDetailResponseDto } from '../../dtos/attendance/response/get-my-attendance-detail.response.dto';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import CheckOutDialog from './CheckOutDialog';

function AttendanceRegisterPage() {
  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken;
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
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', minWidth: 208, maxWidth: 560 }}>
        <Stack sx={{ p: 3 }} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={ 700 }>
            출 · 퇴근 등록
          </Typography>
        </Stack>

        <Stack spacing={2}>
          {loading ? (
            <Stack direction="row" justifyContent="space-between">
              <CircularProgress color="inherit" size={28} sx={{ mx: 'auto' }}/>
            </Stack>
          ) : (
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" paddingRight={5}>
                  출근 여부
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {isOpen ? "출근 중" : "대기"}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" paddingRight={5}>
                  출근 시간
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {status?.workStart ?? "-"}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" paddingRight={5}>
                  퇴근 시간
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {status?.workEnd ?? "-"}
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>

        <Stack sx={{ paddingY: 3 }} direction="row" alignItems="center" justifyContent="space-between">
          <Button
            variant="contained"
            size="large"
            fullWidth
            loading={loading}
            loadingIndicator="loading..."
            disabled={!buttonEnable || modal}
            color={isOpen ? "error" : "success"}
            onClick={isOpen ? handleModalOpen : handleCheckIn}
          >
            {buttonName}
          </Button>
        </Stack>

        <CheckOutDialog
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