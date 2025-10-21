import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import type PageDto from "../../dtos/page.dto";
import { useEffect, useState, type ReactNode, type SyntheticEvent } from "react";
import type { GetDriverPayrollUpdateLogResponseDto } from "../../dtos/driverPayrollLog/response/get-driver-payroll-update-log.response.dto";
import type { GetDriverPayrollStatusLogResponseDto } from "../../dtos/driverPayrollLog/response/get-driver-payroll-status-log.response.dto";
import DriverPayrollUpdateLogTable from "./DriverPayrollUpdateLogTable";
import DriverPayrollStatusLogTable from "./DriverPayrollStatusLogTable";

interface Props {
  open: boolean;
  onClose: () => void;

  updateLog: PageDto<GetDriverPayrollUpdateLogResponseDto>;
  updateLogLoading: boolean;
  onUpdateLogChangePage: (page: number, size: number, sort: string) => void;

  statusLog: PageDto<GetDriverPayrollStatusLogResponseDto>;
  statusLogLoading: boolean;
  onStatusLogChangePage: (page: number, size: number, sort: string) => void;
}


function TabPanel({ children, value, index }: { children: ReactNode; value: number; index: number; }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function DriverPayrollLogsModal({ open, onClose, updateLog, updateLogLoading, onUpdateLogChangePage, statusLog, statusLogLoading, onStatusLogChangePage }: Props) {
  const [tab, setTab] = useState(0);
  const size = 20;
  const sort = "desc";

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };

  const handleTabChange = (_: SyntheticEvent, value: number) => {
    setTab(value);
    if (value === 0) onUpdateLogChangePage(0, size, sort);
    if (value === 1) onStatusLogChangePage(0, size, sort);
  };

  const handleUpdateLogChangePage = (newPage: number) => {
    onUpdateLogChangePage(newPage, size, sort);
  };

  const handleStatusLogChangePage = (newPage: number) => {
    onStatusLogChangePage(newPage, size, sort);
  };

  useEffect(() => {
    if (open) {
      setTab(0);
      onUpdateLogChangePage(0, size, sort);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      disableRestoreFocus
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          수정 이력 조회
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Tabs value={tab} onChange={handleTabChange} aria-label="급여대장 로그 탭">
          <Tab label="정보 수정 로그"></Tab>
          <Tab label="상태 변경 로그"></Tab>
        </Tabs>

        <TabPanel value={tab} index={0}>
          {updateLogLoading ? (
            <Stack sx={{ p: 3 }} alignItems="center" >
              <CircularProgress color="inherit" size={28} sx={{ mx: 'auto'}}/>
            </Stack>
          ) : !updateLog ? (
            <Typography>이력 내역을 불러올 수 없습니다.</Typography>
          ) : (
            <DriverPayrollUpdateLogTable
              log={updateLog}
              size={size}
              onChangePage={handleUpdateLogChangePage}
            />
          )}
        </TabPanel>

        <TabPanel value={tab} index={1}>
          {statusLogLoading ? (
            <Stack sx={{ p: 3 }} alignItems="center" >
              <CircularProgress color="inherit" size={28} sx={{ mx: 'auto'}}/>
            </Stack>
          ) : !statusLog ? (
            <Typography>이력 내역을 불러올 수 없습니다.</Typography>
          ) : (
            <DriverPayrollStatusLogTable
              log={statusLog}
              size={size}
              onChangePage={handleStatusLogChangePage}
            />
          )}
        </TabPanel>
      </DialogContent>
    </Dialog>
  )
}

export default DriverPayrollLogsModal;