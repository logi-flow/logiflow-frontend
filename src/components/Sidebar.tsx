import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

function Sidebar() {

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/'}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="App.tsx" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/contracts" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/contracts'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="계약 관리" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/contracts/create" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/contracts/create'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="계약 생성" />
              </ListItemButton>
            </Link>
          </ListItem>

          {/* 항목 추가 여기 */}

        </List>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="기타 추가할거 추가하기" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  )
}

export default Sidebar