import React, { useEffect, useState, type ChangeEvent } from 'react';
import { deleteContract, getAllContract, getContractDetail, updateContract } from '../../../apis/contract/contract.apis';
import { Box, Button, CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Toolbar, Typography, Pagination } from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditNote';
import type { GetContractResponseDto } from '../../../dtos/contract/response/get-contract.response.dto';
import type { GetAllContractResponseDto } from '../../../dtos/contract/response/get-all-contract.response.dto';
import ContractDetailModal from '../../../components/contract/ContractDetailModal';
import type { UpdateContractRequestDto } from '../../../dtos/contract/request/update-contract.request.dto';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import { ContractStatus } from '../../../enums/contract-status.enum';
import type PageDto from '../../../dtos/page.dto';
import type { GetContractUpdateLogResponseDto } from '../../../dtos/contractLog/get-contract-update-log.response.dto';
import type { GetContractStatusLogResponseDto } from '../../../dtos/contractLog/get-contract-status-log.response.dto';
import { getContractStatusLogs, getContractUpdateLogs } from '../../../apis/contract/contract-log.apis';
import ContractLogsModal from '../../../components/contractLog/ContractLogsModal';

const statusFilters = ['ALL', ...Object.values(ContractStatus)];

function ContractListPage() {
  const [page, setPage] = useState(0);
  const size = 10;
  const sort = "createdAt,desc";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTg4OTk5OSwiZXhwIjoxNzYxOTI1OTk5fQ.VzMhIn7p17DkEQWBN_3Hzv0fftwCrKF7_VlK_2qvPCg";

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<GetContractResponseDto | null>(null);

  const initialPageData: PageDto<GetAllContractResponseDto> = {
    content: [],
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    hasNext: false,
    hasPrevious: false,
    sort: 'desc'
  };
  const [listData, setListData] = useState<PageDto<GetAllContractResponseDto>>(initialPageData);

  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [updateLogLoading, setUpdateLogLoading] = useState(false);
  const [statusLogLoading, setStatusLogLoading] = useState(false);
  const [openUpdateLogModal, setOpenUpdateLogModal] = useState(false);
  const [openStatusLogModal, setOpenStatusLogModal] = useState(false);

  const initialLogData = {
    content: [],
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    hasNext: false,
    hasPrevious: false,
    sort: 'desc'
  };

  const [updateLogData, setUpdateLogData] = useState<PageDto<GetContractUpdateLogResponseDto>>(initialLogData);
  const [statusLogData, setStatusLogData] = useState<PageDto<GetContractStatusLogResponseDto>>(initialLogData);


  const openModal = (contract: GetContractResponseDto) => {
    setSelectedContract(contract);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContract(null);
  }

  const fetchContracts = async () => {
    if (!accessToken) {
      console.log("토큰이 없음");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await getAllContract(page, size, sort, accessToken);
      if (response.code === "SU" && response.data) {
        setListData(response.data);
      } else {
        console.log(response.message);
        setError(response.message || "데이터 조회 실패");
        setListData(initialPageData);
      }
    } catch (err) {
      console.log(err);
      setError("데이터 조회 중 오류 발생");
      setListData(initialPageData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContracts();
  }, [page, accessToken]);

  const fetchContractUpdateLogs = async (page: number, size: number, sort: string) => {
    if (!accessToken || updateLogLoading) return;

    try {
      setUpdateLogLoading(true);
      const response = await getContractUpdateLogs(page, size, sort, accessToken);
      const { code, message, data } = response;

      if (code === "SU" && data) {
        setUpdateLogData(data);
      } else {
        console.log(message);
        alert("계약 수정 이력 조회 실패: " + message);
      }
    } catch (err) {
      console.log(err);
      alert("계약 수정 이력 조회 중 에러 발생: " + err);
    } finally {
      setUpdateLogLoading(false);
    }
  };

  const fetchContractStatusLogs = async (page: number, size: number, sort: string) => {
    if (!accessToken || statusLogLoading) return;

    try {
      setStatusLogLoading(true);
      const response = await getContractStatusLogs(page, size, sort, accessToken);
      const { code, message, data } = response;

      if (code === "SU" && data) {
        setStatusLogData(data);
      } else {
        console.log(message);
        alert("계약 상태 변경 이력 조회 실패: " + message);
      }
    } catch (err) {
      console.log(err);
      alert("계약 상태 변경 이력 조회 중 에러 발생: " + err);
    } finally {
      setStatusLogLoading(false);
    }
  };

  const openModalWithContractId = async (id: number) => {
    try {
      const response = await getContractDetail(id, accessToken);
      if (response.code === "SU" && response.data) {
        setSelectedContract(response.data);
        setModalOpen(true);
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async () => {
    if (!selectedContract) return;

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const response = await deleteContract(selectedContract.id, accessToken);

    if (response.code === "SU") {
      alert('삭제 완료');
      fetchContracts();
      closeModal();
    } else {
      alert('삭제 실패: ' + response.message);
      closeModal();
    }
  };

  const handleUpdate = async (updatedContract: GetContractResponseDto) => {

    const dto: UpdateContractRequestDto = {
      startDate: updatedContract.startDate,
      endDate: updatedContract.endDate,
      baseFee: updatedContract.baseFee,
      weightLimitKg: updatedContract.weightLimitKg,
      parcelLimit: updatedContract.parcelLimit,
      overWeightFeePerKg: updatedContract.overWeightFeePerKg,
      overParcelFee: updatedContract.overParcelFee,
      specialTerms: updatedContract.specialTerms,
    };

    const response = await updateContract(selectedContract!.id, dto, accessToken);

    try {
      if (response.code === "SU") {
        alert('수정 완료');
        fetchContracts();
        closeModal();
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusFilterChange = (event: React.MouseEvent<HTMLElement>, newStatus: string | null) => {
    if (newStatus !== null) {
      setSelectedStatus(newStatus);
    }
  }

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleOpenUpdateLogModal = () => {
    setOpenUpdateLogModal(true);
    fetchContractUpdateLogs(0, 20, "desc");
  };

  const handleOpenStatusLogModal = () => {
    setOpenStatusLogModal(true);
    fetchContractStatusLogs(0, 20, "desc");
  };

  const handleCloseUpdateLogModal = () => setOpenUpdateLogModal(false);
  const handleCloseStatusLogModal = () => setOpenStatusLogModal(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Toolbar />
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>데이터 로딩</Typography>
          </Box>
        )}

        {error && (
          <Typography variant="body1" color="error">
            오류: {error}
          </Typography>
        )}

        {!loading && !error && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: ' center', mb: 2 }}>
              <Typography variant='h4' gutterBottom sx={{ textAlign: 'center' }}>
                계약 목록(관리자)
              </Typography>

              <ToggleButtonGroup
                color='primary'
                value={selectedStatus}
                exclusive
                onChange={handleStatusFilterChange}
                aria-label='delivery status filter'
              >
                {statusFilters.map(status => (
                  <ToggleButton key={status} value={status} sx={{ textTransform: 'none' }} >
                    {status === 'ALL' ? '전체' : status}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            {(() => {
              const filteredContracts = selectedStatus === 'ALL'
                ? listData.content
                : listData.content.filter(contract => contract.status === selectedStatus);

              return (
                <TableContainer component={Paper}>
                  <Table>
                    <caption>총 {listData.totalElements}건</caption>
                    <TableHead sx={{ backgroundColor: '#f5f5ff' }}>
                      <TableRow>
                        <TableCell align='center'>계약 번호</TableCell>
                        <TableCell align='center'>고객 번호</TableCell>
                        <TableCell align='center'>고객 이름</TableCell>
                        <TableCell align='center'>상태</TableCell>
                        <TableCell align='center'>시작일</TableCell>
                        <TableCell align='center'>종료일</TableCell>
                        <TableCell align='center'>생성일</TableCell>
                        <TableCell align='center'>수정일</TableCell>
                        <TableCell align='center'>세부 정보</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredContracts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={10} align="center">
                            데이터가 없습니다.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredContracts.map((contract) => (
                          <TableRow key={contract.id}>
                            <TableCell align='center'>{contract.id}</TableCell>
                            <TableCell align='center'>{contract.customerId}</TableCell>
                            <TableCell align='center'>{contract.customerName}</TableCell>
                            <TableCell align='center'>{contract.status}</TableCell>
                            <TableCell align='center'>{contract.startDate}</TableCell>
                            <TableCell align='center'>{contract.endDate}</TableCell>
                            <TableCell align='center'>{contract.createdAt}</TableCell>
                            <TableCell align='center'>{contract.updatedAt}</TableCell>
                            <TableCell align='center'>
                              <IconButton aria-label='' size='small' onClick={() => openModalWithContractId(contract.id)}>
                                <EditDocumentIcon fontSize='inherit' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            })()}

            {!loading && listData.totalPages > 0 && (
              <Stack sx={{ mt: 3, alignItems: 'center' }}>
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

            <Stack sx={{ marginX: 3, mt: 3 }} direction="row" alignItems="center" justifyContent="right" spacing={1}>
              <Button variant="outlined" onClick={handleOpenUpdateLogModal}>
                수정 이력 조회
              </Button>
              <Button variant="outlined" onClick={handleOpenStatusLogModal}>
                상태 변경 이력 조회
              </Button>
            </Stack>
          </>
        )}
        {selectedContract && (
          <ContractDetailModal
            isOpen={modalOpen}
            onClose={closeModal}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            contract={selectedContract}
          />
        )}
        <ContractLogsModal
          logType="update"
          log={updateLogData}
          open={openUpdateLogModal}
          loading={updateLogLoading}
          onClose={handleCloseUpdateLogModal}
          onChangePage={fetchContractUpdateLogs}
        />

        <ContractLogsModal
          logType="status"
          log={statusLogData}
          open={openStatusLogModal}
          loading={statusLogLoading}
          onClose={handleCloseStatusLogModal}
          onChangePage={fetchContractStatusLogs}
        />
      </Box >
    </Box>
  )
}

export default ContractListPage;