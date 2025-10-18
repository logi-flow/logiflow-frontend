import { Box, Button, Chip, CircularProgress, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState, type ChangeEvent } from "react";
// import { useCookies } from "react-cookie";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import type PageDto from "../../dtos/page.dto";
import type { GetAllDriverPayrollResponseDto } from "../../dtos/driverPayroll/response/get-all-driver-payroll.response.dto";
import type { GetDriverPayrollDetailResponseDto } from "../../dtos/driverPayroll/response/get-driver-payroll-detail.response.dto";
import { getAllMyPayroll, getMyPayrollDetail } from "../../apis/driverPayroll/driver-payroll.apis";
import { payrollStatusColorMap, payrollStatusMap } from "../../enums/driver-payroll-status.enum";
import MyDriverPayrollDetailModal from "../../components/driverPayroll/MyDriverPayrollDetailModal";

function MyDriverPayrollListPage() {
  // const [cookies] = useCookies(["accessToken"]);
  // const accessToken = cookies.accessToken;
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkcml2ZXIwMDEiLCJyb2xlIjoiRFJJVkVSIiwiaWF0IjoxNzYwNzg1MDM2LCJleHAiOjE3NjA4MjEwMzZ9._BqLiHy3V4TPuXdghJ_TW1cybPKV8BP028C2LvKjsa4";
  const [page, setPage] = useState(0);
  const [queryKey, setQueryKey] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [listData, setListData] = useState<PageDto<GetAllDriverPayrollResponseDto>>({
    content: [],
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    hasNext: false,
    hasPrevious: false,
    sort: 'desc',
  });
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<GetDriverPayrollDetailResponseDto>();
  const size = 10;
  const sort = "desc";

  useEffect(() => {
    if (queryKey === 0) return;

    fetchMyDriverPayrolls();
  }, [page, queryKey, accessToken]);

  const fetchMyDriverPayrolls = async () =>  {
    if (!accessToken || listLoading) return;
        
    try {
      setListLoading(true);

      const response = await getAllMyPayroll(page, size, sort, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setListData(data);
      } else {
        console.error("기사 급여대장 전체 조회 실패: ", message);
        alert("기사 급여대장 전체 조회 실패: " + message);
      }
    } catch (e) {
      console.error("기사 급여대장 전체 조회 중 에러 발생: ", e);
      alert("기사 급여대장 전체 조회 중 에러 발생: " + e);
    } finally {
      setListLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    setQueryKey(prev => prev + 1);
  };

  const handleDetail = async (payrollId: number) => {
    if (!accessToken || detailLoading) return;

    setOpenDetailModal(true);
    setSelectedPayroll(undefined);

    try {
      setDetailLoading(true);
      
      const response = await getMyPayrollDetail(payrollId, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setSelectedPayroll(data);
      } else {
        console.error("본인 급여대장 상세 조회 실패: ", message);
        alert("본인 급여대장 상세 조회 실패: " + message);
      }
    } catch (e) {
      console.error("본인 급여대장 상세 조회 중 에러 발생: ", e);
      alert("본인 급여대장 상세 조회 중 에러 발생: " + e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleDetailModalClose = () => setOpenDetailModal(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            급여대장 조회
          </Typography>
        </Stack>

        <Stack sx={{ p: 3 }} spacing={2} direction="row" alignItems="center" justifyContent="right">
          <Button
            sx={{ width: '80px' }}
            variant="contained"
            size="large"
            disabled={listLoading}
            onClick={handleSearch}
          >
            조회
          </Button>
        </Stack>

        <Stack sx={{ p: 3 }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }}>
                <caption>총 {listData.totalElements}건</caption>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">순번</TableCell>
                    <TableCell align="center">기사 고유번호</TableCell>
                    <TableCell align="center">기사 이름</TableCell>
                    <TableCell align="center">급여대장명</TableCell>
                    <TableCell align="center">수당 총액 (원)</TableCell>
                    <TableCell align="center">공제 총액 (원)</TableCell>
                    <TableCell align="center">합계 (원)</TableCell>
                    <TableCell align="center">상태</TableCell>
                    <TableCell align="center">상세 조회</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listLoading && (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        <CircularProgress color="inherit" size={28} sx={{ mx: 'auto' }}/>
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && queryKey > 0 && listData.totalElements <= 0 && (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        조회 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && listData.content.map((row, index) => {
                    return (
                      <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                        <TableCell align="center">{page * size + index + 1}</TableCell>
                        <TableCell align="center">{row.driverId}</TableCell>
                        <TableCell align="center">{row.driverName}</TableCell>
                        <TableCell align="center">{row.title}</TableCell>
                        <TableCell align="center">{row.totalAllowance.toLocaleString()}</TableCell>
                        <TableCell align="center">{row.totalDeduction.toLocaleString()}</TableCell>
                        <TableCell align="center">{row.finalAmount.toLocaleString()}</TableCell>
                        <TableCell align="center">
                          <Chip
                            size="small"
                            label={payrollStatusMap[row.status] ?? "알 수 없음"}
                            color={payrollStatusColorMap[row.status] ?? "default"}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleDetail(row.id)}>
                            <EditNoteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>

        {!listLoading && queryKey > 0 && listData.totalPages > 0 && (
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={listData.totalPages}
              page={page + 1}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}

        <MyDriverPayrollDetailModal
          payroll={selectedPayroll}
          open={openDetailModal}
          loading={detailLoading}
          onClose={handleDetailModalClose}
        />
      </Box>
    </Box>
  )
}

export default MyDriverPayrollListPage;