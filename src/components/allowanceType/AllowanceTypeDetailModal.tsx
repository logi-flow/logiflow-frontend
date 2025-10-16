import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import type { GetAllowanceTypeDetailResponseDto } from "../../dtos/allowanceType/response/get-allowance-type-detail.response.dto";
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from "../ConfirmModal";
import { useState } from "react";

interface Props {
  allowanceType: GetAllowanceTypeDetailResponseDto | undefined;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (allowanceTypeId: number) => void;
}

function AllowanceTypeDetailModal({ allowanceType, open, loading, onClose, onEdit, onDelete }: Props) {
  const isActive = allowanceType?.active;
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };

  const handleDelete = () => {
    if (!allowanceType) return;

    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (loading || !allowanceType) return;

    onDelete(allowanceType.id);
    setOpenConfirmModal(false);
  };

  const handleConfirmModalClose = () => setOpenConfirmModal(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          수당 항목 상세 조회
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Stack sx={{ p: 3 }} alignItems="center" >
            <CircularProgress color="inherit" size={28} sx={{ mx: 'auto'}}/>
          </Stack>
        ) : allowanceType ? (
          <Stack spacing={2}>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                    수당 항목 정보
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>코드명</TableCell>
                  <TableCell>{allowanceType.code}</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>항목명</TableCell>
                  <TableCell>{allowanceType.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>사용 여부</TableCell>
                  <TableCell>{isActive ? "사용" : "미사용"}</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}></TableCell>
                  <TableCell></TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>설명</TableCell>
                  <TableCell colSpan={3}>{allowanceType.description}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                    입력 정보
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>등록일</TableCell>
                  <TableCell>{allowanceType.createdAt}</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '30%' }}>수정일</TableCell>
                  <TableCell>{allowanceType.updatedAt}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        ) : (
          <Typography>상세 정보를 불러올 수 없습니다.</Typography>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onEdit} variant="contained">
          수정
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          삭제
        </Button>
      </DialogActions>

      <ConfirmModal
        open={openConfirmModal}
        type="삭제"
        onConfirm={handleConfirmDelete}
        onClose={handleConfirmModalClose}
      />
    </Dialog>
  )
}

export default AllowanceTypeDetailModal;