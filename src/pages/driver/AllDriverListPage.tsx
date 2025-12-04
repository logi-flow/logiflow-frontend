import { useEffect, useState, type ChangeEvent } from "react";
import type PageDto from "../../dtos/page.dto";
import type { GetAllDriverResponseDto } from "../../dtos/driver/response/get-all-driver.response.dto";
import type { GetDriverDetailResponseDto } from "../../dtos/driver/response/get-driver-detail.response.dto";
import { DriverStatus, driverStatusColorMap, driverStatusMap } from "../../enums/driver-status.enum";
import { createDriver, getAllDriver, getDriverDetail, retiredDriver, updateDriverByAdmin, updateDriverPay, updateDriverStatus } from "../../apis/driver/driver.apis";
import type { CreateDriverRequestDto } from "../../dtos/driver/request/create-driver.request.dto";
import { errorBarReducer } from "recharts/types/state/errorBarSlice";
import type { UpdateDriverByAdminRequestDto } from "../../dtos/driver/request/update-driver-by-admin.request.dto";
import type { UpdateDriverPayRequestDto } from "../../dtos/driver/request/update-driver-pay.request.dto";
import type { UpdateDriverStatusRequestDto } from "../../dtos/driver/request/update-driver-status.request.dto";
import { Box, Button, Chip, CircularProgress, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, type SelectChangeEvent } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const accessToken = "";

function AllDriverListPage() {
    const [page, setPage] = useState(0);
    const [queryKey, setQueryKey] = useState(0);

    const [listLoading, setListLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const [listData, setListData] = useState<PageDto<GetAllDriverResponseDto>>({
        content: [], number: 0, size: 0, totalElements: 0, totalPages: 0,
        first: true, last: true, hasNext: false, hasPrevious: false, sort: 'desc',
    });

    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openUpdatePayModal, setOpenUpdatePayModal] = useState(false);
    const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState(false);

    const [selectedDriver, setSelectedDriver] = useState<GetDriverDetailResponseDto>();
    const [updatedStatusDriverId, setUpdatedStatusDriverId] = useState<number | null>(null);
    const [pendingStatus, setPendingStatus] = useState<DriverStatus | null>(null);

    const size = 10;
    const sort = "desc";

    useEffect(() => {
        if (queryKey === 0) return;
        fetchAllDrivers();
    }, [page, queryKey, accessToken]);

    const fetchAllDrivers = async () => {
        if (!accessToken || listLoading) return;
        try {
            setListLoading(true);
            const response = await getAllDriver(page, size, sort, accessToken);
            const { code, message, data } = response;
            if (code === "SU" && data) {
                setListData(data);
            } else {
                console.error("Failed to fetch drivers: ", message);
                alert("기사 목록 조회 실패: " + message);
            }
        } catch (e) {
            console.error("Error fetching drivers: ", e);
            alert("기사 목록 조회 중 에러 발생: " + String(e));
        } finally {
            setListLoading(false);
        }
    };

    const handleCreate = async (dto: CreateDriverRequestDto) => {
        if (!accessToken || createLoading) return;
        try {
            setCreateLoading(true);
            const response = await createDriver(dto, accessToken);
            if (response.code === "SU" && response.data) {
                setOpenCreateModal(false);
                setPage(0);
                setQueryKey(prev => prev + 1);
                alert(`기사 생성이 완료되었습니다. \n\n사용자 ID: ${response.data.username}\n초기 비밀번호: (연락처 뒤 4자리)\n\n최초 로그인 시 비밀번호 변경이 필요합니다.`);
            } else {
                console.error("Failed to create driver:", response.message);
                alert("기사 생성 실패: " + response.message);
            }
        } catch (e) {
            console.error("Error creating dirver:", e);
            alert("기사 생성 중 에러 발생: " + String(e));
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDetail = async (driverId: number) => {
        if (!accessToken || detailLoading) return;
        setOpenUpdateModal(true);
        setSelectedDriver(undefined);
        try {
            setDetailLoading(true);
            const response = await getDriverDetail(driverId, accessToken);
            if (response.code === "SU" && response.data) {
                setSelectedDriver(response.data);
            } else {
                console.error("Failed to fetch driver details:", response.message);
                alert("기사 상세 조회 실패:" + response.message);
            }
        } catch (e) {
            console.error("Error fetching driver details:", e);
            alert("기사 상세 조회 중 에러 발생: " + String(e));
        } finally {
            setDetailLoading(false);
        }
    };

    const handleUpdate = async (driverId: number, dto: UpdateDriverByAdminRequestDto) => {
        if (!accessToken || updateLoading) return;
        try {
            setUpdateLoading(true);
            const response = await updateDriverByAdmin(driverId, dto, accessToken);
            if (response.code === "SU") {
                setOpenUpdateModal(false);
                await fetchAllDrivers();
                if (selectedDriver && openDetailModal) {
                    handleDetail(selectedDriver.driverId);
                }
            } else {
                console.error("Failed to update driver info:", response.message);
                alert("기사 정보 수정 실패: " + response.message);
            }
        } catch (e) {
            console.error("Error updating driver info:", e);
            alert("기사 정보 수정 중 에러 발생: " + String(e));
        } finally {
            setUpdateLoading(false);
        }
    };

    const handlePayUpdate = async (driverId: number, dto: UpdateDriverPayRequestDto) => {
        if (!accessToken || updateLoading) return;
        try {
            setUpdateLoading(true);
            const response = await updateDriverPay(driverId, dto, accessToken);
            if (response.code === "SU") {
                setOpenUpdatePayModal(false);
                await fetchAllDrivers();
                if (selectedDriver && openDetailModal) {
                    handleDetail(selectedDriver.driverId);
                }
            } else {
                console.error("Failed to update driver pay:", response.message);
                alert("기사 급여 수정 실패: " + response.message);
            }
        } catch (e) {
            console.error("Error updating driver pay:", e);
            alert("기사 급여 수정 중 에러 발생: " + String(e));
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleStatusUpdate = async (driverId: number, dto: UpdateDriverStatusRequestDto) => {
        if (!accessToken || updateLoading) return;
        try {
            setUpdateLoading(true);
            const response = await updateDriverStatus(driverId, dto, accessToken);
            if (response.code === "SU") {
                setOpenUpdateStatusModal(false);
                await fetchAllDrivers();
            } else {
                console.error("Failed to update driver status:", response.message);
                alert("기사 상태 수정 실패: " + response.message);
            }
        } catch (e) {
            console.error("Error updating driver status:", e);
            alert("기사 상태 수정 중 에러 발생: " + String(e));
        } finally {
            setUpdatedStatusDriverId(null);
            setPendingStatus(null);
            setUpdateLoading(false);
        }
    };

    const handleDelete = async (driverId: number) => {
        if (!accessToken || updateLoading) return;
        try {
            setDetailLoading(true);
            const response = await retiredDriver(driverId, accessToken);
            if (response.code === "SU") {
                setOpenDetailModal(false);
                await fetchAllDrivers();
                alert(`기사(ID: ${driverId})가 퇴사 처리되었습니다.`);
            } else {
                console.error("Failed to retire driver:", response.message);
                alert("퇴사 처리 실패: " + response.message);
            }
        } catch (e) {
            console.error("Error retiring driver:", e);
            alert("퇴사 처리 수정 중 에러 발생: " + String(e));
        } finally {
            setDetailLoading(false);
        }
    };

    const handleSearch = () => {
        setPage(0);
        setQueryKey(prev => prev + 1);
    }

    const handleSelectChange = (e: SelectChangeEvent<string>, dirverId: number, currentStatus: DriverStatus) => {
        const nextStatus = e.target.value as DriverStatus;
        if (nextStatus === currentStatus) return;
        handleStatusUpdateModalOpen(dirverId, nextStatus);
    }

    const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1);
    };

    const handleUpdateModalOpen = () => {
        setOpenDetailModal(false);
        setTimeout(() => setOpenUpdatePayModal(true), 0);
    };
    const handleStatusUpdateModalOpen = (driverId: number, newStatus: DriverStatus) => {
        setUpdatedStatusDriverId(driverId);
        setPendingStatus(newStatus);
        setOpenUpdateStatusModal(true);
    };
    const handleCreateModalOpen = () => setOpenCreateModal(true);
    const handleCreateModalClose = () => setOpenCreateModal(false);
    const handleDetailModalClose = () => setOpenDetailModal(false);
    const handleUpdateModalClose = () => setOpenUpdateModal(false);
    const handlePayUpdateModalClose = () => setOpenUpdatePayModal(false);
    const handleStatusUpdateModalClose = () => {
        setUpdatedStatusDriverId(null);
        setPendingStatus(null);
        setOpenUpdateStatusModal(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight={700}>기사 관리</Typography>
                </Stack>

                <Stack sx={{ p: 3 }} spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
                    <Button sx={{ width: '80px' }} variant="contained" size="medium" disabled={listLoading} onClick={handleSearch}>조회</Button>
                    <Button sx={{ width: '80px' }} variant="contained" size="medium" disabled={listLoading} onClick={handleCreateModalOpen}>추가</Button>
                </Stack>

                <Stack sx={{ p: 3 }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table sx={{ minWidth: 750 }}>
                                <caption>총 {listData.totalElements}건</caption>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">순번</TableCell>
                                        <TableCell align="center">기사 ID</TableCell>
                                        <TableCell align="center">기사명</TableCell>
                                        <TableCell align="center">연락처</TableCell>
                                        <TableCell align="center">상태</TableCell>
                                        <TableCell align="center">등록일</TableCell>
                                        <TableCell align="center">상세 조회</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!listLoading && (<TableRow><TableCell colSpan={7} align="center"><CircularProgress /></TableCell></TableRow>)}
                                    {!listLoading && queryKey > 0 && listData.totalElements <= 0 && (<TableRow><TableCell colSpan={7} align="center">조회 결과가 없습니다.</TableCell></TableRow>)}
                                    {!listLoading && listData.content.map((row, index) => (
                                        <TableRow hover key={row.driverId}>
                                            <TableCell align="center">{page * size + index + 1}</TableCell>
                                            <TableCell align="center">{row.driverId}</TableCell>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.phoneNumber}</TableCell>
                                            <TableCell align="center">
                                                <Select
                                                    size="small"
                                                    value={row.status}
                                                    disabled={updatedStatusDriverId === row.driverId || listLoading}
                                                    onChange={(e) => handleSelectChange(e, row.driverId, row.status)}
                                                    renderValue={(value) => (
                                                        <Chip size="small"
                                                            label={driverStatusMap[value as DriverStatus] ?? "알 수 없음"}
                                                            color={driverStatusColorMap[value as DriverStatus] ?? "default"}
                                                        />
                                                    )}
                                                >
                                                    {Object.values(DriverStatus)
                                                        .filter(status => status !== DriverStatus.RETIRED)
                                                        .map((status) => (
                                                            <MenuItem key={status} value={status}>
                                                                <Chip size="small"
                                                                    label={driverStatusMap[status] ?? "알 수 없음"}
                                                                    color={driverStatusColorMap[status] ?? "default"}
                                                                />
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell align="center">{new Date(row.createdAt).toLocaleString('ko-KR')}</TableCell>
                                            <TableCell align="center">
                                                <Button size="small" variant="contained" onClick={() => handleDetail(row.driverId)}>상세</Button>
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
                            count={listData.totalPages} page={page + 1} onChange={handleChangePage}
                            variant="outlined" shape="rounded" showFirstButton showLastButton
                        />
                    </Stack>
                )}

                {/* <CreateDriverModal
                    open={openCreateModal}
                    loading={createLoading}
                    onClose={handleCreateModalClose}
                    onConfirm={handleCreate}
                />
                <DriverDetailModal
                    driver={selectedDriver}
                    open={openDetailModal}
                    loading={detailLoading}
                    onClose={handleDetailModalClose}
                    onEditInfo={handleUpdateModalOpen}
                    onEditPay={handlePayUpdate}
                    onDelete={handleDelete}
                />
                <UpdateDriverModal
                    dirver={selectedDriver}
                    open={openUpdateModal}
                    loading={updateLoading}
                    onClose={handleUpdateModalClose}
                    onConfirm={handlePayUpdate}
                />
                <UpdateDriverStatusModal
                    dirverId={updatedStatusDriverId}
                    newStatus={pendingStatus}
                    open={openUpdateStatusModal}
                    loading={updateLoading}
                    onClose={handleStatusUpdateModalClose}
                    onConfirm={handleStatusUpdate}
                /> */}
            </Box>
        </Box>
    )
}