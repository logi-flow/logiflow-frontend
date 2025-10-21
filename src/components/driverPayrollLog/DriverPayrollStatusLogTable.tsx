import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type PageDto from '../../dtos/page.dto';
import type { ChangeEvent } from 'react';
import type { GetDriverPayrollStatusLogResponseDto } from '../../dtos/driverPayrollLog/response/get-driver-payroll-status-log.response.dto';
import { payrollStatusMap } from '../../enums/driver-payroll-status.enum';

interface Props {
  log: PageDto<GetDriverPayrollStatusLogResponseDto>;
  size: number;
  onChangePage: (page: number) => void;
}

function DriverPayrollStatusLogTable({ log, size, onChangePage }: Props) {

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    const page = newPage - 1;
    onChangePage(page);
  };

  return (
    <>
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
                  <TableCell align="center">수정 전 상태</TableCell>
                  <TableCell align="center">수정 후 상태</TableCell>
                  <TableCell align="center">작업자 ID</TableCell>
                  <TableCell align="center">변경 사유</TableCell>
                  <TableCell align="center">수정일</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {log.totalElements <= 0 && (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
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
                      <TableCell align="center">{payrollStatusMap[row.prevStatus]}</TableCell>
                      <TableCell align="center">{payrollStatusMap[row.newStatus]}</TableCell>
                      <TableCell align="center">{row.changedByUsername}</TableCell>
                      <TableCell align="center">{row.changeReason}</TableCell>
                      <TableCell align="center">{row.createdAt}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Stack>

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
    </>
  )
}

export default DriverPayrollStatusLogTable;