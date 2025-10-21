import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from "../ConfirmModal";
import type { GetDeductionTypeDetailResponseDto } from "../../dtos/deductionType/response/get-deduction-type-detail.response.dto";
import type { UpdateDeductionTypeRequestDto } from "../../dtos/deductionType/request/update-deduction-type.request.dto";

interface Props {
  deductionType: GetDeductionTypeDetailResponseDto | undefined;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (deductionTypeId: number, dto: UpdateDeductionTypeRequestDto) => void;
}

const activeList = [
  { value: "true", label: "사용" },
  { value: "false", label: "미사용" }
];

function UpdateDeductionTypeModal({ deductionType, open, loading, onClose, onConfirm }: Props) {
  const initialForm = { code: deductionType?.code, name: "", description: "", isActive: true };
  const [form, setForm] = useState({
    code: deductionType?.code,
    name: "",
    description: "",
    isActive: true
  });
  const initialTouched = { name: false };
  const [touched, setTouched] = useState({ name: false });
  const codeHelperText = "코드는 변경할 수 없습니다.";
  const isNameEmpty = form.name.trim() === "";
  const isNameInvalid = touched.name && isNameEmpty;
  const nameHelperText = isNameInvalid ? "항목명을 입력해 주세요." : "";
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (deductionType) {
      setForm({
        code: deductionType.code ?? "",
        name: deductionType.name ?? "",
        description: deductionType.description ?? "",
        isActive: deductionType.active ?? true
      });
    } else {
      setForm(initialForm);
    }
    setTouched(initialTouched);
  }, [open, deductionType]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const boolValue = e.target.value === "true";
    setForm(prev => ({ ...prev, isActive: boolValue }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === "code" || name === "name") {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isNameEmpty || loading || !deductionType) return;
    
    setOpenConfirmModal(true);
  };

  const handleConfirmUpdate = () => {
    if (isNameEmpty || loading || !deductionType) return;
    
    const dto: UpdateDeductionTypeRequestDto = form;
    onConfirm(deductionType.id, dto);
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
          공제 항목 수정
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
            <form id="updateDeductionTypeForm" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    disabled
                    id="code"
                    name="code"
                    label="코드명"
                    type="text"
                    inputMode="text"
                    value={form.code}
                    fullWidth
                    helperText={codeHelperText}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="항목명"
                    type="text"
                    inputMode="text"
                    value={form.name}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={isNameInvalid}
                    helperText={nameHelperText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="설명"
                    type="text"
                    inputMode="text"
                    value={form.description}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="isActiveSelectLabel">사용 여부</InputLabel>
                    <Select
                      labelId="isActiveSelectLabel"
                      id="isActive"
                      name="isActive"
                      label="사용 여부"
                      value={String(form.isActive)}
                      fullWidth
                      onChange={handleSelectChange}
                    >
                      {activeList.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
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
        <Button type="submit" form="updateDeductionTypeForm" disabled={loading || isNameEmpty}>
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

export default UpdateDeductionTypeModal;