import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Header from '../../../components/Header'
import { createContract } from '../../../apis/contract/contract.apis';
import type { CreateContractRequestDto } from '../../../dtos/contract/request/create-contract.request.dto';

const customers = [
  { id: 1, name: 'Customer A' },
  { id: 2, name: '내 디비에는 2번밖에 없음' },
  { id: 3, name: 'Customer C' },
];

function CreateContractPage() {

  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MDQ5NzQyOCwiZXhwIjoxNzYwNTMzNDI4fQ.9vcKS3F-U-p5JLGd8-S2ujR8SBgRvrOSdV87BeQ9la4";

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | ''>('');

  const [formData, setFormData] = useState<CreateContractRequestDto>({
    startDate: '',
    endDate: '',
    baseFee: 0,
    weightLimitKg: 0,
    parcelLimit: 0,
    overWeightFeePerKg: 0,
    overParcelFee: 0,
    specialTerms: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCustomerId) {
      alert('고객사를 선택해주세요.');
      return;
    }

    const dto: CreateContractRequestDto = {
      ...formData,
      baseFee: Number(formData.baseFee),
      weightLimitKg: Number(formData.weightLimitKg),
      parcelLimit: Number(formData.parcelLimit),
      overWeightFeePerKg: Number(formData.overWeightFeePerKg),
      overParcelFee: Number(formData.overParcelFee),
    };

    if (!dto.startDate || !dto.endDate || dto.baseFee <= 0 || dto.weightLimitKg <= 0 || dto.parcelLimit <= 0 || dto.overWeightFeePerKg <= 0 || dto.overParcelFee <= 0) {
      alert('모든 항목을 올바르게 입력해주세요.');
      return;
    }

    try {
      const response = await createContract(selectedCustomerId, dto, accessToken);

      if (response.code === "SU") {
        alert('계약이 성공적으로 생성되었습니다.');
        setSelectedCustomerId('');
        setFormData({
          startDate: '',
          endDate: '',
          baseFee: 0,
          weightLimitKg: 0,
          parcelLimit: 0,
          overWeightFeePerKg: 0,
          overParcelFee: 0,
          specialTerms: ''
        });
      } else {
        alert('계약 생성 실패: ' + response.message);
      }
    } catch (err) {
      console.log(err);
      alert('계약 생성 중 오류가 발생했습니다.');
    };
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Typography variant="h4" gutterBottom>
          계약 생성
        </Typography>

        <Paper sx={{ p: 4, maxWidth: '800px', margin: 'auto' }}>
          <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="customer-select-label">선택 고객사</InputLabel>
                  <Select
                    labelId="customer-select-label"
                    value={selectedCustomerId}
                    label="선택 고객사"
                    onChange={(e) => setSelectedCustomerId(e.target.value as number)}
                  >
                    {customers.map((customer) => (
                      <MenuItem key={customer.id} value={customer.id}>
                        {customer.name} (ID: {customer.id})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='startDate' label='계약 시작일' type="date" value={formData.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='endDate' label='계약 종료일' type="date" value={formData.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='baseFee' label='기본 요금' type="number" value={formData.baseFee} onChange={handleChange} fullWidth required inputProps={{ min: 0 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='weightLimitKg' label='무게 제한(kg)' type="number" value={formData.weightLimitKg} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='parcelLimit' label='건수 제한' type="number" value={formData.parcelLimit} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='overWeightFeePerKg' label='초과 무게 요금(kg당)' type="number" value={formData.overWeightFeePerKg} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='overParcelFee' label='초과 건수 요금' type="number" value={formData.overParcelFee} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12}>
                <TextField name='specialTerms' label='특약 사항' multiline rows={4} value={formData.specialTerms} onChange={handleChange} fullWidth placeholder='특약 사항이 있으면 입력' />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='submit' variant='contained' size='large'>
                  계약 생성
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

      </Box>

    </Box>
  )
}


export default CreateContractPage