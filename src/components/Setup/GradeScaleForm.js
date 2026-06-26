import React, { useState } from 'react';
import {
  Box, TextField, MenuItem, Typography, Button, Grid, Card, CardActionArea, CardContent
} from '@mui/material';
import { PREDEFINED_SCALES, createCustomScale } from '../../data/gradeScales';
import { validateScaleForm } from '../../utils/validation';

export default function GradeScaleForm({ onSave, initialScale }) {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [custom, setCustom] = useState(false);
  const [scale, setScale] = useState(initialScale || createCustomScale());
  const [errors, setErrors] = useState({});

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset.id);
    setCustom(false);
    setScale({ ...preset, id: scale.id });
    setErrors({});
  };

  const handleCustomToggle = () => {
    setCustom(true);
    setSelectedPreset(null);
    setScale(createCustomScale());
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScale({ ...scale, [name]: ['maxScore', 'passingPercentage', 'minGrade', 'maxGrade', 'passingGrade', 'increment'].includes(name) ? Number(value) : value });
  };

  const handleSave = () => {
    const errs = validateScaleForm(scale);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSave(scale);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Selecciona una escala de notas</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Elige un país predefinido o crea una escala personalizada.
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {PREDEFINED_SCALES.map((preset) => (
          <Grid item xs={6} sm={4} key={preset.id}>
            <Card
              variant="outlined"
              sx={{
                borderColor: selectedPreset === preset.id ? 'primary.main' : undefined,
                borderWidth: selectedPreset === preset.id ? 2 : 1,
              }}
            >
              <CardActionArea onClick={() => handlePresetSelect(preset)}>
                <CardContent sx={{ py: 1.5 }}>
                  <Typography variant="subtitle2">{preset.country}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {preset.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {preset.minGrade} – {preset.maxGrade} · Aprueba {preset.passingGrade}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <Grid item xs={6} sm={4}>
          <Card
            variant="outlined"
            sx={{
              borderColor: custom ? 'primary.main' : undefined,
              borderWidth: custom ? 2 : 1,
            }}
          >
            <CardActionArea onClick={handleCustomToggle}>
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="subtitle2">Personalizada</Typography>
                <Typography variant="body2" color="text.secondary">
                  Configura todo manualmente
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {(selectedPreset || custom) && (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            {custom ? 'Configurar escala personalizada' : 'Escala seleccionada'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Nombre de la escala" name="name" value={scale.name}
                onChange={handleChange} error={!!errors.name} helperText={errors.name} size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth label="Puntaje máx" name="maxScore" type="number" value={scale.maxScore}
                onChange={handleChange} error={!!errors.maxScore} helperText={errors.maxScore} size="small"
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth label="% Exigencia" name="passingPercentage" type="number" value={scale.passingPercentage}
                onChange={handleChange} error={!!errors.passingPercentage} helperText={errors.passingPercentage} size="small" inputProps={{ min: 1, max: 100 }}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                fullWidth label="Nota mín" name="minGrade" type="number" value={scale.minGrade}
                onChange={handleChange} error={!!errors.minGrade} helperText={errors.minGrade} size="small" inputProps={{ step: scale.increment }}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                fullWidth label="Nota máx" name="maxGrade" type="number" value={scale.maxGrade}
                onChange={handleChange} error={!!errors.maxGrade} helperText={errors.maxGrade} size="small" inputProps={{ step: scale.increment }}
              />
            </Grid>
            <Grid item xs={4} sm={3}>
              <TextField
                fullWidth label="Nota aprobación" name="passingGrade" type="number" value={scale.passingGrade}
                onChange={handleChange} error={!!errors.passingGrade} helperText={errors.passingGrade} size="small" inputProps={{ step: scale.increment }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth label="Incremento" name="increment" type="number" value={scale.increment}
                onChange={handleChange} error={!!errors.increment} helperText={errors.increment} size="small" inputProps={{ min: 0.01, step: 0.1 }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                fullWidth label="Tipo ponderación" name="weightType" select value={scale.weightType}
                onChange={handleChange} size="small"
              >
                <MenuItem value="percentage">Porcentaje (%)</MenuItem>
                <MenuItem value="points">Puntos</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="contained" onClick={handleSave}>
              Guardar Escala
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
