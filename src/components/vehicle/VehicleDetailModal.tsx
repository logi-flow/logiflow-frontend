import { useState } from "react";
import type { GetVehicleDetailRseponseDto } from "../../dtos/vehicle/response/get-vehicle-detail.response.dto";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from "../ConfirmModal";

interface Props {
    vehicle: GetVehicleDetailRseponseDto | undefined;
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onEdit: () => void;
    onDelete: (vheicleId: number) => void;
}

function VehicleDetailModal({ vehicle, open, loading, onClose, onEdit, onDelete }: Props) {
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        onClose();
    };

    const handleDelete = () => {
        if (!vehicle) return;
        setOpenConfirmModal(true);
    };

    const handleConfirmDelete = () => {
        if (loading || !vehicle) return;
        onDelete(vehicle.vehicleId);
        setOpenConfirmModal(false);
    };

    const handleConfirmModalClose = () => setOpenConfirmModal(false);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            disableRestoreFocus
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    차량 상세 조회
                    <IconButton onClick={handleClose}>
                    <CloseIcon sx={{ fontSize: 30}} />
                    </IconButton>
                </Stack>                            
            </DialogTitle>

            <DialogContent dividers>
                {loading ? (
                    <Stack sx={{ p: 3 }} alignItems="center">
                        <CircularProgress color="inherit" size={28} sx={{ mx: 'auto'}}/>
                    </Stack>
                ) : vehicle ? (
                    <Stack spacing={2}>
                        <TableContainer component={Paper} elevation={0}>
                            <Table size="medium">
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={4} sx={{ bgcolor: 'lightgray', fontWeight: 700}}>
                                            차량 기본 정보
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>차량 ID</TableCell>
                                        <TableCell>{vehicle.vehicleId}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>차량 ID</TableCell>
                                        <TableCell>{vehicle.vehicleNumber}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>모델명</TableCell>
                                        <TableCell>{vehicle.modelName}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>연식</TableCell>
                                        <TableCell>{vehicle.modelYear}년</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper} elevation={0}>
                            <Table size="medium">
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={4} sx={{ bgcolor: 'lightgray', fontWeight: 700}}>
                                            차량 운행 정보
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>상태</TableCell>
                                        <TableCell>{vehicle.status}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>적재용량</TableCell>
                                        <TableCell>{vehicle.capacity}톤</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>주행거리</TableCell>
                                        <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>연료</TableCell>
                                        <TableCell>{vehicle.fuel}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper} elevation={0}>
                            <Table size="medium">
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={4} sx={{ bgcolor: 'lightgray', fontWeight: 700}}>
                                            입력 정보
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>등록일</TableCell>
                                        <TableCell>{new Date(vehicle.createdAt).toLocaleString('ko-KR')}</TableCell>
                                        <TableCell sx={{ fontWeight: 600, width: '30%'}}>수정일</TableCell>
                                        <TableCell>{new Date(vehicle.updatedAt).toLocaleString('ko-KR')}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                ) : (
                    <Typography>상세 정보를 불러올 수 없습니다.</Typography>
                )}
            </DialogContent>

           
            <DialogActions>
                <Button onClick={onEdit} variant="contained" disabled={loading || !vehicle}>
                    수정
                </Button>
                <Button onClick={handleDelete} variant="contained" color="error" disabled={loading || !vehicle}>
                    삭제
                </Button>
            </DialogActions>

            <ConfirmModal
                open={openConfirmModal}
                type="삭제"
                onConfirm={handleConfirmDelete}
                onClose={handleConfirmModalClose}
            />
        </Dialog>
    );
}

export default VehicleDetailModal;