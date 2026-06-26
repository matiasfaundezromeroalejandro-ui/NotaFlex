import React from 'react';
import { Box, Typography, LinearProgress, Tooltip } from '@mui/material';
import { useApp } from '../../context/AppContext';
import { calculateSubjectAverage } from '../../utils/gradeCalculator';

export default function SubjectProgress({ subjects }) {
  const { state } = useApp();
  const scale = state.gradeScale;

  if (!scale || subjects.length === 0) return null;

  const maxGrade = scale.maxGrade;
  const passingGrade = scale.passingGrade;

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Progreso por Asignatura
      </Typography>
      {subjects.map((subject) => {
        const avg = calculateSubjectAverage(subject, scale);
        const progress = avg !== null ? (avg / maxGrade) * 100 : 0;
        const passed = avg !== null && avg >= passingGrade;

        return (
          <Box key={subject.id} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: subject.color || '#1976D2' }} />
                <Typography variant="body2">{subject.name}</Typography>
              </Box>
              <Typography variant="body2" fontWeight="bold" color={passed ? 'success.main' : 'error.main'}>
                {avg !== null ? avg.toFixed(1) : '—'} / {maxGrade}
              </Typography>
            </Box>
            <Tooltip title={`${progress.toFixed(1)}% del puntaje máximo`}>
              <LinearProgress
                variant="determinate"
                value={Math.min(progress, 100)}
                color={passed ? 'success' : 'error'}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Tooltip>
          </Box>
        );
      })}
    </Box>
  );
}
