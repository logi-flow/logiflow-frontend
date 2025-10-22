import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import type { GetDeliveryResponseDto } from '../../../dtos/delivery/response/get-delivery.response.dto';
import { deleteDelivery, getAllDelivery, getDeliveryDetail, updateDeliveryStatus } from '../../../apis/delivery/delivery.apis';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeliveryDetailModal from '../../../components/delivery/DeliveryDetailModal';
import type { UpdateDeliveryStatusRequestDto } from '../../../dtos/delivery/request/update-delivery-status.request.dto';
import { DeliveryStatus } from '../../../enums/delivery-status.enum';

const statusFilters = ['ALL', ...Object.values(DeliveryStatus)];

function DeliveryListPage() {
  const page = 0;
  const size = 10;
  const sort = "createdAt,desc";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTAyNzAxNiwiZXhwIjoxNzYxMDYzMDE2fQ.2BzK21KKGW0Op9iSrlYF1Ob71XhvVya3f2IAQbtwU3g";

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<GetDeliveryResponseDto | null>(null);

  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openModal = (delivery: GetDeliveryResponseDto) => {
    setSelectedDelivery(delivery);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDelivery(null);
  }

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await getAllDelivery(page, size, sort, accessToken);
        if (response.code === "SU" && Array.isArray(response.data?.content)) {
          setDeliveries(response.data.content);
          console.log(response.data.content);
        } else {
          console.log(response.message);
        }
      } catch (err) {
        console.log("err: ", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDeliveries();
  }, []);

  const openModalWithDeliveryId = async (id: number) => {
    try {
      const response = await getDeliveryDetail(id, accessToken);
      if (response.code === "SU" && response.data) {
        setSelectedDelivery(response.data);
        setModalOpen(true);
      } else {
        console.log(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async () => {
    if (!selectedDelivery) return;

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    const response = await deleteDelivery(selectedDelivery.id, accessToken);

    if (response.code === "SU") {
      alert("삭제 완료");
      setDeliveries((prevDeliveries) =>
        prevDeliveries.filter((delivery) => delivery.id !== selectedDelivery.id)
      );
      closeModal();
    } else {
      alert("삭제 실패: " + response.message);
      closeModal();
    }
  };

  const handleUpdate = async (updatedDelivery: GetDeliveryResponseDto, changeReason: string) => {
    if (!selectedDelivery) return;

    const dto: UpdateDeliveryStatusRequestDto = {
      status: updatedDelivery.status,
      changeReason: changeReason,
    };

    try {
      const response = await updateDeliveryStatus(selectedDelivery!.id, dto, accessToken);
      if (response.code === "SU") {
        alert("상태 수정 완료");
        setDeliveries((prevDeliveries) =>
          prevDeliveries.map((delivery) =>
            delivery.id === updatedDelivery.id
              ? { ...delivery, status: updatedDelivery.status }
              : delivery
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
                배송 목록(관리자)
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
              const filteredDeliveries = selectedStatus === 'ALL'
                ? deliveries
                : deliveries.filter(delivery => delivery.status === selectedStatus);

              return (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableRow>
                        <TableCell align='center'>배송 번호</TableCell>
                        <TableCell align='center'>고객사 번호</TableCell>
                        <TableCell align='center'>수령인</TableCell>
                        <TableCell align='center'>상태</TableCell>
                        <TableCell align='center'>품목</TableCell>
                        <TableCell align='center'>요청일</TableCell>
                        <TableCell align='center'>생성일</TableCell>
                        <TableCell align='center'>세부 정보</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredDeliveries.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} align='center'>
                            {selectedStatus === 'ALL' ? '표시할 배송이 없음' : '해당 상태의 배송이 없음'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDeliveries.map((delivery) => (
                          <TableRow key={delivery.id} hover>
                            <TableCell align='center'>{delivery.id}</TableCell>
                            <TableCell align='center'>{delivery.customerId}</TableCell>
                            <TableCell align='center'>{delivery.recipientName}</TableCell>
                            <TableCell align='center'>{delivery.status}</TableCell>
                            <TableCell align='center'>{delivery.item}</TableCell>
                            <TableCell align='center'>{delivery.requestDate}</TableCell>
                            <TableCell align='center'>{delivery.createdAt}</TableCell>
                            <TableCell align='center'>
                              <IconButton aria-label='edit' size='small' onClick={() => openModalWithDeliveryId(delivery.id)}>
                                <EditNoteIcon fontSize='inherit' />
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
        {selectedDelivery && (
          <DeliveryDetailModal
            isOpen={modalOpen}
            onClose={closeModal}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            delivery={selectedDelivery}
          />
        )}

      </Box>
    </Box >
  )
}

export default DeliveryListPage