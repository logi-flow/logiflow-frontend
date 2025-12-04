import { Dialog, DialogTitle, DialogContent, Stack, TextField, CircularProgress } from "@mui/material";

export default function GetCustomerDetailModal({
  open, loading, customer, onClose,
}: {
  open: boolean; loading: boolean; customer: any; onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>고객 상세</DialogTitle>
      <DialogContent dividers>
        {loading && <CircularProgress size={24} />}
        {!loading && customer && (
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="ID" value={customer.id ?? ""} InputProps={{ readOnly: true }} />
            <TextField label="이름" value={customer.name ?? ""} InputProps={{ readOnly: true }} />
            <TextField label="아이디" value={customer.username ?? ""} InputProps={{ readOnly: true }} />
            <TextField label="이메일" value={customer.email ?? ""} InputProps={{ readOnly: true }} />
            <TextField label="상태" value={customer.status ?? ""} InputProps={{ readOnly: true }} />
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}