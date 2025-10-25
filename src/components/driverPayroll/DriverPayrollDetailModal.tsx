import { Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ConfirmModal from "../ConfirmModal";
import { useEffect, useState, type ChangeEvent } from "react";
import type { GetDriverPayrollDetailResponseDto } from "../../dtos/driverPayroll/response/get-driver-payroll-detail.response.dto";
import { payrollStatusColorMap, payrollStatusMap } from "../../enums/driver-payroll-status.enum";
import { driverDistrictMap } from "../../enums/driver-district.enum";
import type { UpdateDriverAllowanceRequestDto, UpdateDriverAllowanceRequestDtoItem } from "../../dtos/driverAllowance/request/update-driver-allowance.request.dto";
import { NumericFormat, type NumberFormatValues } from "react-number-format";
import type { UpdateDriverDeductionRequestDto, UpdateDriverDeductionRequestDtoItem } from "../../dtos/driverDeduction/request/update-driver-deduction.request.dto";
import type { UpdateDriverPayrollRequestDto } from "../../dtos/driverPayroll/request/update-driver-payroll.request.dto";

interface Props {
  payroll: GetDriverPayrollDetailResponseDto | undefined;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onPayrollUpdate: (payrollId: number, dto: UpdateDriverPayrollRequestDto) => void;
  onAllowanceCreate: () => void;
  onAllowanceUpdate: (dto: UpdateDriverAllowanceRequestDto) => void;
  onAllowanceDelete: (driverAllowanceId: number) => void;
  onDeductionCreate: () => void;
  onDeductionUpdate: (dto: UpdateDriverDeductionRequestDto) => void;
  onDeductionDelete: (driverDeductionId: number) => void;
  onDelete: (payrollId: number) => void;
}

function DriverPayrollDetailModal({ payroll, open, loading, onClose, onPayrollUpdate, onAllowanceCreate, onDeductionCreate, onAllowanceUpdate, onAllowanceDelete, onDeductionUpdate, onDeductionDelete, onDelete }: Props) {
  const [localAllowanceItems, setLocalAllowanceItems] = useState(payroll?.allowanceItems?? []);
  const [localDeductionItems, setLocalDeductionItems] = useState(payroll?.deductionItems?? []);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [editPayroll, setEditPayroll] = useState(false);
  const [editAllowance, setEditAllowance] = useState(false);
  const [editDeduction, setEditDeduction] = useState(false);
  const [updatedPayrollForm, setUpdatedPayrollForm] = useState({
    driverId: payroll?.driverId,
    title: payroll?.title ?? "",
    periodStartDate: payroll?.periodStartDate ?? "",
    periodEndDate: payroll?.periodEndDate ?? ""
  });
  const [updatedAllowanceForm, setUpdatedAllowanceForm] = useState<UpdateDriverAllowanceRequestDtoItem[]>([]);
  const [updatedDeductionForm, setUpdatedDeductionForm] = useState<UpdateDriverDeductionRequestDtoItem[]>([]);
  const [confirm, setConfirm] = useState<{ type: "update" | "cancel"; target: "payroll" | "allowance" | "deduction" } | null>(null);
  const isPeriodStartDateEmpty = updatedPayrollForm.periodStartDate.trim() === "";
  const periodStartDateHelperText = isPeriodStartDateEmpty ? "시작일를 입력해 주세요." : "";
  const isPeriodEndDateEmpty = updatedPayrollForm.periodEndDate.trim() === "";
  const periodEndDateHelperText = isPeriodEndDateEmpty ? "종료일을 입력해 주세요." : "";
  const isQuantityEmpty = (item?: UpdateDriverAllowanceRequestDtoItem | UpdateDriverDeductionRequestDtoItem) => !item || item.quantity === undefined;
  const isUnitPriceEmpty = (item?: UpdateDriverAllowanceRequestDtoItem | UpdateDriverDeductionRequestDtoItem) => !item || item.unitPrice === undefined;
  const hasPayrollInvalid = isPeriodStartDateEmpty || isPeriodEndDateEmpty;
  const hasAllowanceInvalid = updatedAllowanceForm.some(
    (item) => !item.quantity || !item.unitPrice
  );
  const hasDeductionInvalid = updatedDeductionForm.some(
    (item) => !item.quantity || !item.unitPrice
  );

  useEffect(() => {
    if (payroll) {
      setUpdatedPayrollForm({
        driverId: payroll.driverId,
        title: payroll.title ?? "",
        periodStartDate: payroll.periodStartDate,
        periodEndDate: payroll.periodEndDate,
      });
    }
  }, [payroll]);

  useEffect(() => {
    setLocalAllowanceItems(payroll?.allowanceItems ?? []);
    setLocalDeductionItems(payroll?.deductionItems ?? []);
  }, [payroll]);

  useEffect(() => {
    if (!payroll?.allowanceItems) {
      setUpdatedAllowanceForm([]);
      return;
    }

    const initial = payroll.allowanceItems.map((item) => ({
      id: item.id,
      quantity: item.quantity ?? 0,
      unitPrice: item.unitPrice ?? 0,
      memo: item.memo ?? "",
    }));

    setUpdatedAllowanceForm(initial);
  }, [payroll]);

  useEffect(() => {
    if (!payroll?.deductionItems) {
      setUpdatedDeductionForm([]);
      return;
    }

    const initial = payroll.deductionItems.map((item) => ({
      id: item.id,
      quantity: item.quantity ?? 0,
      unitPrice: item.unitPrice ?? 0,
      memo: item.memo ?? "",
    }));

    setUpdatedDeductionForm(initial);
  }, [payroll]);
  
  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;

    if (editPayroll || editAllowance || editDeduction) return (alert("수정 중에는 창을 닫을 수 없습니다."));
    onClose();
  };

  const handleDelete = () => {
    if (!payroll) return;

    setOpenDeleteConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (loading || !payroll) return;

    onDelete(payroll.id);
    setOpenDeleteConfirmModal(false);
  };

  const handleConfirmCancelUpdate = (type: "payroll" | "allowance" | "deduction") => {
    if (loading) return;

    if (type === "payroll" && payroll) {
      setUpdatedPayrollForm({
        driverId: payroll.driverId,
        title: payroll.title ?? "",
        periodStartDate: payroll.periodStartDate,
        periodEndDate: payroll.periodEndDate,
      });
      setEditPayroll(false);
      setConfirm(null);
      return;
    }

    const items = 
      type === "allowance"
        ? payroll?.allowanceItems
        : payroll?.deductionItems;

    if (items) {
      const reset = items.map((item) => ({
        id: item.id,
        quantity: item.quantity ?? 0,
        unitPrice: item.unitPrice ?? 0,
        memo: item.memo ?? "",
      }));

      if (type === "allowance") {
        setUpdatedAllowanceForm(reset);
        setEditAllowance(false);
      } else {
        setUpdatedDeductionForm(reset);
        setEditDeduction(false);
      }
    }
    setConfirm(null);
  };

  const handlePayrollFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedPayrollForm(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmUpdatePayroll = () => {
    if (loading || !payroll) return;

    const dto: UpdateDriverPayrollRequestDto = updatedPayrollForm;
    onPayrollUpdate(payroll.id, dto);
    setConfirm(null);
    setEditPayroll(false);
  };

  const handleValueAllowanceChange = (allowanceId: number, values: NumberFormatValues, name: string ) => {
    setUpdatedAllowanceForm(prev => prev.map(item => item.id === allowanceId ? { ...item, [name]: values.value }: item));
  };

  const handleAllowanceFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, allowanceId: number) => {
    const { name, value } = e.target;
    setUpdatedAllowanceForm(prev => prev.map(item => item.id === allowanceId ? { ...item, [name]: value }: item));
  };

  const handleConfirmUpdateAllowance = () => {
    if (loading || !payroll) return;

    const dto: UpdateDriverAllowanceRequestDto = {
      items: updatedAllowanceForm.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        memo: item.memo
      })),
    };
    onAllowanceUpdate(dto);
    setConfirm(null);
    setEditAllowance(false);
  };

  const handleDeleteAllowance = async (driverAllowanceId: number) => {
    if (loading || !payroll) return;

    const prevItems = localAllowanceItems;
    const prevForm = updatedAllowanceForm;
    setLocalAllowanceItems((items) => items.filter((deleted) => deleted.id === driverAllowanceId ? false : true));
    setUpdatedAllowanceForm((form) => form.filter((deleted) => deleted.id === driverAllowanceId ? false : true));

    try {
      await onAllowanceDelete(driverAllowanceId);
    } catch (e) {
      setLocalAllowanceItems(prevItems);
      setUpdatedAllowanceForm(prevForm);
      alert("수당 내역 삭제 실패");
    }
  };


  const handleValueDeductionChange = (deductionId: number, values: NumberFormatValues, name: string ) => {
    setUpdatedDeductionForm(prev => prev.map(item => item.id === deductionId ? { ...item, [name]: values.value }: item));
  };

  const handleDeductionFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, deductionId: number) => {
    const { name, value } = e.target;
    setUpdatedDeductionForm(prev => prev.map(item => item.id === deductionId ? { ...item, [name]: value }: item));
  };

  const handleConfirmUpdateDeduction = () => {
    if (loading || !payroll) return;

    const dto: UpdateDriverDeductionRequestDto = {
      items: updatedDeductionForm.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        memo: item.memo
      })),
    };
    onDeductionUpdate(dto);
    setConfirm(null);
    setEditDeduction(false);
  };

  const handleDeleteDeduction = async (driverDeductionId: number) => {
    if (loading || !payroll) return;

    const prevItems = localDeductionItems;
    const prevForm = updatedDeductionForm;
    setLocalDeductionItems((items) => items.filter((deleted) => deleted.id === driverDeductionId ? false : true));
    setUpdatedDeductionForm((form) => form.filter((deleted) => deleted.id === driverDeductionId ? false : true));

    try {
      await onDeductionDelete(driverDeductionId);
    } catch (e) {
      setLocalDeductionItems(prevItems);
      setUpdatedDeductionForm(prevForm);
      alert("공제 내역 삭제 실패");
    }
  };

  const handleDeleteConfirmModalClose = () => setOpenDeleteConfirmModal(false);
  const handleEditPayroll = () => setEditPayroll(true);
  const handleEditAllowance = () => setEditAllowance(true);
  const handleEditDeduction = () => setEditDeduction(true);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          급여대장 상세 조회
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
        ) : payroll ? (
          <Stack spacing={2}>
            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                      기사 정보
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>고유번호</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverId}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>아이디</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverUsername}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>이름</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverName}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>급여 (일별)</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverPay ? payroll.driverPay.toLocaleString() + " 원" : "-"}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>관할 구역</TableCell>
                    <TableCell sx={{ width: '20%' }}>{driverDistrictMap[payroll.driverDistrict]?? payroll.driverDistrict}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>입사일</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverCompanyJoin}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>휴대폰번호</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverPhoneNumber}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>이메일</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverEmail}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    {payroll.status === "CREATED" && !editAllowance && !editDeduction ? (
                      <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', p: '16px' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>급여대장 정보</Typography>
                          {editPayroll ? (
                            <Stack spacing={2} direction="row" alignItems="center" justifyContent="right">
                              <Button
                                variant="contained"
                                size="small"
                                color="success"
                                startIcon={<CheckCircleOutlineIcon />}
                                disabled={loading || hasPayrollInvalid}
                                onClick={() => setConfirm({ type: "update", target: "payroll" })}
                              >
                                수정 완료
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                color="error"
                                startIcon={<HighlightOffIcon />}
                                disabled={loading}
                                onClick={() => setConfirm({ type: "cancel", target: "payroll" })}
                              >
                                취소
                              </Button>
                            </Stack>
                          ) : (
                            <Stack spacing={2} direction="row" alignItems="center" justifyContent="right">
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<EditIcon />}
                                disabled={loading}
                                onClick={handleEditPayroll}
                              >
                                수정
                              </Button>
                            </Stack>
                          )}
                        </Stack>
                      </TableCell>
                    ) : (
                      <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>급여대장 정보</TableCell>
                    )}
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>급여대장명</TableCell>
                    <TableCell sx={{ width: '20%' }}>
                      {editPayroll ? (
                        <TextField
                          size="small"
                          id="title"
                          name="title"
                          type="text"
                          inputMode="text"
                          value={updatedPayrollForm.title}
                          fullWidth
                          onChange={handlePayrollFieldChange}
                        />
                      ) : (
                        payroll.title
                      )}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>상태</TableCell>
                    <TableCell sx={{ width: '20%' }}>
                      <Chip
                        label={payrollStatusMap[payroll.status] ?? "알 수 없음"}
                        color={payrollStatusColorMap[payroll.status] ?? "default"}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>시작일</TableCell>
                    <TableCell sx={{ width: '20%' }}>
                      {editPayroll ? (
                        <TextField
                          required
                          size="small"
                          id="periodStartDate"
                          name="periodStartDate"
                          type="date"
                          inputMode="text"
                          InputLabelProps={{ shrink: true }}
                          value={updatedPayrollForm.periodStartDate}
                          fullWidth
                          onChange={handlePayrollFieldChange}
                          error={isPeriodStartDateEmpty}
                          helperText={periodStartDateHelperText}
                        />
                      ) : (
                        payroll.periodStartDate
                      )}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>종료일</TableCell>
                    <TableCell sx={{ width: '20%' }}>
                      {editPayroll ? (
                        <TextField
                          required
                          size="small"
                          id="periodEndDate"
                          name="periodEndDate"
                          type="date"
                          inputMode="text"
                          InputLabelProps={{ shrink: true }}
                          value={updatedPayrollForm.periodEndDate}
                          fullWidth
                          onChange={handlePayrollFieldChange}
                          error={isPeriodEndDateEmpty}
                          helperText={periodEndDateHelperText}
                        />
                      ) : (
                        payroll.periodEndDate
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%', borderTop: 'double lightGray' }}>수당 총액</TableCell>
                    <TableCell sx={{ width:'20%', borderTop: 'double lightGray' }}>{payroll.totalAllowance.toLocaleString() + " 원"}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%', borderTop: 'double lightGray' }}>공제 총액</TableCell>
                    <TableCell sx={{ width:'20%', borderTop: 'double lightGray' }}>{payroll.totalDeduction.toLocaleString() + " 원"}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}></TableCell>
                    <TableCell></TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>총 합계</TableCell>
                    <TableCell>{payroll.finalAmount.toLocaleString() + " 원"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    {payroll.status === "CREATED" && !editPayroll && !editDeduction ? (
                      <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', p: '16px' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>수당 내역</Typography>
                          {editAllowance ? (
                            <Stack spacing={2} direction="row" alignItems="center" justifyContent="right">
                              <Button
                                variant="contained"
                                size="small"
                                color="success"
                                startIcon={<CheckCircleOutlineIcon />}
                                disabled={loading || hasAllowanceInvalid}
                                onClick={() => setConfirm({ type: "update", target: "allowance" })}
                              >
                                수정 완료
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                color="error"
                                startIcon={<HighlightOffIcon />}
                                disabled={loading}
                                onClick={() => setConfirm({ type: "cancel", target: "allowance" })}
                              >
                                취소
                              </Button>
                            </Stack>
                          ) : (
                            <Stack spacing={2} direction="row" alignItems="center" justifyContent="right">
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<AddCircleOutlineIcon />}
                                disabled={loading}
                                onClick={onAllowanceCreate}
                              >
                                등록
                              </Button>
                              {payroll.allowanceItems && payroll.allowanceItems.length !== 0 && (
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<EditIcon />}
                                  disabled={loading}
                                  onClick={handleEditAllowance}
                                >
                                  수정
                                </Button>
                              )}
                            </Stack>
                          )}
                        </Stack>
                      </TableCell>
                    ) : (
                      <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>수당 내역</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
              
              {!loading && (!payroll.allowanceItems || payroll.allowanceItems.length === 0) ? (
                <Table size="medium">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        조회 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Table size="medium" sx={{ border: '1px solid lightGray' }}>
                  {!editAllowance && (
                    <caption>수당 총액: {payroll.totalAllowance.toLocaleString()} 원</caption>
                  )}
                  <TableHead>
                      {!editAllowance ? (
                        <TableRow>
                          <TableCell align="center">순번</TableCell>
                          <TableCell align="center">코드명</TableCell>
                          <TableCell align="center">항목명</TableCell>
                          <TableCell align="center">수량(일수)</TableCell>
                          <TableCell align="center">단가(원)</TableCell>
                          <TableCell align="center">합계(원)</TableCell>
                          <TableCell align="center">메모</TableCell>  
                        </TableRow>
                      ) : (
                          <TableRow>
                          <TableCell align="center">순번</TableCell>
                          <TableCell align="center">코드명</TableCell>
                          <TableCell align="center">항목명</TableCell>
                          <TableCell align="center">수량(일수)</TableCell>
                          <TableCell align="center">단가(원)</TableCell>
                          <TableCell align="center">합계(원)</TableCell>
                          <TableCell align="center">메모</TableCell>
                          <TableCell align="center">제거</TableCell>
                        </TableRow>
                      )}
                  </TableHead>
                  <TableBody>
                    {localAllowanceItems.map((row, index) => {
                      if (!editAllowance) {
                        return (
                          <TableRow key={row.id}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{row.allowanceTypeCode}</TableCell>
                            <TableCell align="center">{row.allowanceTypeName}</TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{row.unitPrice.toLocaleString()}</TableCell>
                            <TableCell align="center">{row.amount.toLocaleString()}</TableCell>
                            <TableCell align="center">{row.memo}</TableCell>
                          </TableRow>
                        );
                      }

                      const formRow = updatedAllowanceForm.find((item) => item.id === row.id);
                      const amount = (formRow?.quantity ?? 0) * (formRow?.unitPrice ?? 0)

                      return (
                        <TableRow key={row.id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{row.allowanceTypeCode}</TableCell>
                          <TableCell align="center">{row.allowanceTypeName}</TableCell>
                          <TableCell align="center">
                            <NumericFormat
                              customInput={TextField}
                              required
                              size="small"
                              id="quantity"
                              name="quantity"
                              label="수량 (일수)"
                              thousandSeparator=","
                              allowLeadingZeros={false}
                              inputMode="numeric"
                              InputLabelProps={{ shrink: true }}
                              value={formRow?.quantity ?? 0}
                              fullWidth
                              onValueChange={(values) => handleValueAllowanceChange(row.id, values, "quantity")}
                              error={isQuantityEmpty(formRow)}
                              helperText={isQuantityEmpty(formRow) ? "수량(일수)를 입력해 주세요." : ""}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <NumericFormat
                              customInput={TextField}
                              required
                              size="small"
                              id="unitPrice"
                              name="unitPrice"
                              label="단가"
                              thousandSeparator=","
                              allowLeadingZeros={false}
                              inputMode="numeric"
                              InputLabelProps={{ shrink: true }}
                              value={formRow?.unitPrice ?? 0}
                              fullWidth
                              onValueChange={(values) => handleValueAllowanceChange(row.id, values, "unitPrice")}
                              error={isUnitPriceEmpty(formRow!)}
                              helperText={isUnitPriceEmpty(formRow!) ? "단가를 입력해 주세요." : ""}
                            />
                          </TableCell>
                          <TableCell align="center">{amount.toLocaleString()}</TableCell>
                          <TableCell align="center">
                            <TextField
                              size="small"
                              id="memo"
                              name="memo"
                              label="메모"
                              type="text"
                              inputMode="text"
                              value={formRow?.memo ?? ""}
                              fullWidth
                              onChange={(e) => handleAllowanceFieldChange(e, row.id)}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton color="error" onClick={() => handleDeleteAllowance(row.id)}>
                              <RemoveCircleIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium" sx={{ border: '1px solid lightGray' }}>
                <TableBody>
                  <TableRow>
                    {payroll.status === "CREATED" && !editPayroll && !editAllowance ? (
                      <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', p: '16px' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>공제 내역</Typography>
                          {editDeduction ? (
                            <Stack spacing={2} direction="row" alignItems="center" justifyContent="right">
                              <Button
                                variant="contained"
                                size="small"
                                color="success"
                                startIcon={<CheckCircleOutlineIcon />}
                                disabled={loading || hasDeductionInvalid}
                                onClick={() => setConfirm({ type: "update", target: "deduction" })}
                              >
                                수정 완료
                              </Button>
                              <Button
                                variant="contained"
                                size="small"
                                color="error"
                                startIcon={<HighlightOffIcon />}
                                disabled={loading}
                                onClick={() => setConfirm({ type: "cancel", target: "deduction" })}
                              >
                                취소
                              </Button>
                            </Stack>
                          ) : (
                            <Stack spacing={2} direction="row" alignItems="center" justifyContent="right">
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<AddCircleOutlineIcon />}
                                disabled={loading}
                                onClick={onDeductionCreate}
                              >
                                등록
                              </Button>
                              {payroll.deductionItems && payroll.deductionItems.length !== 0 && (
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<EditIcon />}
                                  disabled={loading}
                                  onClick={handleEditDeduction}
                                >
                                  수정
                                </Button>
                              )}
                            </Stack>
                          )}
                        </Stack>
                      </TableCell>
                    ) : (
                      <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>공제 내역</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>

              {!loading && (!payroll.deductionItems || payroll.deductionItems.length === 0) ? (
                <Table size="medium">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        조회 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Table size="medium" sx={{ border: '1px solid lightGray' }}>
                  {!editDeduction && (
                    <caption>공제 총액: {payroll.totalDeduction.toLocaleString()} 원</caption>
                  )}
                  <TableHead>
                    {!editDeduction ? (
                      <TableRow>
                        <TableCell align="center">순번</TableCell>
                        <TableCell align="center">코드명</TableCell>
                        <TableCell align="center">항목명</TableCell>
                        <TableCell align="center">수량(일수)</TableCell>
                        <TableCell align="center">단가(원)</TableCell>
                        <TableCell align="center">합계(원)</TableCell>
                        <TableCell align="center">메모</TableCell>  
                      </TableRow>
                    ) : (
                        <TableRow>
                        <TableCell align="center">순번</TableCell>
                        <TableCell align="center">코드명</TableCell>
                        <TableCell align="center">항목명</TableCell>
                        <TableCell align="center">수량(일수)</TableCell>
                        <TableCell align="center">단가(원)</TableCell>
                        <TableCell align="center">합계(원)</TableCell>
                        <TableCell align="center">메모</TableCell>
                        <TableCell align="center">제거</TableCell>
                      </TableRow>
                    )}
                  </TableHead>
                  <TableBody>
                    {localDeductionItems.map((row, index) => {
                      if (!editDeduction) {
                        return (
                          <TableRow key={row.id}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{row.deductionTypeCode}</TableCell>
                            <TableCell align="center">{row.deductionTypeName}</TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{row.unitPrice.toLocaleString()}</TableCell>
                            <TableCell align="center">{row.amount.toLocaleString()}</TableCell>
                            <TableCell align="center">{row.memo}</TableCell>
                          </TableRow>
                        );
                      }

                      const formRow = updatedDeductionForm.find((item) => item.id === row.id);
                      const amount = (formRow?.quantity ?? 0) * (formRow?.unitPrice ?? 0)

                      return (
                        <TableRow key={row.id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{row.deductionTypeCode}</TableCell>
                          <TableCell align="center">{row.deductionTypeName}</TableCell>
                          <TableCell align="center">
                            <NumericFormat
                              customInput={TextField}
                              required
                              size="small"
                              id="quantity"
                              name="quantity"
                              label="수량 (일수)"
                              thousandSeparator=","
                              allowLeadingZeros={false}
                              inputMode="numeric"
                              InputLabelProps={{ shrink: true }}
                              value={formRow?.quantity ?? 0}
                              fullWidth
                              onValueChange={(values) => handleValueDeductionChange(row.id, values, "quantity")}
                              error={isQuantityEmpty(formRow)}
                              helperText={isQuantityEmpty(formRow) ? "수량(일수)를 입력해 주세요." : ""}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <NumericFormat
                              customInput={TextField}
                              required
                              size="small"
                              id="unitPrice"
                              name="unitPrice"
                              label="단가"
                              thousandSeparator=","
                              allowLeadingZeros={false}
                              inputMode="numeric"
                              InputLabelProps={{ shrink: true }}
                              value={formRow?.unitPrice ?? 0}
                              fullWidth
                              onValueChange={(values) => handleValueDeductionChange(row.id, values, "unitPrice")}
                              error={isUnitPriceEmpty(formRow!)}
                              helperText={isUnitPriceEmpty(formRow!) ? "단가를 입력해 주세요." : ""}
                            />
                          </TableCell>
                          <TableCell align="center">{amount.toLocaleString()}</TableCell>
                          <TableCell align="center">
                            <TextField
                              size="small"
                              id="memo"
                              name="memo"
                              label="메모"
                              type="text"
                              inputMode="text"
                              value={formRow?.memo ?? ""}
                              fullWidth
                              onChange={(e) => handleDeductionFieldChange(e, row.id)}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton color="error" onClick={() => handleDeleteDeduction(row.id)}>
                              <RemoveCircleIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium" sx={{ border: '1px solid lightGray' }}>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                      입력 정보
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>등록일</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.createdAt}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>수정일</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.updatedAt}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        ) : (
          <Typography>상세 정보를 불러올 수 없습니다.</Typography>
        )}
      </DialogContent>
      
      {!loading && payroll?.status === "CREATED" && !editPayroll && !editAllowance && !editDeduction && (
          <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error" disabled={loading || !payroll}>
            삭제
          </Button>
        </DialogActions>
      )}
      
      <ConfirmModal
        open={openDeleteConfirmModal}
        type="삭제"
        onConfirm={handleConfirmDelete}
        onClose={handleDeleteConfirmModalClose}
      />

      <ConfirmModal
        open={!!confirm}
        type={confirm?.type === "update" ? "수정" : "취소"}
        onConfirm={() => {
          if (!confirm) return;
          if (confirm.type === "update") {
            confirm.target === "allowance"
              ? handleConfirmUpdateAllowance() 
              : confirm.target === "deduction"
              ? handleConfirmUpdateDeduction()
              : handleConfirmUpdatePayroll();
          } else {
            handleConfirmCancelUpdate(confirm.target);
          }
          setConfirm(null);
        }}
        onClose={() => setConfirm(null)}
      />
    </Dialog>
  )
}

export default DriverPayrollDetailModal;