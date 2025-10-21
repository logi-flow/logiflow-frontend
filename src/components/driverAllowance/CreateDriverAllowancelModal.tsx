import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Stack, TextField } from "@mui/material";
import { useEffect, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { NumericFormat, type NumberFormatValues } from "react-number-format";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from "../ConfirmModal";
import type { CreateDriverAllowanceRequestDto } from "../../dtos/driverAllowance/request/create-driver-allowance.request.dto";
import AllowanceTypeListModal from "./AllowanceTypeListModal";
import type { GetAllowanceTypeDetailResponseDto } from "../../dtos/allowanceType/response/get-allowance-type-detail.response.dto";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (dto: CreateDriverAllowanceRequestDto) => void;
}

function CreateDriverAllowanceModal({ open, loading, onClose, onConfirm }: Props) {
  const initialForm = { allowanceTypeId: "", allowanceTypeCode: "", allowanceTypeName:"", quantity: "", unitPrice: "", memo: "" };
  const [form, setForm] = useState({
    allowanceTypeId: "",
    allowanceTypeCode: "",
    allowanceTypeName: "",
    quantity: "",
    unitPrice: "",
    memo: ""
  });
  const initialTouched = { allowanceTypeId: false, quantity: false, unitPrice: false };
  const [touched, setTouched] = useState({ allowanceTypeId: false, quantity: false, unitPrice: false });
  const isAllowanceTypeIdEmpty = form.allowanceTypeId.trim() === "";
  const isAllowanceTypeIdInvalid = touched.allowanceTypeId && isAllowanceTypeIdEmpty;
  const allowanceTypeIdHelperText = isAllowanceTypeIdInvalid ? "수당 항목을 선택해 주세요." : "";
  const isQuantityEmpty = form.quantity.trim() === "";
  const isQuantityInvalid = touched.quantity && isQuantityEmpty;
  const quantityHelperText = isQuantityInvalid ? "수량(일수)를 입력해 주세요." : "";
  const isUnitPriceEmpty = form.unitPrice.trim() === "";
  const isUnitPriceInvalid = touched.unitPrice && isUnitPriceEmpty;
  const unitPriceHelperText = isUnitPriceInvalid ? "단가를 입력해 주세요." : "";
  const [openAllowanceTypeListModal, setOpenAllowanceTypeListModal] = useState(false);
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

  const handleValueChange = (values: NumberFormatValues, name: string ) => {
    setForm(prev => ({ ...prev, [name]: values.value, }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (name === "allowanceTypeId" || name === "quantity" || name === "unitPrice") {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const handleAllowanceTypeList = () => {
    if (loading) return;

    setOpenAllowanceTypeListModal(true);
  };

  const handleSelectAllowanceType = (allowanceType: GetAllowanceTypeDetailResponseDto) => {
    setForm(prev => ({ ...prev, allowanceTypeId: String(allowanceType.id), allowanceTypeCode: allowanceType.code, allowanceTypeName: allowanceType.name }));
    setOpenAllowanceTypeListModal(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isAllowanceTypeIdEmpty || isQuantityEmpty || isUnitPriceEmpty || loading) return;

    setOpenConfirmModal(true);
  };

  const handleConfirmCreate = () => {
    if (isAllowanceTypeIdEmpty || isQuantityEmpty || isUnitPriceEmpty || loading) return;
    
    const dto: CreateDriverAllowanceRequestDto = {
      ...form,
      allowanceTypeId: Number(form.allowanceTypeId),
      quantity: Number(form.quantity),
      unitPrice: Number(form.unitPrice),
    };
    onConfirm(dto);
    setOpenConfirmModal(false);
  };

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };
  
  const handleAllowanceTypeListModalClose = () => setOpenAllowanceTypeListModal(false);
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
          수당 내역 등록
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
            <form id="createDriverAllowanceForm" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                  <TextField
                    required
                    id="allowanceTypeId"
                    name="allowanceTypeId"
                    label="항목 고유번호"
                    type="number"
                    inputMode="numeric"
                    value={form.allowanceTypeId}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={isAllowanceTypeIdInvalid}
                    helperText={allowanceTypeIdHelperText}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    required
                    disabled
                    id="allowanceTypeCode"
                    name="allowanceTypeCode"
                    label="항목 코드명"
                    type="text"
                    inputMode="text"
                    value={form.allowanceTypeCode}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    required
                    disabled
                    id="allowanceTypeName"
                    name="allowanceTypeName"
                    label="항목명"
                    type="text"
                    inputMode="text"
                    value={form.allowanceTypeName}
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
                    onClick={handleAllowanceTypeList}
                  >
                    항목 찾기
                  </Button>
                </Grid>

                <Grid item xs={12} md={6}>
                  <NumericFormat
                    customInput={TextField}
                    required
                    id="quantity"
                    name="quantity"
                    label="수량 (일수)"
                    thousandSeparator=","
                    allowLeadingZeros={false}
                    inputMode="numeric"
                    InputLabelProps={{ shrink: true }}
                    value={form.quantity}
                    fullWidth
                    onValueChange={(values) => handleValueChange(values, "quantity")}
                    onBlur={handleBlur}
                    error={isQuantityInvalid}
                    helperText={quantityHelperText}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <NumericFormat
                    customInput={TextField}
                    required
                    id="unitPrice"
                    name="unitPrice"
                    label="단가"
                    thousandSeparator=","
                    allowLeadingZeros={false}
                    inputMode="numeric"
                    InputLabelProps={{ shrink: true }}
                    value={form.unitPrice}
                    fullWidth
                    onValueChange={(values) => handleValueChange(values, "unitPrice")}
                    onBlur={handleBlur}
                    error={isUnitPriceInvalid}
                    helperText={unitPriceHelperText}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="memo"
                    name="memo"
                    label="메모"
                    type="text"
                    inputMode="text"
                    value={form.memo}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </Grid>
            </form>
          </Stack>
        )}
      </DialogContent>

      <DialogActions>
        <Button type="submit" form="createDriverAllowanceForm" disabled={loading || isAllowanceTypeIdEmpty || isQuantityEmpty || isUnitPriceEmpty}>
          완료
        </Button>
      </DialogActions>

      <AllowanceTypeListModal
        open={openAllowanceTypeListModal}
        loading={loading}
        onConfirm={handleSelectAllowanceType}
        onClose={handleAllowanceTypeListModalClose}
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

export default CreateDriverAllowanceModal;