import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import type PageDto from "../../dtos/page.dto";
import { type ChangeEvent } from "react";
import type { GetDriverDeductionUpdateLogResponseDto } from "../../dtos/driverDeductionLog/response/get-driver-deduction-update-log.response.dto";

interface Props {
  log: PageDto<GetDriverDeductionUpdateLogResponseDto>;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onChangePage: (page: number, size: number, sort: string) => void;
}

const logNameMap: Record<string, string> = {
  quantity: "수량(일수)",
  unit_price: "단가",
  memo: "메모"
}

function DriverDeductionLogsModal({ log, open, loading, onClose, onChangePage }: Props) {
  const size = 20;
  const sort = "desc";

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    const page = newPage - 1;
    onChangePage(page, size, sort);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          공제 내역 수정 이력 조회
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Stack sx={{ p: 3 }} alignItems="center" >
            <CircularProgress color="inherit" size={28} sx={{ mx: 'auto'}}/>
          </Stack>
        ) : log ? (
          <Stack spacing={2}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }}>
                  <caption>총 {log.totalElements}건</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">순번</TableCell>
                      <TableCell align="center">기사 고유번호</TableCell>
                      <TableCell align="center">기사 이름</TableCell>
                      <TableCell align="center">급여대장 고유번호</TableCell>
                      <TableCell align="center">항목 코드명</TableCell>
                      <TableCell align="center">항목명</TableCell>
                      <TableCell align="center">타입</TableCell>
                      <TableCell align="center">수정 전</TableCell>
                      <TableCell align="center">수정 후</TableCell>
                      <TableCell align="center">작업자 ID</TableCell>
                      <TableCell align="center">수정일</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {log.totalElements <= 0 && (
                      <TableRow>
                        <TableCell colSpan={11} align="center">
                          조회 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}

                    {log.content.map((row, index) => {
                      return (
                        <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                          <TableCell align="center">{log.number * size + index + 1}</TableCell>
                          <TableCell align="center">{row.driverId}</TableCell>
                          <TableCell align="center">{row.driverName}</TableCell>
                          <TableCell align="center">{row.payrollId}</TableCell>
                          <TableCell align="center">{row.code}</TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{logNameMap[row.type] ?? row.type}</TableCell>
                          <TableCell align="center">{row.prevData}</TableCell>
                          <TableCell align="center">{row.newData}</TableCell>
                          <TableCell align="center">{row.changedByUsername}</TableCell>
                          <TableCell align="center">{row.createdAt}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Stack>
        ) : (
          <Typography>이력 내역을 불러올 수 없습니다.</Typography>
        )}

        {log.totalPages > 0 && (
          <Stack sx={{ mt: 3 }} spacing={2} alignItems="center">
            <Pagination
              count={log.totalPages}
              page={log.number + 1}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DriverDeductionLogsModal;