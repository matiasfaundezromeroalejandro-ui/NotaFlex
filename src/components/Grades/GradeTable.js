import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Chip, Typography, Box, Collapse
} from '@mui/material';
import { Delete, Edit, KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import { useApp } from '../../context/AppContext';

export default function GradeTable({ subjects, onEditGrade, onDeleteGrade }) {
  const { state } = useApp();
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString();
  };

  const calculateSubjectAverage = (grades) => {
    if (!grades || grades.length === 0) return null;
    const totalWeight = grades.reduce((s, g) => s + (g.weight || 0), 0);
    if (totalWeight === 0) return null;
    const weightedSum = grades.reduce((s, g) => s + ((g.calculatedGrade || 0) * (g.weight || 0)), 0);
    return weightedSum / totalWeight;
  };

  return (
    <Box>
      {subjects.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
          No hay asignaturas. Crea una asignatura para empezar a registrar notas.
        </Typography>
      ) : (
        subjects.map((subject) => {
          const grades = subject.grades || [];
          const avg = calculateSubjectAverage(grades);
          const isExpanded = expanded[subject.id] || true;

          return (
            <Box key={subject.id} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer',
                  p: 1.5, bgcolor: 'action.selected', borderRadius: '4px 4px 0 0',
                  borderLeft: `4px solid ${subject.color || '#1976D2'}`,
                }}
                onClick={() => toggleExpand(subject.id)}
              >
                {isExpanded ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
                <Typography variant="subtitle1" fontWeight="bold" sx={{ flexGrow: 1 }}>
                  {subject.name}
                </Typography>
                <Chip label={`${grades.length} nota(s)`} size="small" variant="outlined" />
                {avg !== null && (
                  <Chip
                    label={`Prom: ${avg.toFixed(1)}`}
                    size="small"
                    color={avg >= state.gradeScale?.passingGrade ? 'success' : 'error'}
                  />
                )}
              </Box>
              <Collapse in={isExpanded}>
                {grades.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                    Sin notas registradas
                  </Typography>
                ) : (
                  <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '0 0 4px 4px' }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell align="center">Puntaje</TableCell>
                          <TableCell align="center">Pond.</TableCell>
                          <TableCell align="center">Nota</TableCell>
                          <TableCell>Fecha</TableCell>
                          <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {grades.map((grade) => (
                          <TableRow key={grade.id} hover>
                            <TableCell>{grade.name}</TableCell>
                            <TableCell align="center">{grade.score} / {grade.maxScore}</TableCell>
                            <TableCell align="center">{grade.weight}%</TableCell>
                            <TableCell align="center">
                              <Chip
                                label={grade.calculatedGrade?.toFixed(1) || '—'}
                                size="small"
                                color={grade.calculatedGrade >= state.gradeScale?.passingGrade ? 'success' : 'error'}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>{formatDate(grade.publicationDate)}</TableCell>
                            <TableCell align="center">
                              <IconButton size="small" onClick={() => onEditGrade(subject.id, grade)}>
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton size="small" onClick={() => onDeleteGrade(subject.id, grade.id)}>
                                <Delete fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Collapse>
            </Box>
          );
        })
      )}
    </Box>
  );
}
