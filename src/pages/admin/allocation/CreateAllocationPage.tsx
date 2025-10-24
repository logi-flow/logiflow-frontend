import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Toolbar, Typography, CircularProgress } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import { createAllocation } from '../../../apis/allocation/allocation.apis';
import type { CreateAllocationRequestDto } from '../../../dtos/allocation/request/create-allocation.request.dto';
import { getAllAssignment } from '../../../apis/assignment/assignment.apis';
import { getAllWaitingDelivery } from '../../../apis/delivery/delivery.apis';
import { getAllWaitingReturnDelivery } from '../../../apis/returnDelivery/return-delivery.apis';
import type { GetAllAssignmentResponseDto } from '../../../dtos/assignment/response/get-all-assignment.response.dto';
import type { GetAllWaitingDeliveryResponseDto } from '../../../dtos/delivery/response/get-all-waiting-delivery.response.dto';
import type { GetAllWaitingReturnDeliveryResponseDto } from '../../../dtos/returnDelivery/response/get-all-waiting-return-delivery.response.dto';

type AllocationFormData = {
  deliveryId?: number;
  returnDeliveryId?: number;
  assignmentId: number | '';
  districtName: string;
};

function CreateAllocationPage() {
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTI3Njk2NiwiZXhwIjoxNzYxMzEyOTY2fQ.Dyl4lzTzZ2wIf3DjgQGI3sHZGo_3OIpJ7-8CTF7V7Ag";
  const page = 0;
  const size = 100;
  const sort = "createdAt,desc";

  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<GetAllAssignmentResponseDto[]>([]);
  const [deliveries, setDeliveries] = useState<GetAllWaitingDeliveryResponseDto[]>([]);
  const [returnDeliveries, setReturnDeliveries] = useState<GetAllWaitingReturnDeliveryResponseDto[]>([]);

  const [formData, setFormData] = useState<AllocationFormData>({
    deliveryId: undefined,
    returnDeliveryId: undefined,
    assignmentId: '',
    districtName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [assignmentRes, deliveryRes, returnRes] = await Promise.all([
          getAllAssignment(page, size, sort, accessToken),
          getAllWaitingDelivery(page, size, sort, accessToken),
          getAllWaitingReturnDelivery(page, size, sort, accessToken),
        ]);

        if (assignmentRes.code === 'SU' && assignmentRes.data?.content) setAssignments(assignmentRes.data.content);
        if (deliveryRes.code === 'SU' && deliveryRes.data?.content) setDeliveries(deliveryRes.data.content);
        if (returnRes.code === 'SU' && Array.isArray(returnRes.data)) setReturnDeliveries(returnRes.data);

      } catch (err) {
        alert('필수 데이터를 불러오는 중 오류가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number | ''>) => {
    const { name, value } = e.target;

    setFormData(prevState => {
      const updatedState = { ...prevState };

      switch (name) {
        case 'deliveryId':
          const deliveryValue = value === '' ? undefined : Number(value);
          updatedState.deliveryId = deliveryValue;
          if (deliveryValue) updatedState.returnDeliveryId = undefined;
          break;
        case 'returnDeliveryId':
          const returnDeliveryValue = value === '' ? undefined : Number(value);
          updatedState.returnDeliveryId = returnDeliveryValue;
          if (returnDeliveryValue) updatedState.deliveryId = undefined;
          break;
        case 'assignmentId':
          updatedState.assignmentId = value as number | '';
          break;
        case 'districtName':
          updatedState.districtName = value as string;
          break;
        default:
          break;
      }
      return updatedState;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.assignmentId || !formData.districtName) {
      alert('배정과 구역은 필수 항목입니다.');
      return;
    }
    const dto: CreateAllocationRequestDto = {
      assignmentId: Number(formData.assignmentId),
      districtName: formData.districtName,
      deliveryId: formData.deliveryId,
      returnDeliveryId: formData.returnDeliveryId,
      status: 'ASSIGNED',
    };
    try {
      const response = await createAllocation(dto, accessToken);
      if (response.code === "SU") {
        alert('배차가 성공적으로 생성되었습니다.');
        setFormData({
          deliveryId: undefined,
          returnDeliveryId: undefined,
          assignmentId: '',
          districtName: '',
        });
      } else {
        alert('배차 생성 실패: ' + response.message);
      }
    } catch (err) {
      console.error(err);
      alert('배차 생성 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /><Typography sx={{ ml: 2 }}>데이터 로딩 중...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>배차 생성 (관리자)</Typography>
        <Paper sx={{ p: 4, maxWidth: '800px', margin: 'auto' }}>
          <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="assignment-select-label">배정 선택</InputLabel>
                  <Select
                    labelId="assignment-select-label"
                    name="assignmentId"
                    value={formData.assignmentId}
                    label="배정 선택"
                    onChange={handleChange}
                  >
                    {assignments.map((assignment) => (
                      <MenuItem key={assignment.id} value={assignment.id}>
                        {`기사: ${assignment.driverName} / 차량 ID: ${assignment.vehicleId} (ID: ${assignment.id})`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={!!formData.returnDeliveryId}>
                  <InputLabel id="delivery-select-label">배송 ID (선택)</InputLabel>
                  <Select
                    labelId="delivery-select-label"
                    name="deliveryId"
                    value={formData.deliveryId || ''}
                    label="배송 ID (선택)"
                    onChange={handleChange}
                  >
                    <MenuItem value=""><em>선택 안함</em></MenuItem>
                    {deliveries.map((delivery) => (
                      <MenuItem key={delivery.id} value={delivery.id}>배송 ID: {delivery.id}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth disabled={!!formData.deliveryId}>
                  <InputLabel id="return-delivery-select-label">반품 ID (선택)</InputLabel>
                  <Select
                    labelId="return-delivery-select-label"
                    name="returnDeliveryId"
                    value={formData.returnDeliveryId || ''}
                    label="반품 ID (선택)"
                    onChange={handleChange}
                  >
                    <MenuItem value=""><em>선택 안함</em></MenuItem>
                    {returnDeliveries.map((ret) => (
                      <MenuItem key={ret.id} value={ret.id}>반품 ID: {ret.id}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField name='districtName' label='구역' value={formData.districtName} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='submit' variant='contained' size='large'>배차 생성</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default CreateAllocationPage;