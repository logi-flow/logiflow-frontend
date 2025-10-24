import { Box, Button, Chip, CircularProgress, IconButton, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, type SelectChangeEvent } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState, type ChangeEvent } from "react";
// import { useCookies } from "react-cookie";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import type PageDto from "../../dtos/page.dto";
import type { GetAllDriverPayrollResponseDto } from "../../dtos/driverPayroll/response/get-all-driver-payroll.response.dto";
import type { GetDriverPayrollDetailResponseDto } from "../../dtos/driverPayroll/response/get-driver-payroll-detail.response.dto";
import CreateDriverPayrollModal from "../../components/driverPayroll/CreateDriverPayrollModal";
import { createDriverPayroll, deleteDriverPayroll, getAllDriverPayroll, getDriverPayrollDetail, updateDriverPayroll, updateDriverPayrollStatus } from "../../apis/driverPayroll/driver-payroll.apis";
import { DriverPayrollStatus, payrollStatusColorMap, payrollStatusMap } from "../../enums/driver-payroll-status.enum";
import type { CreateDriverPayrollRequestDto } from "../../dtos/driverPayroll/request/create-driver-payroll.request.dto";
import DriverPayrollDetailModal from "../../components/driverPayroll/DriverPayrollDetailModal";
import type { UpdateDriverPayrollRequestDto } from "../../dtos/driverPayroll/request/update-driver-payroll.request.dto";
import type { UpdateDriverPayrollStatusRequestDto } from "../../dtos/driverPayroll/request/update-driver-payroll-status.request.dto";
import UpdateDriverPayrollStatusModal from "../../components/driverPayroll/UpdateDriverPayrollStatusModal";
import type { GetDriverPayrollUpdateLogResponseDto } from "../../dtos/driverPayrollLog/response/get-driver-payroll-update-log.response.dto";
import type { GetDriverPayrollStatusLogResponseDto } from "../../dtos/driverPayrollLog/response/get-driver-payroll-status-log.response.dto";
import { getDriverPayrollStatusLogs, getDriverPayrollUpdateLogs } from "../../apis/driverPayroll/driver-payroll-log.apis";
import DriverPayrollLogsModal from "../../components/driverPayrollLog/DriverPayrollLogsModal";
import CreateDriverAllowanceModal from "../../components/driverAllowance/CreateDriverAllowancelModal";
import { createDriverAllowance, deleteDriverAllowance, updateDriverAllowance } from "../../apis/driverAllowance/driver-allowance.apis";
import type { CreateDriverAllowanceRequestDto } from "../../dtos/driverAllowance/request/create-driver-allowance.request.dto";
import type { UpdateDriverAllowanceRequestDto } from "../../dtos/driverAllowance/request/update-driver-allowance.request.dto";
import type { UpdateDriverDeductionRequestDto } from "../../dtos/driverDeduction/request/update-driver-deduction.request.dto";
import { createDriverDeduction, deleteDriverDeduction, updateDriverDeduction } from "../../apis/driverDeduction/driver-deduction.apis";
import type { CreateDriverDeductionRequestDto } from "../../dtos/driverDeduction/request/create-driver-deduction.request.dto";
import CreateDriverDeductionModal from "../../components/driverDeduction/CreateDriverDeductionModal";

function AllDriverPayrollListPage() {
  // const [cookies] = useCookies(["accessToken"]);
  // const accessToken = cookies.accessToken;
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTMxNzIxNCwiZXhwIjoxNzYxMzUzMjE0fQ.VT_9aUXAujVF6HeXS5YbB8ORkqkwE9oEhcpB7wZ12pw";
  const [page, setPage] = useState(0);
  const [queryKey, setQueryKey] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateLogLoading, setUpdateLogLoading] = useState(false);
  const [statusLogLoading, setStatusLogLoading] = useState(false);
  const [createAllowanceLoading, setCreateAllowanceLoading] = useState(false);
  const [updateAllowanceLoading, setUpdateAllowanceLoading] = useState(false);
  const [deleteAllowanceLoading, setDeleteAllowanceLoading] = useState(false);
  const [createDeductionLoading, setCreateDeductionLoading] = useState(false);
  const [updateDeductionLoading, setUpdateDeductionLoading] = useState(false);
  const [deleteDeductionLoading, setDeleteDeductionLoading] = useState(false);
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
  const [updateLogData, setUpdateLogData] = useState<PageDto<GetDriverPayrollUpdateLogResponseDto>> ({
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
  const [statusLogData, setStatusLogData] = useState<PageDto<GetDriverPayrollStatusLogResponseDto>> ({
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
  const [openPayrollStatusUpdateModal, setOpenPayrollStatusUpdateModal] = useState(false);
  const [openAllowanceCreateModal, setOpenAllowanceCreateModal] = useState(false);
  const [openDeductionCreateModal, setOpenDeductionCreateModal] = useState(false);
  const [openLogModal, setOpenLogModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<GetDriverPayrollDetailResponseDto>();
  const [updatedStatusPayrollId, setUpdatedStatusPayrollId] = useState<number | null>(null);
  const [pendingStatus, setPendingStatus] = useState<DriverPayrollStatus | null>(null);
  const size = 10;
  const sort = "desc";

  useEffect(() => {
    if (queryKey === 0) return;

    fetchAllDriverPayrolls();
  }, [page, queryKey, accessToken]);

  const fetchAllDriverPayrolls = async () =>  {
    if (!accessToken || listLoading) return;
        
    try {
      setListLoading(true);

      const response = await getAllDriverPayroll(page, size, sort, accessToken);
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

  const fetchDriverPayrollUpdateLogs = async (page: number, size: number, sort: string) =>  {
    if (!accessToken || updateLogLoading) return;
        
    try {
      setUpdateLogLoading(true);

      const response = await getDriverPayrollUpdateLogs(page, size, sort, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setUpdateLogData(data);
      } else {
        console.error("기사 급여대장 수정 이력 조회 실패: ", message);
        alert("기사 급여대장 수정 이력 조회 실패: " + message);
      }
    } catch (e) {
      console.error("기사 급여대장 수정 이력 조회 중 에러 발생: ", e);
      alert("기사 급여대장 수정 이력 조회 중 에러 발생: " + e);
    } finally {
      setUpdateLogLoading(false);
    }
  };

  const fetchDriverPayrollStatusLogs = async (page: number, size: number, sort: string) =>  {
    if (!accessToken || statusLogLoading) return;
        
    try {
      setStatusLogLoading(true);

      const response = await getDriverPayrollStatusLogs(page, size, sort, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setStatusLogData(data);
      } else {
        console.error("기사 급여대장 수정 이력 조회 실패: ", message);
        alert("기사 급여대장 수정 이력 조회 실패: " + message);
      }
    } catch (e) {
      console.error("기사 급여대장 수정 이력 조회 중 에러 발생: ", e);
      alert("기사 급여대장 수정 이력 조회 중 에러 발생: " + e);
    } finally {
      setStatusLogLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    setQueryKey(prev => prev + 1);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>, payrollId: number, currentStatus: DriverPayrollStatus) => {
    const next = e.target.value as DriverPayrollStatus;

    if (next === currentStatus) return;

    handlePayrollStatusModalOpen(payrollId, next);
  };

  const handleCreate = async (dto: CreateDriverPayrollRequestDto) => {
    if (!accessToken || createLoading) return;

    setOpenCreateModal(true);

    try {
      setCreateLoading(true);

      const response = await createDriverPayroll(dto, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setOpenCreateModal(false);
        setPage(0);
        setQueryKey(prev => prev + 1);
      } else {
        console.error("기사 급여대장 생성 실패: ", message);
        alert("기사 급여대장 생성 실패: " + message);
      }
    } catch (e) {
      console.error("기사 급여대장 생성 중 에러 발생: ", e);
      alert("기사 급여대장 생성 중 에러 발생: " + e);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDetail = async (payrollId: number) => {
    if (!accessToken || detailLoading) return;

    setOpenDetailModal(true);
    setSelectedPayroll(undefined);

    try {
      setDetailLoading(true);
      
      const response = await getDriverPayrollDetail(payrollId, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setSelectedPayroll(data);
      } else {
        console.error("기사 급여대장 상세 조회 실패: ", message);
        alert("기사 급여대장 상세 조회 실패: " + message);
      }
    } catch (e) {
      console.error("기사 급여대장 상세 조회 중 에러 발생: ", e);
      alert("기사 급여대장 상세 조회 중 에러 발생: " + e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handlePayrollUpdate = async (payrollId: number, dto: UpdateDriverPayrollRequestDto) => {
    if (!accessToken || updateLoading) return;

    try {
      setUpdateLoading(true);

      const response = await updateDriverPayroll(payrollId, dto, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        await fetchAllDriverPayrolls();
        
        if (selectedPayroll) {
          handleDetail(selectedPayroll.id);
        }
      } else {
        console.error("기사 급여대장 정보 수정 실패: ", message);
        alert("기사 급여대장 정보 수정 실패: " + message);
      }
    } catch (e) {
      console.error("기사 급여대장 정보 수정 중 에러 발생: ", e);
      alert("기사 급여대장 정보 수정 중 에러 발생: " + e);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handlePayrollStatusUpdate = async (payrollId: number, dto: UpdateDriverPayrollStatusRequestDto) => {
    if (!accessToken || updateLoading) return;

    try {
      setUpdateLoading(true);

      const response = await updateDriverPayrollStatus(payrollId, dto, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setOpenPayrollStatusUpdateModal(false);
        await fetchAllDriverPayrolls();
      } else {
        console.error("기사 급여대장 상태 수정 실패: ", message);
        alert("기사 급여대장 상태 수정 실패: " + message);
      }
    } catch (e) {
      console.error("기사 급여대장 상태 수정 중 에러 발생: ", e);
      alert("기사 급여대장 상태 수정 중 에러 발생: " + e);
    } finally {
      setUpdatedStatusPayrollId(null);
      setPendingStatus(null);
      setUpdateLoading(false);
    }
  };

  const handleDelete = async (payrollId: number) => {
    if (!accessToken || detailLoading) return;

    try {
      setDetailLoading(true);

      const response = await deleteDriverPayroll(payrollId, accessToken);
      const { code, message } = response;
      
      if (code === "SU") {
        setOpenDetailModal(false);
        await fetchAllDriverPayrolls();
      } else {
        console.error("기사 급여대장 삭제 실패: ", message);
        alert("기사 급여대장 삭제 실패: " + message);
      }
    } catch (e) {
      console.error("기사 급여대장 삭제 중 에러 발생: ", e);
      alert("기사 급여대장 삭제 중 에러 발생: " + e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCreateAllowance = async (dto: CreateDriverAllowanceRequestDto) => {
    if (!accessToken || createAllowanceLoading || !selectedPayroll) return;

    try {
      setCreateAllowanceLoading(true);

      const response = await createDriverAllowance(selectedPayroll.id, dto, accessToken);
      const { code, message } = response;
      
      if (code === "SU") {
        setOpenDetailModal(false);
        setOpenAllowanceCreateModal(false);
        await fetchAllDriverPayrolls();

        if (selectedPayroll) {
          handleDetail(selectedPayroll.id);
        }
      } else {
        console.error("수당 내역 등록 실패: ", message);
        alert("수당 내역 등록 실패: " + message);
      }
    } catch (e) {
      console.error("수당 내역 등록 중 에러 발생: ", e);
      alert("수당 내역 등록 중 에러 발생: " + e);
    } finally {
      setCreateAllowanceLoading(false);
    }
  };

  const handleUpdateAllowance = async (dto: UpdateDriverAllowanceRequestDto) => {
    if (!accessToken || updateAllowanceLoading || !selectedPayroll) return;

    try {
      setUpdateAllowanceLoading(true);

      const response = await updateDriverAllowance(selectedPayroll.id, dto, accessToken);
      const { code, message } = response;
      
      if (code === "SU") {
        setOpenDetailModal(false);
        await fetchAllDriverPayrolls();

        if (selectedPayroll) {
          handleDetail(selectedPayroll.id);
        }
      } else {
        console.error("수당 내역 수정 실패: ", message);
        alert("수당 내역 수정 실패: " + message);
      }
    } catch (e) {
      console.error("수당 내역 수정 중 에러 발생: ", e);
      alert("수당 내역 수정 중 에러 발생: " + e);
    } finally {
      setUpdateAllowanceLoading(false);
    }
  };

  const handleDeleteAllowance = async (driverAllowanceId: number) => {
    if (!accessToken || deleteAllowanceLoading || !selectedPayroll) return;

    try {
      setDeleteAllowanceLoading(true);

      const response = await deleteDriverAllowance(selectedPayroll.id, driverAllowanceId, accessToken);
      const { code, message } = response;
      
      if (code === "SU") {
        
      } else {
        console.error("수당 내역 삭제 실패: ", message);
        alert("수당 내역 삭제 실패: " + message);
      }
    } catch (e) {
      console.error("수당 내역 삭제 중 에러 발생: ", e);
      alert("수당 내역 삭제 중 에러 발생: " + e);
    } finally {
      setDeleteAllowanceLoading(false);
    }
  };

  const handleCreateDeduction = async (dto: CreateDriverDeductionRequestDto) => {
    if (!accessToken || createDeductionLoading || !selectedPayroll) return;

    try {
      setCreateDeductionLoading(true);

      const response = await createDriverDeduction(selectedPayroll.id, dto, accessToken);
      const { code, message } = response;
      
      if (code === "SU") {
        setOpenDetailModal(false);
        setOpenDeductionCreateModal(false);
        await fetchAllDriverPayrolls();

        if (selectedPayroll) {
          handleDetail(selectedPayroll.id);
        }
      } else {
        console.error("공제 내역 등록 실패: ", message);
        alert("공제 내역 등록 실패: " + message);
      }
    } catch (e) {
      console.error("공제 내역 등록 중 에러 발생: ", e);
      alert("공제 내역 등록 중 에러 발생: " + e);
    } finally {
      setCreateDeductionLoading(false);
    }
  };

  const handleUpdateDeduction = async (dto: UpdateDriverDeductionRequestDto) => {
    if (!accessToken || updateDeductionLoading || !selectedPayroll) return;

    try {
      setUpdateDeductionLoading(true);

      const response = await updateDriverDeduction(selectedPayroll.id, dto, accessToken);
      const { code, message } = response;
      
      if (code === "SU") {
        setOpenDetailModal(false);
        await fetchAllDriverPayrolls();

        if (selectedPayroll) {
          handleDetail(selectedPayroll.id);
        }
      } else {
        console.error("공제 내역 수정 실패: ", message);
        alert("공제 내역 수정 실패: " + message);
      }
    } catch (e) {
      console.error("공제 내역 수정 중 에러 발생: ", e);
      alert("공제 내역 수정 중 에러 발생: " + e);
    } finally {
      setUpdateDeductionLoading(false);
    }
  };

  const handleDeleteDeduction = async (driverDeductionId: number) => {
    if (!accessToken || deleteDeductionLoading || !selectedPayroll) return;

    try {
      setDeleteDeductionLoading(true);

      const response = await deleteDriverDeduction(selectedPayroll.id, driverDeductionId, accessToken);
      const { code, message } = response;
      
      if (code === "SU") {
        
      } else {
        console.error("공제 내역 삭제 실패: ", message);
        alert("공제 내역 삭제 실패: " + message);
      }
    } catch (e) {
      console.error("공제 내역 삭제 중 에러 발생: ", e);
      alert("공제 내역 삭제 중 에러 발생: " + e);
    } finally {
      setDeleteDeductionLoading(false);
    }
  };

  const handleLog = () => {
    if (!accessToken || updateLogLoading || statusLogLoading) return;

    setOpenLogModal(true);
  };

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handlePayrollStatusModalOpen = (payrollId: number, newStatus: DriverPayrollStatus) => {
    setUpdatedStatusPayrollId(payrollId);
    setPendingStatus(newStatus);
    setOpenPayrollStatusUpdateModal(true);
  };
  
  const handleCreateModalOpen = () => setOpenCreateModal(true);
  const handleCreateModalClose = () => setOpenCreateModal(false);
  const handleDetailModalClose = () => setOpenDetailModal(false);
  const handlePayrollStatusUpdateModalClose = () => {
    setUpdatedStatusPayrollId(null);
    setPendingStatus(null);
    setOpenPayrollStatusUpdateModal(false);
  };
  const handleAllowanceCreateModalOpen = () => setOpenAllowanceCreateModal(true);
  const handleAllowanceCreateModalClose = () => setOpenAllowanceCreateModal(false);
  const handleDeductionCreateModalOpen = () => setOpenDeductionCreateModal(true);
  const handleDeductionCreateModalClose = () => setOpenDeductionCreateModal(false);
  const handleLogModalClose = () => setOpenLogModal(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            기사 급여대장 관리
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
                          <Select
                            size="small"
                            value={row.status}
                            disabled={updatedStatusPayrollId === row.id || listLoading}
                            onChange={(e) => handleSelectChange(e, row.id, row.status)}
                            renderValue={(value) => (
                              <Chip
                                size="small"
                                label={payrollStatusMap[value as DriverPayrollStatus] ?? "알 수 없음"}
                                color={payrollStatusColorMap[value as DriverPayrollStatus] ?? "default"}
                              />
                            )}
                          >
                            {Object.values(DriverPayrollStatus)
                              .filter((status) => status !== DriverPayrollStatus.DELETED)
                              .map((status) => (
                              <MenuItem key={status} value={status}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <Chip
                                    size="small"
                                    label={payrollStatusMap[status] ?? "알 수 없음"}
                                    color={payrollStatusColorMap[status] ?? "default"}
                                  />
                                </Stack>
                              </MenuItem>
                            ))}
                          </Select>
                          
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
              수정 이력 조회
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

        <CreateDriverPayrollModal
          open={openCreateModal}
          loading={createLoading}
          onClose={handleCreateModalClose}
          onConfirm={handleCreate}
        />

        <DriverPayrollDetailModal
          payroll={selectedPayroll}
          open={openDetailModal}
          loading={detailLoading}
          onClose={handleDetailModalClose}
          onPayrollUpdate={handlePayrollUpdate}
          onAllowanceCreate={handleAllowanceCreateModalOpen}
          onAllowanceUpdate={handleUpdateAllowance}
          onAllowanceDelete={handleDeleteAllowance}
          onDeductionCreate={handleDeductionCreateModalOpen}
          onDeductionUpdate={handleUpdateDeduction}
          onDeductionDelete={handleDeleteDeduction}
          onDelete={handleDelete}
        />

        <UpdateDriverPayrollStatusModal
          payrollId={updatedStatusPayrollId}
          newStatus={pendingStatus}
          open={openPayrollStatusUpdateModal}
          loading={updateLoading}
          onClose={handlePayrollStatusUpdateModalClose}
          onConfirm={handlePayrollStatusUpdate}
        />

        <DriverPayrollLogsModal
          open={openLogModal}
          onClose={handleLogModalClose}

          updateLog={updateLogData}
          updateLogLoading={updateLogLoading}
          onUpdateLogChangePage={fetchDriverPayrollUpdateLogs}

          statusLog={statusLogData}
          statusLogLoading={statusLogLoading}
          onStatusLogChangePage={fetchDriverPayrollStatusLogs}
        />

        <CreateDriverAllowanceModal
          open={openAllowanceCreateModal}
          loading={createAllowanceLoading}
          onClose={handleAllowanceCreateModalClose}
          onConfirm={handleCreateAllowance}
        />

        <CreateDriverDeductionModal
          open={openDeductionCreateModal}
          loading={createDeductionLoading}
          onClose={handleDeductionCreateModalClose}
          onConfirm={handleCreateDeduction}
        />
      </Box>
    </Box>
  )
}

export default AllDriverPayrollListPage;