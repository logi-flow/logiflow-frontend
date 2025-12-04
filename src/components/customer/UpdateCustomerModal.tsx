import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function UpdateCustomerModal({
  open, loading, initialValues, onClose, onSubmit,
}: {
  open: boolean; loading: boolean; initialValues: any; onClose: () => void; onSubmit: (form: any) => void;
}) {
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (initialValues) {
      setForm({ name: initialValues.name ?? "", email: initialValues.email ?? "" });
    }
  }, [initialValues]);

  const handleChange = (key: "name"|"email") => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>고객 수정</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="이름" value={form.name} onChange={handleChange("name")} />
          <TextField label="이메일" value={form.email} onChange={handleChange("email")} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button variant="contained" disabled={loading} onClick={() => onSubmit(form)}>저장</Button>
      </DialogActions>
    </Dialog>
  );
}
