import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography,
} from '@mui/material';
import {
  Dashboard, School, Assignment, Calculate, Settings,
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { label: 'Panel Principal', icon: <Dashboard />, path: '/dashboard' },
  { label: 'Asignaturas', icon: <School />, path: '/subjects' },
  { label: 'Notas', icon: <Assignment />, path: '/grades' },
  { label: 'Calculadora', icon: <Calculate />, path: '/calculator' },
  { label: 'Configuración', icon: <Settings />, path: '/settings' },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const content = (
    <Box sx={{ width: DRAWER_WIDTH }}>
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="bold" color="primary">
          NoteFlex
        </Typography>
      </Box>
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigate(item.path)}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {content}
      </Drawer>
    </>
  );
}
