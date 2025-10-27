import { useEffect, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import type { CreateVehicleRequestDto } from "../../dtos/vehicle/request/create-vehicle.request.dto";
import { Fuel } from "../../enums/fuel.enum";
import { VehicleStatus } from "../../enums/vehicle-status.enum";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, type SelectChangeEvent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from "../ConfirmModal";


interface Props {
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onConfirm: (dto: CreateVehicleRequestDto) => void;
}

type VehicleCreateForm = CreateVehicleRequestDto;

function CreateVehicleModal({ open, loading, onClose, onConfirm }: Props) {
    const initialForm: VehicleCreateForm = {
        vehicleNumber: "",
        modelName: "",
        modelYear: new Date().getFullYear(),
        capacity: 1,
        mileage: 0,
        fuel: Fuel.DIESEL,
        status: VehicleStatus.AVAILABLE,
    };
    const [form, setForm] = useState(initialForm);

    const initialTouched = { vehicleNumber: false, modelName: false };
    const [touched, setTouched] = useState(initialTouched);

    const isVehicleNumberEmpty = form.vehicleNumber.trim() === ""
    const isVehicleNumberInvalid = touched.vehicleNumber && isVehicleNumberEmpty;
    const vehicleNumberHelperText = isVehicleNumberInvalid ? "차량 번호를 입력해 주세요" : "";


    const isModelNameEmpty = form.modelName.trim() === ""
    const isModelNameInvalid = touched.modelName && isModelNameEmpty;
    const modelNameHelperText = isModelNameInvalid ? "모델명을 입력해 주세요." : "";

    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    useEffect(() => {
        if (open) {
            setForm(initialForm);
            setTouched(initialTouched);
        }
    }, [open]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        if (name === "vehicleNumber" || name === "modelName") {
            setTouched(prev => ({ ...prev, [name]: true }));
        }
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isVehicleNumberEmpty || isModelNameEmpty || loading) return;
        setOpenConfirmModal(true);
    };
    const handleConfirmCreate = () => {
        if (isVehicleNumberEmpty || isModelNameEmpty || loading) return;

        const dto: CreateVehicleRequestDto = {
            ...form,
            modelYear: Number(form.modelYear),
            capacity: Number(form.capacity),
            mileage: Number(form.mileage),
        };
        onConfirm(dto);
        setOpenConfirmModal(false);
    };
    const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        onClose();
    };
    const
        handleConfirmModalClose = () => setOpenConfirmModal(false);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
            disableEscapeKeyDown
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    새 차량 등록
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
                        <DialogContentText>
                            * 표시는 필수 항목입니다.
                        </DialogContentText>
                        <form id="createVehicleForm" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        id="vehicleNumber"
                                        name="vehicleNumber"
                                        label="차량 번호"
                                        value={form.vehicleNumber}
                                        fullWidth
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={isVehicleNumberInvalid}
                                        helperText={vehicleNumberHelperText}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        id="modelName"
                                        name="modelName"
                                        label="모델명"
                                        value={form.modelName}
                                        fullWidth
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={isModelNameInvalid}
                                        helperText={modelNameHelperText}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="modelYear"
                                        name="modelYear"
                                        label="연식"
                                        value={form.modelYear}
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="capacity"
                                        name="capacity"
                                        label="적재용량(톤)"
                                        type="number"
                                        value={form.capacity}
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        id="mileage"
                                        name="mileage"
                                        label="주행거리(km)"
                                        type="number"
                                        value={form.mileage}
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="fuel-select-label">연료</InputLabel>
                                        <Select
                                            labelId="fuel-select-label"
                                            id="fuel"
                                            name="fuel"
                                            label="연료"
                                            value={form.fuel}
                                            onChange={handleSelectChange}
                                        >
                                            {Object.values(Fuel).map((f) => (
                                                <MenuItem key={f} value={f}>{f}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="status-select-label">상태</InputLabel>
                                        <Select
                                            labelId="status-select-label"
                                            id="status"
                                            name="status"
                                            label="상태"
                                            value={form.status}
                                            onChange={handleSelectChange}
                                        >
                                            {Object.values(VehicleStatus)
                                                .filter((s) => s !== VehicleStatus.DELETED)
                                                .map((s) => (
                                                    <MenuItem key={s} value={s}>{s}</MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>
                    </Stack>
                )}
            </DialogContent>

            <DialogActions>
                <Button type="submit" form="crateVehicleForm" disabled={loading || isVehicleNumberEmpty || isModelNameEmpty}>
                    완료
                </Button>
            </DialogActions>

            <ConfirmModal
                open={openConfirmModal}
                type="생성"
                onConfirm={handleConfirmCreate}
                onClose={handleConfirmModalClose}
            />
        </Dialog>
    );
}

export default CreateVehicleModal;