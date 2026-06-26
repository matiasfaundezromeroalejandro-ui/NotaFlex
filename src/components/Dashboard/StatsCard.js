import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function StatsCard({ title, value, subtitle, color, icon }) {
  return (
    <Card variant="outlined" sx={{ borderTop: `3px solid ${color || '#1976D2'}`, height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>{title}</Typography>
          {icon && <Box sx={{ color }}>{icon}</Box>}
        </Box>
        <Typography variant="h4" fontWeight="bold" sx={{ color }}>{value}</Typography>
        {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
      </CardContent>
    </Card>
  );
}
