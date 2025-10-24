import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, Select, TextField, Stack, Paper, TableContainer, Table, TableBody, TableRow, TableCell, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import type { GetScheduleResponseDto } from '../../dtos/schedule/response/get-schedule.response.dto';
import type { UpdateScheduleRequestDto } from '../../dtos/schedule/request/update-schedule.request.dto';
import { AllocationStatus } from '../../enums/allocation-status.enum';
import type { AllocationStatus as AllocationStatusType } from '../../enums/allocation-status.enum';

const allocationStatusOptions = Object.values(AllocationStatus);

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (scheduleId: number, dto: UpdateScheduleRequestDto) => void;
  schedule: GetScheduleResponseDto | null;
}

function ScheduleDetailModal(props: ScheduleModalProps) {
  const { isOpen, onClose, onUpdate, schedule } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editableStatus, setEditableStatus] = useState<AllocationStatusType | "">("");
  const [changeReason, setChangeReason] = useState("");

  useEffect(() => {
    if (isOpen && schedule) {
      setEditableStatus(schedule.status as AllocationStatusType);
      setChangeReason("");
      setIsEditing(false);
    }
  }, [isOpen, schedule]);

  if (!isOpen || !schedule) {
    return null;
  }

  const handleUpdateClick = () => {
    if (isEditing) {
      if (!changeReason.trim()) {
        alert("상태 변경 사유를 반드시 입력해야 합니다.");
        return;
      }
      const dto: UpdateScheduleRequestDto = {
        status: editableStatus as AllocationStatusType,
        changeReason: changeReason,
      };
      onUpdate(schedule.id, dto);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    setEditableStatus(schedule.status as AllocationStatusType);
    setChangeReason("");
    setIsEditing(false);
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">스케줄 세부 정보</Typography>
          <IconButton onClick={onClose} aria-label="close"><CloseIcon /></IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table size="small">
              <TableBody>
                <TableRow><TableCell colSpan={4} sx={{ bgcolor: 'grey.100', fontWeight: 'bold' }}>배차 및 스케줄 정보</TableCell></TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>스케줄 ID</TableCell>
                  <TableCell sx={{ width: '30%' }}>{schedule.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600, width: '20%' }}>배차 번호</TableCell>
                  <TableCell sx={{ width: '30%' }}>{schedule.allocationId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>배차 상태</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select value={editableStatus} onChange={(e) => setEditableStatus(e.target.value as AllocationStatusType)}>
                          {allocationStatusOptions.map((s) => (<MenuItem key={s} value={s}>{s}</MenuItem>))}
                        </Select>
                      </FormControl>
                    ) : (schedule.status)}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>배송 종류</TableCell>
                  <TableCell>{schedule.deliveryType === 'delivery' ? '일반 배송' : '반품'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>배송 날짜</TableCell>
                  <TableCell>{schedule.allocationDate}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>배송(반품) ID</TableCell>
                  <TableCell>{schedule.deliveryId}</TableCell>
                </TableRow>
                {isEditing && (
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, verticalAlign: 'top' }}>상태 변경 사유</TableCell>
                    <TableCell colSpan={3}>
                      <TextField fullWidth required autoFocus variant="outlined" size="small" multiline rows={2}
                        value={changeReason} onChange={(e) => setChangeReason(e.target.value)}
                        placeholder='사유 입력란' />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table size="small">
              <TableBody>
                <TableRow><TableCell colSpan={4} sx={{ bgcolor: 'grey.100', fontWeight: 'bold' }}>기사 및 시간 정보</TableCell></TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>기사 이름(기사 번호)</TableCell>
                  <TableCell>{schedule.driverName} ({schedule.driverId})</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>기사 연락처</TableCell>
                  <TableCell>{schedule.driverPhone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>출발 시간</TableCell>
                  <TableCell>{schedule.departureTime || "미입력"}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>도착 시간</TableCell>
                  <TableCell>{schedule.arrivalTime || "미입력"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {schedule.deliveryType === 'delivery' && (
            <TableContainer component={Paper} elevation={0} variant="outlined">
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'grey.100', fontWeight: 'bold' }}>
                      수령인 정보
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>수거지(출발지)</TableCell>
                    <TableCell colSpan={3}>{`(${schedule.collectionSiteZipcode}) ${schedule.collectionSiteAddress} ${schedule.collectionSiteAddressDetail}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      수령인
                    </TableCell>
                    <TableCell colSpan={3}>{`${schedule.recipientName} (${schedule.recipientPhoneNumber})`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      수령 주소(도착지)
                    </TableCell>
                    <TableCell colSpan={3}>{`(${schedule.recipientZipcode}) ${schedule.recipientAddress} ${schedule.recipientAddressDetail}`}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <div style={{ flex: '1 0 0' }} />
        {isEditing ? (
          <>
            <Button onClick={handleCancelClick} variant="text">취소</Button>
            <Button onClick={handleUpdateClick} variant="contained">상태 저장</Button>
          </>
        ) : (
          <Button onClick={handleUpdateClick} variant="contained">상태 수정</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ScheduleDetailModal;