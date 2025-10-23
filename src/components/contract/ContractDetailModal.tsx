import { useEffect, useState } from "react";
import type { GetContractResponseDto } from "../../dtos/contract/response/get-contract.response.dto";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

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
    const numericFields = ['baseFee', 'weightLimitKg', 'parcelLimit', 'overWeightFeePerKg', 'overParcelFee'];
    const isNumeric = numericFields.includes(field);
    const processedValue = isNumeric ? (value === '' ? '' : Number(value)) : value;

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
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          계약 세부 정보
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TableContainer component={Paper} elevation={0}>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>계약 기본 정보</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>계약 번호</TableCell>
                  <TableCell sx={{ width: '30%' }}>{editableContract.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>고객사 번호</TableCell>
                  <TableCell sx={{ width: '30%' }}>{editableContract.customerId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>고객사 이름</TableCell>
                  <TableCell>{editableContract.customerName}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>계약 상태</TableCell>
                  <TableCell>{editableContract.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} elevation={0}>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'grey.200', fontWeight: 700 }}>계약 기간 및 요금 정보</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>시작일</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField type="date" variant="standard" value={editableContract.startDate} onChange={(e) => handleChange('startDate', e.target.value)} />
                    ) : (
                      editableContract.startDate
                    )}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>종료일</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField type="date" variant="standard" value={editableContract.endDate} onChange={(e) => handleChange('endDate', e.target.value)} />
                    ) : (
                      editableContract.endDate
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>기본 요금</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField type="number" variant="standard" value={editableContract.baseFee} onChange={(e) => handleChange('baseFee', e.target.value)} />
                    ) : (
                      editableContract.baseFee.toLocaleString() + '원'
                    )}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>제한 무게(kg)</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField type="number" variant="standard" value={editableContract.weightLimitKg} onChange={(e) => handleChange('weightLimitKg', e.target.value)} />
                    ) : (
                      editableContract.weightLimitKg.toLocaleString() + 'kg'
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>제한 건수</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField type="number" variant="standard" value={editableContract.parcelLimit} onChange={(e) => handleChange('parcelLimit', e.target.value)} />
                    ) : (
                      editableContract.parcelLimit.toLocaleString() + '건'
                    )}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>초과 무게 요금(kg당)</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField type="number" variant="standard" value={editableContract.overWeightFeePerKg} onChange={(e) => handleChange('overWeightFeePerKg', e.target.value)} />
                    ) : (
                      editableContract.overWeightFeePerKg.toLocaleString() + '원'
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>초과 건수 요금</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField type="number" variant="standard" value={editableContract.overParcelFee} onChange={(e) => handleChange('overParcelFee', e.target.value)} />
                    ) : (
                      editableContract.overParcelFee.toLocaleString() + '원'
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper} elevation={0}>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'grey.200' }}>특약 및 기타 정보</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>특약 사항</TableCell>
                  <TableCell colSpan={3}>
                    {isEditing ? (
                      <TextField multiline rows={3} fullWidth variant="standard" value={editableContract.specialTerms} onChange={(e) => handleChange('specialTerms', e.target.value)} />
                    ) : (
                      editableContract.specialTerms || '-'
                    )}
                  </TableCell>
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
        <Button onClick={handleUpdateClick} variant="contained">
          {isEditing ? '저장' : '수정'}
        </Button>
        <Button onClick={handleDeleteClick} color="error">삭제</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContractDetailModal;
