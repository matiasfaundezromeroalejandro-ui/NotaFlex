import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box, AppBar, Toolbar, Typography, IconButton, Tooltip,
} from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { useApp } from '../../context/AppContext';

const DRAWER_WIDTH = 240;

export default function AppLayout() {
  const { state, setTheme } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    const modes = { light: 'dark', dark: 'ocean', ocean: 'forest', forest: 'sunset', sunset: 'midnight', midnight: 'minimal', minimal: 'light', custom: 'light' };
    setTheme(modes[state.theme] || 'light');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="sticky" elevation={1}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2, display: { sm: 'none' } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
              NoteFlex
            </Typography>
            <Tooltip title="Cambiar tema">
              <IconButton color="inherit" onClick={toggleTheme}>
                {state.theme === 'dark' || state.theme === 'midnight' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: 'background.default',
            ml: { sm: `${DRAWER_WIDTH}px` },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
