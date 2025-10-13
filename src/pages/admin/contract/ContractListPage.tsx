import React, { useEffect, useState } from 'react'
import { deleteContract, getAllContract, getContractDetail, updateContract } from '../../../apis/contract/contract.apis';
import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditNote';
import type { GetContractResponseDto } from '../../../dtos/contract/response/get-contract.response.dto';
import ContractDetailModal from '../../../components/contract/ContractDetailModal';
import type { UpdateContractRequestDto } from '../../../dtos/contract/request/update-contract.request.dto';
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/Header';
import { ContractStatus } from '../../../enums/contract-status.enum';

const statusFilters = ['ALL', ...Object.values(ContractStatus)];

function ContractListPage() {
  const page = 0;
  const size = 10;
  const sort = "createdAt,desc";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MDMyOTUwMCwiZXhwIjoxNzYwMzY1NTAwfQ.4_nCw4WXhX7AWAP3GZMrQMkCidFz4rXGwAKruuzNwnQ";

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
        const response = await getAllContract(page, size, sort, accessToken);
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

  const handleDelete = async () => {
    if (!selectedContract) return;

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const response = await deleteContract(selectedContract.id, accessToken);

    if (response.code === "SU") {
      alert('삭제 완료');
      setContracts((prevContracts) =>
        prevContracts.filter((contract) => contract.id !== selectedContract.id)
      );
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
        setContracts((prevContracts) =>
          prevContracts.map((contract) =>
            contract.id === updatedContract.id
              ? {
                ...contract,
                startDate: updatedContract.startDate,
                endDate: updatedContract.endDate,
                baseFee: updatedContract.baseFee,
                weightLimitKg: updatedContract.weightLimitKg,
                parcelLimit: updatedContract.parcelLimit,
                overWeightFeePerKg: updatedContract.overWeightFeePerKg,
                overParcelFee: updatedContract.overParcelFee,
                specialTerms: updatedContract.specialTerms,
              }
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
                계약 목록
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
                    <TableHead sx={{ backgroundColor: '#ccc' }}>
                      <TableRow>
                        <TableCell>계약 ID</TableCell>
                        <TableCell>고객 ID</TableCell>
                        <TableCell>고객 이름</TableCell>
                        <TableCell>상태</TableCell>
                        <TableCell>시작일</TableCell>
                        <TableCell>종료일</TableCell>
                        <TableCell>생성일</TableCell>
                        <TableCell>수정일</TableCell>
                        <TableCell>세부 정보</TableCell>
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
                            <TableCell>{contract.id}</TableCell>
                            <TableCell>{contract.customerId}</TableCell>
                            <TableCell>{contract.customerName}</TableCell>
                            <TableCell>{contract.status}</TableCell>
                            <TableCell>{contract.startDate}</TableCell>
                            <TableCell>{contract.endDate}</TableCell>
                            <TableCell>{contract.createdAt}</TableCell>
                            <TableCell>{contract.updatedAt}</TableCell>
                            <TableCell>
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
      </Box >
    </Box>
  )
}

export default ContractListPage