import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Chip, Box } from '@mui/material';
import { Edit, Delete, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const SUBJECT_COLORS = ['#1976D2', '#388E3C', '#D32F2F', '#F57C00', '#7B1FA2', '#00796B', '#C2185B', '#546E7A'];

export default function SubjectCard({ subject, onEdit, onDelete }) {
  const navigate = useNavigate();
  const { state } = useApp();
  const grades = subject.grades || [];
  const avg = grades.length > 0
    ? grades.reduce((sum, g) => sum + (g.calculatedGrade || 0), 0) / grades.length
    : null;

  return (
    <Card variant="outlined" sx={{ borderTop: `4px solid ${subject.color || SUBJECT_COLORS[0]}` }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" gutterBottom>{subject.name}</Typography>
          <Chip
            icon={<ArrowForward fontSize="small" />}
            label="Ver notas"
            size="small"
            clickable
            onClick={() => navigate(`/grades?subject=${subject.id}`)}
            color="primary"
            variant="outlined"
          />
        </Box>
        {subject.professor && (
          <Typography variant="body2" color="text.secondary">
            Profesor: {subject.professor}
          </Typography>
        )}
        <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
          <Typography variant="body2">
            <strong>{grades.length}</strong> {grades.length === 1 ? 'nota' : 'notas'}
          </Typography>
          {avg !== null && (
            <Typography variant="body2">
              Promedio: <strong style={{ color: avg >= state.gradeScale?.passingGrade ? 'green' : 'red' }}>
                {avg.toFixed(1)}
              </strong> / {state.gradeScale?.maxGrade}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={() => onEdit(subject)}><Edit fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => onDelete(subject.id)}><Delete fontSize="small" /></IconButton>
      </CardActions>
    </Card>
  );
}
