import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditNote';
import { getAllSchedule, getSchedule, updateSchedule } from '../../../apis/schedule/schedule.apis';
import type { GetAllScheduleResponseDto } from '../../../dtos/schedule/response/get-all-schedule.response.dto';
import type { GetScheduleResponseDto } from '../../../dtos/schedule/response/get-schedule.response.dto';
import type { UpdateScheduleRequestDto } from '../../../dtos/schedule/request/update-schedule.request.dto';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import ScheduleDetailModal from '../../../components/schedule/ScheduleDetailModal';

function ScheduleListPage() {
  const page = 0;
  const size = 10;
  const sort = "createdAt,desc";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTI3Njk2NiwiZXhwIjoxNzYxMzEyOTY2fQ.Dyl4lzTzZ2wIf3DjgQGI3sHZGo_3OIpJ7-8CTF7V7Ag";

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<GetScheduleResponseDto | null>(null);

  const [schedules, setSchedules] = useState<GetAllScheduleResponseDto[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openModal = (schedule: GetScheduleResponseDto) => {
    setSelectedSchedule(schedule);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSchedule(null);
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      if (!accessToken) {
        setError("인증 토큰이 없습니다.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const response = await getAllSchedule(page, size, sort, accessToken);
        if (response.code === "SU" && Array.isArray(response.data?.content)) {
          setSchedules(response.data.content);
        } else {
          setError(response.message || "스케줄 목록을 불러오는 데 실패했습니다.");
        }
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  const openModalWithScheduleId = async (id: number) => {
    try {
      const response = await getSchedule(id, accessToken);
      if (response.code === "SU" && response.data) {
        openModal(response.data);
      } else {
        alert(response.message || "스케줄 상세 정보를 불러오는 데 실패했습니다.");
      }
    } catch (err) {
      alert("오류가 발생했습니다.");
      console.error(err);
    }
  };

  const handleUpdate = async (scheduleId: number, dto: UpdateScheduleRequestDto) => {
    try {
      const response = await updateSchedule(scheduleId, dto, accessToken);
      if (response.code === "SU" && response.data) {
        alert('수정 완료');
        setSchedules(prev =>
          prev.map(s => (s.id === scheduleId ? { ...s, ...response.data } : s))
        );
        closeModal();
      } else {
        alert('수정 실패: ' + response.message);
      }
    } catch (err) {
      console.error(err);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Typography variant='h4' gutterBottom>
          스케줄 목록 (관리자)
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>데이터 로딩 중...</Typography>
          </Box>
        )}

        {error && (
          <Typography variant="body1" color="error" sx={{ mt: 4, textAlign: 'center' }}>
            오류: {error}
          </Typography>
        )}

        {!loading && !error && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell align='center'>스케줄 번호</TableCell>
                  <TableCell align='center'>배차 번호</TableCell>
                  <TableCell align='center'>배송 날짜</TableCell>
                  <TableCell align='center'>출발 시간</TableCell>
                  <TableCell align='center'>도착 시간</TableCell>
                  <TableCell align='center'>요청일</TableCell>
                  <TableCell align='center'>수정일</TableCell>
                  <TableCell align='center'>세부 정보</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      표시할 스케줄이 없습니다.
                    </TableCell>
                  </TableRow>
                ) : (
                  schedules.map((schedule) => (
                    <TableRow key={schedule.id} hover>
                      <TableCell align='center'>{schedule.id}</TableCell>
                      <TableCell align='center'>{schedule.allocationId}</TableCell>
                      <TableCell align='center'>{schedule.allocationDate}</TableCell>
                      <TableCell align='center'>{schedule.departureTime}</TableCell>
                      <TableCell align='center'>{schedule.arrivalTime}</TableCell>
                      <TableCell align='center'>{schedule.createdAt}</TableCell>
                      <TableCell align='center'>{schedule.updatedAt}</TableCell>
                      <TableCell align='center'>
                        <IconButton aria-label='details' size='small' onClick={() => openModalWithScheduleId(schedule.id)}>
                          <EditDocumentIcon fontSize='inherit' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {selectedSchedule && (
          <ScheduleDetailModal
            isOpen={modalOpen}
            onClose={closeModal}
            onUpdate={handleUpdate}
            schedule={selectedSchedule}
          />
        )}
      </Box>
    </Box>
  );
}

export default ScheduleListPage;