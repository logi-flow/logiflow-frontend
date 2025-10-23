import React, { useEffect, useRef, useState } from 'react';
import type { GetDeliveryResponseDto } from '../../dtos/delivery/response/get-delivery.response.dto';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Select, TextField, Stack, Paper, TableContainer, Table, TableBody, TableRow, TableCell, IconButton, type SelectChangeEvent, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

  const handleSelectChange = (e: SelectChangeEvent<any>) => {
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
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            배송 세부 정보
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableBody>
                  <TableRow><TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>기본 정보</TableCell></TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '20%' }}>배송 ID</TableCell>
                    <TableCell sx={{ width: '30%' }}>{editableDelivery.id}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '20%' }}>계약 번호</TableCell>
                    <TableCell sx={{ width: '30%' }}>{editableDelivery.contractId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>배송 상태</TableCell>
                    <TableCell colSpan={3}>{editableDelivery.status}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableBody>
                  <TableRow><TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>배송 요청 정보</TableCell></TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>수거지</TableCell>
                    <TableCell colSpan={3}>
                      {isEditing ? (
                        <FormControl size="small" fullWidth>
                          <Select name='collectionSiteId' value={editableDelivery.collectionSiteId} onChange={handleSelectChange}>
                            {collectionSites.map((site) => (
                              <MenuItem key={site.id} value={site.id}>{site.name}({site.address})</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        collectionSites.find(site => site.id === editableDelivery.collectionSiteId)?.name || '알 수 없음'
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>도착 희망일</TableCell>
                    <TableCell>
                      {isEditing ? <TextField name='requestDate' type='datetime-local' value={editableDelivery.requestDate} onChange={handleChange} variant="standard" fullWidth InputLabelProps={{ shrink: true }} /> : editableDelivery.requestDate}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>품목</TableCell>
                    <TableCell>
                      {isEditing ? <TextField name='item' value={editableDelivery.item} onChange={handleChange} variant="standard" fullWidth /> : editableDelivery.item}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>무게 (kg)</TableCell>
                    <TableCell colSpan={3}>
                      {isEditing ? <TextField name='weight' type='number' value={editableDelivery.weight} onChange={handleChange} variant="standard" fullWidth /> : editableDelivery.weight}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableBody>
                  <TableRow><TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>수령인 정보</TableCell></TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>수령인 이름</TableCell>
                    <TableCell>
                      {isEditing ? <TextField name='recipientName' value={editableDelivery.recipientName} onChange={handleChange} variant="standard" fullWidth /> : editableDelivery.recipientName}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>수령인 연락처</TableCell>
                    <TableCell>
                      {isEditing ? <TextField name='recipientPhone' value={editableDelivery.recipientPhone} onChange={handleChange} variant="standard" fullWidth /> : editableDelivery.recipientPhone}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>우편번호</TableCell>
                    <TableCell>
                      {isEditing ? <TextField name='recipientZipcode' value={editableDelivery.recipientZipcode} variant="standard" InputProps={{ readOnly: true }} /> : editableDelivery.recipientZipcode}
                    </TableCell>
                    <TableCell colSpan={2}>
                      {isEditing && <Button variant='contained' onClick={handleAddressSearch} size="small">우편번호 찾기</Button>}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>주소</TableCell>
                    <TableCell colSpan={3}>
                      {isEditing ? <TextField name='recipientAddress' value={editableDelivery.recipientAddress} variant="standard" fullWidth InputProps={{ readOnly: true }} /> : editableDelivery.recipientAddress}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>상세주소</TableCell>
                    <TableCell colSpan={3}>
                      {isEditing ? <TextField name='recipientAddressDetail' value={editableDelivery.recipientAddressDetail} onChange={handleChange} variant="standard" fullWidth inputRef={addressDetailRef} /> : editableDelivery.recipientAddressDetail}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableBody>
                  <TableRow><TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>기타 정보</TableCell></TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>배송 메시지</TableCell>
                    <TableCell colSpan={3}>
                      {isEditing ? <TextField name='message' value={editableDelivery.message} onChange={handleChange} multiline rows={2} variant="standard" fullWidth /> : (editableDelivery.message || '-')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>생성일</TableCell>
                    <TableCell>{editableDelivery.createdAt}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>수정일</TableCell>
                    <TableCell>{editableDelivery.updatedAt}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Box>
            {editableDelivery.status === DeliveryStatus.REQUESTED && (
              <Button onClick={handleCancelRequestClick} color='warning' variant="outlined">
                배송 취소 요청
              </Button>
            )}
            <Button onClick={handleIsHiddenClick} color='error' sx={{ ml: 1 }} variant="outlined">숨김처리</Button>
          </Box>
          <Box>
            {isEditing && (
              <Button onClick={handleCancelClick}>취소</Button>
            )}
            <Button onClick={handleUpdateClick} variant='contained'>
              {isEditing ? '저장' : '수정'}
            </Button>
            <Button onClick={onClose} sx={{ ml: 1 }}>닫기</Button>
          </Box>
        </DialogActions>
      </Dialog>

      <Dialog open={isCancelDialogOpen} onClose={() => setIsCancelDialogOpen(false)}>
        <DialogTitle>배송 취소</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            배송 취소 사유를 입력해주세요. 관리자 검토 후 취소 처리됩니다.
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

export default CustomerDeliveryDetailModal;