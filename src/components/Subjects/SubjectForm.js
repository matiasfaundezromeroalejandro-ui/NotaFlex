import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { validateSubjectForm } from '../../utils/validation';

const SUBJECT_COLORS = ['#1976D2', '#388E3C', '#D32F2F', '#F57C00', '#7B1FA2', '#00796B', '#C2185B', '#546E7A', '#FF6F00', '#00838F'];

export default function SubjectForm({ open, onClose, onSave, editSubject }) {
  const [form, setForm] = useState({ name: '', professor: '', color: SUBJECT_COLORS[0] });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editSubject) {
      setForm({ name: editSubject.name, professor: editSubject.professor || '', color: editSubject.color || SUBJECT_COLORS[0] });
    } else {
      setForm({ name: '', professor: '', color: SUBJECT_COLORS[0] });
    }
    setErrors({});
  }, [editSubject, open]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const errs = validateSubjectForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    onSave({
      id: editSubject ? editSubject.id : uuidv4(),
      name: form.name.trim(),
      professor: form.professor.trim(),
      color: form.color,
      grades: editSubject ? editSubject.grades || [] : [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editSubject ? 'Editar Asignatura' : 'Nueva Asignatura'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth label="Nombre de la asignatura" name="name" value={form.name}
          onChange={handleChange} margin="normal" required autoFocus
          error={!!errors.name} helperText={errors.name}
        />
        <TextField
          fullWidth label="Profesor (opcional)" name="professor" value={form.professor}
          onChange={handleChange} margin="normal"
        />
        <Grid container spacing={1} sx={{ mt: 1 }}>
          {SUBJECT_COLORS.map((color) => (
            <Grid item key={color}>
              <div
                onClick={() => setForm({ ...form, color })}
                style={{
                  width: 32, height: 32, borderRadius: '50%', backgroundColor: color,
                  cursor: 'pointer', border: form.color === color ? '3px solid #333' : '3px solid transparent',
                  transition: 'border 0.2s',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          {editSubject ? 'Guardar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
