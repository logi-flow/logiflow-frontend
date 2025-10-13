import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import type { GetAttendanceDetailResponseDto } from '../../dtos/attendance/response/get-attendance-detail.response.dto'

interface Props {
  attendance: GetAttendanceDetailResponseDto | undefined;
  open: boolean;
  loading: boolean;
  onClose: () => void;
}

function AttendanceDetailDialog({ attendance, open, loading, onClose }: Props) {
  const isOpen = attendance?.openFlag;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>
        출 · 퇴근 기록 상세 조회
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Stack sx={{ p: 3 }} alignItems="center" >
            <CircularProgress color="inherit" size={28} sx={{ mx: 'auto'}}/>
          </Stack>
        ) : attendance ? (
          <Stack spacing={2}>
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

                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                    출근 정보
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>출근 여부</TableCell>
                  <TableCell>{isOpen ? "출근 중" : "퇴근"}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>출근 시간</TableCell>
                  <TableCell>{attendance.workStart}</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>퇴근 시간</TableCell>
                  <TableCell>{attendance.workEnd ?? "-"}</TableCell>
                </TableRow>

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
          </Stack>
        ) : (
          <Typography>상세 정보를 불러올 수 없습니다.</Typography>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AttendanceDetailDialog;