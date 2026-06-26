import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Button, Paper, Typography } from '@mui/material';
import GradeScaleForm from './GradeScaleForm';
import PeriodForm from './PeriodForm';

const STEPS = ['Escala de notas', 'Período académico'];

export default function SetupWizard({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [scale, setScale] = useState(null);
  const [period, setPeriod] = useState(null);

  const handleScaleSave = (s) => {
    setScale(s);
    setActiveStep(1);
  };

  const handlePeriodSave = (p) => {
    setPeriod(p);
  };

  const handleFinish = () => {
    onComplete({ scale, period });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          Configuración Inicial
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && <GradeScaleForm onSave={handleScaleSave} initialScale={scale} />}

        {activeStep === 1 && (
          <>
            <PeriodForm onSave={handlePeriodSave} initial={period} />
            {period && (
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Button variant="contained" size="large" onClick={handleFinish}>
                  Finalizar Configuración
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}
