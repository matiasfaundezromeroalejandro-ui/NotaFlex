import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, Button, Paper, Alert } from '@mui/material';
import { School, Assignment, Calculate, TrendingUp } from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import { calculateOverallAverage, calculateSubjectAverage } from '../utils/gradeCalculator';
import StatsCard from '../components/Dashboard/StatsCard';
import SubjectProgress from '../components/Dashboard/SubjectProgress';

export default function HomePage() {
  const { state } = useApp();
  const navigate = useNavigate();

  const overallAvg = calculateOverallAverage(state.subjects, state.gradeScale);
  const totalGrades = state.subjects.reduce((sum, s) => sum + (s.grades || []).length, 0);
  const passedGrades = state.subjects.reduce((sum, s) =>
    sum + (s.grades || []).filter((g) => g.calculatedGrade >= state.gradeScale?.passingGrade).length, 0
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Panel Principal
      </Typography>

      {!state.setupCompleted ? (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Configuración inicial incompleta.{' '}
          <Button size="small" onClick={() => navigate('/setup')}>Completar configuración</Button>
        </Alert>
      ) : (
        <>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Promedio General"
                value={overallAvg !== null ? overallAvg.toFixed(1) : '—'}
                subtitle={`Escala: ${state.gradeScale?.name || '—'}`}
                color={overallAvg >= state.gradeScale?.passingGrade ? '#2e7d32' : '#d32f2f'}
                icon={<TrendingUp />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Asignaturas"
                value={state.subjects.length}
                subtitle={`${state.subjects.filter((s) => calculateSubjectAverage(s, state.gradeScale) !== null).length} con notas`}
                color="#1976D2"
                icon={<School />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Notas Registradas"
                value={totalGrades}
                subtitle={`${passedGrades} aprobadas`}
                color="#ed6c02"
                icon={<Assignment />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatsCard
                title="Período"
                value={state.academicPeriod?.name || '—'}
                subtitle={`${state.academicPeriod?.type || '—'}`}
                color="#7B1FA2"
                icon={<Calculate />}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <SubjectProgress subjects={state.subjects} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Acciones Rápidas
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="outlined" startIcon={<Assignment />} onClick={() => navigate('/grades')}>
                    Ver todas las notas
                  </Button>
                  <Button variant="outlined" startIcon={<School />} onClick={() => navigate('/subjects')}>
                    Gestionar asignaturas
                  </Button>
                  <Button variant="outlined" startIcon={<Calculate />} onClick={() => navigate('/calculator')}>
                    Calculadora de notas
                  </Button>
                  {state.academicPeriod && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                      📅 {new Date(state.academicPeriod.startDate).toLocaleDateString()} — {new Date(state.academicPeriod.endDate).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
