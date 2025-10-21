import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from "../ConfirmModal";
import type { GetDriverPayrollDetailResponseDto } from "../../dtos/driverPayroll/response/get-driver-payroll-detail.response.dto";
import type { UpdateDriverPayrollRequestDto } from "../../dtos/driverPayroll/request/update-driver-payroll.request.dto";

interface Props {
  payroll: GetDriverPayrollDetailResponseDto | undefined;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (payrollId: number, dto: UpdateDriverPayrollRequestDto) => void;
}

function UpdateDriverPayrollModal({ payroll, open, loading, onClose, onConfirm }: Props) {
  const initialForm = { driverId: payroll?.driverId, title: "", periodStartDate: "", periodEndDate: "" };
  const [form, setForm] = useState({
    driverId: payroll?.driverId,
    title: "",
    periodStartDate: "",
    periodEndDate: ""
  });
  const initialTouched = { periodStartDate: false, periodEndDate: false };
  const [touched, setTouched] = useState({ periodStartDate: false, periodEndDate: false });
  const driverIdHelperText = "기사는 변경할 수 없습니다.";
  const isPeriodStartDateEmpty = form.periodStartDate.trim() === "";
  const isPeriodStartDateInvalid = touched.periodStartDate && isPeriodStartDateEmpty;
  const periodStartDateHelperText = isPeriodStartDateInvalid ? "시작일를 입력해 주세요." : "";
  const isPeriodEndDateEmpty = form.periodEndDate.trim() === "";
  const isPeriodEndDateInvalid = touched.periodEndDate && isPeriodEndDateEmpty;
  const periodEndDateHelperText = isPeriodEndDateInvalid ? "종료일을 입력해 주세요." : "";
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (payroll) {
      setForm({
        driverId: payroll.driverId ?? "",
        title: payroll.title ?? "",
        periodStartDate: payroll.periodStartDate ?? "",
        periodEndDate: payroll.periodEndDate ?? true
      });
    } else {
      setForm(initialForm);
    }
    setTouched(initialTouched);
  }, [open, payroll]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === "code" || name === "name") {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isPeriodStartDateEmpty || isPeriodEndDateEmpty || loading || !payroll) return;
    
    setOpenConfirmModal(true);
  };

  const handleConfirmUpdate = () => {
    if (isPeriodStartDateEmpty || isPeriodEndDateEmpty || loading || !payroll) return;
    
    const dto: UpdateDriverPayrollRequestDto = form;
    onConfirm(payroll.id, dto);
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
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          급여대장 정보 수정
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
            <form id="updateAllowanceTypeForm" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled
                    id="driverId"
                    name="driverId"
                    label="기사 고유번호"
                    type="number"
                    inputMode="numeric"
                    value={form.driverId}
                    fullWidth
                    helperText={driverIdHelperText}
                  />
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
        <Button type="submit" form="updateAllowanceTypeForm" disabled={loading || isPeriodStartDateEmpty || isPeriodEndDateEmpty}>
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
  )
}

export default UpdateDriverPayrollModal;