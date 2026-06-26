import React, { useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import GradeScaleForm from '../Setup/GradeScaleForm';
import { useApp } from '../../context/AppContext';

export default function ScaleSettings() {
  const { state, setGradeScale } = useApp();
  const [saved, setSaved] = useState(false);

  const handleSave = (scale) => {
    setGradeScale(scale);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Escala de Notas</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Escala actual: <strong>{state.gradeScale?.name}</strong>
      </Typography>

      {saved && <Alert severity="success" sx={{ mb: 2 }}>Escala actualizada correctamente</Alert>}

      <GradeScaleForm onSave={handleSave} initialScale={state.gradeScale} />
    </Box>
  );
}
