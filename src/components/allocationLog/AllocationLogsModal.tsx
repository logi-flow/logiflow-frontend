import React, { type ChangeEvent } from 'react'
import type { GetAllocationUpdateLogResponseDto } from '../../dtos/allocationLog/get-allocation-update-log.response.dto';
import type PageDto from '../../dtos/page.dto';
import type { GetAllocationStatusLogResponseDto } from '../../dtos/allocationLog/get-allocation-status-log.response.dto';
import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  logType: 'update' | 'status';
  log: PageDto<GetAllocationUpdateLogResponseDto> | PageDto<GetAllocationStatusLogResponseDto>;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onChangePage: (page: number, size: number, sort: string) => void;
}

const updateLogNameMap: Record<string, string> = {
  delivery_id: "배달 ID",
  return_delivery_id: "반품 ID",
  assignment_id: "배정 ID",
  district_name: "구역 이름",
}

function AllocationLogsModal({ log, logType, open, loading, onClose, onChangePage }: Props) {
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

  const getTitle = () => {
    return logType === 'update' ? '배차 수정 이력' : '배차 상태 변경 이력';
  };

  const updateLogs = log as PageDto<GetAllocationUpdateLogResponseDto>;
  const statusLogs = log as PageDto<GetAllocationStatusLogResponseDto>;

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
          {getTitle()}
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
        ) : log ? (
          <Stack spacing={2}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }}>
                  <caption>총 {log.totalElements}건</caption>

                  {logType === 'update' ? (
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">순번</TableCell>
                        <TableCell align="center">계약 ID</TableCell>
                        <TableCell align="center">항목명</TableCell>
                        <TableCell align="center">수정 전</TableCell>
                        <TableCell align="center">수정 후</TableCell>
                        <TableCell align="center">작업자 ID</TableCell>
                        <TableCell align="center">수정일</TableCell>
                      </TableRow>
                    </TableHead>
                  ) : (
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">순번</TableCell>
                        <TableCell align="center">계약 ID</TableCell>
                        <TableCell align="center">이전 상태</TableCell>
                        <TableCell align="center">이후 상태</TableCell>
                        <TableCell align="center">작업자 ID</TableCell>
                        <TableCell align="center">변경일</TableCell>
                      </TableRow>
                    </TableHead>
                  )}

                  <TableBody>
                    {log.totalElements <= 0 && (
                      <TableRow>
                        <TableCell colSpan={logType === 'update' ? 7 : 6} align="center">
                          조회 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}

                    {logType === 'update' && updateLogs.content.map((row, index) => {
                      return (
                        <TableRow hover key={row.id}>
                          <TableCell align="center">{log.number * size + index + 1}</TableCell>
                          <TableCell align="center">{row.allocationId}</TableCell>
                          <TableCell align="center">{updateLogNameMap[row.type.trim()] ?? row.type.trim()}</TableCell>
                          <TableCell align="center">{row.prevData}</TableCell>
                          <TableCell align="center">{row.newData}</TableCell>
                          <TableCell align="center">{row.changedByUsername}</TableCell>
                          <TableCell align="center">{row.createdAt}</TableCell>
                        </TableRow>
                      )
                    }
                    )}

                    {logType === 'status' && statusLogs.content.map((row, index) => (
                      <TableRow hover key={row.id}>
                        <TableCell align="center">{log.number * size + index + 1}</TableCell>
                        <TableCell align="center">{row.allocationId}</TableCell>
                        <TableCell align="center">{row.prevStatus}</TableCell>
                        <TableCell align="center">{row.newStatus}</TableCell>
                        <TableCell align="center">{row.changedByUsername}</TableCell>
                        <TableCell align="center">{row.createdAt}</TableCell>
                      </TableRow>
                    ))}
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

export default AllocationLogsModal