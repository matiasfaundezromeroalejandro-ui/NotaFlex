import React, { useState, useEffect } from 'react';
import { Box, TextField, Grid, Typography, Paper, Slider } from '@mui/material';
import { useApp } from '../../context/AppContext';
import { calculateGrade } from '../../utils/gradeCalculator';

export default function GradeCalculator() {
  const { state } = useApp();
  const [score, setScore] = useState(60);
  const [maxScore, setMaxScore] = useState(100);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (state.gradeScale) {
      setResult(calculateGrade(score, maxScore, state.gradeScale));
    }
  }, [score, maxScore, state.gradeScale]);

  if (!state.gradeScale) return null;

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Calculadora de Notas
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Escala activa: {state.gradeScale.name} ({state.gradeScale.minGrade} – {state.gradeScale.maxGrade})
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography gutterBottom>Puntaje obtenido: <strong>{score}</strong></Typography>
          <Slider
            value={score} onChange={(_, v) => setScore(v)} min={0} max={maxScore}
            step={1} valueLabelDisplay="auto"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth label="Puntaje máximo" type="number" size="small"
            value={maxScore} onChange={(e) => setMaxScore(Number(e.target.value) || 1)}
            inputProps={{ min: 1 }}
          />
        </Grid>
      </Grid>

      {result !== null && (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="bold" color={result >= state.gradeScale.passingGrade ? 'success.main' : 'error.main'}>
            {result.toFixed(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            / {state.gradeScale.maxGrade}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {result >= state.gradeScale.passingGrade ? '✅ Aprobado' : '❌ Reprobado'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Umbral de aprobación: {maxScore * (state.gradeScale.passingPercentage / 100)} pts ({state.gradeScale.passingPercentage}%)
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
