import React, { useEffect, useRef, useState } from 'react'
import type { GetDeliveryResponseDto } from '../../dtos/delivery/response/get-delivery.response.dto';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, type SelectChangeEvent } from '@mui/material';
import type { GetAllCollectionSiteResponseDto } from '../../dtos/collectionSite/response/get-all-collection-site.response.dto';
import { DeliveryStatus } from '../../enums/delivery-status.enum';

declare global {
  interface Window {
    daum: any;
  }
}

type CustomerDeliveryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedDelivery: GetDeliveryResponseDto) => void;
  onIsHidden: (updatedDelivery: GetDeliveryResponseDto) => void;
  delivery: GetDeliveryResponseDto | null;
  collectionSites: GetAllCollectionSiteResponseDto[];
  onCancel: (deliveryId: number, reason: string) => void;
}

function CustomerDeliveryDetailModal(props: CustomerDeliveryModalProps) {

  const { isOpen, onClose, onIsHidden, onUpdate, delivery, collectionSites, onCancel } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableDelivery, setEditableDelivery] = useState<GetDeliveryResponseDto | null>(null);

  const addressDetailRef = useRef<HTMLInputElement>(null);

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    if (isOpen && delivery) {
      setEditableDelivery({ ...delivery });
      setIsEditing(false);
    }
  }, [isOpen, delivery]);

  if (!isOpen || !editableDelivery) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setEditableDelivery((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: type === 'number' ? parseFloat(value) || 0 : value,
      };
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    setEditableDelivery((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setEditableDelivery(prev => {
          if (!prev) return null;
          return {
            ...prev,
            recipientZipcode: data.zonecode,
            recipientAddress: data.address,
          };
        });
        addressDetailRef.current?.focus();
      }
    }).open();
  };


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

  const handleCancelRequestClick = () => {
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (editableDelivery) {
      onCancel(editableDelivery.id, cancelReason);
    }
    setIsCancelDialogOpen(false);
    setCancelReason('');
  }


  return (
    <>

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
              <FormControl fullWidth disabled={!isEditing}>
                <InputLabel>수거지 선택</InputLabel>
                <Select
                  name='collectionSiteId'
                  value={editableDelivery.collectionSiteId}
                  label="수거지"
                  onChange={handleSelectChange}
                >
                  {collectionSites.map((site) => (
                    <MenuItem key={site.id} value={site.id}>
                      {site.name}({site.address})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="도착 희망일" name='requestDate' type='datetime-local' value={editableDelivery.requestDate} onChange={handleChange} disabled={!isEditing} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="품목" name='item' value={editableDelivery.item} onChange={handleChange} fullWidth disabled={!isEditing} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="무게 (kg)" name='weight' value={editableDelivery.weight} onChange={handleChange} fullWidth disabled={!isEditing} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="수령인 이름" name='recipientName' value={editableDelivery.recipientName} onChange={handleChange} fullWidth disabled={!isEditing} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="수령인 연락처" name='recipientPhone' value={editableDelivery.recipientPhone} onChange={handleChange} fullWidth disabled={!isEditing} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField label="우편번호" name='recipientZipcode' value={editableDelivery.recipientZipcode} onChange={handleChange} fullWidth InputProps={{ readOnly: true }} disabled />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant='contained' onClick={handleAddressSearch} fullWidth sx={{ height: '100%' }} disabled={!isEditing}>
                우편번호 찾기
              </Button>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField label="주소" name='recipientAddress' value={editableDelivery.recipientAddress} onChange={handleChange} fullWidth InputProps={{ readOnly: true }} disabled />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="상세주소"
                name='recipientAddressDetail'
                value={editableDelivery.recipientAddressDetail}
                onChange={handleChange}
                fullWidth
                disabled={!isEditing}
                inputRef={addressDetailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="배송 메시지" name='message' value={editableDelivery.message} onChange={handleChange} multiline rows={2} fullWidth disabled={!isEditing} />
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
          {editableDelivery.status === DeliveryStatus.REQUESTED && (
            <Button onClick={handleCancelRequestClick} color='warning'>
              배송 취소 요청
            </Button>
          )}
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

      <Dialog open={isCancelDialogOpen} onClose={() => setIsCancelDialogOpen(false)}>
        <DialogTitle>배송 취소</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            배송 취소 사유를 입력
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='cancelReason'
            label='취소 사유'
            type='text'
            fullWidth
            multiline
            rows={3}
            variant='outlined'
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCancelDialogOpen(false)}>닫기</Button>
          <Button onClick={handleConfirmCancel} variant='contained' color='error'>
            취소 요청
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CustomerDeliveryDetailModal