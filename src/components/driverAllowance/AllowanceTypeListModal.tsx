import { Button, Chip, CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useEffect, useState, type ChangeEvent } from "react";
import ConfirmModal from "../ConfirmModal";
import type PageDto from "../../dtos/page.dto";
import { getAllAllowanceType, getAllowanceTypeDetail } from "../../apis/allowanceType/allowance-type.apis";
import type { GetAllowanceTypeDetailResponseDto } from "../../dtos/allowanceType/response/get-allowance-type-detail.response.dto";
import ViewAllowanceTypeDetailModal from "../allowanceType/ViewAllowanceTypeDetailModal";
// import { useCookies } from "react-cookie";

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (allowanceType: GetAllowanceTypeDetailResponseDto) => void;
}

function AllowanceTypeListModal({ open, loading, onClose, onConfirm }: Props) {
  // const [cookies] = useCookies(["accessToken"]);
  // const accessToken = cookies.accessToken;
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTMxNzIxNCwiZXhwIjoxNzYxMzUzMjE0fQ.VT_9aUXAujVF6HeXS5YbB8ORkqkwE9oEhcpB7wZ12pw";
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailAllowanceType, setDetailAllowanceType] = useState<GetAllowanceTypeDetailResponseDto>();
  const [selectedAllowanceType, setSelectedAllowanceType] = useState<GetAllowanceTypeDetailResponseDto | null>(null);
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
      fetchAllAllowanceTypes();
    }, [page, accessToken]);

  const fetchAllAllowanceTypes = async () =>  {
      if (!accessToken || listLoading) return;
          
      try {
        setListLoading(true);
  
        const response = await getAllAllowanceType(page, size, sort, accessToken);
        const { code, message, data } = response;
        
        if (code === "SU" && data) {
          setListData(data);
        } else {
          console.error("수당 항목 리스트 조회 실패: ", message);
          alert("수당 항목 리스트 조회 실패: " + message);
        }
      } catch (e) {
        console.error("수당 항목 리스트 조회 중 에러 발생: ", e);
        alert("수당 항목 리스트 조회 중 에러 발생: " + e);
      } finally {
        setListLoading(false);
      }
    };

  const handleDetail = async (allowanceTypeId: number) => {
    if (!accessToken || detailLoading) return;

    setOpenDetailModal(true);
    setDetailAllowanceType(undefined);

    try {
      setDetailLoading(true);
      
      const response = await getAllowanceTypeDetail(allowanceTypeId, accessToken);
      const { code, message, data } = response;
      
      if (code === "SU" && data) {
        setDetailAllowanceType(data);
      } else {
        console.error("수당 항목 상세 조회 실패: ", message);
        alert("수당 항목 상세 조회 실패: " + message);
      }
    } catch (e) {
      console.error("수당 항목 상세 조회 중 에러 발생: ", e);
      alert("수당 항목 상세 조회 중 에러 발생: " + e);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleClose = (_: object, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
    onClose();
  };

  const handleSelect = (allowanceType: GetAllowanceTypeDetailResponseDto) => {
    if (loading) return;

    setSelectedAllowanceType(allowanceType);
    setOpenConfirmModal(true);
  };

  const handleConfirmSelect = () => {
    if (!selectedAllowanceType || loading) return;

    setSelectedAllowanceType(selectedAllowanceType);
    onConfirm(selectedAllowanceType);
    setOpenConfirmModal(false);
    setSelectedAllowanceType(null);
  };

  const handleConfirmModalClose = () => {
    setOpenConfirmModal(false);
    setSelectedAllowanceType(null);
  };

  const handleDetailModalClose = () => setOpenDetailModal(false);

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
          수당 항목 조회
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
                      <TableCell align="center">코드명</TableCell>
                      <TableCell align="center">항목명</TableCell>
                      <TableCell align="center">사용 여부</TableCell>
                      <TableCell align="center">상세 조회</TableCell>
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
                        <TableRow hover sx={{ cursor: 'pointer' }} key={row.id}>
                         <TableCell align="center">{page * size + index + 1}</TableCell>
                          <TableCell align="center">{row.code}</TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={row.active ? "사용" : "미사용"}
                              color={row.active ? "success" : "error"}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton onClick={() => handleDetail(row.id)}>
                              <EditNoteIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <Button 
                              sx={{ width: '70px', height: '100%' }}
                              variant="contained"
                              // size="large"
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

      <ViewAllowanceTypeDetailModal
        allowanceType={detailAllowanceType}
        open={openDetailModal}
        loading={detailLoading}
        onClose={handleDetailModalClose}
      />
    </Dialog>
  )
}

export default AllowanceTypeListModal;