import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import type PageDto from "../../dtos/page.dto";
import { type ChangeEvent } from "react";
import type { GetDeductionTypeUpdateLogResponseDto } from "../../dtos/deductionTypeLog/response/get-deduction-type-update-log.response.dto";

interface Props {
  log: PageDto<GetDeductionTypeUpdateLogResponseDto>;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onChangePage: (page: number, size: number, sort: string) => void;
}

const logNameMap: Record<string, string> = {
  name: "항목명",
  description: "설명",
  is_active: "사용 여부"
}

function DeductionTypeUpdateLogsModal({log, open, loading, onClose, onChangePage }: Props) {
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
          수정 이력 조회
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
                      <TableCell align="center">코드명</TableCell>
                      <TableCell align="center">항목명</TableCell>
                      <TableCell align="center">수정 전</TableCell>
                      <TableCell align="center">수정 후</TableCell>
                      <TableCell align="center">작업자 ID</TableCell>
                      <TableCell align="center">수정일</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {!loading && log.totalElements <= 0 && (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          조회 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}

                    {!loading && log.content.map((row, index) => {
                      return (
                        <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                          <TableCell align="center">{log.number * size + index + 1}</TableCell>
                          <TableCell align="center">{row.code}</TableCell>
                          <TableCell align="center">{logNameMap[row.type] ?? row.type}</TableCell>
                          <TableCell align="center">
                            {row.type === "is_active"
                              ? String(row.prevData) === "true"
                                ? "사용"
                                : "미사용"
                              : row.prevData}
                          </TableCell>
                          <TableCell align="center">
                            {row.type === "is_active"
                              ? String(row.newData) === "true"
                                ? "사용"
                                : "미사용"
                              : row.newData}
                          </TableCell>
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

        {!loading && log.totalPages > 0 && (
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

export default DeductionTypeUpdateLogsModal;