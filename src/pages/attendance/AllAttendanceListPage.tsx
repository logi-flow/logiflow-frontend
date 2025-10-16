import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, Pagination, TableRow, Typography, CircularProgress, Toolbar } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState, type ChangeEvent } from "react";
// import { useCookies } from "react-cookie";
import { getAllAttendance, getAttendanceDetail } from "../../apis/attendance/attendance.apis";
import type PageDto from "../../dtos/page.dto";
import type { GetAttendanceDetailResponseDto } from "../../dtos/attendance/response/get-attendance-detail.response.dto";
import AttendanceDetailModal from "../../components/attendance/AttendanceDetailModal";
import type { GetAllAttendanceResponseDto } from "../../dtos/attendance/response/get-all-attendance.response.dto";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function AllAttendanceListPage() {
  // const [cookies] = useCookies(["accessToken"]);
  // const accessToken = cookies.accessToken;
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MDYxODg0NiwiZXhwIjoxNzYwNjU0ODQ2fQ.AdeADoxhUp79ngGMcUnYiH-Vv8wvuKPw1iEM8Fu5YE8";
  const [page, setPage] = useState(0);
  const [queryKey, setQueryKey] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [pageData, setPageData] = useState<PageDto<GetAllAttendanceResponseDto>> ({
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
  const [openModal, setOpenModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<GetAttendanceDetailResponseDto>();
  const size = 20;
  const sort = "desc";
  
  useEffect(() => {
    if (queryKey === 0) return;

    fetchAllAttendances();
  }, [page, queryKey, accessToken]);

  const fetchAllAttendances = async () =>  {
    if (!accessToken || listLoading) return;
        
    try {
      setListLoading(true);

      const response = await getAllAttendance(page, size, sort, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setPageData(data);
      } else {
        console.error("출근부 전체 조회 실패: ", message);
        alert("출근부 전체 조회 실패: " + message);
      }
    } catch (e) {
      console.error("출근부 전체 조회 중 에러 발생: ", e);
      alert("출근부 전체 조회 중 에러 발생: " + e);
    } finally {
      setListLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    setQueryKey(prev => prev + 1);
  };

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleDetail = async (attendanceId: number) => {
    if (!accessToken || detailLoading) return;

    setOpenModal(true);
    setSelectedAttendance(undefined);

    try {
      setDetailLoading(true);
      
      const response = await getAttendanceDetail(attendanceId, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setSelectedAttendance(data);
      } else {
        console.error("출근부 상세 조회 실패: ", message);
        alert("출근부 상세 조회 실패: " + message);
      }
    } catch (e) {
      console.error("출근부 상세 조회 중 에러 발생: ", e);
      alert("출근부 상세 조회 중 에러 발생: " + e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleModalClose = () => setOpenModal(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            기사 출근부 조회
          </Typography>
        </Stack>

        <Stack sx={{ p: 3 }} direction="row" alignItems="center" justifyContent="right">
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
                <caption>총 {pageData.totalElements}건</caption>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">순번</TableCell>
                    <TableCell align="center">기사 고유번호</TableCell>
                    <TableCell align="center">기사 이름</TableCell>
                    <TableCell align="center">출근 시간</TableCell>
                    <TableCell align="center">퇴근 시간</TableCell>
                    <TableCell align="center">상세 조회</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listLoading && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress color="inherit" size={28} sx={{ mx: 'auto' }}/>
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && queryKey > 0 && pageData.totalElements <= 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        조회 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && pageData.content.map((row, index) => {
                    return (
                      <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                        <TableCell align="center">{page * size + index + 1}</TableCell>
                        <TableCell align="center">{row.driverId}</TableCell>
                        <TableCell align="center">{row.driverName}</TableCell>
                        <TableCell align="center">{row.workStart}</TableCell>
                        <TableCell align="center">{row.workEnd}</TableCell>
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

        {!listLoading && queryKey > 0 && pageData.totalPages > 0 && (
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={pageData.totalPages}
              page={page + 1}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}

        <AttendanceDetailModal
          attendance={selectedAttendance}
          open={openModal}
          loading={detailLoading}
          onClose={handleModalClose}
        />
      </Box>
    </Box>
  )
}

export default AllAttendanceListPage;