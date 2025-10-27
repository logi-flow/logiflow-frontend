import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { UpdateVehicleStatusRequestDto } from "../../dtos/vehicle/request/update-vehicle-status.request.dto";
import type { VehicleStatus } from "../../enums/vehicle-status.enum";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from "../ConfirmModal";

interface Props {
    vehicleId: number | null;
    newStatus: VehicleStatus | null;
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onConfirm: (vehicleId: number, dto: UpdateVehicleStatusRequestDto) => void;
}

function UpdateVehicleStatusModal({ vehicleId, newStatus, open, loading, onClose, onConfirm }: Props) {
    const [changeReason, setChangeReason] = useState("");
    const isReasonEmpty = changeReason.trim() === "";
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    useEffect(() => {
        if (open) {
            setChangeReason("");
        }
    }, [open]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeReason(e.target.value);
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isReasonEmpty || loading || !vehicleId || !newStatus) return;
        setOpenConfirmModal(true);
    };

    const handleConfirmUpdate = () => {
        if (isReasonEmpty || loading || !vehicleId || !newStatus) return;

        const dto: UpdateVehicleStatusRequestDto = {
            status: newStatus,
            changeReason,
        };
        onConfirm(vehicleId, dto);
        setOpenConfirmModal(false);
    };

    const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        onClose();
    };

    const handleConfirmModalClose = () => setOpenConfirmModal(false);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            disableEscapeKeyDown
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    차량 상태 변경
                    <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <DialogContent dividers>
                {loading ? (
                    <Stack sx={{ p: 3 }} alignItems="center">
                        <CircularProgress color="inherit" size={28} sx={{ mx: 'auto' }} />
                    </Stack>
                ) : (
                    <Stack spacing={2}>
                        <Typography>
                            차량(ID: {vehicleId})의 상태를
                            <Typography component="span" fontWeight="bold"> {newStatus} </Typography>
                            (으)로 변경합니다.
                        </Typography>
                        <form id="updateVehicleStatusForm" onSubmit={handleSubmit}>
                            <TextField
                                required
                                id="changeReason"
                                name="changeReason"
                                label="변경 사유"
                                value={changeReason}
                                fullWidth
                                multiline
                                rows={3}
                                onChange={handleChange}
                                helperText={isReasonEmpty ? "변경 사유를 입력해야 합니다." : ""}
                                error={isReasonEmpty}
                            />
                        </form>
                    </Stack>
                )}
            </DialogContent>

            <DialogActions>
                <Button type="submit" form="updateVehicleStatusForm" disabled={loading || isReasonEmpty}>
                    완료
                </Button>
            </DialogActions>

            <ConfirmModal
                open={openConfirmModal}
                type="수정"
                onConfirm={handleConfirmUpdate}
                onClose={handleConfirmModalClose}
            />
        </Dialog>
    );
}

export default UpdateVehicleStatusModal;