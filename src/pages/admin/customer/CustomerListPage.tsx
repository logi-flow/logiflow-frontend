import {
  Box, Button, Chip, CircularProgress, IconButton, Pagination, Paper, Stack,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FlagIcon from "@mui/icons-material/Flag";
import { useEffect, useState, type ChangeEvent } from "react";
import {
  getAllCustomer,
  getCustomerDetailAdmin,
  updateCustomerAdmin,
  updateCustomerStatus
} from "../../../apis/customer/customer.apis";
import type PageDto from "../../../dtos/page.dto";
import type { GetAllCustomerResponseDto } from "../../../dtos/customer/response/get-all-customer.response.dto";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import GetCustomerDetailModal from "../../../components/customer/GetCustomerDetailModal";
import UpdateCustomerModal from "../../../components/customer/UpdateCustomerModal";
import UpdateCustomerStatusModal from "../../../components/customer/UpdateCustomerStatusModal";
import { Cookies } from "react-cookie";

const statusLabelMap: Record<string, string> = {
  ACTIVE: "활성",
  SUSPENDED: "정지",
  WITHDRAWN: "탈퇴",
};
const statusColorMap: Record<string, "default" | "success" | "warning" | "error"> = {
  ACTIVE: "success",
  SUSPENDED: "warning",
  WITHDRAWN: "default",
};

const fmt = (s?: string) => (s ? new Date(s).toLocaleString() : "-");

function CustomerListPage() {
  const accessToken = new Cookies().get("accessToken");

  const [page, setPage] = useState(0);
  const size = 10;
  const sort = "desc";

  const [queryKey, setQueryKey] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const [listData, setListData] = useState<PageDto<GetAllCustomerResponseDto>>({
    content: [],
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    hasNext: false,
    hasPrevious: false,
    sort: "desc",
  });

  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    if (queryKey === 0) return;
    fetchCustomers();
  }, [page, queryKey, accessToken]);

  const fetchCustomers = async () => {
    if (!accessToken || listLoading) return;
    try {
      setListLoading(true);
      const res = await getAllCustomer(page, size, sort, accessToken);
      const { code, data, message } = res;
      if (code === "SU" && data) setListData(data);
      else alert("고객 목록 조회 실패: " + message);
    } catch (e) {
      alert("고객 목록 조회 중 에러: " + e);
    } finally {
      setListLoading(false);
    }
  };

  const handleSearch = () => {
    if (!accessToken) return alert("인증 토큰이 없습니다. 다시 로그인 해주세요.");
    setPage(0);
    setQueryKey((v) => v + 1);
  };

  const handleChangePage = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const openDetailModal = async (customerId: number) => {
    if (!accessToken) return;
    setSelectedId(customerId);
    setOpenDetail(true);
    setSelectedDetail(null);
    try {
      setDetailLoading(true);
      const res = await getCustomerDetailAdmin(customerId, accessToken);
      const { code, data, message } = res;
      if (code === "SU" && data) setSelectedDetail(data);
      else alert("고객 상세 조회 실패: " + message);
    } catch (e) {
      alert("고객 상세 조회 중 에러: " + e);
    } finally {
      setDetailLoading(false);
    }
  };

  const openEditModal = async (customerId: number) => {
    await openDetailModal(customerId);
    setOpenEdit(true);
  };

  const openStatusDialog = (customerId: number) => {
    setSelectedId(customerId);
    setOpenStatus(true);
  };

  const onSubmitEdit = async (form: any) => {
    if (!selectedId || !accessToken) return;
    const res = await updateCustomerAdmin(selectedId, form, accessToken);
    const { code, message } = res;
    if (code === "SU") {
      alert("수정 완료");
      setOpenEdit(false);
      handleSearch();
    } else {
      alert("수정 실패: " + message);
    }
  };

  const onSubmitStatus = async (form: any) => {
    if (!selectedId || !accessToken) return;
    const res = await updateCustomerStatus(selectedId, form, accessToken);
    const { code, message } = res;
    if (code === "SU") {
      alert("상태 변경 완료");
      setOpenStatus(false);
      handleSearch();
    } else {
      alert("상태 변경 실패: " + message);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>고객 관리</Typography>
          <Button variant="contained" onClick={handleSearch} disabled={listLoading} sx={{ width: 80 }}>
            조회
          </Button>
        </Stack>

        <Stack sx={{ p: 3 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TableContainer>
              <Table sx={{ minWidth: 1400 }}>
                <caption>총 {listData.totalElements}건</caption>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">순번</TableCell>
                    <TableCell align="center">고객ID</TableCell>
                    <TableCell align="center">사용자ID</TableCell>
                    <TableCell align="center">이름</TableCell>
                    <TableCell align="center">상태</TableCell>
                    <TableCell align="center">사업자번호</TableCell>
                    <TableCell align="center">대표자명</TableCell>
                    <TableCell align="center">전화</TableCell>
                    <TableCell align="center">이메일</TableCell>
                    <TableCell align="center">생성일시</TableCell>
                    <TableCell align="center">수정일시</TableCell>
                    <TableCell align="center">액션</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {listLoading && (
                    <TableRow>
                      <TableCell colSpan={12} align="center">
                        <CircularProgress size={28} />
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && queryKey > 0 && listData.totalElements <= 0 && (
                    <TableRow>
                      <TableCell colSpan={12} align="center">
                        조회 결과가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}

                  {!listLoading && listData.content.map((row, idx) => {
                    const rowKey = row.id ?? row.userId ?? `row-${idx}`;
                    const customerId = row.id ?? row.userId;

                    const handleDetail = () => {
                      if (!customerId) return alert("고객 식별자가 없습니다.");
                      openDetailModal(customerId);
                    };
                    const handleEdit = () => {
                      if (!customerId) return alert("고객 식별자가 없습니다.");
                      openEditModal(customerId);
                    };
                    const handleStatus = () => {
                      if (!customerId) return alert("고객 식별자가 없습니다.");
                      openStatusDialog(customerId);
                    };

                    return (
                      <TableRow key={rowKey} hover>
                        <TableCell align="center">{page * size + idx + 1}</TableCell>
                        <TableCell align="center">{row.id ?? "-"}</TableCell>
                        <TableCell align="center">{row.userId ?? "-"}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          <Chip
                            size="small"
                            label={statusLabelMap[row.status] ?? row.status ?? "알수없음"}
                            color={statusColorMap[row.status] ?? "default"}
                          />
                        </TableCell>
                        <TableCell align="center">{row.businessNumber}</TableCell>
                        <TableCell align="center">{row.representativeName}</TableCell>
                        <TableCell align="center">{row.telephone}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{fmt(row.createdAt)}</TableCell>
                        <TableCell align="center">{fmt(row.updatedAt)}</TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <IconButton onClick={handleDetail} title="상세">
                              <InfoIcon />
                            </IconButton>
                            <IconButton onClick={handleEdit} title="수정">
                              <EditNoteIcon />
                            </IconButton>
                            <IconButton onClick={handleStatus} title="상태변경">
                              <FlagIcon />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>

        {!listLoading && queryKey > 0 && listData.totalPages > 0 && (
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={listData.totalPages}
              page={page + 1}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}

        <GetCustomerDetailModal
          open={openDetail}
          loading={detailLoading}
          customer={selectedDetail}
          onClose={() => setOpenDetail(false)}
        />

        <UpdateCustomerModal
          open={openEdit}
          loading={detailLoading}
          initialValues={selectedDetail}
          onClose={() => setOpenEdit(false)}
          onSubmit={onSubmitEdit}
        />

        <UpdateCustomerStatusModal
          open={openStatus}
          onClose={() => setOpenStatus(false)}
          onSubmit={onSubmitStatus}
        />
      </Box>
    </Box>
  );
}

export default CustomerListPage;
