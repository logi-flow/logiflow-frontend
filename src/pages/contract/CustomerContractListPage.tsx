import React, { useEffect, useState } from 'react'
import type { GetContractResponseDto } from '../../dtos/contract/response/get-contract.response.dto';
import { getContractDetail, getMyContract, updateContractStatus } from '../../apis/contract/contract.apis';
import type { UpdateContractStatusRequestDto } from '../../dtos/contract/request/update-contract-status.request.dto';
import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { ContractStatus } from '../../enums/contract-status.enum';
import EditDocumentIcon from '@mui/icons-material/EditNote';
import CustomerContractDetailModal from '../../components/contract/CustomerContractDetailModal';

const statusFilters = ['ALL', ...Object.values(ContractStatus)];

function CustomerContractListPage() {
  const page = 0;
  const size = 10;
  const sort = "createdAt,desc";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjAxIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzYwNjY5MjM3LCJleHAiOjE3NjA3MDUyMzd9.iDsXnTJp3rdEEPiT65tX6AbQp_0uxAVdBall5O4f0eo";

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<GetContractResponseDto | null>(null);

  const [contracts, setContracts] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openModal = (contract: GetContractResponseDto) => {
    setSelectedContract(contract);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContract(null);
  }

  useEffect(() => {
    const fetchContracts = async () => {

      if (!accessToken) {
        console.log("토큰이 없음");
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const response = await getMyContract(page, size, sort, accessToken);
        if (response.code === "SU" && Array.isArray(response.data?.content)) {
          setContracts(response.data.content);
          console.log(response.data.content);
        } else {
          console.log(response.message);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchContracts();
  }, []);

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

  const handleStatusUpdate = async (updatedContract: GetContractResponseDto, changeReason: string) => {
    if (!selectedContract) return;

    const dto: UpdateContractStatusRequestDto = {
      status: updatedContract.status,
      changeReason: changeReason
    };

    try {
      const response = await updateContractStatus(selectedContract!.id, dto, accessToken);
      if (response.code === "SU") {
        alert("상태 수정 완료");
        setContracts((prevContracts) =>
          prevContracts.map((contract) =>
            contract.id === updatedContract.id
              ? { ...contract, status: updatedContract.status }
              : contract
          )
        );
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
                계약 목록(고객사)
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
                ? contracts
                : contracts.filter(contract => contract.status === selectedStatus);

              return (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell align='center'>계약 번호</TableCell>
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
            {selectedContract && (
              <CustomerContractDetailModal
                isOpen={modalOpen}
                onClose={closeModal}
                onUpdate={handleStatusUpdate}
                contract={selectedContract}
              />
            )}
          </>
        )}
      </Box>

    </Box>
  )
}

export default CustomerContractListPage