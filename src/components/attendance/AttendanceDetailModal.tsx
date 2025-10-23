import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import type { GetAttendanceDetailResponseDto } from '../../dtos/attendance/response/get-attendance-detail.response.dto';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  attendance: GetAttendanceDetailResponseDto | undefined;
  open: boolean;
  loading: boolean;
  onClose: () => void;
}

function AttendanceDetailModal({ attendance, open, loading, onClose }: Props) {
  const isOpen = attendance?.openFlag;

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          출 · 퇴근 기록 상세 조회
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Stack sx={{ p: 3 }} alignItems="center" >
            <CircularProgress color="inherit" size={28} sx={{ mx: 'auto' }} />
          </Stack>
        ) : attendance ? (
          <Stack spacing={2}>
            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                      기사 정보
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>고유번호</TableCell>
                    <TableCell>{attendance.driverId}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>성함</TableCell>
                    <TableCell>{attendance.driverName}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>휴대폰번호</TableCell>
                    <TableCell>{attendance.driverPhone}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>입사일</TableCell>
                    <TableCell>{attendance.driverCompanyJoin}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                      출근 정보
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>출근 여부</TableCell>
                    <TableCell>{isOpen ? "출근 중" : "퇴근"}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}></TableCell>
                    <TableCell></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>출근 시간</TableCell>
                    <TableCell>{attendance.workStart}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>퇴근 시간</TableCell>
                    <TableCell>{attendance.workEnd ?? "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                      입력 정보
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>등록일</TableCell>
                    <TableCell>{attendance.createdAt}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>수정일</TableCell>
                    <TableCell>{attendance.updatedAt}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        ) : (
          <Typography>상세 정보를 불러올 수 없습니다.</Typography>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AttendanceDetailModal;