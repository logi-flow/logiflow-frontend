import { Box } from '@mui/material'
import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
    </Box>

  )
}

export default App;
