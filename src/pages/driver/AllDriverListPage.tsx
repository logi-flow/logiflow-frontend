import { useEffect, useState, type ChangeEvent } from "react";
import type PageDto from "../../dtos/page.dto";
import type { GetAllDriverResponseDto } from "../../dtos/driver/response/get-all-driver.response.dto";
import type { GetDriverDetailResponseDto } from "../../dtos/driver/response/get-driver-detail.response.dto";
import type { DriverStatus } from "../../enums/driver-status.enum";
import { createDriver, getAllDriver, getDriverDetail, retiredDriver, updateDriverByAdmin, updateDriverPay, updateDriverStatus } from "../../apis/driver/driver.apis";
import type { CreateDriverRequestDto } from "../../dtos/driver/request/create-driver.request.dto";
import { errorBarReducer } from "recharts/types/state/errorBarSlice";
import type { UpdateDriverByAdminRequestDto } from "../../dtos/driver/request/update-driver-by-admin.request.dto";
import type { UpdateDriverPayRequestDto } from "../../dtos/driver/request/update-driver-pay.request.dto";
import type { UpdateDriverStatusRequestDto } from "../../dtos/driver/request/update-driver-status.request.dto";
import { Box, type SelectChangeEvent } from "@mui/material";

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
            
        </Box>
    )
    
}