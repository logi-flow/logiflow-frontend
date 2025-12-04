import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from "../ConfirmModal";
import type { CreateDriverPayrollRequestDto } from "../../dtos/driverPayroll/request/create-driver-payroll.request.dto";
import DriverListModal from "./DriverListModal";
import type { GetDriverDetailResponseDto } from "../../dtos/driver/response/get-driver-detail.response.dto";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (dto: CreateDriverPayrollRequestDto) => void;
}

function CreateDriverPayrollModal({ open, loading, onClose, onConfirm }: Props) {
  const initialForm = { driverId: "", driverName: "", title: "", periodStartDate: "", periodEndDate: "" };
  const [form, setForm] = useState({
    driverId: "",
    driverName: "",
    title: "",
    periodStartDate: "",
    periodEndDate: ""
  });
  const initialTouched = { driverId: false, periodStartDate: false, periodEndDate: false };
  const [touched, setTouched] = useState({ driverId: false, periodStartDate: false, periodEndDate: false });
  const isDriverIdEmpty = form.driverId.trim() === "";
  const isDriverIdInvalid = touched.driverId && isDriverIdEmpty;
  const driverIdHelperText = isDriverIdInvalid ? "기사를 선택해 주세요." : "";
  const isPeriodStartDateEmpty = form.periodStartDate.trim() === "";
  const isPeriodStartDateInvalid = touched.periodStartDate && isPeriodStartDateEmpty;
  const periodStartDateHelperText = isPeriodStartDateInvalid ? "시작일를 입력해 주세요." : "";
  const isPeriodEndDateEmpty = form.periodEndDate.trim() === "";
  const isPeriodEndDateInvalid = touched.periodEndDate && isPeriodEndDateEmpty;
  const periodEndDateHelperText = isPeriodEndDateInvalid ? "종료일을 입력해 주세요." : "";
  const [openDriverListModal, setOpenDriverListModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    if (open){
      setForm(initialForm);
      setTouched(initialTouched);
    }
  }, [open]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === "driverId" || name === "periodStartDate" || name === "periodEndDate") {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleDriverList = () => {
    if (loading) return;

    setOpenDriverListModal(true);
  };

  const handleSelectDriver = (driver: GetDriverDetailResponseDto) => {
    setForm(prev => ({ ...prev, driverId: String(driver.driverId), driverName: driver.name }));
    setOpenDriverListModal(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isDriverIdEmpty || isPeriodStartDateEmpty || isPeriodEndDateEmpty || loading) return;

    setOpenConfirmModal(true);
  };

  const handleConfirmCreate = () => {
    if (isDriverIdEmpty || isPeriodStartDateEmpty || isPeriodEndDateEmpty || loading) return;
    
    const dto: CreateDriverPayrollRequestDto = {
      ...form,
      driverId: Number(form.driverId),
    };
    onConfirm(dto);
    setOpenConfirmModal(false);
  };

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };
  
  const handleDriverListModalClose = () => setOpenDriverListModal(false);
  const handleConfirmModalClose = () => setOpenConfirmModal(false);

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
          기사 급여대장 추가
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Stack sx={{ p: 3 }} alignItems="center" >
            <CircularProgress color="inherit" size={28} sx={{ mx: 'auto'}}/>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <DialogContentText>
              * 표시는 필수 항목입니다.
            </DialogContentText>
            <form id="createDriverPayrollForm" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    required
                    id="driverId"
                    name="driverId"
                    label="기사 고유번호"
                    type="text"
                    inputMode="text"
                    value={form.driverId}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={isDriverIdInvalid}
                    helperText={driverIdHelperText}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    disabled
                    id="driverName"
                    name="driverName"
                    label="기사 이름"
                    type="text"
                    inputMode="text"
                    value={form.driverName}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    sx={{ height: '100%' }}
                    fullWidth
                    variant="contained"
                    size="medium"
                    disabled={loading}
                    onClick={handleDriverList}
                  >
                    기사 찾기
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="title"
                    name="title"
                    label="급여대장명"
                    type="text"
                    inputMode="text"
                    value={form.title}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="periodStartDate"
                    name="periodStartDate"
                    label="시작일"
                    type="date"
                    inputMode="text"
                    InputLabelProps={{ shrink: true }}
                    value={form.periodStartDate}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={isPeriodStartDateInvalid}
                    helperText={periodStartDateHelperText}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="periodEndDate"
                    name="periodEndDate"
                    label="종료일"
                    type="date"
                    inputMode="text"
                    InputLabelProps={{ shrink: true }}
                    value={form.periodEndDate}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={isPeriodEndDateInvalid}
                    helperText={periodEndDateHelperText}
                  />
                </Grid>
              </Grid>
            </form>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button type="submit" form="createDriverPayrollForm" disabled={loading || isDriverIdEmpty || isPeriodStartDateEmpty || isPeriodEndDateEmpty}>
          완료
        </Button>
      </DialogActions>

      <DriverListModal
        open={openDriverListModal}
        loading={loading}
        onConfirm={handleSelectDriver}
        onClose={handleDriverListModalClose}
      />

      <ConfirmModal 
        open={openConfirmModal}
        type="생성"
        onConfirm={handleConfirmCreate}
        onClose={handleConfirmModalClose}
      />
    </Dialog>
  )
}

export default CreateDriverPayrollModal;