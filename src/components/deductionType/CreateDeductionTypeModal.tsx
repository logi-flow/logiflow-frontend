import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from "../ConfirmModal";
import type { CreateDeductionTypeRequestDto } from "../../dtos/deductionType/request/create-deduction-type.request.dto";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (dto: CreateDeductionTypeRequestDto) => void;
}

function CreateDeductionTypeModal({ open, loading, onClose, onConfirm }: Props) {
  const initialForm = { code: "", name: "", description: "" };
  const [form, setForm] = useState({
    code: "",
    name: "",
    description: ""
  });
  const initialTouched = { code: false, name: false };
  const [touched, setTouched] = useState({ code: false, name: false });
  const isCodeEmpty = form.code.trim() === "";
  const isCodeInvalid = touched.code && isCodeEmpty;
  const codeHelperText = isCodeInvalid ? "코드명을 입력해 주세요." : "공백은 허용되지 않으며, 영문은 대문자로 저장됩니다.";
  const isNameEmpty = form.name.trim() === "";
  const isNameInvalid = touched.name && isNameEmpty;
  const nameHelperText = isNameInvalid ? "항목명을 입력해 주세요." : "";
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

    if (name === "code" || name === "name") {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isCodeEmpty || isNameEmpty || loading) return;

    setOpenConfirmModal(true);
  };

  const handleConfirmCreate = () => {
    if (isCodeEmpty || isNameEmpty || loading) return;
    
    const dto: CreateDeductionTypeRequestDto = form;
    onConfirm(dto);
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
          공제 항목 추가
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
            <form id="createDeductionTypeForm" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="code"
                    name="code"
                    label="코드명"
                    type="text"
                    inputMode="text"
                    value={form.code}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={isCodeInvalid}
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
              </Grid>
            </form>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button type="submit" form="createDeductionTypeForm" disabled={loading || isCodeEmpty || isNameEmpty}>
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
  )
}

export default CreateDeductionTypeModal;