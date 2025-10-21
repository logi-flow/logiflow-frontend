import { Chip, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import type { GetDriverPayrollDetailResponseDto } from "../../dtos/driverPayroll/response/get-driver-payroll-detail.response.dto";
import { payrollStatusColorMap, payrollStatusMap } from "../../enums/driver-payroll-status.enum";
import { driverDistrictMap } from "../../enums/driver-district.enum";

interface Props {
  payroll: GetDriverPayrollDetailResponseDto | undefined;
  open: boolean;
  loading: boolean;
  onClose: () => void;
}

function MyDriverPayrollDetailModal({ payroll, open, loading, onClose }: Props) {

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };

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
          급여대장 상세 조회
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
        ) : payroll ? (
          <Stack spacing={2}>
            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>
                      기사 정보
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>고유번호</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverId}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>아이디</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverUsername}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>이름</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverName}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>급여 (일별)</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverPay ? payroll.driverPay.toLocaleString() + " 원" : "-"}</TableCell>
                    
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>관할 구역</TableCell>
                    <TableCell sx={{ width: '20%' }}>{driverDistrictMap[payroll.driverDistrict]?? payroll.driverDistrict}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>입사일</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverCompanyJoin}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>휴대폰번호</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverPhoneNumber}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>이메일</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.driverEmail}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>급여대장 정보</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>급여대장명</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.title}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>상태</TableCell>
                    <TableCell sx={{ width: '20%' }}>
                      <Chip
                        label={payrollStatusMap[payroll.status] ?? "알 수 없음"}
                        color={payrollStatusColorMap[payroll.status] ?? "default"}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>시작일</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.periodStartDate}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>종료일</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.periodEndDate}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%', borderTop: 'double lightGray' }}>수당 총액</TableCell>
                    <TableCell sx={{ width:'20%', borderTop: 'double lightGray' }}>{payroll.totalAllowance.toLocaleString() + " 원"}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%', borderTop: 'double lightGray' }}>공제 총액</TableCell>
                    <TableCell sx={{ width:'20%', borderTop: 'double lightGray' }}>{payroll.totalDeduction.toLocaleString() + " 원"}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}></TableCell>
                    <TableCell></TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>총 합계</TableCell>
                    <TableCell>{payroll.finalAmount.toLocaleString() + " 원"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>수당 내역</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Table size="medium" sx={{ border: '1px solid lightGray' }}>
                <TableHead>
                  <TableCell align="center">순번</TableCell>
                  <TableCell align="center">코드명</TableCell>
                  <TableCell align="center">항목명</TableCell>
                  <TableCell align="center">수량(일수)</TableCell>
                  <TableCell align="center">단가(원)</TableCell>
                  <TableCell align="center">합계(원)</TableCell>
                  <TableCell align="center">메모</TableCell>  
                </TableHead>
                <TableBody>
                  {!loading && (!payroll.allowanceItems || payroll.allowanceItems.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        조회 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}

                  {!loading && payroll.allowanceItems.map((row, index) => {
                    return (
                      <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.allowanceTypeCode}</TableCell>
                        <TableCell align="center">{row.allowanceTypeName}</TableCell>
                        <TableCell align="center">{row.quantity}</TableCell>
                        <TableCell align="center">{row.unitPrice.toLocaleString()}</TableCell>
                        <TableCell align="center">{row.amount.toLocaleString()}</TableCell>
                        <TableCell align="center">{row.memo}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} elevation={0}>
              <Table size="medium" sx={{ border: '1px solid lightGray' }}>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ bgcolor: 'lightGray', fontWeight: 700 }}>공제 내역</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {!loading && (!payroll.deductionItems || payroll.deductionItems.length === 0) ? (
                <Table size="medium">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">
                        조회 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Table size="medium">
                  <TableHead>
                    <TableCell align="center">순번</TableCell>
                    <TableCell align="center">코드명</TableCell>
                    <TableCell align="center">항목명</TableCell>
                    <TableCell align="center">수량(일수)</TableCell>
                    <TableCell align="center">단가(원)</TableCell>
                    <TableCell align="center">합계(원)</TableCell>
                    <TableCell align="center">메모</TableCell>  
                  </TableHead>
                  <TableBody>
                    {!loading && (!payroll.deductionItems || payroll.deductionItems.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                          조회 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}

                    {!loading && payroll.deductionItems.map((row, index) => {
                      return (
                        <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{row.deductionTypeCode}</TableCell>
                          <TableCell align="center">{row.deductionTypeName}</TableCell>
                          <TableCell align="center">{row.quantity}</TableCell>
                          <TableCell align="center">{row.unitPrice.toLocaleString()}</TableCell>
                          <TableCell align="center">{row.amount.toLocaleString()}</TableCell>
                          <TableCell align="center">{row.memo}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
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
                    <TableCell sx={{ width: '20%' }}>{payroll.createdAt}</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '30%' }}>수정일</TableCell>
                    <TableCell sx={{ width: '20%' }}>{payroll.updatedAt}</TableCell>
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

export default MyDriverPayrollDetailModal;