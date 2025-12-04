import { Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Radio, TextField, Stack } from "@mui/material";
import { useState } from "react";

export default function UpdateCustomerStatusModal({
  open, onClose, onSubmit,
}: {
  open: boolean; onClose: () => void; onSubmit: (form: { status: string; memo?: string }) => void;
}) {
  const [status, setStatus] = useState("ACTIVE");
  const [memo, setMemo] = useState("");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>상태 변경</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <RadioGroup value={status} onChange={(e) => setStatus(e.target.value)}>
            <FormControlLabel value="ACTIVE" control={<Radio />} label="활성" />
            <FormControlLabel value="SUSPENDED" control={<Radio />} label="정지" />
            <FormControlLabel value="WITHDRAWN" control={<Radio />} label="탈퇴" />
          </RadioGroup>
          <TextField label="메모(선택)" value={memo} onChange={(e) => setMemo(e.target.value)} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button variant="contained" onClick={() => onSubmit({ status, memo })}>적용</Button>
      </DialogActions>
    </Dialog>
  );
}
