import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState, type ChangeEvent } from "react";
import ConfirmModal from "../ConfirmModal";
import type PageDto from "../../dtos/page.dto";
import { getAllDriver } from "../../apis/driver/driver.apis";
import type { GetDriverDetailResponseDto } from "../../dtos/driver/response/get-driver-detail.response.dto";
// import { useCookies } from "react-cookie";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (driver: GetDriverDetailResponseDto) => void;
}

function DriverListModal({ open, loading, onClose, onConfirm }: Props) {
  // const [cookies] = useCookies(["accessToken"]);
  // const accessToken = cookies.accessToken;
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTM2ODUwMywiZXhwIjoxNzYxNDA0NTAzfQ.eELS15CtpgUYE4xz80PcY8OwzbxIohsovE7O9WMulbk";
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<GetDriverDetailResponseDto | null>(null);
  const [listData, setListData] = useState<PageDto> ({
    content: [],
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    hasNext: false,
    hasPrevious: false,
    sort: 'desc',
  });
  const [page, setPage] = useState(0);
  const size = 10;
  const sort = "desc";
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  

  useEffect(() => { 
      fetchAllDrivers();
    }, [page, accessToken]);

  const fetchAllDrivers = async () =>  {
      if (!accessToken || listLoading) return;
          
      try {
        setListLoading(true);
  
        const response = await getAllDriver(page, size, sort, accessToken);
        const { code, message, data } = response;
        
        if (code === "SU" && data) {
          setListData(data);
        } else {
          console.error("기사 전체 조회 실패: ", message);
          alert("기사 전체 조회 실패: " + message);
        }
      } catch (e) {
        console.error("기사 전체 조회 중 에러 발생: ", e);
        alert("기사 전체 조회 중 에러 발생: " + e);
      } finally {
        setListLoading(false);
      }
    };

  // const handleDetail = async (driverId: number) => {
  //   if (!accessToken || detailLoading) return;

  //   setOpenDetailModal(true);
  //   setSelectedPayroll(undefined);

  //   try {
  //     setDetailLoading(true);
      
  //     const response = await getMyInfo(driverId, accessToken);
  //     const { code, message, data } = response;
      
  //     if (code === "SU" && data) {
  //       setSelectedPayroll(data);
  //     } else {
  //       console.error("기사 급여대장 상세 조회 실패: ", message);
  //       alert("기사 급여대장 상세 조회 실패: " + message);
  //     }
  //   } catch (e) {
  //     console.error("기사 급여대장 상세 조회 중 에러 발생: ", e);
  //     alert("기사 급여대장 상세 조회 중 에러 발생: " + e);
  //   } finally {
  //     setDetailLoading(false);
  //   }
  // };

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };

  const handleSelect = (driver: GetDriverDetailResponseDto) => {
    if (loading) return;

    setSelectedDriver(driver);
    setOpenConfirmModal(true);
  };

  const handleConfirmSelect = () => {
    // if (isCodeEmpty || isNameEmpty || loading) return;
    if (!selectedDriver || loading) return;

    setSelectedDriver(selectedDriver);
    onConfirm(selectedDriver);
    setOpenConfirmModal(false);
    setSelectedDriver(null);
  };

  const handleConfirmModalClose = () => {
    setOpenConfirmModal(false);
    setSelectedDriver(null);
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
          기사 조회
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
        ) : listData ? (
          <Stack spacing={2}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }}>
                  <caption>총 {listData.totalElements}건</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">순번</TableCell>
                      <TableCell align="center">고유번호</TableCell>
                      <TableCell align="center">이름</TableCell>
                      <TableCell align="center">휴대폰번호</TableCell>
                      {/* <TableCell align="center">상세 조회</TableCell> */}
                      <TableCell align="center">선택</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {!loading && listData.totalElements <= 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          조회 결과가 없습니다.
                        </TableCell>
                      </TableRow>
                    )}

                    {!loading && listData.content.map((row, index) => {
                      return (
                        <TableRow hover sx={{ cursor: 'pointer' }} key={row.driverId}>
                          <TableCell align="center">{listData.number * size + index + 1}</TableCell>
                          <TableCell align="center">{row.driverId}</TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.phoneNumber}</TableCell>
                          {/* <TableCell align="center">
                            <IconButton onClick={() => handleDetail(row.id)}>
                              <EditNoteIcon />
                            </IconButton>
                          </TableCell> */}
                          <TableCell align="center">
                            <Button 
                              sx={{ width: '70px', height: '100%' }}
                              variant="contained"
                              disabled={listLoading}
                              onClick={() => handleSelect(row)}
                            >
                              선택
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Stack>
        ) : (
          <Typography>이력 내역을 불러올 수 없습니다.</Typography>
        )}

        {!loading && listData.totalPages > 0 && (
          <Stack sx={{ mt: 3 }} spacing={2} alignItems="center">
            <Pagination
              count={listData.totalPages}
              page={listData.number + 1}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </DialogContent>

      <ConfirmModal 
        open={openConfirmModal}
        type="선택"
        onConfirm={handleConfirmSelect}
        onClose={handleConfirmModalClose}
      />
    </Dialog>
  )
}

export default DriverListModal;