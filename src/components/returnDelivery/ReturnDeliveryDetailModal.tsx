import { useEffect, useState } from 'react'
import type { GetDeliveryResponseDto } from '../../dtos/delivery/response/get-delivery.response.dto';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DeliveryStatus } from '../../enums/delivery-status.enum';
import type { GetReturnDeliveryDetailResponseDto } from '../../dtos/returnDelivery/response/get-return-delivery-detail.response.dto.ts';


type ReturnDeliveryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (updatedReturnDelivery: GetReturnDeliveryDetailResponseDto, changeReason: string) => void;
  returnDelivery: GetReturnDeliveryDetailResponseDto | null;
}

const returnDeliveryStatusOptions = Object.values(DeliveryStatus)

function ReturnDeliveryDetailModal(props: ReturnDeliveryModalProps) {

  const { isOpen, onClose, onDelete, onUpdate, returnDelivery } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableReturnDelivery, setEditableReturnDelivery] = useState<GetReturnDeliveryDetailResponseDto | null>(null);
  const [changeReason, setChangeReason] = useState("");

  useEffect(() => {
    if (isOpen && returnDelivery) {
      setEditableReturnDelivery({ ...returnDelivery });
      setIsEditing(false);
      setChangeReason("");
    }
  }, [isOpen, returnDelivery]);

  if (!isOpen || !editableReturnDelivery) {
    return null;
  }

  const handleStatusChange = (event: any) => {
    const { value } = event.target;
    setEditableReturnDelivery((prev) => (prev ? { ...prev, status: value } : prev));
  }

  const handleUpdateClick = () => {
    if (isEditing) {
      if (!changeReason) {
        alert("변경 사유를 반드시 입력해야 함.");
        return;
      }
      if (editableReturnDelivery) {
        onUpdate(editableReturnDelivery, changeReason);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancelClick = () => {
    if (returnDelivery) {
      setEditableReturnDelivery({ ...returnDelivery });
    }
    setIsEditing(false);
  }

  const handleDeleteClick = () => {
    onDelete();
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>반품 세부 정보</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="배송 ID" value={editableReturnDelivery.id} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="고객사 명" value={editableReturnDelivery.customerName} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="반품인 명" value={editableReturnDelivery.pickupName} fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>배송 상태</InputLabel>
              <Select
                label="배송 상태"
                value={editableReturnDelivery.status}
                onChange={handleStatusChange}
                disabled={!isEditing}
              >
                {returnDeliveryStatusOptions.map((status) => (
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
          <Grid item xs={12}>
            <TextField label="도착 희망일" value={editableReturnDelivery.requestDate} disabled fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="품목" value={editableReturnDelivery.item} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="무게 (kg)" value={editableReturnDelivery.weight} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수령인 이름" value={editableReturnDelivery.recipientName} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수령인 연락처" value={editableReturnDelivery.recipientPhone} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="우편번호" value={editableReturnDelivery.recipientZipcode} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField label="주소" value={editableReturnDelivery.recipientAddress} fullWidth disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="상세주소" value={editableReturnDelivery.recipientAddressDetail} fullWidth disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="반품 사유" value={editableReturnDelivery.reason} multiline rows={2} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="생성일" value={editableReturnDelivery.createdAt} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수정일" value={editableReturnDelivery.updatedAt} fullWidth disabled />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClick} color='error'>삭제</Button>
        {isEditing && (
          <Button onClick={handleCancelClick}>취소</Button>
        )}
        <Button onClick={handleUpdateClick} variant='contained'>
          {isEditing ? '상태 저장' : '상태 수정'}
        </Button>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog >
  )
}

export default ReturnDeliveryDetailModal