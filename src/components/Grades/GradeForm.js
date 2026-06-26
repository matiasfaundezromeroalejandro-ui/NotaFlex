import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';
import { validateGradeForm } from '../../utils/validation';
import { calculateGrade } from '../../utils/gradeCalculator';

export default function GradeForm({ open, onClose, onSave, editGrade, subjectId }) {
  const { state } = useApp();
  const [form, setForm] = useState({
    name: '', score: '', maxScore: 100, weight: '', publicationDate: new Date().toISOString().split('T')[0], notes: '',
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editGrade) {
      setForm({
        name: editGrade.name,
        score: editGrade.score.toString(),
        maxScore: editGrade.maxScore.toString(),
        weight: editGrade.weight.toString(),
        publicationDate: editGrade.publicationDate || new Date().toISOString().split('T')[0],
        notes: editGrade.notes || '',
      });
    } else {
      setForm({
        name: '', score: '', maxScore: 100, weight: '', publicationDate: new Date().toISOString().split('T')[0], notes: '',
      });
    }
    setErrors({});
    setPreview(null);
  }, [editGrade, open]);

  useEffect(() => {
    if (form.score && form.maxScore && state.gradeScale) {
      const calculated = calculateGrade(Number(form.score), Number(form.maxScore), state.gradeScale);
      setPreview(calculated);
    } else {
      setPreview(null);
    }
  }, [form.score, form.maxScore, state.gradeScale]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const errs = validateGradeForm({
      ...form,
      score: form.score,
      maxScore: form.maxScore,
      weight: form.weight,
      scale: state.gradeScale,
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const calculated = calculateGrade(Number(form.score), Number(form.maxScore), state.gradeScale);

    onSave({
      id: editGrade ? editGrade.id : uuidv4(),
      name: form.name.trim(),
      score: Number(form.score),
      maxScore: Number(form.maxScore),
      weight: Number(form.weight),
      publicationDate: form.publicationDate,
      notes: form.notes.trim(),
      calculatedGrade: calculated,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editGrade ? 'Editar Nota' : 'Registrar Nota'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth label="Nombre del examen/trabajo" name="name" value={form.name}
          onChange={handleChange} margin="normal" required autoFocus
          error={!!errors.name} helperText={errors.name}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth label="Puntaje obtenido" name="score" type="number" value={form.score}
              onChange={handleChange} margin="normal" required
              error={!!errors.score} helperText={errors.score} inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth label="Puntaje máximo" name="maxScore" type="number" value={form.maxScore}
              onChange={handleChange} margin="normal" required
              error={!!errors.maxScore} helperText={errors.maxScore} inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth label="Ponderación (%)" name="weight" type="number" value={form.weight}
              onChange={handleChange} margin="normal" required
              error={!!errors.weight} helperText={errors.weight} inputProps={{ min: 0, max: 100 }}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth label="Fecha de publicación" name="publicationDate" type="date"
          value={form.publicationDate} onChange={handleChange} margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth label="Notas adicionales (opcional)" name="notes" value={form.notes}
          onChange={handleChange} margin="normal" multiline rows={2}
        />
        {preview !== null && (
          <Grid container spacing={2} sx={{ mt: 1, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
            <Grid item xs={6}>
              <strong>Nota calculada:</strong>{' '}
              <span style={{ color: preview >= state.gradeScale?.passingGrade ? 'green' : 'red', fontWeight: 'bold' }}>
                {preview.toFixed(1)}
              </span>
              {' / '}{state.gradeScale?.maxGrade}
            </Grid>
            <Grid item xs={6}>
              <strong>Estado:</strong>{' '}
              {preview >= state.gradeScale?.passingGrade ? '✅ Aprobado' : '❌ Reprobado'}
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          {editGrade ? 'Guardar' : 'Registrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
