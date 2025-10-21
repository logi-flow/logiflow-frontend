import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { DriverPayrollStatus, payrollStatusMap } from "../../enums/driver-payroll-status.enum";
import type { UpdateDriverPayrollStatusRequestDto } from "../../dtos/driverPayroll/request/update-driver-payroll-status.request.dto";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import ConfirmModal from "../ConfirmModal";

interface Props {
  payrollId: number | null;
  newStatus: DriverPayrollStatus | null;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (payrollId: number, dto: UpdateDriverPayrollStatusRequestDto) => void;
}

function UpdateDriverPayrollStatusModal({ open, loading, payrollId, newStatus, onClose, onConfirm }: Props) {
  const initialForm = { changeReason: "" };
  const [form, setForm] = useState({
    changeReason: ""
  });
  const changeReasonHelperText = "변경 사유를 입력해 주세요";
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (payrollId && newStatus) {
      setForm(initialForm);
    } else {
      setForm(initialForm);
    }
  }, [open, payrollId, newStatus]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
  
      if (!payrollId || !newStatus) return;
      
      setOpenConfirmModal(true);
    };
  
  const handleConfirmUpdate = () => {
    if (!payrollId || !newStatus) return;
    
    const dto: UpdateDriverPayrollStatusRequestDto = {
      status: newStatus,
      changeReason: form.changeReason
    };
    onConfirm(payrollId, dto);
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
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          급여대장 상태 수정
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
              선택 사항
            </DialogContentText>
            <form id="updatePayrollStatusForm" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>상태를 {newStatus ? payrollStatusMap[newStatus] : "알 수 없음"}(으)로 변경합니다. <br /> 변경 사유를 입력해 주세요. </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="changeReason"
                    name="changeReason"
                    label="변경 사유"
                    type="text"
                    inputMode="text"
                    value={form.changeReason}
                    fullWidth
                    onChange={handleChange}
                    helperText={changeReasonHelperText}
                  />
                </Grid>
              </Grid>
            </form>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button type="submit" form="updatePayrollStatusForm" disabled={loading || !payrollId || !newStatus}>
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

export default UpdateDriverPayrollStatusModal;