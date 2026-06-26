import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Divider } from '@mui/material';
import ThemeSettings from '../components/Settings/ThemeSettings';
import AccountSettings from '../components/Settings/AccountSettings';
import ScaleSettings from '../components/Settings/ScaleSettings';
import ExportImport from '../components/Settings/ExportImport';

export default function SettingsPage() {
  const [tab, setTab] = useState(0);

  const tabs = [
    { label: 'Tema', component: <ThemeSettings /> },
    { label: 'Escala', component: <ScaleSettings /> },
    { label: 'Cuenta', component: <AccountSettings /> },
    { label: 'Datos', component: <ExportImport /> },
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Configuración
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        {tabs.map((t, i) => (
          <Tab key={i} label={t.label} />
        ))}
      </Tabs>

      <Divider sx={{ mb: 3 }} />

      {tabs[tab].component}
    </Box>
  );
}
