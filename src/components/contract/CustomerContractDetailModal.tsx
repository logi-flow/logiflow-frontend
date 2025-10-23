import React, { useEffect, useState } from 'react';
import type { GetContractResponseDto } from '../../dtos/contract/response/get-contract.response.dto';
import { ContractStatus } from '../../enums/contract-status.enum';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, TextField, Stack, Paper, TableContainer, Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { SelectChangeEvent } from '@mui/material';

type CustomerContractModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedContract: GetContractResponseDto, changeReason: string) => void;
  contract: GetContractResponseDto | null;
}

const contractStatusOptions = Object.values(ContractStatus);

function CustomerContractDetailModal(props: CustomerContractModalProps) {
  const { isOpen, onClose, onUpdate, contract } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableContract, setEditableContract] = useState<GetContractResponseDto | null>(null);
  const [changeReason, setChangeReason] = useState("");

  useEffect(() => {
    if (isOpen && contract) {
      setEditableContract({ ...contract });
      setIsEditing(false);
      setChangeReason("");
    }
  }, [isOpen, contract]);

  if (!isOpen || !editableContract) {
    return null;
  }

  const handleStatusChange = (event: SelectChangeEvent<any>) => {
    const { value } = event.target;
    setEditableContract((prev) => (prev ? { ...prev, status: value } : prev));
  }

  const handleUpdateClick = () => {
    if (isEditing) {
      if (!changeReason) {
        alert("변경 사유를 입력해야 합니다.");
        return;
      }
      if (editableContract) {
        onUpdate(editableContract, changeReason);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancelClick = () => {
    if (contract) {
      setEditableContract({ ...contract });
    }
    setIsEditing(false);
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          계약 세부 정보
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableBody>
                <TableRow><TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>계약 기본 정보</TableCell></TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>계약 ID</TableCell>
                  <TableCell sx={{ width: '30%' }}>{editableContract.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>계약 상태</TableCell>
                  <TableCell sx={{ width: '30%' }}>
                    {isEditing ? (
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select value={editableContract.status} onChange={handleStatusChange}>
                          {contractStatusOptions.map((status) => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      editableContract.status
                    )}
                  </TableCell>
                </TableRow>
                {isEditing && (
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>변경 사유</TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                        value={changeReason}
                        onChange={(e) => setChangeReason(e.target.value)}
                        fullWidth required autoFocus
                        variant="standard"
                        placeholder='예: 계약 해지 요청'
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableBody>
                <TableRow><TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>계약 기간 및 요금 정보</TableCell></TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>시작일</TableCell>
                  <TableCell>{editableContract.startDate}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>종료일</TableCell>
                  <TableCell>{editableContract.endDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>기본 요금</TableCell>
                  <TableCell>{editableContract.baseFee.toLocaleString()}원</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>제한 무게(kg)</TableCell>
                  <TableCell>{editableContract.weightLimitKg.toLocaleString()}kg</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>제한 건수</TableCell>
                  <TableCell>{editableContract.parcelLimit.toLocaleString()}건</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>초과 무게 요금(kg당)</TableCell>
                  <TableCell>{editableContract.overWeightFeePerKg.toLocaleString()}원</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>초과 건수 요금</TableCell>
                  <TableCell colSpan={3}>{editableContract.overParcelFee.toLocaleString()}원</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableBody>
                <TableRow><TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>기타 정보</TableCell></TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>특약 사항</TableCell>
                  <TableCell colSpan={3}>{editableContract.specialTerms || '-'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>생성일</TableCell>
                  <TableCell>{editableContract.createdAt}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>수정일</TableCell>
                  <TableCell>{editableContract.updatedAt}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <div style={{ flex: '1 0 0' }} />
        {isEditing && (
          <Button onClick={handleCancelClick}>취소</Button>
        )}
        <Button onClick={handleUpdateClick} variant='contained'>
          {isEditing ? '상태 저장' : '상태 수정'}
        </Button>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CustomerContractDetailModal;