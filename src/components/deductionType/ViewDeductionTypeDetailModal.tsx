import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import type { GetDeductionTypeDetailResponseDto } from "../../dtos/deductionType/response/get-deduction-type-detail.response.dto";

interface Props {
  deductionType: GetDeductionTypeDetailResponseDto | undefined;
  open: boolean;
  loading: boolean;
  onClose: () => void;
}

function ViewDeductionTypeDetailModal({ deductionType, open, loading, onClose }: Props) {
  const isActive = deductionType?.active;

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };

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
          공제 항목 상세 조회
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
        ) : deductionType ? (
          <Stack spacing={2}>
            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                      공제 항목 정보
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>코드명</TableCell>
                    <TableCell>{deductionType.code}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>항목명</TableCell>
                    <TableCell>{deductionType.name}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>사용 여부</TableCell>
                    <TableCell>{isActive ? "사용" : "미사용"}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}></TableCell>
                    <TableCell></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>설명</TableCell>
                    <TableCell colSpan={3}>{deductionType.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                      입력 정보
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>등록일</TableCell>
                    <TableCell>{deductionType.createdAt}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>수정일</TableCell>
                    <TableCell>{deductionType.updatedAt}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        ) : (
          <Typography>상세 정보를 불러올 수 없습니다.</Typography>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ViewDeductionTypeDetailModal;