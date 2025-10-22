import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import NotificationBell from './NotificationBell'

function Header() {
  return (
    <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ flexGrow: 1 }}
        >
          Logi-Flow
        </Typography>
        {/* <NotificationBell /> */}
      </Toolbar>
    </AppBar>
  )
}

export default Header