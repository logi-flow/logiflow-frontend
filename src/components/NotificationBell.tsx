import { useState } from "react";
import { useWebSocket } from "../context/WebSocketProvider"
import { Badge, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBell: React.FC = () => {
  const { alerts } = useWebSocket();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={alerts.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 480,
              width: '30ch',
            },
          }
        }}
      >
        {alerts.length > 0 ? (
          <List sx={{ padding: 0 }}>
            {alerts.map((alert, index) => (
              <div key={index}>
                <ListItemButton onClick={handleClose}>
                  <ListItemText
                    primary="새로운 활동"
                    secondary={alert}
                  />
                </ListItemButton>
                {index < alerts.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        ) : (
          <MenuItem onClick={handleClose}>
            <Typography>새로운 알림이 없습니다.</Typography>
          </MenuItem>
        )}
      </Menu>
    </div>
  )
};

export default NotificationBell;