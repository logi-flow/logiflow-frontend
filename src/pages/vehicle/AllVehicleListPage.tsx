import { Box, Button, Chip, CircularProgress, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, type SelectChangeEvent } from "@mui/material";
import { createVehicle, deleteVehicle, getAllVehicle, getVehicleDetail, updateVehicle, updateVehicleStatus } from "../../apis/vehicle/vehicle.apis";
import type PageDto from "../../dtos/page.dto";
import type { GetAllVehicleRseponseDto } from "../../dtos/vehicle/response/get-all-vehicle.response.dto";
import type { GetVehicleDetailRseponseDto } from "../../dtos/vehicle/response/get-vehicle-detail.response.dto";
import { VehicleStatus } from "../../enums/vehicle-status.enum"
import { useEffect, useState, type ChangeEvent } from "react";
import type { CreateVehicleRequestDto } from "../../dtos/vehicle/request/create-vehicle.request.dto";
import type { UpdateVehicleRequestDto } from "../../dtos/vehicle/request/update-vehicle.request.dto";
import type { UpdateVehicleStatusRequestDto } from "../../dtos/vehicle/request/update-vehicle-status.request.dto";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const accessToken = "";
const vehicleStatusColorMap: Record<VehicleStatus, "success" | "primary" | "warning" | "error" | "default"> = {
    [VehicleStatus.AVAILABLE]: "success",
    [VehicleStatus.IN_USE]: "primary",
    [VehicleStatus.UNDER_MAINTENANCE]: "warning",
    [VehicleStatus.DELETED]: "error",
};

function AllVehicleListPage() {
    const [page, setPage] = useState(0);
    const [queryKey, setQueryKey] = useState(0);

    const [listLoading, setListLoading] = useState(false);
    const [detailLoding, setDetailLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const [listData, setListData] = useState<PageDto<GetAllVehicleRseponseDto>>({
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
    const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);

    const [selectedVehicle, setSelectedVehicle] = useState<GetVehicleDetailRseponseDto>();

    const [updatedStatusVehicleId, setUpdateStatusVehicleId] = useState<number | null>(null);
    const [pendingStatus, setPendingStatus] = useState<VehicleStatus | null>(null);

    const size = 10;
    const sort = "desc";

    useEffect(() => {
        if (queryKey === 0) return;

        fetchAllVehicles();
    }, [page, queryKey, accessToken]);

    const fetchAllVehicles = async () => {
        if (!accessToken || listLoading) return;

        try {
            setListLoading(true);

            const response = await getAllVehicle(page, size, sort, accessToken);
            const { code, message, data } = response;

            if (code === "SU" && data) {
                setListData(data);
            } else {
                console.error("차량 조회 실패: ", message);
                alert("차량 조회 실패: " + message);
            }
        } catch (e) {
            console.error("차량 조회 중 에러 발생: ", e);
            alert("차량 조회 중 에러 발생: " + e);
        } finally {
            setListLoading(false);
        }
    };

    const handleSearch = () => {
        setPage(0);
        setQueryKey(prev => prev + 1);
    };

    const handleSelectChange = (e: SelectChangeEvent<string>, vehicleId: number, currentStatus: VehicleStatus) => {
        const nextStatus = e.target.value as VehicleStatus;

        if (nextStatus === currentStatus) return;

        handleStatusUpdateModalOpen(vehicleId, nextStatus);
    };

    const handleCreate = async (dto: CreateVehicleRequestDto) => {
        if (!accessToken || createLoading) return;

        try {
            setCreateLoading(true);

            const response = await createVehicle(dto, accessToken);
            const { code, message, data } = response;

            if (code === "SU" && data) {
                setOpenCreateModal(false);
                setPage(0);
                setQueryKey(prev => prev + 1);
            } else {
                console.error("차량 생성 실패: ", message);
                alert("차량 생성 실패: " + message);
            }
        } catch (e) {
            console.error("차량 생성 중 에러 발생: ", e);
            alert("차량 생성 중 에러 발생: " + e);
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDetail = async (vehicleId: number) => {
        if (!accessToken || detailLoding) return;

        setOpenDetailModal(true);
        setSelectedVehicle(undefined);

        try {
            setDetailLoading(true);

            const response = await getVehicleDetail(vehicleId, accessToken);
            const { code, message, data } = response;

            if (code === "SU" && data) {
                setSelectedVehicle(data);
            } else {
                console.error("차량 상세 조회 실패: ", message);
                alert("차량 상세 조회 실패: " + message);
            }
        } catch (e) {
            console.error("차량 상세 조회 중 에러 발생: ", e);
            alert("차량 상세 조회 중 에러 발생: " + e);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleUpdate = async (vehicleId: number, dto: UpdateVehicleRequestDto) => {
        if (!accessToken || updateLoading) return;

        try {
            setUpdateLoading(true);

            const response = await updateVehicle(vehicleId, dto, accessToken);
            const { code, message, data } = response;

            if (code === "SU" && data) {
                setOpenUpdateModal(false);
                await fetchAllVehicles();

                if (selectedVehicle) {
                    handleDetail(selectedVehicle.vehicleId);
                }
            } else {
                console.error("차량 정보 수정 실패: ", message);
                alert("차량 정보 수정 실패: " + message);
            }
        } catch (e) {
            console.error("차량 정보 수정 중 에러 발생: ", e);
            alert("차량 정보 수정 중 에러 발생: " + e);
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleStatusUpdate = async (vehicleId: number, dto: UpdateVehicleStatusRequestDto) => {
        if (!accessToken || updateLoading) return;

        try {
            setUpdateLoading(true);

            const response = await updateVehicleStatus(vehicleId, dto, accessToken);
            const { code, message, data } = response;

            if (code === "SU" && data) {
                setOpenUpdateStatusModal(false);
                await fetchAllVehicles();
            } else {
                console.error("차량 상태 수정 실패: ", message);
                alert("차량 상태 수정 실패: " + message);
            }
        } catch (e) {
            console.error("차량 상태 수정 중 에러 발생: ", e);
            alert("차량 상태 수정 중 에러 발생: " + e);
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDelete = async (vehicleId: number) => {
        if (!accessToken || detailLoding) return;

        try {
            setDetailLoading(true);

            const response = await deleteVehicle(vehicleId, accessToken);
            const { code, message } = response;

            if (code === "SU") {
                setOpenDetailModal(false);
                await fetchAllVehicles();
            } else {
                console.error("차량 삭제 실패: ", message);
                alert("차량 삭제 실패: " + message);
            }
        } catch (e) {
            console.error("차량 삭제 중 에러 발생: ", e);
            alert("차량 삭제 중 에러 발생: " + e);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1);
    };

    const handleUpdateModalOpen = () => {
        setOpenDetailModal(false);
        setTimeout(() => setOpenUpdateModal(true), 0);
    };
    const handleStatusUpdateModalOpen = (vehicleId: number, newStatus: VehicleStatus) => {
        setUpdateStatusVehicleId(vehicleId);
        setPendingStatus(newStatus);
        setOpenUpdateModal(true);
    };

    const handleCreateModalOpen = () => setOpenCreateModal(true);
    const handleCreateModalClose = () => setOpenCreateModal(false);
    const handleDetailModalClose = () => setOpenDetailModal(false);
    const handleUpdateModalClose = () => setOpenUpdateModal(false);
    const handleStatusUpdateModalClose = () => {
        setUpdateStatusVehicleId(null);
        setPendingStatus(null);
        setOpenUpdateStatusModal(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" fontWeight={700}>
                        차량 관리
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
                                        <TableCell align="center">차량 번호</TableCell>
                                        <TableCell align="center">모델명</TableCell>
                                        <TableCell align="center">상태</TableCell>
                                        <TableCell align="center">등록일</TableCell>
                                        <TableCell align="center">상세 조회</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {listLoading && (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                <CircularProgress color="inherit" size={28} sx={{ mx: 'auto ' }} />
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    {!listLoading && listData.content.map((row, index) => (
                                        <TableRow hover key={row.vehicleId}>
                                            <TableCell align="center">{page * size + index + 1}</TableCell>
                                            <TableCell align="center">{row.vehicleNumber}</TableCell>
                                            <TableCell align="center">{row.modelName}</TableCell>
                                            <TableCell align="center">
                                                <Select
                                                    size="small"
                                                    value={row.status}
                                                    disabled={updatedStatusVehicleId === row.vehicleId || listLoading}
                                                    onChange={(e) => handleSelectChange(e, row.vehicleId, row.status)}
                                                    renderValue={(value) => (
                                                        <Chip
                                                            size="small"
                                                            color={vehicleStatusColorMap[value as VehicleStatus] ?? "default"}
                                                        />
                                                    )}
                                                >
                                                    {Object.values(VehicleStatus)
                                                        .filter((status) => status !== VehicleStatus.DELETED)
                                                        .map((status) => (
                                                            <MenuItem key={status} value={status}>
                                                                <Chip
                                                                    size="small"
                                                                    color={vehicleStatusColorMap[status] ?? "default"}
                                                                />
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="center">{new Date(row.createdAt).toLocaleString('ko-KR')}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    onClick={() => handleDetail(row.vehicleId)}
                                                >
                                                    상세
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
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
            </Box>
        </Box>
    );
}

export default AllVehicleListPage;