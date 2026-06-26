import React from 'react';
import { Box, Typography } from '@mui/material';
import GradeCalculator from '../components/Grades/GradeCalculator';

export default function CalculatorPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Calculadora
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Calcula tu nota según el puntaje obtenido y la escala configurada.
      </Typography>
      <GradeCalculator />
    </Box>
  );
}
