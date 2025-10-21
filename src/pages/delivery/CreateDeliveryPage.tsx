import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { createDelivery } from '../../apis/delivery/delivery.apis';
import type { CreateDeliveryRequestDto } from '../../dtos/delivery/request/create-delivery.request.dto';
import { getMyContract } from '../../apis/contract/contract.apis';
import type { GetAllContractResponseDto } from '../../dtos/contract/response/get-all-contract.response.dto';
import { getAllCollectionSite } from '../../apis/collectionSite/collection-site.api';
import type { GetAllCollectionSiteResponseDto } from '../../dtos/collectionSite/response/get-all-collection-site.response.dto';

declare global {
  interface Window {
    daum: any;
  }
}

function CreateDeliveryPage() {
  const page = 0;
  const size = 10;
  const sort = "createdAt,desc";

  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjAxIiwicm9sZSI6IkNVU1RPTUVSIiwiaWF0IjoxNzYwNjY5MjM3LCJleHAiOjE3NjA3MDUyMzd9.iDsXnTJp3rdEEPiT65tX6AbQp_0uxAVdBall5O4f0eo";

  const [contracts, setContracts] = useState<GetAllContractResponseDto[]>([]);

  const [collectionSites, setCollectionSites] = useState<GetAllCollectionSiteResponseDto[]>([]);

  const [formData, setFormData] = useState<CreateDeliveryRequestDto>({
    contractId: 0,
    requestDate: '',
    item: '',
    weight: 0,
    message: '',
    status: 'REQUESTED',
    collectionSiteId: 0,
    recipientName: '',
    recipientPhone: '',
    recipientZipcode: '',
    recipientAddress: '',
    recipientAddressDetail: '',
  });

  const addressDetailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await getMyContract(page, size, sort, accessToken);
        if (response.code === "SU" && response.data) {
          setContracts(response.data.content);
        } else {
          console.log("계약 정보를 가져오는 데 실패: ", response.message);
          alert("계약 정보를 불러오는데 실패함");
        }
      } catch (err) {
        console.log("계약 정보 로딩 중 오류: ", err);
        alert("계약 정보 로딩 중 오류 발생");
      }

      // 수거지 정보 가져오기
      try {
        const siteResponse = await getAllCollectionSite(page, size, sort, accessToken);
        if (siteResponse.code === "SU" && siteResponse.data) {
          setCollectionSites(siteResponse.data.content);
        } else {
          console.log("수거지 불러오기 실패: ", siteResponse.message);
          alert("수거지 불러오기 실패");
        }
      } catch (err) {
        console.log(err);
        alert("수거지 로딩 중 오류")
      }
    };
    fetchContracts();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' && value !== '' ? Number(value) : value;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        setFormData(prev => ({
          ...prev,
          recipientZipcode: data.zonecode,
          recipientAddress: data.address,
        }));
        addressDetailRef.current?.focus();
      }
    }).open();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createDelivery(formData, accessToken);
      if (response.code === "SU") {
        alert('배송 신청 완료');
        setFormData({
          contractId: 0,
          requestDate: '',
          item: '',
          weight: 0,
          message: '',
          status: 'REQUESTED',
          collectionSiteId: 0,
          recipientName: '',
          recipientPhone: '',
          recipientZipcode: '',
          recipientAddress: '',
          recipientAddressDetail: '',
        })
      } else {
        alert('배송 신청 실패: ' + response.message);
      }
    } catch (err) {
      alert('오류 발생');
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant='h4' gutterBottom sx={{ textAlign: 'center' }}>
          배송 신청(고객사)
        </Typography>

        <Paper sx={{ p: 4, maxWidth: '900px', margin: 'auto' }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>계약 선택</InputLabel>
                  <Select name='contractId' value={formData.contractId} label="계약 선택" onChange={handleSelectChange}>
                    {contracts.map(contract =>
                      <MenuItem key={contract.id} value={contract.id}>계약 번호: {contract.id}, 계약 시작일: {contract.startDate}, 계약 종료일: {contract.endDate}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>수거지 선택</InputLabel>
                  <Select name='collectionSiteId' value={formData.collectionSiteId} label="수거지 선택" onChange={handleSelectChange}>
                    {collectionSites.map(collectionSite =>
                      <MenuItem key={collectionSite.id} value={collectionSite.id}>{collectionSite.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='item' label='품목' value={formData.item} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='weight' label='무게 (kg)' type='number' value={formData.weight} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='requestDate' label='도착 희망일' type='datetime-local' value={formData.requestDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='recipientName' label='수령인 이름' value={formData.recipientName} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField name='recipientPhone' label='수령인 연락처' value={formData.recipientPhone} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid item xs={12} sm={8}>
                <TextField name='recipientZipcode' label='우편번호' value={formData.recipientZipcode} fullWidth required InputProps={{ readOnly: true }} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Button variant='contained' onClick={handleAddressSearch} fullWidth sx={{ height: '100%' }}>
                  우편 번호 찾기
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField name='recipientAddress' label='주소' value={formData.recipientAddress} fullWidth required InputProps={{ readOnly: true }} />
              </Grid>

              <Grid item xs={12}>
                <TextField name='recipientAddressDetail' label='상세주소' value={formData.recipientAddressDetail} onChange={handleChange} fullWidth placeholder='상세주소를 입력' />
              </Grid>

              <Grid item xs={12}>
                <TextField name='message' label='배송 메시지' value={formData.message} onChange={handleChange} multiline rows={3} fullWidth />
              </Grid>

              <Grid item xs={12} sx={{ display: 'felx', justifyContent: 'flex-end' }}>
                <Button type='submit' variant='contained' size='large'>
                  배송 신청하기
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box >
    </Box >
  )
}

export default CreateDeliveryPage