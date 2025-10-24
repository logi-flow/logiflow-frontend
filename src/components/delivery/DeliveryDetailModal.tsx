import React, { useEffect, useState } from 'react';
import type { GetDeliveryResponseDto } from '../../dtos/delivery/response/get-delivery.response.dto';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, TextField, Stack, Paper, TableContainer, Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DeliveryStatus } from '../../enums/delivery-status.enum';

type DeliveryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onUpdate: (updatedDelivery: GetDeliveryResponseDto, changeReason: string) => void;
  delivery: GetDeliveryResponseDto | null;
}

const deliveryStatusOptions = Object.values(DeliveryStatus);

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
        alert("변경 사유를 반드시 입력해야 합니다.");
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
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          배송 세부 정보
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TableContainer component={Paper} elevation={0}>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>기본 정보</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>배송 ID</TableCell>
                  <TableCell sx={{ width: '30%' }}>{editableDelivery.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>고객사 ID</TableCell>
                  <TableCell sx={{ width: '30%' }}>{editableDelivery.customerId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>계약 번호</TableCell>
                  <TableCell>{editableDelivery.contractId}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>수거지</TableCell>
                  <TableCell>{editableDelivery.pickupName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>


          <TableContainer component={Paper} elevation={0}>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>배송 상태 및 요청 정보</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>배송 상태</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select value={editableDelivery.status} onChange={handleStatusChange}>
                          {deliveryStatusOptions.map((status) => (
                            <MenuItem key={status} value={status}>{status}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      editableDelivery.status
                    )}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>도착 희망일</TableCell>
                  <TableCell>{editableDelivery.requestDate}</TableCell>
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
                        placeholder='예: 고객 요청으로 배송 취소'
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} elevation={0}>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>수령인 정보</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>수령인 이름</TableCell>
                  <TableCell>{editableDelivery.recipientName}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>수령인 연락처</TableCell>
                  <TableCell>{editableDelivery.recipientPhone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>우편번호</TableCell>
                  <TableCell colSpan={3}>{editableDelivery.recipientZipcode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>주소</TableCell>
                  <TableCell colSpan={3}>{`${editableDelivery.recipientAddress} ${editableDelivery.recipientAddressDetail}`}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} elevation={0}>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>상품 정보 및 생성일</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>품목</TableCell>
                  <TableCell>{editableDelivery.item}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>무게(kg)</TableCell>
                  <TableCell>{editableDelivery.weight}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>배송 메시지</TableCell>
                  <TableCell colSpan={3}>{editableDelivery.message || "-"}</TableCell>
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
      <DialogActions sx={{ p: 2 }}>
        <div style={{ flex: '1 0 0' }} />
        {isEditing && (
          <Button onClick={handleCancelClick}>취소</Button>
        )}
        <Button onClick={handleUpdateClick} variant="contained">
          {isEditing ? '상태 저장' : '상태 수정'}
        </Button>
        <Button onClick={handleDeleteClick} color="error">삭제</Button>
      </DialogActions>
    </Dialog >
  )
}

export default DeliveryDetailModal;