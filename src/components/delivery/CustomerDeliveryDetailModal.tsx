import React, { useEffect, useState } from 'react'
import type { GetDeliveryResponseDto } from '../../dtos/delivery/response/get-delivery.response.dto';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';


type CustomerDeliveryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedDelivery: GetDeliveryResponseDto) => void;
  onIsHidden: (updatedDelivery: GetDeliveryResponseDto) => void;
  delivery: GetDeliveryResponseDto | null;
}

function CustomerDeliveryDetailModal(props: CustomerDeliveryModalProps) {

  const { isOpen, onClose, onIsHidden, onUpdate, delivery } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableDelivery, setEditableDelivery] = useState<GetDeliveryResponseDto | null>(null);

  useEffect(() => {
    if (isOpen && delivery) {
      setEditableDelivery({ ...delivery });
      setIsEditing(false);
    }
  }, [isOpen, delivery]);

  if (!isOpen || !editableDelivery) {
    return null;
  }

  const handleChange = (field: keyof GetDeliveryResponseDto, value: string) => {
    setEditableDelivery((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  const handleUpdateClick = () => {
    if (isEditing) {
      if (editableDelivery) {
        onUpdate(editableDelivery);
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    if (delivery) {
      setEditableDelivery({ ...delivery });
    }
    setIsEditing(false);
  }

  const handleIsHiddenClick = () => {
    if (editableDelivery) {
      const deliveryToHide = {
        ...editableDelivery,
        isHidden: true,
      };
      onIsHidden(deliveryToHide);
    }
  };




  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>배송 세부 정보</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField label="배송 ID" value={editableDelivery.id} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="계약 번호" value={editableDelivery.contractId} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="배송 상태" value={editableDelivery.status} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수거지" value={editableDelivery.collectionSiteId} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="도착 희망일" type='datetime-local' value={editableDelivery.requestDate} onChange={(e) => handleChange('requestDate', e.target.value)} disabled={!isEditing} fullWidth InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="품목" value={editableDelivery.item} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="무게 (kg)" value={editableDelivery.weight} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수령인 이름" value={editableDelivery.recipientName} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="수령인 연락처" value={editableDelivery.recipientPhone} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="우편번호" value={editableDelivery.recipientZipcode} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField label="주소" value={editableDelivery.recipientAddress} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="상세주소" value={editableDelivery.recipientAddressDetail} fullWidth disabled={!isEditing} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="배송 메시지" value={editableDelivery.message} multiline rows={2} fullWidth disabled={!isEditing} />
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
        <Button onClick={handleIsHiddenClick} color='error'>숨김처리</Button>
        {isEditing && (
          <Button onClick={handleCancelClick}>취소</Button>
        )}
        <Button onClick={handleUpdateClick} variant='contained'>
          {isEditing ? '저장' : '수정'}
        </Button>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog >
  )
}

export default CustomerDeliveryDetailModal