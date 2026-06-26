import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import SubjectCard from '../components/Subjects/SubjectCard';
import SubjectForm from '../components/Subjects/SubjectForm';

export default function SubjectsPage() {
  const { state, addSubject, updateSubject, deleteSubject } = useApp();
  const [open, setOpen] = useState(false);
  const [editSubject, setEditSubject] = useState(null);

  const handleSave = (subject) => {
    if (editSubject) {
      updateSubject(subject);
    } else {
      addSubject(subject);
    }
  };

  const handleEdit = (subject) => {
    setEditSubject(subject);
    setOpen(true);
  };

  const handleDelete = (id) => {
    const subject = state.subjects.find((s) => s.id === id);
    if (subject && (subject.grades || []).length > 0) {
      if (!window.confirm(`¿Eliminar "${subject.name}"? También se eliminarán ${subject.grades.length} nota(s).`)) return;
    }
    deleteSubject(id);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">Asignaturas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditSubject(null); setOpen(true); }}>
          Nueva Asignatura
        </Button>
      </Box>

      {state.subjects.length === 0 ? (
        <Alert severity="info">No hay asignaturas registradas. ¡Crea tu primera asignatura!</Alert>
      ) : (
        <Grid container spacing={2}>
          {state.subjects.map((subject) => (
            <Grid item xs={12} sm={6} md={4} key={subject.id}>
              <SubjectCard subject={subject} onEdit={handleEdit} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      )}

      <SubjectForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        editSubject={editSubject}
      />
    </Box>
  );
}
