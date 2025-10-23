import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import type { GetDeliveryResponseDto } from '../../dtos/delivery/response/get-delivery.response.dto';
import { cancelDelivery, getDeliveryDetail, getMyDelivery, updateDelivery, updateDeliveryIsHidden } from '../../apis/delivery/delivery.apis';
import type { UpdateDeliveryIsHiddenRequestDto } from '../../dtos/delivery/request/update-delivery-is-hidden.request.dto';
import type { UpdateDeliveryRequestDto } from '../../dtos/delivery/request/update-delivery.request.dto';
import { DeliveryStatus } from '../../enums/delivery-status.enum';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CustomerDeliveryDetailModal from '../../components/delivery/CustomerDeliveryDetailModal';
import type { GetAllCollectionSiteResponseDto } from '../../dtos/collectionSite/response/get-all-collection-site.response.dto';
import { getAllCollectionSite } from '../../apis/collectionSite/collection-site.api';
import type { UpdateDeliveryStatusRequestDto } from '../../dtos/delivery/request/update-delivery-status.request.dto';


const statusFilters = ['ALL', ...Object.values(DeliveryStatus)];

function CustomerDeliveryListPage() {
  const page = 0;
  const size = 10;
  const sort = "createdAt,desc";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjAxIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzYxMTk1OTc2LCJleHAiOjE3NjEyMzE5NzZ9.-WctBUMHHoYSCe9GuoIoP5VJFUwyhRhElSrAt0VwSAc";

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<GetDeliveryResponseDto | null>(null);

  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [collectionSites, setCollectionSites] = useState<GetAllCollectionSiteResponseDto[]>([]);

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

  const fetchData = async () => {
    try {
      const [deliveryResponse, siteResponse] = await Promise.all([
        getMyDelivery(page, size, sort, accessToken),
        getAllCollectionSite(page, size, sort, accessToken)
      ]);

      if (deliveryResponse.code === "SU" && Array.isArray(deliveryResponse.data?.content)) {

        const visibleDeliveries = deliveryResponse.data.content.filter(delivery => !delivery.isHidden);
        setDeliveries(visibleDeliveries);
        console.log(visibleDeliveries);
      } else {
        console.log(deliveryResponse.message);
      }

      if (siteResponse.code === "SU" && Array.isArray(siteResponse.data?.content)) {
        setCollectionSites(siteResponse.data.content);
      } else {
        setError("수거지 목록 불러오기 실패");
        console.log(siteResponse.message);
      }

    } catch (err) {
      console.log("err: ", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
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

  const handleIsHidden = async (updatedDelivery: GetDeliveryResponseDto) => {
    if (!selectedDelivery) return;

    const dto: UpdateDeliveryIsHiddenRequestDto = {
      isHidden: updatedDelivery.isHidden,
    }

    const confirmIsHidden = window.confirm("정말 숨김처리 하시겠습니까?");
    if (!confirmIsHidden) return;

    const response = await updateDeliveryIsHidden(selectedDelivery.id, dto, accessToken);

    if (response.code === "SU") {
      alert("숨김처리 완료");
      setDeliveries((prevDeliveries) =>
        prevDeliveries.filter((delivery) => delivery.id !== selectedDelivery.id)
      );
      closeModal();
    } else {
      alert('숨김처리 실패: ' + response.message);
      closeModal();
    }
  };


  const handleCancelDelivery = async (deliveryId: number, reason: string) => {
    if (!reason.trim()) {
      alert('취소 사유를 반드시 입력');
      return;
    }

    const confirmCancel = window.confirm('정말 배송 요청을 취소 하시겠습니까?');
    if (!confirmCancel) return;

    const dto: UpdateDeliveryStatusRequestDto = {
      status: DeliveryStatus.CANCELLED,
      changeReason: reason,
    };

    try {
      const response = await cancelDelivery(deliveryId, dto, accessToken);
      if (response.code === "SU") {
        alert('배송 요청이 성공적으로 취소되었습니다.');
        await fetchData();
        closeModal();
      } else {
        alert(`취소 실패: ${response.message}`);
      }
    } catch (err) {
      console.log(err);
      alert('처리 중 오류 발생');
    }
  };

  const handleUpdate = async (updatedDelivery: GetDeliveryResponseDto) => {
    if (!selectedDelivery) return;

    const dto: UpdateDeliveryRequestDto = {
      requestDate: updatedDelivery.requestDate,
      item: updatedDelivery.item,
      weight: updatedDelivery.weight,
      message: updatedDelivery.message,
      collectionSiteId: updatedDelivery.collectionSiteId,
      recipientName: updatedDelivery.recipientName,
      recipientPhone: updatedDelivery.recipientPhone,
      recipientZipcode: updatedDelivery.recipientZipcode,
      recipientAddress: updatedDelivery.recipientAddress,
      recipientAddressDetail: updatedDelivery.recipientAddressDetail,
    };

    try {
      const response = await updateDelivery(selectedDelivery!.id, dto, accessToken);
      if (response.code === "SU") {
        alert('수정 완료');
        setDeliveries((prevDeliveries) =>
          prevDeliveries.map((delivery) =>
            delivery.id === updatedDelivery.id
              ? {
                ...delivery,
                requestDate: updatedDelivery.requestDate,
                item: updatedDelivery.item,
                weight: updatedDelivery.weight,
                message: updatedDelivery.message,
                collectionSiteId: updatedDelivery.collectionSiteId,
                recipientName: updatedDelivery.recipientName,
                recipientPhone: updatedDelivery.recipientPhone,
                recipientZipcode: updatedDelivery.recipientZipcode,
                recipientAddress: updatedDelivery.recipientAddress,
                recipientAddressDetail: updatedDelivery.recipientAddressDetail
              }
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
  };


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
                배송 목록(고객사)
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
          <CustomerDeliveryDetailModal
            isOpen={modalOpen}
            onClose={closeModal}
            onUpdate={handleUpdate}
            onIsHidden={handleIsHidden}
            delivery={selectedDelivery}
            collectionSites={collectionSites}
            onCancel={handleCancelDelivery}
          />
        )}

      </Box>
    </Box >
  )
}

export default CustomerDeliveryListPage