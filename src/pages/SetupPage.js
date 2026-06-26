import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import SetupWizard from '../components/Setup/SetupWizard';
import { useApp } from '../context/AppContext';

export default function SetupPage() {
  const { setGradeScale, setAcademicPeriod, setSetupCompleted } = useApp();
  const navigate = useNavigate();

  const handleComplete = ({ scale, period }) => {
    setGradeScale(scale);
    setAcademicPeriod(period);
    setSetupCompleted(true);
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', py: 4 }}>
      <SetupWizard onComplete={handleComplete} />
    </Box>
  );
}
