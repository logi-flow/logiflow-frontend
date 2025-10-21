import React, { useEffect, useState } from 'react'
import type { GetContractResponseDto } from '../../dtos/contract/response/get-contract.response.dto';
import { ContractStatus } from '../../enums/contract-status.enum';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';

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

  const handleStatusChange = (event: any) => {
    const { value } = event.target;
    setEditableContract((prev) => (prev ? { ...prev, status: value } : prev));
  }

  const handleUpdateClick = () => {
    if (isEditing) {
      if (!changeReason) {
        alert("변경 사유 입력해야함");
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
      <DialogTitle>계약 세부 정보</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="계약 ID" name='id' value={editableContract.id} fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>계약 상태</InputLabel>
              <Select
                label='계약 상태'
                value={editableContract.status}
                onChange={handleStatusChange}
                disabled={!isEditing}
              >
                {contractStatusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
              {isEditing && (
                <Grid item xs={12}>
                  <TextField label="변경 사유" value={changeReason} onChange={(e) => setChangeReason(e.target.value)} fullWidth required autoFocus sx={{ mt: 1 }} placeholder='예: 고객 요청으로 배송 취소' />
                </Grid>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="시작일"
              name="startDate"
              value={editableContract.startDate}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="종료일"
              name="endDate"
              value={editableContract.endDate}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="기본 요금"
              name="baseFee"
              value={editableContract.baseFee}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="제한 무게"
              name="weightLimitKg"
              value={editableContract.weightLimitKg}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="제한 건수"
              name="parcelLimit"
              value={editableContract.parcelLimit}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="무게당 추가 요금"
              name="overWeightFeePerKg"
              value={editableContract.overWeightFeePerKg}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="건수당 추가 요금"
              name="overParcelFee"
              value={editableContract.overParcelFee}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="특약 사항"
              name="specialTerms"
              value={editableContract.specialTerms}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="생성일"
              name="createdAt"
              value={editableContract.createdAt}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="수정일"
              name="updatedAt"
              value={editableContract.updatedAt}
              disabled
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
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

export default CustomerContractDetailModal