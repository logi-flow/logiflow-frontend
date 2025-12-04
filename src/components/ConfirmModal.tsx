import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface Props {
  open: boolean;
  type: "생성" | "수정" | "삭제" | "선택" | "취소";
  onConfirm: () => void;
  onClose: () => void;
}

function ConfirmModal({ open, type, onConfirm, onClose }: Props) {
  const title = `${type}하시겠습니까?`;
  const message = `${type}을(를) 원한다면 확인 버튼을 눌러주세요.`;

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={onConfirm} variant="contained" color="primary" autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal;