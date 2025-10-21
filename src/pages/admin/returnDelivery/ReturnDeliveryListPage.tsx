import React, { useEffect, useState } from "react";
import {
  deleteReturnDelivery,
  getAllReturnDelivery,
  getReturnDeliveryDetail,
  updateReturnDeliveryStatus,
} from "../../../apis/returnDelivery/return-delivery.apis";
import type { GetReturnDeliveryDetailResponseDto } from "../../../dtos/returnDelivery/response/get-return-delivery-detail.response.dto.ts";
import type { UpdateReturnDeliveryStatusRequestDto } from "../../../dtos/returnDelivery/request/update-return-delivery-status.request.dto.ts";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Header from "../../../components/Header.tsx";
import Sidebar from "../../../components/Sidebar.tsx";
import { DeliveryStatus } from "../../../enums/delivery-status.enum.ts";
import ReturnDeliveryDetailModal from "../../../components/returnDelivery/ReturnDeliveryDetailModal.tsx";

const statusFilters = ["ALL", ...Object.values(DeliveryStatus)];

function ReturnDeliveryListPage() {
  const page = 0;
  const size = 10;
  const sort = "createdAt, desc";
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTAyNDA4NiwiZXhwIjoxNzk3MDI0MDg2fQ.K6FQbg0U11hyNlUhnWd0UZN87Ebq8vVTElOkNSO3EQk";

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReturnDelivery, setSelectedReturnDelivery] =
    useState<GetReturnDeliveryDetailResponseDto | null>(null);

  const [returnDeliveries, setReturnDeliveries] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const openModal = (returnDelivery: GetReturnDeliveryDetailResponseDto) => {
    setSelectedReturnDelivery(returnDelivery);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReturnDelivery(null);
  };

  useEffect(() => {
    const fetchReturnDeliveries = async () => {
      try {
        const response = await getAllReturnDelivery(
          page,
          size,
          sort,
          accessToken
        );

        if (response.code === "SU" && Array.isArray(response.data?.content)) {
          setReturnDeliveries(response.data.content);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log("err: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturnDeliveries();
  }, []);

  const openModalWithReturnDeliveryId = async (id: number) => {
    try {
      const response = await getReturnDeliveryDetail(id, accessToken);

      if (response.code === "SU" && response.data) {
        setSelectedReturnDelivery(response.data);
        setModalOpen(true);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedReturnDelivery) return;

    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

    if (!confirmDelete) return;

    const response = await deleteReturnDelivery(
      selectedReturnDelivery.id,
      accessToken
    );

    if (response.code === "SU") {
      alert("삭제 완료");
      setReturnDeliveries((prevReturnDeliveries) =>
        prevReturnDeliveries.filter(
          (returnDelivery) => returnDelivery.id !== selectedReturnDelivery.id
        )
      );

      closeModal();
    } else {
      alert("삭제 실패: " + response.message);
      closeModal();
    }
  };

  const handleUpdate = async (
    updatedReturnDelivery: GetReturnDeliveryDetailResponseDto,
    changeReason: string
  ) => {
    if (!selectedReturnDelivery) return;

    const dto: UpdateReturnDeliveryStatusRequestDto = {
      status: updatedReturnDelivery.status,
      changeReason: changeReason,
    };

    try {
      const response = await updateReturnDeliveryStatus(
        selectedReturnDelivery.id,
        dto,
        accessToken
      );

      if (response.code === "SU") {
        alert("상태 수정 완료");
        setReturnDeliveries((prevReturnDeliveries) =>
          prevReturnDeliveries.map((returnDelivery) =>
            returnDelivery.id === updatedReturnDelivery.id
              ? { ...returnDelivery, status: updatedReturnDelivery.status }
              : returnDelivery
          )
        );

        closeModal();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log("err: " + error);
    }
  };

  const handleStatusFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string | null
  ) => {
    if (newStatus !== null) {
      setSelectedStatus(newStatus);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              데이터 로딩
            </Typography>
          </Box>
        )}

        {error && (
          <Typography variant="body1" color="error">
            오류: {error}
          </Typography>
        )}

        {!loading && !error && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{ textAlign: "center" }}
              >
                반품 목록
              </Typography>

              <ToggleButtonGroup
                color="primary"
                value={selectedStatus}
                exclusive
                onChange={handleStatusFilterChange}
                aria-label="return delivery status filter"
              >
                {statusFilters.map((status) => (
                  <ToggleButton
                    key={status}
                    value={status}
                    sx={{ textTransform: "none" }}
                  >
                    {status === "ALL" ? "전체" : status}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            {(() => {
              const filterReturnDeliveries =
                selectedStatus === "ALL"
                  ? returnDeliveries
                  : returnDeliveries.filter(
                      (returnDelivery) =>
                        returnDelivery.status === selectedStatus
                    );

              return (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableRow>
                        <TableCell align="center">반품 ID</TableCell>
                        <TableCell>고객사 번호</TableCell>
                        <TableCell>반품인</TableCell>
                        <TableCell align="center">상태</TableCell>
                        <TableCell>품목</TableCell>
                        <TableCell>요청일</TableCell>
                        <TableCell>생성일</TableCell>
                        <TableCell align="center">세부 정보</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filterReturnDeliveries.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            {selectedStatus === "ALL"
                              ? "표시할 반품 배송이 없음"
                              : "해당 상태의 반품 배송이 없음"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filterReturnDeliveries.map((returnDelivery) => (
                          <TableRow key={returnDelivery.id} hover>
                            <TableCell align="center">
                              {returnDelivery.id}
                            </TableCell>
                            <TableCell>{returnDelivery.customerId}</TableCell>
                            <TableCell>
                              {returnDelivery.pickupName}
                            </TableCell>
                            <TableCell align="center">
                              {returnDelivery.status}
                            </TableCell>
                            <TableCell>{returnDelivery.item}</TableCell>
                            <TableCell>{returnDelivery.requestDate}</TableCell>
                            <TableCell>{returnDelivery.createdAt}</TableCell>
                            <TableCell align="center">
                              <IconButton
                                aria-label="edit"
                                size="small"
                                onClick={() =>
                                  openModalWithReturnDeliveryId(
                                    returnDelivery.id
                                  )
                                }
                              >
                                <EditNoteIcon fontSize="inherit" />
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
        {selectedReturnDelivery && (
          <ReturnDeliveryDetailModal
            isOpen={modalOpen}
            onClose={closeModal}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            returnDelivery={selectedReturnDelivery}
          />
        )}
      </Box>
    </Box>
  );
}

export default ReturnDeliveryListPage;
