import { Box, Button, CircularProgress, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Toolbar, Typography, Pagination } from '@mui/material';
import React, { useEffect, useState, type ChangeEvent } from 'react';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import type { GetDeliveryResponseDto } from '../../../dtos/delivery/response/get-delivery.response.dto';
import { deleteDelivery, getAllDelivery, getDeliveryDetail, updateDeliveryStatus } from '../../../apis/delivery/delivery.apis';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeliveryDetailModal from '../../../components/delivery/DeliveryDetailModal';
import type { UpdateDeliveryStatusRequestDto } from '../../../dtos/delivery/request/update-delivery-status.request.dto';
import { DeliveryStatus } from '../../../enums/delivery-status.enum';
import type PageDto from '../../../dtos/page.dto';
import type { GetDeliveryUpdateLogResponseDto } from '../../../dtos/deliveryLog/get-delivery-update-log.response.dto';
import type { GetDeliveryStatusLogResponseDto } from '../../../dtos/deliveryLog/get-delivery-status-log.response.dto';
import { getDeliveryStatusLogs, getDeliveryUpdateLogs } from '../../../apis/delivery/delivery-log.apis';
import DeliveryLogsModal from '../../../components/deliveryLog/DeliveryLogsModal';
import type { GetAllDeliveryResponseDto } from '../../../dtos/delivery/response/get-all-delivery.response.dto';

const statusFilters = ['ALL', ...Object.values(DeliveryStatus)];

function DeliveryListPage() {
  const [page, setPage] = useState(0);
  const size = 10;
  const sort = "createdAt,desc";
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTg4OTk5OSwiZXhwIjoxNzYxOTI1OTk5fQ.VzMhIn7p17DkEQWBN_3Hzv0fftwCrKF7_VlK_2qvPCg";

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<GetDeliveryResponseDto | null>(null);

  const initialPageData: PageDto<GetAllDeliveryResponseDto> = {
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
  const [listData, setListData] = useState<PageDto<GetAllDeliveryResponseDto>>(initialPageData);
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

  const [updateLogData, setUpdateLogData] = useState<PageDto<GetDeliveryUpdateLogResponseDto>>(initialLogData);
  const [statusLogData, setStatusLogData] = useState<PageDto<GetDeliveryStatusLogResponseDto>>(initialLogData);

  const openModal = (delivery: GetDeliveryResponseDto) => {
    setSelectedDelivery(delivery);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDelivery(null);
  }

  const fetchDeliveries = async () => {
    if (!accessToken) {
      setError("토큰이 없습니다.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await getAllDelivery(page, size, sort, accessToken);
      if (response.code === "SU" && response.data) {
        setListData(response.data);
      } else {
        console.log(response.message);
        setError(response.message || "데이터 조회 실패");
        setListData(initialPageData);
      }
    } catch (err) {
      console.log("err: ", err);
      setError("데이터 조회 중 오류 발생");
      setListData(initialPageData);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeliveries();
  }, [page, accessToken]);

  const fetchDeliveryUpdateLogs = async (page: number, size: number, sort: string) => {
    if (!accessToken) return;

    try {
      setUpdateLogLoading(true);
      const response = await getDeliveryUpdateLogs(page, size, sort, accessToken);
      const { code, message, data } = response;

      if (code === "SU" && data) {
        setUpdateLogData(data);
      } else {
        console.log(message);
        alert("배송 수정 이력 조회 실패: " + message);
      }
    } catch (err) {
      console.log(err);
      alert("배송 수정 이력 조회 중 에러 발생: " + err);
    } finally {
      setUpdateLogLoading(false);
    }
  };

  const fetchDeliveryStatusLogs = async (page: number, size: number, sort: string) => {
    if (!accessToken) return;

    try {
      setStatusLogLoading(true);
      const response = await getDeliveryStatusLogs(page, size, sort, accessToken);
      const { code, message, data } = response;

      if (code === "SU" && data) {
        setStatusLogData(data);
      } else {
        console.log(message);
        alert("배송 상태 변경 이력 조회 실패: " + message);
      }
    } catch (err) {
      console.log(err);
      alert("배송 상태 변경 이력 조회 중 에러 발생: " + err);
    } finally {
      setStatusLogLoading(false);
    }
  };

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
      fetchDeliveries();
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
        fetchDeliveries();
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
    fetchDeliveryUpdateLogs(0, size, sort);
    setOpenUpdateLogModal(true);
  };

  const handleOpenStatusLogModal = () => {
    fetchDeliveryStatusLogs(0, size, sort);
    setOpenStatusLogModal(true);
  };

  const handleCloseUpdateLogModal = () => {
    setOpenUpdateLogModal(false);
  };

  const handleCloseStatusLogModal = () => {
    setOpenStatusLogModal(false);
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
                ? listData.content
                : listData.content.filter(delivery => delivery.status === selectedStatus);

              return (
                <TableContainer component={Paper}>
                  <Table>
                    <caption>총 {listData.totalElements}건</caption>
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
        {selectedDelivery && (
          <DeliveryDetailModal
            isOpen={modalOpen}
            onClose={closeModal}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            delivery={selectedDelivery}
          />
        )}
        <DeliveryLogsModal
          logType='update'
          log={updateLogData}
          open={openUpdateLogModal}
          onClose={handleCloseUpdateLogModal}
          loading={updateLogLoading}
          onChangePage={fetchDeliveryUpdateLogs}
        />
        <DeliveryLogsModal
          logType='status'
          log={statusLogData}
          open={openStatusLogModal}
          onClose={handleCloseStatusLogModal}
          loading={statusLogLoading}
          onChangePage={fetchDeliveryStatusLogs}
        />
      </Box>
    </Box >
  )
}

export default DeliveryListPage;