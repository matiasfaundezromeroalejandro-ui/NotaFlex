import React, { useState } from 'react';
import {
  Box, TextField, MenuItem, Typography, Button, Grid
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const PERIOD_TYPES = [
  { value: 'semester', label: 'Semestre' },
  { value: 'trimester', label: 'Trimestre' },
  { value: 'quarter', label: 'Cuatrimestre' },
  { value: 'year', label: 'Año académico' },
  { value: 'custom', label: 'Personalizado' },
];

export default function PeriodForm({ onSave, initial }) {
  const today = new Date().toISOString().split('T')[0];
  const [period, setPeriod] = useState(
    initial || {
      id: uuidv4(),
      name: '',
      type: 'semester',
      startDate: today,
      endDate: '',
    }
  );
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPeriod({ ...period, [name]: value });
    if (name === 'type') {
      const year = new Date().getFullYear();
      const labels = {
        semester: `Semestre ${period.startDate?.split('-')[0] || year}`,
        trimester: `Trimestre ${period.startDate?.split('-')[0] || year}`,
        quarter: `Cuatrimestre ${period.startDate?.split('-')[0] || year}`,
        year: `Año ${period.startDate?.split('-')[0] || year}`,
        custom: 'Período personalizado',
      };
      setPeriod((prev) => ({ ...prev, name: labels[value] || '' }));
    }
  };

  const handleSave = () => {
    if (!period.startDate) {
      setError('La fecha de inicio es requerida');
      return;
    }
    if (!period.endDate) {
      setError('La fecha de término es requerida');
      return;
    }
    if (new Date(period.endDate) <= new Date(period.startDate)) {
      setError('La fecha de término debe ser posterior a la de inicio');
      return;
    }
    setError('');
    onSave(period);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Configura tu período académico</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Define la duración de tu trayecto estudiantil (semestre, año, etc.)
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="Tipo de período" name="type" select
            value={period.type} onChange={handleChange} size="small"
          >
            {PERIOD_TYPES.map((t) => (
              <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="Nombre del período" name="name"
            value={period.name} onChange={handleChange} size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth label="Fecha de inicio" name="startDate" type="date"
            value={period.startDate} onChange={handleChange} size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth label="Fecha de término" name="endDate" type="date"
            value={period.endDate} onChange={handleChange} size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button variant="contained" onClick={handleSave}>
          Guardar Período
        </Button>
      </Box>
    </Box>
  );
}
