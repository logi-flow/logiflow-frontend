import { useEffect, useState, type ChangeEvent } from "react";
import EditNoteIcon from '@mui/icons-material/EditNote';
// import { useCookies } from "react-cookie";
import type PageDto from "../../dtos/page.dto";
import { Box, Button, Chip, CircularProgress, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import type { GetAllDeductionTypeResponseDto } from "../../dtos/deductionType/response/get-all-deduction-type.response.dto";
import type { GetDeductionTypeUpdateLogResponseDto } from "../../dtos/deductionTypeLog/response/get-deduction-type-update-log.response.dto";
import type { GetDeductionTypeDetailResponseDto } from "../../dtos/deductionType/response/get-deduction-type-detail.response.dto";
import { createDeductionType, deleteDeductionType, getAllDeductionType, getDeductionTypeDetail, updateDeductionType } from "../../apis/deductionType/deduction-type.apis";
import { getDeductionTypeUpdateLogs } from "../../apis/deductionType/deduction-type-log.apis";
import type { CreateDeductionTypeRequestDto } from "../../dtos/deductionType/request/create-deduction-type.request.dto";
import type { UpdateDeductionTypeRequestDto } from "../../dtos/deductionType/request/update-deduction-type.request.dto";
import CreateDeductionTypeModal from "../../components/deductionType/CreateDeductionTypeModal";
import DeductionTypeDetailModal from "../../components/deductionType/DeductionTypeDetailModal";
import UpdateDeductionTypeModal from "../../components/deductionType/UpdateDeductionTypeModal";
import DeductionTypeUpdateLogsModal from "../../components/deductionType/DeductionTypeUpdateLogsModal";

function AllDeductionTypeListPage() {
  // const [cookies] = useCookies(["accessToken"]);
  // const accessToken = cookies.accessToken;
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MDYxODg0NiwiZXhwIjoxNzYwNjU0ODQ2fQ.AdeADoxhUp79ngGMcUnYiH-Vv8wvuKPw1iEM8Fu5YE8";
  const [page, setPage] = useState(0);
  const [queryKey, setQueryKey] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [logLoading, setLogLoading] = useState(false);
  const [listData, setListData] = useState<PageDto<GetAllDeductionTypeResponseDto>> ({
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
  const [logData, setLogData] = useState<PageDto<GetDeductionTypeUpdateLogResponseDto>> ({
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
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openUpdateLogModal, setOpenUpdateLogModal] = useState(false);
  const [selectedDeductionType, setSelectedDeductionType] = useState<GetDeductionTypeDetailResponseDto>();
  const size = 10;
  const sort = "desc";

  useEffect(() => {
    if (queryKey === 0) return;

    fetchAllDeductionTypes();
  }, [page, queryKey, accessToken]);

  const fetchAllDeductionTypes = async () =>  {
    if (!accessToken || listLoading) return;
        
    try {
      setListLoading(true);

      const response = await getAllDeductionType(page, size, sort, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setListData(data);
      } else {
        console.error("공제 항목 전체 조회 실패: ", message);
        alert("공제 항목 전체 조회 실패: " + message);
      }
    } catch (e) {
      console.error("공제 항목 전체 조회 중 에러 발생: ", e);
      alert("공제 항목 전체 조회 중 에러 발생: " + e);
    } finally {
      setListLoading(false);
    }
  };

  const fetchDeductionTypeUpdateLogs = async (page: number, size: number, sort: string) =>  {
    if (!accessToken || logLoading) return;
        
    try {
      setLogLoading(true);

      const response = await getDeductionTypeUpdateLogs(page, size, sort, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setLogData(data);
      } else {
        console.error("공제 항목 수정 이력 조회 실패: ", message);
        alert("공제 항목 수정 이력 조회 실패: " + message);
      }
    } catch (e) {
      console.error("공제 항목 수정 이력 조회 중 에러 발생: ", e);
      alert("공제 항목 수정 이력 조회 중 에러 발생: " + e);
    } finally {
      setLogLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    setQueryKey(prev => prev + 1);
  };

  const handleCreate = async (dto: CreateDeductionTypeRequestDto) => {
    if (!accessToken || createLoading) return;

    setOpenCreateModal(true);

    try {
      setCreateLoading(true);

      const response = await createDeductionType(dto, accessToken)
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setOpenCreateModal(false);
        setPage(0);
        setQueryKey(prev => prev + 1);
      } else {
        console.error("공제 항목 생성 실패: ", message);
        alert("공제 항목 생성 실패: " + message);
      }
    } catch (e) {
      console.error("공제 항목 생성 중 에러 발생: ", e);
      alert("공제 항목 생성 중 에러 발생: " + e);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDetail = async (deductionTypeId: number) => {
    if (!accessToken || detailLoading) return;

    setOpenDetailModal(true);
    setSelectedDeductionType(undefined);

    try {
      setDetailLoading(true);
      
      const response = await getDeductionTypeDetail(deductionTypeId, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setSelectedDeductionType(data);
      } else {
        console.error("공제 항목 상세 조회 실패: ", message);
        alert("공제 항목 상세 조회 실패: " + message);
      }
    } catch (e) {
      console.error("공제 항목 상세 조회 중 에러 발생: ", e);
      alert("공제 항목 상세 조회 중 에러 발생: " + e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleUpdate = async (deductionTypeId: number, dto: UpdateDeductionTypeRequestDto) => {
    if (!accessToken || updateLoading) return;

    try {
      setUpdateLoading(true);

      const response = await updateDeductionType(deductionTypeId, dto, accessToken)
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setOpenUpdateModal(false);
        await fetchAllDeductionTypes();
        
        if (selectedDeductionType) {
          handleDetail(selectedDeductionType.id);
        }
      } else {
        console.error("공제 항목 수정 실패: ", message);
        alert("공제 항목 수정 실패: " + message);
      }
    } catch (e) {
      console.error("공제 항목 수정 중 에러 발생: ", e);
      alert("공제 항목 수정 중 에러 발생: " + e);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (deductionTypeId: number) => {
    if (!accessToken || detailLoading) return;

    try {
      setDetailLoading(true);

      const response = await deleteDeductionType(deductionTypeId, accessToken)
      const { code, message } = response;
      
      if (code === "SU") {
        setOpenDetailModal(false);
        await fetchAllDeductionTypes();
      } else {
        console.error("공제 항목 삭제 실패: ", message);
        alert("공제 항목 삭제 실패: " + message);
      }
    } catch (e) {
      console.error("공제 항목 삭제 중 에러 발생: ", e);
      alert("공제 항목 삭제 중 에러 발생: " + e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleLog = () => {
    if (!accessToken || logLoading) return;

    setOpenUpdateLogModal(true);
    fetchDeductionTypeUpdateLogs(0, 20, "desc");
  };

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleEditForm = () => {
    setOpenDetailModal(false);
    setTimeout(() => setOpenUpdateModal(true), 0);
  };
  
  const handleCreateModalOpen = () => setOpenCreateModal(true);
  const handleCreateModalClose = () => setOpenCreateModal(false);
  const handleDetailModalClose = () => setOpenDetailModal(false);
  const handleUpdateModalClose = () => setOpenUpdateModal(false);
  const handleUpdateLogModalClose = () => setOpenUpdateLogModal(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            공제 항목 관리
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
          <Button
            sx={{ width: '80px' }}
            variant="contained"
            size="large"
            disabled={listLoading}
            onClick={handleCreateModalOpen}
          >
            추가
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
                    <TableCell align="center">코드명</TableCell>
                    <TableCell align="center">항목명</TableCell>
                    <TableCell align="center">사용 여부</TableCell>
                    <TableCell align="center">상세 조회</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listLoading && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <CircularProgress color="inherit" size={28} sx={{ mx: 'auto' }}/>
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && queryKey > 0 && listData.totalElements <= 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        조회 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && listData.content.map((row, index) => {
                    return (
                      <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                        <TableCell align="center">{page * size + index + 1}</TableCell>
                        <TableCell align="center">{row.code}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={row.active ? "사용" : "미사용"}
                            color={row.active ? "success" : "error"}
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

        <Stack sx={{ marginX: 3 }} direction="row" alignItems="center" justifyContent="right">
          <Button variant="outlined" onClick={handleLog}>
              수정 이력 보기
            </Button>
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

        <CreateDeductionTypeModal
          open={openCreateModal}
          loading={createLoading}
          onClose={handleCreateModalClose}
          onConfirm={handleCreate}
        />

        <DeductionTypeDetailModal
          deductionType={selectedDeductionType}
          open={openDetailModal}
          loading={detailLoading}
          onClose={handleDetailModalClose}
          onEdit={handleEditForm}
          onDelete={handleDelete}
        />

        <UpdateDeductionTypeModal
          deductionType={selectedDeductionType}
          open={openUpdateModal}
          loading={updateLoading}
          onClose={handleUpdateModalClose}
          onConfirm={handleUpdate}
        />

        <DeductionTypeUpdateLogsModal 
          log={logData}
          open={openUpdateLogModal}
          loading={logLoading}
          onClose={handleUpdateLogModalClose}
          onChangePage={fetchDeductionTypeUpdateLogs}
        />
      </Box>
    </Box>
  )
}

export default AllDeductionTypeListPage;