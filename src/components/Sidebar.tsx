import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
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

          <ListItem disablePadding>
            <Link to="/deliveries" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/deliveries'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="배송 전체 조회" />
              </ListItemButton>
            </Link>
          </ListItem>
          {/* 항목 추가 여기 */}

        </List>

        <Divider />
        <List>
          <ListItem disablePadding>
            <Link to="/return-deliveries" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/returnDeliveries'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="반품 배송 전체 조회" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/attendances/list" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/attendances/list'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="기사 출근부 조회" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/allowanceTypes/list" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/allowanceTypes/list'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="수당 항목 관리" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/deductionTypes/list" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/deductionTypes/list'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="공제 항목 관리" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/payrolls/list" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/payrolls/list'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="기사 급여 관리" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

        <Divider />
        <List>
          <ListItem disablePadding>
            <Link to="/attendances/me/register" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/attendances/me/register'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="출 · 퇴근 등록" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/attendances/me/list" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/attendances/me/list'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="출근부 조회" />
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem disablePadding>
            <Link to="/payrolls/me/list" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton selected={currentPath === '/payrolls/me/list'}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="급여대장 조회" />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

        <Divider />
        <ListItem disablePadding>
          <Link to="/delivery/create" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemButton selected={currentPath === '/delivery/create'}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="배송 신청" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/contracts/me" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemButton selected={currentPath === '/contracts/me'}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="고객사 계약 목록" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/deliveries/me" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemButton selected={currentPath === '/deliveries/me'}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="고객사 배송 목록" />
            </ListItemButton>
          </Link>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <Link to="/allocations" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemButton selected={currentPath === '/allocations'}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="배차 생성" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link to="/schedules" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
            <ListItemButton selected={currentPath === '/schedules'}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="스케줄 전체 조회" />
            </ListItemButton>
          </Link>
        </ListItem>
      </Box>
    </Drawer>
  )
}

export default Sidebar