import { Box, Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, Pagination, TableRow, Typography, CircularProgress, Toolbar } from "@mui/material";
import EditDocumentIcon from '@mui/icons-material/EditNote';
import { useEffect, useState, type ChangeEvent } from "react";
// import { useCookies } from "react-cookie";
import { getAllMyAttendance, getAttendanceDetail } from "../../apis/attendance/attendance.apis";
import type { GetAllMyAttendanceResponseDto } from "../../dtos/attendance/response/get-all-my-attendance.response.dto";
import type PageDto from "../../dtos/page.dto";
import type { GetAttendanceDetailResponseDto } from "../../dtos/attendance/response/get-attendance-detail.response.dto";
import AttendanceDetailModal from "../../components/attendance/AttendanceDetailModal";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function MyAttendanceListPage() {
  // const [cookies] = useCookies(["accessToken"]);
  // const accessToken = cookies.accessToken;
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkcml2ZXIwMDMiLCJyb2xlIjoiRFJJVkVSIiwiaWF0IjoxNzYwMzI5NTM1LCJleHAiOjE3NjAzNjU1MzV9.UoHQTgtiClYDeQjAijgby_yefknx4uVOIJG8fkuvikk";
  const [page, setPage] = useState(0);
  const [queryKey, setQueryKey] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [pageData, setPageData] = useState<PageDto<GetAllMyAttendanceResponseDto>> ({
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
  const [modal, setModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState<GetAttendanceDetailResponseDto>();
  const size = 20;
  const sort = "desc";
  
  useEffect(() => {
    if (queryKey === 0) return;

    fetchMyAttendances();
  }, [page, queryKey, accessToken]);

  const fetchMyAttendances = async () =>  {
    if (!accessToken || listLoading) return;
        
    try {
      setListLoading(true);

      const response = await getAllMyAttendance(page, size, sort, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setPageData(data);
      } else {
        console.error("출근부 조회 실패: ", message);
        alert("출근부 조회 실패");
      }
    } catch (e) {
      console.error("출근부 조회 중 에러 발생: ", e);
      alert("출근부 조회 요청 중 문제 발생");
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

    setModal(true);
    setSelectedAttendance(undefined);
        
    try {
      setDetailLoading(true);
      
      const response = await getAttendanceDetail(attendanceId, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setSelectedAttendance(data);
      } else {
        console.error("출근부 상세 조회 실패: ", message);
        alert("출근부 상세 조회 실패");
      }
    } catch (e) {
      console.error("출근부 상세 조회 중 에러 발생: ", e);
      alert("출근부 상세 조회 요청 중 문제 발생");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleModalClose = () => setModal(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            내 출근부 조회
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
                    <TableCell align="center">출근 시간</TableCell>
                    <TableCell align="center">퇴근 시간</TableCell>
                    <TableCell align="center">상세 조회</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listLoading && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <CircularProgress color="inherit" size={28} sx={{ mx: 'auto' }}/>
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && queryKey > 0 && pageData.totalElements <= 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        조회 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && pageData.content.map((row, index) => {
                    return (
                      <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                        <TableCell align="center">{page * size + index + 1}</TableCell>
                        <TableCell align="center">{row.workStart}</TableCell>
                        <TableCell align="center">{row.workEnd}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleDetail(row.id)}>
                            <EditDocumentIcon />
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
          open={modal}
          loading={detailLoading}
          onClose={handleModalClose}
        />
      </Box>
    </Box>
  )
}

export default MyAttendanceListPage;