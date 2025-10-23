import { Box } from '@mui/material'
import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { WebSocketProvider } from './context/WebSocketProvider'

function App() {

  return (
    <WebSocketProvider>
      <Box sx={{ display: 'flex' }}>
        <Header />
        <Sidebar />
      </Box>
    </WebSocketProvider>

  )
}

export default App;
