import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Stack, TextField } from "@mui/material";
import { useEffect, useState, type FormEvent } from "react";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (vehicleMileage: number) => void;
}

function CheckOutDialog({ open, loading, onClose, onConfirm }: Props) {
  const [vehicleMileage, setVehicleMileage] = useState<string>("");
  const vehicleMileageNum = Number(vehicleMileage);
  const isVehicleMileageEmpty = vehicleMileage.trim() === "";
  const isVehicleMileageInvalid = isVehicleMileageEmpty || Number.isNaN(vehicleMileageNum) || vehicleMileageNum <= 0;
  const vehicleMileageHelperText =
    isVehicleMileageEmpty ? "주행 거리를 입력해 주세요." :
    vehicleMileageNum <= 0 ? "0 보다 큰 숫자로 입력해 주세요." :
    "";

  useEffect(() => {
    if (open){
      setVehicleMileage("");
    }
  }, [open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isVehicleMileageInvalid || loading) return;

    onConfirm(vehicleMileageNum);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>차량 주행 거리 입력</DialogTitle>
      <DialogContent>
        {loading ? (
          <Stack sx={{ p: 3 }} alignItems="center" >
            <CircularProgress color="inherit" size={28} sx={{ mx: 'auto'}}/>
          </Stack>
        ) : (
          <Stack spacing={2}>
            <DialogContentText>
              차량 주행 거리를 입력해 주세요.<br />
              <b>※ 계기판 그대로 입력 ※</b>
            </DialogContentText>
            <form id="vehicleMileageForm" onSubmit={handleSubmit}>
              <TextField
                required
                id="vehicleMileage"
                label="주행 거리"
                type="number"
                inputMode="decimal"
                value={vehicleMileage}
                onChange={(e) => setVehicleMileage(e.target.value)}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: <InputAdornment position="end">km</InputAdornment>,
                  },
                }}
                error={isVehicleMileageInvalid}
                helperText={vehicleMileageHelperText}
              />
            </form>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
        <Button type="submit" form="vehicleMileageForm" disabled={loading || isVehicleMileageInvalid}>
          완료
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CheckOutDialog;