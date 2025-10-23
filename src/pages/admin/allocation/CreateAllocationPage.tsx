import { Box } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import type { CreateAllocationRequestDto } from '../../../dtos/allocation/request/create-allocation.request.dto';



function CreateAllocationPage() {

  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTE5NTkwNSwiZXhwIjoxNzYxMjMxOTA1fQ.Ug_i4SQ_-3zYqJQBUVjR6psli9SEQYPe65jDzXzOWM0";


  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
    </Box>
  )
}

export default CreateAllocationPage