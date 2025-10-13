import React, { useEffect, useState } from 'react'
import type { GetDeliveryResponseDto } from '../../dtos/delivery/response/get-delivery.response.dto';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DeliveryStatus } from '../../enums/delivery-status.enum';


type DeliveryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (updatedDelivery: GetDeliveryResponseDto, changeReason: string) => void;
  delivery: GetDeliveryResponseDto | null;
}

const deliveryStatusOptions = Object.values(DeliveryStatus)

function DeliveryDetailModal(props: DeliveryModalProps) {

  const { isOpen, onClose, onDelete, onUpdate, delivery } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableDelivery, setEditableDelivery] = useState<GetDeliveryResponseDto | null>(null);
  const [changeReason, setChangeReason] = useState("");

  useEffect(() => {
    if (isOpen && delivery) {
      setEditableDelivery({ ...delivery });
      setIsEditing(false);
      setChangeReason("");
    }
  }, [isOpen, delivery]);

  if (!isOpen || !editableDelivery) {
    return null;
  }

  const handleStatusChange = (event: any) => {
    const { value } = event.target;
    setEditableDelivery((prev) => (prev ? { ...prev, status: value } : prev));
  }

  const handleUpdateClick = () => {
    if (isEditing) {
      if (!changeReason) {
        alert("변경 사유를 반드시 입력해야 함.");
        return;
      }
      if (editableDelivery) {
        onUpdate(editableDelivery, changeReason);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancelClick = () => {
    if (delivery) {
      setEditableDelivery({ ...delivery });
    }
    setIsEditing(false);
  }

  const handleDeleteClick = () => {
    onDelete();
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>배송 세부 정보</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="배송 ID" value={editableDelivery.id} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="고객사 번호" value={editableDelivery.customerId} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수거지" value={editableDelivery.pickupName} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="계약 번호" value={editableDelivery.contractId} fullWidth disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>배송 상태</InputLabel>
              <Select
                label="배송 상태"
                value={editableDelivery.status}
                onChange={handleStatusChange}
                disabled={!isEditing}
              >
                {deliveryStatusOptions.map((status) => (
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
            <TextField label="도착 희망일" type='datetime-local' value={editableDelivery.requestDate} disabled fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="품목" value={editableDelivery.item} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="무게 (kg)" value={editableDelivery.weight} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수령인 이름" value={editableDelivery.recipientName} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수령인 연락처" value={editableDelivery.recipientPhone} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="우편번호" value={editableDelivery.recipientZipcode} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField label="주소" value={editableDelivery.recipientAddress} fullWidth disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="상세주소" value={editableDelivery.recipientAddressDetail} fullWidth disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField label="배송 메시지" value={editableDelivery.message} multiline rows={2} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="생성일" value={editableDelivery.createdAt} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수정일" value={editableDelivery.updatedAt} fullWidth disabled />
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

export default DeliveryDetailModal