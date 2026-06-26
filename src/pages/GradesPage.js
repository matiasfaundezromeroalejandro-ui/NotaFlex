import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import GradeTable from '../components/Grades/GradeTable';
import GradeForm from '../components/Grades/GradeForm';

export default function GradesPage() {
  const { state, addGrade, updateGrade, deleteGrade } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [editGrade, setEditGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || '');

  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam) {
      setSelectedSubject(subjectParam);
    }
  }, [searchParams]);

  const filteredSubjects = selectedSubject
    ? state.subjects.filter((s) => s.id === selectedSubject)
    : state.subjects;

  const handleAddGrade = () => {
    if (!selectedSubject && state.subjects.length > 0) {
      setSelectedSubject(state.subjects[0].id);
    }
    setEditGrade(null);
    setOpen(true);
  };

  const handleSaveGrade = (grade) => {
    const targetId = editGrade
      ? state.subjects.find((s) => (s.grades || []).some((g) => g.id === editGrade.id))?.id
      : selectedSubject;

    if (!targetId) return;

    if (editGrade) {
      updateGrade(targetId, grade);
    } else {
      addGrade(targetId, grade);
    }
  };

  const handleEditGrade = (subjectId, grade) => {
    setEditGrade(grade);
    setOpen(true);
  };

  const handleDeleteGrade = (subjectId, gradeId) => {
    if (window.confirm('¿Eliminar esta nota?')) {
      deleteGrade(subjectId, gradeId);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight="bold">Notas</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por asignatura</InputLabel>
            <Select
              value={selectedSubject}
              label="Filtrar por asignatura"
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                if (e.target.value) {
                  setSearchParams({ subject: e.target.value });
                } else {
                  setSearchParams({});
                }
              }}
            >
              <MenuItem value="">Todas las asignaturas</MenuItem>
              {state.subjects.map((s) => (
                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddGrade}
            disabled={state.subjects.length === 0}>
            Registrar Nota
          </Button>
        </Box>
      </Box>

      {state.subjects.length === 0 ? (
        <Alert severity="info">Primero debes crear una asignatura para registrar notas.</Alert>
      ) : (
        <GradeTable
          subjects={filteredSubjects}
          onEditGrade={handleEditGrade}
          onDeleteGrade={handleDeleteGrade}
        />
      )}

      <GradeForm
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSaveGrade}
        editGrade={editGrade}
        subjectId={selectedSubject}
      />
    </Box>
  );
}
