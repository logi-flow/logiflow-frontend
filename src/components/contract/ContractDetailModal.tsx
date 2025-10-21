import { useEffect, useState } from "react";
import type { GetContractResponseDto } from "../../dtos/contract/response/get-contract.response.dto";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { deleteContract } from "../../apis/contract/contract.apis";

type ContractModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (updatedContract: GetContractResponseDto) => void;
  contract: GetContractResponseDto | null;
}

function ContractDetailModal(props: ContractModalProps) {

  const { isOpen, onClose, onDelete, onUpdate, contract } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableContract, setEditableContract] = useState<GetContractResponseDto | null>(null);

  useEffect(() => {
    if (isOpen && contract) {
      setEditableContract({ ...contract });
      setIsEditing(false);
    }
  }, [isOpen, contract]);

  if (!isOpen || !editableContract) {
    return null;
  }

  const handleChange = (field: keyof GetContractResponseDto, value: string) => {
    setEditableContract((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  const handleUpdateClick = () => {
    if (isEditing) {
      if (editableContract) {
        onUpdate(editableContract);
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    if (contract) {
      setEditableContract({ ...contract });
    }
    setIsEditing(false);
  }

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>계약 세부 정보</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="계약 ID"
              name="id"
              value={editableContract.id}
              onChange={(e) => handleChange('id', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="고객 ID"
              name="customerId"
              value={editableContract.customerId}
              onChange={(e) => handleChange('customerId', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="계약 상태"
              name="status"
              value={editableContract.status}
              onChange={(e) => handleChange('status', e.target.value)}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="시작일"
              name="startDate"
              value={editableContract.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="종료일"
              name="endDate"
              value={editableContract.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="기본 요금"
              name="baseFee"
              value={editableContract.baseFee}
              onChange={(e) => handleChange('baseFee', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="제한 무게"
              name="weightLimitKg"
              value={editableContract.weightLimitKg}
              onChange={(e) => handleChange('weightLimitKg', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="제한 건수"
              name="parcelLimit"
              value={editableContract.parcelLimit}
              onChange={(e) => handleChange('parcelLimit', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="무게당 추가 요금"
              name="overWeightFeePerKg"
              value={editableContract.overWeightFeePerKg}
              onChange={(e) => handleChange('overWeightFeePerKg', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="건수당 추가 요금"
              name="overParcelFee"
              value={editableContract.overParcelFee}
              onChange={(e) => handleChange('overParcelFee', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="특약 사항"
              name="specialTerms"
              value={editableContract.specialTerms}
              onChange={(e) => handleChange('specialTerms', e.target.value)}
              disabled={!isEditing}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="생성일"
              name="createdAt"
              value={editableContract.createdAt}
              onChange={(e) => handleChange('createdAt', e.target.value)}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="수정일"
              name="updatedAt"
              value={editableContract.updatedAt}
              onChange={(e) => handleChange('updatedAt', e.target.value)}
              disabled
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClick} color="error">삭제</Button>
        {isEditing && (
          <Button onClick={handleCancelClick}>취소</Button>
        )}
        <Button onClick={handleUpdateClick} variant="contained">
          {isEditing ? '저장' : '수정'}
        </Button>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );


}

export default ContractDetailModal;